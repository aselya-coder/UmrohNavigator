import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const WhatsAppFloat = () => {
  const [phone, setPhone] = useState("6285646420488");
  useEffect(() => {
    supabase
      .from("settings")
      .select("whatsapp")
      .order("id", { ascending: true })
      .limit(1)
      .then(({ data, error }) => {
        if (!error && data && data[0]?.whatsapp) {
          setPhone(String(data[0].whatsapp));
        }
      });
  }, []);
  const text = "Halo, saya tertarik dengan layanan Transport in Saudi Arabia.";
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[hsl(142,70%,45%)] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-primary-foreground" />
    </a>
  );
};

export default WhatsAppFloat;
