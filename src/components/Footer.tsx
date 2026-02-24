import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-gradient-emerald py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-primary-foreground mb-2">Al-Safwa</h3>
            <p className="text-xs text-gold-light tracking-widest uppercase mb-4">Premium Umrah Transport</p>
            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              Your trusted partner for safe, comfortable, and reliable transportation during your sacred journey in Saudi Arabia.
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
                <a href={`https://wa.me/6285646420488?text=${encodeURIComponent('Halo, saya tertarik dengan layanan Transport in Saudi Arabia.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-primary-foreground/60 hover:text-gold-light transition-colors">
                  <MessageCircle className="w-4 h-4 text-accent" /> +62 856 4642 0488 
                </a>
              </li>
              <li>
                <a href="tel:+6285646420488" className="flex items-center gap-3 text-sm text-primary-foreground/60 hover:text-gold-light transition-colors">
                  <Phone className="w-4 h-4 text-accent" /> +62 856 4642 0488 
                </a>
              </li>
              <li>
                <a href="mailto:info@alsafwa-transport.com" className="flex items-center gap-3 text-sm text-primary-foreground/60 hover:text-gold-light transition-colors">
                  <Mail className="w-4 h-4 text-accent" /> info@alsafwa-transport.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/60">
                <MapPin className="w-4 h-4 text-accent" /> Jeddah, Saudi Arabia
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold/10 pt-8 text-center">
          <p className="text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Al-Safwa Transport. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
