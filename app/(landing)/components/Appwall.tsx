"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiExternalLink } from "react-icons/fi";
import { PiMonitor } from "react-icons/pi";
import { FaAnglesLeft } from "react-icons/fa6";
import { GoWorkflow } from "react-icons/go";
import { CgWebsite } from "react-icons/cg";
import { IoArrowForward } from "react-icons/io5";
import Link from "next/link";
import Bg from "../../../public/flowbg.png";

const Appwall = () => {
  const path = usePathname();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dragRef = useRef<HTMLDivElement | null>(null);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);

    if (position.x === 0 && position.y === 0) {
      const rect = dragRef.current?.getBoundingClientRect();
      const containerRect =
        dragRef.current?.parentElement?.getBoundingClientRect();

      if (rect && containerRect) {
        const actualX = rect.left - containerRect.left;
        const actualY = rect.top - containerRect.top;

        setPosition({ x: actualX, y: actualY });

        offset.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }
    } else {
      offset.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    // <div className="bg-[#111111] bg-gradient-to-br border from-[#ffffff0f] via-black to-[#ffffff0f] h-[calc(100vh-35px)] text-[#fff] overflow-hidden">
    //   {/* Top Navigation Bar */}
    //   <div className="h-[20px] mt-2 w-full hidden  sm:flex gap-2 sm:gap-4 justify-center items-center mb-0.5 px-2">
    //     <Link
    //       href="/landing"
    //       className="text-[#626262] text-[10px] sm:text-[12px]"
    //     >
    //       intro
    //     </Link>
    //     <div className="w-[0.5px] h-full bg-[#626262]"></div>
    //     <Link
    //       href="/app"
    //       className="text-[#ffffff] pb-2 text-[10px] sm:text-[12px]"
    //     >
    //       Webivus
    //     </Link>
    //     <div className="w-[0.5px] h-full bg-[#626262]"></div>
    //     <div className="text-[#626262] text-[10px] sm:text-[12px]">Beta</div>
    //   </div>
    //   <div className="h-[1px] bg-[radial-gradient(circle_at_center,_#959595,_#1e1e1e)]"></div>

    //   {/* Header Section */}
    //   <div className="h-auto lg:h-[60px] hidden sm:block">
    //     <div className="h-full w-full flex flex-col lg:flex-row px-2 sm:px-4 lg:px-6 gap-2 lg:gap-4 py-2 lg:py-1 justify-center items-center">
    //       {/* Left Section - Plus Button */}
    //       <div className="w-full lg:w-[40%] flex items-center justify-center lg:justify-end gap-2 sm:gap-4">
    //         <button
    //           className="lg:hidden text-white"
    //           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
    //         >
    //           <HiMenu size={24} />
    //         </button>
    //         <div className="h-[40px] w-[40px] sm:h-[50px] sm:w-[50px] rounded-full border flex justify-center items-center text-[20px] sm:text-[25px] bg-white text-[#000] border-[#373737]">
    //           +
    //         </div>
    //       </div>

    //       {/* Divider - Hidden on mobile */}
    //       <div className="hidden lg:block h-[100%] w-[0.8px] bg-[radial-gradient(circle_at_center,_#959595,_#1e1e1e)]"></div>

    //       {/* Center Section - Site Name */}
    //       <div className="px-2 sm:px-4 w-full lg:w-[10%] flex flex-col items-center text-center">
    //         <div className="text-[#959595] text-[12px] sm:text-[14px]">
    //           you site name
    //         </div>
    //         <div className="text-[#626262] text-[10px] sm:text-[12px]">
    //           @Webivus
    //         </div>
    //       </div>

    //       {/* Divider - Hidden on mobile */}
    //       <div className="hidden lg:block h-[100%] w-[0.8px] bg-[radial-gradient(circle_at_center,_#959595,_#1e1e1e)]"></div>

    //       {/* Right Section - Device Toggles & Buttons */}
    //       <div className="w-full lg:w-[40%] flex flex-col sm:flex-row items-center justify-center lg:justify-between gap-3 sm:gap-4">
    //         {/* Device Toggle Buttons */}
    //         <div className="flex items-center gap-3 sm:gap-5 justify-center">
    //           <div className="flex items-center gap-1 sm:gap-2 border border-[#888] p-1 rounded-full">
    //             <button className="p-1.5 sm:p-2 rounded-full text-white">
    //               <FaMobileAlt size={14} className="sm:w-[17px] sm:h-[17px]" />
    //             </button>
    //             <button className="p-1.5 sm:p-2 rounded-full text-white">
    //               <IoIosTabletPortrait
    //                 size={16}
    //                 className="sm:w-[20px] sm:h-[20px]"
    //               />
    //             </button>
    //             <button className="p-1.5 sm:p-2 rounded-full bg-white text-black">
    //               <IoMdLaptop size={16} className="sm:w-[20px] sm:h-[20px]" />
    //             </button>
    //           </div>
    //           <div className="hidden sm:block h-[30px] w-[0.8px] bg-[radial-gradient(circle_at_center,_#959595,_#1e1e1e)]"></div>
    //         </div>

    //         {/* Action Buttons */}
    //         <div className="flex items-center gap-3  sm:gap-5 justify-center">
    //           <button className="text-[12px] sm:text-[14px] text-[#999] hover:text-white">
    //             Save Draft
    //           </button>
    //           <button className="text-black font-semibold hover:bg-slate-200 bg-white h-[30px] px-3 sm:px-4 text-[11px] sm:text-[12px] rounded">
    //             Publish
    //           </button>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="h-[1px] bg-[radial-gradient(circle_at_center,_#959595,_#1e1e1e)]"></div>
    //   </div>

    //   {/* Main Content Area */}
    //   <div className="flex gap-0 sm:gap-2 h-[calc(100%-80px)] lg:h-[calc(100%-60px)] pt-2 relative">
    //     {/* Sidebar - Desktop & Mobile Drawer */}
    //     <div
    //       className={`
    //         fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto
    //         w-[200px] sm:w-[80px] lg:w-[80px]
    //         bg-[#111111] lg:bg-transparent
    //         transform transition-transform duration-300 ease-in-out
    //         ${
    //           isSidebarOpen
    //             ? "translate-x-0"
    //             : "-translate-x-full lg:translate-x-0"
    //         }
    //         h-[calc(100vh-150px)] flex flex-col justify-between p-2
    //       `}
    //     >
    //       {/* Navigation Links */}
    //       <div className="h-auto lg:h-[50%] rounded-full border p-3 sm:p-2 w-full flex flex-col items-center justify-evenly gap-4 lg:gap-0">
    //         <Link
    //           href="/webapp"
    //           prefetch={false}
    //           className="flex flex-row lg:flex-col gap-3 lg:gap-2 items-center w-full lg:w-auto px-4 lg:px-0"
    //           onClick={() => setIsSidebarOpen(false)}
    //         >
    //           <Image src={home} alt="home" width={20} height={24} />
    //           <div
    //             className={`text-[12px] lg:text-[10px] ${
    //               path === "/webapp" ? "text-[#fff]" : "text-[#909090]"
    //             }`}
    //           >
    //             Workspace
    //           </div>
    //         </Link>
    //         <Link
    //           href="/webapp/projects"
    //           className="flex flex-row lg:flex-col gap-3 lg:gap-2 items-center w-full lg:w-auto px-4 lg:px-0"
    //           onClick={() => setIsSidebarOpen(false)}
    //         >
    //           <Image src={dash} alt="dash" width={20} height={24} />
    //           <div
    //             className={`text-[12px] lg:text-[10px] text-left lg:text-center ${
    //               path.startsWith("/webapp/projects")
    //                 ? "text-[#fff]"
    //                 : "text-[#909090]"
    //             }`}
    //           >
    //             My Sites
    //           </div>
    //         </Link>
    //         <Link
    //           href="/webapp/dashboard"
    //           className="flex flex-row lg:flex-col gap-3 lg:gap-2 items-center w-full lg:w-auto px-4 lg:px-0"
    //           onClick={() => setIsSidebarOpen(false)}
    //         >
    //           <Image src={Project} alt="Project" width={20} height={24} />
    //           <div
    //             className={`text-[12px] lg:text-[10px] ${
    //               path.startsWith("/webapp/dashboard")
    //                 ? "text-[#fff]"
    //                 : "text-[#909090]"
    //             }`}
    //           >
    //             Dashboard
    //           </div>
    //         </Link>
    //         <Link
    //           href="/webapp/settings"
    //           className="flex flex-row lg:flex-col gap-3 lg:gap-2 items-center w-full lg:w-auto px-4 lg:px-0"
    //           onClick={() => setIsSidebarOpen(false)}
    //         >
    //           <Image src={Setting} alt="setting" width={20} height={24} />
    //           <div
    //             className={`text-[12px] lg:text-[10px] ${
    //               path.startsWith("/webapp/settings")
    //                 ? "text-[#fff]"
    //                 : "text-[#909090]"
    //             }`}
    //           >
    //             Settings
    //           </div>
    //         </Link>
    //       </div>

    //       {/* Bottom Section */}
    //       <div className="p-2 px-2 rounded-full border flex flex-col items-center gap-3 justify-center">
    //         <Link
    //           href="/landing/pricing"
    //           className="p-1 mt-2 flex flex-col items-center gap-2 justify-center"
    //           onClick={() => setIsSidebarOpen(false)}
    //         >
    //           <Image src={Upgrade} alt="pic" width={20} height={20} />
    //           <div className="text-[12px] font-bold text-[#CD3FB5]">
    //             Upgrade
    //           </div>
    //         </Link>
    //         <div className="w-[45px] h-[45px] rounded-full flex items-center justify-center text-white font-bold bg-purple-600">
    //           V
    //         </div>
    //       </div>
    //     </div>

    //   </div>
    // </div>
    <div
      className={`duration-200 border-transparent gap-2 flex-col sm:flex-row-reverse p-2 flex  w-full items-center justify-center h-full `}
    >
      <div className="h-[40px] sm:hidden w-full bg-[#2C2D30] flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <FaAnglesLeft />
          <div className="text-[12px] bg-[#1C1C1C] border-2 border-[#1C1C1C] flex items-center rounded-full">
            <div className="px-2 py-1 flex gap-2 items-center bg-white text-black rounded-full">
              <GoWorkflow />
              <div> Workflow </div>
            </div>
            <div className="px-2 py-1 flex gap-2 items-center rounded-full">
              <CgWebsite />
              Website
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-[14px] font-bold">
            <PiMonitor />
          </div>
          <FiExternalLink />
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${Bg.src})`,
          backgroundPosition: "top",
          backgroundRepeat: "repeat",
        }}
        className={`
            h-full w-full border border-[#ffffff10]  bg-contain bg-[#2c2d3061] sm:flex flex-col rounded-2xl items-center justify-center overflow-hidden`}
      >
        <div className="h-[40px] w-full bg-[#2C2D30] hidden sm:flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <FaAnglesLeft />
            <div className="text-[12px] bg-[#1C1C1C] border-2 border-[#1C1C1C] flex items-center rounded-full">
              <div className="px-2 py-1 flex gap-2 items-center bg-white text-black rounded-full">
                <GoWorkflow />
                <div> Workflow </div>
              </div>
              <div className="px-2 py-1 flex gap-2 items-center rounded-full">
                <CgWebsite />
                Website
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[14px] font-bold">
              <PiMonitor />
            </div>
            <FiExternalLink />
          </div>
        </div>

        <div className="w-full h-full  flex items-center justify-center flex-col">
          {/* Overlay for mobile sidebar */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}

          {/* Main Canvas Area */}
          <div className="w-full  flex-col scale-90 sm:scale-95 lg:scale-90 relative flex items-center justify-center overflow-hidden">
            <div className="w-[95%] sm:w-[80%] lg:w-[60%] min-w-[280px] sm:min-w-[400px] flex flex-col items-center justify-center">
              {/* Draggable Hero Content */}

              <style jsx>{`
                @keyframes rotate {
                  0% {
                    transform: rotate(0deg);
                  }
                  100% {
                    transform: rotate(360deg);
                  }
                }
                .animate-border {
                  animation: rotate 15s linear infinite;
                }
              `}</style>

              <div className="relative w-fit overflow-hidden hover:scale-105 duration-500 hover:shadow-2xl hover:shadow-[#CD3FB5]  rounded-full text-center text-[10px] sm:text-[12px] lg:text-[14px]">
                {/* Animated border gradient */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#fff] via-[#626262] to-[#fff] blur-xl opacity-75 animate-border"></div>

                {/* Inner background to create border effect */}
                <div className="absolute inset-[1px] bg-[#222222] rounded-full"></div>

                {/* Content */}
                <div className="relative text-[#fff] p-2 px-3 sm:px-4 font-semibold">
                  Webivus – A WP Co-pilot {">"}
                </div>
              </div>
              <div className="  w-full h-[230px]"></div>
              <div
                ref={dragRef}
                onMouseDown={handleMouseDown}
                className={`absolute w-[95%]  h-[200px]  sm:w-[80%] min-w-[280px]  sm:min-w-[400px] flex flex-col items-center z-50 select-none px-4 ${
                  isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
                style={{
                  left:
                    position.x === 0 && position.y === 0
                      ? "50%"
                      : `${position.x}px`,
                  top:
                    position.x === 0 && position.y === 0
                      ? "50%"
                      : `${position.y}px`,
                  transform:
                    position.x === 0 && position.y === 0
                      ? "translate(-50%, -50%)"
                      : "none",
                }}
              >
                <div className="text-[#fff] relative text-[24px] border-2 border-dashed border-blue-600 py-4 sm:text-[36px] lg:text-[50px] w-[100%]  font-medium text-center mt-2 sm:mt-4 leading-tight">
                  <div className="absolute text-[16px] px-4 p-0.5 -top-8 bg-blue-600 text-white rounded-full ">
                    h1
                  </div>
                  <div className="absolute text-[16px] px-2 -right-12 p-0.5 -top-3 bg-white border-2 border-blue-600 text-blue-600  rounded-l-xl rounded-r-full ">
                    {">"}
                  </div>
                  <div className="absolute text-[16px]  -right-2 p-1 -top-1 bg-white border-2 border-blue-600 text-blue-600  rounded-sm "></div>
                  <div className="absolute text-[16px]  -left-2 p-1 -top-1 bg-white border-2 border-blue-600 text-blue-600  rounded-sm "></div>
                  <div className="absolute text-[16px]  -left-2 p-1 -bottom-1 bg-white border-2 border-blue-600 text-blue-600  rounded-sm "></div>
                  <div className="absolute text-[16px]  -right-2 p-1 -bottom-1 bg-white border-2 border-blue-600 text-blue-600  rounded-sm "></div>
                  A New Era of WordPress Management with Webivus AI
                </div>
              </div>

              <div className="text-[#626262]  w-fit text-center text-[12px] sm:text-[14px] lg:text-[16px] mt-2 sm:mt-4">
                Webivus is your multi-Agents AI partner that manages, secures,
                and optimizes WordPress sites — so you spend less time fixing
                and more time building.
              </div>
              <Link
                href={"../auth"}
                className="text-[#2a2a2a] w-fit  gap-2 hover:scale-105 duration-1000 flex items-center group  px-4 sm:px-6 py-2 mt-3 sm:mt-4 h-[35px] sm:h-[40px] rounded-full border border-[#373737] bg-[#fff] text-center text-[12px] sm:text-[14px] lg:text-[16px] cursor-pointer hover:bg-gray-100 transition-colors"
              >
                Get Started{" "}
                <IoArrowForward className="-rotate-[30deg] group-hover:rotate-[0deg] duration-100" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appwall;
