import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabaseClient";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#fleet", label: "Fleet" },
    { href: "#booking", label: "Booking" },
    { href: "#testimonials", label: "Reviews" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  const [phone, setPhone] = useState("6285646420488");
  const [brand, setBrand] = useState({ name: "Al-Safwa", subtitle: "Transport", ctaBook: "Book Now", ctaWa: "WhatsApp" });
  useEffect(() => {
    supabase
      .from("settings")
      .select("whatsapp, brand_name, brand_subtitle, cta_book_label, cta_whatsapp_label")
      .order("id", { ascending: true })
      .limit(1)
      .then(({ data, error }) => {
        if (error || !data || !data[0]) return;
        const s = data[0] as {
          whatsapp?: string;
          brand_name?: string;
          brand_subtitle?: string;
          cta_book_label?: string;
          cta_whatsapp_label?: string;
        };
        if (s.whatsapp) setPhone(String(s.whatsapp));
        setBrand({
          name: s.brand_name || "Al-Safwa",
          subtitle: s.brand_subtitle || "Transport",
          ctaBook: s.cta_book_label || "Book Now",
          ctaWa: s.cta_whatsapp_label || "WhatsApp",
        });
      });
  }, []);
  const text = "Halo, saya tertarik dengan layanan Transport in Saudi Arabia.";
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="text-2xl font-serif font-bold text-primary">{brand.name}</span>
          <span className="text-xs text-accent font-medium tracking-widest uppercase">{brand.subtitle}</span>
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`https://wa.me/${phone}?text=${encodeURIComponent(text)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground">
              <Phone className="w-4 h-4 mr-2" />
              {brand.ctaWa}
            </Button>
          </a>
          <a href="#booking">
            <Button size="sm" className="bg-gradient-gold text-secondary-foreground font-semibold hover:opacity-90">
              {brand.ctaBook}
            </Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-foreground"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-background border-b border-border px-4 pb-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-2 pt-2">
            <a href={`https://wa.me/${phone}?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button variant="outline" size="sm" className="w-full border-primary/30 text-primary">
                <Phone className="w-4 h-4 mr-2" /> {brand.ctaWa}
              </Button>
            </a>
            <a href="#booking" className="flex-1" onClick={() => setIsOpen(false)}>
              <Button size="sm" className="w-full bg-gradient-gold text-secondary-foreground font-semibold">
                {brand.ctaBook}
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
