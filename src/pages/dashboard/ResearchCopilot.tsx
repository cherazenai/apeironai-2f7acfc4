import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Brain, BookOpen, Loader2, Send, User, Lightbulb, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

type Message = { role: "user" | "assistant"; content: string };
type Tab = "chat" | "hypothesis" | "paper";

async function askGroq(messages: Message[], extraSystem = ""): Promise<string> {
  const { data, error } = await supabase.functions.invoke("groq-chat", {
    body: { messages, extraSystem },
  });
  if (error) throw new Error(error.message);
  return data?.choices?.[0]?.message?.content || "No response received.";
}

// ── CHAT TAB ──────────────────────────────────────────────
function ChatTab() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const reply = await askGroq(newMessages);
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages([...newMessages, { role: "assistant", content: "Error — please try again." }]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground text-sm mt-16">
            <Bot className="h-10 w-10 mx-auto mb-3 text-primary/50" />
            Ask anything about your research, papers, or scientific concepts.
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-1">
                <Bot className="h-3.5 w-3.5 text-primary" />
              </div>
            )}
            <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
              m.role === "user"
                ? "bg-primary text-primary-foreground rounded-br-sm"
                : "bg-card border border-border text-foreground rounded-bl-sm"
            }`}>
              {m.content}
            </div>
            {m.role === "user" && (
              <div className="w-7 h-7 rounded-full bg-secondary border border-border flex items-center justify-center shrink-0 mt-1">
                <User className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-3 justify-start">
            <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <Bot className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="bg-card border border-border px-4 py-2.5 rounded-2xl rounded-bl-sm">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Ask about your research..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          className="bg-secondary border-border"
          disabled={loading}
        />
        <Button onClick={send} disabled={loading || !input.trim()} className="glow-button shrink-0">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// ── HYPOTHESIS TAB ────────────────────────────────────────
function HypothesisTab() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!topic.trim() || loading) return;
    setLoading(true);
    setResult("");
    try {
      const reply = await askGroq(
        [{ role: "user", content: `Generate 3 novel, testable scientific hypotheses for this research topic: "${topic}"` }],
        "Focus specifically on hypothesis generation. For each hypothesis provide: statement, reasoning, testing method, confidence score, novelty rating, and next experiments."
      );
      setResult(reply);
    } catch (e) {
      setResult("Error — please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Enter a research topic (e.g. CRISPR gene editing in cancer therapy)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && generate()}
          className="bg-secondary border-border"
          disabled={loading}
        />
        <Button onClick={generate} disabled={loading || !topic.trim()} className="glow-button shrink-0">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lightbulb className="h-4 w-4" />}
        </Button>
      </div>
      {result && (
        <Card className="glass p-5 text-sm text-foreground leading-relaxed whitespace-pre-wrap max-h-[400px] overflow-y-auto">
          {result}
        </Card>
      )}
      {!result && !loading && (
        <div className="text-center text-muted-foreground text-sm py-16">
          <Brain className="h-10 w-10 mx-auto mb-3 text-primary/50" />
          Enter a research topic to generate novel hypotheses.
        </div>
      )}
      {loading && (
        <div className="text-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Generating hypotheses...</p>
        </div>
      )}
    </div>
  );
}

// ── PAPER READER TAB ──────────────────────────────────────
function PaperTab() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!text.trim() || loading) return;
    setLoading(true);
    setResult("");
    try {
      const reply = await askGroq(
        [{ role: "user", content: `Analyze this scientific paper/text:\n\n${text}` }],
        "Focus specifically on paper analysis. Extract key findings, evaluate methodology, identify limitations, suggest research directions, and provide confidence and novelty scores."
      );
      setResult(reply);
    } catch (e) {
      setResult("Error — please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Paste your paper abstract or full text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="bg-secondary border-border min-h-[150px] text-sm"
        disabled={loading}
      />
      <Button onClick={analyze} disabled={loading || !text.trim()} className="w-full glow-button">
        {loading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Analyzing...</> : <><FileText className="h-4 w-4 mr-2" />Analyze Paper</>}
      </Button>
      {result && (
        <Card className="glass p-5 text-sm text-foreground leading-relaxed whitespace-pre-wrap max-h-[350px] overflow-y-auto">
          {result}
        </Card>
      )}
      {!result && !loading && (
        <div className="text-center text-muted-foreground text-sm py-8">
          <BookOpen className="h-10 w-10 mx-auto mb-3 text-primary/50" />
          Paste any research paper text to get a full analysis.
        </div>
      )}
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────
const ResearchCopilot = () => {
  const [tab, setTab] = useState<Tab>("chat");

  const tabs = [
    { id: "chat" as Tab, label: "Research Chat", icon: Bot },
    { id: "hypothesis" as Tab, label: "Hypothesis Generator", icon: Brain },
    { id: "paper" as Tab, label: "Paper Analyzer", icon: BookOpen },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 flex items-center justify-center glow-border">
          <Bot className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-heading font-bold text-foreground mb-1">Research Copilot</h1>
        <p className="text-sm text-muted-foreground">Powered by Llama 3.3 70B via Groq</p>
      </motion.div>

      <div className="flex gap-2 mb-6 bg-secondary rounded-xl p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
              tab === t.id
                ? "bg-background text-foreground shadow-sm border border-border"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <t.icon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>

      <Card className="glass p-5">
        {tab === "chat" && <ChatTab />}
        {tab === "hypothesis" && <HypothesisTab />}
        {tab === "paper" && <PaperTab />}
      </Card>
    </div>
  );
};

export default ResearchCopilot;
