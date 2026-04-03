import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, BarChart3, PiggyBank, Shield } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description: "AI-powered insights into your spending patterns and habits.",
  },
  {
    icon: PiggyBank,
    title: "Savings & Investments",
    description: "Track your savings goals and investment portfolio in one place.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your financial data stays on your device. No backend required.",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_closest-corner_at_50%_100%,hsl(var(--background))_44%,transparent_100%)] opacity-90" />
      </div>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center z-10">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6 animate-in shadow-[0_0_20px_rgba(var(--primary),0.3)]">
          <Sparkles className="text-primary-foreground" size={28} />
        </div>

        <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold mb-4 animate-in stagger-1 tracking-tight">
          <span className="gradient-text">Emerald Ledger</span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-xl mb-12 animate-in stagger-2 text-balance">
          Master your finances with AI precision. Track, analyze, and grow your wealth with the world's most elegant ledger.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="group flex items-center gap-2 px-8 py-5 rounded-2xl gradient-primary text-primary-foreground font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1 animate-in stagger-3"
        >
          Open Your Ledger
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Features */}
      <div className="px-4 pb-16 max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`glass-card p-6 text-center animate-in stagger-${i + 4}`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <f.icon size={22} className="text-primary" />
              </div>
              <h3 className="font-heading font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-border">
        <p className="text-xs text-muted-foreground">ExpenseTrackerAI v1.0 — AI-Powered Tracking</p>
      </footer>
    </div>
  );
};

export default LandingPage;
