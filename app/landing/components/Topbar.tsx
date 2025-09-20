"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopBar() {
  const pathname = usePathname();

  return (
    <div className="h-[20px] mt-2 w-full flex gap-4 justify-center items-center mb-0.5">
      <Link
        href="/"
        className={`duration-75 ${
          pathname === "/"
            ? "text-[#ffffff] text-[14px]"
            : "text-[#626262] text-[12px]"
        }`}
      >
        intro
      </Link>
      <div className="w-[0.5px] h-full bg-[#626262]"></div>
      <Link
        href="/app"
        className={` ${
          pathname === "/app"
            ? "text-[#ffffff] text-[14px]"
            : "text-[#626262] text-[12px]"
        }`}
      >
        Webivus
      </Link>
      <div className="w-[0.5px] h-full bg-[#626262]"></div>
      <Link
        href="/whats-new"
        className={`duration-75 ${
          pathname === "/whats-new"
            ? "text-[#ffffff] text-[14px]"
            : "text-[#626262] text-[12px]"
        }`}
      >
        Beta
      </Link>
    </div>
  );
}
