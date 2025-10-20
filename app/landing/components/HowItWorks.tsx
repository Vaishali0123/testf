"use client";
import React, { useState, useEffect } from "react";
import { FiArrowRight, FiPlay, FiStar } from "react-icons/fi";
import Logo from "./Logo";
import { LuSend } from "react-icons/lu";
import Link from "next/link";
// import { Link } from "lucide-react";

const HowItWorks: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [starsYellow, setStarsYellow] = useState([false, false]);
  const [hidden, setHidden] = useState(false);
  const [typedText1, setTypedText1] = useState("");
  const [typedText2, setTypedText2] = useState("");
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(false);

  const fullText1 = "Can you turn these two stars yellow for me?";
  const fullText2 = "Finish with the team collaboration image and text.";

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Typing animation for first h2
  useEffect(() => {
    if (!isLoaded) return;

    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText1.length) {
        setTypedText1(fullText1.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setShowCursor1(false);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [isLoaded]);

  // Typing animation for second h2
  useEffect(() => {
    if (!isLoaded) return;

    const startDelay = setTimeout(() => {
      setShowCursor2(true);
      let index = 0;
      const timer = setInterval(() => {
        if (index <= fullText2.length) {
          setTypedText2(fullText2.slice(0, index));
          index++;
        } else {
          clearInterval(timer);
          setShowCursor2(false);
        }
      }, 50);
    }, fullText1.length * 50 + 1000);

    return () => clearTimeout(startDelay);
  }, [isLoaded]);

  // ✅ Makes all stars yellow
  const makeAllYellow = () => {
    setStarsYellow([true, true]);
  };

  return (
    <div className=" text-white overflow-hidden">
      {/* Hero Section */}
      <div className="flex justify-center">
        <div className="border py-1 px-4 rounded-lg">thinking how it Works</div>
      </div>
      {/* Hero Section */}
      <section className="flex items-center justify-center  p-4 relative">
        <div className="w-full h-[600px]  px-16 rounded-3xl grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center z-10">
          {/* Left Side */}
          <div
            className={`transform transition-all  duration-1000 delay-300 ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "-translate-x-20 opacity-0"
            }`}
          >
            <h2 className="text-3xl bg-[#97108e] relative rounded-r-3xl rounded-bl-3xl w-fit p-4 px-8 font-bold mb-4 sm:mb-6 leading-tight">
              {/* <div className="h-5 w-5 bg-white -top-2 left-0 rotate- bg-[#97108e]  absolute top-2 right-2"></div> */}
              Try this
            </h2>

            <h2 className="text-3xl bg-white/10 border border-white/10 rounded-l-3xl rounded-br-3xl p-4 px-8 font-bold mb-4 sm:mb-6 leading-tight">
              {typedText1.split("yellow").map((part, i) => (
                <React.Fragment key={i}>
                  {part}
                  {i < typedText1.split("yellow").length - 1 && (
                    <span className="text-yellow-400">yellow</span>
                  )}
                </React.Fragment>
              ))}
              <span
                className={`${
                  showCursor1 ? "inline-block animate-pulse" : "hidden"
                }`}
              >
                |
              </span>
            </h2>

            {/* ✅ Button to make all stars yellow */}
            <div
              className="rounded-full w-fit border flex items-center justify-center cursor-pointer text-white font-semibold"
              onClick={makeAllYellow}
            >
              <button className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-3 sm:px-6 sm:py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                <FiArrowRight className="inline-block w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Side - Stars */}
          <div
            className={`flex flex-row md:flex-col items-center justify-center space-x-8 md:space-x-0 md:space-y-8 transform transition-all duration-1000 delay-500 ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "translate-x-20 opacity-0"
            }`}
          >
            {[0, 1].map((index) => (
              <div key={index} className="group relative p-4">
                <FiStar
                  className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 transition-all duration-500 transform group-hover:scale-110 ${
                    starsYellow[index]
                      ? "text-yellow-400 fill-yellow-400 rotate-12"
                      : "text-gray-600"
                  }`}
                />
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-300 ${
                    starsYellow[index] ? "" : ""
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* middel section */}
      <section className="min-h-screen flex items-center justify-center p-4 relative">
        <div className="absolute inset-0"></div>
        {/* after action button clicked */}
        <div className="w-full h-[600px]  px-16 rounded-3xl grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center z-10">
          <div
            className={`transform transition-all duration-1000 delay-700 order-2 md:order-1 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <div className="relative group flex flex-col sm:flex-row justify-between min-h-[300px] sm:h-[300px] items-center text-black px-2 gap-2 rounded-lg bg-white">
              <div
                className={
                  hidden === true
                    ? "w-full sm:w-[50%]"
                    : "w-full sm:w-[50%] pl-0 sm:pl-2 border"
                }
              >
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop&auto=format"
                  alt="Team collaboration"
                  className={`duration-1000 ${
                    hidden === true
                      ? "rounded-2xl shadow-2xl transition-all h-[150px] sm:h-[200px] w-full object-cover duration-500 group-hover:shadow-purple-500/25"
                      : "opacity-0"
                  }`}
                />
              </div>
              <div
                className={
                  hidden === true
                    ? "w-full sm:w-[50%] p-4"
                    : "w-full sm:w-[50%] pl-0 sm:pl-2 border p-4"
                }
              >
                <div
                  className={`duration-1000 text-lg sm:text-xl ${
                    hidden === true ? "font-bold" : "opacity-0"
                  }`}
                >
                  Work Smarter, Together
                </div>
                <div
                  className={`duration-1000 ${
                    hidden === true
                      ? "text-[12px] sm:text-[14px] pt-2"
                      : "opacity-0"
                  }`}
                >
                  Unify your team with seamless communication, real-time
                  updates, and effortless task sharing. Collaboration that
                  drives results.
                </div>
              </div>
            </div>
          </div>
          {/* action  */}
          <div
            className={`transform transition-all duration-1000 delay-900 order-1 md:order-2 ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "translate-x-20 opacity-0"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              {typedText2}
              <span
                className={`${
                  showCursor2 ? "inline-block animate-pulse" : "hidden"
                }`}
              >
                |
              </span>
            </h2>

            <button
              onClick={() => setHidden(!hidden)}
              className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-3 sm:px-6 sm:py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <FiArrowRight className="inline-block w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
      {/* Final Section */}
      <section className="relative pt-12 sm:pt-16 md:pt-20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-black"></div>

        <div
          className={`text-center max-w-4xl z-10 transform transition-all duration-1000 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#676767] via-[#fff] to-[#8f8f8f] bg-clip-text text-transparent px-4">
            Experience the future of WordPress management with Multi AI. Unlock
            voice AI capabilities at scale.
          </h1>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-6 sm:mb-8 px-4 p-2  h-[300px] flex items-center justify-center">
            <div className="h-full w-[70%] -mr-[100px] -mb-[40px] rounded-[60px] border-[#191919] border-2 flex items-center justify-center border-dashed">
              <div className="h-[70%] w-[80%]  rounded-[45px] border-[#222222] border-2  flex items-center justify-center border-dashed">
                <div className="h-[70%] w-[60%]  rounded-[30px] border-[#373737] border-2 border-dashed"></div>
              </div>
            </div>
            <Link
              href={"../auth"}
              className="flex items-center bg-[#0c0c0c] absolute backdrop-blur-sm rounded-full border border-[#191919] px-1 hover:scale-105 transition-all duration-300"
            >
              <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full hover:rotate-12 transition-transform duration-300 flex-shrink-0">
                <Logo />
              </div>
              <input
                type="text"
                placeholder="do the impossible..."
                className="bg-transparent text-white pl-2 w-[300px] placeholder-gray-500 flex-1 outline-none text-sm sm:text-base"
              />
              <div className=" px-3 py-2 sm:px-4 sm:py-2 rounded-full text-[#484848] transition-all duration-300 flex-shrink-0">
                <LuSend className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </Link>

            <div className="absolute bottom-[20%]">
              <div className="w-4 h-4 ml-[90%] rotate-45 -mb-[10px] bg-[#292929]"></div>
              <div className="bg-[#292929] text-[12px] px-6 p-2  rounded-full">
                try to feel the next gen wordpress experience
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-1 h-12 rounded-full"></div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
