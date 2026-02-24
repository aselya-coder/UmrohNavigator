import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";

type Why = { id: number; title: string; description: string };

const WhyChooseUsAdmin = () => {
  const [items, setItems] = useState<Why[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Why | null>(null);
  const [form, setForm] = useState<Omit<Why, "id">>({ title: "", description: "" });

  const load = async () => {
    const { data } = await supabase.from("why_choose_us").select("*").order("id", { ascending: true });
    setItems((data || []) as Why[]);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (editing) {
      await supabase.from("why_choose_us").update(form).eq("id", editing.id);
    } else {
      await supabase.from("why_choose_us").insert([form]);
    }
    setOpen(false);
    setEditing(null);
    await load();
  };

  const remove = async (id: number) => {
    await supabase.from("why_choose_us").delete().eq("id", id);
    await load();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Why Choose Us</h2>
        <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => { setEditing(null); setForm({ title: "", description: "" }); setOpen(true); }}>Tambah</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-3 py-2 text-left">ID</th>
              <th className="px-3 py-2 text-left">Title</th>
              <th className="px-3 py-2 text-left">Description</th>
              <th className="px-3 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((w) => (
              <tr key={w.id} className="border-t">
                <td className="px-3 py-2">{w.id}</td>
                <td className="px-3 py-2">{w.title}</td>
                <td className="px-3 py-2">{w.description}</td>
                <td className="px-3 py-2 space-x-2">
                  <Button variant="outline" className="border-yellow-500 text-yellow-700" onClick={() => { setEditing(w); setForm({ title: w.title, description: w.description }); setOpen(true); }}>Edit</Button>
                  <Button variant="outline" className="border-red-500 text-red-700" onClick={() => remove(w.id)}>Hapus</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Item" : "Tambah Item"}</DialogTitle>
            <DialogDescription>Isi judul dan deskripsi alasan memilih kami.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
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

export default WhyChooseUsAdmin;
