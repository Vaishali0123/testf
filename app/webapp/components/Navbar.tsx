"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiHomeAlt2 } from "react-icons/bi";
import { GiUpgrade } from "react-icons/gi";
import { GoProjectSymlink } from "react-icons/go";
import { IoMdNotifications } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import Setting from "../../../public/setting.svg";
import Project from "../../../public/folder-open.svg";
import dash from "../../../public/category-2.svg";
import home from "../../../public/home.svg";
import Upgrade from "../../../public/Icons.svg";
const Navbar = () => {
  const path = usePathname();
  const [initial, setInitial] = useState<string>("");

  useEffect(() => {
    const email = sessionStorage.getItem("email"); // get email from sessionStorage
    if (email) {
      setInitial(email.charAt(0).toUpperCase()); // take first letter
    }
  }, []);
  return (
    <div className="w-[70px] h-[calc(100vh-150px)] flex flex-col justify-between p-2">
      <div className="h-[50%] rounded-full border p-2 w-full flex flex-col items-center justify-evenly">
        <Link
          href="/webapp"
          prefetch={false}
          className={` flex flex-col gap-2 items-center`}
        >
          {/* <BiHomeAlt2
            className={`w-[25px] ${
              path === "/webapp" ? "text-[#eeeded]" : "text-[#373737]"
            } h-[25px] `}
          /> */}
          <Image src={home} alt="home" width={20} height={24} />
          <div
            className={`text-[10px]  ${
              path === "/webapp" ? "text-[#fff]" : "text-[#909090]"
            }`}
          >
            Workspace
          </div>
        </Link>
        <Link
          href="/webapp/projects"
          className=" flex flex-col gap-2 items-center"
        >
          {/* <GoProjectSymlink
            className={`w-[25px] h-[25px] ${
              path.startsWith("/webapp/projects")
                ? "text-[#eeeded]"
                : "text-[#373737]"
            }`}
          /> */}
          <Image src={dash} alt="dash" width={20} height={24} />
          <div
            className={`text-[10px]  text-center ${
              path.startsWith("/webapp/projects")
                ? "text-[#fff]"
                : "text-[#909090]"
            }`}
          >
            My Projects
          </div>
        </Link>
        <Link
          href="/webapp/dashboard"
          className=" flex flex-col gap-2 items-center"
        >
          {/* <MdOutlineSpaceDashboard
            className={`w-[25px] h-[25px] text-[#373737] ${
              path.startsWith("/webapp/dashboard")
                ? "text-[#eeeded]"
                : "text-[#373737]"
            }`}
          /> */}
          <Image src={Project} alt="Project" width={20} height={24} />
          <div
            className={`text-[10px]   ${
              path.startsWith("/webapp/dashboard")
                ? "text-[#fff]"
                : "text-[#909090]"
            }`}
          >
            Dashboard
          </div>
        </Link>
        <Link
          href="/webapp/settings"
          className=" flex flex-col gap-2 items-center"
        >
          {/* <IoSettingsOutline
            className={`w-[25px] h-[25px] ${
              path.startsWith("/webapp/settings")
                ? "text-[#eeeded]"
                : "text-[#373737]"
            }`}
          /> */}
          <Image src={Setting} alt="setting" width={20} height={24} />
          <div
            className={`text-[10px]  ${
              path.startsWith("/webapp/settings")
                ? "text-[#fff]"
                : "text-[#909090]"
            }`}
          >
            Settings
          </div>
        </Link>
      </div>
      <div className="p-1 px-2  rounded-full border flex flex-col items-center gap-2 justify-center">
        {/* <div className="p-2 flex flex-col items-center ">
          <IoMdNotifications className="w-[25px] h-[25px] text-[#fff]" />
          <div className="text-[12px] text-white/40">Notify</div>
        </div> */}
        <Link
          href="/landing/pricing"
          className={`p-1 mt-2  flex flex-col items-center gap-2 justify-center`}
        >
          {/* <BiHomeAlt2
            className={`w-[25px] ${
              path === "/webapp" ? "text-[#eeeded]" : "text-[#373737]"
            } h-[25px] `}
          /> */}
          <Image src={Upgrade} alt="pic" width={20} height={20} />
          <div className={`text-[12px]  font-bold text-[#CD3FB5]`}>Upgrade</div>
        </Link>
        {/* <div className="w-[45px] h-[45px] rounded-full border text-[#373737]">
          dp
        </div> */}
        <div className="w-[45px] h-[45px] rounded-full flex items-center justify-center text-white font-bold bg-purple-600">
          {initial || "V"}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
