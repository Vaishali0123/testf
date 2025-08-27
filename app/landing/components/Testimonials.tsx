"use client";
import React, { useState } from "react";
// import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface TaskCard {
  id: number;
  label: string;
  title: string;
  category: string;
}

const DailyTasksSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const tasks: TaskCard[] = [
    {
      id: 1,
      label: "AUTODIDARTE STYLES",
      title: "Switch the font to Inter.",
      category: "AUTODIDARTE STYLES",
    },
    {
      id: 2,
      label: "AUTODIDARTE STYLES",
      title: "Remove the rounded corners from the photo avatars.",
      category: "AUTODIDARTE STYLES",
    },
    {
      id: 3,
      label: "AUTODIDARTE STYLES",
      title: "Make the colors green instead of blue.",
      category: "AUTODIDARTE STYLES",
    },
    {
      id: 4,
      label: "AUTODIDARTE STYLES",
      title: "Hide the navigation from the sidebar.",
      category: "AUTODIDARTE STYLES",
    },
    {
      id: 5,
      label: "AUTODIDARTE STYLES",
      title: "Adjust the spacing between elements.",
      category: "AUTODIDARTE STYLES",
    },
    {
      id: 6,
      label: "AUTODIDARTE STYLES",
      title: "Change the button hover effects.",
      category: "AUTODIDARTE STYLES",
    },
  ];

  const itemsPerPage = 4;
  const maxIndex = Math.max(0, tasks.length - itemsPerPage);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className=" py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[26px] text-[#b9b9b9] font-light mb-4">
            Complete daily design tasks using only{" "}
            <span className="text-white font-medium">your voice.</span>
          </h2>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-end mb-8">
          <div className="flex gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="p-2 border border-gray-700 hover:border-gray-500 transition-colors rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-700"
            >
              <FaChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="p-2 border border-gray-700 hover:border-gray-500 transition-colors rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-700"
            >
              <FaChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Task Cards */}
        <div className="overflow-hidden py-4">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {tasks.map((task) => (
              <div key={task.id} className="w-1/4 flex-shrink-0 px-3">
                <div className="h-[1px] scale-95 bg-[radial-gradient(circle_at_center,_#959595,_#1e1e1e)]"></div>

                <div className="bg-gradient-to-tl from-[#d9d9d900] via-[#7373730d] to-[#73737333] border rounded-lg p-6 hover:border-gray-600 transition-colors group cursor-pointer h-full">
                  {/* Category Label */}
                  <div className="mb-4">
                    <span className="neon-heading text-xs font-medium tracking-wider uppercase">
                      {task.label}
                    </span>
                  </div>

                  {/* Task Title */}
                  <h3 className="text-white text-lg font-medium leading-tight group-hover:text-gray-200 transition-colors">
                    {task.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyTasksSection;
