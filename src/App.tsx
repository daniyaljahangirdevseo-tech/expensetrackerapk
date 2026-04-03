import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ExpenseProvider } from "@/context/ExpenseContext";
import { ThemeProvider } from "@/context/ThemeContext";
import AppLayout from "@/components/AppLayout";
import LandingPage from "@/pages/LandingPage";
import Dashboard from "@/pages/Dashboard";
import AddExpense from "@/pages/AddExpense";
import Transactions from "@/pages/Transactions";
import Analytics from "@/pages/Analytics";
import SavingsInvestments from "@/pages/SavingsInvestments";
import Reports from "@/pages/Reports";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <ExpenseProvider>
        <TooltipProvider>
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add" element={<AddExpense />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/savings" element={<SavingsInvestments />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ExpenseProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
