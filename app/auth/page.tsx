"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const verifyUser = async () => {
      try {
        await axios.post(
          "http://localhost:7002/api/verifyToken",
          {},
          { withCredentials: true }
        );
        router.push("/webapp"); // token is valid, redirect
      } catch (err) {
        setLoading(false); // token invalid or not present, show login
      }
    };
    verifyUser();
  }, []);
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7002/api/login",
        { email, password },
        { withCredentials: true }
      );

      // Save token in cookies (30 days)
      Cookies.set("authToken", res.data.token, { expires: 30 });
      router.push("/webapp");
    } catch (err) {
      alert("Invalid login");
    }
  };
  return (
    <div className="w-full h-screen p-6 bg-black">
      <div className="border w-full h-full flex items-center justify-center">
        {/* left */}
        <div className="w-[50%] h-full flex flex-col items-center  justify-center">
          <div className="w-[60%] space-y-4">
            <div className="flex items-center bg-gradient-to-l from-white/10 to-white/0 w-fit py-2 px-4 rounded-full gap-2">
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
            <div className="text-white/70">
              Join Early Access and experience the first AI Co-Pilot built for
              WordPress owners, agencies, and creators.
            </div>
            <div className="flex items-center">
              <div className="h-[80px] w-[80px] border-r cursor-pointer  hover:border hover:border-white hover:scale-105 duration-300 hover:bg-white/10"></div>
              <div className="h-[80px] w-[80px] border-r cursor-pointer hover:border hover:border-white hover:scale-105 duration-300 hover:bg-white/10"></div>

              <div className="h-[80px] w-[80px] border-r cursor-pointer hover:border hover:border-white hover:scale-105 duration-300 hover:bg-white/10"></div>
            </div>
          </div>
        </div>
        {/* right  */}
        <div className="w-[60%] h-full flex flex-col relative  items-center justify-center">
          <div className="w-[60%] space-y-4">
            <div className="text-[14px] flex flex-col gap-2">
              <div>Email</div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your Email"
                className="w-full h-8 pl-2 bg-[#171717] text-white outline-none rounded-md"
              />
            </div>
            <div className="text-[14px] flex flex-col gap-2">
              <div>Password</div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="Password"
                placeholder="Enter your password"
                className="w-full h-8 pl-2 bg-[#171717] text-white outline-none rounded-md"
              />
              <div className="text-[12px] text-white/70 mt-1">
                Must contain 1 uppercase letter, 1 number, min. 8 characters.
              </div>
            </div>
          </div>
          <div className="absolute bottom-4  right-4">
            <div
              onClick={handleLogin}
              className="px-6 py-2 cursor-pointer hover:scale-105 duration-300 cursor-pointer rounded-full bg-white text-black"
            >
              Get started
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
