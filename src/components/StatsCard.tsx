import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: {
    value: string;
    positive: boolean;
  };
  color?: "emerald" | "coral" | "golden";
}

export const StatsCard = ({ icon: Icon, label, value, trend, color = "emerald" }: StatsCardProps) => {
  const colorClasses = {
    emerald: "text-primary bg-primary/10",
    coral: "text-secondary bg-secondary/10",
    golden: "text-accent bg-accent/10",
  };

  return (
    <Card className="group relative overflow-hidden border-2 border-border bg-card hover-lift p-6 transition-smooth hover:border-primary/30">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      
      <div className="relative space-y-3">
        {/* Icon */}
        <div className={`inline-flex rounded-xl p-3 ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>

        {/* Label */}
        <p className="text-sm font-medium text-muted-foreground">{label}</p>

        {/* Value */}
        <p className="text-3xl font-bold text-foreground">{value}</p>

        {/* Trend (if provided) */}
        {trend && (
          <div className="flex items-center gap-1">
            <span className={`text-sm font-semibold ${trend.positive ? "text-primary" : "text-destructive"}`}>
              {trend.positive ? "↑" : "↓"} {trend.value}
            </span>
            <span className="text-xs text-muted-foreground">vs last week</span>
          </div>
        )}
      </div>
    </Card>
  );
};
