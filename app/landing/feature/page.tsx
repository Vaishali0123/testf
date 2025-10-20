"use client";
import React, { useState, useEffect } from "react";
import {
  HiGlobeAlt,
  HiArrowUpRight,
  HiChevronLeft,
  HiXMark,
} from "react-icons/hi2";
import { SiWordpress, SiGooglechrome, SiFigma } from "react-icons/si";
import { MdDesktopMac, MdCircle } from "react-icons/md";
import { BiCode } from "react-icons/bi";

// ---- FeatureCard Component ----
type FeatureCardProps = {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  icon,
  children,
  isActive = false,
  onClick,
}) => (
  <div
    className={`relative bg-[#171717] rounded-xl p-6 transition-all duration-300 cursor-pointer hover:bg-[#191919] ${
      isActive ? "ring-2 scale-105" : ""
    }`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-white text-xl font-semibold">{title}</h3>
      <div className="flex items-center space-x-2">
        {icon}
        <HiArrowUpRight className="text-gray-400 w-5 h-5 hover:text-white transition-colors" />
      </div>
    </div>
    <div className="h-80 bg-[#1c1c1c] rounded-lg overflow-hidden">
      {children}
    </div>
  </div>
);

// ---- Cards ----
const APICard = () => (
  <div className="h-full flex flex-col justify-center p-4">
    <div className="bg-white rounded-lg p-4 mb-4">
      <h4 className="text-lg font-bold text-gray-900 mb-2">H2</h4>
      <p className="text-gray-600">Body</p>
    </div>
    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
      <div className="flex space-x-2 mb-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>
      <div className="text-blue-400">import writer</div>
      <div className="text-purple-400">{">>> body = writer.complete"}</div>
      <div className="text-green-400">{'("Write an H2 for this section")'}</div>
    </div>
  </div>
);

const DesktopCard = () => (
  <div className="h-full flex flex-col justify-center items-center p-4">
    <div className="bg-purple-400 rounded-lg w-full max-w-xs h-48 p-4 relative mb-4">
      <div className="bg-white rounded-lg p-3 mb-3 shadow-lg">
        <div className="flex items-center space-x-2 mb-2">
          <MdCircle className="w-2 h-2 text-gray-400" />
          <div className="text-xs text-gray-600">
            How do I know what real value?
          </div>
        </div>
        <div className="text-xs text-gray-500">• Recent prompts</div>
        <div className="text-xs text-gray-500">• Machine vision</div>
      </div>
      <div className="bg-white rounded-lg p-3 shadow-lg">
        <div className="flex space-x-1 mb-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="space-y-1">
          <div className="h-2 bg-gray-200 rounded"></div>
          <div className="h-2 bg-gray-200 rounded w-3/4"></div>
          <div className="h-2 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  </div>
);

const ChromeCard = () => (
  <div className="h-full flex flex-col p-4">
    <div className="bg-gray-100 rounded-lg p-3 mb-4 flex items-center space-x-2">
      <div className="w-4 h-4 bg-gray-300 rounded"></div>
      <div className="flex-1 bg-white rounded px-3 py-1">
        <div className="w-20 h-3 bg-gray-200 rounded"></div>
      </div>
      <div className="w-6 h-6 bg-gray-300 rounded"></div>
    </div>
    <div className="space-y-2 mb-4">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        <div className="h-2 bg-gray-300 rounded flex-1"></div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        <div className="h-2 bg-gray-300 rounded w-3/4"></div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        <div className="h-2 bg-gray-300 rounded w-1/2"></div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        <div className="h-2 bg-gray-300 rounded w-2/3"></div>
      </div>
    </div>
    <div className="bg-white rounded-lg p-3 shadow-lg ml-auto max-w-xs">
      <div className="text-sm font-semibold mb-1">Daria Jvo</div>
      <div className="text-xs text-gray-600">Second check-in</div>
    </div>
  </div>
);

const WordCard = () => (
  <div className="h-full flex flex-col p-4">
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex space-x-2 mb-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="w-2 h-2 bg-gray-300 rounded-full"></div>
        ))}
      </div>
      <div className="space-y-3">
        <div className="text-sm text-gray-800">
          Larkin Lee is the CEO and cofounder of{" "}
          <span className="text-blue-600 underline">KloudBank</span>, an
          analytics platform for
        </div>
        <div className="text-sm text-gray-800">
          fintech companies. She previously worked
        </div>
        <div className="text-sm text-gray-800">
          as head of product at Equity and as an
        </div>
        <div className="text-sm text-gray-800">analyst at</div>
      </div>
    </div>
  </div>
);

