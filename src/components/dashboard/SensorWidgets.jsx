import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function GaugeCircle({ value, max, label, unit, status }) {
  const percentage = Math.min((value / max) * 100, 100);
  const strokeDasharray = `${(percentage * 251.2) / 100} 251.2`;
  
  const getColor = (status) => {
    if (status === 'Normal' || status === 'Optimal') return 'text-emerald-500';
    if (status === 'Warning') return 'text-amber-500';
    return 'text-red-500';
  };

  const getStrokeColor = (status) => {
    if (status === 'Normal' || status === 'Optimal') return 'stroke-emerald-500';
    if (status === 'Warning') return 'stroke-amber-500';
    return 'stroke-red-500';
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="relative w-24 h-24">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            className="stroke-muted"
            strokeWidth="8"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
          {/* Progress Circle */}
          <circle
            className={cn("transition-all duration-1000 ease-out", getStrokeColor(status))}
            strokeWidth="8"
            strokeLinecap="round"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
            style={{ strokeDasharray, strokeDashoffset: 0 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold">{value}</span>
          <span className="text-xs text-muted-foreground">{unit}</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium">{label}</p>
        <p className={cn("text-xs font-semibold", getColor(status))}>{status}</p>
      </div>
    </div>
  );
}

export default function SensorWidgets({ sensors }) {
  return (
    <Card className="col-span-1 bg-white/5 backdrop-blur-2xl shadow-2xl shadow-black/40 border-white/10">
      <CardHeader>
        <CardTitle>Real-time IoT Sensors</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row md:flex-col justify-around items-center gap-6 mt-2">
        <GaugeCircle 
          label="Gas Pressure" 
          value={sensors.gasPressure.current} 
          max={sensors.gasPressure.max} 
          unit={sensors.gasPressure.unit} 
          status={sensors.gasPressure.status} 
        />
        <GaugeCircle 
          label="Digester Temp" 
          value={sensors.digesterTemp.current} 
          max={sensors.digesterTemp.max} 
          unit={sensors.digesterTemp.unit} 
          status={sensors.digesterTemp.status} 
        />
        <GaugeCircle 
          label="Storage Capacity" 
          value={sensors.storageCapacity.current} 
          max={sensors.storageCapacity.max} 
          unit={sensors.storageCapacity.unit} 
          status={sensors.storageCapacity.status} 
        />
      </CardContent>
    </Card>
  );
}
