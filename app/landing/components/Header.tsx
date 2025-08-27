import Image from "next/image";
import React from "react";

const header = () => {
  return (
    <div className="h-[60px]  flex items-center justify-between px-4 w-full">
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="logo" width={50} height={50} />{" "}
        <div className="font-semibold">Webivus</div>
      </div>
      <div className="flex items-center gap-2">
        <div className="">Share</div>
        <div className="flex text-[12px] gap-1 p-1 bg-[#35353544] border rounded-full">
          <div className="border px-4 py-2 rounded-full bg-[#2C2C2C] hover:scale-105">
            Start with beta
          </div>
          <div className="px-4 rounded-full text-[#000] py-2 bg-white border">
            Join Waitlist
          </div>
        </div>
      </div>
    </div>
  );
};

export default header;
