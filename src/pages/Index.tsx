import { Helmet } from "react-helmet-async";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Demo from "@/components/landing/Demo";
import UseCases from "@/components/landing/UseCases";
import Architecture from "@/components/landing/Architecture";
import Pricing from "@/components/landing/Pricing";
import BlogSection from "@/components/landing/BlogSection";
import Waitlist from "@/components/landing/Waitlist";
import Footer from "@/components/landing/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "ApeironAI",
  "applicationCategory": "Scientific Research Tool",
  "operatingSystem": "Web",
  "description": "ApeironAI is an advanced AI research platform designed to accelerate scientific discovery through hypothesis generation, knowledge synthesis, and AI-powered simulations.",
  "url": "https://ai.cherazen.com",
  "author": { "@type": "Organization", "name": "Cherazen Inc.", "url": "https://www.cherazen.com" },
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
};

const Index = () => (
  <div className="min-h-screen bg-background">
    <Helmet>
      <title>ApeironAI – AI Scientific Discovery Engine | AI Research Platform</title>
      <meta name="description" content="ApeironAI is an advanced AI research platform designed to accelerate scientific discovery through hypothesis generation, knowledge synthesis, and AI-powered simulations." />
      <meta name="keywords" content="AI scientific discovery, AI research assistant, AI hypothesis generator, AI research platform, scientific discovery AI, AI for scientific research, AI research tools, AI simulation platform, AI research copilot, AI powered research, AI knowledge synthesis, AI research engine, AI scientific modeling, AI research assistant platform, AI powered hypothesis generation, AI scientific innovation tools" />
      <link rel="canonical" href="https://ai.cherazen.com" />
      <meta property="og:title" content="ApeironAI – AI Scientific Discovery Engine" />
      <meta property="og:description" content="Accelerate scientific discovery with AI-powered hypothesis generation, reality simulation, and cross-paper knowledge synthesis." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://ai.cherazen.com" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="ApeironAI – AI Scientific Discovery Engine" />
      <meta name="twitter:description" content="Accelerate scientific discovery with AI-powered hypothesis generation, reality simulation, and cross-paper knowledge synthesis." />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
    <Navbar />
    <Hero />
    <Features />
    <Demo />
    <UseCases />
    <Architecture />
    <Pricing />
    <BlogSection />
    <Waitlist />
    <Footer />
  </div>
);

export default Index;
