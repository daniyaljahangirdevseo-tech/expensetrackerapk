interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  variant?: "default" | "primary" | "gold";
  className?: string;
}

const SummaryCard = ({ title, value, icon, trend, variant = "default", className = "" }: SummaryCardProps) => {
  const bgClass =
    variant === "primary"
      ? "gradient-primary text-primary-foreground"
      : variant === "gold"
        ? "gradient-gold text-accent-foreground"
        : "glass-card-hover";

  return (
    <div className={`p-5 rounded-2xl ${bgClass} ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <span className={`text-sm font-medium ${variant === "default" ? "text-muted-foreground" : "opacity-80"}`}>
          {title}
        </span>
        <div className={`${variant === "default" ? "text-muted-foreground" : "opacity-70"}`}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-heading font-bold tracking-tight">{value}</p>
      {trend && (
        <p className={`text-xs mt-1 ${variant === "default" ? "text-muted-foreground" : "opacity-70"}`}>
          {trend}
        </p>
      )}
    </div>
  );
};

export default SummaryCard;
