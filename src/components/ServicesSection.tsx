import { motion } from "framer-motion";
import { Plane, ArrowLeftRight, Moon } from "lucide-react";

const services = [
  {
    icon: Plane,
    title: "Airport Transfer",
    items: [
      "Jeddah Airport → Makkah",
      "Madinah Airport → Hotel",
      "VIP Fast Pickup",
    ],
    description: "Seamless airport pick-up and drop-off with meet & greet service.",
  },
  {
    icon: ArrowLeftRight,
    title: "Intercity Transfer",
    items: [
      "Makkah ↔ Madinah",
      "Makkah ↔ Jeddah",
      "Private Family Transport",
    ],
    description: "Comfortable intercity travel between holy cities.",
  },
  {
    icon: Moon,
    title: "Ziarah Tour",
    items: [
      "City tour religious sites",
      "Historical Islamic tour",
      "Experienced driver guide",
    ],
    description: "Visit sacred historical sites with knowledgeable drivers.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-accent tracking-widest uppercase">What We Offer</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mt-3">
            Our <span className="text-gradient-gold">Services</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Complete transportation solutions for your Umrah journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group bg-card rounded-2xl p-8 border border-border hover:border-accent/40 transition-all duration-300 hover:shadow-premium"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="w-7 h-7 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm mb-5">{service.description}</p>
              <ul className="space-y-2">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-foreground/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
