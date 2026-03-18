import { useEffect } from "react";
import { motion } from "framer-motion";

const Waitlist = () => {
  useEffect(() => {
    const w = "https://tally.so/widgets/embed.js";
    const v = () => {
      if (typeof (window as any).Tally !== "undefined") {
        (window as any).Tally.loadEmbeds();
      } else {
        document.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((e: any) => {
          e.src = e.dataset.tallySrc;
        });
      }
    };
    if (typeof (window as any).Tally !== "undefined") {
      v();
    } else if (!document.querySelector(`script[src="${w}"]`)) {
      const s = document.createElement("script");
      s.src = w;
      s.onload = v;
      s.onerror = v;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <section id="waitlist" className="section-padding">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3 font-body">Early Access</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight mb-3">Join the Waitlist</h2>
          <p className="text-muted-foreground mb-8 font-body text-sm">Be the first to access ApeironAI when we launch publicly.</p>

          <iframe
            data-tally-src="https://tally.so/embed/1AE2MM?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height="1059"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="ApeironAI Waitlist"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Waitlist;
