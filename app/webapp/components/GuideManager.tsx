"use client";
import React, { useState, useEffect } from "react";
import { useGuide } from "../contexts/GuideContext";
import GuideTooltip from "./GuideTooltip";
import { usePathname } from "next/navigation";

const GuideManager: React.FC = () => {
  const {
    currentStep,
    showGuide,
    chatIconRef,
    workflowButtonRef,
    publishButtonRef,
    handleSkip,
    handleNext,
  } = useGuide();
  const pathname = usePathname();
  const [displayStep, setDisplayStep] = useState(currentStep);
  const [isVisible, setIsVisible] = useState(true);

  // Handle smooth transitions between steps
  useEffect(() => {
    if (currentStep !== displayStep) {
      // Fade out current tooltip
      setIsVisible(false);
      // Wait for fade out, then switch to new step and fade in
      const timeout = setTimeout(() => {
        setDisplayStep(currentStep);
        setIsVisible(true);
      }, 300); // Transition duration
      return () => clearTimeout(timeout);
    } else if (currentStep === displayStep && !isVisible) {
      // Ensure visibility is true when step matches
      setIsVisible(true);
    }
  }, [currentStep, displayStep, isVisible]);

  // Only show guides on the main webapp page
  if (!showGuide || pathname !== "/webapp") {
    return null;
  }

  if (displayStep === 1) {
    return (
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <GuideTooltip
          step={1}
          onSkip={handleSkip}
          onNext={handleNext}
          position="right"
          targetRef={chatIconRef}
        />
      </div>
    );
  }

  if (displayStep === 2) {
    return (
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <GuideTooltip
          step={2}
          onSkip={handleSkip}
          onNext={handleNext}
          position="bottom"
          targetRef={workflowButtonRef}
        />
      </div>
    );
  }

  if (displayStep === 3) {
    return (
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <GuideTooltip
          step={3}
          onSkip={handleSkip}
          onNext={handleNext}
          position="bottom-left"
          targetRef={publishButtonRef}
        />
      </div>
    );
  }

  return null;
};

export default GuideManager;
