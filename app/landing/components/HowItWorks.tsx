"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FiStar, FiPlay, FiArrowRight, FiMic } from "react-icons/fi";

const HowItWorks: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [starsYellow, setStarsYellow] = useState([false, false]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const toggleStar = (index: number) => {
    setStarsYellow((prev) => {
      const newStars = [...prev];
      newStars[index] = !newStars[index];
      return newStars;
    });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-black"></div>

        <div
          className={`text-center max-w-4xl z-10 transform transition-all duration-1000 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-3xl  font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Be the first to experience Multi AI-powered WordPress
            management.nlock voice AI at scale with an API Call
          </h1>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <div className="flex items-center bg-[#191919] backdrop-blur-sm rounded-full border border-gray-800 px-2 hover:border-purple-500 transition-all duration-300">
              <Image
                src="/logo.png"
                alt="logo"
                width={50}
                height={50}
                className="-ml-2"
              />
              <input
                type="text"
                placeholder="Search the impossible..."
                className="bg-transparent text-white placeholder-gray-500 flex-1 outline-none"
              />
              <button className="ml-3 p-2  rounded-full transition-all duration-300 hover:scale-110">
                <FiMic className="w-6 h-6" />
              </button>
            </div>
            <div className="absolute top-0 right-0 mt-2 mr-4 text-gray-500 hover:text-white transition-all duration-300">
              <FiArrowRight className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-1 h-12 rounded-full"></div>
        </div>
      </section>

      {/* Interactive Stars Section */}
      <section className="min-h-screen flex items-center justify-center px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 to-black"></div>

        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center z-10">
          <div
            className={`transform transition-all duration-1000 delay-300 ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "-translate-x-20 opacity-0"
            }`}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Can you turn these two stars
              <span className="text-yellow-400">yellow</span> for me?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Click on the stars to see the magic happen. Interactive elements
              bring your content to life.
            </p>
          </div>

          <div
            className={`flex flex-col items-center space-y-8 transform transition-all duration-1000 delay-500 ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "translate-x-20 opacity-0"
            }`}
          >
            {[0, 1].map((index) => (
              <button
                key={index}
                onClick={() => toggleStar(index)}
                className="group relative p-4"
              >
                <FiStar
                  className={`w-16 h-16 transition-all duration-500 cursor-pointer transform group-hover:scale-110 ${
                    starsYellow[index]
                      ? "text-yellow-400 fill-yellow-400 rotate-12"
                      : "text-gray-600 hover:text-gray-400"
                  }`}
                />
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-300 ${
                    starsYellow[index] ? "shadow-lg shadow-yellow-400/50" : ""
                  }`}
                ></div>
                <span className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {starsYellow[index] ? "Gold!" : "Click me"}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Final Section */}
      <section className="min-h-screen flex items-center justify-center px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/10 via-purple-900/10 to-black"></div>

        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center z-10">
          <div
            className={`transform transition-all duration-1000 delay-700 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop&auto=format"
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-purple-500/25"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-pink-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                <FiPlay className="w-8 h-8 text-white ml-1" />
              </button>
            </div>
          </div>

          <div
            className={`transform transition-all duration-1000 delay-900 ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "translate-x-20 opacity-0"
            }`}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Finish with the right image and text.
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              The perfect combination of visual storytelling and compelling copy
              creates an unforgettable experience. Every element should work in
              harmony to deliver your message.
            </p>
            <button className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
              Get Started Today
              <FiArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  );
};

export default HowItWorks;
