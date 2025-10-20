import React from "react";
import Hero from "./components/Hero";
import Feature from "./components/Feature";
import HowItWorks from "./components/HowItWorks";

const page = () => {
  return (
    <div className="">
      <Hero />
      {/* <OurWorks /> */}
      <Feature />
      <HowItWorks />
      {/* <Testimonials />
      <Pricing />
      <FAQ /> */}
    </div>
  );
};

export default page;
