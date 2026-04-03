import { useExpenses } from "@/context/ExpenseContext";

const CURRENCY_SYMBOLS: Record<string, string> = {
  PKR: "Rs",
  USD: "$",
};

export const useCurrencyFormat = () => {
  const { currency } = useExpenses();
  const symbol = CURRENCY_SYMBOLS[currency] || "$";

  const format = (amount: number) => {
    return `${symbol}${amount.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return { format, symbol, currency };
};
