"use client";
import Image from "next/image";
import React from "react";

const AnimatedOrbLogo = () => {
  return (
    <div className="flex items-center relative w-[40px] h-[40px] justify-center ">
      {/* Outer glow ring */}
      <div className="absolute inset-0 w-[100%] h-[100%] rounded-full animate-spin-slow">
        <div className="w-full h-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 opacity-30 blur-xl animate-pulse"></div>
      </div>

      {/* Main orb container */}
      <div className="relative w-[100%] h-[100%] rounded-full overflow-hidden animate-float">
        <Image src="/Logo.png" alt="Orb" width={100} height={100} />
        {/* Background gradient */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-white to-purple-900 rounded-full"></div> */}

        {/* <div className="absolute inset-4 rounded-full overflow-hidden animate-spin-reverse">
          <div className="w-full h-full bg-[#000] opacity-80 rounded-full transform rotate-45"></div>
        </div> */}
        {/* Diagonal light streak */}
        {/* <div className="absolute top-8 left-8 right-8 bottom-8 rounded-full overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-8 bg-white opacity-90 blur-sm transform -rotate-45 animate-shimmer"></div>
        </div> */}

        {/* Inner reflective surface */}
        {/* <div className="absolute inset-6 rounded-full bg-gradient-to-br from-white/20 via-transparent to-purple-500/30 animate-pulse-slow"></div> */}

        {/* Top highlight */}
        {/* <div className="absolute top-6 left-1/3 w-16 h-8 bg-white/40 rounded-full blur-md"></div> */}

        {/* Outer ring border */}
        {/* <div className="absolute inset-0 rounded-full border-2 border-pink-500/50 animate-pulse"></div> */}
      </div>

      {/* Additional outer glow effects */}
      <div className="absolute inset-0 w-64 h-64 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 blur-2xl animate-pulse-alt"></div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.02);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes shimmer {
          0%,
          100% {
            opacity: 0.9;
            transform: translateX(-20px) translateY(-20px) rotate(-45deg);
          }
          50% {
            opacity: 0.6;
            transform: translateX(20px) translateY(20px) rotate(-45deg);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes pulse-alt {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.1);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 6s linear infinite;
        }

        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-alt {
          animation: pulse-alt 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AnimatedOrbLogo;
