import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Settings = {
  id: number;
  whatsapp: string;
  address: string;
  brand_name: string;
  brand_subtitle?: string;
  cta_book_label?: string;
  cta_whatsapp_label?: string;
  footer_tagline?: string;
  footer_description?: string;
  contact_email?: string;
};

const SettingsAdmin = () => {
  const [settings, setSettings] = useState<Settings[]>([]);
  const [form, setForm] = useState<Omit<Settings, "id">>({
    whatsapp: "",
    address: "",
    brand_name: "",
    brand_subtitle: "",
    cta_book_label: "",
    cta_whatsapp_label: "",
    footer_tagline: "",
    footer_description: "",
    contact_email: "",
  });
  const [editing, setEditing] = useState<Settings | null>(null);

  const load = async () => {
    const { data } = await supabase.from("settings").select("*").order("id", { ascending: true });
    setSettings((data || []) as Settings[]);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    if (editing) {
      await supabase.from("settings").update(form).eq("id", editing.id);
    } else {
      await supabase.from("settings").insert([form]);
    }
    setEditing(null);
    setForm({
      whatsapp: "",
      address: "",
      brand_name: "",
      brand_subtitle: "",
      cta_book_label: "",
      cta_whatsapp_label: "",
      footer_tagline: "",
      footer_description: "",
      contact_email: "",
    });
    await load();
  };

  const remove = async (id: number) => {
    await supabase.from("settings").delete().eq("id", id);
    await load();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Settings</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-3 py-2 text-left">ID</th>
              <th className="px-3 py-2 text-left">WhatsApp</th>
              <th className="px-3 py-2 text-left">Address</th>
              <th className="px-3 py-2 text-left">Brand Name</th>
              <th className="px-3 py-2 text-left">Brand Subtitle</th>
              <th className="px-3 py-2 text-left">CTA Book Label</th>
              <th className="px-3 py-2 text-left">CTA WhatsApp Label</th>
              <th className="px-3 py-2 text-left">Footer Tagline</th>
              <th className="px-3 py-2 text-left">Footer Description</th>
              <th className="px-3 py-2 text-left">Contact Email</th>
              <th className="px-3 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {settings.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="px-3 py-2">{s.id}</td>
                <td className="px-3 py-2">{s.whatsapp}</td>
                <td className="px-3 py-2">{s.address}</td>
                <td className="px-3 py-2">{s.brand_name}</td>
                <td className="px-3 py-2">{s.brand_subtitle || ""}</td>
                <td className="px-3 py-2">{s.cta_book_label || ""}</td>
                <td className="px-3 py-2">{s.cta_whatsapp_label || ""}</td>
                <td className="px-3 py-2">{s.footer_tagline || ""}</td>
                <td className="px-3 py-2">{s.footer_description || ""}</td>
                <td className="px-3 py-2">{s.contact_email || ""}</td>
                <td className="px-3 py-2 space-x-2">
                  <Button
                    variant="outline"
                    className="border-yellow-500 text-yellow-700"
                    onClick={() => {
                      setEditing(s);
                      setForm({
                        whatsapp: s.whatsapp,
                        address: s.address,
                        brand_name: s.brand_name,
                        brand_subtitle: s.brand_subtitle || "",
                        cta_book_label: s.cta_book_label || "",
                        cta_whatsapp_label: s.cta_whatsapp_label || "",
                        footer_tagline: s.footer_tagline || "",
                        footer_description: s.footer_description || "",
                        contact_email: s.contact_email || "",
                      });
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="outline" className="border-red-500 text-red-700" onClick={() => remove(s.id)}>Hapus</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>WhatsApp</Label>
          <Input value={form.whatsapp} onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value }))} placeholder="+62..." />
        </div>
        <div className="space-y-2">
          <Label>Address</Label>
          <Input value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <Label>Brand Name</Label>
          <Input value={form.brand_name} onChange={(e) => setForm((f) => ({ ...f, brand_name: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <Label>Brand Subtitle</Label>
          <Input value={form.brand_subtitle} onChange={(e) => setForm((f) => ({ ...f, brand_subtitle: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <Label>CTA Book Label</Label>
          <Input value={form.cta_book_label} onChange={(e) => setForm((f) => ({ ...f, cta_book_label: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <Label>CTA WhatsApp Label</Label>
          <Input value={form.cta_whatsapp_label} onChange={(e) => setForm((f) => ({ ...f, cta_whatsapp_label: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <Label>Footer Tagline</Label>
          <Input value={form.footer_tagline} onChange={(e) => setForm((f) => ({ ...f, footer_tagline: e.target.value }))} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Footer Description</Label>
          <Input value={form.footer_description} onChange={(e) => setForm((f) => ({ ...f, footer_description: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <Label>Contact Email</Label>
          <Input value={form.contact_email} onChange={(e) => setForm((f) => ({ ...f, contact_email: e.target.value }))} />
        </div>
      </div>
      <div className="flex gap-2">
        {editing && (
          <Button
            variant="outline"
            onClick={() => {
              setEditing(null);
              setForm({
                whatsapp: "",
                address: "",
                brand_name: "",
                brand_subtitle: "",
                cta_book_label: "",
                cta_whatsapp_label: "",
                footer_tagline: "",
                footer_description: "",
                contact_email: "",
              });
            }}
          >
            Batal
          </Button>
        )}
        <Button className={editing ? "bg-yellow-600 hover:bg-yellow-700 text-white" : "bg-green-600 hover:bg-green-700 text-white"} onClick={save}>
          {editing ? "Simpan" : "Tambah"}
        </Button>
      </div>
    </div>
  );
};

export default SettingsAdmin;
