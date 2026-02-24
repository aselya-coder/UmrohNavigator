import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

type Booking = {
  id: number;
  name: string;
  phone: string;
  service: string;
  date: string;
  pickup: string;
  destination: string;
};

const BookingAdmin = () => {
  const [items, setItems] = useState<Booking[]>([]);

  const load = async () => {
    const { data } = await supabase.from("booking").select("*").order("id", { ascending: false });
    setItems((data || []) as Booking[]);
  };
  useEffect(() => { load(); }, []);

  const remove = async (id: number) => {
    await supabase.from("booking").delete().eq("id", id);
    await load();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Booking</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-3 py-2 text-left">ID</th>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Phone</th>
              <th className="px-3 py-2 text-left">Service</th>
              <th className="px-3 py-2 text-left">Date</th>
              <th className="px-3 py-2 text-left">Pickup</th>
              <th className="px-3 py-2 text-left">Destination</th>
              <th className="px-3 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="px-3 py-2">{b.id}</td>
                <td className="px-3 py-2">{b.name}</td>
                <td className="px-3 py-2">{b.phone}</td>
                <td className="px-3 py-2">{b.service}</td>
                <td className="px-3 py-2">{b.date}</td>
                <td className="px-3 py-2">{b.pickup}</td>
                <td className="px-3 py-2">{b.destination}</td>
                <td className="px-3 py-2 space-x-2">
                  <Button variant="outline" className="border-red-500 text-red-700" onClick={() => remove(b.id)}>Hapus</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingAdmin;
