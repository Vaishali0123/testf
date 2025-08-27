"use client";
import React, { useState } from "react";
import Background from "../app/components/Background";

const page = () => {
  const [reload, setReload] = useState(false);
  return (
    <div
      className={`duration-200 flex w-full  items-center justify-center h-full ${
        reload === false ? "border-transparent gap-2" : "border-transparent"
      }`}
    >
      <div
        className={`duration-200 ${
          reload === false
            ? "w-[70%] h-full border  flex  items-center justify-center"
            : "w-[00%] h-full border-transparent  flex items-center justify-center"
        }`}
      ></div>
      <div
        className={`duration-200 relative ${
          reload === false
            ? "flex flex-col w-[30%] border p-2 overflow-hidden  justify-center h-full relative"
            : "flex flex-col  w-full border p-2  items-center justify-center h-full relative"
        }`}
      >
        <Background />
        <div
          className={`${
            reload === false ? "h-[calc(100vh-150px)] w-[100%] " : "hidden"
          }`}
        >
          <div
            className={`duration-1000 px-4 py-2 rounded-2xl border w-fit text-[14px] ${
              reload === false ? "-mt-[0px]" : "-mt-[100px]"
            }`}
          >
            hi webivus this side
          </div>
        </div>
        <div
          className={`duration-200   ${
            reload === false
              ? "w-[100%] flex flex-col items-center hidden scale-0 z-10"
              : "w-[40%] flex flex-col items-center z-10"
          }`}
        >
          <div
            className={`duration-100 ${
              reload === false
                ? "scale-0"
                : "text-[#fff] text-[40px]  text-center font-bold"
            }`}
          >
            Start <span className="text-[#373737]">out</span> without a{" "}
            <span className="text-[#373737]">doubt</span>
          </div>
          <div
            className={`duration-100 ${
              reload === false
                ? "scale-0"
                : "text-[#626262] text-center text-[16px]"
            }`}
          >
            Go further than the speed of thought. STUDIO AI reads and
            understands your designs, and with nothing more than a single line
            of feedback, perform complex actions autonomously.
          </div>
        </div>
        <div
          className={`duration-200 z-10 ${
            reload === false
              ? "text-[#626262] gap-2 flex items-center p-2 mt-4 h-[40px] w-[100%]  rounded-full border border-[#373737]  bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#73737326] text-center text-[16px]"
              : "text-[#626262] gap-2 flex items-center p-2 mt-4 h-[40px] w-[20%] rounded-full border border-[#373737]  bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#73737322] text-center text-[16px]"
          }`}
        >
          {/* <AnimatedOrbLogo /> */}
          <div className="flex items-center gap-2 w-full">
            <div className="w-[30px] h-[30px] rounded-full bg-white"> </div>
            <input
              placeholder="Enter your email"
              className="text-[#fff] outline-none text-[14px] bg-transparent h-full"
            />
          </div>
          <div
            onClick={() => setReload(!reload)}
            className="w-[30px] h-full rounded-full bg-white"
          >
            {" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
