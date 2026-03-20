import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FlaskConical, Sun, Moon } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logoIcon from "@/assets/logo-icon.png";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Research", href: "/#research" },
  { label: "Pricing", href: "/pricing", isRoute: true },
  { label: "Blog", href: "/#blog" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");
  const navigate = useNavigate();
  const location = useLocation();

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    window.dispatchEvent(new Event("themechange"));
  };

  const handleNavClick = (link: typeof navLinks[0]) => {
    setOpen(false);
    if (link.isRoute) { navigate(link.href); return; }
    const hash = link.href.replace("/#", "#");
    if (location.pathname === "/") {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(link.href);
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl border-b transition-colors duration-300 ${
        isDark ? "bg-background/70 border-border/30" : "bg-white/80 border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3.5">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logoIcon} alt="ApeironAI" className="h-7 w-7" />
          <span className={`font-heading text-lg font-semibold tracking-tight ${isDark ? "text-foreground" : "text-[#1E1B4B]"}`}>
            ApeironAI
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <button key={l.label} onClick={() => handleNavClick(l)}
              className={`text-sm transition-colors duration-300 bg-transparent border-none cursor-pointer ${isDark ? "text-muted-foreground hover:text-foreground" : "text-gray-500 hover:text-[#1E1B4B]"}`}>
              {l.label}
            </button>
          ))}
          <a href="https://labs.cherazen.com" target="_blank" rel="noopener noreferrer"
            className={`text-sm transition-colors duration-300 flex items-center gap-1.5 ${isDark ? "text-muted-foreground hover:text-primary" : "text-gray-500 hover:text-purple-600"}`}>
            <FlaskConical size={14} /> Reality Lab
          </a>
          <Link to="/login" className={`text-sm transition-colors ${isDark ? "text-muted-foreground hover:text-foreground" : "text-gray-500 hover:text-[#1E1B4B]"}`}>
            Log In
          </Link>
          <Link to="/signup"
            className={`text-sm font-medium px-5 py-2 rounded-full transition-all duration-300 ${isDark ? "bg-primary text-primary-foreground glow-button hover:brightness-110" : "bg-[#1E1B4B] text-white hover:bg-[#2d2a6e]"}`}>
            Get Started
          </Link>
          <button onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${isDark ? "text-muted-foreground hover:text-foreground" : "text-gray-500 hover:text-[#1E1B4B]"}`}>
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggleTheme} className={isDark ? "text-muted-foreground" : "text-gray-500"}>
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button className={isDark ? "text-foreground" : "text-[#1E1B4B]"} onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className={`md:hidden overflow-hidden backdrop-blur-2xl border-t ${isDark ? "bg-background/95 border-border/30" : "bg-white/95 border-gray-200"}`}>
            <div className="flex flex-col gap-4 px-5 py-6">
              {navLinks.map((l) => (
                <button key={l.label} onClick={() => handleNavClick(l)}
                  className={`text-left transition-colors bg-transparent border-none cursor-pointer ${isDark ? "text-muted-foreground hover:text-foreground" : "text-gray-500 hover:text-[#1E1B4B]"}`}>
                  {l.label}
                </button>
              ))}
              <a href="https://labs.cherazen.com" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}
                className={`transition-colors flex items-center gap-1.5 ${isDark ? "text-muted-foreground hover:text-primary" : "text-gray-500 hover:text-purple-600"}`}>
                <FlaskConical size={14} /> Reality Lab
              </a>
              <Link to="/login" onClick={() => setOpen(false)}
                className={`transition-colors ${isDark ? "text-muted-foreground hover:text-foreground" : "text-gray-500 hover:text-[#1E1B4B]"}`}>
                Log In
              </Link>
              <Link to="/signup" onClick={() => setOpen(false)}
                className={`text-sm font-medium px-5 py-2.5 rounded-full text-center transition-all duration-300 ${isDark ? "bg-primary text-primary-foreground glow-button" : "bg-[#1E1B4B] text-white"}`}>
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
