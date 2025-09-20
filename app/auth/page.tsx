import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-screen p-6 bg-black">
      <div className="border w-full h-full flex items-center justify-center">
        {/* left */}
        <div className="w-[50%] h-full flex flex-col items-center  justify-center">
          <div className="w-[60%] space-y-4">
            <div className="flex items-center bg-gradient-to-l from-white/10 to-white/0 w-fit py-2 px-4 rounded-full gap-2">
              <Image
                src="/logo.png"
                alt="logo"
                width={30}
                height={30}
                className="-ml-2"
              />{" "}
              From “What now?” to “All set.” In one chat.
            </div>
            <div className="text-3xl">
              Stop Fixing WordPress. Start Commanding It.
            </div>
            <div className="text-white/70">
              Join Early Access and experience the first AI Co-Pilot built for
              WordPress owners, agencies, and creators.
            </div>
            <div className="flex items-center">
              <div className="h-[80px] w-[80px] border-r cursor-pointer  hover:border hover:border-white hover:scale-105 duration-300 hover:bg-white/10"></div>
              <div className="h-[80px] w-[80px] border-r cursor-pointer hover:border hover:border-white hover:scale-105 duration-300 hover:bg-white/10"></div>

              <div className="h-[80px] w-[80px] border-r cursor-pointer hover:border hover:border-white hover:scale-105 duration-300 hover:bg-white/10"></div>
            </div>
          </div>
        </div>
        {/* right  */}
        <div className="w-[60%] h-full flex flex-col relative  items-center justify-center">
          <div className="w-[60%] space-y-4">
            <div className="text-[14px]  flex flex-col gap-2 ">
              <div>Email</div>
              <input
                type="email"
                placeholder="Enter your Email"
                className="w-full h-8 pl-2 bg-[#171717] text-white rounded-md"
              />
            </div>
            <div className="text-[14px]  flex flex-col gap-2">
              <div>Password</div>
              <input
                type="Password"
                placeholder="Enter your password"
                className="w-full h-8 pl-2 bg-[#171717] text-white rounded-md"
              />
              <div className="text-[12px] text-white/70 mt-1">
                Must contain 1 uppercase letter, 1 number, min. 8 characters.
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 right-4">
            <div className="px-6 py-2 hover:scale-105 duration-300 cursor-pointer rounded-full bg-white text-black">
              login
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
