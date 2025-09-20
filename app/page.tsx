import React from "react";
import AnimatedOrbLogo from "./app/components/AnimatedOrbLogo";
import Background from "./app/components/Background";
import Landing from "./landing/layout";
import Hero from "./landing/components/Hero";
import Feature from "./landing/components/Feature";
import HowItWorks from "./landing/components/HowItWorks";
import Testimonials from "./landing/components/Testimonials";
import Pricing from "./landing/components/Pricing";
import FAQ from "./landing/components/FAQ";
const page = () => {
  return (
    <>
      <Landing>
        {/* <Hero /> */}
        {/* <OurWorks /> */}
        {/* <Feature /> */}
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
      </Landing>
    </>
  );
};

export default page;
