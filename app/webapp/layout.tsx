"use client";

import Navbar from "../webapp/components/Navbar";
import Header from "../webapp/components/Header";
import Bg from "../../public/bgs.png";
import { usePathname } from "next/navigation";
import { GuideProvider } from "../webapp/contexts/GuideContext";
import GuideManager from "../webapp/components/GuideManager";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // ✅ Correct usage

  return (
    <GuideProvider>
      <div
        style={{
          backgroundImage: `url(${Bg.src})`,
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
        className="bg-[#18191C]  bg-cover min-h-screen text-white"
      >
        <Header />
        <div className="flex pn:max-sm:flex-col gap-2 sm:h-[calc(100%-60px)] sm:pt-2">
          {/* ✅ Hide Navbar only on /webapp route */}
          {pathname == "/webapp/projects" ? null : (
            <div className="pn:max-sm:hidden">
              <Navbar />
            </div>
          )}
          <div className="w-full ">{children}</div>
        </div>
        <GuideManager />
      </div>
    </GuideProvider>
  );
}
