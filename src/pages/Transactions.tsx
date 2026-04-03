import { useState, useMemo } from "react";
import { useExpenses } from "@/context/ExpenseContext";
import { useCurrencyFormat } from "@/hooks/useCurrencyFormat";
import { CATEGORIES, ExpenseCategory, EntryType } from "@/types/expense";
import CategoryIcon from "@/components/CategoryIcon";
import { Search, LayoutGrid, List, ArrowUpDown, Trash2 } from "lucide-react";
import { format } from "date-fns";

const Transactions = () => {
  const { entries, deleteEntry } = useExpenses();
  const { format: fmt } = useCurrencyFormat();
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<ExpenseCategory | "all">("all");
  const [filterType, setFilterType] = useState<EntryType | "all">("all");
  const [sortBy, setSortBy] = useState<"latest" | "highest">("latest");
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  const filtered = useMemo(() => {
    let result = [...entries];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.notes.toLowerCase().includes(q) ||
          CATEGORIES[e.category].label.toLowerCase().includes(q)
      );
    }
    if (filterCategory !== "all") result = result.filter((e) => e.category === filterCategory);
    if (filterType !== "all") result = result.filter((e) => e.type === filterType);
    result.sort((a, b) =>
      sortBy === "latest"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : b.amount - a.amount
    );
    return result;
  }, [entries, search, filterCategory, filterType, sortBy]);

  const typeColor = (t: EntryType) =>
    t === "expense" ? "text-destructive" : t === "saving" ? "text-accent" : "text-chart-3";

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {/* Filters */}
      <div className="glass-card p-4 animate-in">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search transactions..."
              className="w-full bg-secondary/50 border border-border rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as ExpenseCategory | "all")}
            className="bg-secondary/50 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none"
          >
            <option value="all">All Categories</option>
            {Object.entries(CATEGORIES).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as EntryType | "all")}
            className="bg-secondary/50 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="expense">Expense</option>
            <option value="saving">Saving</option>
            <option value="investment">Investment</option>
          </select>
          <button
            onClick={() => setSortBy(sortBy === "latest" ? "highest" : "latest")}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-secondary/50 border border-border text-sm hover:bg-secondary transition-colors"
          >
            <ArrowUpDown size={14} />
            {sortBy === "latest" ? "Latest" : "Highest"}
          </button>
          <div className="flex rounded-xl border border-border overflow-hidden">
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 ${viewMode === "table" ? "bg-primary text-primary-foreground" : "bg-secondary/50 text-muted-foreground"}`}
            >
              <List size={16} />
            </button>
            <button
              onClick={() => setViewMode("card")}
              className={`p-2 ${viewMode === "card" ? "bg-primary text-primary-foreground" : "bg-secondary/50 text-muted-foreground"}`}
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="glass-card p-12 text-center animate-in">
          <p className="text-muted-foreground">No transactions found</p>
        </div>
      ) : viewMode === "table" ? (
        <div className="glass-card overflow-hidden animate-in">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Category</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Type</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Notes</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">Amount</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((tx) => (
                  <tr key={tx.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <td className="px-4 py-3 text-muted-foreground">{format(new Date(tx.date), "MMM d, yyyy")}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <CategoryIcon category={tx.category} size={14} />
                        <span>{CATEGORIES[tx.category].label}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`capitalize font-medium ${typeColor(tx.type)}`}>{tx.type}</span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground truncate max-w-[200px]">{tx.notes}</td>
                    <td className={`px-4 py-3 text-right font-semibold ${typeColor(tx.type)}`}>
                      {tx.type === "expense" ? "-" : "+"}{fmt(tx.amount)}
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => deleteEntry(tx.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 animate-in">
          {filtered.map((tx) => (
            <div key={tx.id} className="glass-card-hover p-4">
              <div className="flex items-start justify-between mb-3">
                <CategoryIcon category={tx.category} />
                <span className={`text-lg font-heading font-bold ${typeColor(tx.type)}`}>
                  {tx.type === "expense" ? "-" : "+"}{fmt(tx.amount)}
                </span>
              </div>
              <p className="font-medium text-sm">{tx.notes || CATEGORIES[tx.category].label}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">{format(new Date(tx.date), "MMM d, yyyy")}</span>
                <span className={`text-xs capitalize font-medium ${typeColor(tx.type)}`}>{tx.type}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Transactions;
