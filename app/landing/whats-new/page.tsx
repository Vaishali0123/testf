"use client";
import React, { useEffect, useRef, useState } from "react";
import Logo from "../components/Logo";
import FAQ from "../components/FAQ";

const Page = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleJoin = async () => {
    if (!email) {
      setStatus("Please enter your email.");
      return;
    }
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("🎉 Successfully joined the waitlist!");
        setEmail("");
      } else {
        setStatus("❌ Failed to send. Try again.");
      }
    } catch (err) {
      setStatus("❌ Something went wrong.");
    }
  };

  return (
    <div>
      <div
        className="relative flex justify-center py-10 px-4 sm:px-6 lg:px-8"
        ref={sectionRef}
      >
        {/* Animated background blobs */}
        <div className="h-[80px] sm:h-[100px] mt-10 sm:mt-20 absolute animate-pulse top-[50%] w-[180px] sm:w-[220px] blur-2xl bg-[#f94cff58]"></div>

        <div className="flex flex-col items-center gap-2 sm:gap-4 relative z-10 w-full max-w-6xl">
          {/* Fade in from top animation */}
          <div
            className={`text-[28px] sm:text-[36px] md:text-[42px] lg:text-[50px] font-bold w-full sm:w-[90%] md:w-[80%]  text-center transition-all duration-1000 px-4 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            }`}
          >
            Thank you for the overwhelming love and support for Webivus!
          </div>

          {/* Fade in with delay */}
          <div
            className={`text-[16px] sm:text-[18px] md:text-[20px] text-white/60 w-full sm:w-[80%] md:w-[60%] text-center transition-all duration-1000 delay-200 px-4 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Webivus is in high demand! Join the waitlist today and be the first
            to know when access opens.
          </div>

          {/* Email input section with scale animation */}
          <div
            className={`flex flex-col sm:flex-row items-center gap-2 p-2 rounded-full mt-6 text-[14px] bg-black/60 sm:border transition-all duration-1000 delay-500 hover:scale-105 w-full max-w-[500px] mx-4 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <div className="w-[40px] h-[40px] rounded-full border hover:rotate-12 transition-transform duration-300 flex-shrink-0">
              <Logo />
            </div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-[300px] h-[40px] cursor-pointer bg-transparent rounded-full p-4 border focus:border-[#f94cff] transition-colors duration-300 focus:outline-none"
              placeholder="Enter your email"
            />
            <div
              onClick={handleJoin}
              className="px-4 h-[40px] rounded-full cursor-pointer border flex items-center justify-center bg-white text-[#000] hover:bg-[#f94cff] hover:text-white hover:border-[#f94cff] transition-all duration-300 hover:scale-110 whitespace-nowrap flex-shrink-0 w-full sm:w-auto"
            >
              Join now
            </div>
          </div>
          {status && (
            <p className="mt-4 text-sm text-white text-center px-4">{status}</p>
          )}
        </div>
      </div>
      <div className="w-full bg-black mt-10 sm:mt-20">
        <FAQ />
      </div>
    </div>
  );
};

export default Page;
