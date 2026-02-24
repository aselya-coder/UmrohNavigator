import { NavLink } from "@/components/NavLink";
import { LayoutDashboard, Type, Briefcase, Car, MessageSquare, HelpCircle, Calendar, Shield, Settings } from "lucide-react";

const Sidebar = () => {
  const items = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/hero", label: "Hero", icon: Type },
    { to: "/admin/services", label: "Services", icon: Briefcase },
    { to: "/admin/fleet", label: "Fleet", icon: Car },
    { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
    { to: "/admin/faq", label: "FAQ", icon: HelpCircle },
    { to: "/admin/booking", label: "Booking", icon: Calendar },
    { to: "/admin/why-choose-us", label: "Why Choose Us", icon: Shield },
    { to: "/admin/settings", label: "Settings", icon: Settings },
  ];
  return (
    <div className="p-4">
      <div className="px-2 py-4">
        <div className="text-xl font-semibold">Admin Panel</div>
        <div className="text-xs text-white/50">Al-Safwa Transport</div>
      </div>
      <nav className="space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/10"
            activeClassName="bg-white/10 text-white"
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
