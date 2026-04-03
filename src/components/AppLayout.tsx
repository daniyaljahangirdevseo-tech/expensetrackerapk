import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/": "Dashboard",
  "/add": "Add Expense",
  "/transactions": "Transactions",
  "/analytics": "Analytics",
  "/savings": "Savings & Investments",
  "/reports": "Reports",
  "/settings": "Settings",
};

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = PAGE_TITLES[location.pathname] || "ExpenseTrackerAI";

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader onMenuClick={() => setSidebarOpen(true)} title={title} />
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
