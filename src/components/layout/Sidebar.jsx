import { NavLink } from "react-router-dom";
import { Leaf, LayoutDashboard, Truck, FileText, Settings, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Supply Chain", href: "/supply-chain", icon: Truck },
  { name: "Billing", href: "/billing", icon: FileText },
  { name: "Maintenance", href: "/maintenance", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 flex flex-col border-r bg-white/70 backdrop-blur-md shadow-sm z-20">
      {/* Brand */}
      <div className="flex items-center gap-2 px-6 h-16 border-b border-border/50">
        <div className="bg-primary/10 p-2 rounded-lg">
          <Leaf className="w-6 h-6 text-primary" />
        </div>
        <span className="text-xl font-bold tracking-tight text-foreground">BioSmart</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Profile */}
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors cursor-pointer">
          <UserCircle className="w-8 h-8 text-muted-foreground" />
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-foreground truncate">Admin User</p>
            <p className="text-xs text-muted-foreground truncate">System Manager</p>
          </div>
          <Settings className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </aside>
  );
}
