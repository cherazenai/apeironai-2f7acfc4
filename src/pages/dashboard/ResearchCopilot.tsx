import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useGuestMode } from "@/hooks/useGuestMode";
import { useToast } from "@/hooks/use-toast";

type Message = { role: "user" | "assistant"; content: string };

const suggestions = [
  "Find catalysts for hydrogen production",
  "Suggest new battery chemistry to improve energy density",
  "What are the latest breakthroughs in CRISPR therapy?",
  "Identify carbon capture materials with high absorption",
];

const ResearchCopilot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { trackAction } = useGuestMode();
  const { toast } = useToast();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    // Track guest action
    if (!trackAction()) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput("");
    setIsLoading(true);

    let assistantContent = "";

    try {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: { messages: allMessages, stream: true },
      });

      if (error) throw error;

      // Handle non-streaming response
      if (data) {
        const content = typeof data === "string" ? data : data?.choices?.[0]?.message?.content || "I'm here to help with your research.";
        assistantContent = content;
        setMessages(prev => [...prev, { role: "assistant", content }]);
      }

      // Save to database for authenticated users
      if (user && assistantContent) {
        await supabase.from("research_queries").insert({
          user_id: user.id,
          query: text.trim(),
          response: assistantContent,
        });
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "I encountered an error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] max-w-4xl mx-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-heading text-foreground tracking-wide">Research Copilot</h1>
        <p className="text-muted-foreground text-sm">AI-powered scientific research assistant</p>
      </div>

      <Card className="glass flex-1 flex flex-col overflow-hidden hover:border-primary/20 transition-all duration-500">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Bot className="h-8 w-8 text-primary opacity-70" />
              </div>
              <div>
                <p className="text-foreground font-heading text-lg tracking-wide">How can I help your research?</p>
                <p className="text-muted-foreground text-sm mt-1">Ask about scientific topics, hypotheses, or experiments</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg w-full">
                {suggestions.map((s) => (
                  <button key={s} onClick={() => sendMessage(s)} className="text-left text-sm p-3 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-card-elevated hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.1)] transition-all duration-300 text-muted-foreground hover:text-foreground">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-xl px-4 py-3 text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-card-elevated text-foreground"}`}>
                {msg.role === "assistant" ? (
                  <div className="prose prose-invert prose-sm max-w-none"><ReactMarkdown>{msg.content}</ReactMarkdown></div>
                ) : msg.content}
              </div>
              {msg.role === "user" && (
                <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0 mt-1">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}

          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0"><Bot className="h-4 w-4 text-primary" /></div>
              <div className="bg-card-elevated rounded-xl px-4 py-3"><Loader2 className="h-4 w-4 animate-spin text-primary" /></div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-border/50">
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex gap-2">
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a scientific question..." className="flex-1 bg-card-elevated border-border/50" disabled={isLoading} />
            <Button type="submit" disabled={isLoading || !input.trim()} className="glow-button"><Send className="h-4 w-4" /></Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default ResearchCopilot;
