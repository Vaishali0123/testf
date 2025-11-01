"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuthContext } from "@/app/utils/auth";
import { NEXT_PUBLIC_API } from "@/app/utils/config";
import { Download } from "lucide-react";
import { FaWordpress } from "react-icons/fa";

interface Step1ConnectWordPressProps {
  onNext: (siteUrl?: string) => void;
  onBack?: () => void;
  onSkip?: () => void;
}

const Step1ConnectWordPress: React.FC<Step1ConnectWordPressProps> = ({
  onNext,
  onBack,
  onSkip,
}) => {
  const [siteUrl, setSiteUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: authdata } = useAuthContext();
  console.log(authdata, "authdata");
  const handleConnect = async () => {
    let cleanUrl = "";

    if (siteUrl.trim()) {
      setLoading(true);
      try {
        // Ensure protocol exists
        let formattedUrl = siteUrl.trim();
        if (!/^https?:\/\//i.test(formattedUrl)) {
          formattedUrl = "https://" + formattedUrl;
        }

        // Parse with URL API to always get clean origin
        const urlObj = new URL(formattedUrl);
        cleanUrl = urlObj.origin;

        // Build plugins page URL
        const pluginsUrl = `${cleanUrl}/wp-admin/plugins.php`;

        // Open plugins page in new tab
        window.open(pluginsUrl, "_blank");
      } catch (err) {
        console.error(err);
        // Don't block the flow if URL parsing fails
      } finally {
        setLoading(false);
      }
    }
    // Pass site URL to parent to save (user is already signed up at this point)
    onNext(cleanUrl);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[60vh] px-4">
      {/* Progress Indicator */}
      <div className="text-white/70 text-sm mb-12">3/3</div>

      {/* Title */}
      <h1 className="text-[14px] sm:text-3xl flex flex-row items-center justify-center lg:text-[22px] gap-3 font-bold text-white text-center mb-16">
        Connect Wordpress
      </h1>

      {/* Input Field */}
      <div className="w-full max-w-3xl mb-12">
        <div className="relative">
          <input
            type="text"
            value={siteUrl}
            onChange={(e) => setSiteUrl(e.target.value)}
            placeholder="Enter Website Url"
            className="w-full bg-transparent border-none outline-none text-white text-xl sm:text-2xl lg:text-3xl text-center placeholder-white/50 focus:placeholder-white/30 transition-colors caret-purple-500"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleConnect();
              }
            }}
            autoFocus
          />
          <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-0.5 h-8 bg-purple-500/50 opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full  max-w-3xl flex items-center justify-center mb-8">
        <div className="flex items-center gap-4 w-full justify-center">
          {onSkip && (
            <button
              onClick={onSkip}
              className="text-white/70 hover:text-white text-sm transition-colors px-4 py-2"
            >
              Skip
            </button>
          )}
          <button
            onClick={handleConnect}
            disabled={loading || !siteUrl.trim()}
            className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm sm:text-base"
          >
            <span>Connect</span>
            <FaWordpress size={20} className="sm:w-6 sm:h-6" color="#01579B" />
          </button>
        </div>
      </div>

      {/* Install Button */}
      <div className="w-full max-w-3xl">
        <button
          onClick={() => {
            window.location.href = "/api/download-plugin";
          }}
          className="w-full px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-3 text-sm sm:text-base"
        >
          <Download className="w-5 h-5" />
          <span>Install Webivus For</span>
          <FaWordpress size={20} className="sm:w-6 sm:h-6" color="#01579B" />
          {/* <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">W</span>
          </div> */}
        </button>
      </div>
    </div>
  );
};

export default Step1ConnectWordPress;
