import React from "react";
import Appwall from "./Appwall";
import Image from "next/image";
import Tag from "../../../public/tag.svg";
import Navbar from "@/app/webapp/components/Navbar";
import Header from "../../webapp/components/Header";
import Bg from "../../../public/bgs.png";

const Hero = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${Bg.src})`,
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
      className="bg-[#18191C] bg-cover scale-95 rounded-2xl border border-white/5 p-2 min-h-screen text-white"
    >
      <Header />
      <div className="flex gap-2 h-[calc(100%-60px)] pt-2">
        <Navbar />
        <div className="w-full">
          <Appwall />
        </div>
      </div>
    </div>
  );
};

export default Hero;
