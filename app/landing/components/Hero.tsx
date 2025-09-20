import React from "react";
import Appwall from "./Appwall";
import Image from "next/image";
import Tag from "../../../public/tag.svg";

const Hero = () => {
  return (
    <div className="h-screen scale-95 ">
      <div className="h-[1px] w-[60%] bg-[radial-gradient(circle_at_center,_#959595,_#1e1e1e)]"></div>
      <Appwall />
      <Image src={Tag} alt="tag" width={100} height={100} className="mt-10" />
    </div>
  );
};

export default Hero;
