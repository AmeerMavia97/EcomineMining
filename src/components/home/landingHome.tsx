import React from "react";
import HeroSection from "./HeroSection";
import ServicesSection from "./Service";
import SolutionCard from "../SolarSolutions";
import ModernAboutSegments from "./Segments";
import Shop from "../shop/Product";
import MiningHeroSlider from "../home2/HeroSection";
import Service from "../home2/Service";
import HowItsWork from "../home2/HowItsWork";
import MarqueeSection from "../home2/MarqueeSection";
import AboutUs from "../home2/AboutUs";
import StrategicSection from "../home2/StrategicSection";
import PhotoStrip from "../home2/FollowUs";
import FAQSection from "../home2/FaqSection";
import Testimonials from "../home2/Testimonial";
import HomeContactSection from "../home2/ContactSection";

function LandingHome() {
  return (
    <>
      <div className=" bg-[#101010] overflow-hidden relative px-20">
        <MiningHeroSlider></MiningHeroSlider>
        <Service></Service>
        <HowItsWork></HowItsWork>

      </div>
        <MarqueeSection></MarqueeSection>
      <div className=" bg-[#101010] overflow-hidden relative px-20">
        <AboutUs></AboutUs>
        <StrategicSection></StrategicSection>

        <FAQSection></FAQSection>

        <Testimonials></Testimonials>

        <PhotoStrip />
        <HomeContactSection></HomeContactSection>

        
        {/* <HeroSection />
      <SolutionCard/>
      <ModernAboutSegments/>
      <Shop  /> */}
      </div>
    </>
  );
}

export default LandingHome;
