"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

const Feature = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const firstRowRef = useRef(null);
  const secondRowRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const elements = [titleRef, descriptionRef, firstRowRef, secondRowRef];
    elements.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      elements.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <>
      <style jsx>{`
        .fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .fade-up.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .stagger-left {
          opacity: 0;
          transform: translateX(-40px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .stagger-left.animate-in {
          opacity: 1;
          transform: translateX(0);
        }

        .stagger-right {
          opacity: 0;
          transform: translateX(40px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .stagger-right.animate-in {
          opacity: 1;
          transform: translateX(0);
        }

        .feature-card {
          opacity: 0;
          transform: translateY(40px) scale(0.95);
          transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .feature-card:nth-child(1) {
          transition-delay: 0.1s;
        }

        .feature-card:nth-child(2) {
          transition-delay: 0.2s;
        }

        .feature-card:nth-child(3) {
          transition-delay: 0.3s;
        }

        .animate-in .feature-card {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .feature-card:hover {
          transform: translateY(-5px) scale(1.02);
          transition: all 0.3s ease;
        }

        .line-animate {
          width: 0;
          transition: width 1.2s ease-out 0.3s;
        }

        .line-animate.animate-in {
          width: 20%;
        }

        @media (max-width: 768px) {
          .line-animate.animate-in {
            width: 40%;
          }
        }
      `}</style>

      <div
        className="py-4 sm:py-[16px] w-full flex flex-col scale-90 sm:scale-95 md:scale-90 items-center px-4 sm:px-6 lg:px-8"
        ref={containerRef}
      >
        <div className="w-full sm:w-[90%] md:w-[85%] lg:w-[80%]">
          <div ref={titleRef} className="fade-up">
            <div className="h-[1px] line-animate bg-[radial-gradient(circle_at_center,_#959595,_#1e1e1e)]"></div>
            <div className="text-[#959595] leading-8 sm:leading-10 mt-4 sm:mt-6 w-full">
              <div className="text-[#959595] w-full text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-semibold">
                Features
              </div>
              <div className="text-[#fff] w-full text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-semibold">
                that are designed for you.
              </div>
            </div>
          </div>

          <div
            ref={descriptionRef}
            className="pt-4 w-full sm:w-[90%] md:w-[85%] lg:w-[80%] fade-up"
          >
            <div className="text-[#959595] w-full text-[14px] sm:text-[15px] md:text-[16px]">
              Introducing the freeform Design Editor packed with power beyond
              your imagination, yet feels so incredibly simple to use. Style and
              effect controls are meticulously timed to appear when you need
              them, right where your cursor is. And whenever you are ready, just
              hit publish to turn your site designs into an actual website. No
              rebuilding, no handoffs, no coding.
            </div>
          </div>

          <div className="w-full p-4 sm:p-6 md:p-8 lg:p-10 flex items-center flex-col gap-3 sm:gap-4 justify-center">
            {/* First Row */}
            <div
              ref={firstRowRef}
              className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4 w-full stagger-left"
            >
              <div className="h-[300px] sm:h-[320px] md:h-[350px] w-full md:w-[50%] bg-[#1B1B1B] rounded-2xl sm:rounded-3xl p-2 feature-card">
                <div className="h-full w-full border border-white/5 overflow-hidden relative rounded-2xl sm:rounded-3xl">
                  <Image
                    width={500}
                    height={250}
                    src="../../secure.svg"
                    alt="secure"
                    className="w-full h-[70%] sm:h-[80%] md:h-[90%] object-cover"
                  />
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                    <div className="text-sm sm:text-base font-medium">
                      Secure Plugin Connection
                    </div>
                    <div className="mt-1 sm:mt-2 text-[12px] sm:text-[13px] md:text-[14px] text-[#959595]">
                      Install the Webivus plugin, authorize once with a
                      site-specific token, and Webivus will communicate
                      securely.
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[300px] sm:h-[320px] md:h-[350px] w-full md:w-[30%] bg-[#1B1B1B] rounded-2xl sm:rounded-3xl p-2 feature-card">
                <div className="h-full w-full border border-white/5 rounded-2xl sm:rounded-3xl overflow-hidden relative">
                  <Image
                    width={500}
                    height={250}
                    src="../../code.svg"
                    alt="code"
                    className="w-full h-[70%] sm:h-[80%] md:h-[90%] object-cover"
                  />
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                    <div className="text-sm sm:text-base font-medium">
                      Code-Level Assistance
                    </div>
                    <div className="mt-1 sm:mt-2 text-[12px] sm:text-[13px] md:text-[14px] text-[#959595]">
                      Unlike basic &quot;chat plugins&quot;, Webivus can safely
                      analyze and modify code files — but always with user
                      approval and rollback options.
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[300px] sm:h-[320px] md:h-[350px] w-full md:w-[30%] bg-[#1B1B1B] rounded-2xl sm:rounded-3xl p-2 feature-card">
                <div className="h-full w-full border border-white/5 rounded-2xl sm:rounded-3xl overflow-hidden relative">
                  <Image
                    width={500}
                    height={250}
                    src="../../agent.svg"
                    alt="agent"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                    <div className="text-sm sm:text-base font-medium">
                      Multi-Agent Orchestration
                    </div>
                    <div className="mt-1 sm:mt-2 text-[12px] sm:text-[13px] md:text-[14px] text-[#959595]">
                      Specialized Multi AI agents collaborate like a team one
                      creates a page, another optimizes it, another checks for
                      bugs.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row */}
            <div
              ref={secondRowRef}
              className="flex flex-col md:flex-row-reverse items-center gap-3 sm:gap-4 w-full stagger-right"
            >
              <div className="h-[300px] sm:h-[320px] md:h-[350px] w-full md:w-[50%] bg-[#1B1B1B] rounded-2xl sm:rounded-3xl p-2 feature-card">
                <div className="h-full w-full border border-white/5 rounded-2xl sm:rounded-3xl overflow-hidden relative">
                  <Image
                    width={500}
                    height={250}
                    src="../../trouble.svg"
                    alt="trouble"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                    <div className="text-sm sm:text-base font-medium">
                      Human in Control
                    </div>
                    <div className="mt-1 sm:mt-2 text-[12px] sm:text-[13px] md:text-[14px] text-[#959595]">
                      Every action runs only after your approval. Nothing
                      happens without consent — building trust and safety for
                      global users.
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[300px] sm:h-[320px] md:h-[350px] w-full md:w-[30%] bg-[#1B1B1B] rounded-2xl sm:rounded-3xl p-2 feature-card">
                <div className="h-full w-full border border-white/5 rounded-2xl sm:rounded-3xl overflow-hidden relative">
                  <Image
                    width={500}
                    height={250}
                    src="../../chat.svg"
                    alt="chat"
                    className="w-full h-[70%] sm:h-[80%] md:h-[90%] object-cover"
                  />
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                    <div className="text-sm sm:text-base font-medium">
                      Chat That Remembers
                    </div>
                    <div className="mt-1 sm:mt-2 text-[12px] sm:text-[13px] md:text-[14px] text-[#959595]">
                      Webivus remembers past conversations and actions, so you
                      don&apos;t have to repeat yourself.
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[300px] sm:h-[320px] md:h-[350px] w-full md:w-[30%] bg-[#1B1B1B] rounded-2xl sm:rounded-3xl p-2 feature-card">
                <div className="h-full w-full border border-white/5 rounded-2xl sm:rounded-3xl overflow-hidden relative">
                  <Image
                    width={500}
                    height={250}
                    src="../../human.svg"
                    alt="human"
                    className="w-full h-[70%] sm:h-[80%] md:h-[90%] object-cover"
                  />
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                    <div className="text-sm sm:text-base font-medium">
                      Context-Aware Troubleshooting
                    </div>
                    <div className="mt-1 sm:mt-2 text-[12px] sm:text-[13px] md:text-[14px] text-[#959595]">
                      AI reviews logs, plugin updates, server response times,
                      and pinpoints the real cause of problems instead of
                      generic &quot;try this&quot; suggestions.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feature;
