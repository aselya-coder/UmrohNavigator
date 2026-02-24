import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import HeroAdmin from "./pages/admin/HeroAdmin";
import ServicesAdmin from "./pages/admin/ServicesAdmin";
import FleetAdmin from "./pages/admin/FleetAdmin";
import TestimonialsAdmin from "./pages/admin/TestimonialsAdmin";
import FAQAdmin from "./pages/admin/FAQAdmin";
import BookingAdmin from "./pages/admin/BookingAdmin";
import WhyChooseUsAdmin from "./pages/admin/WhyChooseUsAdmin";
import SettingsAdmin from "./pages/admin/SettingsAdmin";
import AdminLogin from "./pages/admin/AdminLogin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="hero" element={<HeroAdmin />} />
            <Route path="services" element={<ServicesAdmin />} />
            <Route path="fleet" element={<FleetAdmin />} />
            <Route path="testimonials" element={<TestimonialsAdmin />} />
            <Route path="faq" element={<FAQAdmin />} />
            <Route path="booking" element={<BookingAdmin />} />
            <Route path="why-choose-us" element={<WhyChooseUsAdmin />} />
            <Route path="settings" element={<SettingsAdmin />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
