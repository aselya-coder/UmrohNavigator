import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

type Hero = {
  id: number;
  title: string;
  subtitle: string;
  badge_text?: string;
  motto_line?: string;
  tagline_line?: string;
};

const HeroAdmin = () => {
  const [heros, setHeros] = useState<Hero[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Hero | null>(null);
  const [form, setForm] = useState<Omit<Hero, "id">>({
    title: "",
    subtitle: "",
    badge_text: "",
    motto_line: "",
    tagline_line: "",
  });
  const [deleting, setDeleting] = useState<Hero | null>(null);

  const load = async () => {
    const { data } = await supabase.from("hero").select("*").order("id", { ascending: true });
    setHeros((data || []) as Hero[]);
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ title: "", subtitle: "", badge_text: "", motto_line: "", tagline_line: "" });
    setOpen(true);
  };

  const openEdit = (item: Hero) => {
    setEditing(item);
    setForm({
      title: item.title,
      subtitle: item.subtitle,
      badge_text: item.badge_text || "",
      motto_line: item.motto_line || "",
      tagline_line: item.tagline_line || "",
    });
    setOpen(true);
  };

  const save = async () => {
    if (editing) {
      await supabase.from("hero").update(form).eq("id", editing.id);
    } else {
      await supabase.from("hero").insert([form]);
    }
    setOpen(false);
    await load();
  };

  const doDelete = async () => {
    if (editing) {
      await supabase.from("hero").delete().eq("id", editing.id);
      setEditing(null);
      await load();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Hero</h2>
        <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={openCreate}>Tambah</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-3 py-2 text-left">ID</th>
              <th className="px-3 py-2 text-left">Title</th>
              <th className="px-3 py-2 text-left">Subtitle</th>
              <th className="px-3 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {heros.map((h) => (
              <tr key={h.id} className="border-t">
                <td className="px-3 py-2">{h.id}</td>
                <td className="px-3 py-2">{h.title}</td>
                <td className="px-3 py-2">{h.subtitle}</td>
                <td className="px-3 py-2 space-x-2">
                  <Button variant="outline" className="border-yellow-500 text-yellow-700" onClick={() => openEdit(h)}>Edit</Button>
                  <Button variant="outline" className="border-red-500 text-red-700" onClick={() => { setEditing(h); setOpen(true); }}>Hapus</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Hero" : "Tambah Hero"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="mb-2 text-sm text-muted-foreground">ID: {editing.id}</div>
          )}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Subtitle</Label>
              <Input value={form.subtitle} onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Badge Text</Label>
              <Input value={form.badge_text} onChange={(e) => setForm((f) => ({ ...f, badge_text: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Motto Line</Label>
              <Input value={form.motto_line} onChange={(e) => setForm((f) => ({ ...f, motto_line: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Tagline Line</Label>
              <Input value={form.tagline_line} onChange={(e) => setForm((f) => ({ ...f, tagline_line: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Batal</Button>
            {editing ? (
              <>
                <Button className="bg-yellow-600 hover:bg-yellow-700 text-white" onClick={save}>Simpan</Button>
                <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={doDelete}>Hapus</Button>
              </>
            ) : (
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={save}>Simpan</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeroAdmin;
