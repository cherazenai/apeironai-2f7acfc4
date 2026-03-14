import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogSection = () => (
  <section className="section-padding">
    <div className="max-w-4xl mx-auto text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="text-sm uppercase tracking-[0.25em] text-primary mb-3 font-body">From Cherazen</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">Insights from Cherazen</h2>
        <p className="text-muted-foreground mb-8 font-body max-w-2xl mx-auto">
          Explore research insights, AI breakthroughs, and ideas shaping the future of scientific discovery.
        </p>

        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="inline-block"
        >
          <a href="https://www.cherazen.com" target="_blank" rel="noopener noreferrer">
            <Button className="glow-button gap-2 h-12 px-8 text-base group">
              <BookOpen className="h-5 w-5" />
              Read Our Blog
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default BlogSection;
