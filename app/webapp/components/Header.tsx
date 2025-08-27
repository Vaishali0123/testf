import React from "react";
import { Bs0Circle } from "react-icons/bs";

const Header = () => {
  return (
    <div className="h-[60px]  ">
      <div className="h-[100%] w-full flex gap-4 py-1 justify-center items-center">
        <div className="h-[50px] w-[50px] rounded-full border border-[#373737]"></div>
        <div className="h-[50px] w-[50px] rounded-full border border-[#373737]"></div>
        <div className="h-[50px] w-[50px] rounded-full border border-[#373737]"></div>

        <div className="h-[50px] w-[50px] rounded-full border border-[#373737]"></div>
        <div className="h-[50px] w-[50px] rounded-full border border-[#373737]"></div>
        <div className="w-[1px] h-full bg-[#626262]"></div>
        <div className="px-4 flex flex-col items-center">
          <div className="text-[#959595]">Willowave</div>
          <div className="text-[#626262] text-[12px]">@Webivus</div>
        </div>
        <div className="w-[1px] h-full bg-[#626262]"></div>
        <div className=" flex flex-col items-center gap-2">
          <Bs0Circle />
          <div className="text-[#626262] text-[12px]">@Webivus</div>
        </div>
        <div className=" flex flex-col items-center gap-2">
          <Bs0Circle />
          <div className="text-[#626262] text-[12px]">@Webivus</div>
        </div>
        <div className="w-[1px] h-full bg-[#626262]"></div>
        <div className=" flex flex-col items-center gap-2">
          <Bs0Circle />
          <div className="text-[#626262] text-[12px]">@Webivus</div>
        </div>
        <div className=" flex flex-col items-center gap-2">
          <Bs0Circle />
          <div className="text-[#626262] text-[12px]">@Webivus</div>
        </div>
      </div>
      <div className="h-[1px] bg-[radial-gradient(circle_at_center,_#959595,_#1e1e1e)]"></div>
    </div>
  );
};

export default Header;
