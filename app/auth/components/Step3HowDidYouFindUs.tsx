"use client";
import React, { useState } from "react";

interface Step3HowDidYouFindUsProps {
  onFinish: (selectedOptions: string[]) => void;
  onBack: () => void;
  onSkip?: () => void;
}

const options = [
  "A Friend Or Colleague",
  "Google Search",
  "Social Media (E.G., X, Instagram, Facebook)",
  "Podcast & Ad",
  "Other",
];

const Step3HowDidYouFindUs: React.FC<Step3HowDidYouFindUsProps> = ({
  onFinish,
  onBack,
  onSkip,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const handleFinish = () => {
    onFinish(selectedOptions);
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[60vh] px-4">
      {/* Progress Indicator */}
      <div className="text-white/70 text-sm mb-8">2/3</div>

      {/* Title */}
      <h1 className="text-4xl sm:text-[22px] font-bold text-white text-center mb-4">
        How Did You Find Us?
      </h1>

      {/* Description */}
      <p className="text-white/60 text-[20px] sm:text-base text-center mb-12 max-w-2xl">
        We&apos;re curious! Let us know what brought you here.
      </p>

      {/* Options Grid */}
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {options.map((option) => {
          const isSelected = selectedOptions.includes(option);
          return (
            <button
              key={option}
              onClick={() => toggleOption(option)}
              className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? "border-white bg-white/10"
                  : "border-white/20 bg-white/5 hover:border-white/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-medium text-base sm:text-[18px]">
                  {option}
                </span>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    isSelected
                      ? "border-transparent bg-gradient-to-br from-purple-500 to-pink-500"
                      : "border-white/40 bg-transparent"
                  }`}
                >
                  {isSelected && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="w-full max-w-4xl flex items-center justify-between mt-8">
        <button
          onClick={onBack}
          className="text-white/70 hover:text-white text-sm transition-colors"
        >
          Back
        </button>

        <div className="flex items-center gap-4">
          {onSkip && (
            <button
              onClick={handleSkip}
              className="text-white/70 hover:text-white text-sm transition-colors"
            >
              Skip
            </button>
          )}
          <button
            onClick={handleFinish}
            className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3HowDidYouFindUs;
