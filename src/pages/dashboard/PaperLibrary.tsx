import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Upload, Search, Tag, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const mockPapers = [
  { id: 1, title: "Advances in Lithium-Sulfur Battery Cathode Design", authors: "Zhang et al.", year: 2024, tags: ["batteries", "materials"], summary: "Review of recent cathode architectures for Li-S batteries with improved cycling stability." },
  { id: 2, title: "CRISPR-Cas9 Applications in Cancer Immunotherapy", authors: "Patel, Rodriguez", year: 2024, tags: ["biology", "CRISPR"], summary: "Comprehensive analysis of gene editing approaches for T-cell engineering." },
  { id: 3, title: "Metal-Organic Frameworks for Carbon Capture", authors: "Li, Wang, Chen", year: 2023, tags: ["climate", "materials"], summary: "Novel MOF structures showing 40% improved CO₂ absorption rates." },
  { id: 4, title: "Quantum Dot Solar Cells: Efficiency Breakthroughs", authors: "Kim, Nakamura", year: 2024, tags: ["energy", "quantum"], summary: "Perovskite quantum dot architectures achieving 18.3% efficiency." },
];

const PaperLibrary = () => {
  const [search, setSearch] = useState("");
  const filtered = mockPapers.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.tags.some((t) => t.includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading text-foreground">Paper Library</h1>
          <p className="text-muted-foreground text-sm">Manage and explore research papers</p>
        </div>
        <Button className="glow-button gap-2">
          <Upload className="h-4 w-4" /> Upload Paper
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search papers by title or tag..."
          className="pl-10 bg-card-elevated border-border"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((paper, i) => (
          <motion.div key={paper.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="glass-hover">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen className="h-4 w-4 text-primary shrink-0" />
                      <h3 className="font-semibold text-foreground text-sm truncate">{paper.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{paper.authors} · {paper.year}</p>
                    <p className="text-sm text-muted-foreground mb-3">{paper.summary}</p>
                    <div className="flex gap-2 flex-wrap">
                      {paper.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-primary/10 text-primary border-0">
                          <Tag className="h-3 w-3 mr-1" /> {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-primary">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PaperLibrary;
