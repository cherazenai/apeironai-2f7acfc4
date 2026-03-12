import { motion } from "framer-motion";
import { Search, Lightbulb, BookOpen, FlaskConical, ArrowUpRight, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const stats = [
  { label: "Research Queries", value: "1,247", change: "+12%", icon: Search, color: "text-primary" },
  { label: "Hypotheses Generated", value: "384", change: "+8%", icon: Lightbulb, color: "text-accent-soft" },
  { label: "Saved Papers", value: "2,891", change: "+23%", icon: BookOpen, color: "text-primary-muted" },
  { label: "Simulation Runs", value: "156", change: "+5%", icon: FlaskConical, color: "text-accent" },
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

const DashboardHome = () => {
  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-heading text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your research activity</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="glass-hover">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <span className="text-xs text-green-400 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground mt-3">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg font-heading">Research Queries</CardTitle>
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
                  <XAxis dataKey="name" stroke="hsl(220, 2%, 50%)" fontSize={12} />
                  <YAxis stroke="hsl(220, 2%, 50%)" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 6.7%)", border: "1px solid hsl(0, 0%, 12%)", borderRadius: "8px", color: "#fff" }} />
                  <Area type="monotone" dataKey="queries" stroke="hsl(191, 68%, 50%)" fill="url(#queryGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg font-heading">Hypotheses Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={hypothesisData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 12%)" />
                  <XAxis dataKey="name" stroke="hsl(220, 2%, 50%)" fontSize={12} />
                  <YAxis stroke="hsl(220, 2%, 50%)" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 6.7%)", border: "1px solid hsl(0, 0%, 12%)", borderRadius: "8px", color: "#fff" }} />
                  <Bar dataKey="generated" fill="hsl(191, 68%, 50%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="validated" fill="hsl(191, 40%, 35%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-lg font-heading">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div className="flex items-center gap-3">
                    <ArrowUpRight className="h-4 w-4 text-primary" />
                    <span className="text-sm text-foreground">{item.action}</span>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardHome;
