import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Demo from "@/components/landing/Demo";
import UseCases from "@/components/landing/UseCases";
import Architecture from "@/components/landing/Architecture";
import Pricing from "@/components/landing/Pricing";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <Hero />
    <Features />
    <Demo />
    <UseCases />
    <Architecture />
    <Pricing />
    <Footer />
  </div>
);

export default Index;
