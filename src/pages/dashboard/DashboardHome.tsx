import { motion } from "framer-motion";
import { Search, Lightbulb, BookOpen, FlaskConical, ArrowUpRight, TrendingUp, Sparkles, Brain, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

const stats = [
  { label: "Research Queries", value: 1247, change: "+12%", icon: Search },
  { label: "Hypotheses Generated", value: 384, change: "+8%", icon: Lightbulb },
  { label: "Saved Papers", value: 2891, change: "+23%", icon: BookOpen },
  { label: "Simulation Runs", value: 156, change: "+5%", icon: FlaskConical },
];

const queryData = [
  { name: "Mon", queries: 42 }, { name: "Tue", queries: 58 },
  { name: "Wed", queries: 73 }, { name: "Thu", queries: 65 },
  { name: "Fri", queries: 89 }, { name: "Sat", queries: 34 },
  { name: "Sun", queries: 47 },
];

const hypothesisData = [
  { name: "Week 1", generated: 45, validated: 12 },
  { name: "Week 2", generated: 52, validated: 18 },
  { name: "Week 3", generated: 67, validated: 24 },
  { name: "Week 4", generated: 78, validated: 31 },
];

const recentActivity = [
  { action: "Generated hypothesis on lithium-sulfur batteries", time: "2 hours ago" },
  { action: "Uploaded 3 papers on CRISPR gene editing", time: "5 hours ago" },
  { action: "Ran simulation: carbon nanotube conductivity", time: "1 day ago" },
  { action: "Research query: hydrogen fuel cell catalysts", time: "1 day ago" },
  { action: "Created experiment plan: polymer degradation", time: "2 days ago" },
];

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 1200;
    const steps = 30;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);
  return <>{count.toLocaleString()}</>;
}

const DashboardHome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const greeting = user?.user_metadata?.full_name
    ? `Welcome back, ${user.user_metadata.full_name.split(" ")[0]}`
    : "Welcome to ApeironAI";

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Welcome Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card via-card to-primary/5 p-6 md:p-8"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-1">{greeting}</h1>
          <p className="text-muted-foreground font-body text-sm md:text-base mb-6">
            Your AI-powered scientific discovery workspace.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => navigate("/dashboard/copilot")} className="glow-button gap-2 h-10">
              <Sparkles className="h-4 w-4" /> Start New Research
            </Button>
            <Button onClick={() => navigate("/dashboard/hypotheses")} variant="outline" className="glass-hover gap-2 h-10">
              <Brain className="h-4 w-4" /> Generate Hypothesis
            </Button>
            <Button onClick={() => navigate("/dashboard/simulations")} variant="outline" className="glass-hover gap-2 h-10">
              <Play className="h-4 w-4" /> Run Simulation
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="glass group hover:border-primary/30 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.15)] transition-all duration-500 hover:-translate-y-0.5">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)] transition-all duration-500">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs text-green-400 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground mt-3 font-body tracking-tight">
                  <AnimatedCounter target={stat.value} />
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="glass hover:border-primary/20 transition-all duration-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-heading tracking-wide">Research Queries</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={queryData}>
                  <defs>
                    <linearGradient id="queryGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(191, 68%, 50%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(191, 68%, 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 12%)" />
                  <XAxis dataKey="name" stroke="hsl(220, 2%, 40%)" fontSize={12} />
                  <YAxis stroke="hsl(220, 2%, 40%)" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 4%)", border: "1px solid hsl(191, 68%, 50%, 0.2)", borderRadius: "12px", color: "#fff", boxShadow: "0 0 20px hsl(191 68% 50% / 0.1)" }} />
                  <Area type="monotone" dataKey="queries" stroke="hsl(191, 68%, 50%)" fill="url(#queryGrad)" strokeWidth={2} dot={{ fill: "hsl(191, 68%, 50%)", strokeWidth: 0, r: 3 }} activeDot={{ r: 5, fill: "hsl(191, 68%, 50%)", stroke: "hsl(191, 68%, 50%)", strokeWidth: 4, strokeOpacity: 0.3 }} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="glass hover:border-primary/20 transition-all duration-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-heading tracking-wide">Hypotheses Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={hypothesisData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 12%)" />
                  <XAxis dataKey="name" stroke="hsl(220, 2%, 40%)" fontSize={12} />
                  <YAxis stroke="hsl(220, 2%, 40%)" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 4%)", border: "1px solid hsl(191, 68%, 50%, 0.2)", borderRadius: "12px", color: "#fff", boxShadow: "0 0 20px hsl(191 68% 50% / 0.1)" }} />
                  <Bar dataKey="generated" fill="hsl(191, 68%, 50%)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="validated" fill="hsl(191, 40%, 35%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <Card className="glass hover:border-primary/20 transition-all duration-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-heading tracking-wide">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {recentActivity.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.05 }}
                  className="flex items-center justify-between py-3 border-b border-border/30 last:border-0 group hover:bg-card-elevated/30 rounded-lg px-3 -mx-3 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <ArrowUpRight className="h-4 w-4 text-primary/60 group-hover:text-primary transition-colors" />
                    <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">{item.action}</span>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{item.time}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardHome;
