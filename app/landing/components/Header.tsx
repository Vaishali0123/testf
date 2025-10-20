"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { IoPricetagsOutline } from "react-icons/io5";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import Logo from "./Logo";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    interface MousePosition {
      x: number;
      y: number;
    }

    const handleMouseMove = (e: React.MouseEvent | MouseEvent): void => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 w-full z-50 flex justify-between items-center py-4 transition-all duration-500 ${
        isScrolled
          ? "bg-[#fff3] backdrop-blur-xl shadow-2xl scale-95 top-0  md:top-4 rounded-3xl px-2 sm:px-6 lg:px-10"
          : "bg-transparent px-4 sm:px-6 lg:px-10"
      }`}
    >
      <Link href={"/"} className="flex items-center gap-2">
        {/* <Image src="/logo.png" alt="logo" width={50} height={50} /> */}
        <div className="w-[50px] h-[50px] rounded-full  hover:rotate-12 transition-transform duration-300">
          <Logo />
        </div>
        <div className="font-semibold">Webivus</div>
      </Link>
      <div className="flex items-center gap-2">
        {/* <Link
          href={"/landing/feature"}
          className="text-[14px] flex gap-2 px-2 py-1 rounded-full items-center cursor-pointer"
        >
          <MdOutlineFeaturedPlayList />
          Features
        </Link>
        <Link
          href={"/landing/pricing"}
          className="text-[14px] flex gap-2 px-2 py-1 rounded-full items-center cursor-pointer"
        >
          <IoPricetagsOutline />
          Pricing
        </Link> */}
        <div className="flex text-[12px] gap-1 p-1 bg-[#35353544] border rounded-full">
          <div className="relative inline-block text-left">
            {/* Dropdown button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="border px-4 py-2 rounded-full bg-[#2C2C2C] text-white flex items-center gap-1 hover:bg-white/30"
            >
              Resources
              <svg
                className={`w-4 h-4 transition-transform ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown menu */}
            {isOpen && (
              <div className="absolute mt-2 w-56 rounded-xl bg-black text-white shadow-lg ring-1 ring-white/10 p-3 space-y-2 z-50">
                <Link
                  href="landing/blog"
                  className="block px-3 py-2 rounded-md hover:bg-white/10 text-white/10"
                >
                  Blog
                </Link>
                <Link
                  href="#"
                  className="flex items-center justify-between px-3 py-2 rounded-md text-white/10 hover:bg-white/10"
                >
                  Report Link bug
                  <FiExternalLink className="w-4 h-4" />
                </Link>
                <Link
                  href="#"
                  className="flex items-center justify-between px-3 py-2 rounded-md text-white/10 hover:bg-white/10"
                >
                  Suggest an idea
                  <FiExternalLink className="w-4 h-4" />
                </Link>
                <Link
                  href="landing/support"
                  className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-white/10"
                >
                  Support
                  <FiExternalLink className="w-4 h-4" />
                </Link>
                <Link
                  href="#"
                  className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-white/10"
                >
                  Discord community
                  <FiExternalLink className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          <Link
            href={"../auth"}
            className="px-4 rounded-full cursor-pointer text-[#000] py-2 bg-white border"
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
