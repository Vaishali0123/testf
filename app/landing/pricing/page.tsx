// "use client";
// import React, { useState } from "react";
// import { FaCheck, FaTimes } from "react-icons/fa";
// import Pricing from "../../../public/bgpricing.svg";

// const PricingPage = () => {
//   const [billingPeriod, setBillingPeriod] = useState("monthly");
//   const [siteCount, setSiteCount] = useState(2);

//   const siteOptions = [
//     { value: 2, label: "2 Sites" },
//     { value: 4, label: "4 Sites" },
//     { value: 18, label: "18 Sites" },
//   ];

//   const getPrice = (basePrice: number, period: string, sites: number) => {
//     const multiplier = period === "yearly" ? 10 : 1; // 2 months free on yearly
//     const siteMultiplier = sites === 2 ? 1 : sites === 4 ? 1.8 : 3.2;
//     return Math.round(basePrice * multiplier * siteMultiplier);
//   };

//   const plans = [
//     {
//       name: "Free",
//       basePrice: 0,
//       period: "",
//       popular: false,
//       features: [
//         "Unlimited devices",
//         "Mobile app",
//         "Basic support",
//         "5GB storage",
//         "Reporting and analytics",
//       ],
//     },
//     {
//       name: "Enterprise",
//       basePrice: 20,
//       period: billingPeriod === "monthly" ? "per month" : "per year",
//       popular: true,
//       features: [
//         "Analytics Premium Account",
//         "Mobile app",
//         "Advanced support",
//         "Secure cloud",
//         "Unlimited storage",
//         "Advanced analytics",
//       ],
//     },
//     {
//       name: "Business",
//       basePrice: 120,
//       period: billingPeriod === "monthly" ? "per month" : "per year",
//       popular: false,
//       features: [
//         "Established response delivery",
//         "All new features month",
//         "Data security and privacy",
//         "Customized training",
//         "Unlimited storage",
//         "Project custom reports & dashboards",
//       ],
//     },
//   ];

//   const comparisonPlans = [
//     {
//       name: "Free",
//       price: "$0",
//       period: "per month forever",
//     },
//     {
//       name: "Teams",
//       price: "$3.97",
//       period: "per month billing monthly",
//     },
//     {
//       name: "Enterprise",
//       price: "$19.25",
//       period: "per month billing monthly",
//     },
//   ];

//   const featureCategories = [
//     {
//       category: "Code management",
//       features: [
//         {
//           name: "Free repositories",
//           free: true,
//           teams: "Unlimited",
//           enterprise: "Unlimited",
//         },
//         {
//           name: "Collaborators",
//           free: "Unlimited",
//           teams: "Unlimited",
//           enterprise: "Unlimited",
//         },
//         {
//           name: "Pull requests",
//           free: "Unlimited",
//           teams: "Unlimited",
//           enterprise: "Unlimited",
//         },
//         {
//           name: "Issues",
//           free: "Unlimited",
//           teams: "Unlimited",
//           enterprise: "Unlimited",
//         },
//       ],
//     },
//     {
//       category: "Code workflow",
//       features: [
//         { name: "GitHub Issues", free: true, teams: true, enterprise: true },
//         {
//           name: "GitHub Actions",
//           free: "Limited",
//           teams: true,
//           enterprise: true,
//         },
//         {
//           name: "Draft pull requests",
//           free: false,
//           teams: true,
//           enterprise: true,
//         },
//         { name: "Code owners", free: false, teams: true, enterprise: true },
//         {
//           name: "Auto-linked references",
//           free: false,
//           teams: true,
//           enterprise: true,
//         },
//         { name: "Wiki", free: true, teams: true, enterprise: true },
//         { name: "Insights", free: true, teams: true, enterprise: true },
//         {
//           name: "Dependency insights",
//           free: false,
//           teams: true,
//           enterprise: true,
//         },
//         {
//           name: "Repository insights",
//           free: true,
//           teams: true,
//           enterprise: true,
//         },
//       ],
//     },
//     {
//       category: "Collaboration",
//       features: [
//         {
//           name: "Organization permissions",
//           free: "Limited",
//           teams: true,
//           enterprise: true,
//         },
//         {
//           name: "Collaboration and review assignment",
//           free: "Limited",
//           teams: true,
//           enterprise: true,
//         },
//         { name: "Teams", free: false, teams: true, enterprise: true },
//         {
//           name: "Protected branch & merch",
//           free: false,
//           teams: true,
//           enterprise: true,
//         },
//         { name: "Discussion", free: true, teams: true, enterprise: true },
//         {
//           name: "Team discussions",
//           free: false,
//           teams: true,
//           enterprise: true,
//         },
//         {
//           name: "Pages and web management",
//           free: true,
//           teams: true,
//           enterprise: true,
//         },
//         { name: "Wiki pages", free: true, teams: true, enterprise: true },
//         {
//           name: "Project web developers",
//           free: true,
//           teams: true,
//           enterprise: true,
//         },
//       ],
//     },
//     {
//       category: "Security and compliance",
//       features: [
//         { name: "Code scanning", free: true, teams: true, enterprise: true },
//         {
//           name: "Dependabot alerts",
//           free: true,
//           teams: true,
//           enterprise: true,
//         },
//         {
//           name: "Dependabot security updates",
//           free: true,
//           teams: true,
//           enterprise: true,
//         },
//         {
//           name: "Dependency review",
//           free: true,
//           teams: true,
//           enterprise: true,
//         },
//         {
//           name: "Secret scanning",
//           free: "Limited",
//           teams: true,
//           enterprise: true,
//         },
//         {
//           name: "Repository security advisories",
//           free: true,
//           teams: true,
//           enterprise: true,
//         },
//         {
//           name: "Branch protection rules",
//           free: false,
//           teams: true,
//           enterprise: true,
//         },
//         {
//           name: "Required reviews",
//           free: false,
//           teams: true,
//           enterprise: true,
//         },
//         {
//           name: "Required status checks",
//           free: false,
//           teams: true,
//           enterprise: true,
//         },
//         {
//           name: "Auto-merge pull requests",
//           free: false,
//           teams: true,
//           enterprise: true,
//         },
//         {
//           name: "Push restrictions",
//           free: false,
//           teams: true,
//           enterprise: true,
//         },
//       ],
//     },
//     {
//       category: "Marketplace and Integrations",
//       features: [
//         { name: "GitHub Apps", free: true, teams: true, enterprise: true },
//         {
//           name: "GitHub Marketplace",
//           free: true,
//           teams: true,
//           enterprise: true,
//         },
//       ],
//     },
//     {
//       category: "Support and deployment",
//       features: [
//         { name: "Standard Support", free: true, teams: true, enterprise: true },
//         {
//           name: "Community support",
//           free: true,
//           teams: true,
//           enterprise: true,
//         },
//         { name: "GitHub Pages", free: true, teams: true, enterprise: true },
//         { name: "Deployment", free: true, teams: true, enterprise: true },
//         {
//           name: "Package registries",
//           free: "Limited",
//           teams: true,
//           enterprise: true,
//         },
//       ],
//     },
//   ];

