import React from "react";
import AnimatedOrbLogo from "./app/components/AnimatedOrbLogo";
import Background from "./app/components/Background";

const page = () => {
  return (
    <div className="flex w-full border p-2 items-center justify-center h-full relative">
      <Background />
      <div className="w-[40%] flex flex-col items-center z-10">
        <div className="text-[#fff] text-[40px] font-bold">
          Start <span className="text-[#373737]">out</span> without a{" "}
          <span className="text-[#373737]">doubt</span>
        </div>
        <div className="text-[#626262] text-center text-[16px]">
          Go further than the speed of thought. STUDIO AI reads and understands
          your designs, and with nothing more than a single line of feedback,
          perform complex actions autonomously.
        </div>
        <div className="text-[#626262] gap-2 flex items-center p-2 mt-4 h-[40px] w-[50%] rounded-full border border-[#373737] bg-[#000] text-center text-[16px]">
          {/* <AnimatedOrbLogo /> */}
          <div className="flex items-center gap-2 w-full">
            <div className="w-[30px] h-[30px] rounded-full bg-white"> </div>
            <input
              placeholder="Enter your email"
              className="text-[#fff] outline-none text-[14px] bg-[#000] h-full"
            />
          </div>
          <div className="w-[30px] h-full rounded-full bg-white"> </div>
        </div>
      </div>
    </div>
  );
};

export default page;
