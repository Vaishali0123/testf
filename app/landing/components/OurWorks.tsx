import React from "react";

const OurWorks = () => {
  return (
    <div className="h-full w-full flex flex-col scale-90 gap-4 relative items-center">
      <div className="w-full neon-heading">Our Works</div>
      <div className="w-[200px] absolute h-[200px] animate-pulse top-[50%]  blur-2xl bg-[#F94CFF]"></div>
      <div className="w-full items-center justify-center flex flex-wrap gap-4">
        <div className="w-[400px] h-[300px] bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#737373] border"></div>
        <div className="w-[400px] h-[300px] bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#737373] border"></div>
        <div className="w-[400px] h-[300px] bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#737373] border"></div>
        <div className="w-[400px] h-[300px] bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#737373] border"></div>
      </div>
    </div>
  );
};

export default OurWorks;
