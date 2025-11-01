"use client";
import React, { useState } from "react";
import { FiCheck } from "react-icons/fi";

interface Step2WhatYourRoleProps {
  onNext: (selectedRoles: string[]) => void;
  onBack: () => void;
  onSkip?: () => void;
}

const roles = [
  "A Designer",
  "A Developer",
  "A Content Creator / Marketer",
  "A Business Owner / Entrepreneur",
  "A Student / Learner",
  "Other",
];

const Step2WhatYourRole: React.FC<Step2WhatYourRoleProps> = ({
  onNext,
  onBack,
  onSkip,
}) => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleNext = () => {
    onNext(selectedRoles);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[60vh] px-4">
      {/* Progress Indicator */}
      <div className="text-white/70 text-sm mb-8">1/3</div>

      {/* Title */}
      <h1 className="text-4xl sm:text-[22px] font-bold text-white text-center mb-4">
        What&apos;s Your Role?
      </h1>

      {/* Description */}
      <p className="text-white/60 text-[20px] sm:text-base text-center mb-12 max-w-2xl">
        This helps us personalize your experience and tailor AI recommendations
        for your workflow.
      </p>

      {/* Role Selection Grid */}
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {roles.map((role) => {
          const isSelected = selectedRoles.includes(role);
          return (
            <button
              key={role}
              onClick={() => toggleRole(role)}
              className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? "border-white bg-white/10"
                  : "border-white/20 bg-white/5 hover:border-white/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-medium text-base sm:text-[20px]">
                  {role}
                </span>
                <div
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    isSelected
                      ? "border-white bg-white"
                      : "border-white/40 bg-transparent"
                  }`}
                >
                  {isSelected && (
                    <FiCheck className="w-4 h-4 text-black font-bold" />
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
              onClick={onSkip}
              className="text-white/70 hover:text-white text-sm transition-colors"
            >
              Skip
            </button>
          )}
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-white/90 text-black rounded-full font-medium hover:bg-white transition-colors flex items-center gap-2"
          >
            <span>Next</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2WhatYourRole;
