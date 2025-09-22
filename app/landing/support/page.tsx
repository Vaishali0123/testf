"use client";
import React, { useState } from "react";
import { FiSearch, FiHelpCircle, FiUsers, FiHeadphones } from "react-icons/fi";

const Page: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", searchQuery);
  };

  const quickActions = [
    { label: "Get more space", href: "#" },
    { label: "Share a file or folder", href: "#" },
    { label: "Reset your password", href: "#" },
  ];

  const supportSections = [
    {
      icon: FiHelpCircle,
      title: "FAQs",
      description:
        "Find answers to frequently asked questions from our customers.",
      buttonText: "Create a ticket",
      buttonAction: () => console.log("Create ticket"),
      iconBg: "bg-pink-500",
    },
    {
      icon: FiUsers,
      title: "Community",
      description:
        "Connect with our community ask questions and solve problems.",
      buttonText: "Submit a question",
      buttonAction: () => console.log("Submit question"),
      iconBg: "bg-purple-500",
    },
    {
      icon: FiHeadphones,
      title: "Support desk",
      description:
        "One-to-one professional technical support for corporate customers.",
      buttonText: "Send a message",
      buttonAction: () => console.log("Send message"),
      iconBg: "bg-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-6">How can we help you?</h1>
          <p className="text-white text-lg mb-12 max-w-3xl mx-auto">
            Search for help from support articles, product documentation,
            community.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="relative max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Write a question or problem"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pr-14 bg-[#181818] border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-white transition-colors"
              >
                <FiSearch className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {quickActions.map((action, index) => (
              <a
                key={index}
                href={action.href}
                className="px-6 py-1 bg-[#181818] hover:bg-gray-700 rounded-full text-sm text-gray-300 hover:text-white transition-colors "
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>

        {/* Support Sections */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {supportSections.map((section, index) => (
            <div key={index} className="relative">
              {/* Background Card */}
              <div className="bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-purple-900/20 rounded-3xl p-8 h-full  backdrop-blur-sm">
                {/* Icon */}
                <div className="mb-6">
                  <div
                    className={`w-16 h-16 ${section.iconBg} rounded-full flex items-center justify-center`}
                  >
                    <section.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
                  <p className="text-gray-300 text-base leading-relaxed">
                    {section.description}
                  </p>
                </div>

                {/* Action Button */}
                <button
                  onClick={section.buttonAction}
                  className="w-full px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors"
                >
                  {section.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
