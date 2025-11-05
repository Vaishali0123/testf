"use client";
import React, { useState } from "react";
import { Search, HelpCircle, Users, Headphones } from "lucide-react";

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const quickActions = [
    { label: "Get more space", href: "#" },
    { label: "Share a file or folder", href: "#" },
    { label: "Reset your password", href: "#" },
  ];

  const supportSections = [
    {
      icon: HelpCircle,
      title: "FAQS & Docs",
      description:
        "Learn how to use Webivus with our documentation, FAQS, and tutorials. Button text: Read Docs.",
      buttonText: "View Q&As",
      iconBg: "bg-pink-500",
    },
    {
      icon: Users,
      title: "Ask the community",
      description:
        "Connect with our community, ask questions and get instant helps from Webivus users on discord. Button text: Ask questions.",
      buttonText: "Submit a question",
      buttonAction: () => console.log("Submit question"),
      iconBg: "bg-purple-500",
    },
    {
      icon: Headphones,
      title: "Webivus Support",
      description:
        "One-to-one professional technical support for paying users. Button Text: Send a message.",
      buttonText: "Send a message",
      buttonAction: () => console.log("Send message"),
      iconBg: "bg-pink-500",
    },
  ];

  return (
    <div className="min-h-screen w-full  text-white">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
          opacity: 0;
        }
        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }
        .animate-shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>

      {/* Main Content */}
      <div className="sm:container md:mx-auto w-full px-4 sm:px-6 py-12 sm:py-16">
        {/* Header Section */}
        <div className="text-center mb-8 w-full sm:mb-12">
          <h1 className="text-3xl sm:text-4xl w-full lg:text-5xl font-bold mb-4 sm:mb-6 animate-fadeInUp bg-gradient-to-r from-white via-purple-200 to-pink-400 bg-clip-text text-transparent">
            How can we help you?
          </h1>
          <p className="text-gray-300 text-base sm:text-lg lg:text-xl mb-8 sm:mb-12 max-w-3xl mx-auto animate-fadeInUp delay-100 px-4">
            Search for help from support articles, product documentation,
            community.
          </p>

          {/* Search Bar */}
          <div className="relative w-full sm:max-w-2xl mx-auto mb-6 sm:mb-8 px-4 animate-scaleIn delay-200">
            <div className="relative group">
              <input
                type="text"
                placeholder="Write a question or problem"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 pr-12 sm:pr-14 bg-[#181818] border border-white/5 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-white/10 text-sm sm:text-base"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12 sm:mb-16 px-4 animate-fadeIn delay-300">
            {quickActions.map((action, index) => (
              <a
                key={index}
                href={action.href}
                className="px-4 sm:px-6 py-2 sm:py-2.5 bg-[#181818] hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 rounded-full text-xs sm:text-sm text-gray-300 hover:text-white transition-all duration-300 border border-white/5 hover:border-white/10 hover:scale-105 transform"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>

        {/* Support Sections */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto px-4">
          {supportSections.map((section, index) => (
            <div
              key={index}
              className="relative animate-slideInUp"
              style={{ animationDelay: `${0.5 + index * 0.15}s` }}
            >
              {/* Background Card */}
              <div className="bg-[#181818] border border-white/5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 h-full backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300 group hover:shadow-xl hover:shadow-purple-500/10 transform hover:scale-[1.02] hover:-translate-y-1">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300"></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-white to-gray-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg animate-float">
                      <section.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#F94CFF]" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                      {section.title}
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      {section.description}
                    </p>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={section.buttonAction}
                    className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-black rounded-full font-medium hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base"
                  >
                    {section.buttonText}
                  </button>
                </div>
              </div>

              {/* Decorative glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10"></div>
            </div>
          ))}
        </div>

        {/* Additional Help Section */}
        <div className="mt-12 sm:mt-20 text-center animate-fadeInUp delay-600">
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">
              Still need help?
            </h3>
            <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base px-4">
              Can&apos;t find what you&apos;re looking for? Our support team is
              here to assist you.
            </p>
            <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 text-sm sm:text-base">
              Contact Support Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
