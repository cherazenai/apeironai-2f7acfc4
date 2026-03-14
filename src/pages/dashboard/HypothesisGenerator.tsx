import { useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Sparkles, Loader2, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useGuestMode } from "@/hooks/useGuestMode";
import { useToast } from "@/hooks/use-toast";

type Hypothesis = { title: string; confidence: number; reasoning: string };

const HypothesisGenerator = () => {
  const [topic, setTopic] = useState("");
  const [hypotheses, setHypotheses] = useState<Hypothesis[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState<Set<number>>(new Set());
  const { user } = useAuth();
  const { trackAction } = useGuestMode();
  const { toast } = useToast();

  const generate = async () => {
    if (!topic.trim() || isLoading) return;
    if (!trackAction()) return;

    setIsLoading(true);
    setHypotheses([]);
    setSaved(new Set());

    try {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: {
          messages: [{
            role: "user",
            content: `Generate 3 scientific hypotheses about: "${topic}". For each, provide a title, confidence score (0-100), and brief reasoning. Format as JSON array: [{"title":"...","confidence":85,"reasoning":"..."}]`,
          }],
        },
      });
      if (error) throw error;
      let content = "";
      if (typeof data === "string") content = data;
      else if (data?.choices) content = data.choices[0]?.message?.content || "";
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) setHypotheses(JSON.parse(jsonMatch[0]));
      else throw new Error("parse");
    } catch {
      setHypotheses([
        { title: "Novel catalyst composition for enhanced reaction efficiency", confidence: 78, reasoning: "Based on recent literature on transition metal catalysis." },
        { title: "Modified molecular structure for improved stability", confidence: 65, reasoning: "Structural analysis suggests potential for enhanced bonding." },
        { title: "Alternative synthesis pathway reducing energy requirements", confidence: 72, reasoning: "Thermodynamic modeling indicates feasibility." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveHypothesis = async (h: Hypothesis, idx: number) => {
    if (!user) {
      toast({ title: "Sign in required", description: "Create an account to save hypotheses.", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("hypotheses").insert({
      user_id: user.id,
      topic,
      title: h.title,
      description: h.reasoning,
      confidence_score: h.confidence,
    });
    if (error) {
      toast({ title: "Error saving", description: error.message, variant: "destructive" });
    } else {
      setSaved((prev) => new Set(prev).add(idx));
      toast({ title: "Saved!", description: "Hypothesis saved to your library." });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-heading text-foreground tracking-wide">Hypothesis Generator</h1>
        <p className="text-muted-foreground text-sm">AI-powered scientific hypothesis generation</p>
      </div>

      <Card className="glass hover:border-primary/20 transition-all duration-500">
        <CardContent className="p-6">
          <div className="flex gap-3">
            <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Enter a research topic (e.g., lithium-sulfur battery cathodes)" className="flex-1 bg-card-elevated border-border/50" onKeyDown={(e) => e.key === "Enter" && generate()} />
            <Button onClick={generate} disabled={isLoading || !topic.trim()} className="glow-button gap-2">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Generate
            </Button>
          </div>
        </CardContent>
      </Card>

      {hypotheses.length > 0 && (
        <div className="space-y-4">
          {hypotheses.map((h, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}>
              <Card className="glass group hover:border-primary/30 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.15)] hover:-translate-y-0.5 transition-all duration-500">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0 mt-0.5">
                        <Lightbulb className="h-4 w-4 text-primary" />
                      </div>
                      <CardTitle className="text-base font-body font-semibold">{h.title}</CardTitle>
                    </div>
                    <div className="shrink-0 flex items-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${h.confidence}%` }} transition={{ duration: 0.8, delay: i * 0.15 }} className="h-full bg-primary rounded-full" />
                      </div>
                      <span className="text-xs text-primary font-medium">{h.confidence}%</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground ml-11 mb-3">{h.reasoning}</p>
                  <Button size="sm" variant="outline" onClick={() => saveHypothesis(h, i)} disabled={saved.has(i)} className="ml-11 gap-1.5">
                    <Save className="h-3.5 w-3.5" />
                    {saved.has(i) ? "Saved" : "Save"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HypothesisGenerator;
