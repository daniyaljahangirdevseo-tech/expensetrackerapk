import {
  UtensilsCrossed,
  Plane,
  Receipt,
  ShoppingBag,
  Gamepad2,
  Heart,
  GraduationCap,
  MoreHorizontal,
  LucideIcon,
} from "lucide-react";
import { ExpenseCategory } from "@/types/expense";

const ICON_MAP: Record<string, LucideIcon> = {
  UtensilsCrossed,
  Plane,
  Receipt,
  ShoppingBag,
  Gamepad2,
  Heart,
  GraduationCap,
  MoreHorizontal,
};

import { CATEGORIES } from "@/types/expense";

interface CategoryIconProps {
  category: ExpenseCategory;
  size?: number;
  className?: string;
}

const CategoryIcon = ({ category, size = 18, className = "" }: CategoryIconProps) => {
  const info = CATEGORIES[category];
  const Icon = ICON_MAP[info.icon] || MoreHorizontal;

  return (
    <div
      className={`flex items-center justify-center rounded-xl p-2 ${className}`}
      style={{ backgroundColor: `${info.color}20` }}
    >
      <Icon size={size} style={{ color: info.color }} />
    </div>
  );
};

export default CategoryIcon;
