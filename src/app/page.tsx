import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Marquee from "@/components/Marquee";
import WhyChooseUs from "@/components/WhyChooseUs";
import SocialProof from "@/components/SocialProof";
import Tribe from "@/components/Tribe";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import StackItem from "@/components/ui/StackItem";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Sticky stacking panels: each section pins to the top and the next
          scrolls up over it (desktop). Normal flow on mobile. */}
      <main className="relative bg-black">
        <StackItem>
          <Hero />
        </StackItem>
        {/* Services drives its own horizontal-scroll parallax (self-pins),
            so it sits outside the sticky stacking flow. */}
        <Services />
        {/* Full-width marquee strip between Services and The BioWell Principle */}
        <Marquee />
        <StackItem>
          <Tribe />
        </StackItem>
        <StackItem>
          <WhyChooseUs />
        </StackItem>
        <StackItem>
          <SocialProof />
        </StackItem>
        <StackItem>
          <FinalCTA />
        </StackItem>
      </main>
      <Footer />
    </>
  );
}
