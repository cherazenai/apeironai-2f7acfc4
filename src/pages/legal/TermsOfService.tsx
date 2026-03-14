import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => (
  <div className="min-h-screen bg-background">
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-10">Last updated: March 14, 2026</p>

        <div className="prose prose-invert prose-lg max-w-none space-y-8 text-foreground/90">
          <section><h2 className="font-heading text-2xl font-semibold text-foreground">1. Introduction</h2><p>Welcome to ApeironAI, an AI-powered scientific research platform operated by Cherazen Inc. ("Company", "we", "us", "our"). By accessing or using our platform at ai.cherazen.com, you agree to be bound by these Terms of Service.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">2. Acceptance of Terms</h2><p>By creating an account or using ApeironAI, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, you must discontinue use of the platform immediately.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">3. Platform Description</h2><p>ApeironAI is an advanced AI research platform that provides hypothesis generation, research paper analysis, simulation engines, experiment planning, and knowledge synthesis tools designed for scientific researchers, academics, and institutions.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">4. User Responsibilities</h2><p>Users are responsible for maintaining the confidentiality of their account credentials, ensuring that all research conducted through the platform adheres to ethical standards, and providing accurate information during registration. Users must not share account access with unauthorized third parties.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">5. Acceptable Use Policy</h2><p>You agree not to use ApeironAI for any unlawful purpose, to generate harmful or misleading scientific content, to attempt to reverse-engineer or exploit the platform's AI systems, or to interfere with the platform's operation or other users' access.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">6. Research Content Guidelines</h2><p>All research content generated through ApeironAI should be used for legitimate scientific purposes. Users are responsible for verifying AI-generated hypotheses and conclusions through proper scientific methodology before publication or practical application.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">7. Intellectual Property</h2><p>Users retain ownership of their original research inputs and data uploaded to the platform. AI-generated outputs are provided as tools to assist research and do not constitute independent intellectual property claims by Cherazen Inc. The platform's underlying technology, algorithms, and design remain the exclusive property of Cherazen Inc.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">8. AI Generated Content Disclaimer</h2><p>ApeironAI's AI-generated content, including hypotheses, simulations, and analyses, is provided for research assistance purposes only. This content should not be considered as definitive scientific conclusions. Users must independently verify all AI-generated outputs. Cherazen Inc. makes no warranties regarding the accuracy or completeness of AI-generated content.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">9. Limitation of Liability</h2><p>To the maximum extent permitted by law, Cherazen Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of ApeironAI, including but not limited to damages resulting from reliance on AI-generated research outputs.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">10. Termination of Service</h2><p>We reserve the right to suspend or terminate your account at any time for violation of these Terms. You may also terminate your account at any time by contacting cherazen.ai@gmail.com.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">11. Updates to Terms</h2><p>We may update these Terms from time to time. Continued use of ApeironAI after changes are posted constitutes acceptance of the revised Terms.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">12. Governing Law</h2><p>These Terms are governed by and construed in accordance with applicable laws. Any disputes shall be resolved through binding arbitration or in the courts of competent jurisdiction.</p></section>

          <section><p className="text-muted-foreground">For questions about these Terms, contact us at <a href="mailto:cherazen.ai@gmail.com" className="text-primary hover:underline">cherazen.ai@gmail.com</a>.</p></section>
        </div>
      </motion.div>
    </div>
  </div>
);

export default TermsOfService;