//   const renderFeatureValue = (value: string | boolean) => {
//     if (typeof value === "boolean") {
//       return value ? (
//         <FaCheck className="w-5 h-5 text-green-500 mx-auto" />
//       ) : (
//         <FaTimes className="w-5 h-5 text-gray-500 mx-auto" />
//       );
//     }
//     return <span className="text-sm text-gray-300">{value}</span>;
//   };

//   return (
//     <div className="min-h-screen bg-black text-white">
//       {/* Header */}
//       <div className="container mx-auto px-6 py-8">
//         {/* Hero Section */}
//         <div
//           style={{ backgroundImage: `url(${Pricing.src})` }}
//           className="text-center bg-contain mb-16"
//         >
//           <div className="relative w-full flex justify-center items-center">
//             <div className="absolute top-0 blur-2xl animate-pulse w-[10%] h-full bg-[#6f00573a]"></div>
//             <div>
//               <h1 className="text-5xl leading-tight font-bold mb-12">
//                 <span className="text-[#4e4e4e]">Discover</span> Products
//                 <br />
//                 With the Best Pricing
//               </h1>
//               <p className="text-[16px] text-[#f1f1f17f] mb-8 max-w-2xl mx-auto">
//                 Start for free and get attractive offers from our partners while
//                 being a part of something great community full of amazing people
//               </p>
//             </div>
//           </div>
//           <div className="flex justify-center">
//             <div className="flex justify-center p-1 rounded-3xl border w-fit space-x-4 mb-8">
//               <button
//                 onClick={() => setBillingPeriod("monthly")}
//                 className={`px-8 py-3 rounded-[20px] font-medium transition-all ${
//                   billingPeriod === "monthly"
//                     ? "bg-white text-black"
//                     : "text-gray-300 hover:text-white"
//                 }`}
//               >
//                 Monthly
//               </button>
//               <button
//                 onClick={() => setBillingPeriod("yearly")}
//                 className={`px-8 py-3 rounded-[20px] font-medium transition-all ${
//                   billingPeriod === "yearly"
//                     ? "bg-white text-black"
//                     : "text-gray-300 hover:text-white"
//                 }`}
//               >
//                 Yearly
//                 <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
//                   Save 20%
//                 </span>
//               </button>
//             </div>
//           </div>
//           {/* Site Count Selector */}
//           <div className="flex justify-center mb-12">
//             <div className="border-b border-[#4d4d4d4e] p-2 flex space-x-2">
//               {siteOptions.map((option) => (
//                 <button
//                   key={option.value}
//                   onClick={() => setSiteCount(option.value)}
//                   className={`px-6 py-2 rounded-lg font-medium transition-all ${
//                     siteCount === option.value
//                       ? " text-white"
//                       : "text-[#afafafb0] hover:text-white"
//                   }`}
//                 >
//                   {option.label}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Pricing Cards */}
//         <div className="flex justify-center gap-4 mb-20">
//           {plans.map((plan, index) => (
//             <div
//               key={index}
//               className={`rounded-3xl duration-150 p-8 w-[350px] ${
//                 plan.popular
//                   ? "bg-[#fffff10] border border-[#f94cff] bg-gradient-to-tl from-[#f94cff3e] to-[#f94cff05] hover:scale-105"
//                   : "bg-[#fffff10] bg-gradient-to-tl from-[#f94cff1e] to-[#f94cff05] border-[#f94cff1a]"
//               }`}
//             >
//               <div className="text-left mb-8">
//                 <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
//                 <div className="mb-2">
//                   <span className="text-4xl font-bold">
//                     $
//                     {plan.name === "Free"
//                       ? "0"
//                       : getPrice(plan.basePrice, billingPeriod, siteCount)}
//                   </span>
//                   {plan.period && (
//                     <span className="text-gray-400 ml-2">/ {plan.period}</span>
//                   )}
//                 </div>
//                 {plan.name !== "Free" && billingPeriod === "yearly" && (
//                   <div className="text-sm text-green-400 mb-4">
//                     Save $
//                     {Math.round(
//                       getPrice(plan.basePrice, "monthly", siteCount) * 2
//                     )}{" "}
//                     annually
//                   </div>
//                 )}
//                 {plan.name !== "Free" && (
//                   <div className="text-sm text-gray-400 mb-6">
//                     For {siteCount} {siteCount === 1 ? "site" : "sites"}
//                   </div>
//                 )}
//                 <button
//                   className={`w-full py-3 rounded-3xl font-medium transition-all ${
//                     plan.popular
//                       ? "bg-white text-purple-600 hover:bg-gray-100"
//                       : "bg-purple-600 text-white hover:bg-purple-700"
//                   }`}
//                 >
//                   Get Started
//                 </button>
//               </div>
//               <div>
//                 <h4 className="font-semibold mb-4">What you will get:</h4>
//                 <ul className="space-y-3">
//                   {plan.features.map((feature, featureIndex) => (
//                     <li key={featureIndex} className="flex items-center">
//                       <FaCheck className="w-4 h-4 text-green-500 mr-3" />
//                       <span className="text-sm">{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Comparison Section */}
//         <div className="mb-20">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4">
//               Two solutions to make the life of a designer, simple.
//             </h2>
//             <p className="text-gray-300">
//               Whether you&apos;re looking to build your portfolio, or find your
//               next freelance client — we have a plan for you.
//             </p>
//           </div>

