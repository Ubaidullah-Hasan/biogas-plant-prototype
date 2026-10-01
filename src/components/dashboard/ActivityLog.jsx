import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TriangleAlert, CheckCircle, AlertCircle } from "lucide-react";

export default function ActivityLog({ alerts }) {
  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning': return <TriangleAlert className="w-5 h-5 text-amber-500" />;
      case 'critical': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <CheckCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  const getAlertBg = (type) => {
    switch (type) {
      case 'warning': return 'bg-amber-500/10 border-amber-500/20';
      case 'critical': return 'bg-red-500/10 border-red-500/20';
      default: return 'bg-blue-500/10 border-blue-500/20';
    }
  };

  return (
    <Card className="bg-white/70 backdrop-blur-md shadow-sm border-border/50">
      <CardHeader>
        <CardTitle>System Activity Log</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`flex items-start gap-4 p-3 rounded-lg border ${getAlertBg(alert.type)} transition-colors`}
            >
              <div className="mt-0.5 shrink-0">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{alert.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
