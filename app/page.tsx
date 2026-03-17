import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import MobileMenu from "@/components/MobileMenu";
import Hero from "@/components/Hero";
import Couple from "@/components/Couple";
import QuoteBanner from "@/components/QuoteBanner";
import Countdown from "@/components/Countdown";
import Story from "@/components/Story";
import WeddingInfo from "@/components/WeddingInfo";
import Gallery from "@/components/Gallery";
import RSVP from "@/components/RSVP";
import Footer from "@/components/Footer";
import Groomsmen from "@/components/Groomsmen";
import Events from "@/components/Events";
import Testimonials from "@/components/Testimonial";

export default function HomePage() {
  return (
    <>
      <Preloader />
      <MobileMenu>
        <Navbar />
      </MobileMenu>
      <main className=" ">
        <Hero />
        <Couple />
        <QuoteBanner />
        <Countdown />
        <Story />
        <Groomsmen />
        <Events />
        <Testimonials />
        <Gallery />
        <WeddingInfo />
        <RSVP />
      </main>
      

      <Footer />
    </>
  );
}
