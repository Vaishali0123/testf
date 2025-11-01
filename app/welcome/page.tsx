"use client";
import React, { useEffect, useState } from "react";
import Bg from "../../public/Pattern.svg";

import { Check, Download } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { useAuthContext } from "../utils/auth";
import { NEXT_PUBLIC_API } from "../utils/config";
import { useRouter } from "next/navigation";

const Page = () => {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [mounted, setMounted] = useState(false);
   const { data: authdata } = useAuthContext();
   const router=useRouter()

  const [siteUrl, setSiteUrl] = useState("");
 const handleConnect = async () => {
    if (!siteUrl) return alert("Please enter a site URL");

    try {
      // Ensure protocol exists
      let formattedUrl = siteUrl.trim();
      if (!/^https?:\/\//i.test(formattedUrl)) {
        formattedUrl = "http://" + formattedUrl; // default to http
      }

      //  Parse with URL API to always get clean origin
      const urlObj = new URL(formattedUrl);
      const cleanUrl = urlObj.origin; // e.g. http://testing3.local

      // Build plugins page URL
      const pluginsUrl = `${cleanUrl}/wp-admin/plugins.php`;

      // Save only clean site_url in DB
      const res = await axios.post(`${NEXT_PUBLIC_API}/site`, {
        email: authdata?.user?.email ? authdata?.user?.email : authdata?.email,
        userId: authdata?.user?._id ? authdata?.user?._id : authdata?._id,
        site_url: cleanUrl,
      });

      // console.log(res?.data?.success);
      if (!res?.data?.success) return alert("Something went wrong");
 
      // Open plugins page in new tab
      window.open(pluginsUrl, "_blank");
      router.push("/webapp")
    } catch (err) {
      console.error(err);
      alert("Invalid site URL");
    }
  };
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div
      style={{
        backgroundImage: `url(${Bg.src})`,
      }}
      className="w-full h-screen p-6 flex relative items-center justify-center bg-black"
    >
      <div className="absolute -top-[30%] w-[70%] rounded-full h-[50%] bg-[#f94cff21] blur-3xl"></div>
      <div className="min-h-screen w-full flex flex-col overflow-hidden">
        {/* Header */}
        <div
          className={`p-8 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
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
        </div>

        {/* Main Content */}
        <div className="flex-1 h-[80%] w-full flex px-8 gap-16">
          {/* Left Side - Steps */}
          <div className="w-[50%] flex  flex-col gap-8 pt-8">
            {/* Step 1 - Completed */}
            <div
              className={`flex items-start gap-4 transition-all duration-700 delay-100 ${
                mounted
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-pink-500/50 transition-all duration-300 hover:scale-110 hover:shadow-pink-500/70">
                  <Check className="w-6 h-6 text-white animate-[checkmark_0.5s_ease-in-out]" />
                </div>
                <div className="w-0.5 h-16 bg-neutral-800 mt-2 animate-[lineGrow_0.5s_ease-out_0.3s_both]"></div>
              </div>
              <div className="pt-3">
                <h2 className="text-2xl font-semibold text-neutral-400">
                  Account
                </h2>
                <p className="text-2xl font-semibold text-neutral-400">
                  Created
                </p>
              </div>
            </div>

            {/* Step 2 - Current */}
            <div
              className={`flex items-start gap-4 transition-all duration-700 delay-300 ${
                mounted
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-pink-500/50 animate-pulse">
                <div className="w-3 h-3 bg-white rounded-full animate-[ping_1.5s_ease-in-out_infinite]"></div>
              </div>
              <div className="pt-1">
                <h2 className="text-2xl font-semibold">Connect WIth</h2>
                <p className="text-2xl font-semibold">Wordpress Account</p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div
            className={`flex-1 w-[50%] flex items-start overflow-hidden justify-center pt-8 transition-all duration-700 delay-500 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="w-full max-w-2xl bg-white/10 border rounded-3xl p-12 shadow-2xl transition-all duration-300 hover:shadow-pink-500/10">
              <div
                className={`duration-100 
                             text-[#fff] text-[30px]  font-bold
                          `}
              >
                Start <span className="text-[#7A7A7A]">out</span> with
                <span className="text-[#7A7A7A]">out</span> a{" "}
                <span className="text-[#7A7A7A]">doubt</span>
              </div>
              <div className="space-y-2 mt-6 text-sm text-neutral-400">
                <div>Upload to WordPress</div>
                <div>• Log in to your WordPress Admin.</div>
                <div>• Go to Plugins → Add New → Upload Plugin</div>
                <div>• Choose the .zip file and click Install Now.</div>
              </div>

              {/* URL Input */}
              <div className="mt-4">
                <div className="relative group">
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 transition-colors duration-300 group-focus-within:text-pink-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  <input
                     value={siteUrl}
              type="text"
              onChange={(e) => setSiteUrl(e.target.value)}
                    placeholder="Website URL"
                 
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-12 py-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 focus:scale-[1.02]"
                  />
                </div>
              </div>

              {/* Install Button */}
              <div className="space-y-4 mt-4">
                <button
                  onClick={() => {
                    window.location.href = "/api/download-plugin";
                  }}
                  className="w-full bg-white hover:bg-neutral-100 text-black font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] group"
                >
                  <Download className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5" />
                  <span>Install Webivus For</span>
                  <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-[360deg]">
                    <span className="text-white text-lg font-bold">W</span>
                  </div>
                </button>
                <button
                    onClick={handleConnect}
                  className="px-8 w-full z-20 py-2 text-black text-[14px] bg-white rounded-full"
                >
                  Connect Webivus to Your Site
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`p-8 flex justify-between h-[50px]  items-center transition-all duration-700 delay-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-neutral-500 text-sm">Setup 2/2</p>
          <div className="flex gap-4">
            <button className="px-8 py-3 border border-neutral-700 rounded-xl text-white hover:bg-neutral-900 transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95 hover:border-neutral-600">
              <span className="transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              <span>Back</span>
            </button>
            <button className="px-8 py-3 bg-white text-black rounded-xl hover:bg-neutral-100 transition-all duration-300 flex items-center gap-2 font-semibold hover:scale-105 active:scale-95 hover:shadow-lg group">
              <span>Finish</span>
              <Check className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        <style jsx>{`
          @keyframes checkmark {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            50% {
              transform: scale(1.2);
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes lineGrow {
            0% {
              height: 0;
            }
            100% {
              height: 4rem;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Page;
