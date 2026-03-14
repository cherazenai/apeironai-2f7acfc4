import { useState } from "react";
import { motion } from "framer-motion";
import { FlaskConical, Play, Loader2, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useGuestMode } from "@/hooks/useGuestMode";
import { useToast } from "@/hooks/use-toast";

const Simulations = () => {
  const [material, setMaterial] = useState("");
  const [reaction, setReaction] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState("");
  const [resultSaved, setResultSaved] = useState(false);
  const { user } = useAuth();
  const { trackAction } = useGuestMode();
  const { toast } = useToast();

  const runSimulation = async () => {
    if (!material || !reaction) return;
    if (!trackAction()) return;

    setIsRunning(true);
    setResult("");
    setResultSaved(false);

    try {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: {
          messages: [{
            role: "user",
            content: `Simulate the outcome of a ${reaction} reaction using ${material}. Predict: yield percentage, temperature range, byproducts, and feasibility. Format the response with clear sections.`,
          }],
        },
      });
      if (error) throw error;
      const content = typeof data === "string" ? data : data?.choices?.[0]?.message?.content || "Simulation complete.";
      setResult(content);
    } catch {
      setResult("**Simulation Results (Demo)**\n\n- **Predicted Yield:** 73.2%\n- **Optimal Temperature:** 450-520°C\n- **Byproducts:** CO₂, H₂O\n- **Feasibility:** High\n- **Energy Efficiency:** 82%");
    } finally {
      setIsRunning(false);
    }
  };

  const saveResult = async () => {
    if (!user) {
      toast({ title: "Sign in required", description: "Create an account to save results.", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("experiments").insert({
      user_id: user.id,
      title: `${material} - ${reaction} simulation`,
      hypothesis: `Simulating ${reaction} with ${material}`,
      method: "AI Simulation",
      results: result,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setResultSaved(true);
      toast({ title: "Saved!", description: "Simulation saved to experiments." });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-heading text-foreground tracking-wide">Simulations</h1>
        <p className="text-muted-foreground text-sm">AI-predicted experimental outcomes</p>
      </div>

      <Card className="glass hover:border-primary/20 transition-all duration-500">
        <CardHeader><CardTitle className="text-lg font-heading tracking-wide">Configure Simulation</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Material</label>
              <Select onValueChange={setMaterial}>
                <SelectTrigger className="bg-card-elevated border-border/50"><SelectValue placeholder="Select material" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="graphene">Graphene</SelectItem>
                  <SelectItem value="lithium-sulfur">Lithium-Sulfur</SelectItem>
                  <SelectItem value="perovskite">Perovskite</SelectItem>
                  <SelectItem value="carbon-nanotube">Carbon Nanotube</SelectItem>
                  <SelectItem value="mof">Metal-Organic Framework</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Reaction Type</label>
              <Select onValueChange={setReaction}>
                <SelectTrigger className="bg-card-elevated border-border/50"><SelectValue placeholder="Select reaction" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="oxidation">Oxidation</SelectItem>
                  <SelectItem value="reduction">Reduction</SelectItem>
                  <SelectItem value="catalysis">Catalysis</SelectItem>
                  <SelectItem value="polymerization">Polymerization</SelectItem>
                  <SelectItem value="electrolysis">Electrolysis</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={runSimulation} disabled={isRunning || !material || !reaction} className="glow-button gap-2">
            {isRunning ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
            Run Simulation
          </Button>
        </CardContent>
      </Card>

      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="glass glow-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-heading flex items-center gap-2 tracking-wide">
                  <FlaskConical className="h-5 w-5 text-primary" /> Results
                </CardTitle>
                <Button size="sm" variant="outline" onClick={saveResult} disabled={resultSaved} className="gap-1.5">
                  <Save className="h-3.5 w-3.5" /> {resultSaved ? "Saved" : "Save"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-invert prose-sm max-w-none text-sm text-foreground">
                <ReactMarkdown>{result}</ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default Simulations;
