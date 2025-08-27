import React from "react";

const Feature = () => {
  return (
    <div className="py-[16px] w-full flex flex-col scale-90  items-center">
      <div className="w-[80%]">
        <div className="h-[1px]  w-[20%] bg-[radial-gradient(circle_at_center,_#959595,_#1e1e1e)] "></div>
        <div className="text-[#959595] leading-10 mt-6 w-full">
          <div className="text-[#959595] w-full text-[40px] font-semibold">
            Features
          </div>
          <div className="text-[#fff] w-full text-[40px] font-semibold">
            that are designed for you.
          </div>
        </div>
        <div className="pt-4 w-[80%]">
          <div className="text-[#959595] w-full text-[16px] ">
            Introducing the freeform Design Editor packed with power beyond your
            imagination, yet feels so incredibly simple to use. Style and effect
            controls are meticulously timed to appear when you need them, right
            where your cursor is. And whenever you are ready, just hit publish
            to turn your site designs into an actual website. No rebuilding, no
            handoffs, no coding.
          </div>
        </div>
        <div className=" w-full p-10 flex items-center flex-col gap-4 justify-center">
          <div className="flex items-center justify-center gap-4  w-full">
            <div className="h-[350px] w-[50%] bg-[#101010] rounded-3xl p-2">
              <div className="h-full w-full border rounded-3xl "></div>
            </div>
            <div className="h-[350px] w-[30%] bg-[#101010] rounded-3xl p-2">
              <div className="h-full w-full border rounded-3xl "></div>
            </div>
            <div className="h-[350px] w-[30%] bg-[#101010] rounded-3xl p-2">
              <div className="h-full w-full border rounded-3xl "></div>
            </div>
          </div>
          <div className="flex flex-row-reverse items-center gap-2 w-full">
            <div className="h-[350px] w-[50%] bg-[#101010] rounded-3xl p-2">
              <div className="h-full w-full border rounded-3xl "></div>
            </div>
            <div className="h-[350px] w-[30%] bg-[#101010] rounded-3xl p-2">
              <div className="h-full w-full border rounded-3xl "></div>
            </div>
            <div className="h-[350px] w-[30%] bg-[#101010] rounded-3xl p-2">
              <div className="h-full w-full border rounded-3xl "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
