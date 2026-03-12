import { motion } from "framer-motion";
import { HeartPulse, Battery, CloudSun, Beaker } from "lucide-react";

const cases = [
  { icon: HeartPulse, field: "Medicine", desc: "Discover novel drug targets and predict molecular interactions." },
  { icon: Battery, field: "Energy", desc: "Design next-generation battery materials with higher energy density." },
  { icon: CloudSun, field: "Climate", desc: "Find breakthrough carbon capture materials and processes." },
  { icon: Beaker, field: "Chemistry", desc: "Predict chemical reaction pathways and synthesis routes." },
];

const UseCases = () => (
  <section id="usecases" className="section-padding">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-sm uppercase tracking-[0.25em] text-primary mb-3 font-body">Use Cases</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold">
          Across Every Frontier of Science
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cases.map((c, i) => (
          <motion.div
            key={c.field}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass-hover rounded-2xl p-7 text-center group cursor-default"
          >
            <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-500">
              <c.icon size={24} className="text-primary" />
            </div>
            <h3 className="font-heading text-lg font-semibold mb-2">{c.field}</h3>
            <p className="text-muted-foreground text-sm font-body leading-relaxed">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default UseCases;
