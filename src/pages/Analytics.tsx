import { useExpenses } from "@/context/ExpenseContext";
import { useCurrencyFormat } from "@/hooks/useCurrencyFormat";
import { CATEGORIES, ExpenseCategory } from "@/types/expense";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { subDays, format } from "date-fns";

const COLORS = [
  "hsl(152, 60%, 36%)",
  "hsl(43, 90%, 55%)",
  "hsl(200, 70%, 50%)",
  "hsl(280, 60%, 55%)",
  "hsl(350, 65%, 55%)",
  "hsl(0, 72%, 51%)",
  "hsl(220, 70%, 55%)",
  "hsl(160, 10%, 45%)",
];

const Analytics = () => {
  const { entries } = useExpenses();
  const { format: fmt } = useCurrencyFormat();

  const expenses = entries.filter((e) => e.type === "expense");

  // Category breakdown
  const categoryData = Object.keys(CATEGORIES)
    .map((cat) => {
      const total = expenses
        .filter((e) => e.category === cat)
        .reduce((s, e) => s + e.amount, 0);
      return { name: CATEGORIES[cat as ExpenseCategory].label.split(" ")[0], value: total, full: CATEGORIES[cat as ExpenseCategory].label };
    })
    .filter((d) => d.value > 0)
    .sort((a, b) => b.value - a.value);

  // Daily average (last 7 days)
  const dailyData = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dateStr = date.toISOString().split("T")[0];
    const total = expenses
      .filter((e) => e.date.startsWith(dateStr))
      .reduce((s, e) => s + e.amount, 0);
    return { name: format(date, "EEE"), amount: total };
  });

  const dailyAvg = Math.round(dailyData.reduce((s, d) => s + d.amount, 0) / 7);

  // Monthly comparison (mock)
  const monthlyComparison = [
    { name: "Jan", thisYear: 1900, lastYear: 2100 },
    { name: "Feb", thisYear: 2100, lastYear: 1800 },
    { name: "Mar", thisYear: 1500, lastYear: 2300 },
    { name: "Apr", thisYear: 0, lastYear: 2000 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 animate-in stagger-1">
          <p className="text-sm text-muted-foreground">Total Expenses</p>
          <p className="text-2xl font-heading font-bold mt-1">{fmt(expenses.reduce((s, e) => s + e.amount, 0))}</p>
        </div>
        <div className="glass-card p-5 animate-in stagger-2">
          <p className="text-sm text-muted-foreground">Daily Average</p>
          <p className="text-2xl font-heading font-bold mt-1">{fmt(dailyAvg)}</p>
        </div>
        <div className="glass-card p-5 animate-in stagger-3">
          <p className="text-sm text-muted-foreground">Top Category</p>
          <p className="text-2xl font-heading font-bold mt-1">{categoryData[0]?.full || "N/A"}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Category Breakdown Bar */}
        <div className="glass-card p-5 animate-in">
          <h3 className="font-heading font-semibold mb-4">Category Breakdown</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={categoryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(160, 10%, 20%)" opacity={0.3} />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(160, 10%, 45%)" />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} stroke="hsl(160, 10%, 45%)" width={80} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(160, 12%, 10%)", border: "1px solid hsl(160, 10%, 18%)", borderRadius: "12px", fontSize: "12px" }} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie */}
        <div className="glass-card p-5 animate-in">
          <h3 className="font-heading font-semibold mb-4">Spending Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" paddingAngle={3} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "hsl(160, 12%, 10%)", border: "1px solid hsl(160, 10%, 18%)", borderRadius: "12px", fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Trend */}
        <div className="glass-card p-5 animate-in">
          <h3 className="font-heading font-semibold mb-4">Daily Spending Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(160, 10%, 20%)" opacity={0.3} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(160, 10%, 45%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(160, 10%, 45%)" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(160, 12%, 10%)", border: "1px solid hsl(160, 10%, 18%)", borderRadius: "12px", fontSize: "12px" }} />
              <Line type="monotone" dataKey="amount" stroke="hsl(152, 60%, 42%)" strokeWidth={2} dot={{ fill: "hsl(152, 60%, 42%)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Comparison */}
        <div className="glass-card p-5 animate-in">
          <h3 className="font-heading font-semibold mb-4">Monthly Comparison</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(160, 10%, 20%)" opacity={0.3} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(160, 10%, 45%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(160, 10%, 45%)" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(160, 12%, 10%)", border: "1px solid hsl(160, 10%, 18%)", borderRadius: "12px", fontSize: "12px" }} />
              <Bar dataKey="thisYear" fill="hsl(152, 60%, 42%)" radius={[4, 4, 0, 0]} name="This Year" />
              <Bar dataKey="lastYear" fill="hsl(43, 90%, 55%)" radius={[4, 4, 0, 0]} name="Last Year" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
