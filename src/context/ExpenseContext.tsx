import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { ExpenseEntry, EntryType } from "@/types/expense";

const today = new Date().toISOString().split("T")[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
const twoDaysAgo = new Date(Date.now() - 172800000).toISOString().split("T")[0];
const threeDaysAgo = new Date(Date.now() - 259200000).toISOString().split("T")[0];
const fourDaysAgo = new Date(Date.now() - 345600000).toISOString().split("T")[0];

const INITIAL_ENTRIES: ExpenseEntry[] = [
  { id: "1", amount: 45, category: "food", type: "expense", date: today, notes: "Lunch with team" },
  { id: "2", amount: 120, category: "bills", type: "expense", date: today, notes: "Electricity bill" },
  { id: "3", amount: 500, category: "other", type: "saving", date: yesterday, notes: "Emergency fund" },
  { id: "4", amount: 80, category: "entertainment", type: "expense", date: yesterday, notes: "Movie night" },
  { id: "5", amount: 1000, category: "other", type: "investment", date: twoDaysAgo, notes: "Index fund" },
  { id: "6", amount: 35, category: "travel", type: "expense", date: twoDaysAgo, notes: "Uber rides" },
  { id: "7", amount: 200, category: "shopping", type: "expense", date: threeDaysAgo, notes: "New headphones" },
  { id: "8", amount: 300, category: "other", type: "saving", date: threeDaysAgo, notes: "Vacation fund" },
  { id: "9", amount: 60, category: "health", type: "expense", date: fourDaysAgo, notes: "Gym membership" },
  { id: "10", amount: 750, category: "other", type: "investment", date: fourDaysAgo, notes: "Crypto" },
  { id: "11", amount: 150, category: "education", type: "expense", date: fourDaysAgo, notes: "Online course" },
  { id: "12", amount: 25, category: "food", type: "expense", date: fourDaysAgo, notes: "Coffee & snacks" },
];

const INITIAL_BALANCE = 10000;

interface ExpenseContextType {
  entries: ExpenseEntry[];
  addEntry: (entry: Omit<ExpenseEntry, "id">) => void;
  deleteEntry: (id: string) => void;
  initialBalance: number;
  setInitialBalance: (balance: number) => void;
  totalIncome: number;
  totalBalance: number;
  todaySpending: number;
  monthlySpending: number;
  totalSavings: number;
  totalInvestments: number;
  remainingBalance: number;
  currency: string;
  setCurrency: (c: string) => void;
  resetData: () => void;
}

const ExpenseContext = createContext<ExpenseContextType | null>(null);

export const useExpenses = () => {
  const ctx = useContext(ExpenseContext);
  if (!ctx) throw new Error("useExpenses must be used within ExpenseProvider");
  return ctx;
};

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<ExpenseEntry[]>(INITIAL_ENTRIES);
  const [currency, setCurrency] = useState("PKR");
  const [initialBalance, setInitialBalance] = useState(INITIAL_BALANCE);

  const addEntry = useCallback((entry: Omit<ExpenseEntry, "id">) => {
    setEntries((prev) => [{ ...entry, id: Date.now().toString() }, ...prev]);
  }, []);

  const deleteEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const resetData = useCallback(() => {
    setEntries([]);
    setInitialBalance(0);
  }, []);

  const stats = useMemo(() => {
    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];
    const monthStr = todayStr.slice(0, 7);

    let totalExpenses = 0;
    let todaySpending = 0;
    let monthlySpending = 0;
    let totalSavings = 0;
    let totalInvestments = 0;
    let totalIncome = 0;

    entries.forEach((e) => {
      if (e.type === "expense") {
        totalExpenses += e.amount;
        if (e.date.startsWith(todayStr)) todaySpending += e.amount;
        if (e.date.startsWith(monthStr)) monthlySpending += e.amount;
      } else if (e.type === "saving") {
        totalSavings += e.amount;
      } else if (e.type === "investment") {
        totalInvestments += e.amount;
      } else if (e.type === "income") {
        totalIncome += e.amount;
      }
    });

    const totalBalance = initialBalance + totalIncome;
    const remainingBalance = totalBalance - totalExpenses - totalSavings - totalInvestments;

    return {
      totalIncome,
      totalBalance,
      todaySpending,
      monthlySpending,
      totalSavings,
      totalInvestments,
      remainingBalance,
    };
  }, [entries, initialBalance]);

  return (
    <ExpenseContext.Provider
      value={{ 
        entries, 
        addEntry, 
        deleteEntry, 
        currency, 
        setCurrency, 
        resetData, 
        initialBalance, 
        setInitialBalance,
        ...stats 
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
