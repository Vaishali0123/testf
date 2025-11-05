"use client";
import React, { useState, useEffect } from "react";
import {
  HiGlobeAlt,
  HiArrowUpRight,
  HiChevronLeft,
  HiXMark,
  HiShoppingCart,
  HiCube,
  HiPencilSquare,
  HiChartBar,
  HiCodeBracket,
  HiWrench,
  HiClock,
  HiShieldCheck,
  // HiBrain,
  HiAcademicCap,
  HiBell,
} from "react-icons/hi2";

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
    className={`relative bg-[#171717] rounded-xl p-4 sm:p-6 transition-all duration-300 cursor-pointer hover:bg-[#191919] ${
      isActive ? "ring ring-white scale-105" : ""
    }`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between mb-3 sm:mb-4">
      <h3 className="text-white text-lg sm:text-xl font-semibold">{title}</h3>
      <div className="flex items-center space-x-2">
        {icon}
        <HiArrowUpRight className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5 hover:text-white transition-colors" />
      </div>
    </div>
    <div className="h-48 sm:h-64 md:h-80 bg-[#1c1c1c] rounded-lg overflow-hidden">
      {children}
    </div>
  </div>
);

// ---- Feature Card Visualizations ----
const WooCommerceCard = () => (
  <div className="h-full flex flex-col justify-center p-2 sm:p-4">
    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-white text-xs sm:text-sm font-semibold">
          Product Manager
        </div>
        <HiShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </div>
      <div className="bg-white/20 backdrop-blur rounded p-2 text-white text-xs sm:text-sm">
        ✓ Inventory Updated
        <br />
        ✓ Pricing Adjusted
        <br />✓ Shipping Configured
      </div>
    </div>
    <div className="bg-gray-900 rounded-lg p-3 sm:p-4">
      <div className="flex items-center space-x-2 mb-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-green-400 text-xs sm:text-sm">
          AI Co-pilot Active
        </span>
      </div>
      <div className="text-gray-400 text-xs">Managing 247 products...</div>
    </div>
  </div>
);

