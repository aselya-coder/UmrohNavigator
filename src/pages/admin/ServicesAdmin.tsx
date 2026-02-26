import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";

type Service = {
  id: number;
  title: string;
  description: string;
  icon: string;
  items?: string;
};

const ServicesAdmin = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState<Omit<Service, "id">>({ title: "", description: "", icon: "", items: "" });
  const [deleting, setDeleting] = useState<Service | null>(null);

  const load = async () => {
    const { data, error } = await supabase.from("services").select("*").order("id", { ascending: true });
    if (!error) setServices((data || []) as Service[]);
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ title: "", description: "", icon: "", items: "" });
    setOpen(true);
  };

  const openEdit = (service: Service) => {
    setEditing(service);
    setForm({ title: service.title, description: service.description, icon: service.icon, items: service.items || "" });
    setOpen(true);
  };

  const save = async () => {
    if (editing) {
      await supabase.from("services").update(form).eq("id", editing.id);
    } else {
      await supabase.from("services").insert([form]);
    }
    setOpen(false);
    await load();
  };

  const confirmDelete = (service: Service) => setDeleting(service);

  const doDelete = async () => {
    if (deleting) {
      await supabase.from("services").delete().eq("id", deleting.id);
      setDeleting(null);
      await load();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Services</h2>
        <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={openCreate}>Tambah</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-3 py-2 text-left">ID</th>
              <th className="px-3 py-2 text-left">Title</th>
              <th className="px-3 py-2 text-left">Description</th>
              <th className="px-3 py-2 text-left">Icon</th>
              <th className="px-3 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="px-3 py-2">{s.id}</td>
                <td className="px-3 py-2">{s.title}</td>
                <td className="px-3 py-2">{s.description}</td>
                <td className="px-3 py-2">{s.icon}</td>
                <td className="px-3 py-2 space-x-2">
                  <Button variant="outline" className="border-yellow-500 text-yellow-700" onClick={() => openEdit(s)}>Edit</Button>
                  <Button variant="outline" className="border-red-500 text-red-700" onClick={() => confirmDelete(s)}>Hapus</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Service" : "Tambah Service"}</DialogTitle>
            <DialogDescription>Isi detail layanan lalu tekan Simpan.</DialogDescription>
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
            <div className="space-y-2">
              <Label>Icon</Label>
              <Input value={form.icon} onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))} />
              <p className="text-[10px] text-muted-foreground">Options: Plane, ArrowLeftRight, Moon</p>
            </div>
            <div className="space-y-2">
              <Label>Bullet Points (comma separated)</Label>
              <Input value={form.items} onChange={(e) => setForm((f) => ({ ...f, items: e.target.value }))} placeholder="Item 1, Item 2, Item 3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Batal</Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={save}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleting} onOpenChange={(v) => !v && setDeleting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>Tindakan ini tidak dapat dibatalkan.</DialogDescription>
          </DialogHeader>
          <p>Hapus item: {deleting?.title}</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleting(null)}>Batal</Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={doDelete}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesAdmin;
