"use client";
import React, { Suspense, useEffect, useState } from "react";
import { ArrowRight, Edit, X, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { NEXT_PUBLIC_API } from "@/app/utils/config";
import { FiUser } from "react-icons/fi";
interface Sitedata {
  data: {
    content_counts: {
      posts: number;
      pages: number;
      comments: number;
      users: number;
    };
    user_counts: {
      admins: number;
      editors: number;
      authors: number;
      contributors: number;
      subscribers: number;
      total_users: number;
    };
    site_info: {
      site_name: string;
      site_url: string;
      site_language: string;
      site_timezone: string;
    };
    themes: {
      active_theme: string;
      current_theme: Currenttheme;
      available_themes: Currenttheme[];
    };
    recent_activity: {
      last_login: string;
      last_activity: string;
      last_user_registration: string;
      last_published_page: string;
      last_comment: string;
      last_plugin_update: string;
      last_post: string;
    };
    plugins: {
      active_plugins: string[];
      inactive_plugins: string[];
      total_plugins: number;
      plugin_list: {
        name: string;
        version: string;
        description: string;
        tags: string[];
        is_active: boolean;
      }[];
    };
  };
}
interface Currenttheme {
  author: string;
  name: string;
  version: string;
  description: string;
  tags: string[];
  preview_image: string;
}
function DashboardPage() {
  const [isPluginsOpen, setIsPluginsOpen] = useState(false);
  const [isDatabaseOpen, setIsDatabaseOpen] = useState(false);
  const [isServerOpen, setIsServerOpen] = useState(false);
  // const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [sitedata, setSitedata] = useState({} as Sitedata);
  const [loading, setLoading] = useState(true);
  // const [isPagesOpen, setIsPagesOpen] = useState(false);
  // const [isPostsOpen, setIsPostsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const search = useSearchParams();
  // const[siteId,setSiteId]=useState<string|null>(sessionStorage.getItem("siteId")||"");
  const siteId = sessionStorage.getItem("siteId") || "";

  const getSiteData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${NEXT_PUBLIC_API}/getsite/${siteId}`);
      console.log(res?.data?.data, "res?.data?.data");
      if (res?.data?.success) {
        setSitedata(res.data.data);
      }
    } catch (E) {
      console.log(E);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (siteId) {
      getSiteData();
    } else {
      setLoading(false);
    }
  }, [siteId]);
  const users = [
    {
      id: 1,
      avatar: "https://i.pravatar.cc/150?img=1",
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
    },
    {
      id: 2,
      avatar: "https://i.pravatar.cc/150?img=2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Editor",
    },
    {
      id: 3,
      avatar: "https://i.pravatar.cc/150?img=3",
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "User",
    },
    {
      id: 4,
      avatar: "https://i.pravatar.cc/150?img=4",
      name: "Sarah Williams",
      email: "sarah@example.com",
      role: "User",
    },
  ];

  const plugins = [
    {
      name: "Athena",
      service: "AWS",
      status: "Active",
      icon: "🗄️",
      color: "text-orange-400",
    },
    {
      name: "Athena",
      service: "AWS",
      status: "Active",
      icon: "🔍",
      color: "text-blue-400",
    },
    {
      name: "Databricks",
      service: "AWS",
      status: "Not Active",
      icon: "📚",
      color: "text-red-400",
    },
    {
      name: "MySQL",
      service: "AWS",
      status: "Not Active",
      icon: "🐬",
      color: "text-cyan-400",
    },
    {
      name: "PostgreSQL",
      service: "AWS",
      status: "Not Active",
      icon: "🐘",
      color: "text-blue-400",
    },
  ];

  // const pages = [
  //   {
  //     title: "Homepage",
  //     status: "Published",
  //     views: "1.2k",
  //     date: "Oct 12, 2025",
  //   },
  //   {
  //     title: "About Us",
  //     status: "Published",
  //     views: "856",
  //     date: "Oct 10, 2025",
  //   },
  //   { title: "Contact", status: "Draft", views: "0", date: "Oct 14, 2025" },
  //   {
  //     title: "Services",
  //     status: "Published",
  //     views: "643",
  //     date: "Oct 8, 2025",
  //   },
  // ];

  // const posts = [
  //   {
  //     title: "Getting Started with React",
  //     author: "John Doe",
  //     status: "Published",
  //     date: "Oct 13, 2025",
  //   },
  //   {
  //     title: "Advanced CSS Techniques",
  //     author: "Jane Smith",
  //     status: "Published",
  //     date: "Oct 11, 2025",
  //   },
  //   {
  //     title: "Understanding TypeScript",
  //     author: "Mike Johnson",
  //     status: "Draft",
  //     date: "Oct 14, 2025",
  //   },
  // ];

  // Hardcoded WordPress Plugins Data
  const wordpressPlugins = [
    {
      name: "Yoast SEO",
      version: "21.9",
      author: "Team Yoast",
      description: "The first true all-in-one SEO solution for WordPress",
      status: "Active",
    },
    {
      name: "WooCommerce",
      version: "8.6.0",
      author: "Automattic",
      description: "The eCommerce plugin for WordPress",
      status: "Active",
    },
    {
      name: "Contact Form 7",
      version: "5.9",
      author: "Takayuki Miyoshi",
      description: "Just another contact form plugin. Simple but flexible.",
      status: "Active",
    },
    {
      name: "Elementor",
      version: "3.19.0",
      author: "Elementor.com",
      description: "The most advanced frontend drag & drop page builder",
      status: "Inactive",
    },
    {
      name: "Akismet Anti-Spam",
      version: "5.3",
      author: "Automattic",
      description:
        "Used by millions, Akismet is quite possibly the best way to protect your blog from spam",
      status: "Active",
    },
    {
      name: "Wordfence Security",
      version: "7.11.1",
      author: "Wordfence",
      description:
        "Firewall, malware scan, blocking, live traffic, login security",
      status: "Inactive",
    },
    {
      name: "Jetpack",
      version: "13.0",
      author: "Automattic",
      description:
        "Security, performance, and marketing tools made by WordPress experts",
      status: "Active",
    },
  ];

  // Hardcoded WordPress Database Information
  const databaseInfo = {
    overview: {
      databaseName: "wp_db",
      type: "MySQL",
      version: "8.0.35",
      totalSize: "245.7 MB",
      totalTables: 23,
      collation: "utf8mb4_unicode_ci",
      host: "localhost",
      charset: "utf8mb4",
    },
    tables: [
      {
        name: "wp_options",
        size: "12.4 MB",
        rows: 1542,
        engine: "InnoDB",
      },
      {
        name: "wp_posts",
        size: "89.2 MB",
        rows: 1245,
        engine: "InnoDB",
      },
      {
        name: "wp_users",
        size: "2.1 MB",
        rows: 156,
        engine: "InnoDB",
      },
      {
        name: "wp_postmeta",
        size: "142.0 MB",
        rows: 5234,
        engine: "InnoDB",
      },
      {
        name: "wp_comments",
        size: "8.3 MB",
        rows: 892,
        engine: "InnoDB",
      },
      {
        name: "wp_usermeta",
        size: "3.2 MB",
        rows: 445,
        engine: "InnoDB",
      },
    ],
  };

  // Hardcoded WordPress Server Information
  const serverInfo = {
    general: {
      serverName: sitedata?.data?.server?.server_name || "Not found",
      operatingSystem: "Linux Ubuntu 22.04 LTS",
      serverSoftware: sitedata?.data?.server?.server_software || "Not found",
      phpVersion: sitedata?.data?.php_version || "Not found",
      mysqlVersion: "8.0.35",
      wordpressVersion: sitedata?.data?.wp_version || "Not found",
    },
    // resources: {
    //   cpuUsage: "42%",
    //   memoryUsage: "3.2 GB / 8 GB",
    //   diskUsage: "245.7 MB / 50 GB",
    //   uptime: "15 days, 8 hours",
    // },
    // performance: {
    //   maxExecutionTime: "300 seconds",
    //   memoryLimit: "256 MB",
    //   uploadMaxSize: "64 MB",
    //   postMaxSize: "64 MB",
    // },
    // security: {
    //   automatic_updates: sitedata?.data?.security?.automatic_updates || "Not found",
    //   firewallStatus: "Active",
    //   lastBackup: "2024-01-15 14:30:00",
    // },
  };

  const databases = [
    { name: "users_db", type: "PostgreSQL", size: "2.4 GB", tables: 12 },
    { name: "products_db", type: "MySQL", size: "1.8 GB", tables: 8 },
    { name: "analytics_db", type: "MongoDB", size: "5.2 GB", tables: 15 },
  ];

  // const servers = [
  //   {
  //     name: "Web Server 1",
  //     status: "Running",
  //     cpu: "45%",
  //     memory: "62%",
  //     uptime: "15 days",
  //   },
  //   {
  //     name: "API Server",
  //     status: "Running",
  //     cpu: "38%",
  //     memory: "54%",
  //     uptime: "22 days",
  //   },
  //   {
  //     name: "Database Server",
  //     status: "Running",
  //     cpu: "72%",
  //     memory: "81%",
  //     uptime: "30 days",
  //   },
  // ];

  const filteredPlugins = plugins.filter((plugin) => {
    if (activeTab === "All") return true;
    if (activeTab === "Active") return plugin.status === "Active";
    if (activeTab === "Not Active") return plugin.status === "Not Active";
    return true;
  });

  const filteredWordPressPlugins = sitedata?.data?.plugins?.plugin_list.filter(
    (plugin) => {
      if (activeTab === "All") return true;
      if (activeTab === "Active") return plugin.is_active === true;
      if (activeTab === "Not Active") return plugin.is_active === false;
      return true;
    }
  );

  // const recentActivity = [
  //   { activity: "Last Post", time: "6:19 pm" },
  //   { activity: "last_comment", time: "6:56 am" },
  //   { activity: '"last_user_registration', time: "11:53 pm" },
  //   { activity: '"last_plugin_update', time: "3:41 pm" },
  //   { activity: "/store/accessories/", time: "1:33 am" },
  // ];

  // Loading Component
  const LoadingAnimation = () => (
    <div className="w-full h-full  flex items-center justify-center">
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        .loader-ring {
          animation: spin 1.5s linear infinite;
        }
        
        .loader-dot {
          animation: pulse 1.5s ease-in-out infinite;
        }
        
        .loader-dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .loader-dot:nth-child(3) {
          animation-delay: 0.4s;
        }
      `}</style>
      <div className="flex flex-col items-center justify-center gap-6">
        {/* Animated Spinner */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-2 border-[#ffffff10] flex items-center justify-center">
            <div className="loader-ring w-12 h-12 border-2 border-transparent border-t-[#ffffff40] border-r-[#ffffff40] rounded-full"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm font-medium text-[#ffffff80]">Fetching Data</p>
          <div className="flex gap-1.5">
            <span className="loader-dot w-1.5 h-1.5 bg-[#ffffff40] rounded-full"></span>
            <span className="loader-dot w-1.5 h-1.5 bg-[#ffffff40] rounded-full"></span>
            <span className="loader-dot w-1.5 h-1.5 bg-[#ffffff40] rounded-full"></span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out forwards;
          opacity: 0;
        }
        
        .animate-delay-1 {
          animation-delay: 0.05s;
        }
        
        .animate-delay-2 {
          animation-delay: 0.1s;
        }
        
        .animate-delay-3 {
          animation-delay: 0.15s;
        }
        
        .animate-delay-4 {
          animation-delay: 0.2s;
        }
        
        .animate-delay-5 {
          animation-delay: 0.25s;
        }
        
        /* Prevent horizontal overflow on mobile */
        @media (max-width: 640px) {
          .grid {
            grid-template-columns: 1fr !important;
            gap: 0.5rem !important;
          }
          
          .card {
            min-width: 0;
            width: 100%;
            max-width: 100%;
          }
        }
      `}</style>
      {loading ? (
        <div className="h-[calc(100vh-80px)] flex items-center justify-center">
          <LoadingAnimation />
        </div>
      ) : (
        <div className="h-[calc(100vh-80px)]  overflow-y-auto overflow-x-hidden p-2 sm:p-4  text-white flex">
          <div className="w-full mx-auto max-w-full">
            {/* Top Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mb-2 sm:mb-4 w-full">
              {/* Users Card */}
              <div className="bg-[#2C2D3060] rounded-xl p-3 sm:p-6 border border-[#ffffff05] w-full min-w-0">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold">
                    {sitedata?.data?.user_counts?.total_users || 0} Users
                  </h2>
                  <div className="bg-[#ffffff05] p-2 sm:p-3 rounded-lg">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center mb-4 pn:max-sm:mb-0">
                  {users
                    .slice(0, sitedata?.data?.user_counts?.total_users || 4)
                    .map((user, index) => (
                      <div
                        key={user.id}
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#2C2D3060] bg-[#2c2d30] flex items-center justify-center ${
                          index !== 0 ? " sm:-ml-3" : ""
                        }`}
                      >
                        <FiUser className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-400" />
                      </div>
                    ))}
                </div>
                {/* <button
                  // onClick={() => setIsUsersOpen(true)}
                  className="flex items-center gap-2 text-xs sm:text-sm hover:text-zinc-300 transition-colors"
                >
                  View All <ArrowRight size={14} />
                </button> */}
              </div>

              {/* Pages Card */}
              <div className="bg-[#2C2D3060] rounded-xl p-3 sm:p-6 border border-[#ffffff05] w-full min-w-0">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold">Pages</h2>
                  <div className="bg-[#ffffff05] p-2 sm:p-3 rounded-lg">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-3xl sm:text-4xl font-bold">
                    {sitedata?.data?.content_counts?.comments || 0}
                  </span>
                  <span className="text-zinc-400 ml-2 text-sm sm:text-base">
                    comments
                  </span>
                </div>
                {/* <button
                  // onClick={() => setIsPagesOpen(true)}
                  className="flex items-center gap-2 text-xs sm:text-sm hover:text-zinc-300 transition-colors"
                >
                  View All <ArrowRight size={14} />
                </button> */}
              </div>

              {/* Posts Card */}
              <div className="bg-[#2C2D3060] rounded-xl p-3 sm:p-6 border border-[#ffffff05] w-full min-w-0">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold">Posts</h2>
                  <div className="bg-[#ffffff05] p-2 sm:p-3 rounded-lg">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-3xl sm:text-4xl font-bold">
                    {sitedata?.data?.content_counts?.posts || 0}
                  </span>
                </div>
                {/* <button
                  // onClick={() => setIsPostsOpen(true)}
                  className="flex items-center gap-2 text-xs sm:text-sm hover:text-zinc-300 transition-colors"
                >
                  View All <ArrowRight size={14} />
                </button> */}
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 w-full">
              {/* Themes Card */}
              <div className="bg-[#2C2D3060] rounded-xl p-3 sm:p-6 border border-[#ffffff05] w-full min-w-0">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                  </svg>
                  <h2 className="text-lg sm:text-xl font-semibold">Themes</h2>
                </div>

                <div className="mb-4 sm:mb-6">
                  <h3 className="text-xs sm:text-sm text-zinc-400 mb-2 sm:mb-3">
                    Current Theme
                  </h3>
                  <div className="flex items-start gap-3">
                    {/* <div className="w-24 h-16 bg-[#ffffff05] rounded overflow-hidden flex-shrink-0">
                    <img
                      src="https://via.placeholder.com/96x64/27272a/22c55e?text=Theme"
                      alt="Theme preview"
                      className="w-full h-full object-cover"
                    />
                  </div> */}
                    <div className="flex-1">
                      <h4 className="font-medium mb-1 text-sm sm:text-base">
                        {sitedata?.data?.themes?.current_theme?.name ||
                          "Theme title"}
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-400 truncate">
                        {sitedata?.data?.themes?.current_theme?.description.slice(
                          0,
                          30
                        ) || "Theme Description"}
                      </p>
                      <p className="text-xs text-zinc-500 truncate">
                        {sitedata?.data?.themes?.current_theme?.author ||
                          "Author"}
                      </p>
                    </div>
                    <button className="text-zinc-400 hover:text-white transition-colors">
                      <Edit size={16} />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs sm:text-sm text-zinc-400 mb-2 sm:mb-3">
                    Available themes
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {sitedata?.data?.themes?.available_themes?.length > 0 &&
                      sitedata?.data?.themes?.available_themes?.map((d, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 group cursor-pointer"
                        >
                          {/* <div className="w-24 h-16 bg-[#ffffff05] rounded overflow-hidden flex-shrink-0">
                      <img
                        src="https://via.placeholder.com/96x64/27272a/3b82f6?text=Theme+1"
                        alt="Theme 1"
                        className="w-full h-full object-cover"
                      />
                    </div> */}
                          <div className="flex-1">
                            <h4 className="font-medium mb-1 text-sm sm:text-base">
                              {d?.name || "Theme title"}
                            </h4>
                            <p className="text-xs sm:text-sm text-zinc-400">
                              ...
                            </p>
                            {/* <p className="text-xs text-zinc-500 truncate">
                        "last_user_registr...
                      </p> */}
                          </div>
                          <button className="text-zinc-400 group-hover:text-white transition-colors">
                            <ArrowRight size={16} />
                          </button>
                        </div>
                      ))}

                    {/* <div className="flex items-start gap-3 group cursor-pointer">
                    <div className="w-24 h-16 bg-[#ffffff05] rounded overflow-hidden flex-shrink-0">
                      <img
                        src="https://via.placeholder.com/96x64/27272a/f59e0b?text=Theme+2"
                        alt="Theme 2"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">Theme 2</h4>
                    </div>
                  </div> */}
                  </div>
                </div>
              </div>

              {/* Manage Card */}
              <div className="bg-[#2C2D3060] rounded-xl p-3 sm:p-6 border border-[#ffffff05] w-full min-w-0">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                  <h2 className="text-lg sm:text-xl font-semibold">Manage</h2>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <div className="flex items-start gap-2 sm:gap-3 mb-2">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 text-zinc-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                        />
                      </svg>
                      <div>
                        <h3 className="font-medium mb-1 text-sm sm:text-base">
                          Plugins info.
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-400">
                          Manage plugins
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsPluginsOpen(true)}
                      className="flex items-center gap-2 text-xs sm:text-sm hover:text-zinc-300 transition-colors ml-6 sm:ml-8"
                    >
                      View All <ArrowRight size={14} />
                    </button>
                  </div>

                  <div>
                    <div className="flex items-start gap-2 sm:gap-3 mb-2">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 text-zinc-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                        />
                      </svg>
                      <div>
                        <h3 className="font-medium mb-1 text-sm sm:text-base">
                          Database info.
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-400">
                          Browse through the directory
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsDatabaseOpen(true)}
                      className="flex items-center gap-2 text-xs sm:text-sm hover:text-zinc-300 transition-colors ml-6 sm:ml-8"
                    >
                      View All <ArrowRight size={14} />
                    </button>
                  </div>

                  <div>
                    <div className="flex items-start gap-2 sm:gap-3 mb-2">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 text-zinc-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                        />
                      </svg>
                      <div>
                        <h3 className="font-medium mb-1 text-sm sm:text-base">
                          Server info.
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-400">
                          Browse through the directory
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsServerOpen(true)}
                      className="flex items-center gap-2 text-xs sm:text-sm hover:text-zinc-300 transition-colors ml-6 sm:ml-8"
                    >
                      View All <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Activity Card */}
              <div className="bg-[#2C2D3060] rounded-xl p-3 sm:p-6 border border-[#ffffff05] w-full min-w-0">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h2 className="text-lg sm:text-xl font-semibold">
                    Recent Activity
                  </h2>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-xs sm:text-sm text-zinc-400 mb-2 sm:mb-3">
                    <span>Activity</span>
                    <span>Time</span>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    {/* {sitedata?.data?.recent_activity?.current_theme.map((item, index) => ( */}
                    <div
                      // key={index}
                      className="flex justify-between items-center py-1 sm:py-2"
                    >
                      <span className="text-xs sm:text-sm">Last Comment</span>
                      <span className="text-xs sm:text-sm text-zinc-400">
                        {sitedata?.data?.recent_activity?.last_comment}
                      </span>
                    </div>
                    <div
                      // key={index}
                      className="flex justify-between items-center py-1 sm:py-2"
                    >
                      <span className="text-xs sm:text-sm">
                        Last plugin update
                      </span>
                      <span className="text-xs sm:text-sm text-zinc-400">
                        {sitedata?.data?.recent_activity?.last_plugin_update}
                      </span>
                    </div>
                    <div
                      // key={index}
                      className="flex justify-between items-center py-1 sm:py-2"
                    >
                      <span className="text-xs sm:text-sm">Last post</span>
                      <span className="text-xs sm:text-sm text-zinc-400">
                        {sitedata?.data?.recent_activity?.last_post}
                      </span>
                    </div>
                    <div
                      // key={index}
                      className="flex justify-between items-center py-1 sm:py-2"
                    >
                      <span className="text-xs sm:text-sm">
                        Last user registration
                      </span>
                      <span className="text-xs sm:text-sm text-zinc-400">
                        {
                          sitedata?.data?.recent_activity
                            ?.last_user_registration
                        }
                      </span>
                    </div>
                    {/* ))} */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Plugins Modal */}
          {isPluginsOpen && (
            <div
              className="fixed inset-0 bg-black/50 opacity-100 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 animate-fadeIn overflow-x-hidden"
              onClick={() => setIsPluginsOpen(false)}
            >
              <div
                className="bg-[#1A1A1A] rounded-xl w-full max-w-md mx-2 sm:mx-0 border border-[#333] shadow-2xl animate-scaleIn max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#ffffff05]">
                  <h2 className="text-xl sm:text-2xl font-semibold">Plugins</h2>
                  <button
                    onClick={() => setIsPluginsOpen(false)}
                    className="text-zinc-400 hover:text-white transition-all duration-300 hover:rotate-90"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Total Plugins */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-[#333]">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 text-sm sm:text-base">
                      Total Plugins
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-white">
                      {sitedata?.data?.plugins?.total_plugins}
                    </span>
                  </div>
                </div>

                {/* Tabs and Search */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-[#ffffff05]">
                  <div className="flex items-center gap-1 sm:gap-2 mb-3 sm:mb-4">
                    <button
                      onClick={() => setActiveTab("All")}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 ${
                        activeTab === "All"
                          ? "bg-white text-black"
                          : "bg-[#ffffff05] text-zinc-400 hover:text-white"
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setActiveTab("Active")}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 ${
                        activeTab === "Active"
                          ? "bg-white text-black"
                          : "bg-[#ffffff05] text-zinc-400 hover:text-white"
                      }`}
                    >
                      Active
                    </button>
                    <button
                      onClick={() => setActiveTab("Not Active")}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 ${
                        activeTab === "Not Active"
                          ? "bg-white text-black"
                          : "bg-[#ffffff05] text-zinc-400 hover:text-white"
                      }`}
                    >
                      Not Active
                    </button>
                    <button className="ml-auto p-1.5 sm:p-2 bg-[#ffffff05] rounded-lg text-zinc-400 hover:text-white transition-all duration-300 hover:scale-110">
                      <Search size={16} />
                    </button>
                  </div>
                </div>

                {/* Plugin List */}
                <div className="p-4 sm:p-6 max-h-80 sm:max-h-96 overflow-y-auto">
                  <div className="space-y-2 sm:space-y-3">
                    {filteredWordPressPlugins.map((plugin, index) => (
                      <div
                        key={index}
                        className={`p-3 sm:p-4 bg-[#2c2d30] rounded-lg hover:bg-[#3c3d40] transition-all duration-300 animate-slideUp animate-delay-${Math.min(
                          index + 1,
                          5
                        )}`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-medium text-sm sm:text-base text-white mb-1">
                              {plugin.name}
                            </h3>
                            <p className="text-xs text-zinc-400 mb-2">
                              Version {plugin.version}
                            </p>
                            <p className="text-xs text-zinc-500 mb-1">
                              {plugin.description}
                            </p>
                            <p className="text-xs text-zinc-600">
                              by {plugin.author}
                            </p>
                          </div>
                          <span
                            className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ml-2 ${
                              plugin.is_active
                                ? "bg-green-500 text-white"
                                : "bg-zinc-600 text-zinc-300"
                            }`}
                          >
                            {plugin.is_active ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Database Info Modal */}
          {isDatabaseOpen && (
            <div
              className="fixed inset-0 bg-black/50 opacity-100 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 animate-fadeIn overflow-x-hidden"
              onClick={() => setIsDatabaseOpen(false)}
            >
              <div
                className="bg-[#1A1A1A] rounded-xl w-full max-w-4xl mx-2 sm:mx-0 border border-[#333] shadow-2xl animate-scaleIn max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#333]">
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">
                    Database Information
                  </h2>
                  <button
                    onClick={() => setIsDatabaseOpen(false)}
                    className="text-zinc-400 hover:text-white transition-all duration-300 hover:rotate-90"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  {/* Database Overview */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Database Overview
                    </h3>
                    <div className="p-4 bg-[#2c2d30] rounded-lg space-y-2">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-zinc-400">Name:</span>
                          <span className="text-sm font-medium text-white">
                            {sitedata?.data?.database?.db_name}
                          </span>
                        </div>
                        {/* <div className="flex justify-between">
                          <span className="text-sm text-zinc-400">Type:</span>
                          <span className="text-sm font-medium text-white">
                            {databaseInfo.overview.type}
                          </span>
                        </div> */}
                        {/* <div className="flex justify-between">
                          <span className="text-sm text-zinc-400">
                            Version:
                          </span>
                          <span className="text-sm font-medium text-white">
                            {databaseInfo.overview.version}
                          </span>
                        </div> */}
                        <div className="flex justify-between">
                          <span className="text-sm text-zinc-400">Size:</span>
                          <span className="text-sm font-medium text-white">
                            {sitedata?.data?.database?.db_size}
                          </span>
                        </div>
                        {/* <div className="flex justify-between">
                          <span className="text-sm text-zinc-400">Tables:</span>
                          <span className="text-sm font-medium text-white">
                            {databaseInfo.overview.totalTables}
                          </span>
                        </div> */}
                        <div className="flex justify-between">
                          <span className="text-sm text-zinc-400">Host:</span>
                          <span className="text-sm font-medium text-white">
                            {sitedata?.data?.database?.db_host}
                          </span>
                        </div>
                        {/* <div className="flex justify-between">
                          <span className="text-sm text-zinc-400">
                            Collation:
                          </span>
                          <span className="text-sm font-medium text-white">
                            {databaseInfo.overview.collation}
                          </span>
                        </div> */}
                        <div className="flex justify-between">
                          <span className="text-sm text-zinc-400">
                            Charset:
                          </span>
                          <span className="text-sm font-medium text-white">
                            {sitedata?.data?.database?.db_charset}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Database Tables */}
                  {/* <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Database Tables
                    </h3>
                    <div className="border border-[#333] rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-[#2c2d30]">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase">
                              Table Name
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase">
                              Size
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase">
                              Rows
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase">
                              Engine
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#333]">
                          {databaseInfo.tables.map((table, index) => (
                            <tr
                              key={index}
                              className="hover:bg-[#2c2d30] transition-colors"
                            >
                              <td className="px-4 py-3 text-sm text-white">
                                {table.name}
                              </td>
                              <td className="px-4 py-3 text-sm text-white">
                                {table.size}
                              </td>
                              <td className="px-4 py-3 text-sm text-zinc-400">
                                {table.rows.toLocaleString()}
                              </td>
                              <td className="px-4 py-3 text-sm text-zinc-400">
                                {table.engine}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          )}

          {/* Server Info Modal */}
          {isServerOpen && (
            <div
              className="fixed inset-0 bg-black/50 opacity-100 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 animate-fadeIn overflow-x-hidden"
              onClick={() => setIsServerOpen(false)}
            >
              <div
                className="bg-[#1A1A1A] rounded-xl w-full max-w-4xl mx-2 sm:mx-0 border border-[#333] shadow-2xl animate-scaleIn max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#333]">
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">
                    Server Information
                  </h2>
                  <button
                    onClick={() => setIsServerOpen(false)}
                    className="text-zinc-400 hover:text-white transition-all duration-300 hover:rotate-90"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 space-y-6">
                  {/* General Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                      General Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(serverInfo?.general).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="p-4 bg-[#2c2d30] rounded-lg flex justify-between items-center"
                          >
                            <span className="text-sm text-zinc-400 capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}:
                            </span>
                            <span className="text-sm font-medium text-white">
                              {value}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Resource Usage */}
                  {/* <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Resource Usage
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(serverInfo?.resources).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="p-4 bg-[#2c2d30] rounded-lg flex justify-between items-center"
                          >
                            <span className="text-sm text-zinc-400 capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}:
                            </span>
                            <span className="text-sm font-medium text-white">
                              {value}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div> */}

                  {/* Performance Settings */}
                  {/* <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Performance Settings
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(serverInfo?.performance).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="p-4 bg-[#2c2d30] rounded-lg flex justify-between items-center"
                          >
                            <span className="text-sm text-zinc-400 capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}:
                            </span>
                            <span className="text-sm font-medium text-white">
                              {value}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div> */}

                  {/* Security Information */}
                  {/* <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Security Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(serverInfo?.security).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="p-4 bg-[#2c2d30] rounded-lg flex justify-between items-center"
                          >
                            <span className="text-sm text-zinc-400 capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}:
                            </span>
                            <span className="text-sm font-medium text-white">
                              {value}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default function AdminDashboard() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <DashboardPage />
    </Suspense>
  );
}
