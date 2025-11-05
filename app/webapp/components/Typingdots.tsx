"use client";
import React from "react";

const TypingDots = ({
  size = 8,
  color = "#888",
  gap = 6,
  className = "",
}: {
  size?: number;
  color?: string;
  gap?: number;
  className?: string;
}) => {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ gap: `${gap}px` }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="animate-typing-pulse rounded-full"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            animationDelay: `${i * 0.15}s`,
            boxShadow: `0 0 ${size / 2}px ${color}40`,
          }}
        />
      ))}
    </div>
  );
};

export default TypingDots;
