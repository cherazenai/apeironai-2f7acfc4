import { motion } from "framer-motion";
import { Brain, Lightbulb, Atom, FlaskConical } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Knowledge Engine",
    desc: "Reads and connects knowledge across thousands of scientific papers in real-time.",
  },
  {
    icon: Lightbulb,
    title: "Hypothesis Generator",
    desc: "Generates novel hypotheses with confidence scores and supporting evidence.",
  },
  {
    icon: Atom,
    title: "Reality Simulation Engine",
    desc: "Predicts experimental outcomes before you step into the lab.",
  },
  {
    icon: FlaskConical,
    title: "Experiment Planner",
    desc: "AI-designed step-by-step protocols to test your hypotheses efficiently.",
  },
];

const Features = () => (
  <section id="features" className="section-padding">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-sm uppercase tracking-[0.25em] text-primary mb-3 font-body">
          Platform Capabilities
        </p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold">
          Tools for the Future of Research
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass-hover rounded-2xl p-8 group cursor-default"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-500">
              <f.icon size={22} className="text-primary" />
            </div>
            <h3 className="font-heading text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed font-body">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
