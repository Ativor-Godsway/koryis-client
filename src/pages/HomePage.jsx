import React from "react";
import Hero from "../components/HompePageSections/Hero";
import HowItWorks from "../components/HompePageSections/HowItWorks";
import Dashboards from "../components/HompePageSections/Dashboards";
import WhyIC from "../components/HompePageSections/WhyIC";
import Pricing from "../components/HompePageSections/Pricing";
import Navbar from "../components/HompePageSections/Navbar";
import Topics from "../components/HompePageSections/Topics";
import Footer from "../components/HompePageSections/Footer";
import Faqs from "../components/HompePageSections/Faqs";
import VisionMission from "../components/HompePageSections/Vision";

const HomePage = () => {
  return (
    <div className=" relative font-sans">
      <Navbar />
      <Hero />
      <VisionMission />
      <WhyIC />
      <HowItWorks />
      <Dashboards />
      <Pricing />
      <Faqs />
      <Topics />
      <Footer />
    </div>
  );
};

export default HomePage;
