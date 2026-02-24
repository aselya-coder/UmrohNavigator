import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, MessageCircle, DollarSign } from "lucide-react";
import { Button } from "./ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import { supabase } from "@/lib/supabaseClient";

const HeroSection = () => {
  const [phone, setPhone] = useState("6285646420488");
  const [title, setTitle] = useState("Premium Umrah Transport");
  const [subtitle, setSubtitle] = useState("in Saudi Arabia");
  const [badge, setBadge] = useState("Trusted by 10,000+ Pilgrims");
  const [motto, setMotto] = useState("Safe • Private • Comfortable • Trusted");
  const [tagline, setTagline] = useState("Airport Transfer – Intercity – Ziarah Tour");
  useEffect(() => {
    supabase
      .from("settings")
      .select("whatsapp")
      .order("id", { ascending: true })
      .limit(1)
      .then(({ data, error }) => {
        if (!error && data && data[0]?.whatsapp) setPhone(String(data[0].whatsapp));
      });
    supabase
      .from("hero")
      .select("title, subtitle, badge_text, motto_line, tagline_line")
      .order("id", { ascending: true })
      .limit(1)
      .then(({ data, error }) => {
        if (!error && data && data[0]) {
          const h = data[0] as {
            title?: string;
            subtitle?: string;
            badge_text?: string;
            motto_line?: string;
            tagline_line?: string;
          };
          if (h.title) setTitle(String(h.title));
          if (h.subtitle) setSubtitle(String(h.subtitle));
          if (h.badge_text) setBadge(String(h.badge_text));
          if (h.motto_line) setMotto(String(h.motto_line));
          if (h.tagline_line) setTagline(String(h.tagline_line));
        }
      });
  }, []);
  const text = "Halo, saya tertarik dengan layanan Transport in Saudi Arabia.";
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-dark/80 via-emerald-dark/60 to-emerald-dark/90" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-gold-light tracking-wide">{badge}</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-primary-foreground leading-tight mb-6">
            {title}{" "}
            <span className="text-gradient-gold">{subtitle}</span>
          </h1>

          <p className="text-lg md:text-xl text-gold-light/80 font-light mb-4 tracking-wide">
            {motto}
          </p>

          <p className="text-base md:text-lg text-primary-foreground/60 mb-10 max-w-2xl mx-auto">
            {tagline}
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#booking">
              <Button size="lg" className="bg-gradient-gold text-secondary-foreground font-semibold text-base px-8 py-6 hover:opacity-90 shadow-premium">
                Book Now <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <a href={`https://wa.me/${phone}?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-gold/40 text-gold-light hover:bg-gold/10 text-base px-8 py-6">
                <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp Booking
              </Button>
            </a>
            <a href="#fleet">
              <Button size="lg" variant="ghost" className="text-gold-light/80 hover:text-gold-light hover:bg-gold/5 text-base px-8 py-6">
                <DollarSign className="w-5 h-5 mr-2" /> View Prices
              </Button>
            </a>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: "10K+", label: "Happy Pilgrims" },
            { value: "24/7", label: "Support" },
            { value: "50+", label: "Vehicles" },
            { value: "5★", label: "Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-serif font-bold text-gradient-gold">{stat.value}</div>
              <div className="text-sm text-primary-foreground/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-gold/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 rounded-full bg-accent" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
