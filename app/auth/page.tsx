"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { NEXT_PUBLIC_API } from "../utils/config";
import { useAuthContext, UserData } from "../utils/auth";
import toast, { Toaster } from "react-hot-toast";
import Bg from "../../public/bgs.png";
import dot from "../../public/Dot.svg";

import { FaDiscord, FaGithub, FaGoogle } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { RiGroupLine } from "react-icons/ri";
import { GoShieldCheck, GoVerified } from "react-icons/go";
import { TypingAnimation } from "../(landing)/components/TypingAnimation";
import Step1ConnectWordPress from "./components/Step1ConnectWordPress";
import Step2WhatYourRole from "./components/Step2WhatYourRole";
import Step3HowDidYouFindUs from "./components/Step3HowDidYouFindUs";
import ForgotPasswordFlow from "./components/ForgotPasswordFlow";
import Logo from "../(landing)/components/Logo";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";

interface PageProps {
  text?: string;
  speed?: number;
  delay?: number;
}

const Page = ({ text, speed = 100, delay = 0 }: PageProps) => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const { setData, setAuth } = useAuthContext();
  const [message, setMessage] = useState("");
  const [displayedText, setDisplayedText] = useState("");

  // Onboarding flow state
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [onboardingData, setOnboardingData] = useState<{
    siteUrl?: string;
    roles?: string[];
    findUs?: string[];
    userId?: string;
    userEmail?: string;
  }>({});
  const [showSignupConfirm, setShowSignupConfirm] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loadinglogin, setLoadinglogin] = useState(false);

  useEffect(() => {
    if (!text) return;

    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const startTyping = () => {
      const type = () => {
        if (currentIndex < text?.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
          timeoutId = setTimeout(type, speed);
        }
      };
      timeoutId = setTimeout(type, delay);
    };

    startTyping();

    return () => clearTimeout(timeoutId);
  }, [text, speed, delay]);

  const handleAuth = async () => {
    if (!validateEmail(email)) return setMessage("Please enter a valid email");

    try {
      // First, try login
      const res = await axios.post(
        `${NEXT_PUBLIC_API}/login`,
        { email, password },
        { withCredentials: true }
      );

      cookieSetter(res.data.data, res.data.token);
      router.push("/webapp");
    } catch (err) {
      console.log(err);
      // if (err.response?.status === 404) {
      //   // User not found → signup
      //   try {
      //     const resSignup = await axios.post(
      //       `${NEXT_PUBLIC_API}/signup`,
      //       { email, password },
      //       { withCredentials: true }
      //     );
      //     cookieSetter(resSignup.data.data, resSignup.data.token);
      //     router.push("/webapp");
      //   } catch (signupErr: any) {
      //     setMessage(signupErr.response?.data?.message || "Signup failed");
      //   }
      // } else if (err.response?.status === 401) {
      //   setMessage("Incorrect password");
      // } else {
      //   setMessage("Server error");
      // }
    }
  };

  const cookieSetter = (data: UserData, token: string) => {
    try {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 30);

      Cookies.set("authToken", token, { expires: expirationDate });
      setData(data);
      setAuth(true);
      // toast.success("Login successful!");
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogin = async () => {
    if (loadinglogin) return;
    try {
      setLoadinglogin(true);
      const res = await axios.post(
        `${NEXT_PUBLIC_API}/login`,
        { email, password },
        { withCredentials: true }
      );
      // console.log(res?.data, "resnkj");
      if (res.data.success) {
        toast.success("Login successful!");
        cookieSetter(res.data.data, res.data.token);
        router.push("/webapp");
      } else {
        // Show confirmation popup instead of directly signing up
        setShowSignupConfirm(true);
      }
      setLoadinglogin(false);
    } catch (err) {
      if ((err as AxiosError)?.response?.status === 401) {
        toast.error("Incorrect password");
      }
      // Check if it's a 404 or similar error indicating account doesn't exist
      else if ((err as AxiosError)?.response?.status === 404) {
        setShowSignupConfirm(true);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const handleConfirmSignup = () => {
    setShowSignupConfirm(false);
    setCurrentStep(1);
    // handleSubmit();
  };
  //  Email validation function
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const handleSubmit = async () => {
    // e.preventDefault();
    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        `${NEXT_PUBLIC_API}/signup`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Signup successful!");
        cookieSetter(res.data.data, res.data.token);
        // Start onboarding flow - Step 1: What's Your Role?
        setCurrentStep(1);
        // Save email to sessionStorage
        // sessionStorage.setItem("userEmail", email);

        // Redirect to /multisiteconnect
        // router.push("/webapp");
      } else {
        toast.error(res.data.message || "Something went wrong");
        // setMessage(res.data.message || "Something went wrong");
      }
    } catch (err) {
      setMessage("Error signing up");
    } finally {
      setLoading(false);
    }
  };

  const lines = [
    "Multi-Agent Orchestration",
    "Secure Plugin Connection",
    "Built-in Security",
  ];

  // Handle onboarding step navigation
  // Step 1: What's Your Role?
  const handleStep1Next = (roles: string[]) => {
    setOnboardingData((prev) => ({ ...prev, roles }));
    setCurrentStep(2);
  };

  // Step 2: How Did You Find Us? - Signup happens here
  const handleStep2Next = async (findUs: string[]) => {
    setOnboardingData((prev) => ({ ...prev, findUs }));
    // Perform signup when user clicks Next or Skip on step 2
    await performSignup();
  };

  const handleStep2Skip = async () => {
    // Perform signup on skip as well
    await performSignup();
  };

  // Step 3: Connect WordPress (Optional Step after signup)
  const handleStep3Finish = async (siteUrl?: string) => {
    // Save site URL if provided
    if (siteUrl) {
      try {
        const userId = onboardingData.userId;
        const userEmail = onboardingData.userEmail || email;
        if (userId && userEmail) {
          await axios.post(`${NEXT_PUBLIC_API}/site`, {
            email: userEmail,
            userId: userId,
            site_url: siteUrl,
          });
        }
      } catch (err) {
        console.error("Error saving site:", err);
      }
    }
    // Redirect to webapp
    router.push("/webapp");
  };

  const handleStep3Skip = async () => {
    // Skip connecting WordPress, go to webapp
    router.push("/webapp");
  };

  const performSignup = async () => {
    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${NEXT_PUBLIC_API}/signup`,
        {
          email,
          password,
          roles: onboardingData.roles || [],
          findUs: onboardingData.findUs || [],
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Signup successful!");
        cookieSetter(res.data.data, res.data.token);

        // Store user data for step 3 (WordPress connection)
        setOnboardingData((prev) => ({
          ...prev,
          userId: res.data.data?.user?._id || res.data.data?._id,
          userEmail: res.data.data?.user?.email || res.data.data?.email,
        }));

        // Move to step 3 (Connect WordPress) instead of redirecting
        setCurrentStep(3);
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Error signing up. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStepBack = () => {
    if (currentStep && currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      setCurrentStep(null);
    }
  };

  const handleOnboardingSkip = () => {
    // For step 1 and 2, skip moves to next step
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  // Show onboarding steps if user just signed up
  if (currentStep !== null) {
    return (
      <div
        style={{
          backgroundImage: `url(${Bg.src})`,
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
        className="w-full min-h-screen p-3 sm:p-6 flex relative items-center justify-center bg-[#18191C] bg-cover text-white overflow-x-hidden"
      >
        <Toaster />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#f94cff21] via-transparent to-transparent sm:hidden"></div>

        {currentStep === 1 && (
          <Step2WhatYourRole
            onNext={handleStep1Next}
            onBack={handleStepBack}
            onSkip={handleOnboardingSkip}
          />
        )}
        {currentStep === 2 && (
          <Step3HowDidYouFindUs
            onFinish={handleStep2Next}
            onBack={handleStepBack}
            onSkip={handleStep2Skip}
          />
        )}
        {currentStep === 3 && (
          <Step1ConnectWordPress
            onNext={(siteUrl) => handleStep3Finish(siteUrl)}
            onBack={handleStepBack}
            onSkip={handleStep3Skip}
          />
        )}
      </div>
    );
  }

  // Show forgot password flow if enabled
  if (showForgotPassword) {
    console.log("Showing forgot password flow");
    return (
      <div
        style={{
          backgroundImage: `url(${Bg.src})`,
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
        className="w-full min-h-screen p-3 sm:p-6 flex relative items-center justify-center bg-[#18191C] bg-cover text-white overflow-x-hidden"
      >
        <Toaster />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#f94cff21] via-transparent to-transparent sm:hidden"></div>
        <div className="w-full flex flex-col items-center justify-center">
          <ForgotPasswordFlow
            onBack={() => {
              console.log("Going back from forgot password");
              setShowForgotPassword(false);
            }}
            initialEmail={email}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `url(${Bg.src})`,
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full min-h-screen p-3 sm:p-6 flex relative items-center justify-center bg-[#18191C] bg-cover text-white overflow-x-hidden"
    >
      <Toaster />
      <Link
        href="/"
        className="absolute flex items-center gap-2 hover:bg-white/5 hover:ring-1 duration-100 hover:ring-white/10 py-1 px-2 rounded-full text-[12px] top-2 left-2"
      >
        <IoArrowBackOutline />
        back to the landing
      </Link>
      {/* <div className="absolute -top-[30%] w-[70%] rounded-full h-[50%] bg-[#f94cff21] blur-3xl hidden sm:block"></div> */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#f94cff21] via-transparent to-transparent sm:hidden"></div>

      {/* Signup Confirmation Popup */}
      {showSignupConfirm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowSignupConfirm(false);
            }
          }}
        >
          {/* Blur backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

          {/* Modal content */}
          <div
            className="relative w-full max-w-md bg-[#1A1A1A] rounded-2xl border border-[#333] shadow-2xl overflow-hidden animate-fadeIn p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-white mb-4">
              Account Not Found
            </h3>
            <p className="text-gray-300 text-sm mb-6">
              Your account doesn&apos;t exist. Would you like to proceed with
              signing up using the same email ({email})?
            </p>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowSignupConfirm(false)}
                className="px-4 py-2 rounded-lg bg-[#2c2d30] hover:bg-[#3c3d40] text-white text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSignup}
                className="px-4 py-2 rounded-lg bg-[#F94CFF] hover:bg-[#ff55ff] text-white text-sm font-medium transition-colors"
              >
                Yes, Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-full max-w-7xl mt-10 sm:mt-0 mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12">
        {/* left */}
        <div className="w-full lg:w-[50%] flex flex-col items-center lg:items-start justify-center text-center lg:text-left order-1 lg:order-1">
          <div className="w-full max-w-lg space-y-4">
            <div className="flex items-center cursor-auto bg-gradient-to-l from-white/10 to-white/0 w-fit py-2 px-4 rounded-full gap-2 mx-auto lg:mx-0">
              <div className="-ml-2 h-[30px] w-[30px]">
                <Logo />
              </div>

              <span className="text-sm sm:text-base">
                From &quot;What now?&quot; to &quot;All set.&quot; In one chat.
              </span>
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Stop Fixing WordPress. Start Commanding It.
            </div>
          </div>
          <div className="w-full pn:max-sm:hidden max-w-lg space-y-6 sm:space-y-8 mt-6 sm:mt-10">
            {lines.map((line, idx) => (
              <div key={idx} className="space-y-2">
                {idx === 0 && (
                  <RiGroupLine className="text-[#f94cff] text-xl sm:text-2xl" />
                )}
                {idx === 1 && (
                  <GoVerified className="text-[#f94cff] text-xl sm:text-2xl" />
                )}
                {idx === 2 && (
                  <GoShieldCheck className="text-[#f94cff] text-xl sm:text-2xl" />
                )}
                <div className="text-base sm:text-lg font-medium">
                  <TypingAnimation text={line} speed={80} delay={idx * 2000} />
                </div>
                {idx === 0 && (
                  <div className="text-xs sm:text-sm text-white/60">
                    Specialized Multi AI agents collaborate like a team one
                    creates a page, another optimizes it, another checks for
                    bugs.
                  </div>
                )}
                {idx === 1 && (
                  <div className="text-xs sm:text-sm text-white/60">
                    Install the Webivus plugin, authorize once with a
                    site-specific token, and Webivus will communicate securely.
                  </div>
                )}
                {idx === 2 && (
                  <div className="text-xs sm:text-sm text-white/60">
                    Install the Webivus plugin, authorize once with a
                    site-specific token, and Webivus will communicate securely.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* right  */}
        <div className="w-full lg:w-[50%] flex flex-col relative items-center justify-center order-2 lg:order-2">
          <div
            style={{
              backgroundImage: `url(${dot.src})`,
              backgroundPosition: "bottom",
              backgroundRepeat: "no-repeat",
            }}
            className="w-full max-w-sm sm:max-w-md md:max-w-lg px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-12 lg:py-20 space-y-4 sm:space-y-6 bg-[#1F1F23] border-[#ffffff] border rounded-2xl"
          >
            <div className="w-full flex flex-col items-center justify-center">
              <div className="text-sm sm:text-base">Continue with:</div>
              <div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-center mt-4 w-full">
                <div className="flex-1 min-w-0 flex px-3 sm:px-4 text-xs sm:text-sm py-2 rounded-xl  border-[#ffffff25] border items-center justify-center gap-2 hover:bg-white/10 transition-colors cursor-pointer">
                  <FaGoogle className="text-sm sm:text-base" />
                  <span className="hidden sm:inline text-xs sm:text-sm">
                    Google
                  </span>
                </div>
                <div className="flex-1 min-w-0 flex px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-xl  border-[#ffffff25] border items-center justify-center gap-2 hover:bg-white/10 transition-colors cursor-pointer">
                  <FaGithub className="text-sm sm:text-base" />
                  <span className="hidden sm:inline text-xs sm:text-sm">
                    Github
                  </span>
                </div>
                <div className="flex-1 min-w-0 flex px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-xl  border-[#ffffff25] border items-center justify-center gap-2 hover:bg-white/10 transition-colors cursor-pointer">
                  <FaDiscord className="text-sm sm:text-base" />
                  <span className="hidden sm:inline text-xs sm:text-sm">
                    Discord
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 sm:gap-4 w-full">
              <hr className="w-full border border-white/10" />
              <div className="text-xs sm:text-sm">or</div>
              <hr className="w-full border border-white/10" />
            </div>
            <div className="text-sm sm:text-base flex flex-col gap-2">
              <div>Email</div>
              <div className="text-sm sm:text-base rounded-xl border bg-[#202225] items-center justify-center gap-2 px-3 sm:px-4 border-[#ffffff25] flex">
                <MdOutlineAccountCircle className="text-lg" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your Email"
                  className="w-full h-10 sm:h-12 pl-2 bg-transparent outline-none text-sm sm:text-base touch-manipulation"
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="text-sm sm:text-base flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div>Password</div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("Forgot password clicked");
                    setShowForgotPassword(true);
                  }}
                  className="text-xs sm:text-sm text-[#F94CFF] hover:text-[#ff55ff] hover:underline transition-colors cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="text-sm sm:text-base rounded-xl border bg-[#202225] items-center justify-center gap-2 px-3 sm:px-4 border-[#ffffff25] flex">
                <CiLock className="text-lg" />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="Password"
                  placeholder="Enter your password"
                  className="w-full h-10 sm:h-12 pl-2 bg-transparent outline-none text-sm sm:text-base touch-manipulation"
                  autoComplete="current-password"
                />
              </div>
            </div>
            <div className="w-full">
              <div
                // disabled={loadinglogin}
                onClick={handleLogin}
                className="w-full px-6 py-3 sm:py-4 hover:scale-105 duration-300 text-sm sm:text-base text-center cursor-pointer rounded-xl bg-white text-black font-medium transition-all hover:bg-gray-100"
              >
                Get started
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