const PluginSupportCard = () => (
  <div className="h-full flex flex-col justify-center p-2 sm:p-4">
    <div className="bg-white rounded-lg p-3 sm:p-4 mb-3">
      <div className="flex items-center space-x-2 mb-3">
        <HiCube className="w-5 h-5 text-blue-600" />
        <span className="text-sm font-semibold">Plugin Manager</span>
      </div>
      <div className="space-y-2">
        {["Yoast SEO", "Contact Form 7", "WP Rocket"].map((plugin, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-gray-50 rounded p-2"
          >
            <span className="text-xs">{plugin}</span>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-xs text-blue-800">
      🤖 AI requests your consent before actions
    </div>
  </div>
);

const ElementorCard = () => (
  <div className="h-full flex flex-col justify-center p-2 sm:p-4">
    <div className="bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg p-3 sm:p-4 mb-3">
      <div className="text-white text-xs sm:text-sm font-semibold mb-2">
        Page Builder
      </div>
      <div className="bg-white/20 backdrop-blur rounded-lg p-2 space-y-1">
        <div className="h-2 bg-white/60 rounded w-full"></div>
        <div className="h-2 bg-white/60 rounded w-3/4"></div>
        <div className="h-2 bg-white/60 rounded w-1/2"></div>
      </div>
    </div>
    <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-2 flex items-center space-x-2">
      <HiPencilSquare className="w-4 h-4 text-yellow-600" />
      <span className="text-xs text-yellow-800">Draft Preview Ready</span>
    </div>
  </div>
);

const ContentWorkflowCard = () => (
  <div className="h-full flex flex-col p-2 sm:p-4">
    <div className="bg-white rounded-lg p-3 sm:p-4 flex-1">
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          {/* <HiBrain className="w-4 h-4 text-white" /> */}
        </div>
        <div className="text-xs sm:text-sm font-semibold">AI Writer</div>
      </div>
      <div className="space-y-2 text-xs text-gray-700">
        <p className="bg-blue-50 rounded p-2">✍️ Draft generated...</p>
        <p className="bg-green-50 rounded p-2">✓ SEO optimized</p>
        <p className="text-gray-500 italic">Chat history preserved</p>
      </div>
    </div>
  </div>
);

const WeeklyAnalysisCard = () => (
  <div className="h-full flex flex-col justify-center p-2 sm:p-4">
    <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-lg p-3 sm:p-4">
      <div className="text-white text-xs sm:text-sm font-semibold mb-2">
        Weekly Report
      </div>
      <div className="space-y-2">
        <div className="bg-white/20 backdrop-blur rounded p-2">
          <div className="flex items-center justify-between text-white text-xs">
            <span>Performance</span>
            <span className="font-bold">+12%</span>
          </div>
        </div>
        <div className="bg-white/20 backdrop-blur rounded p-2">
          <div className="flex items-center justify-between text-white text-xs">
            <span>SEO Score</span>
            <span className="font-bold">94/100</span>
          </div>
        </div>
        <div className="bg-white/20 backdrop-blur rounded p-2">
          <div className="flex items-center justify-between text-white text-xs">
            <span>Visitors</span>
            <span className="font-bold">2.4K</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CodingSupportCard = () => (
  <div className="h-full flex flex-col justify-center p-2 sm:p-4">
    <div className="bg-gray-900 rounded-lg p-3 sm:p-4 font-mono text-xs flex-1">
      <div className="flex space-x-2 mb-2">
        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
      </div>
      <div className="text-blue-400 mb-1">// Backup created ✓</div>
      <div className="text-purple-400 mb-1">function optimize_css() {`{`}</div>
      <div className="text-green-400 mb-1"> return minify(styles);</div>
      <div className="text-purple-400">{`}`}</div>
    </div>
    <div className="bg-orange-50 border border-orange-300 rounded p-2 text-xs text-orange-800 mt-2">
      ⚠️ Awaiting your approval
    </div>
  </div>
);

const TroubleshootingCard = () => (
  <div className="h-full flex flex-col justify-center p-2 sm:p-4">
    <div className="bg-white rounded-lg p-3 sm:p-4">
      <div className="flex items-center space-x-2 mb-3">
        <HiWrench className="w-5 h-5 text-red-500" />
        <span className="text-sm font-semibold">Issue Detected</span>
      </div>
      <div className="space-y-2 text-xs">
        <div className="bg-red-50 border-l-4 border-red-500 p-2">
          <p className="font-semibold text-red-800">Root Cause:</p>
          <p className="text-red-700">Plugin conflict detected</p>
        </div>
        <div className="bg-green-50 border-l-4 border-green-500 p-2">
          <p className="font-semibold text-green-800">Solution:</p>
          <p className="text-green-700">Update to v2.4.1</p>
        </div>
        <button className="w-full bg-blue-500 text-white rounded py-2 text-xs font-semibold">
          Apply Fix
        </button>
      </div>
    </div>
  </div>
);

const AutomationCard = () => (
  <div className="h-full flex flex-col justify-center p-2 sm:p-4">
    <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg p-3 sm:p-4">
      <div className="text-white text-xs sm:text-sm font-semibold mb-3">
        Scheduled Tasks
      </div>
      <div className="space-y-2">
        {[
          { task: "SEO Audit", time: "Weekly" },
          { task: "Performance Check", time: "Daily" },
          { task: "Backup", time: "Daily" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/20 backdrop-blur rounded p-2 flex items-center justify-between"
          >
            <span className="text-white text-xs">{item.task}</span>
            <span className="text-white/80 text-xs">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SecurityCard = () => (
  <div className="h-full flex flex-col justify-center p-2 sm:p-4">
    <div className="bg-white rounded-lg p-3 sm:p-4">
      <div className="flex items-center space-x-2 mb-3">
        <HiShieldCheck className="w-5 h-5 text-green-600" />
        <span className="text-sm font-semibold">Security Check</span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs p-2 bg-green-50 rounded">
          <span>HTTPS Enabled</span>
          <span className="text-green-600">✓</span>
        </div>
        <div className="flex items-center justify-between text-xs p-2 bg-yellow-50 rounded">
          <span>3 Plugins outdated</span>
          <span className="text-yellow-600">⚠️</span>
        </div>
        <div className="flex items-center justify-between text-xs p-2 bg-green-50 rounded">
          <span>Strong passwords</span>
          <span className="text-green-600">✓</span>
        </div>
      </div>
    </div>
  </div>
);

const LearningCard = () => (
  <div className="h-full flex flex-col justify-center p-2 sm:p-4">
    <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg p-3 sm:p-4">
      <div className="text-white text-xs sm:text-sm font-semibold mb-3">
        AI Memory
      </div>
      <div className="space-y-2">
        <div className="bg-white/20 backdrop-blur rounded p-2">
          <p className="text-white text-xs">Learned your site structure</p>
        </div>
        <div className="bg-white/20 backdrop-blur rounded p-2">
          <p className="text-white text-xs">Remembers past conversations</p>
        </div>
        <div className="bg-white/20 backdrop-blur rounded p-2">
          <p className="text-white text-xs">Context-aware suggestions</p>
        </div>
      </div>
    </div>
  </div>
);

const EducationCard = () => (
  <div className="h-full flex flex-col justify-center p-2 sm:p-4">
    <div className="bg-white rounded-lg p-3 sm:p-4">
      <div className="flex items-center space-x-2 mb-3">
        <HiAcademicCap className="w-5 h-5 text-purple-600" />
        <span className="text-sm font-semibold">Learning Mode</span>
      </div>
      <div className="space-y-2 text-xs">
        <div className="bg-purple-50 border-l-4 border-purple-500 p-2">
          <p className="font-semibold text-purple-800">Why this change?</p>
          <p className="text-purple-700">Improves page load speed by 40%</p>
        </div>
        <div className="text-gray-600 italic">
          "No black-box decisions—just transparent guidance"
        </div>
      </div>
    </div>
  </div>
);

const AlertsCard = () => (
  <div className="h-full flex flex-col justify-center p-2 sm:p-4">
    <div className="bg-white rounded-lg p-3 sm:p-4">
      <div className="flex items-center space-x-2 mb-3">
        <HiBell className="w-5 h-5 text-blue-600" />
        <span className="text-sm font-semibold">Smart Alerts</span>
      </div>
      <div className="space-y-2">
        {[
          { msg: "Site health dropped", type: "warning" },
          { msg: "Plugin conflict detected", type: "error" },
          { msg: "New comment received", type: "info" },
        ].map((alert, i) => (
          <div
            key={i}
            className={`p-2 rounded text-xs flex items-center space-x-2 ${
              alert.type === "error"
                ? "bg-red-50 text-red-700"
                : alert.type === "warning"
                ? "bg-yellow-50 text-yellow-700"
                : "bg-blue-50 text-blue-700"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                alert.type === "error"
                  ? "bg-red-500"
                  : alert.type === "warning"
                  ? "bg-yellow-500"
                  : "bg-blue-500"
              }`}
            ></div>
            <span>{alert.msg}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ---- Main Component ----
export default function WebivusAIFeaturesShowcase() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const features = [
    {
      title: "WooCommerce Integration",
      icon: <HiShoppingCart className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />,
      component: <WooCommerceCard />,
      description:
        "Webivus AI takes complete control of your online store. Spin up products, update inventory, adjust pricing, configure shipping—Webivus AI manages your entire WooCommerce ecosystem. One AI Co-pilot, complete store control.",
      details: [
        "Complete product management",
        "Real-time inventory updates",
        "Dynamic pricing adjustments",
        "Shipping configuration automation",
        "Order processing optimization",
      ],
    },
    {
      title: "Plugin Support",
      icon: <HiCube className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />,
      component: <PluginSupportCard />,
      description:
        "Got a favorite plugin? Webivus AI can manage any plugin in your WordPress arsenal. It requests consent before every action, so you stay in the driver's seat while AI does the work.",
      details: [
        "Universal plugin compatibility",
        "Consent-based actions",
        "Automatic updates & management",
        "Plugin conflict detection",
        "Performance optimization",
      ],
    },
    {
      title: "Elementor-Aware Editing",
      icon: <HiPencilSquare className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />,
      component: <ElementorCard />,
      description:
        "Changes to page-builder content (like Elementor) happen in a preview draft until you approve them—no surprises on your live site.",
      details: [
        "Safe draft previews",
        "No live site disruptions",
        "Visual editing support",
        "Approval-based publishing",
        "Rollback capabilities",
      ],
    },
    {
      title: "Smart Content Workflows",
      // icon: <HiBrain className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />,
      component: <ContentWorkflowCard />,
      description:
        "Webivus helps write, edit, and optimize content while remembering past chat threads, so you're always working with context.",
      details: [
        "AI-powered content generation",
        "Context-aware editing",
        "Chat history preservation",
        "SEO optimization",
        "Multi-format support",
      ],
    },
    {
      title: "Weekly Site Analysis",
      icon: <HiChartBar className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />,
      component: <WeeklyAnalysisCard />,
      description:
        "Every week, Webivus analyzes performance, SEO, and user activity, then shares digestible insights, not raw metrics.",
      details: [
        "Automated weekly reports",
        "Performance tracking",
        "SEO health monitoring",
        "User activity insights",
        "Actionable recommendations",
      ],
    },
    {
      title: "Coding Support",
      icon: <HiCodeBracket className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />,
      component: <CodingSupportCard />,
      description:
        "Webivus can safely analyze and modify theme code files after taking a backup—but always with user approval and rollback options. Generates context-aware snippets (HTML, CSS tweaks).",
      details: [
        "Automatic code backups",
        "Safe theme modifications",
        "Context-aware snippets",
        "Approval-based changes",
        "One-click rollback",
      ],
    },
    {
      title: "Smart Troubleshooting",
      icon: <HiWrench className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />,
      component: <TroubleshootingCard />,
      description:
        "Identifies root causes and walks you through steps in plain English. When you're ready, it applies safe fixes—only after you say 'go.'",
      details: [
        "Root cause analysis",
        "Plain English explanations",
        "Step-by-step guidance",
        "Approval-based fixes",
        "Safe resolution methods",
      ],
    },
    {
      title: "Human-in-the-Loop Automation",
      icon: <HiClock className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />,
      component: <AutomationCard />,
      description:
        "One-time or scheduled tasks (like SEO audits or performance checks) run when you approve, ensuring no silent changes.",
      details: [
        "Scheduled task management",
        "Approval-based execution",
        "SEO audits",
        "Performance checks",
        "Custom automation workflows",
      ],
    },
    {
      title: "Security Checks",
      icon: <HiShieldCheck className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />,
      component: <SecurityCard />,
      description:
        "Instead of a full scan, Webivus flags common risks (outdated plugins, missing HTTPS, weak passwords) and educates you—plus alerts you in dashboard.",
      details: [
        "Common vulnerability detection",
        "Plugin update monitoring",
        "HTTPS verification",
        "Password strength checks",
        "Dashboard security alerts",
      ],
    },
    {
      title: "Contextual Memory",
      // icon: <HiBrain className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />,
      component: <LearningCard />,
      description:
        "Webivus increasingly understands YOUR site—not just the last request you made. This memory improves future advice and fixes.",
      details: [
        "Site-specific learning",
        "Conversation context retention",
        "Pattern recognition",
        "Personalized recommendations",
        "Continuous improvement",
      ],
    },
    {
      title: "Educational Approach",
      icon: <HiAcademicCap className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />,
      component: <EducationCard />,
      description:
        "At every step, Webivus explains why it suggests something—no black-box decisions, just trust-building transparency.",
      details: [
        "Transparent explanations",
        "Learning opportunities",
        "Best practice guidance",
        "Trust-building approach",
        "No hidden decisions",
      ],
    },
    {
      title: "Interactive Alerts",
      icon: <HiBell className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />,
      component: <AlertsCard />,
      description:
        "You get intuitive alerts via email or dashboard when there's a change—like a drop in site health, plugin conflicts, or content feedback, making proactive checks easy.",
      details: [
        "Real-time notifications",
        "Email & dashboard alerts",
        "Site health monitoring",
        "Conflict detection",
        "Proactive issue prevention",
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
      <div className="min-h-screen text-white ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
          {/* Header */}
          <div className="mb-8 sm:mb-12 md:mb-16">
            <div className="flex items-center space-x-2 mb-4 sm:mb-6 md:mb-8">
              <HiGlobeAlt className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
              <span className="text-gray-400 text-xs sm:text-sm font-medium tracking-widest uppercase">
                WEBIVUS AI FEATURES
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-300 mb-4 sm:mb-6 md:mb-8 leading-tight">
              AI-Powered WordPress Management
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-4xl leading-relaxed">
              Every feature in Webivus AI is designed to give you{" "}
              <span className="text-white font-semibold">complete control</span>{" "}
              with intelligent automation—making WordPress management
              effortless, transparent, and secure.
            </p>
          </div>

          {/* Features Carousel - Desktop */}
          <div className="hidden md:block">
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
            </div>
          </div>

          {/* Features Grid - Mobile & Tablet */}
          <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                icon={feature.icon}
                onClick={() => openPopup(feature)}
              >
                {feature.component}
              </FeatureCard>
            ))}
          </div>

          {/* Controls - Desktop Only */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={prevSlide}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-[#171717] hover:bg-[#272727] rounded-full flex items-center justify-center transition-colors duration-200"
              aria-label="Previous"
            >
              <HiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-[#171717] hover:bg-[#272727] rotate-180 rounded-full flex items-center justify-center transition-colors duration-200"
              aria-label="Next"
            >
              <HiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
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
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-800">
                  <div className="flex items-center space-x-3">
                    {selectedFeature.icon}
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      {selectedFeature.title}
                    </h2>
                  </div>
                  <button
                    onClick={closePopup}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    aria-label="Close"
                  >
                    <HiXMark className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 hover:text-white" />
                  </button>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="mb-4 sm:mb-6">
                    <div className="bg-gray-800 rounded-lg h-48 sm:h-64 overflow-hidden">
                      {selectedFeature.component}
                    </div>
                  </div>
                  <p className="text-gray-300 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                    {selectedFeature.description}
                  </p>
                  <h3 className="text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                    Key Features:
                  </h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {selectedFeature.details.map((detail, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm sm:text-base text-gray-300">
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-800">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold transition-colors w-full sm:w-auto">
                      Get Started
                    </button>
                    <button className="border border-gray-700 hover:bg-gray-700 text-white px-6 py-3 rounded-full font-semibold transition-colors w-full sm:w-auto">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
