import { useExpenses } from "@/context/ExpenseContext";
import { useCurrencyFormat } from "@/hooks/useCurrencyFormat";
import { FileText, Download, TrendingDown, PiggyBank, Wallet } from "lucide-react";
import { toast } from "sonner";

const Reports = () => {
  const { entries, totalBalance, monthlySpending, totalSavings, remainingBalance } = useExpenses();
  const { format: fmt } = useCurrencyFormat();

  const expenses = entries.filter((e) => e.type === "expense");
  const totalSpent = expenses.reduce((s, e) => s + e.amount, 0);

  const handleExport = () => {
    toast.success("PDF export coming soon!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between animate-in">
        <h2 className="font-heading text-xl font-bold">Monthly Report</h2>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Download size={16} />
          Export PDF
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card-hover p-5 animate-in stagger-1">
          <div className="flex items-center gap-2 mb-2">
            <Wallet size={16} className="text-primary" />
            <span className="text-sm text-muted-foreground">Total Balance</span>
          </div>
          <p className="text-2xl font-heading font-bold">{fmt(totalBalance)}</p>
        </div>
        <div className="glass-card-hover p-5 animate-in stagger-2">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown size={16} className="text-destructive" />
            <span className="text-sm text-muted-foreground">Total Spent</span>
          </div>
          <p className="text-2xl font-heading font-bold">{fmt(totalSpent)}</p>
        </div>
        <div className="glass-card-hover p-5 animate-in stagger-3">
          <div className="flex items-center gap-2 mb-2">
            <PiggyBank size={16} className="text-accent" />
            <span className="text-sm text-muted-foreground">Total Saved</span>
          </div>
          <p className="text-2xl font-heading font-bold">{fmt(totalSavings)}</p>
        </div>
        <div className="glass-card-hover p-5 animate-in stagger-4">
          <div className="flex items-center gap-2 mb-2">
            <Wallet size={16} className="text-primary" />
            <span className="text-sm text-muted-foreground">Remaining</span>
          </div>
          <p className="text-2xl font-heading font-bold">{fmt(remainingBalance)}</p>
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="glass-card p-6 animate-in">
        <div className="flex items-center gap-2 mb-4">
          <FileText size={18} className="text-primary" />
          <h3 className="font-heading font-semibold">Summary</h3>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-border/50">
            <span className="text-muted-foreground">Monthly Spending</span>
            <span className="font-semibold">{fmt(monthlySpending)}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-border/50">
            <span className="text-muted-foreground">Number of Transactions</span>
            <span className="font-semibold">{expenses.length}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-border/50">
            <span className="text-muted-foreground">Average per Transaction</span>
            <span className="font-semibold">{fmt(expenses.length ? Math.round(totalSpent / expenses.length) : 0)}</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-muted-foreground">Savings Rate</span>
            <span className="font-semibold text-primary">
              {totalBalance ? Math.round((totalSavings / totalBalance) * 100) : 0}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
