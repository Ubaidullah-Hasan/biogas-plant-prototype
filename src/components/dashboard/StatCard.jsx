import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StatCard({ label, value, unit, trend, isPositive = true }) {
  return (
    <Card className="bg-white/70 backdrop-blur-md shadow-sm border-border/50 hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">
          {value} <span className="text-lg font-medium text-muted-foreground">{unit}</span>
        </div>
        <div className="flex items-center mt-1">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
          )}
          <span
            className={cn(
              "text-xs font-semibold",
              isPositive ? "text-emerald-500" : "text-red-500"
            )}
          >
            {trend}
          </span>
          <span className="text-xs text-muted-foreground ml-1">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
}
