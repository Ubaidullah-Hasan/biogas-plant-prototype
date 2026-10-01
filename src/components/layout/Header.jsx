import { useLocation } from "react-router-dom";
import { Search, Bell, TriangleAlert, CheckCircle, AlertCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { mockDashboardData } from "@/data/mockData";

export default function Header() {
  const location = useLocation();
  const alerts = mockDashboardData.recentAlerts;
  
  const getPageTitle = () => {
    switch(location.pathname) {
      case '/': return 'Dashboard Overview';
      case '/supply-chain': return 'Supply Chain & Inventory';
      case '/billing': return 'Billing Management';
      case '/maintenance': return 'System Maintenance';
      default: return 'BioSmart Portal';
    }
  };

  const getAlertIcon = (type) => {
    switch(type) {
      case 'warning': return <TriangleAlert className="w-4 h-4 text-amber-500" />;
      case 'critical': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <CheckCircle className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <header className="sticky top-0 z-10 h-16 flex items-center justify-between px-8 bg-white/70 backdrop-blur-md border-b border-border/50">
      <h1 className="text-xl font-bold text-foreground">
        {getPageTitle()}
      </h1>

      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="h-9 w-64 rounded-full border border-border bg-muted/50 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>

        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="relative p-2 rounded-full hover:bg-muted transition-colors focus:outline-none">
              <Bell className="w-5 h-5 text-muted-foreground" />
              {alerts.length > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border border-white"></span>
                </span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0 shadow-lg border-border/50 backdrop-blur-xl bg-white/90">
            <div className="p-3 border-b font-semibold text-sm">Recent Alerts</div>
            <div className="max-h-[300px] overflow-y-auto">
              {alerts.map(alert => (
                <div key={alert.id} className="flex gap-3 p-3 border-b border-border/40 hover:bg-muted/50 transition-colors cursor-pointer last:border-0">
                  <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-tight">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
