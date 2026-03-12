import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    features: ["Paper summarization", "Research copilot", "5 queries/day"],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Researcher",
    price: "$29",
    period: "/month",
    features: [
      "Everything in Starter",
      "Hypothesis generation",
      "Cross-paper discovery",
      "Experiment planning",
      "Unlimited queries",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlight: true,
  },
];

const Pricing = () => (
  <section id="pricing" className="section-padding">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-sm uppercase tracking-[0.25em] text-primary mb-3 font-body">
          Pricing
        </p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold">
          Simple, Transparent Pricing
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {plans.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className={`rounded-2xl p-8 ${
              p.highlight
                ? "glass glow-border border-primary/30"
                : "glass-hover"
            }`}
          >
            {p.highlight && (
              <span className="inline-block text-xs font-body font-medium bg-primary/20 text-primary px-3 py-1 rounded-full mb-4">
                Most Popular
              </span>
            )}
            <h3 className="font-heading text-2xl font-bold mb-1">{p.name}</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-heading text-4xl font-bold">{p.price}</span>
              {p.period && (
                <span className="text-muted-foreground text-sm font-body">{p.period}</span>
              )}
            </div>

            <ul className="space-y-3 mb-8">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm font-body text-muted-foreground">
                  <Check size={15} className="text-primary flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 rounded-lg font-medium text-sm transition-all duration-300 font-body ${
                p.highlight
                  ? "bg-primary text-primary-foreground glow-button"
                  : "glass-hover text-foreground"
              }`}
            >
              {p.cta}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing;
