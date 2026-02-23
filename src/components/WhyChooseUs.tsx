import { motion } from "framer-motion";
import { Shield, Clock, Car, Globe, DollarSign, Heart } from "lucide-react";

const reasons = [
  { icon: Globe, title: "Multilingual Drivers", desc: "Drivers speak Indonesian, English & Arabic" },
  { icon: Shield, title: "Experienced & Licensed", desc: "Years of Umrah & Hajj transport experience" },
  { icon: Clock, title: "Always On Time", desc: "Punctual pickup guaranteed, 24/7 availability" },
  { icon: Car, title: "Clean & Maintained", desc: "Well-serviced, comfortable modern vehicles" },
  { icon: DollarSign, title: "Transparent Pricing", desc: "No hidden fees, clear rates upfront" },
  { icon: Heart, title: "Trusted by Thousands", desc: "10,000+ satisfied pilgrims worldwide" },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-accent tracking-widest uppercase">Why Us</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mt-3">
            Why Choose <span className="text-gradient-gold">Al-Safwa</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-4 bg-card rounded-xl p-6 border border-border"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <r.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-serif font-semibold text-foreground mb-1">{r.title}</h3>
                <p className="text-sm text-muted-foreground">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
