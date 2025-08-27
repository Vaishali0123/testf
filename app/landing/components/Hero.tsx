"use client";
import React, { useRef, useState } from "react";

const Hero = () => {
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
    <div className="w-full h-full relative">
      {/* Draggable Section */}
      <div
        ref={dragRef}
        onMouseDown={handleMouseDown}
        className={`absolute w-[40%] min-w-[400px] flex flex-col items-center z-50 select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          left:
            position.x === 0 && position.y === 0 ? "50%" : `${position.x}px`,
          top: position.x === 0 && position.y === 0 ? "50%" : `${position.y}px`,
          transform:
            position.x === 0 && position.y === 0
              ? "translate(-50%, -50%)"
              : "none",
        }}
      >
        <div className="text-[#fff] text-[40px] font-bold text-center">
          Start <span className="text-[#373737]">out</span> without a{" "}
          <span className="text-[#373737]">doubt</span>
        </div>
        <div className="text-[#626262] text-center text-[16px] mt-4">
          Go further than the speed of thought. STUDIO AI reads and understands
          your designs, and with nothing more than a single line of feedback,
          perform complex actions autonomously.
        </div>
        <div className="text-[#626262] gap-2 flex items-center p-2 mt-4 h-[40px] w-[50%] min-w-[300px] rounded-full border border-[#373737] bg-[#000] text-center text-[16px]">
          <div className="flex items-center gap-2 w-full">
            <div className="w-[30px] h-[30px] rounded-full bg-white"></div>
            <input
              placeholder="Enter your email"
              className="text-[#fff] outline-none text-[14px] bg-[#000] h-full flex-1"
              onMouseDown={(e) => e.stopPropagation()}
            />
          </div>
          <div className="w-[30px] h-full rounded-full bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
