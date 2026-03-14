import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-background">
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-10">Last updated: March 14, 2026</p>

        <div className="prose prose-invert prose-lg max-w-none space-y-8 text-foreground/90">
          <section><h2 className="font-heading text-2xl font-semibold text-foreground">1. Information We Collect</h2><p>We collect information you provide directly, including your name, email address, organization, and research data you input into ApeironAI. We also collect information about how you interact with our platform.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">2. Usage Data</h2><p>We automatically collect usage data including research queries, hypothesis generation requests, simulation parameters, page views, device information, and interaction patterns to improve our services.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">3. Cookies and Tracking</h2><p>ApeironAI uses essential cookies for authentication and session management, and analytics cookies to understand platform usage patterns. See our Cookie Policy for more details.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">4. How Data Is Used</h2><p>Your data is used to provide and improve ApeironAI services, personalize your research experience, generate AI-powered insights, maintain platform security, and communicate important updates.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">5. Data Protection</h2><p>We implement industry-standard security measures including encryption at rest and in transit, access controls, and regular security audits. Research data is stored securely and isolated per user through row-level security policies.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">6. Third Party Services</h2><p>We use third-party services for authentication (Google OAuth), cloud infrastructure, and AI model processing. These services have their own privacy policies and data handling practices.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">7. Security Practices</h2><p>We employ encryption, secure authentication protocols, regular vulnerability assessments, and access monitoring to protect your data. All data transmissions are encrypted using TLS.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">8. User Rights</h2><p>You have the right to access, correct, or delete your personal data. You may request data export or account deletion by contacting cherazen.ai@gmail.com.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">9. Data Retention</h2><p>We retain your data for as long as your account is active. Upon account deletion, your personal data will be removed within 30 days. Anonymized usage analytics may be retained indefinitely.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">10. Changes to Policy</h2><p>We may update this Privacy Policy periodically. We will notify you of significant changes via email or platform notification.</p></section>

          <section><p className="text-muted-foreground">Contact us at <a href="mailto:cherazen.ai@gmail.com" className="text-primary hover:underline">cherazen.ai@gmail.com</a> with privacy concerns.</p></section>
        </div>
      </motion.div>
    </div>
  </div>
);

export default PrivacyPolicy;
