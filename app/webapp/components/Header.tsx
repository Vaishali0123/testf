"use client";
import Logo from "@/app/(landing)/components/Logo";
import { useAuthContext } from "@/app/utils/auth";
import { NEXT_PUBLIC_API } from "@/app/utils/config";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { FiBell } from "react-icons/fi";
import { GoGlobe } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import { PiCrownSimpleFill } from "react-icons/pi";
import { RiHome7Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { IoSettingsOutline } from "react-icons/io5";
import {
  FiUser,
  FiSearch,
  FiTrash2,
  FiCheck,
  FiFileText,
  FiPhone,
  FiLayers,
  FiArrowUpRight,
  FiChevronDown,
  FiInfo,
  FiLogOut,
} from "react-icons/fi";
import { IoCloudUploadOutline } from "react-icons/io5";
import { HiGift } from "react-icons/hi";
import { MdHelpOutline, MdDarkMode } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";
import { FiMail, FiDownload, FiUsers } from "react-icons/fi";
import { MdScience } from "react-icons/md";
import { IoMdCloud } from "react-icons/io";
import PricingPage from "@/app/(landing)/pricing/page";
import { useContext } from "react";
import { GuideContext } from "../contexts/GuideContext";
import { FaShopify, FaWordpress } from "react-icons/fa6";

interface Site {
  _id: string;
  name: string;
  url: string;
  site_url: string;
  logo: string;
}

interface BillingRecord {
  invoiceId: string;
  billingDate: string;
  plan: string;
  amount: string;
  status: "Paid" | "Free" | "Pending" | "Failed";
}

const Header = () => {
  const path = usePathname();
  const [sites, setSites] = useState([]);
  const [currentsite, setCurrentsite] = useState("");
  const [currentsitename, setCurrentsitename] = useState("tab");
  const { data, setAuth, setData } = useAuthContext();
  const router = useRouter();
  const dispatch = useDispatch();

  const [openNotify, setOpenNotify] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openAccountSettings, setOpenAccountSettings] = useState(false);
  const [activeTab, setActiveTab] = useState("account");
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);
  const publishButtonRef = useRef<HTMLDivElement>(null);

  // Safely get guide context (may not exist if Header is used outside GuideProvider)
  const guideContext = useContext(GuideContext);
  const contextPublishRef = guideContext?.publishButtonRef;

  // Connect publish button ref to context (only if context exists)
  useEffect(() => {
    if (contextPublishRef && publishButtonRef.current) {
      contextPublishRef.current = publishButtonRef.current;
    }
  }, [contextPublishRef]);

  // Contact Support form state
  const [supportSubject, setSupportSubject] = useState("");
  const [supportProject, setSupportProject] = useState("");
  const [supportMessage, setSupportMessage] = useState("");
  const [supportFile, setSupportFile] = useState<File | null>(null);

  // Hardcoded billing data
  const billingData: BillingRecord[] = [
    {
      invoiceId: "#56489",
      billingDate: "23 Feb 2023",
      plan: "Basic Plan",
      amount: "$1200",
      status: "Paid",
    },
    {
      invoiceId: "#56490",
      billingDate: "23 Mar 2023",
      plan: "Basic Plan",
      amount: "$1200",
      status: "Paid",
    },
    {
      invoiceId: "#56491",
      billingDate: "23 Apr 2023",
      plan: "Basic Plan",
      amount: "$1200",
      status: "Paid",
    },
    {
      invoiceId: "#56492",
      billingDate: "23 May 2023",
      plan: "Pro Plan",
      amount: "$2400",
      status: "Paid",
    },
    {
      invoiceId: "#56493",
      billingDate: "23 Jun 2023",
      plan: "Pro Plan",
      amount: "$2400",
      status: "Paid",
    },
    {
      invoiceId: "#56494",
      billingDate: "23 Jul 2023",
      plan: "Basic Plan",
      amount: "$0",
      status: "Free",
    },
    {
      invoiceId: "#56495",
      billingDate: "23 Aug 2023",
      plan: "Basic Plan",
      amount: "$1200",
      status: "Pending",
    },
  ];

  const notifyRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const accountSettingsRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        notifyRef.current &&
        !notifyRef.current.contains(e.target as Node) &&
        profileRef.current &&
        !profileRef.current.contains(e.target as Node) &&
        accountSettingsRef.current &&
        !accountSettingsRef.current.contains(e.target as Node)
      ) {
        setOpenNotify(false);
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle backdrop click to close account settings modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setOpenAccountSettings(false);
      setOpenProfile(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    try {
      // Remove auth token from cookies (multiple attempts to ensure removal)
      Cookies.remove("authToken");
      Cookies.remove("authToken", { path: "/" });
      Cookies.remove("authToken", {
        path: "/",
        domain: window.location.hostname,
      });
      Cookies.remove("authToken", {
        path: "/",
        domain: `.${window.location.hostname}`,
      });
      // Remove sessionstorage also
      if (typeof window !== "undefined") {
        sessionStorage.clear();
      }
      // Force remove using document.cookie as fallback
      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
      document.cookie = `authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
    } catch (error) {
      console.error("Error removing cookies:", error);
    }

    // Clear all storage
    if (typeof window !== "undefined") {
      sessionStorage.clear();
      localStorage.clear();
    }

    // Update auth context
    setAuth(false);
    setData(null);

    // Close modals
    setShowLogoutPopup(false);
    setOpenProfile(false);
    setOpenAccountSettings(false);

    // Redirect to auth page
    router.push("/auth");
  };

  const getSites = async () => {
    try {
      const res = await axios.get(
        `${NEXT_PUBLIC_API}/getUserSites/${
          data?._id ? data?._id : data?.user?._id
        }`
      );
      setSites(res?.data?.sites);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // Only access sessionStorage on client side
    if (typeof window !== "undefined") {
      setCurrentsite(sessionStorage.getItem("siteId") || "");
      setCurrentsitename(sessionStorage.getItem("siteurl") || "");
    }
    if (data) getSites();
  }, [data]);

  return (
    <div className="h-[60px] text-[14px] flex justify-between items-center px-2 gap-2 relative">
      {/* LEFT */}
      <div className="flex gap-1 sm:gap-2 flex-1 min-w-0">
        <Link href="/webapp" className="h-10 w-10 flex-shrink-0">
          <Logo />
        </Link>

        <Link
          href="../webapp/projects"
          className={`${
            path === "/webapp/projects"
              ? "px-2 sm:px-4 py-2 flex gap-1 sm:gap-2 items-center rounded-2xl border border-[#ffffff0b] text-black bg-[#fff] flex-shrink-0"
              : "px-2 sm:px-4 py-2 flex gap-1 sm:gap-2 items-center rounded-2xl border border-[#ffffff0b] bg-[#2c2d306b] text-white flex-shrink-0"
          }`}
        >
          <RiHome7Line />
          <div className="hidden sm:block whitespace-nowrap">Home</div>
        </Link>
        {currentsitename && (
          <div className="px-2 sm:px-4 flex gap-1 sm:gap-2 items-center py-2 rounded-2xl border border-[#ffffff0b] bg-[#2c2d306b] min-w-0 text-white">
            <span className="truncate text-xs sm:text-[14px]">
              {currentsitename}
            </span>
            {/* <IoMdAdd className="rotate-45" /> */}
          </div>
        )}

        <div
          onClick={() => {
            if (typeof window !== "undefined") {
              sessionStorage.removeItem("siteId");
              sessionStorage.removeItem("siteurl");
            }
            router.push("/webapp");
          }}
          className="hidden md:flex px-4 py-2 rounded-2xl border gap-2 items-center border-[#ffffff0b] bg-[#2c2d306b] text-white"
        >
          <IoMdAdd />
          <span className="text-[10px]">New</span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex gap-1 sm:gap-2 flex-shrink-0 text-white items-center">
        {/* Notifications */}
        <div ref={notifyRef} className="relative">
          <div
            onClick={() => {
              setOpenNotify(!openNotify);
              setOpenProfile(false);
            }}
            className="h-[38px] hover:opacity-[80%] w-[38px] flex items-center justify-center rounded-2xl border border-[#ffffff0b] bg-[#2c2d306b] cursor-pointer"
          >
            <FiBell className="h-4 w-4" />
          </div>

          {/* Notification Popup */}
          {openNotify && (
            <>
              {/* Desktop dropdown */}
              <div className="hidden sm:block absolute right-0 mt-2 w-[260px] bg-[#1b1c20] border border-[#333] rounded-2xl shadow-lg p-3 animate-fadeIn">
                <h3 className="text-sm font-semibold mb-2">Notifications</h3>
                <div className="text-xs text-gray-300 space-y-2">
                  <p>No new notifications 🎉</p>
                </div>
              </div>

              {/* Mobile full-screen modal */}
              <div className="sm:hidden fixed inset-0 bg-black/50 flex justify-center items-end z-50">
                <div className="w-full bg-[#1e1e1e] rounded-t-2xl p-4 max-h-[60vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-base font-semibold">Notifications</h3>
                    <button
                      onClick={() => setOpenNotify(false)}
                      className="text-gray-400 text-lg"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-gray-300 text-sm text-center mt-6">
                    No new notifications 🎉
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Upgrade */}
        <div
          onClick={() => setShowUpgradePopup(true)}
          className="hidden hover:opacity-[80%] lg:flex px-4 gap-2 items-center py-2 rounded-2xl border border-[#ffffff0b] bg-[#2c2d306b] cursor-pointer"
        >
          <PiCrownSimpleFill className="text-[#DAB2FF]" />
          <span className="whitespace-nowrap">Upgrade</span>
        </div>

        {/* Publish */}
        <div
          ref={publishButtonRef}
          className="hidden hover:opacity-[80%] sm:flex px-2 lg:px-4 gap-2 items-center py-2 rounded-2xl border border-[#ffffff0b] bg-[#2c2d306b] cursor-pointer"
        >
          <GoGlobe />
          <span className="hidden lg:block whitespace-nowrap">Publish</span>
        </div>

        {/* Profile */}
        <div ref={profileRef} className="relative">
          <div
            onClick={() => {
              setOpenProfile(!openProfile);
              setOpenNotify(false);
            }}
            className="h-[38px] hover:opacity-[80%] cursor-pointer w-[38px] rounded-2xl border border-[#ffffff0b] bg-[#2c2d306b] flex items-center justify-center "
          >
            <IoSettingsOutline className="text-white text-lg" size={20} />
          </div>

          {/* Profile Popup */}
          {openProfile && (
            <>
              {/* Desktop dropdown */}
              <div className="hidden sm:block absolute right-0 mt-2 w-[280px] bg-[#1b1c20] border border-[#333] rounded-2xl shadow-lg p-4 animate-fadeIn">
                {/* Previous UI - Commented Out */}
                {/* <ul className="text-[14px] font-medium text-[#8A8A8A] space-y-4">
                  <li
                    className="hover:text-white cursor-pointer"
                    onClick={() => {
                      setOpenAccountSettings(true);
                      setOpenProfile(false);
                    }}
                  >
                    Account Settings
                  </li>
                  <li className="hover:text-white cursor-pointer">
                    Invite Friends
                  </li>
                  <li className="hover:text-white cursor-pointer">
                    Affiliate Center
                  </li>
                  <div className="border-t-2 border-[#404040]"></div>
                  <li className="hover:text-white cursor-pointer">Billing</li>
                  <li className="hover:text-white cursor-pointer">Help</li>
                  <li className="hover:text-white font-semibold cursor-pointer text-[#F16047] ">
                    Log out
                  </li>
                </ul> */}

                {/* New UI */}
                <div className="space-y-4">
                  {/* Account Information Section */}
                  <div className="flex items-center gap-3 pb-4 border-b border-[#333]">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#932E75] to-[#95437D] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">
                        {data?.username?.charAt(0)?.toUpperCase() ||
                          data?.user?.username?.charAt(0)?.toUpperCase() ||
                          "U"}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-semibold text-sm truncate">
                        {data?.username || data?.user?.username || "User"}
                      </div>
                      <div className="text-gray-400 text-xs truncate">
                        {data?.email || data?.user?.email || "xyz@gmail.com"}
                      </div>
                    </div>
                  </div>

                  {/* Credits Section */}
                  <div className="space-y-3 pb-4 border-b border-[#333]">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm font-medium">
                        Credits
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-white text-sm">3.1 left</span>
                        <FiChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                    <div className="w-full h-2 bg-[#2c2d30] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all"
                        style={{ width: "78%" }}
                      ></div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <FiInfo className="w-3 h-3" />
                      <span>Daily credits reset at midnight UTC</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pb-4 border-b border-[#333]">
                    <button
                      onClick={() => {
                        setOpenAccountSettings(true);
                        setOpenProfile(false);
                      }}
                      className="flex-1 border border-[#616161] flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#2c2d30] hover:bg-[#3c3d40] text-white text-sm font-medium transition-colors"
                    >
                      <IoSettingsOutline className="w-4 h-4" />
                      Settings
                    </button>
                    <button className="flex-1 border border-[#616161] flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#2c2d30] hover:bg-[#3c3d40] text-white text-sm font-medium transition-colors">
                      <IoPersonAddOutline className="w-4 h-4" />
                      Invite
                    </button>
                  </div>

                  {/* Bottom Menu Items */}
                  <div className="space-y-1">
                    <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2c2d30] text-gray-300 hover:text-white text-sm transition-colors">
                      <HiGift className="w-4 h-4" />
                      Get free credits
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2c2d30] text-gray-300 hover:text-white text-sm transition-colors">
                      <MdHelpOutline className="w-4 h-4" />
                      Help Center
                    </button>

                    <button
                      onClick={() => setShowLogoutPopup(true)}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2c2d30] text-[#F16047] hover:text-[#ff6b57] text-sm font-medium transition-colors"
                    >
                      <FiLogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile full-screen modal */}
              <div className="sm:hidden fixed inset-0 bg-black/50 flex justify-center items-end z-50">
                <div className="w-full bg-[#1e1e1e] rounded-t-2xl p-4 max-h-[60vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-base font-semibold">Profile</h3>
                    <button
                      onClick={() => setOpenProfile(false)}
                      className="text-gray-400 text-lg"
                    >
                      ✕
                    </button>
                  </div>
                  <ul className="text-sm text-gray-300 space-y-3">
                    <li
                      className="hover:text-white cursor-pointer"
                      onClick={() => {
                        setOpenAccountSettings(true);
                        setOpenProfile(false);
                      }}
                    >
                      Account Settings
                    </li>
                    <li className="hover:text-white cursor-pointer">
                      Settings
                    </li>
                    <li className="hover:text-white cursor-pointer">Logout</li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Profile Settings Modal */}
      {openAccountSettings && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          {/* Blur backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

          {/* Modal content */}
          <div
            ref={accountSettingsRef}
            className="relative w-full max-w-[95%] h-[90vh] bg-[#1A1A1A] rounded-2xl border border-[#333] shadow-2xl overflow-hidden animate-fadeIn flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with title and close button */}
            <div className="flex justify-between items-center p-6 border-b border-[#333]">
              <h2 className="text-2xl font-bold text-white">
                Workspace
              </h2>
              <div className="flex gap-3 items-center">
                <button
                  onClick={() => {
                    setOpenAccountSettings(false);
                    setActiveTab("account");
                  }}
                  className="text-gray-400 hover:text-white transition-colors text-2xl leading-none"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Main Layout: Sidebar + Content */}
            <div className="flex flex-1 overflow-hidden">

              {/* Left Sidebar */}
              <div className="w-[240px] bg-[#1A1A1A] border-r border-[#333] overflow-y-auto flex flex-col">
                {/* Workspace Section */}
                <div className="p-4">
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setActiveTab("workspace-settings");
                      }}
                      className={`w-full flex items-center text-gray-400 gap-3 px-3 py-2 rounded-lg text-sm transition-colors 
                      `}
                    >
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#932E75] to-[#95437D] flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs">
                          {data?.username?.charAt(0)?.toUpperCase() ||
                            data?.user?.username?.charAt(0)?.toUpperCase() ||
                            "V"}
                        </span>
                      </div>
                      <span className="truncate">
                        {data?.username || data?.user?.username || "User"}
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("people");
                      }}
                      className={`w-full flex items-center  gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeTab === "people"
                          ? "bg-[#2c2d30] text-white"
                          : "text-gray-400 hover:text-white hover:bg-[#2c2d30]/50"
                      }`}
                    >
                      <BsPeople className="w-5 h-5" />
                      <span>People</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("subscription");
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeTab === "subscription"
                          ? "bg-[#2c2d30] text-white"
                          : "text-gray-400 hover:text-white hover:bg-[#2c2d30]/50"
                      }`}
                    >
                      <FiLayers className="w-5 h-5" />
                      <span>Plans & credits</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("billing");
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeTab === "billing"
                          ? "bg-[#2c2d30] text-white"
                          : "text-gray-400 hover:text-white hover:bg-[#2c2d30]/50"
                      }`}
                    >
                      <FiFileText className="w-5 h-5" />
                      <span>Billing History & Usage</span>
                    </button>
                    
                  </div>
                </div>

                {/* Account Section */}
                <div className="p-4 border-t border-[#333]">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Account
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setActiveTab("account");
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeTab === "account"
                          ? "bg-[#2c2d30] text-white"
                          : "text-gray-400 hover:text-white hover:bg-[#2c2d30]/50"
                      }`}
                    >
                      <FiUser className="w-5 h-5" />
                      <span>Account</span>
                    </button>

                    {/* <button
                      onClick={() => {
                        setActiveTab("integrations");
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeTab === "integrations"
                          ? "bg-[#2c2d30] text-white"
                          : "text-gray-400 hover:text-white hover:bg-[#2c2d30]/50"
                      }`}
                    >
                      <FiPhone className="w-5 h-5" />
                      <span>Integrations</span>
                    </button> */}
                    <button
                      onClick={() => {
                        setActiveTab("support");
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeTab === "support"
                          ? "bg-[#2c2d30] text-white"
                          : "text-gray-400 hover:text-white hover:bg-[#2c2d30]/50"
                      }`}
                    >
                      <FiPhone className="w-5 h-5" />
                      <span>Contact Support</span>
                    </button>
                    
                  </div>
                </div>
               {/* Integrations Section for wordpress */}
               <div className="p-4 border-t border-[#333]">
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveTab("wordpress")}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors"
                  >
                    <FaWordpress className="w-5 h-5" />
                    <span>Wordpress</span>
                  </button>
                </div>
               </div>
               {/* Integrations Section for shopify */}
               <div className="p-4 border-t border-[#333]">
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveTab("shopify")}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors"
                  >
                    <FaShopify className="w-5 h-5" />
                    <span>Shopify</span>
                  </button>
                </div>
               </div>
              
                {/* Logout Section */}
                <div className="p-4 border-t border-[#333]  mt-auto">
                  <div className="space-y-1">
                    <button
                      onClick={() => setShowLogoutPopup(true)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-[#2c2d30]/50 transition-colors"
                    >
                      <div className="w-5 h-5 rounded text-red-500 flex items-center justify-center">
                        <FiLogOut className="w-5 h-5" color="red" />
                      </div>
                      <span className="text-red-500 font-semibold">
                        Log Out
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Content Area */}
              <div className="flex-1 overflow-y-auto bg-[#1A1A1A]">
                <div className="p-6">
                  {activeTab === "account" && (
                    <div className="space-y-6">
                      {/* Your Avatar */}
                      <div className="flex items-start gap-6">
                        <div className="w-48 flex-shrink-0">
                          <label className="block text-sm font-bold text-white mb-1">
                            Account Information
                          </label>
                          {/* <p className="text-xs text-gray-400">
                            Your avatar automatically generated based on your
                            account.
                          </p> */}
                        </div>
                        {/* <div className="flex-1 flex items-center gap-3"> */}
                          {/* <div className="relative"> */}
                            {/* <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr  from-[#932E75] to-[#95437D] flex items-center justify-center">
                              <span className="text-white font-bold text-lg">
                                {data?.username?.charAt(0)?.toUpperCase() ||
                                  data?.user?.username
                                    ?.charAt(0)
                                    ?.toUpperCase() ||
                                  "U"}
                              </span>
                            </div> */}
                            {/* <button className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#2c2d30] border border-[#333] flex items-center justify-center hover:bg-[#3c3d40] transition-colors">
                              <FiChevronDown className="w-3 h-3 text-gray-400" />
                            </button> */}
                          {/* </div> */}
                        {/* </div> */}
                      </div>

                      {/* Username */}
                      <div className="flex items-start gap-6">
                        <div className="w-48 flex-shrink-0">
                          <label className="block text-sm font-bold text-white mb-1">
                            Username
                          </label>
                          <p className="text-xs text-gray-400">
                            Your username
                          </p>
                        </div>
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={
                              data?.username || data?.user?.username || "User"
                            }
                            readOnly
                            className="w-full px-4 py-2 rounded-lg bg-[#2c2d30] border border-[#333] text-white focus:outline-none focus:border-[#555] text-sm"
                          />
                          {/* <a
                            href="#"
                            className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 hover:underline"
                          >
                            <span>
                              webivus.dev/@
                              {data?._id?.slice(0, 10) ||
                                data?.user?._id?.slice(0, 10) ||
                                "ZGF3Lc0Hvncb4xAeNGQndSORM4c2"}
                            </span>
                            <FiArrowUpRight className="w-3 h-3" />
                          </a> */}
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-start gap-6">
                        <div className="w-48 flex-shrink-0">
                          <label className="block text-sm font-bold text-white mb-1">
                            Email
                          </label>
                          <p className="text-xs text-gray-400">
                            Your email address associated with your account.
                          </p>
                        </div>
                        <div className="flex-1">
                          {/* Not editable */}
                          <input
                            type="email"
                            value={
                              data?.email ||
                              data?.user?.email ||
                              "sheeratgupta@gmail.com"
                            }
                            readOnly
                            className="w-full cursor-not-allowed px-4 py-2 rounded-lg bg-[#2c2d30] border border-[#333] text-white focus:outline-none focus:border-[#555] text-sm"
                          />
                        </div>
                      </div>

                      {/*  First  Name */}
                      <div className="flex items-start gap-6">
                        <div className="w-48 flex-shrink-0">
                          <label className="block text-sm font-bold text-white mb-1">
                            First Name
                          </label>
                          <p className="text-xs text-gray-400">
                            Your first name, as visible to others.
                          </p>
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 rounded-lg bg-[#2c2d30] border border-[#333] text-white placeholder-gray-500 focus:outline-none focus:border-[#555] text-sm"
                          />
                        </div>
                      </div>
                       {/* Last Name */}
                       <div className="flex items-start gap-6">
                        <div className="w-48 flex-shrink-0">
                          <label className="block text-sm font-bold text-white mb-1">
                          Last Name
                          </label>
                          {/* <p className="text-xs text-gray-400">
                            Your full name, as visible to others.
                          </p> */}
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 rounded-lg bg-[#2c2d30] border border-[#333] text-white placeholder-gray-500 focus:outline-none focus:border-[#555] text-sm"
                          />
                        </div>
                      </div>
{/* delete account button */}
<div className="flex items-start gap-6">
                        <div className="w-48 flex-shrink-0">
                          <label className="block text-sm font-bold text-white mb-1">
                          Permanently delete account
                          </label>
                          {/* <p className="text-xs text-gray-400">
                            Your full name, as visible to others.
                          </p> */}
                        </div>
                        <div className="flex-1">
                          <button className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-400 text-white font-medium transition-colors text-sm">Delete Account</button>
                        </div>
                      </div>
                      {/* Description */}
                      {/* <div className="flex items-start gap-6">
                        <div className="w-48 flex-shrink-0">
                          <label className="block text-sm font-bold text-white mb-1">
                            Description
                          </label>
                          <p className="text-xs text-gray-400">
                            A short description of yourself or your work.
                          </p>
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Enter a description"
                            className="w-full px-4 py-2 rounded-lg bg-[#2c2d30] border border-[#333] text-white placeholder-gray-500 focus:outline-none focus:border-[#555] text-sm"
                          />
                        </div>
                      </div> */}

                      {/* Location */}
                      {/* <div className="flex items-start gap-6">
                        <div className="w-48 flex-shrink-0">
                          <label className="block text-sm font-bold text-white mb-1">
                            Location
                          </label>
                          <p className="text-xs text-gray-400">
                            Where you're based.
                          </p>
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Enter your location"
                            className="w-full px-4 py-2 rounded-lg bg-[#2c2d30] border border-[#333] text-white placeholder-gray-500 focus:outline-none focus:border-[#555] text-sm"
                          />
                        </div>
                      </div> */}

                      {/* Link */}
                      {/* <div className="flex items-start gap-6">
                        <div className="w-48 flex-shrink-0">
                          <label className="block text-sm font-bold text-white mb-1">
                            Link
                          </label>
                          <p className="text-xs text-gray-400">
                            Add a link to your personal website or portfolio.
                          </p>
                        </div>
                        <div className="flex-1">
                          <input
                            type="url"
                            placeholder="https://yourwebsite.com"
                            className="w-full px-4 py-2 rounded-lg bg-[#2c2d30] border border-[#333] text-white placeholder-gray-500 focus:outline-none focus:border-[#555] text-sm"
                          />
                        </div>
                      </div> */}
                       <div className="flex items-center gap-2 opacity-50">
                <input type="checkbox" checked className="rounded" />
                <span>We will use your data for accurate responses and training</span>
              </div>
           
           
                      {/* Header with Update Button */}
                      <div className="flex items-center justify-end mb-4">
                        <button className="px-4 py-2 rounded-lg bg-[#2c2d30] hover:bg-opacity-[80%] text-white font-medium transition-colors text-sm">
                          Update
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === "subscription" && (
                    <div className="space-y-6">
                      {/* Current Plan Status */}
                      <div className="border border-[#333] rounded-lg p-4 bg-[#2c2d30]">
                        <p className="text-sm text-gray-300">
                          You&apos;re currently on plan:{" "}
                          <span className="text-white font-medium">Free</span>.{" "}
                          <span className="text-purple-400 cursor-pointer hover:underline">
                            Manage your payment preferences
                          </span>
                          ,{" "}
                          <span className="text-purple-400 cursor-pointer hover:underline">
                            view past invoices
                          </span>
                          , or{" "}
                          <span className="text-purple-400 cursor-pointer hover:underline">
                            change your plan below
                          </span>
                          .
                        </p>
                      </div>

                      {/* Plan Tiers */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Pro Plan Card */}
                        <div className="border border-[#333] rounded-lg p-6 bg-[#2c2d30] flex flex-col">
                          <h3 className="text-2xl font-bold text-white mb-2">
                            Pro
                          </h3>
                          <p className="text-sm text-gray-400 mb-4">
                            Designed for fast-moving teams building together in
                            real time.
                          </p>
                          <div className="mb-4">
                            <span className="text-4xl font-bold text-white">
                              $25
                            </span>
                            <span className="text-gray-400 ml-2">
                              per month
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mb-4">
                            shared across unlimited users
                          </p>

                          {/* Billing Toggle */}
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-xs text-gray-400">
                              Monthly
                            </span>
                            <div className="relative w-12 h-6 bg-[#1A1A1A] rounded-full cursor-pointer border border-[#333]">
                              <div className="absolute top-1 left-1 w-4 h-4 bg-gray-600 rounded-full transition-transform"></div>
                            </div>
                            <span className="text-xs text-gray-400">
                              Annual
                            </span>
                          </div>

                          <button className="w-full px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium mb-4 transition-colors">
                            Upgrade
                          </button>

                          {/* Credits Dropdown */}
                          <div className="mb-4">
                            <select className="w-full px-3 py-2 rounded-lg bg-[#1A1A1A] border border-[#333] text-white text-sm">
                              <option>100 credits / month</option>
                            </select>
                          </div>

                          {/* Features List */}
                          <div className="space-y-2 text-sm text-gray-300">
                            <p className="text-xs text-gray-400 mb-2">
                              All features in Free, plus:
                            </p>
                            <div className="flex items-center gap-2">
                              <FiCheck className="text-green-400 w-4 h-4 flex-shrink-0" />
                              <span>100 monthly credits</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FiCheck className="text-green-400 w-4 h-4 flex-shrink-0" />
                              <span>5 daily credits (up to 150/month)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FiCheck className="text-green-400 w-4 h-4 flex-shrink-0" />
                              <div className="flex items-center gap-2">
                                <span>Usage-based Cloud + AI</span>
                                <span className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs rounded">
                                  New
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Business Plan Card */}
                        <div className="border border-[#333] rounded-lg p-6 bg-[#2c2d30] flex flex-col">
                          <h3 className="text-2xl font-bold text-white mb-2">
                            Business
                          </h3>
                          <p className="text-sm text-gray-400 mb-4">
                            Advanced controls and power features for growing
                            departments
                          </p>
                          <div className="mb-4">
                            <span className="text-4xl font-bold text-white">
                              $50
                            </span>
                            <span className="text-gray-400 ml-2">
                              per month
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mb-4">
                            shared across unlimited users
                          </p>

                          {/* Billing Toggle */}
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-xs text-gray-400">
                              Monthly
                            </span>
                            <div className="relative w-12 h-6 bg-[#1A1A1A] rounded-full cursor-pointer border border-[#333]">
                              <div className="absolute top-1 left-1 w-4 h-4 bg-gray-600 rounded-full transition-transform"></div>
                            </div>
                            <span className="text-xs text-gray-400">
                              Annual
                            </span>
                          </div>

                          <button className="w-full px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium mb-4 transition-colors">
                            Upgrade
                          </button>

                          {/* Credits Dropdown */}
                          <div className="mb-4">
                            <select className="w-full px-3 py-2 rounded-lg bg-[#1A1A1A] border border-[#333] text-white text-sm">
                              <option>100 credits / month</option>
                            </select>
                          </div>

                          {/* Features List */}
                          <div className="space-y-2 text-sm text-gray-300">
                            <p className="text-xs text-gray-400 mb-2">
                              All features in Pro, plus:
                            </p>
                            <div className="flex items-center gap-2">
                              <FiCheck className="text-green-400 w-4 h-4 flex-shrink-0" />
                              <span>100 monthly credits</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FiCheck className="text-green-400 w-4 h-4 flex-shrink-0" />
                              <div className="flex items-center gap-2">
                                <span>Internal publish</span>
                                <span className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs rounded">
                                  New
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <FiCheck className="text-green-400 w-4 h-4 flex-shrink-0" />
                              <span>SSO</span>
                            </div>
                          </div>
                        </div>

                        {/* Enterprise Plan Card */}
                        <div className="border border-[#333] rounded-lg p-6 bg-[#2c2d30] flex flex-col">
                          <h3 className="text-2xl font-bold text-white mb-2">
                            Enterprise
                          </h3>
                          <p className="text-sm text-gray-400 mb-4">
                            Built for large orgs needing flexibility, scale, and
                            governance.
                          </p>
                          <div className="mb-4">
                            <span className="text-4xl font-bold text-white">
                              Custom
                            </span>
                            <p className="text-gray-400 text-sm mt-1">
                              Flexible plans
                            </p>
                          </div>
                          <div className="mb-4"></div>

                          <button className="w-full px-4 py-2 rounded-lg bg-[#2c2d30] hover:bg-[#3c3d40] border border-[#333] text-white font-medium mb-4 transition-colors">
                            Book a demo
                          </button>

                          <div className="mb-4"></div>

                          {/* Features List */}
                          <div className="space-y-2 text-sm text-gray-300">
                            <p className="text-xs text-gray-400 mb-2">
                              All features in Business, plus:
                            </p>
                            <div className="flex items-center gap-2">
                              <FiCheck className="text-green-400 w-4 h-4 flex-shrink-0" />
                              <span>Dedicated support</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FiCheck className="text-green-400 w-4 h-4 flex-shrink-0" />
                              <span>Onboarding services</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FiCheck className="text-green-400 w-4 h-4 flex-shrink-0" />
                              <span>Custom connections</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FiCheck className="text-green-400 w-4 h-4 flex-shrink-0" />
                              <span>Group-based access control</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "people" && (
                    <div className="space-y-6 opacity-[50%] pointer-events-none">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            People
                          </h3>
                          <p className="text-sm text-gray-400">
                            Inviting people to{" "}
                            {data?.username ||
                              data?.user?.username ||
                              "your workspace"}{" "}
                            gives access to workspace shared projects and
                            credits. You have{" "}
                            <span className="text-white font-medium">
                              1 builder
                            </span>{" "}
                            in this workspace.
                          </p>
                        </div>
                        <button className="text-gray-400 hover:text-white transition-colors">
                          <span className="text-2xl">×</span>
                        </button>
                      </div>

                      {/* Invite New Members Section */}
                      <div className="space-y-4 pb-6 border-b border-[#333]">
                        <h4 className="text-lg font-semibold text-white">
                          Invite new members
                        </h4>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Add emails"
                            className="flex-1 px-4 py-2 rounded-lg bg-[#2c2d30] border border-[#333] text-white placeholder-gray-500 focus:outline-none focus:border-[#555]"
                          />
                          <button className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors">
                            Invite
                          </button>
                        </div>
                      </div>

                      {/* Members Section */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-semibold text-white">
                            Members
                          </h4>
                          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2c2d30] hover:bg-[#3c3d40] border border-[#333] text-white text-sm transition-colors">
                            <FiDownload className="w-4 h-4" />
                            Export
                          </button>
                        </div>

                        {/* Search Bar */}
                        <div className="relative">
                          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            placeholder="Search members by name or email..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#2c2d30] border border-[#333] text-white placeholder-gray-500 focus:outline-none focus:border-[#555]"
                          />
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex gap-2 border-b border-[#333]">
                          <button className="px-4 py-2 border-b-2 border-white text-white text-sm font-medium">
                            All
                          </button>
                          <button className="px-4 py-2 border-b-2 border-transparent text-gray-400 hover:text-white text-sm">
                            Active
                          </button>
                          <button className="px-4 py-2 border-b-2 border-transparent text-gray-400 hover:text-white text-sm">
                            Pending
                          </button>
                        </div>

                        {/* Filter by Role */}
                        <div className="flex items-center gap-4 flex-wrap">
                          <span className="text-sm text-gray-400">
                            Filter by role:
                          </span>
                          <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                            <input
                              type="checkbox"
                              checked
                              className="rounded"
                            />
                            <span>Owner</span>
                          </label>
                          <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                            <input
                              type="checkbox"
                              checked
                              className="rounded"
                            />
                            <span>Admin</span>
                          </label>
                          <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                            <input
                              type="checkbox"
                              checked
                              className="rounded"
                            />
                            <span>Editor</span>
                          </label>
                          <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                            <input
                              type="checkbox"
                              checked
                              className="rounded"
                            />
                            <span>Viewer</span>
                          </label>
                          <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                            <input
                              type="checkbox"
                              checked
                              className="rounded"
                            />
                            <span>Collaborator</span>
                          </label>
                        </div>

                        {/* Members Table */}
                        <div className="border border-[#333] rounded-lg overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead className="bg-[#2c2d30] border-b border-[#333]">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Member
                                  </th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Email
                                  </th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Role
                                  </th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Status
                                  </th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Nov Usage
                                  </th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Total Usage
                                  </th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Date Joined
                                  </th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Limits
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-[#1A1A1A] divide-y divide-[#333]">
                                <tr>
                                  <td className="px-4 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm text-white">
                                        {data?.username ||
                                          data?.user?.username ||
                                          "You"}{" "}
                                        <span className="text-gray-400">
                                          (you)
                                        </span>
                                      </span>
                                    </div>
                                  </td>
                                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {data?.email || data?.user?.email || "-"}
                                  </td>
                                  <td className="px-4 py-4 whitespace-nowrap text-sm text-white">
                                    Owner
                                  </td>
                                  <td className="px-4 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium border border-green-500/30">
                                      Active
                                    </span>
                                  </td>
                                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                                    -
                                  </td>
                                  <td className="px-4 py-4 whitespace-nowrap text-sm text-white">
                                    28 credits
                                  </td>
                                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                                    Jul 29, 2025
                                  </td>
                                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                                    -
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "billing" && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">
                          Billing History
                        </h3>
                        <p className="text-gray-400 text-sm">
                          View your billing history
                        </p>
                      </div>

                      {/* Billing Table */}
                      <div className="border border-[#333] rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-[#2c2d30] border-b border-[#333]">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                  Invoice ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                  Billing Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                  Plan
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                  Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                  Status
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-[#1A1A1A] divide-y divide-[#333]">
                              {billingData.map((record, index) => (
                                <tr key={index}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                    {record.invoiceId}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {record.billingDate}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {record.plan}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                                    {record.amount}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-3 py-1 rounded-full bg-[#2c2d30] text-gray-300 text-xs font-medium">
                                      {record.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "support" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">
                          Contact Support
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Get help from our support team.
                        </p>
                      </div>

                      {/* Contact Support Form */}
                      <form className="space-y-6">
                        {/* Subject */}
                        <div>
                          <label className="block text-sm font-bold text-white mb-2">
                            Subject
                          </label>
                          <input
                            type="text"
                            value={supportSubject}
                            onChange={(e) => setSupportSubject(e.target.value)}
                            placeholder="Subject"
                            className="w-full px-4 py-3 rounded-lg bg-[#2c2d30] border border-[#333] text-white placeholder-gray-500 focus:outline-none focus:border-[#555]"
                          />
                        </div>

                        {/* Project */}
                        <div>
                          <label className="block text-sm font-bold text-white mb-2">
                            Project
                          </label>
                          <div className="relative">
                            <select
                              value={supportProject}
                              onChange={(e) =>
                                setSupportProject(e.target.value)
                              }
                              className="w-full px-4 py-3 rounded-lg bg-[#2c2d30] border border-[#333] text-white focus:outline-none focus:border-[#555] appearance-none cursor-pointer"
                            >
                              <option value="" disabled>
                                Select project ...
                              </option>
                              <option value="project1">Project 1</option>
                              <option value="project2">Project 2</option>
                            </select>
                            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
                          </div>
                        </div>

                        {/* Message */}
                        <div>
                          <label className="block text-sm font-bold text-white mb-2">
                            Message
                          </label>
                          <textarea
                            value={supportMessage}
                            onChange={(e) => setSupportMessage(e.target.value)}
                            placeholder="Your message"
                            rows={5}
                            className="w-full px-4 py-3 rounded-lg bg-[#2c2d30] border border-[#333] text-white placeholder-gray-500 focus:outline-none focus:border-[#555] resize-none"
                          />
                        </div>

                        {/* Attachments */}
                        <div>
                          <label className="block text-sm font-bold text-white mb-2">
                            Attachments
                          </label>
                          <label
                            htmlFor="support-file-upload"
                            className="flex flex-col items-center justify-center border-2 border-dashed border-[#333] rounded-lg p-8 bg-[#2c2d30] cursor-pointer hover:border-[#555] transition-colors"
                          >
                            <IoCloudUploadOutline className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-400">
                              Click to upload or drag and drop
                            </span>
                            <input
                              id="support-file-upload"
                              type="file"
                              onChange={(e) =>
                                setSupportFile(
                                  e.target.files ? e.target.files[0] : null
                                )
                              }
                              className="hidden"
                            />
                            {supportFile && (
                              <p className="text-xs text-green-400 mt-2">
                                Selected: {supportFile.name}
                              </p>
                            )}
                          </label>
                        </div>

                        {/* Form Actions */}
                        <div className="flex items-center justify-end gap-3 pt-4">
                          <button
                            type="button"
                            onClick={() => {
                              setOpenAccountSettings(false);
                              setSupportSubject("");
                              setSupportProject("");
                              setSupportMessage("");
                              setSupportFile(null);
                            }}
                            className="px-4 py-2 rounded-lg  text-white hover:bg-[#3c3d40] transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              // Handle form submission
                              console.log({
                                subject: supportSubject,
                                project: supportProject,
                                message: supportMessage,
                                file: supportFile,
                              });
                              // Reset form
                              setSupportSubject("");
                              setSupportProject("");
                              setSupportMessage("");
                              setSupportFile(null);
                            }}
                            className="px-4 py-2 rounded-lg bg-[#2c2d30] hover:opacity-[80%] text-white font-medium transition-colors"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
             
              {/* Add check box and selected in defaultfor privacy mode that We will use your data for accurate responses and training */}
             
             
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          onClick={() => setShowLogoutPopup(false)}
        >
          {/* Blur backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

          {/* Modal content */}
          <div
            className="relative w-full max-w-md bg-[#1A1A1A] rounded-2xl border border-[#333] shadow-2xl overflow-hidden animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-[#333]">
              <h3 className="text-xl font-bold text-white">Confirm Logout</h3>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-300 text-sm mb-6">
                Are you sure you want to log out? You&apos;ll need to sign in
                again to access your account.
              </p>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowLogoutPopup(false)}
                  className="px-4 py-2 rounded-lg bg-[#2c2d30] hover:bg-[#3c3d40] text-white text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-[#F16047] hover:bg-[#ff6b57] text-white text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <FiLogOut className="w-4 h-4" />
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Popup Modal */}
      {showUpgradePopup && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowUpgradePopup(false);
            }
          }}
        >
          {/* Blur backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

          {/* Modal content */}
          <div
            className="relative w-full max-w-[95%] h-[90vh] bg-[#1A1A1A] rounded-2xl border border-[#333] shadow-2xl overflow-hidden animate-fadeIn flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with title and close button */}
            <div className="flex justify-between items-center p-6 border-b border-[#333] flex-shrink-0">
              <h2 className="text-xl font-bold text-white">Upgrade Plan</h2>
              <button
                onClick={() => setShowUpgradePopup(false)}
                className="text-gray-400 hover:text-white transition-colors text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Pricing content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <PricingPage />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
