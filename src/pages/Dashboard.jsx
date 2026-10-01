import { useDashboardData } from "@/hooks/useDashboardData";
import StatCard from "@/components/dashboard/StatCard";
import ProductionChart from "@/components/dashboard/ProductionChart";
import SensorWidgets from "@/components/dashboard/SensorWidgets";
import ActivityLog from "@/components/dashboard/ActivityLog";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const { data, loading, error } = useDashboardData();

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        <p className="text-xl font-bold">Error loading dashboard</p>
        <p>{error}</p>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="flex-1 flex items-center justify-center h-full min-h-[400px]">
        <div className="flex flex-col items-center gap-4 text-primary">
          <Loader2 className="w-10 h-10 animate-spin" />
          <p className="text-sm font-medium animate-pulse">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  const { kpiMetrics, realtimeSensors, productionChart, recentAlerts } = data;

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Section A: KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label={kpiMetrics.totalGasProduced.label} 
          value={kpiMetrics.totalGasProduced.value} 
          unit={kpiMetrics.totalGasProduced.unit} 
          trend={kpiMetrics.totalGasProduced.trend} 
          isPositive={true}
          delay="delay-0"
        />
        <StatCard 
          label={kpiMetrics.activeSuppliers.label} 
          value={kpiMetrics.activeSuppliers.value} 
          unit={kpiMetrics.activeSuppliers.unit} 
          trend={kpiMetrics.activeSuppliers.trend} 
          isPositive={true}
          delay="delay-100"
        />
        <StatCard 
          label={kpiMetrics.revenueGenerated.label} 
          value={kpiMetrics.revenueGenerated.value} 
          unit={kpiMetrics.revenueGenerated.unit} 
          trend={kpiMetrics.revenueGenerated.trend} 
          isPositive={true}
          delay="delay-200"
        />
        <StatCard 
          label={kpiMetrics.co2Saved.label} 
          value={kpiMetrics.co2Saved.value} 
          unit={kpiMetrics.co2Saved.unit} 
          trend={kpiMetrics.co2Saved.trend} 
          isPositive={true}
          delay="delay-300"
        />
      </div>

      {/* Middle Section: IoT Visualizer & Production Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Section B: Real-time IoT Visualizer (1/3 width) */}
        <SensorWidgets sensors={realtimeSensors} />
        
        {/* Section C: Production Analytics (2/3 width) */}
        <ProductionChart data={productionChart} />
      </div>

      {/* Section D: System Activity Log */}
      <div className="grid grid-cols-1">
        <ActivityLog alerts={recentAlerts} />
      </div>

    </div>
  );
}
