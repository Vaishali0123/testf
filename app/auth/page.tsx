"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { NEXT_PUBLIC_API } from "../utils/config";
import { useAuthContext, UserData } from "../utils/auth";
import toast, { Toaster } from "react-hot-toast";
import Bg from "../../public/Pattern.svg";
import dot from "../../public/Dot.svg";

import { FaDiscord, FaGithub, FaGoogle } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { RiGroupLine } from "react-icons/ri";
import { GoShieldCheck, GoVerified } from "react-icons/go";
import { TypingAnimation } from "../landing/components/TypingAnimation";

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
     console.log(err)
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
      router.push("/webapp");
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${NEXT_PUBLIC_API}/login`,
        { email, password },
        { withCredentials: true }
      )
      if (res.data.success) {
        toast.success("Login successful!");
        cookieSetter(res.data.data, res.data.token);
      } else {
        // console.log("hi")
        toast.error("Seems like you don't have an account in the app.");
        handleSubmit();
        // router.push("/Signup");
      }
    } catch (err) {
      handleSubmit();
    }
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
      const res = await axios.post(`${NEXT_PUBLIC_API}/signup`, {
        email,
        password,
      }, { withCredentials: true });
    console.log(res?.data, "sign");
      if (res.data.success) {
        toast.success("Signup successful!");
        cookieSetter(res.data.data, res.data.token);
        // Save email to sessionStorage
        // sessionStorage.setItem("userEmail", email);

        // Redirect to /multisiteconnect
        // router.push("/webapp");
      } else {
        toast.error("Seems like you don't have an account in the platform.");
        // setMessage(res.data.message || "Something went wrong");
      }
    } catch (err) {
      setMessage("Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  const lines = [
    'Multi-Agent Orchestration',
    'Secure Plugin Connection',
    'Built-in Security',
  ];
  return (
    <div
      style={{
        backgroundImage: `url(${Bg.src})`,
      }}
      className="w-full h-screen p-6 flex relative items-center justify-center bg-black"
    >
      <Toaster />
      <div className="absolute -top-[30%] w-[70%] rounded-full h-[50%] bg-[#f94cff21] blur-3xl"></div>
      <div className=" w-full h-full flex items-center justify-center">
        {/* left */}
        <div className="w-[50%] h-full flex flex-col items-center  justify-center">
          <div className="w-[60%] space-y-4">
            <div className="flex items-center cursor-auto bg-gradient-to-l from-white/10 to-white/0 w-fit py-2 px-4 rounded-full gap-2">
              <Image
                src="/logo.png"
                alt="logo"
                width={30}
                height={30}
                className="-ml-2"
              />{" "}
              From “What now?” to “All set.” In one chat.
            </div>
            <div className="text-3xl">
              Stop Fixing WordPress. Start Commanding It.
            </div>
            {/* <div className="text-white/70">
              Join Early Access and experience the first AI Co-Pilot built for
              WordPress owners, agencies, and creators.
            </div> */}
          </div>
          {/* <div className="w-[60%] mt-10 space-y-2">
            <RiGroupLine className="text-[#f94cff]" />
            <div className="">Multi-Agent Orchestration</div>
            <div className="text-[12px] text-white/60">
              Specialized Multi AI agents collaborate like a team one creates a
              page, another optimizes it, another checks for bugs.
            </div>
          </div>
          <div className="w-[60%] mt-10 space-y-2">
            <GoVerified className="text-[#f94cff] bg-[#f94cff39]" />
            <div className="">Secure Plugin Connection </div>
            <div className="text-[12px] text-white/60">
              Install the Webivus plugin, authorize once with a site-specific
              token, and Webivus will communicate securely.
            </div>
          </div>
          <div className="w-[60%] mt-10 space-y-2">
            <GoShieldCheck className="text-[#f94cff]" />
            <div className="">Built-in security</div>
            <div className="text-[12px] text-white/60">
              Install the Webivus plugin, authorize once with a site-specific
              token, and Webivus will communicate securely.
            </div>
          </div> */}
          <div className="w-[60%]  space-y-10 mt-10">
        {lines.map((line, idx) => (
          <div key={idx} className="space-y-2">
            {idx===0 && (<RiGroupLine className="text-[#f94cff]" />)}
            {idx===1 && (<GoVerified className="text-[#f94cff] " />)}
            {idx===2 && (<GoShieldCheck className="text-[#f94cff]" />)}
            <div className="">
              <TypingAnimation 
                text={line} 
                speed={80}
                delay={idx * 2000}
              />
            </div>
            {idx===0 && (<div className="text-[12px] text-white/60">
              Specialized Multi AI agents collaborate like a team one creates a
              page, another optimizes it, another checks for bugs.
            </div>)}
             {idx===1 && (<div className="text-[12px] text-white/60">
               Install the Webivus plugin, authorize once with a site-specific
              token, and Webivus will communicate securely.
            </div>)}
             {idx===2 && (<div className="text-[12px] text-white/60">
              Install the Webivus plugin, authorize once with a site-specific
              token, and Webivus will communicate securely.
            </div>)}
             
          </div>
        ))}
      </div>
        </div>
        {/* right  */}
        <div className="w-[60%] h-full flex flex-col relative  items-center justify-center">
          <div
            style={{
              backgroundImage: `url(${dot.src})`,
              backgroundPosition: "bottom",
              backgroundRepeat: "no-repeat",
            }}
            className="w-[60%] px-10 py-20 space-y-4 bg-[#ffffff24] border-[#ffffff25] border rounded-2xl"
          >
            <div className="w-full flex flex-col items-center justify-center">
              <div>Continue with:</div>
              <div className="flex gap-4 items-center justify-center mt-4">
                <div className="flex px-4 text-[14px] py-2 rounded-xl bg-white/10 border-[#ffffff25] border items-center gap-2">
                  <FaGoogle />
                  Google
                </div>
                <div className="flex px-4 py-2 text-[14px] rounded-xl bg-white/10 border-[#ffffff25] border items-center gap-2">
                  <FaGithub />
                  Github
                </div>
                <div className="flex px-4 py-2 text-[14px] rounded-xl bg-white/10 border-[#ffffff25] border items-center gap-2">
                  <FaDiscord />
                  Discord
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 w-full">
              <hr className="w-full border border-white/10" />
              <div>or</div>
              <hr className="w-full border border-white/10" />
            </div>
            <div className="text-[14px] flex flex-col gap-2">
              <div>Email</div>
              <div className=" text-[14px] rounded-xl border bg-white/10 items-center justify-center gap-2 px-2 border-[#ffffff25] flex">
                <MdOutlineAccountCircle />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your Email"
                  className="w-full h-8 pl-2   bg-transparent    outline-none "
                />
              </div>
            </div>
            <div className="text-[14px] flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div>Password</div>
                <div className="text-[12px] text-[#f94cff]">
                  Forgot Password?
                </div>
              </div>

              <div className=" text-[14px] rounded-xl border bg-white/10 items-center justify-center gap-2 px-2 border-[#ffffff25] flex">
                <CiLock />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="Password"
                  placeholder="Enter your password"
                  className="w-full h-8 pl-2   bg-transparent    outline-none"
                />
              </div>
              <div className="text-[12px] flex items-center text-white/70 mt-1">
                <input type="checkbox" className="mr-2 bg-transparent" />{" "}
                Remember me
              </div>
            </div>
            <div className="">
              <div
                onClick={handleLogin}
                className="px-6 py-2 hover:scale-105 duration-300 text-[14px] text-center cursor-pointer rounded-xl bg-white text-black"
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
