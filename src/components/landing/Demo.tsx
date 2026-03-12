import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { useState } from "react";

const mockOutput = `## Hypothesis: Lithium-Sulfur Hybrid Cathode

**Confidence:** 87%

A lithium-sulfur cathode doped with MXene (Ti₃C₂Tₓ) nanosheets could increase energy density by ~40% compared to conventional Li-ion cells.

### Supporting Evidence
- Wang et al. (2024) — MXene interlayers suppress polysulfide shuttling
- Chen et al. (2023) — Ti₃C₂Tₓ improves conductivity in sulfur cathodes
- Park et al. (2024) — Hybrid architectures achieve 500 Wh/kg

### Suggested Experiments
1. Synthesize Ti₃C₂Tₓ/S composite via vacuum filtration
2. Characterize via XRD and SEM
3. Electrochemical cycling at 0.1C–2C rates`;

const Demo = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="demo" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-primary mb-3 font-body">
            Live Preview
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold">
            See ApeironAI in Action
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="glass rounded-2xl glow-border overflow-hidden"
        >
          {/* Header bar */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-border/50">
            <div className="w-3 h-3 rounded-full bg-destructive/70" />
            <div className="w-3 h-3 rounded-full bg-accent/40" />
            <div className="w-3 h-3 rounded-full bg-primary/40" />
            <span className="ml-3 text-xs text-muted-foreground font-body">
              ApeironAI Research Copilot
            </span>
          </div>

          <div className="p-6 md:p-8">
            {/* Query */}
            <div className="flex items-center gap-3 glass rounded-xl px-4 py-3 mb-6">
              <Sparkles size={16} className="text-primary flex-shrink-0" />
              <span className="text-sm text-foreground font-body flex-1">
                Suggest new battery chemistry to improve energy density.
              </span>
              <button
                onClick={() => setSubmitted(true)}
                className="bg-primary text-primary-foreground rounded-lg p-2 glow-button transition-all"
              >
                <Send size={14} />
              </button>
            </div>

            {/* Output */}
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-card-elevated rounded-xl p-6 max-h-[400px] overflow-y-auto"
              >
                <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-body leading-relaxed">
                  {mockOutput}
                </pre>
              </motion.div>
            )}

            {!submitted && (
              <div className="text-center py-12">
                <p className="text-muted-foreground/60 text-sm font-body">
                  Click send to see a demo response
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Demo;
