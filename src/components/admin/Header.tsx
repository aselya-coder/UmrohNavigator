import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const title = location.pathname.replace("/admin", "") || "/";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="border-b border-white/10 bg-[#0F172A]">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="text-sm text-white/60">Admin</div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-white/80">Route: {title}</div>
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
