import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

type HeaderProps = {
  onToggleSidebar?: () => void;
};

const Header = ({ onToggleSidebar }: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const title = location.pathname.replace("/admin", "") || "/";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="border-b border-white/10 bg-[#0F172A]">
      <div className="px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="md:hidden text-white" onClick={onToggleSidebar}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="text-sm text-white/60">Admin</div>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden xs:block text-xs md:text-sm text-white/80 truncate max-w-[120px] md:max-w-none">
            Route: {title}
          </div>
          <Button
            size="sm"
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
