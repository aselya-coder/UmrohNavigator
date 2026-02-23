import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

const faqs = [
  {
    q: "How do I book a vehicle for my Umrah trip?",
    a: "Simply fill in our booking form or contact us via WhatsApp. Provide your travel dates, pickup/drop-off locations, and group size. We'll confirm availability and pricing instantly.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept bank transfer, PayPal, and cash payment. You can pay a deposit (50%) to confirm your booking or pay in full upfront.",
  },
  {
    q: "Are your drivers experienced with Umrah routes?",
    a: "Yes! All our drivers are licensed professionals with extensive experience in Umrah and Hajj transport. They know all routes between Jeddah, Makkah, and Madinah.",
  },
  {
    q: "Can I book a vehicle for a city tour?",
    a: "Absolutely! We offer ziarah tours covering important Islamic historical sites in Makkah and Madinah with knowledgeable driver guides.",
  },
  {
    q: "Do you offer child seats?",
    a: "Yes, child seats are available upon request at no additional cost. Please mention it when booking.",
  },
  {
    q: "What if my flight is delayed?",
    a: "We monitor flight arrivals and adjust pickup times accordingly. Our drivers will wait for you at no extra charge for flight delays.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-accent tracking-widest uppercase">FAQ</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mt-3">
            Frequently Asked <span className="text-gradient-gold">Questions</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-card rounded-xl border border-border px-6"
              >
                <AccordionTrigger className="text-left font-serif font-semibold text-foreground hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
