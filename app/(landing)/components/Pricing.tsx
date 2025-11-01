"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";

const plans = [
  {
    title: "Hobby",
    price: "$0",
    desc: "Great for personal use or as a first step to explore the Scout platform.",
    button: "Sign Up",
    features: [
      "100 Interactions (GPT 3.5 Only)",
      "Deploy 1 App",
      "Connect 1 Collection",
      "10GB of Storage",
      "Community Support (Discord)",
    ],
    highlight: false,
  },
  {
    title: "Pro",
    price: "$50",
    subtitle: "Most Popular",
    desc: "Perfect for building and scaling models with limited context.",
    button: "Sign Up",
    features: [
      "Unlimited Interactions",
      "$0.09 per Interaction",
      "Deploy 10 Apps",
      "Connect 10 Collections",
      "1TB of Storage",
      "Community & Email Support",
    ],
    highlight: true,
  },
  {
    title: "Enterprise",
    price: "Custom",
    desc: "For large scale models with large and ever-changing context.",
    button: "Request Access",
    features: [
      "Unlimited Interactions",
      "Custom Interaction Pricing",
      "Unlimited Apps",
      "Unlimited Collections",
      "Unlimited Storage",
      "Dedicated Support",
    ],
    highlight: false,
  },
];

const Pricing = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [headerVisible, setHeaderVisible] = useState(false);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === headerRef.current) {
            setHeaderVisible(entry.isIntersecting);
          } else {
            const cardIndex = cardRefs.current.indexOf(
              entry.target as HTMLElement
            );
            if (cardIndex !== -1 && entry.isIntersecting) {
              setVisibleCards((prev) => [...new Set([...prev, cardIndex])]);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="text-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      {/* Header */}
      <div
        ref={headerRef}
        className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 ease-out ${
          headerVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-white via-slate-50 to-slate-600 bg-clip-text text-transparent">
          A plan for every need.
        </h2>
        <p className="text-gray-400 mt-2 sm:mt-4 max-w-xs sm:max-w-2xl mx-auto text-sm sm:text-base lg:text-lg px-4 sm:px-0">
          Whether you are just starting or require massive scale, we have a
          solution.
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            className={`transform transition-all duration-700 ease-out ${
              visibleCards.includes(idx)
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-16 scale-95"
            }`}
            style={{
              transitionDelay: `${idx * 150}ms`,
              willChange: "transform, opacity",
            }}
          >
            <div
              className={`p-0.5 rounded-2xl sm:rounded-3xl relative group hover:scale-105 transition-all duration-300 ${
                plan.highlight
                  ? "bg-gradient-to-b from-[#f94cff3e] via-[#f94cff0d] to-[#f94cff06] shadow-lg shadow-purple-500/20"
                  : ""
              }`}
            >
              <div
                className={`p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl h-full relative  ${
                  plan.highlight
                    ? "bg-gradient-to-b from-[#030303ce] via-[#f94cff0d] to-[#f94cff06]"
                    : "bg-gradient-to-b from-[#181818] to-black border border-gray-700/50"
                } ${!plan.highlight ? "mt-0 sm:mt-6 lg:mt-10" : ""}`}
              >
                {/* Animated background gradient */}
                {plan.highlight && (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-500/5 to-purple-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                )}

                {/* Badge for PRO */}
                {plan.subtitle && (
                  <span className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 text-xs font-semibold px-3 py-1 bg-gradient-to-r from-[#f94cff] to-[#c44cff] text-white rounded-full shadow-lg animate-pulse">
                    {plan.subtitle}
                  </span>
                )}

                <div className="relative z-10">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold">
                    {plan.title}
                  </h3>

                  <div className="flex items-baseline gap-2 mt-2 sm:mt-4">
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {plan.price}
                    </p>
                    {plan.price !== "Custom" && plan.price !== "$0" && (
                      <span className="text-gray-400 text-sm">/month</span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-gray-400 mt-2 sm:mt-4 leading-relaxed">
                    {plan.desc}
                  </p>

                  {/* Button */}
                  <button
                    className={`mt-4 sm:mt-6 w-full py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                      plan.highlight
                        ? "bg-gradient-to-r from-white to-gray-100 text-black hover:from-gray-100 hover:to-gray-200 shadow-lg hover:shadow-xl"
                        : "bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 border border-gray-600 hover:border-gray-500"
                    }`}
                  >
                    {plan.button}
                  </button>

                  {/* Features */}
                  <ul className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-300">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className={`flex items-center gap-2 sm:gap-3 transform transition-all duration-500 ${
                          visibleCards.includes(idx)
                            ? "translate-x-0 opacity-100"
                            : "translate-x-4 opacity-0"
                        }`}
                        style={{ transitionDelay: `${idx * 150 + i * 50}ms` }}
                      >
                        <FaRegCheckCircle />
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full py-10 flex justify-center">
        <Link
          href={"../pricing"}
          className=" bg-white border border-white/5 text-[#000] px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
        >
          Compare pricing
        </Link>
      </div>
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-32 sm:w-64 h-32 sm:h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
    </section>
  );
};

export default Pricing;
