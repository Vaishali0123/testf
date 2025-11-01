"use client";
import React from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { GoWorkflow } from "react-icons/go";
import { GoGlobe } from "react-icons/go";
import { MdWatchLater } from "react-icons/md";

interface GuideTooltipProps {
  step: number;
  onSkip: () => void;
  onNext: () => void;
  position: "right" | "bottom" | "bottom-left";
  targetRef?: React.RefObject<HTMLElement | null>;
}

const guideData = [
  {
    icon: <IoChatbubbleEllipsesOutline className="w-6 h-6" />,
    title: "Chat Naturally",
    description:
      "Type what you want in plain English. Or speak it. Webivus understands both.",
    label: "Quick Tips",
  },
  {
    icon: <GoWorkflow className="w-6 h-6" />,
    title: "View Project Details",
    description: "Here you can see current details of project running.",
    label: "Quick Tips",
  },
  {
    icon: <MdWatchLater className="w-6 h-6" />,
    title: "Watch & Approve",
    description:
      "Review of the proposed changes. Click approve. Watch your site transform in real time.",
    label: "Quick Tips",
  },
];

const GuideTooltip: React.FC<GuideTooltipProps> = ({
  step,
  onSkip,
  onNext,
  position,
  targetRef,
}) => {
  const data = guideData[step - 1];
  const [tooltipPosition, setTooltipPosition] = React.useState({
    top: 0,
    left: 0,
  });

  React.useEffect(() => {
    if (targetRef?.current) {
      const updatePosition = () => {
        const rect = targetRef.current!.getBoundingClientRect();
        const minTopMargin = 80; // Minimum margin from top to avoid browser bar
        const viewportHeight = window.innerHeight;

        if (position === "right") {
          // Align the icon/title area with the chat icon center
          // The tooltip icon is 48px (w-12 h-12), so we align its center
          // The icon container starts at p-6 (24px) from top, and icon is 48px tall
          // So icon center is at: 24px + 24px = 48px from tooltip top
          const chatIconCenter = rect.top + rect.height / 2;
          const tooltipIconCenterOffset = 24 + 24; // padding-top (p-6) + half icon height (h-12/2)
          let calculatedTop = chatIconCenter - tooltipIconCenterOffset;

          // Ensure tooltip doesn't go behind browser bar
          if (calculatedTop < minTopMargin) {
            calculatedTop = minTopMargin;
          }

          // Ensure tooltip doesn't go below viewport (approximate tooltip height ~200px)
          const tooltipHeight = 200; // Approximate height
          if (calculatedTop + tooltipHeight > viewportHeight) {
            calculatedTop = viewportHeight - tooltipHeight - 20; // 20px margin from bottom
          }

          setTooltipPosition({
            top: calculatedTop,
            left: rect.right + 20,
          });
        } else if (position === "bottom") {
          setTooltipPosition({
            top: rect.bottom + 15,
            left: rect.left + rect.width / 2,
          });
        } else if (position === "bottom-left") {
          setTooltipPosition({
            top: rect.bottom + 15,
            left: rect.right,
          });
        }
      };

      // Small delay to ensure element is rendered
      const timeoutId = setTimeout(updatePosition, 100);
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);

      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener("scroll", updatePosition);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [targetRef, position]);

  // Calculate pointer position based on position prop
  const pointerClass =
    position === "right"
      ? "absolute left-0 top-[48px] -translate-x-full"
      : "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full";

  const pointerDirection =
    position === "right"
      ? "border-l-[12px] border-t-[8px] border-b-[8px] border-t-transparent border-b-transparent border-l-[#1A1A1A]"
      : "border-t-[12px] border-l-[8px] border-r-[8px] border-l-transparent border-r-transparent border-t-[#1A1A1A]";

  return (
    <div
      className="fixed z-[200] pointer-events-none"
      style={{
        top: `${tooltipPosition.top}px`,
        left: `${tooltipPosition.left}px`,
        transform:
          position === "right"
            ? "none"
            : position === "bottom-left"
            ? "translateX(-100%)"
            : "translateX(-50%)",
      }}
    >
      {/* Pointer - Left side for right position, top for others */}
      <div className={pointerClass}>
        <div
          className={`w-0 h-0 ${pointerDirection} ${
            position === "right"
              ? "shadow-[-2px_0_4px_rgba(147,51,234,0.3)]"
              : "shadow-[0_-2px_4px_rgba(147,51,234,0.3)]"
          }`}
        />
      </div>

      {/* Tooltip Container */}
      <div className="relative bg-[#1A1A1A] border border-[#6f00573a] rounded-2xl shadow-2xl shadow-purple-500/20 p-6 w-[320px] pointer-events-auto">
        {/* Icon and Title Section */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0 text-purple-400">
            {data.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-2">{data.title}</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              {data.description}
            </p>
          </div>
        </div>

        {/* Quick Tips Label and Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-[#333]">
          <span className="text-sm text-white">{data.label}</span>
          <div className="flex gap-2">
            <button
              onClick={onSkip}
              className="px-4 py-2 rounded-lg bg-transparent border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors"
            >
              Skip
            </button>
            <button
              onClick={onNext}
              className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideTooltip;
