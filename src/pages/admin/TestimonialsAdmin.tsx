import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";

type Testimonial = { id: number; name: string; role: string; message: string };

const TestimonialsAdmin = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<Omit<Testimonial, "id">>({ name: "", role: "", message: "" });

  const load = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("id", { ascending: true });
    setItems((data || []) as Testimonial[]);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (editing) {
      await supabase.from("testimonials").update(form).eq("id", editing.id);
    } else {
      await supabase.from("testimonials").insert([form]);
    }
    setOpen(false);
    setEditing(null);
    await load();
  };

  const remove = async (id: number) => {
    await supabase.from("testimonials").delete().eq("id", id);
    await load();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Testimonials</h2>
        <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => { setEditing(null); setForm({ name: "", role: "", message: "" }); setOpen(true); }}>Tambah</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-3 py-2 text-left">ID</th>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Role</th>
              <th className="px-3 py-2 text-left">Message</th>
              <th className="px-3 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="px-3 py-2">{t.id}</td>
                <td className="px-3 py-2">{t.name}</td>
                <td className="px-3 py-2">{t.role}</td>
                <td className="px-3 py-2">{t.message}</td>
                <td className="px-3 py-2 space-x-2">
                  <Button variant="outline" className="border-yellow-500 text-yellow-700" onClick={() => { setEditing(t); setForm({ name: t.name, role: t.role, message: t.message }); setOpen(true); }}>Edit</Button>
                  <Button variant="outline" className="border-red-500 text-red-700" onClick={() => remove(t.id)}>Hapus</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Testimonial" : "Tambah Testimonial"}</DialogTitle>
            <DialogDescription>Isi nama, peran/negara, dan pesan ulasan.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Role/Country</Label>
              <Input value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Message</Label>
              <Input value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Batal</Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={save}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestimonialsAdmin;
