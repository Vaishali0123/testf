"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { IoPricetagsOutline } from "react-icons/io5";
import { MdOutlineFeaturedPlayList } from "react-icons/md";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="h-[60px]  flex items-center justify-between px-4 w-full">
      <Link href={"/"} className="flex items-center gap-2">
        <Image src="/logo.png" alt="logo" width={50} height={50} />
        <div className="font-semibold">Webivus</div>
      </Link>
      <div className="flex items-center gap-2">
        <Link
          href={"/landing/features"}
          className="text-[14px] flex gap-2 border dark:border-[#fff] border-[#000] px-2 py-1 rounded-full items-center cursor-pointer"
        >
          <MdOutlineFeaturedPlayList />
          Features
        </Link>
        <Link
          href={"/landing/pricing"}
          className="text-[14px] flex gap-2 border dark:border-[#fff] border-[#000] px-2 py-1 rounded-full items-center cursor-pointer"
        >
          <IoPricetagsOutline />
          Pricing
        </Link>
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
                <a
                  href="#"
                  className="block px-3 py-2 rounded-md hover:bg-white/10"
                >
                  Blog
                </a>
                <a
                  href="#"
                  className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-white/10"
                >
                  Report a bug
                  <FiExternalLink className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-white/10"
                >
                  Suggest an idea
                  <FiExternalLink className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-white/10"
                >
                  Billing support
                  <FiExternalLink className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-white/10"
                >
                  Discord community
                  <FiExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>

          <Link
            href={"../webapp"}
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
