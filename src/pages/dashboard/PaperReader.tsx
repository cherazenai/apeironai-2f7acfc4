import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import { useAuth } from "@/hooks/useAuth";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-paper`;

const PaperReader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { session } = useAuth();

  const extractTextFromPdf = async (file: File): Promise<string> => {
    // Read as text - for PDFs this gets raw content including text streams
    // We send the raw content and let the AI handle extraction
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    
    // Extract readable text from PDF binary
    let text = "";
    let inTextBlock = false;
    const decoder = new TextDecoder("utf-8", { fatal: false });
    const rawText = decoder.decode(bytes);
    
    // Extract text between BT/ET blocks and parentheses
    const lines = rawText.split(/\r?\n/);
    for (const line of lines) {
      if (line.includes("BT")) inTextBlock = true;
      if (inTextBlock) {
        // Extract text from Tj and TJ operators
        const tjMatches = line.match(/\(([^)]*)\)/g);
        if (tjMatches) {
          for (const match of tjMatches) {
            text += match.slice(1, -1) + " ";
          }
        }
      }
      if (line.includes("ET")) inTextBlock = false;
    }

    // Also try to find any readable ASCII content
    if (text.trim().length < 100) {
      // Fallback: extract all printable ASCII sequences
      const printable = rawText.replace(/[^\x20-\x7E\n\r\t]/g, " ").replace(/\s+/g, " ").trim();
      // Filter out PDF operators and get meaningful content
      const words = printable.split(" ").filter(w => w.length > 2 && !/^[0-9.]+$/.test(w));
      text = words.join(" ");
    }

    return text.trim();
  };

  const handleFileSelect = useCallback((selectedFile: File) => {
    setError(null);
    setAnalysisResult("");

    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("File size exceeds 20MB limit.");
      return;
    }
    setFile(selectedFile);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFileSelect(droppedFile);
  }, [handleFileSelect]);

  const handleAnalyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    setAnalysisResult("");
    setError(null);

    try {
      const paperText = await extractTextFromPdf(file);

      if (paperText.length < 50) {
        setError("Could not extract sufficient text from this PDF. The file may be scanned or image-based.");
        setIsAnalyzing(false);
        return;
      }

      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ paperText, fileName: file.name }),
      });

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || `Analysis failed (${resp.status})`);
      }

      if (!resp.body) throw new Error("No response stream");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullText += content;
              setAnalysisResult(fullText);
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (err: any) {
      console.error("Analysis error:", err);
      setError(err.message || "Failed to analyze paper");
      toast({ title: "Analysis failed", description: err.message, variant: "destructive" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-3xl font-bold mb-1">AI Paper Reader</h1>
        <p className="text-muted-foreground">Upload a research paper and let AI extract insights, hypotheses, and research directions.</p>
      </motion.div>

      {/* Upload Area */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="glass glow-border">
          <CardContent className="p-6">
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-300 ${
                isDragOver
                  ? "border-primary bg-primary/5"
                  : file
                  ? "border-primary/50 bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/30"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              />
              {file ? (
                <div className="space-y-2">
                  <FileText className="h-10 w-10 text-primary mx-auto" />
                  <p className="font-medium text-foreground">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto" />
                  <p className="text-foreground font-medium">Drop your research paper here</p>
                  <p className="text-sm text-muted-foreground">or click to browse · PDF up to 20MB</p>
                </div>
              )}
            </div>

            {error && (
              <div className="mt-4 flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <Button
              onClick={handleAnalyze}
              disabled={!file || isAnalyzing}
              className="w-full mt-4 glow-button gap-2"
            >
              {isAnalyzing ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Analyzing paper...</>
              ) : (
                <><Sparkles className="h-4 w-4" /> Analyze Paper</>
              )}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Analysis Results */}
      <AnimatePresence>
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass glow-border">
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert prose-sm max-w-none [&>h2]:text-primary [&>h2]:font-heading [&>h2]:text-xl [&>h2]:mt-6 [&>h2]:mb-3 [&>ul]:space-y-1 [&>ol]:space-y-1">
                  <ReactMarkdown>{analysisResult}</ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaperReader;
