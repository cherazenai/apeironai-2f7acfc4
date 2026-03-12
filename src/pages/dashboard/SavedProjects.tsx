import { motion } from "framer-motion";
import { FolderKanban, Plus, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const projects = [
  { id: 1, name: "Battery Materials Research", papers: 12, hypotheses: 5, updated: "2 hours ago" },
  { id: 2, name: "CRISPR Delivery Mechanisms", papers: 8, hypotheses: 3, updated: "1 day ago" },
  { id: 3, name: "Carbon Capture MOFs", papers: 15, hypotheses: 7, updated: "3 days ago" },
];

const SavedProjects = () => (
  <div className="space-y-6 max-w-5xl">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-heading text-foreground">Saved Projects</h1>
        <p className="text-muted-foreground text-sm">Organize your research</p>
      </div>
      <Button className="glow-button gap-2"><Plus className="h-4 w-4" /> New Project</Button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((p, i) => (
        <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
          <Card className="glass-hover cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <FolderKanban className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground text-sm">{p.name}</h3>
              </div>
              <div className="flex gap-4 text-xs text-muted-foreground mb-3">
                <span>{p.papers} papers</span>
                <span>{p.hypotheses} hypotheses</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" /> {p.updated}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
);

export default SavedProjects;