//           <div className="bg-[#0d0d0d57] rounded-xl overflow-hidden">
//             {/* Plan Headers */}
//             <div className="grid grid-cols-4 gap-0 border-b border-[#3737373b]">
//               <div className="p-6"></div>
//               {comparisonPlans.map((plan, index) => (
//                 <div
//                   key={index}
//                   className="p-6 text-center border-l border-[#37373736]"
//                 >
//                   <h3 className="font-semibold text-lg mb-2">{plan.name}</h3>
//                   <div className="mb-4">
//                     <span className="text-2xl font-bold">{plan.price}</span>
//                     <div className="text-xs text-gray-400 mt-1">
//                       {plan.period}
//                     </div>
//                   </div>
//                   <button
//                     className={`w-full py-2 rounded-3xl text-sm font-medium ${
//                       index === 1
//                         ? "bg-white text-black"
//                         : "border border-[#37373737] text-gray-300"
//                     }`}
//                   >
//                     {index === 1 ? "Continue with Teams" : "Get Started"}
//                   </button>
//                 </div>
//               ))}
//             </div>

//             {/* Feature Categories */}
//             {featureCategories.map((category, categoryIndex) => (
//               <div key={categoryIndex}>
//                 <div className="bg-[#2121211d] p-4">
//                   <h4 className="font-semibold">{category.category}</h4>
//                 </div>
//                 {category.features.map((feature, featureIndex) => (
//                   <div
//                     key={featureIndex}
//                     className="grid grid-cols-4 gap-4 border-b border-[#37373737]"
//                   >
//                     <div className="p-4 text-sm">{feature.name}</div>
//                     <div className="p-4 text-center border-l border-[#37373737]">
//                       {renderFeatureValue(feature.free)}
//                     </div>
//                     <div className="p-4 text-center border-l border-[#37373737]">
//                       {renderFeatureValue(feature.teams)}
//                     </div>
//                     <div className="p-4 text-center border-l border-[#37373737]">
//                       {renderFeatureValue(feature.enterprise)}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PricingPage;
"use client";
import React, { useEffect, useRef, useState } from "react";

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
    <section className="text-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-black">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
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
                className={`p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl h-full relative overflow-hidden ${
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
                        className={`flex items-start gap-2 sm:gap-3 transform transition-all duration-500 ${
                          visibleCards.includes(idx)
                            ? "translate-x-0 opacity-100"
                            : "translate-x-4 opacity-0"
                        }`}
                        style={{ transitionDelay: `${idx * 150 + i * 50}ms` }}
                      >
                        <span className="text-green-400 text-base sm:text-lg flex-shrink-0 mt-0.5">
                          ✓
                        </span>
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
