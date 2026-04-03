import {
  Wallet,
  TrendingDown,
  Calendar,
  PiggyBank,
  BarChart3,
  ArrowDownRight,
  Sparkles,
  DollarSign,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { useExpenses } from "@/context/ExpenseContext";
import { useCurrencyFormat } from "@/hooks/useCurrencyFormat";
import { CATEGORIES, ExpenseCategory } from "@/types/expense";
import SummaryCard from "@/components/SummaryCard";
import CategoryIcon from "@/components/CategoryIcon";
import { format, subDays } from "date-fns";

const PIE_COLORS = [
  "hsl(152, 60%, 36%)",
  "hsl(43, 90%, 55%)",
  "hsl(200, 70%, 50%)",
  "hsl(280, 60%, 55%)",
  "hsl(350, 65%, 55%)",
  "hsl(0, 72%, 51%)",
  "hsl(220, 70%, 55%)",
  "hsl(160, 10%, 45%)",
];

const Dashboard = () => {
  const {
    entries,
    totalBalance,
    todaySpending,
    monthlySpending,
    remainingBalance,
    totalSavings,
    totalInvestments,
  } = useExpenses();
  const { format: fmt } = useCurrencyFormat();

  // Daily spending data for last 7 days
  const dailyData = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dateStr = date.toISOString().split("T")[0];
    const total = entries
      .filter((e) => e.type === "expense" && e.date.startsWith(dateStr))
      .reduce((s, e) => s + e.amount, 0);
    return { name: format(date, "EEE"), amount: total };
  });

  // Category breakdown
  const categoryData = Object.keys(CATEGORIES).map((cat) => {
    const total = entries
      .filter((e) => e.type === "expense" && e.category === cat)
      .reduce((s, e) => s + e.amount, 0);
    return { name: CATEGORIES[cat as ExpenseCategory].label, value: total, category: cat };
  }).filter((d) => d.value > 0);

  // Monthly trend (fake 6 months)
  const monthlyData = [
    { name: "Oct", amount: 2200 },
    { name: "Nov", amount: 1800 },
    { name: "Dec", amount: 2500 },
    { name: "Jan", amount: 1900 },
    { name: "Feb", amount: 2100 },
    { name: "Mar", amount: monthlySpending || 1500 },
  ];

  const recentTransactions = entries
    .filter((e) => e.type === "expense")
    .slice(0, 5);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <SummaryCard
          title="Total Balance"
          value={fmt(totalBalance)}
          icon={<Wallet size={18} />}
          variant="primary"
          className="animate-in stagger-1"
        />
        <SummaryCard
          title="Today's Spending"
          value={fmt(todaySpending)}
          icon={<TrendingDown size={18} />}
          className="animate-in stagger-2"
        />
        <SummaryCard
          title="Monthly Spending"
          value={fmt(monthlySpending)}
          icon={<Calendar size={18} />}
          className="animate-in stagger-3"
        />
        <SummaryCard
          title="Remaining"
          value={fmt(remainingBalance)}
          icon={<DollarSign size={18} />}
          className="animate-in stagger-4"
        />
        <SummaryCard
          title="Total Savings"
          value={fmt(totalSavings)}
          icon={<PiggyBank size={18} />}
          variant="gold"
          className="animate-in stagger-5"
        />
        <SummaryCard
          title="Investments"
          value={fmt(totalInvestments)}
          icon={<BarChart3 size={18} />}
          className="animate-in stagger-6"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Daily Spending */}
        <div className="glass-card p-5 lg:col-span-2 animate-in">
          <h3 className="font-heading font-semibold mb-4">Daily Spending</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={dailyData}>
              <defs>
                <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(152, 60%, 36%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(152, 60%, 36%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(160, 10%, 20%)" opacity={0.3} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(160, 10%, 45%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(160, 10%, 45%)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(160, 12%, 10%)",
                  border: "1px solid hsl(160, 10%, 18%)",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="hsl(152, 60%, 42%)"
                strokeWidth={2}
                fill="url(#colorSpend)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Pie */}
        <div className="glass-card p-5 animate-in">
          <h3 className="font-heading font-semibold mb-4">By Category</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                dataKey="value"
                paddingAngle={3}
              >
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(160, 12%, 10%)",
                  border: "1px solid hsl(160, 10%, 18%)",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-2">
            {categoryData.map((d, i) => (
              <span key={d.name} className="flex items-center gap-1 text-xs text-muted-foreground">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                />
                {d.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trend + Recent + AI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Monthly Trend */}
        <div className="glass-card p-5 animate-in">
          <h3 className="font-heading font-semibold mb-4">Monthly Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(160, 10%, 20%)" opacity={0.3} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(160, 10%, 45%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(160, 10%, 45%)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(160, 12%, 10%)",
                  border: "1px solid hsl(160, 10%, 18%)",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="amount" fill="hsl(43, 90%, 55%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="glass-card p-5 animate-in">
          <h3 className="font-heading font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentTransactions.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No transactions yet</p>
            ) : (
              recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center gap-3">
                  <CategoryIcon category={tx.category} size={16} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{tx.notes || CATEGORIES[tx.category].label}</p>
                    <p className="text-xs text-muted-foreground">{format(new Date(tx.date), "MMM d")}</p>
                  </div>
                  <span className="text-sm font-semibold text-destructive flex items-center gap-0.5">
                    <ArrowDownRight size={12} />
                    {fmt(tx.amount)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* AI Insight */}
        <div className="glass-card p-5 border-primary/20 animate-in">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center">
              <Sparkles className="text-primary-foreground" size={16} />
            </div>
            <h3 className="font-heading font-semibold">AI Insights</h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
              <p className="text-sm">🍔 You spent <span className="font-semibold text-primary">32% more</span> on food this month compared to last month.</p>
            </div>
            <div className="p-3 rounded-xl bg-accent/5 border border-accent/10">
              <p className="text-sm">💡 Try setting a <span className="font-semibold text-accent">weekly budget</span> of {fmt(200)} for dining out.</p>
            </div>
            <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
              <p className="text-sm">📈 Your savings rate is <span className="font-semibold text-primary">on track</span>. Keep it up!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
