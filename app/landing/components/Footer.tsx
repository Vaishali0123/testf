"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-black text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div
        className={`w-full p-8 py-10 rounded-2xl mx-auto backdrop-blur-lg border border-white/10 max-w-7xl relative transition-all duration-1000 ease-out ${
          isVisible
            ? "bg-white/10 scale-100 opacity-100"
            : "bg-white/0 scale-95 opacity-0"
        }`}
      >
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24">
          {/* Left Section - Logo and CTAs */}
          <div
            className={`space-y-6 sm:space-y-8 transform transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            {/* Logo */}
            <div
              className={`flex items-center gap-2 sm:gap-3 transform transition-all duration-800 ease-out ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="relative">
                <div className="w-[50px] h-[50px] rounded-full  hover:rotate-12 transition-transform duration-300">
                  <Logo />
                </div>
              </div>
              <div className="font-semibold text-lg sm:text-xl">Webivus</div>
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 transform transition-all duration-1000 ease-out ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <Link
                href="/webapp"
                className="bg-white text-black px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium hover:bg-gray-100 hover:scale-105 transition-all duration-300 text-center text-sm sm:text-base shadow-lg hover:shadow-xl"
              >
                Try webvius
              </Link>
              {/* <Link
                href="/demo"
                className="border border-gray-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium hover:border-gray-400 hover:bg-white/5 hover:scale-105 transition-all duration-300 text-center text-sm sm:text-base"
              >
                Watch Demo
              </Link> */}
            </div>

            {/* Social Icons */}
            <div
              className={`flex space-x-3 sm:space-x-4 transform transition-all duration-1000 ease-out ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              {[
                {
                  href: "https://discord.com",
                  label: "Discord",
                  delay: "1000ms",
                  path: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9554 2.4189-2.1568 2.4189Z",
                },
                {
                  href: "https://facebook.com",
                  label: "Facebook",
                  delay: "1100ms",
                  path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                },
                {
                  href: "https://twitter.com",
                  label: "Twitter",
                  delay: "1200ms",
                  path: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
                },
                {
                  href: "https://github.com",
                  label: "GitHub",
                  delay: "1300ms",
                  path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
                },
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className={`w-9 h-9 sm:w-10 sm:h-10 bg-[#191919] rounded-full flex items-center justify-center hover:bg-gray-700 hover:scale-110 transition-all duration-300 transform ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: social.delay }}
                  aria-label={social.label}
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.path} />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section - Navigation Links */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 transform transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            {/* First Column */}

            <div
              className={`space-y-3 sm:space-y-4 transform transition-all duration-800 ease-out ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <div className="text-[18px] font-semibold">Features </div>
              {[
                { href: "/landing/pricing", text: "Plans & Pricing" },
                { href: "/landing/features", text: "Features" },
                { href: "/news", text: "News & Blogs" },
                { href: "/careers", text: "Careers" },
              ].map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm sm:text-base transform ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0"
                  }`}
                  style={{ transitionDelay: `${800 + index * 100}ms` }}
                >
                  {link.text}
                </Link>
              ))}
            </div>

            {/* Second Column */}

            <div
              className={`space-y-3 sm:space-y-4 transform transition-all duration-800 ease-out ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: "700ms" }}
            >
              <div className="text-[18px] font-semibold">Resources </div>
              {[
                { href: "/about", text: "About Us" },
                { href: "/docs", text: "Documentation" },
                { href: "/papers", text: "Papers" },
                { href: "/landing/support", text: "Contact Us" },
              ].map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm sm:text-base transform ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0"
                  }`}
                  style={{ transitionDelay: `${1000 + index * 100}ms` }}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className={`mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10 transform transition-all duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: "1200ms" }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 gap-4">
            {/* Copyright */}
            <p
              className={`text-gray-400 text-xs sm:text-sm text-center lg:text-left transform transition-all duration-800 ease-out ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: "1400ms" }}
            >
              © 2025 Webvius Inc. All rights reserved.
            </p>

            {/* Bottom Links */}
            <div
              className={`flex flex-wrap justify-center lg:justify-end space-x-4 sm:space-x-6 transform transition-all duration-800 ease-out ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: "1500ms" }}
            >
              {[
                { href: "/landing/terms", text: "Terms of Service" },
                { href: "/landing/privacy", text: "Privacy Policy" },
                { href: "/landing/cookies", text: "Cookies" },
              ].map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-gray-400 hover:text-white transition-all duration-300 text-xs sm:text-sm hover:scale-105 transform ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2 opacity-0"
                  }`}
                  style={{ transitionDelay: `${1600 + index * 100}ms` }}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
