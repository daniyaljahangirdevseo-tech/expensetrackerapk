import { useState } from "react";
import { useExpenses } from "@/context/ExpenseContext";
import { ExpenseCategory, EntryType, CATEGORIES } from "@/types/expense";
import { useCurrencyFormat } from "@/hooks/useCurrencyFormat";
import CategoryIcon from "@/components/CategoryIcon";
import { Mic, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";

const AddExpense = () => {
  const { addEntry } = useExpenses();
  const { symbol } = useCurrencyFormat();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<ExpenseCategory>("food");
  const [type, setType] = useState<EntryType>("expense");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const [smartInput, setSmartInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSmartParse = () => {
    if (!smartInput.trim()) return;
    const parts = smartInput.toLowerCase().split(" ");
    const num = parts.find((p) => !isNaN(Number(p)));
    if (num) setAmount(num);
    const cats = Object.keys(CATEGORIES) as ExpenseCategory[];
    const foundCat = cats.find((c) => parts.some((p) => c.includes(p) || CATEGORIES[c].label.toLowerCase().includes(p)));
    if (foundCat) setCategory(foundCat);
    if (parts.includes("today")) setDate(new Date().toISOString().split("T")[0]);
    setSmartInput("");
    toast.success("Parsed! Review and submit.");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      addEntry({
        amount: Number(amount),
        category,
        type,
        date,
        notes,
      });
      toast.success("Entry added successfully!");
      setAmount("");
      setNotes("");
      setSubmitting(false);
    }, 400);
  };

  const categories = Object.entries(CATEGORIES) as [ExpenseCategory, typeof CATEGORIES[ExpenseCategory]][];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Smart Input */}
      <div className="glass-card p-5 animate-in">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={18} className="text-primary" />
          <h3 className="font-heading font-semibold text-sm">Smart Input</h3>
        </div>
        <div className="flex gap-2">
          <input
            value={smartInput}
            onChange={(e) => setSmartInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSmartParse()}
            placeholder='Try: "500 food today"'
            className="flex-1 bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
          <button
            onClick={handleSmartParse}
            className="px-4 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Parse
          </button>
          <button className="p-2.5 rounded-xl bg-secondary/50 border border-border text-muted-foreground hover:text-foreground transition-colors">
            <Mic size={18} />
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="glass-card p-6 space-y-5 animate-in">
        <h3 className="font-heading font-semibold">Add New Entry</h3>

        {/* Type Selector */}
        <div className="flex gap-2">
          {(["expense", "income", "saving", "investment"] as EntryType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                type === t
                  ? t === "expense"
                    ? "bg-destructive text-destructive-foreground shadow-lg"
                    : t === "income"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : t === "saving"
                        ? "bg-accent text-accent-foreground shadow-lg"
                        : "bg-chart-3 text-primary-foreground shadow-lg"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Amount */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">{symbol}</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="w-full bg-secondary/50 border border-border rounded-xl pl-8 pr-4 py-3 text-2xl font-heading font-bold focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Category</label>
          <div className="grid grid-cols-4 gap-2">
            {categories.map(([key, info]) => (
              <button
                key={key}
                type="button"
                onClick={() => setCategory(key)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs transition-all ${
                  category === key
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-secondary/30 text-muted-foreground hover:border-primary/30"
                }`}
              >
                <CategoryIcon category={key} size={16} />
                <span className="truncate w-full text-center">{info.label.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Notes</label>
          <input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What was this for?"
            className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-3 rounded-xl gradient-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 transition-all ${
            submitting ? "opacity-70 scale-[0.98]" : "hover:opacity-90 hover:shadow-lg"
          }`}
        >
          <Send size={16} />
          {submitting ? "Adding..." : "Add Entry"}
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
