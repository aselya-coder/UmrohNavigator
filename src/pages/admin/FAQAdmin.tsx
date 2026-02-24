import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

type Faq = { id: number; question: string; answer: string };

const FAQAdmin = () => {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Faq | null>(null);
  const [form, setForm] = useState<Omit<Faq, "id">>({ question: "", answer: "" });

  const load = async () => {
    const { data } = await supabase.from("faq").select("*").order("id", { ascending: true });
    setFaqs((data || []) as Faq[]);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (editing) {
      await supabase.from("faq").update(form).eq("id", editing.id);
    } else {
      await supabase.from("faq").insert([form]);
    }
    setOpen(false);
    setEditing(null);
    await load();
  };

  const remove = async (id: number) => {
    await supabase.from("faq").delete().eq("id", id);
    await load();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => { setEditing(null); setForm({ question: "", answer: "" }); setOpen(true); }}>Tambah</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-3 py-2 text-left">ID</th>
              <th className="px-3 py-2 text-left">Question</th>
              <th className="px-3 py-2 text-left">Answer</th>
              <th className="px-3 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((f) => (
              <tr key={f.id} className="border-t">
                <td className="px-3 py-2">{f.id}</td>
                <td className="px-3 py-2">{f.question}</td>
                <td className="px-3 py-2">{f.answer}</td>
                <td className="px-3 py-2 space-x-2">
                  <Button variant="outline" className="border-yellow-500 text-yellow-700" onClick={() => { setEditing(f); setForm({ question: f.question, answer: f.answer }); setOpen(true); }}>Edit</Button>
                  <Button variant="outline" className="border-red-500 text-red-700" onClick={() => remove(f.id)}>Hapus</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit FAQ" : "Tambah FAQ"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Question</Label>
              <Input value={form.question} onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Answer</Label>
              <Input value={form.answer} onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))} />
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

export default FAQAdmin;
