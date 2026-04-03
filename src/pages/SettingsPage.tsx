import { useTheme } from "@/context/ThemeContext";
import { useExpenses } from "@/context/ExpenseContext";
import { Sun, Moon, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const CURRENCIES = ["PKR", "USD"];

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { currency, setCurrency, resetData, initialBalance, setInitialBalance } = useExpenses();

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all data? This cannot be undone.")) {
      resetData();
      toast.success("Data has been reset!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Balance */}
      <div className="glass-card p-6 animate-in stagger-1">
        <h3 className="font-heading font-semibold mb-4">Finances</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Total Balance</p>
            <p className="text-sm text-muted-foreground">Set your total starting balance</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground font-medium">{currency}</span>
            <input
              type="number"
              value={initialBalance}
              onChange={(e) => setInitialBalance(Number(e.target.value))}
              className="w-32 bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>
      </div>

      {/* Theme */}
      <div className="glass-card p-6 animate-in stagger-2">
        <h3 className="font-heading font-semibold mb-4">Appearance</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Theme</p>
            <p className="text-sm text-muted-foreground">Switch between dark and light mode</p>
          </div>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary/50 border border-border hover:bg-secondary transition-colors"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            <span className="text-sm font-medium">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      </div>

      {/* Currency */}
      <div className="glass-card p-6 animate-in stagger-3">
        <h3 className="font-heading font-semibold mb-4">Currency</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Display Currency</p>
            <p className="text-sm text-muted-foreground">Choose your preferred currency</p>
          </div>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Reset */}
      <div className="glass-card p-6 animate-in stagger-4">
        <h3 className="font-heading font-semibold mb-4">Data Management</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Reset All Data</p>
            <p className="text-sm text-muted-foreground">Delete all entries and reset balance to 0</p>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive hover:bg-destructive/20 transition-colors text-sm font-medium"
          >
            <RotateCcw size={14} />
            Reset Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
