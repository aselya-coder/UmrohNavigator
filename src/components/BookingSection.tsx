import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";

const defaultVehicles = [
  "Toyota Camry (1-3 pax)",
  "Hyundai H1 (1-6 pax)",
  "GMC Yukon (1-7 pax)",
  "Toyota Hiace (1-12 pax)",
  "Toyota Coaster (1-25 pax)",
  "Luxury VIP Van (1-7 pax)",
];

const locations = [
  "King Abdulaziz Airport (Jeddah)",
  "Makkah - Hotel",
  "Madinah - Hotel",
  "Madinah Airport",
  "Jeddah City",
  "Custom Location",
];

const BookingSection = () => {
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<string[]>(defaultVehicles);
  const [targetWa, setTargetWa] = useState("6285646420488");
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    email: "",
    whatsapp: "",
    date: "",
    time: "",
    pickup: "",
    dropoff: "",
    passengers: "",
    vehicle: "",
  });

  useEffect(() => {
    supabase
      .from("fleet")
      .select("name, capacity")
      .then(({ data }) => {
        const rows = (data || []) as unknown[];
        if (rows.length) {
          const vs = rows.map((row) => {
            const d = row as { name: string; capacity: number };
            return `${d.name} (${d.capacity} pax)`;
          });
          setVehicles(vs);
        }
      });
    supabase
      .from("settings")
      .select("whatsapp")
      .order("id", { ascending: true })
      .limit(1)
      .then(({ data }) => {
        if (data && data[0]?.whatsapp) setTargetWa(String(data[0].whatsapp));
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*New Booking Request*\n\nName: ${formData.name}\nCountry: ${formData.country}\nEmail: ${formData.email}\nDate: ${formData.date}\nTime: ${formData.time}\nPickup: ${formData.pickup}\nDropoff: ${formData.dropoff}\nPassengers: ${formData.passengers}\nVehicle: ${formData.vehicle}`;
    await supabase.from("booking").insert([
      {
        name: formData.name,
        phone: formData.whatsapp,
        service: formData.vehicle || "N/A",
        date: formData.date || null,
        pickup: formData.pickup || "",
        destination: formData.dropoff || "",
      },
    ]);
    window.open(`https://wa.me/${targetWa}?text=${encodeURIComponent(text)}`, "_blank");
    toast({
      title: "Booking Sent!",
      description: "Your booking request has been sent via WhatsApp.",
    });
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section id="booking" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-accent tracking-widest uppercase">Reservation</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mt-3">
            Book Your <span className="text-gradient-gold">Ride</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Fill in the details below and we'll confirm your booking instantly
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-card rounded-2xl p-8 md:p-10 border border-border shadow-premium"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Your full name" required value={formData.name} onChange={(e) => updateField("name", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" placeholder="e.g. Indonesia" required value={formData.country} onChange={(e) => updateField("country", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" required value={formData.email} onChange={(e) => updateField("email", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp Number</Label>
              <Input id="whatsapp" placeholder="+62 812 xxxx xxxx" required value={formData.whatsapp} onChange={(e) => updateField("whatsapp", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" required value={formData.date} onChange={(e) => updateField("date", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" required value={formData.time} onChange={(e) => updateField("time", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Pickup Location</Label>
              <Select onValueChange={(val) => updateField("pickup", val)}>
                <SelectTrigger><SelectValue placeholder="Select pickup" /></SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Drop-off Location</Label>
              <Select onValueChange={(val) => updateField("dropoff", val)}>
                <SelectTrigger><SelectValue placeholder="Select drop-off" /></SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="passengers">Number of Passengers</Label>
              <Input id="passengers" type="number" min="1" max="50" placeholder="e.g. 4" required value={formData.passengers} onChange={(e) => updateField("passengers", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Vehicle</Label>
              <Select onValueChange={(val) => updateField("vehicle", val)}>
                <SelectTrigger><SelectValue placeholder="Select vehicle" /></SelectTrigger>
                <SelectContent>
                  {vehicles.map((v) => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full mt-8 bg-gradient-gold text-secondary-foreground font-semibold hover:opacity-90 py-6 text-base">
            <Send className="w-5 h-5 mr-2" /> Send Booking via WhatsApp
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default BookingSection;
