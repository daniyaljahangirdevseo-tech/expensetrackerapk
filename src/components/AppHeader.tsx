import { Menu, Bell } from "lucide-react";

interface AppHeaderProps {
  onMenuClick: () => void;
  title: string;
}

const AppHeader = ({ onMenuClick, title }: AppHeaderProps) => {
  return (
    <header className="sticky top-0 z-30 h-16 flex items-center gap-4 px-4 md:px-6 border-b border-border bg-card/80 backdrop-blur-xl">
      <button
        onClick={onMenuClick}
        className="lg:hidden text-muted-foreground hover:text-foreground transition-colors"
      >
        <Menu size={22} />
      </button>
      <h1 className="font-heading font-bold text-lg">{title}</h1>
      <div className="ml-auto flex items-center gap-3">
        <button className="relative p-2 rounded-xl hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
          U
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
