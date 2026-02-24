import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import Sidebar from "./Sidebar.tsx";
import Header from "./Header.tsx";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (!session) {
        if (mounted) navigate("/admin/login", { replace: true });
        return;
      }
      const userId = session.user.id;
      const { data: adminRows } = await supabase
        .from("admins")
        .select("id")
        .eq("id", userId)
        .limit(1);
      const isAdmin = !!adminRows && adminRows.length > 0;
      if (!isAdmin) {
        await supabase.auth.signOut();
        if (mounted) navigate("/admin/login", { replace: true });
        return;
      }
      if (mounted) setChecking(false);
    };
    checkAuth();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/admin/login", { replace: true });
      }
    });
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-white">
        <div className="text-sm">Checking admin access...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white grid grid-cols-[260px_1fr]">
      <aside className="bg-[#111827] border-r border-white/10">
        <Sidebar />
      </aside>
      <main className="flex flex-col">
        <Header />
        <div className="p-6">
          <div className="rounded-xl bg-white text-black shadow-sm">
            <div className="p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
