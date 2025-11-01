"use client";
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import axios from "axios";
import { NEXT_PUBLIC_API } from "@/app/utils/config";
import { useAuthContext } from "@/app/utils/auth";

interface GuideContextType {
  currentStep: number;
  showGuide: boolean;
  chatIconRef: React.RefObject<HTMLElement | null>;
  workflowButtonRef: React.RefObject<HTMLElement | null>;
  publishButtonRef: React.RefObject<HTMLElement | null>;
  handleSkip: () => void;
  handleNext: () => void;
}

export const GuideContext = createContext<GuideContextType | undefined>(
  undefined
);

export const GuideProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showGuide, setShowGuide] = useState(false); // Start as false, will be set after API call
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const chatIconRef = useRef<HTMLElement | null>(null);
  const workflowButtonRef = useRef<HTMLElement | null>(null);
  const publishButtonRef = useRef<HTMLElement | null>(null);
  const { data } = useAuthContext();

  // Fetch guide status from backend API
  useEffect(() => {
    const fetchGuideStatus = async () => {
      try {
        const userId = data?._id || data?.user?._id;
        if (userId) {
          const response = await axios.get(
            `${NEXT_PUBLIC_API}/guide-status/${userId}`
          );

          if (response.data.success && response.data.data) {
            // Show guide if user has NOT seen it (hasSeenGuide is false)
            setShowGuide(!response.data.data.hasSeenGuide);
          }
        }
      } catch (error) {
        console.error("Error fetching guide status:", error);
        // On error, default to showing the guide (first-time visitor)
        setShowGuide(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (data) {
      fetchGuideStatus();
    } else {
      setIsLoading(false);
    }
  }, [data]);

  const handleSkip = async () => {
    try {
      // Send true to backend API instantly when skipped
      const userId = data?._id || data?.user?._id;
      if (userId) {
        await axios.post(`${NEXT_PUBLIC_API}/mark-guide-seen`, {
          userId,
          skipped: true,
        });
      }
    } catch (error) {
      console.error("Error marking guide as skipped:", error);
    }
    setShowGuide(false);
  };

  const handleNext = async () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Last step - call mark-guide-seen API
      try {
        const userId = data?._id || data?.user?._id;
        if (userId) {
          await axios.post(`${NEXT_PUBLIC_API}/mark-guide-seen`, {
            userId,
          });
        }
      } catch (error) {
        console.error("Error marking guide as seen:", error);
      }
      setShowGuide(false);
    }
  };

  return (
    <GuideContext.Provider
      value={{
        currentStep,
        showGuide,
        chatIconRef,
        workflowButtonRef,
        publishButtonRef,
        handleSkip,
        handleNext,
      }}
    >
      {children}
    </GuideContext.Provider>
  );
};

export const useGuide = () => {
  const context = useContext(GuideContext);
  if (context === undefined) {
    throw new Error("useGuide must be used within a GuideProvider");
  }
  return context;
};
