import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CookiePolicy = () => (
  <div className="min-h-screen bg-background">
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-4xl font-bold mb-2">Cookie Policy</h1>
        <p className="text-muted-foreground mb-10">Last updated: March 14, 2026</p>

        <div className="prose prose-invert prose-lg max-w-none space-y-8 text-foreground/90">
          <section><h2 className="font-heading text-2xl font-semibold text-foreground">Essential Cookies</h2><p>ApeironAI uses essential cookies that are necessary for the platform to function properly. These include authentication session tokens, security tokens, and user preference cookies. These cookies cannot be disabled as they are required for core platform functionality.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">Analytics Cookies</h2><p>We use analytics cookies to understand how users interact with ApeironAI, including page views, feature usage patterns, and session duration. This data helps us improve the platform and prioritize feature development. Analytics data is collected in anonymized form.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">Platform Functionality</h2><p>Certain cookies enable enhanced functionality such as remembering your research preferences, maintaining your dashboard layout, and preserving your session state across pages. These cookies improve your experience but are not strictly necessary.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">Third-Party Cookies</h2><p>When you use Google OAuth for authentication, Google may set cookies according to their own cookie policy. We do not control third-party cookies and recommend reviewing their respective privacy policies.</p></section>

          <section><h2 className="font-heading text-2xl font-semibold text-foreground">Managing Cookies</h2><p>You can manage cookie preferences through your browser settings. Note that disabling essential cookies may prevent you from using certain features of ApeironAI. For questions about our cookie practices, contact <a href="mailto:cherazen.ai@gmail.com" className="text-primary hover:underline">cherazen.ai@gmail.com</a>.</p></section>
        </div>
      </motion.div>
    </div>
  </div>
);

export default CookiePolicy;
