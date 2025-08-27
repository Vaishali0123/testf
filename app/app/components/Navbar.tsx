import Link from "next/link";
import React from "react";
import { BiHomeAlt2 } from "react-icons/bi";
import { GiUpgrade } from "react-icons/gi";
import { GoProjectSymlink } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="w-[70px] h-[calc(100vh-150px)] flex flex-col justify-between p-2">
      <div className="h-[50%] rounded-full border p-2 w-full flex flex-col items-center justify-evenly">
        <Link
          href="/app"
          prefetch={false}
          className=" flex flex-col gap-2 items-center"
        >
          <BiHomeAlt2 className="w-[25px] h-[25px] text-[#373737]" />
          <div className="text-[10px] text-[#909090]">Home</div>
        </Link>
        <Link
          href="/app/projects"
          className=" flex flex-col gap-2 items-center"
        >
          <GoProjectSymlink className="w-[25px] h-[25px] text-[#373737]" />
          <div className="text-[10px] text-center text-[#909090]">
            My Project
          </div>
        </Link>
        <Link
          href="/app/dashboard"
          className=" flex flex-col gap-2 items-center"
        >
          <MdOutlineSpaceDashboard className="w-[25px] h-[25px] text-[#373737]" />
          <div className="text-[10px] text-[#909090]">Dashboard</div>
        </Link>
        <Link
          href="/app/settings"
          className=" flex flex-col gap-2 items-center"
        >
          <IoSettingsOutline className="w-[25px] h-[25px] text-[#373737]" />
          <div className="text-[10px] text-[#909090]">Setting</div>
        </Link>
      </div>
      <div className="p-2 rounded-full border flex flex-col items-center gap-2 justify-center">
        <div className="w-[45px] h-[45px] flex items-center justify-center rounded-full border">
          <GiUpgrade className="w-[25px] h-[25px] text-[#373737]" />
        </div>
        <div className="w-[45px] h-[45px] rounded-full border text-[#373737]">
          dp
        </div>
      </div>
    </div>
  );
};

export default Navbar;
