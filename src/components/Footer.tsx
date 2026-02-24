import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const Footer = () => {
  const [whatsapp, setWhatsapp] = useState("+6285646420488");
  const [address, setAddress] = useState("Jeddah, Saudi Arabia");
  const [brand, setBrand] = useState("Al-Safwa");
  const [tagline, setTagline] = useState("Premium Umrah Transport");
  const [description, setDescription] = useState(
    "Your trusted partner for safe, comfortable, and reliable transportation during your sacred journey in Saudi Arabia.",
  );
  const [email, setEmail] = useState("info@alsafwa-transport.com");
  useEffect(() => {
    supabase
      .from("settings")
      .select("whatsapp, address, brand_name, footer_tagline, footer_description, contact_email")
      .order("id", { ascending: true })
      .limit(1)
      .then(({ data, error }) => {
        if (error || !data || !data[0]) return;
        const s = data[0] as {
          whatsapp?: string;
          address?: string;
          brand_name?: string;
          footer_tagline?: string;
          footer_description?: string;
          contact_email?: string;
        };
        if (s.whatsapp) setWhatsapp(String(s.whatsapp));
        if (s.address) setAddress(String(s.address));
        if (s.brand_name) setBrand(String(s.brand_name));
        if (s.footer_tagline) setTagline(String(s.footer_tagline));
        if (s.footer_description) setDescription(String(s.footer_description));
        if (s.contact_email) setEmail(String(s.contact_email));
      });
  }, []);
  const waText = encodeURIComponent("Halo, saya tertarik dengan layanan Transport in Saudi Arabia.");
  return (
    <footer id="contact" className="bg-gradient-emerald py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-primary-foreground mb-2">{brand}</h3>
            <p className="text-xs text-gold-light tracking-widest uppercase mb-4">{tagline}</p>
            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold text-primary-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Services", "Fleet", "Booking", "Reviews", "FAQ"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-sm text-primary-foreground/60 hover:text-gold-light transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-semibold text-primary-foreground mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <a href={`https://wa.me/${whatsapp}?text=${waText}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-primary-foreground/60 hover:text-gold-light transition-colors">
                  <MessageCircle className="w-4 h-4 text-accent" /> {whatsapp}
                </a>
              </li>
              <li>
                <a href={`tel:${whatsapp}`} className="flex items-center gap-3 text-sm text-primary-foreground/60 hover:text-gold-light transition-colors">
                  <Phone className="w-4 h-4 text-accent" /> {whatsapp}
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`} className="flex items-center gap-3 text-sm text-primary-foreground/60 hover:text-gold-light transition-colors">
                  <Mail className="w-4 h-4 text-accent" /> {email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/60">
                <MapPin className="w-4 h-4 text-accent" /> {address}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold/10 pt-8 text-center">
          <p className="text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} {brand} Transport. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
