import { useExpenses } from "@/context/ExpenseContext";
import { useCurrencyFormat } from "@/hooks/useCurrencyFormat";
import { PiggyBank, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";

const growthData = [
  { name: "Jan", savings: 800, investments: 500 },
  { name: "Feb", savings: 1200, investments: 1000 },
  { name: "Mar", savings: 1500, investments: 1750 },
  { name: "Apr", savings: 1800, investments: 2200 },
];

const SavingsInvestments = () => {
  const { entries, totalSavings, totalInvestments } = useExpenses();
  const { format: fmt } = useCurrencyFormat();

  const savingsEntries = entries.filter((e) => e.type === "saving");
  const investmentEntries = entries.filter((e) => e.type === "investment");

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="glass-card p-6 animate-in stagger-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center">
              <PiggyBank className="text-accent-foreground" size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Savings</p>
              <p className="text-3xl font-heading font-bold">{fmt(totalSavings)}</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-6 animate-in stagger-2">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-chart-3 flex items-center justify-center">
              <TrendingUp className="text-primary-foreground" size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Investments</p>
              <p className="text-3xl font-heading font-bold">{fmt(totalInvestments)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Growth Chart */}
      <div className="glass-card p-5 animate-in">
        <h3 className="font-heading font-semibold mb-4">Growth Overview</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={growthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(160, 10%, 20%)" opacity={0.3} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(160, 10%, 45%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(160, 10%, 45%)" />
            <Tooltip contentStyle={{ backgroundColor: "hsl(160, 12%, 10%)", border: "1px solid hsl(160, 10%, 18%)", borderRadius: "12px", fontSize: "12px" }} />
            <Line type="monotone" dataKey="savings" stroke="hsl(43, 90%, 55%)" strokeWidth={2} dot={{ r: 4 }} name="Savings" />
            <Line type="monotone" dataKey="investments" stroke="hsl(200, 70%, 50%)" strokeWidth={2} dot={{ r: 4 }} name="Investments" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-5 animate-in">
          <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
            <PiggyBank size={18} className="text-accent" /> Savings Entries
          </h3>
          {savingsEntries.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">No savings yet</p>
          ) : (
            <div className="space-y-3">
              {savingsEntries.map((e) => (
                <div key={e.id} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30">
                  <div>
                    <p className="text-sm font-medium">{e.notes}</p>
                    <p className="text-xs text-muted-foreground">{format(new Date(e.date), "MMM d, yyyy")}</p>
                  </div>
                  <span className="text-sm font-semibold text-accent flex items-center gap-0.5">
                    <ArrowUpRight size={12} /> {fmt(e.amount)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="glass-card p-5 animate-in">
          <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-chart-3" /> Investment Entries
          </h3>
          {investmentEntries.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">No investments yet</p>
          ) : (
            <div className="space-y-3">
              {investmentEntries.map((e) => (
                <div key={e.id} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30">
                  <div>
                    <p className="text-sm font-medium">{e.notes}</p>
                    <p className="text-xs text-muted-foreground">{format(new Date(e.date), "MMM d, yyyy")}</p>
                  </div>
                  <span className="text-sm font-semibold text-chart-3 flex items-center gap-0.5">
                    <ArrowUpRight size={12} /> {fmt(e.amount)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavingsInvestments;
