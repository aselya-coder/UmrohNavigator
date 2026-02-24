import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Counts = {
  services: number;
  fleet: number;
  testimonials: number;
  faq: number;
  why: number;
  bookings: number;
};

const Dashboard = () => {
  const [counts, setCounts] = useState<Counts>({
    services: 0,
    fleet: 0,
    testimonials: 0,
    faq: 0,
    why: 0,
    bookings: 0,
  });

  useEffect(() => {
    const load = async () => {
      const [svc, fl, tst, fq, wy, bk] = await Promise.all([
        supabase.from("services").select("*", { count: "exact", head: true }),
        supabase.from("fleet").select("*", { count: "exact", head: true }),
        supabase.from("testimonials").select("*", { count: "exact", head: true }),
        supabase.from("faq").select("*", { count: "exact", head: true }),
        supabase.from("why_choose_us").select("*", { count: "exact", head: true }),
        supabase.from("booking").select("*", { count: "exact", head: true }),
      ]);
      setCounts({
        services: svc.count || 0,
        fleet: fl.count || 0,
        testimonials: tst.count || 0,
        faq: fq.count || 0,
        why: wy.count || 0,
        bookings: bk.count || 0,
      });
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Ringkasan cepat konten website Al-Safwa. Gunakan menu di sidebar untuk mengelola detail.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{counts.services}</div>
            <p className="text-xs text-muted-foreground mt-1">Layanan aktif di halaman Services.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Fleet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{counts.fleet}</div>
            <p className="text-xs text-muted-foreground mt-1">Kendaraan yang tersedia untuk booking.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Testimonials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{counts.testimonials}</div>
            <p className="text-xs text-muted-foreground mt-1">Ulasan jamaah di halaman Testimonials.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">FAQ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{counts.faq}</div>
            <p className="text-xs text-muted-foreground mt-1">Pertanyaan yang sering diajukan.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Why Choose Us</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{counts.why}</div>
            <p className="text-xs text-muted-foreground mt-1">Alasan utama memilih Al-Safwa.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Booking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{counts.bookings}</div>
            <p className="text-xs text-muted-foreground mt-1">Data booking yang tercatat.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
