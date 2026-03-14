import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const DataUsagePolicy = () => (
  <div className="min-h-screen bg-background">
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-4xl font-bold mb-2">Data Usage Policy</h1>
        <p className="text-muted-foreground mb-10">Last updated: March 14, 2026</p>

        <div className="prose prose-invert prose-lg max-w-none space-y-8 text-foreground/90">
          <section><h2 className="font-heading text-2xl font-semibold text-foreground">Research Queries</h2><p>Research queries submitted to ApeironAI are processed in real-time by our AI systems to generate relevant responses. Queries are stored in your account for history and continuity purposes. Query data may be used in aggregate (anonymized) to improve AI model performance.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">Uploaded Papers</h2><p>Papers and documents uploaded to ApeironAI are stored securely in your personal library. Document content is processed for AI analysis, insight extraction, and hypothesis generation. Uploaded papers are never shared with other users or third parties without your explicit consent.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">Simulations and Experiments</h2><p>Simulation parameters and results are stored in your account for reference and continuity. Simulation data may be used in anonymized form to improve prediction accuracy across the platform.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">AI Processing</h2><p>Your research data is processed through AI models to generate insights, hypotheses, and simulations. This processing occurs in real-time and data is not retained by AI model providers beyond the processing session.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">Data Deletion</h2><p>You may request complete deletion of your research data at any time by contacting <a href="mailto:cherazen.ai@gmail.com" className="text-primary hover:underline">cherazen.ai@gmail.com</a>. Upon request, all personal research data will be permanently removed within 30 days.</p></section>
        </div>
      </motion.div>
    </div>
  </div>
);

export default DataUsagePolicy;
