export type ExpenseCategory =
  | "food"
  | "travel"
  | "bills"
  | "shopping"
  | "entertainment"
  | "health"
  | "education"
  | "other";

export type EntryType = "expense" | "saving" | "investment" | "income";

export interface ExpenseEntry {
  id: string;
  amount: number;
  category: ExpenseCategory;
  type: EntryType;
  date: string; // ISO string
  notes: string;
}

export interface CategoryInfo {
  label: string;
  icon: string;
  color: string;
}

export const CATEGORIES: Record<ExpenseCategory, CategoryInfo> = {
  food: { label: "Food & Dining", icon: "UtensilsCrossed", color: "hsl(152, 60%, 36%)" },
  travel: { label: "Travel", icon: "Plane", color: "hsl(200, 70%, 50%)" },
  bills: { label: "Bills & Utilities", icon: "Receipt", color: "hsl(350, 65%, 55%)" },
  shopping: { label: "Shopping", icon: "ShoppingBag", color: "hsl(280, 60%, 55%)" },
  entertainment: { label: "Entertainment", icon: "Gamepad2", color: "hsl(43, 90%, 55%)" },
  health: { label: "Health", icon: "Heart", color: "hsl(0, 72%, 51%)" },
  education: { label: "Education", icon: "GraduationCap", color: "hsl(220, 70%, 55%)" },
  other: { label: "Other", icon: "MoreHorizontal", color: "hsl(160, 10%, 45%)" },
};
