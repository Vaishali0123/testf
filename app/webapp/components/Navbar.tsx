"use client";
import React, { useEffect, useState, useRef, useContext } from "react";
import { usePathname } from "next/navigation";
import { RiChat1Line } from "react-icons/ri";
import { MdOutlineDashboardCustomize, MdOutlinePayment } from "react-icons/md";
import { LuBadgeHelp } from "react-icons/lu";
import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";
import { GuideContext } from "../contexts/GuideContext";

const Navbar = () => {
  const path = usePathname();
  const [initial, setInitial] = useState<string>("");
  const [siteId, setSiteId] = useState<string | null>(null);
  const chatIconRef = useRef<HTMLAnchorElement>(null);

  // Safely get guide context (may not exist if Navbar is used outside GuideProvider)
  const guideContext = useContext(GuideContext);
  const contextChatRef = guideContext?.chatIconRef;

  // Connect local ref to context (only if context exists)
  useEffect(() => {
    if (contextChatRef && chatIconRef.current) {
      contextChatRef.current = chatIconRef.current;
    }
  }, [contextChatRef]);

  useEffect(() => {
    // Only access sessionStorage on client side
    if (typeof window !== "undefined") {
      setSiteId(sessionStorage.getItem("siteId"));
      const email = sessionStorage.getItem("email");
      if (email) {
        setInitial(email.charAt(0).toUpperCase());
      }
    }
  }, []);

  const navItems = [
    {
      icon: <RiChat1Line className="text-[28px] " />,
      label: "Chat",
      link: "/webapp",
    },
    {
      icon: <MdOutlineDashboardCustomize className="text-[28px]" />,
      label: "Dashboard",
      link: "/webapp/dashboard",
    },
    // {
    //   icon: <IoCardOutline className="text-[28px]"    />,
    //   label: "Payments",
    //   link: "/",
    // },
  ];

  const bottomItems = [
    { icon: <LuBadgeHelp className="text-[28px]" />, label: "Help" },
  ];

  return (
    <div className="w-[50px] text-[10px] pn:max-sm:self-center   pn:max-sm:absolute pn:max-sm:bottom-0 pn:max-sm:z-10 pn:max-sm:bg-white/10 pn:max-sm:backdrop-blur  pn:max-sm:w-[100%] pn:max-sm:h-fit pn:max-sm:flex-row h-[calc(100vh-100px)] flex flex-col pn:max-sm:items-center justify-between  sm:p-2 text-white">
      {/* Top Section */}
      <div className="flex flex-col pn:max-sm:flex-row items-center pn:max-sm:justify-center pn:max-sm:px-4 gap-4">
        {navItems.map((item, idx) =>
          !siteId && item?.label === "Dashboard" ? null : (
            <Link
              href={item.link}
              key={idx}
              ref={item.label === "Chat" ? chatIconRef : null}
              className="relative group text-[#767676]  hover:text-white duration-300   flex flex-col items-center cursor-pointer"
            >
              {item.icon}
              <div className="mt-2  text-[10px] text-[#767676] hover:text-white duration-300 ">
                {item.label}
              </div>
              {/* Tooltip */}
              <div className="absolute left-[60px] top-1/2 -translate-y-1/2 bg-[#222] text-[#767676] text-[14px] px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 whitespace-nowrap">
                {item.label}
              </div>
            </Link>
          )
        )}
      </div>
      {/* Bottom Section */}
      <div className="flex flex-col pn:max-sm:hidden items-center gap-4">
        {bottomItems.map((item, idx) => (
          <div
            key={idx}
            className="relative group flex flex-col items-center cursor-pointer"
          >
            {item.icon}
            <div className="mt-2 text-[10px]">{item.label}</div>
            <div className="absolute left-[60px] top-1/2 -translate-y-1/2 bg-[#222] text-white text-[12px] px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 whitespace-nowrap">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
