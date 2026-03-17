import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FlaskConical } from "lucide-react";
import { Link } from "react-router-dom";
import logoIcon from "@/assets/logo-icon.png";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Research", href: "/#research" },
  { label: "Pricing", href: "/pricing", isRoute: true },
  { label: "Blog", href: "/#blog" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-2xl border-b border-border/30"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3.5">
        <a href="#" className="flex items-center gap-2.5">
          <img src={logoIcon} alt="ApeironAI" className="h-7 w-7" />
          <span className="font-heading text-lg font-semibold text-foreground tracking-tight">ApeironAI</span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">{l.label}</a>
          ))}
          <a href="https://labs.cherazen.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-1.5">
            <FlaskConical size={14} /> Reality Lab
          </a>
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Log In</Link>
          <Link to="/signup" className="text-sm font-medium bg-primary text-primary-foreground px-5 py-2 rounded-lg glow-button transition-all duration-300 hover:brightness-110">Get Started</Link>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden overflow-hidden bg-background/95 backdrop-blur-2xl border-t border-border/30">
            <div className="flex flex-col gap-4 px-5 py-6">
              {navLinks.map((l) => (
                <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">{l.label}</a>
              ))}
              <a href="https://labs.cherazen.com" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                <FlaskConical size={14} /> Reality Lab
              </a>
              <Link to="/login" onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">Log In</Link>
              <Link to="/signup" onClick={() => setOpen(false)} className="text-sm font-medium bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-center glow-button">Get Started</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
