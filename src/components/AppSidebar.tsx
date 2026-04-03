import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Plus,
  List,
  BarChart3,
  PiggyBank,
  FileText,
  Settings,
  X,
  Sparkles,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/add", label: "Add Expense", icon: Plus },
  { to: "/transactions", label: "Transactions", icon: List },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/savings", label: "Savings & Invest", icon: PiggyBank },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/settings", label: "Settings", icon: Settings },
];

interface AppSidebarProps {
  open: boolean;
  onClose: () => void;
}

const AppSidebar = ({ open, onClose }: AppSidebarProps) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 flex flex-col border-r border-border bg-card/95 backdrop-blur-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 h-16 border-b border-border">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
            <Sparkles className="text-primary-foreground" size={18} />
          </div>
          <span className="font-heading font-bold text-lg">ExpenseTrackerAI</span>
          <button onClick={onClose} className="ml-auto lg:hidden text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <RouterNavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </RouterNavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="glass-card p-3 rounded-xl text-center">
            <p className="text-xs text-muted-foreground">AI-Powered Tracking</p>
            <p className="text-xs font-medium gradient-text mt-0.5">ExpenseTrackerAI v1.0</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AppSidebar;