const FigmaCard = () => (
  <div className="h-full flex flex-col justify-center items-center p-4">
    <div className="bg-gray-800 rounded-lg w-full max-w-xs h-48 p-4 relative">
      <div className="flex items-center space-x-2 mb-4">
        <SiFigma className="w-4 h-4 text-white" />
        <div className="w-4 h-4 bg-blue-500 rounded"></div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-600 rounded w-full"></div>
        <div className="h-3 bg-gray-600 rounded w-3/4"></div>
        <div className="h-3 bg-gray-600 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

// ---- Main Component ----
export default function WordPressFeaturesShowcase() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const features = [
    {
      title: "API",
      icon: <BiCode className="text-gray-400 w-6 h-6" />,
      component: <APICard />,
      description: "Powerful REST API integration...",
      details: [
        "Complete REST API access",
        "Custom endpoint creation",
        "Real-time data sync",
        "Secure authentication",
        "Docs & code examples",
      ],
    },
    {
      title: "Desktop app",
      icon: <MdDesktopMac className="text-gray-400 w-6 h-6" />,
      component: <DesktopCard />,
      description: "Native desktop application...",
      details: [
        "Cross-platform",
        "Offline editing",
        "Bulk operations",
        "Backup & restore",
        "Desktop-level encryption",
      ],
    },
    {
      title: "Chrome",
      icon: <SiGooglechrome className="text-gray-400 w-6 h-6" />,
      component: <ChromeCard />,
      description: "Chrome extension for quick...",
      details: [
        "One-click access",
        "Quick publishing",
        "Site monitoring",
        "Secure login",
        "Real-time notifications",
      ],
    },
    {
      title: "Word",
      icon: <SiWordpress className="text-gray-400 w-6 h-6" />,
      component: <WordCard />,
      description: "Microsoft Word integration...",
      details: [
        "Direct publishing",
        "Format preservation",
        "Collaboration",
        "Version control",
        "Template support",
      ],
    },
    {
      title: "Figma",
      icon: <SiFigma className="text-gray-400 w-6 h-6" />,
      component: <FigmaCard />,
      description: "Figma plugin for conversion...",
      details: [
        "Design-to-WordPress",
        "CSS/HTML generation",
        "Component sync",
        "Responsive optimization",
        "Collaboration handoff",
      ],
    },
  ];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % features.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const getVisibleFeatures = () => {
    const result = [];
    for (let i = 0; i < 6; i++) {
      result.push({
        ...features[(currentSlide + i) % features.length],
        index: (currentSlide + i) % features.length,
      });
    }
    return result;
  };

  // Auto-slide
  useEffect(() => {
    if (isPaused || isPopupOpen) return;
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev + 1) % features.length);
        setTimeout(() => setIsAnimating(false), 500);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isAnimating, isPaused, isPopupOpen, features.length]);

  interface Feature {
    title: string;
    icon: React.ReactNode;
    component: React.ReactNode;
    description: string;
    details: string[];
    index?: number;
  }

  const openPopup = (feature: Feature) => {
    setSelectedFeature(feature);
    setIsPaused(true);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedFeature(null);
      setIsPopupOpen(false);
      setIsClosing(false);
      setIsPaused(false);
    }, 300);
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="mb-16">
            <div className="flex items-center space-x-2 mb-8">
              <HiGlobeAlt className="w-6 h-6 text-gray-400" />
              <span className="text-gray-400 text-sm font-medium tracking-widest uppercase">
                FEATURES
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-300 mb-8 leading-tight">
              That are designed for you.
            </h1>
            <p className="text-xl text-gray-400 max-w-4xl leading-relaxed">
              Every tool in our platform is built to make{" "}
              <span className="text-white font-semibold">
                WordPress management
              </span>{" "}
              simple, smart, and stress-free.
            </p>
          </div>

          {/* Features Carousel */}
          <div
            className="relative overflow-hidden mb-8"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 25}%)`,
                width: "150%",
              }}
            >
              {getVisibleFeatures().map((feature, index) => (
                <div
                  key={`${feature.title}-${feature.index}`}
                  className="w-1/6 flex-shrink-0 px-3"
                >
                  <FeatureCard
                    title={feature.title}
                    icon={feature.icon}
                    isActive={index === 1}
                    onClick={() => openPopup(feature)}
                  >
                    {feature.component}
                  </FeatureCard>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-black to-transparent z-10"></div>
              <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-black to-transparent z-10"></div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-[#171717] hover:bg-[#272727] rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <HiChevronLeft className="w-6 h-6 text-gray-400" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-[#171717] hover:bg-[#272727] rotate-180 rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <HiChevronLeft className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {/* Popup Modal */}
          {selectedFeature && (
            <div
              className={`fixed inset-0 bg-black flex items-center justify-center z-50 p-4 transition-all duration-300 ${
                isClosing ? "bg-opacity-0" : "bg-opacity-75"
              }`}
              onClick={(e) => e.target === e.currentTarget && closePopup()}
            >
              <div
                className={`bg-[#171717] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 transform ${
                  isClosing
                    ? "scale-90 opacity-0 translate-y-8"
                    : "scale-100 opacity-100 translate-y-0"
                }`}
              >
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                  <div className="flex items-center space-x-3">
                    {selectedFeature.icon}
                    <h2 className="text-2xl font-bold text-white">
                      {selectedFeature.title}
                    </h2>
                  </div>
                  <button
                    onClick={closePopup}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <HiXMark className="w-6 h-6 text-gray-400 hover:text-white" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <div className="bg-gray-800 rounded-lg h-64 overflow-hidden">
                      {selectedFeature.component}
                    </div>
                  </div>
                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    {selectedFeature.description}
                  </p>
                  <h3 className="text-white text-xl font-semibold mb-4">
                    Key Features:
                  </h3>
                  <ul className="space-y-3">
                    {selectedFeature.details.map((detail, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300">{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex space-x-4 mt-8 pt-6 border-t border-gray-800">
                    <button className="bg-white text-black px-6 py-3 rounded-full font-semibold transition-colors">
                      Get Started
                    </button>
                    <button className="border border-gray-700 hover:bg-gray-700 text-white px-6 py-3 rounded-full font-semibold transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes popupEnter {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
}
