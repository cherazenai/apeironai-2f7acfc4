import { motion } from "framer-motion";
import { Database, GitBranch, Brain, Lightbulb, Atom } from "lucide-react";

const steps = [
  { icon: Database, label: "Research Data" },
  { icon: GitBranch, label: "Knowledge Graph" },
  { icon: Brain, label: "AI Reasoning" },
  { icon: Lightbulb, label: "Hypothesis Generation" },
  { icon: Atom, label: "Simulation Engine" },
];

const Architecture = () => (
  <section className="section-padding">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-sm uppercase tracking-[0.25em] text-primary mb-3 font-body">
          How It Works
        </p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold">
          From Data to Discovery
        </h2>
      </motion.div>

      <div className="flex flex-col items-center gap-2">
        {steps.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="glass-hover rounded-xl px-6 py-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <s.icon size={18} className="text-primary" />
              </div>
              <span className="font-body font-medium text-foreground">{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex justify-center py-1">
                <div className="w-px h-6 bg-gradient-to-b from-primary/40 to-transparent" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Architecture;
