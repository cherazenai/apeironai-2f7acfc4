import logoIcon from "@/assets/logo-icon.png";

const Footer = () => (
  <footer className="border-t border-border/50 section-padding py-12">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2">
        <img src={logoIcon} alt="ApeironAI" className="h-6 w-6" />
        <span className="font-heading text-sm font-semibold">ApeironAI</span>
        <span className="text-muted-foreground text-xs font-body ml-2">
          by Cherazen Inc.
        </span>
      </div>
      <p className="text-xs text-muted-foreground/60 font-body">
        © {new Date().getFullYear()} Cherazen Inc. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
