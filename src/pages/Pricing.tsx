
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    planKey: "free",
    description: "Get started with essential research tools",
    features: [
      "Paper summarization",
      "5 research queries per day",
      "Basic knowledge graph",
      "Community access",
    ],
    cta: "Get Started",
    highlight: false,
    payable: false,
  },
  {
    name: "Researcher",
    price: "₹2,900",
    period: "/month",
    planKey: "researcher",
    description: "For active researchers pushing boundaries",
    features: [
      "Unlimited paper summaries",
      "Hypothesis generation",
      "Cross-paper discovery",
      "Experiment planning",
      "Priority processing",
    ],
    cta: "Subscribe",
    highlight: true,
    badge: "Most Popular",
    payable: true,
  },
  {
    name: "Scientist",
    price: "₹7,900",
    period: "/month",
    planKey: "scientist",
    description: "Advanced tools for serious scientific work",
    features: [
      "Advanced discovery engine",
      "Reality simulation tools",
      "Dataset analysis",
      "Export research reports",
      "Team collaboration",
    ],
    cta: "Subscribe",
    highlight: false,
    payable: true,
  },
  {
    name: "Lab / Enterprise",
    price: "Custom",
    period: "",
    planKey: "enterprise",
    description: "Built for research teams and institutions",
    features: [
      "Custom AI models",
      "Unlimited simulations",
      "Private knowledge graph",
      "Dedicated compute",
      "API access",
      "Team workspace",
    ],
    cta: "Contact Sales",
    highlight: false,
    payable: false,
  },
];

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Pricing = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSubscribe = async (planKey: string) => {
    if (!user) {
      toast({ title: "Please sign in", description: "You need to be logged in to subscribe.", variant: "destructive" });
      return;
    }

    setLoadingPlan(planKey);

    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("Failed to load Razorpay");

      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;

      if (!token) {
        toast({ title: "Session expired", description: "Please log in again.", variant: "destructive" });
        setLoadingPlan(null);
        return;
      }

      const { data, error } = await supabase.functions.invoke("razorpay", {
        body: { action: "create_order", plan: planKey },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (error || !data?.order_id) throw new Error(error?.message || "Order creation failed");

      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: data.currency,
        name: "ApeironAI",
        description: `${planKey.charAt(0).toUpperCase() + planKey.slice(1)} Plan`,
        order_id: data.order_id,
        handler: async (response: any) => {
          try {
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke("razorpay", {
              body: {
                action: "verify_payment",
                plan: planKey,
                payment_id: response.razorpay_payment_id,
                order_id: response.razorpay_order_id,
                signature: response.razorpay_signature,
              },
              headers: { Authorization: `Bearer ${token}` },
            });

            if (verifyError || !verifyData?.success) {
              toast({ title: "Verification failed", description: "Payment could not be verified.", variant: "destructive" });
            } else {
              toast({ title: "Payment successful! 🎉", description: `You're now on the ${planKey} plan.` });
            }
          } catch {
            toast({ title: "Error", description: "Payment verification failed.", variant: "destructive" });
          }
        },
        prefill: {
          email: user.email,
          name: user.user_metadata?.full_name || "",
        },
        theme: { color: "#0EA5E9" },
        modal: {
          ondismiss: () => setLoadingPlan(null),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Something went wrong.", variant: "destructive" });
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20 px-5 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16 relative z-10"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3 font-body">Pricing</p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Choose the plan that fits your research needs. Upgrade or downgrade anytime.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
            {plans.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  className={`p-6 h-full flex flex-col ${
                    p.highlight ? "glass glow-border border-primary/30" : "glass-hover"
                  }`}
                >
                  {p.badge && (
                    <span className="inline-block text-xs font-body font-medium bg-primary/20 text-primary px-3 py-1 rounded-full mb-4 w-fit">
                      {p.badge}
                    </span>
                  )}
                  <h3 className="font-heading text-xl font-bold mb-1">{p.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4">{p.description}</p>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="font-heading text-3xl font-bold">{p.price}</span>
                    {p.period && (
                      <span className="text-muted-foreground text-sm font-body">{p.period}</span>
                    )}
                  </div>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm font-body text-muted-foreground">
                        <Check size={14} className="text-primary flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  {p.payable ? (
                    <Button
                      onClick={() => handleSubscribe(p.planKey)}
                      disabled={loadingPlan === p.planKey}
                      className={`w-full ${p.highlight ? "glow-button" : "glass-hover bg-secondary hover:bg-secondary/80 text-foreground"}`}
                    >
                      {loadingPlan === p.planKey ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          {p.cta} {p.highlight && <Sparkles className="ml-2 h-4 w-4" />}
                        </>
                      )}
                    </Button>
                  ) : p.planKey === "enterprise" ? (
                    <Button className="w-full glass-hover bg-secondary hover:bg-secondary/80 text-foreground" asChild>
                      <a href="mailto:contact@cherazen.com">
                        {p.cta} <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  ) : (
                    <Button className="w-full glass-hover bg-secondary hover:bg-secondary/80 text-foreground" asChild>
                      <Link to="/signup">{p.cta}</Link>
                    </Button>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Pricing;
