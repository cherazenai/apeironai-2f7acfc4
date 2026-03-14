import { Link } from "react-router-dom";
import logoIcon from "@/assets/logo-icon.png";

const Footer = () => (
  <footer className="border-t border-border/50 section-padding py-12">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src={logoIcon} alt="ApeironAI" className="h-6 w-6" />
            <span className="font-heading text-sm font-semibold">ApeironAI</span>
          </div>
          <p className="text-xs text-muted-foreground/60 font-body">
            AI-powered scientific discovery engine by Cherazen Inc.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-body uppercase tracking-[0.2em] text-muted-foreground mb-3">Platform</h4>
          <div className="space-y-2">
            <a href="#features" className="block text-sm text-muted-foreground/80 hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="block text-sm text-muted-foreground/80 hover:text-foreground transition-colors">Pricing</a>
            <Link to="/dashboard" className="block text-sm text-muted-foreground/80 hover:text-foreground transition-colors">Dashboard</Link>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-body uppercase tracking-[0.2em] text-muted-foreground mb-3">Legal</h4>
          <div className="space-y-2">
            <Link to="/terms" className="block text-sm text-muted-foreground/80 hover:text-foreground transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="block text-sm text-muted-foreground/80 hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/responsible-ai" className="block text-sm text-muted-foreground/80 hover:text-foreground transition-colors">Responsible AI</Link>
            <Link to="/cookies" className="block text-sm text-muted-foreground/80 hover:text-foreground transition-colors">Cookie Policy</Link>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-body uppercase tracking-[0.2em] text-muted-foreground mb-3">Company</h4>
          <div className="space-y-2">
            <a href="https://www.cherazen.com" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground/80 hover:text-foreground transition-colors">Cherazen Blog</a>
            <a href="https://instagram.com/aperionhq" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground/80 hover:text-foreground transition-colors">Instagram</a>
            <a href="mailto:cherazen.ai@gmail.com" className="block text-sm text-muted-foreground/80 hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </div>

      <div className="border-t border-border/30 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground/60 font-body">
          © {new Date().getFullYear()} Cherazen Inc. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link to="/research-ethics" className="text-xs text-muted-foreground/60 hover:text-foreground transition-colors">Research Ethics</Link>
          <Link to="/data-usage" className="text-xs text-muted-foreground/60 hover:text-foreground transition-colors">Data Usage</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
