"use client";
import React from "react";

const TypingDots = ({
  size = 8,
  color = "#10B981",
  gap = 4,
  className = "",
}: {
  size?: number;
  color?: string;
  gap?: number;
  className?: string;
}) => {
  return (
    <div
      className={`flex items-center justify-start ${className}`}
      style={{ gap: `${gap}px` }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="animate-typing-bounce rounded-full"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
};

export default TypingDots;
