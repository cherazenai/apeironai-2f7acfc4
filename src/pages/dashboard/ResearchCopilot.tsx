import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles, Brain, FlaskConical, BookOpen, Loader2, CheckCircle2, Mail, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const features = [
  { icon: BookOpen, title: "Read Scientific Literature", desc: "Analyze and extract insights from research papers" },
  { icon: Brain, title: "Generate Hypotheses", desc: "AI-driven scientific hypothesis generation" },
  { icon: FlaskConical, title: "Design Experiments", desc: "Step-by-step experimental design assistance" },
  { icon: Sparkles, title: "Discover Insights", desc: "Cross-paper knowledge synthesis and discovery" },
];

const ResearchCopilot = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);
  const { toast } = useToast();

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    const { error } = await supabase.from("waitlist").insert({ email: email.trim(), name: name.trim() || null });
    setLoading(false);
    if (error) {
      if (error.code === "23505") {
        toast({ title: "Already on the waitlist!", description: "This email is already registered." });
        setJoined(true);
      } else {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      }
    } else {
      setJoined(true);
      toast({ title: "You're on the list! 🎉", description: "We'll notify you when Research Copilot launches." });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] max-w-3xl mx-auto px-4">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center w-full"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 flex items-center justify-center glow-border"
        >
          <Bot className="h-10 w-10 text-primary" />
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">Research Copilot</h1>
        <p className="text-primary text-sm font-medium tracking-wide uppercase mb-6">Coming Soon</p>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
          Research Copilot is currently under development. We are building an advanced AI system that can read scientific literature, generate hypotheses, and assist researchers in discovering new insights.
        </p>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <Card className="glass p-5 text-left hover:border-primary/30 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.15)] transition-all duration-500">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <f.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-semibold text-foreground mb-1">{f.title}</h3>
                    <p className="text-xs text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Waitlist form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {joined ? (
            <Card className="glass glow-border p-8 max-w-md mx-auto flex flex-col items-center gap-3">
              <CheckCircle2 className="h-10 w-10 text-primary" />
              <p className="font-heading text-lg text-foreground">You're on the list!</p>
              <p className="text-sm text-muted-foreground">We'll notify you when Research Copilot launches.</p>
            </Card>
          ) : (
            <Card className="glass p-6 max-w-md mx-auto">
              <p className="text-sm text-foreground font-heading mb-4">Join the Waitlist</p>
              <form onSubmit={handleJoin} className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className="pl-10 bg-secondary border-border" />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 bg-secondary border-border" required />
                </div>
                <Button type="submit" disabled={loading} className="w-full glow-button h-11">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Join the Waitlist"}
                </Button>
              </form>
            </Card>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResearchCopilot;
