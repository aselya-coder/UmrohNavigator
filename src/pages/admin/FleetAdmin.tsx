import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

type Fleet = { id: number; name: string; capacity: number; price: string; image: string };

const FleetAdmin = () => {
  const [items, setItems] = useState<Fleet[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Fleet | null>(null);
  const [form, setForm] = useState<Omit<Fleet, "id">>({ name: "", capacity: 0, price: "", image: "" });
  const [file, setFile] = useState<File | null>(null);

  const load = async () => {
    const { data } = await supabase.from("fleet").select("*").order("id", { ascending: true });
    setItems((data || []) as Fleet[]);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    let imageUrl = form.image;
    if (file) {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `fleet/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("fleet").upload(path, file, { upsert: false });
      if (!uploadError) {
        const { data: pub } = supabase.storage.from("fleet").getPublicUrl(path);
        if (pub?.publicUrl) imageUrl = pub.publicUrl;
      }
    }
    if (editing) {
      await supabase.from("fleet").update({ ...form, image: imageUrl }).eq("id", editing.id);
    } else {
      await supabase.from("fleet").insert([{ ...form, image: imageUrl }]);
    }
    setOpen(false);
    setEditing(null);
    setForm({ name: "", capacity: 0, price: "", image: "" });
    setFile(null);
    await load();
  };

  const remove = async (id: number) => {
    await supabase.from("fleet").delete().eq("id", id);
    await load();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Fleet</h2>
        <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => { setEditing(null); setForm({ name: "", capacity: 0, price: "", image: "" }); setFile(null); setOpen(true); }}>Tambah</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-3 py-2 text-left">ID</th>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Capacity</th>
              <th className="px-3 py-2 text-left">Price</th>
              <th className="px-3 py-2 text-left">Image</th>
              <th className="px-3 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((f) => (
              <tr key={f.id} className="border-t">
                <td className="px-3 py-2">{f.id}</td>
                <td className="px-3 py-2">{f.name}</td>
                <td className="px-3 py-2">{f.capacity}</td>
                <td className="px-3 py-2">{f.price}</td>
                <td className="px-3 py-2">{f.image}</td>
                <td className="px-3 py-2 space-x-2">
                  <Button variant="outline" className="border-yellow-500 text-yellow-700" onClick={() => { setEditing(f); setForm({ name: f.name, capacity: f.capacity, price: f.price, image: f.image }); setFile(null); setOpen(true); }}>Edit</Button>
                  <Button variant="outline" className="border-red-500 text-red-700" onClick={() => remove(f.id)}>Hapus</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit Fleet" : "Tambah Fleet"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Capacity</Label>
              <Input type="number" value={form.capacity} onChange={(e) => setForm((f) => ({ ...f, capacity: Number(e.target.value) }))} />
            </div>
            <div className="space-y-2">
              <Label>Price</Label>
              <Input value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Image</Label>
              <Input value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} />
              <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
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

export default FleetAdmin;
