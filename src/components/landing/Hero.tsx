import { motion } from "framer-motion";
import { ArrowRight, Sparkles, FlaskConical } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

function ParticleCanvas({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const particles: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = [];
    const count = Math.min(60, Math.floor(w * h / 12000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        o: Math.random() * 0.5 + 0.1,
      });
    }

    const hue = isDark ? "199, 89%, 48%" : "262, 83%, 58%";

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, ${p.o})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(${hue}, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [isDark]);

  useEffect(() => {
    const cleanup = draw();
    const handleResize = () => draw();
    window.addEventListener("resize", handleResize);
    return () => { cleanup?.(); window.removeEventListener("resize", handleResize); };
  }, [draw]);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: isDark ? 0.6 : 0.4 }} />
  );
}

const Hero = () => {
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const handler = () => setIsDark(localStorage.getItem("theme") === "dark");
    window.addEventListener("themechange", handler);
    return () => window.removeEventListener("themechange", handler);
  }, []);

  return (
    <section className={`relative min-h-screen flex items-center justify-center section-padding pt-28 overflow-hidden transition-colors duration-300 ${isDark ? "aurora-bg" : "bg-[#EEF2FF]"}`}>
      <ParticleCanvas isDark={isDark} />

      {isDark && (
        <>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/8 blur-[150px] pointer-events-none animate-glow-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/6 w-[300px] h-[300px] rounded-full bg-primary-glow/5 blur-[100px] pointer-events-none" />
        </>
      )}

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 ${isDark ? "border border-primary/20 bg-primary/5 backdrop-blur-sm" : "bg-blue-100"}`}
        >
          <Sparkles size={14} className={isDark ? "text-primary" : "text-purple-600"} />
          <span className={`text-xs font-body tracking-wide ${isDark ? "text-primary" : "text-purple-700"}`}>
            AI Reality Simulator + Scientific Discovery Engine
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className={`font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6 tracking-tight ${isDark ? "" : "text-[#1E1B4B]"}`}
        >
          Accelerating{" "}
          <span className={isDark ? "gradient-text" : "text-[#7C3AED]"}>Scientific</span>
          <br className="hidden sm:block" />
          <span className={isDark ? "gradient-text-alt" : "text-[#7C3AED]"}> Discovery</span>{" "}
          with AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className={`text-base md:text-lg max-w-2xl mx-auto mb-10 font-body leading-relaxed ${isDark ? "text-muted-foreground" : "text-gray-500"}`}
        >
          AI-powered hypothesis generation, cross-paper knowledge synthesis, and
          reality simulation — built for researchers pushing the boundaries of science.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a href="/dashboard"
            className={`inline-flex items-center justify-center gap-2 font-semibold px-8 py-3.5 rounded-full transition-all duration-300 text-sm ${isDark ? "bg-primary text-primary-foreground glow-button hover:brightness-110" : "bg-[#1E1B4B] text-white hover:bg-[#2d2a6e]"}`}>
            <Sparkles size={16} /> Start Research
          </a>
          <a href="https://labs.cherazen.com" target="_blank" rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-medium text-sm transition-all duration-300 ${isDark ? "glass-hover text-foreground" : "bg-white border border-gray-200 text-[#1E1B4B] hover:border-purple-300"}`}>
            <FlaskConical size={16} /> Explore Reality Lab
          </a>
          <a href="#waitlist"
            className={`inline-flex items-center justify-center gap-2 border px-8 py-3.5 rounded-full font-medium text-sm transition-all duration-300 ${isDark ? "border-border/50 hover:border-primary/30 text-muted-foreground hover:text-foreground" : "border-transparent text-gray-500 hover:text-[#1E1B4B]"}`}>
            Join Waitlist <ArrowRight size={16} />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className={`mt-20 text-xs font-body ${isDark ? "text-muted-foreground/50" : "text-gray-400"}`}
        >
          Built by Cherazen Inc. · Founded by Manish Talukdar
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
