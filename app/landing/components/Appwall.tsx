"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { BiHomeAlt2 } from "react-icons/bi";
import { Bs0Circle } from "react-icons/bs";
import { GiUpgrade } from "react-icons/gi";
import { GoProjectSymlink } from "react-icons/go";
import { IoArrowForward, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";

const Appwall = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement | null>(null);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);

    // If it's the first time dragging (position is 0,0), use the actual DOM position
    if (position.x === 0 && position.y === 0) {
      const rect = dragRef.current?.getBoundingClientRect();
      const containerRect =
        dragRef.current?.parentElement?.getBoundingClientRect();

      if (rect && containerRect) {
        // Calculate position relative to the container
        const actualX = rect.left - containerRect.left;
        const actualY = rect.top - containerRect.top;

        // Update position state to match actual DOM position relative to container
        setPosition({ x: actualX, y: actualY });

        offset.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }
    } else {
      // For subsequent drags, use the position state
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
    <div className="bg-[#111111] bg-gradient-to-br border  from-[#ffffff0f] via-black to-[#ffffff0f]  h-[calc(100vh-35px)] text-[#fff]">
      <div className="h-[20px] mt-2 w-full flex gap-4 justify-center items-center mb-0.5">
        <Link href="/landing" className="text-[#626262] text-[12px]">
          intro
        </Link>
        <div className="w-[0.5px] h-full bg-[#626262]"></div>
        <Link href="/app" className="text-[#ffffff] pb-2 text-[12px]">
          Webivus
        </Link>
        <div className="w-[0.5px] h-full bg-[#626262]"></div>
        <div className="text-[#626262] text-[12px]">Beta</div>
      </div>
      <div className="h-[1px] bg-[radial-gradient(circle_at_center,_#959595,_#1e1e1e)]"></div>
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
      <div className="flex gap-2 h-[calc(100%-60px)] pt-2">
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
        <div className="w-full border scale-90 relative flex items-center justify-center ">
          <div className="w-[40%] h-[40%] absolute animate-bounce bg-[#F94CFF] blur-3xl opacity-20"></div>
          {/* Draggable Section */}
          <div
            ref={dragRef}
            onMouseDown={handleMouseDown}
            className={`absolute w-[40%] min-w-[400px] flex flex-col items-center z-50 select-none ${
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
            <div className="text-[#fff] text-[50px] svg-border font-bold p-10 text-center">
              A New Era Calls for A New CMS Tool.
            </div>
            <div className="text-[#626262] text-center text-[16px] mt-4">
              The new age design tool with{" "}
              <span className="text-[#fff]">WebDesignAI</span> inside.
            </div>
            <div className="text-[#2a2a2a] gap-2 flex items-center px-6 py-2 mt-4 h-[40px]  rounded-full border border-[#373737] bg-[#fff] text-center text-[16px]">
              Join Waitlist <IoArrowForward className="-rotate-[30deg]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appwall;
