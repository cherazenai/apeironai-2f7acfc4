import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import logoFull from "@/assets/logo-full.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center section-padding pt-32 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-accent-soft/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={logoFull}
            alt="ApeironAI"
            className="h-16 md:h-20 mx-auto mb-8 animate-float"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-sm font-body uppercase tracking-[0.3em] text-primary mb-6"
        >
          AI Reality Simulator + Scientific Discovery Engine
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
        >
          Accelerating{" "}
          <span className="gradient-text">Scientific Discovery</span>{" "}
          with AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-body"
        >
          AI-powered hypothesis generation, cross-paper knowledge synthesis, and
          reality simulation — built for researchers who push boundaries.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium px-8 py-3.5 rounded-lg glow-button transition-all duration-300 text-sm"
          >
            <Sparkles size={16} />
            Start Research
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center gap-2 glass-hover px-8 py-3.5 rounded-lg text-foreground font-medium text-sm"
          >
            Join Waitlist
            <ArrowRight size={16} />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-16 text-xs text-muted-foreground/60 font-body"
        >
          Built by Cherazen Inc. · Founded by Manish Talukdar
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
