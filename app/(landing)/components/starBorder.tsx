// components/star-border.tsx
"use client";
import { ElementType, ComponentPropsWithoutRef } from "react";

interface StarBorderProps<T extends ElementType> {
  as?: T;
  color?: string;
  speed?: string;
  className?: string;
  children: React.ReactNode;
}

export function StarBorder<T extends ElementType = "button">({
  as,
  className = "",
  color,
  speed = "6s",
  children,
  ...props
}: StarBorderProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof StarBorderProps<T>>) {
  const Component = as || "button";
  const defaultColor = color || "hsl(240 10% 3.9%)";

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes star-movement-bottom {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-66.6666%);
          }
        }
        
        @keyframes star-movement-top {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(66.6666%);
          }
        }
        
        .star-border-animate-bottom {
          animation: star-movement-bottom linear infinite;
        }
        
        .star-border-animate-top {
          animation: star-movement-top linear infinite;
        }
      `,
        }}
      />

      <Component
        className={`relative inline-block py-[1px] overflow-hidden rounded-[20px] ${className}`}
        {...props}
      >
        <div
          className="star-border-animate-bottom absolute w-[300%] h-[50%] bottom-[-11px] right-[-250%] rounded-full z-0 opacity-20 dark:opacity-70"
          style={{
            background: `radial-gradient(circle, ${defaultColor}, transparent 10%)`,
            animationDuration: speed,
          }}
        />
        <div
          className="star-border-animate-top absolute w-[300%] h-[50%] top-[-10px] left-[-250%] rounded-full z-0 opacity-20 dark:opacity-70"
          style={{
            background: `radial-gradient(circle, ${defaultColor}, transparent 10%)`,
            animationDuration: speed,
          }}
        />
        <div className="relative z-10 border text-center text-base py-4 px-6 rounded-[20px] bg-gradient-to-b from-white/90 to-gray-100/90 border-gray-200/40 dark:from-gray-950 dark:to-gray-900 dark:border-gray-800 text-gray-900 dark:text-gray-100">
          {children}
        </div>
      </Component>
    </>
  );
}


