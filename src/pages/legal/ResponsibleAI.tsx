import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ResponsibleAI = () => (
  <div className="min-h-screen bg-background">
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-4xl font-bold mb-2">Responsible AI Usage Policy</h1>
        <p className="text-muted-foreground mb-10">Last updated: March 14, 2026</p>

        <div className="prose prose-invert prose-lg max-w-none space-y-8 text-foreground/90">
          <section><h2 className="font-heading text-2xl font-semibold text-foreground">Scientific Integrity</h2><p>ApeironAI is designed to augment scientific research, not replace critical thinking. Users must treat AI-generated hypotheses, analyses, and simulations as starting points for further investigation. All AI outputs should be validated through established scientific methodology before being cited, published, or acted upon.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">Prohibition of Misinformation</h2><p>Users must not use ApeironAI to generate, validate, or spread scientific misinformation. This includes fabricating experimental results, manipulating data to support predetermined conclusions, or presenting AI-generated content as peer-reviewed research without proper verification.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">Harmful Research Restrictions</h2><p>ApeironAI must not be used to design, simulate, or plan research involving biological weapons, chemical weapons, or any materials intended to cause harm. Research involving dangerous pathogens, toxic substances, or dual-use technologies must comply with all applicable biosafety regulations and ethical guidelines.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">AI Simulation Ethics</h2><p>AI-generated simulations are computational predictions based on existing data and models. They do not constitute experimental evidence. Users must clearly distinguish between AI-simulated outcomes and empirical experimental results in all publications and communications.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">Transparency and Attribution</h2><p>When using ApeironAI-generated content in publications or presentations, users should disclose the use of AI assistance. We encourage proper attribution following emerging academic standards for AI-assisted research.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">Reporting Concerns</h2><p>If you become aware of misuse of ApeironAI or encounter AI outputs that may be harmful, please report them immediately to <a href="mailto:cherazen.ai@gmail.com" className="text-primary hover:underline">cherazen.ai@gmail.com</a>.</p></section>
        </div>
      </motion.div>
    </div>
  </div>
);

export default ResponsibleAI;
