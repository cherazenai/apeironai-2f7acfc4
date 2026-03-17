import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Get started with essential research tools",
    features: [
      "Paper summarization",
      "5 research queries per day",
      "Basic knowledge graph",
      "Community access",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Researcher",
    price: "$29",
    period: "/month",
    description: "For active researchers pushing boundaries",
    features: [
      "Unlimited paper summaries",
      "Hypothesis generation",
      "Cross-paper discovery",
      "Experiment planning",
      "Priority processing",
    ],
    cta: "Start Free Trial",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Scientist",
    price: "$79",
    period: "/month",
    description: "Advanced tools for serious scientific work",
    features: [
      "Advanced discovery engine",
      "Reality simulation tools",
      "Dataset analysis",
      "Export research reports",
      "Team collaboration",
    ],
    cta: "Start Free Trial",
    highlight: false,
  },
  {
    name: "Lab / Enterprise",
    price: "Custom",
    period: "",
    description: "Built for research teams and institutions",
    features: [
      "Custom AI models",
      "Unlimited simulations",
      "Private knowledge graph",
      "Dedicated compute",
      "API access",
      "Team workspace",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

const Pricing = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="pt-32 pb-20 px-5 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Ambient glow */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 relative z-10"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3 font-body">Pricing</p>
          <h1 className="font-heading text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Choose the plan that fits your research needs. Upgrade or downgrade anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card
                className={`p-6 h-full flex flex-col ${
                  p.highlight
                    ? "glass glow-border border-primary/30"
                    : "glass-hover"
                }`}
              >
                {p.badge && (
                  <span className="inline-block text-xs font-body font-medium bg-primary/20 text-primary px-3 py-1 rounded-full mb-4 w-fit">
                    {p.badge}
                  </span>
                )}
                <h3 className="font-heading text-xl font-bold mb-1">{p.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">{p.description}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-heading text-3xl font-bold">{p.price}</span>
                  {p.period && (
                    <span className="text-muted-foreground text-sm font-body">{p.period}</span>
                  )}
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm font-body text-muted-foreground">
                      <Check size={14} className="text-primary flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    p.highlight
                      ? "glow-button"
                      : "glass-hover bg-secondary hover:bg-secondary/80 text-foreground"
                  }`}
                  asChild={p.name === "Lab / Enterprise"}
                >
                  {p.name === "Lab / Enterprise" ? (
                    <a href="mailto:contact@cherazen.com">
                      {p.cta} <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  ) : (
                    <Link to="/signup">
                      {p.cta} {p.highlight && <Sparkles className="ml-2 h-4 w-4" />}
                    </Link>
                  )}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Pricing;
