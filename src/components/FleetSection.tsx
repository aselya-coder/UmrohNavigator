import { motion } from "framer-motion";
import { Users, Briefcase, Clock, MapPin } from "lucide-react";
import { Button } from "./ui/button";

const fallbackImages: Record<string, string> = {
  "Luxury VIP Van": "https://images.unsplash.com/photo-1549317661-bd32c8ce0afe?w=600&h=400&fit=crop",
};

const vehicles = [
  {
    name: "Toyota Camry",
    type: "Sedan",
    passengers: 3,
    luggage: 2,
    pricePerTrip: "SAR 250",
    pricePerHour: "SAR 80",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop",
  },
  {
    name: "Hyundai H1",
    type: "Van",
    passengers: 6,
    luggage: 5,
    pricePerTrip: "SAR 400",
    pricePerHour: "SAR 120",
    image: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=600&h=400&fit=crop",
  },
  {
    name: "GMC Yukon",
    type: "SUV",
    passengers: 7,
    luggage: 6,
    pricePerTrip: "SAR 500",
    pricePerHour: "SAR 150",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=400&fit=crop",
  },
  {
    name: "Toyota Hiace",
    type: "Minibus",
    passengers: 12,
    luggage: 10,
    pricePerTrip: "SAR 600",
    pricePerHour: "SAR 180",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&h=400&fit=crop",
  },
  {
    name: "Toyota Coaster",
    type: "Bus",
    passengers: 25,
    luggage: 20,
    pricePerTrip: "SAR 900",
    pricePerHour: "SAR 250",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop",
  },
  {
    name: "Luxury VIP Van",
    type: "VIP",
    passengers: 7,
    luggage: 6,
    pricePerTrip: "SAR 800",
    pricePerHour: "SAR 200",
    image: "/luxury-vip-van.jpg",
  },
];

const FleetSection = () => {
  return (
    <section id="fleet" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-accent tracking-widest uppercase">Our Fleet</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mt-3">
            Choose Your <span className="text-gradient-gold">Vehicle</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Well-maintained, clean, and comfortable vehicles for every group size
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/40 transition-all duration-300 hover:shadow-premium group"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={v.image}
                  alt={v.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    const fb = fallbackImages[v.name];
                    if (fb && e.currentTarget.src !== fb) {
                      e.currentTarget.src = fb;
                    }
                  }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-serif font-bold text-foreground">{v.name}</h3>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">{v.type}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4 text-accent" /> {v.passengers} pax
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="w-4 h-4 text-accent" /> {v.luggage} bags
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-accent" /> {v.pricePerTrip}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-accent" /> {v.pricePerHour}/hr
                  </div>
                </div>

                <a href="#booking">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Select & Book
                  </Button>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
