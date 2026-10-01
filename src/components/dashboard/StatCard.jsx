import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StatCard({ label, value, unit, trend, isPositive = true, delay = "delay-0" }) {
  return (
    <Card className={cn("bg-white/5 backdrop-blur-2xl shadow-2xl shadow-black/40 border-white/10 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300 animate-in fade-in zoom-in-95 fill-mode-both", delay)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-semibold text-muted-foreground">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground tracking-tight">
          {value} <span className="text-lg font-medium text-muted-foreground/80">{unit}</span>
        </div>
        <div className="flex items-center mt-2 p-1.5 bg-muted/30 rounded-md w-fit">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-emerald-500 mr-1.5" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500 mr-1.5" />
          )}
          <span
            className={cn(
              "text-xs font-bold",
              isPositive ? "text-emerald-500" : "text-red-500"
            )}
          >
            {trend}
          </span>
          <span className="text-[10px] uppercase font-semibold text-muted-foreground ml-2 tracking-wider">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
}
