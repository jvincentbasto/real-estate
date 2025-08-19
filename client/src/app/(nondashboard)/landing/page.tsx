import React from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import DiscoverSection from "./DiscoverSection";
import CallToActionSection from "./CallToActionSection";
import FooterSection from "./FooterSection";

const Landing = () => {
  return (
    <div className="min-w-[350px]">
      <HeroSection />
      <DiscoverSection />
      <FeaturesSection />
      <CallToActionSection />
      <FooterSection />
    </div>
  );
};

export default Landing;
