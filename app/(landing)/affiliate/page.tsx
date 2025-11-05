import React from "react";
import { CiCircleCheck } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";

export default function AffiliatePage() {
  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="text-center flex items-center justify-center flex-col mb-12 sm:mb-16">
          <p className="px-6 py-2 border w-fit bg-gradient-to-r from-[#1A1A1A] to-[rgba(255,255,255,0.06)] border-[#333] rounded-full hover:bg-white/20 transition-all">
            Join the Webivus AI Affiliate Program
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-4 mb-4 sm:mb-6 font-medium bg-gradient-to-r from-[#fff] to-[#d9d9d9] bg-clip-text text-transparent px-4 leading-tight">
            No Approval wait. No limits. Just Growth.
          </h1>
          <p className="text-[#C5C5C5] text-base sm:text-lg max-w-2xl sm:max-w-3xl mx-auto mb-8 sm:mb-10 px-2">
            Help CMS users save time. Partner with Webivus AI — the all-in-one
            AI platform that automates CMS management, building, content
            creation, SEO, and debugging. Help businesses build and scale
            smarter websites — and earn passive income.
          </p>
          <button className="bg-[#2C2D30] hover:bg-gray-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-medium inline-flex items-center gap-2 sm:gap-3 transition-all duration-300 hover:scale-105 text-sm sm:text-base">
            Become a Partner
            <FaArrowRight className="text-xs sm:text-sm" />
          </button>
        </div>

        {/* How It Works Section */}
        <div className="mt-24 sm:mt-32 mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-medium text-center mb-10 sm:mb-16">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Step 1 */}
            <div className="bg-[#2c2d304d] rounded-3xl bg-opacity-50 p-6 sm:px-8 border border-[#ffffff30] hover:border-gray-600 transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-medium mb-3 sm:mb-4">
                Step 1: Sign Up
              </h3>
              <p className="text-[#C5C5C5] mb-4 sm:mb-6 text-sm sm:text-base">
                Create your free Webivus affiliate account
              </p>
              <p className="text-[#fff] leading-relaxed text-sm sm:text-base">
                Join in minutes and get access to your dashboard, tracking
                tools, and personalized referral links.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#2c2d304d] rounded-3xl bg-opacity-50 p-6 sm:px-8 border border-[#ffffff30] hover:border-gray-600 transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-medium mb-3 sm:mb-4">
                Step 2: Share
              </h3>
              <p className="text-[#C5C5C5] mb-4 sm:mb-6 text-sm sm:text-base">
                Promote Webivus with your unique link
              </p>
              <p className="text-[#fff] leading-relaxed text-sm sm:text-base">
                Share Webivus with creators, businesses, and agencies through
                your content, community, or social platforms.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#2c2d304d] rounded-3xl bg-opacity-50 p-6 sm:px-8 border border-[#ffffff30] hover:border-gray-600 transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-medium mb-3 sm:mb-4">
                Step 3: Track Performance
              </h3>
              {/* <p className="text-[#C5C5C5] mb-4 sm:mb-6 text-sm sm:text-base">
                Monitor your referrals and conversions in real-time
              </p> */}
              <p className="text-[#fff] leading-relaxed text-sm sm:text-base">
                Monitor your referrals and conversions in real-time
              </p>
            </div>
            {/* Step 4 */}
            <div className="bg-[#2c2d304d] rounded-3xl bg-opacity-50 p-6 sm:px-8 border border-[#ffffff30] hover:border-gray-600 transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-medium mb-3 sm:mb-4">
                Step 4: Earn Rewards
              </h3>
              {/* <p className="text-[#C5C5C5] mb-4 sm:mb-6 text-sm sm:text-base">
                Get 25% recurring commission on every referral
              </p> */}
              <p className="text-[#fff] leading-relaxed text-sm sm:text-base">
                Get rewarded for every successful referral. Our smart AI-driven
                platform ensures top retention and conversions.
              </p>
            </div>
          </div>
        </div>

        {/* Why Join Section */}
        <div className="mt-24 sm:mt-32 mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-medium text-center mb-10 sm:mb-16">
            Why Partner with Webivus?
          </h2>
          <p className="text-sm sm:text-md font-medium text-center mb-10 sm:mb-16">
            Join our affiliate program and grow your income by promoting the
            future of CMS – an AI-powered multi-agent platform that helps users
            manage, optimize, and troubleshoot their WordPress sites
            effortlessly.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 sm:gap-x-16 gap-y-6 sm:gap-y-8 max-w-3xl sm:max-w-4xl mx-auto px-2">
            {[
              "25% lifetime recurring commission",
              "AI-powered CMS automation",
              "High customer retention",
              "60-day referral tracking",
              "Real-time analytics dashboard",
              "Priority affiliate support",
              "High Conversion rate",
              "Good commission and reliable payouts",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3 sm:gap-4">
                <CiCircleCheck className="text-white text-lg sm:text-3xl mt-0.5 flex-shrink-0" />
                <h3 className="text-base sm:text-xl font-medium">{text}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 sm:mt-32 text-center py-16 sm:py-20">
          <h2 className="text-3xl sm:text-4xl font-medium mb-4 sm:mb-6">
            Start Earning with Webivus AI Today
          </h2>
          <p className="text-[#C5C5C5] text-base sm:text-lg mb-8 sm:mb-10 px-3">
            Join our affiliate program and grow your income by promoting the
            future of CMS automation.
          </p>
          <button className="bg-[#2C2D30] hover:bg-gray-100 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105">
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
}
