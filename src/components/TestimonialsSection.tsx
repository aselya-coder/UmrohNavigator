import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type TestimonialView = { name: string; country: string; text: string; rating: number };

const defaultTestimonials: TestimonialView[] = [
  {
    name: "Ahmad Hidayat",
    country: "Indonesia",
    text: "Service luar biasa! Driver datang tepat waktu di bandara Jeddah dan mobil sangat bersih. Perjalanan ke Makkah sangat nyaman. Highly recommended!",
    rating: 5,
  },
  {
    name: "Fatimah Al-Rashid",
    country: "Malaysia",
    text: "We used Al-Safwa for our family umrah trip. The H1 van was spacious and the driver was very professional. Will definitely book again!",
    rating: 5,
  },
  {
    name: "Mohammed Khan",
    country: "United Kingdom",
    text: "Excellent service from airport to hotel. The VIP vehicle was top quality. Communication via WhatsApp was quick and responsive.",
    rating: 5,
  },
  {
    name: "Ayşe Yılmaz",
    country: "Turkey",
    text: "Very professional and reliable transport service. The ziarah tour was informative and the driver knew all the historical sites well.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<TestimonialView[]>(defaultTestimonials);

  useEffect(() => {
    supabase
      .from("testimonials")
      .select("*")
      .then(({ data, error }) => {
        if (error) return;
        const rows = (data || []) as unknown[];
        if (!rows.length) return;
        const mapped = rows.map((row) => {
          const t = row as { name: string; role: string; message: string };
          return { name: t.name, country: t.role, text: t.message, rating: 5 };
        });
        setTestimonials(mapped);
      });
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-gradient-emerald">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-gold-light tracking-widest uppercase">Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary-foreground mt-3">
            What Our <span className="text-gradient-gold">Clients Say</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-primary-foreground/5 backdrop-blur-sm rounded-2xl p-8 border border-gold/10"
            >
              <Quote className="w-8 h-8 text-accent/40 mb-4" />
              <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-serif font-semibold text-primary-foreground">{t.name}</p>
                  <p className="text-xs text-gold-light/60">{t.country}</p>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
