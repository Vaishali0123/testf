// "use client";

// import {
//   FiFile,
//   FiUsers,
//   FiImage,
//   FiMessageSquare,
//   FiSettings,
//   FiZap,
// } from "react-icons/fi";
// import { FaRegNewspaper } from "react-icons/fa";
// import { BsPlugin, BsPalette } from "react-icons/bs";

// export default function Page() {
//   return (
//     <div className="h-full overflow-y-scroll p-4 border text-white flex">
//       {/* Main Content */}
//       <div className="flex-1 ">
//         {/* Stats Section */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#7373731c] p-4 rounded-sm shadow border  flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-400">Pages</p>
//               <p className="text-2xl font-bold">0</p>
//             </div>
//             <FiFile className="text-blue-400" size={28} />
//           </div>
//           <div className="bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#7373731c] p-4 rounded-sm shadow border  flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-400">Posts</p>
//               <p className="text-2xl font-bold">0</p>
//             </div>
//             <FaRegNewspaper className="text-green-400" size={28} />
//           </div>
//           <div className="bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#7373731c] p-4 rounded-sm shadow border  flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-400">Users</p>
//               <p className="text-2xl font-bold">0</p>
//             </div>
//             <FiUsers className="" size={28} />
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
//           <FiZap className="text-yellow-400" /> Quick Actions
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//           <div className="bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#7373731c] p-4 rounded-sm border  flex items-center gap-3 cursor-pointer ho">
//             <FiFile className="text-blue-400" />
//             Create a new page called &quot;About Us&quot; with welcome content
//           </div>
//           <div className="bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#7373731c] p-4 rounded-sm border  flex items-center gap-3 cursor-pointer ho">
//             <FiFile className="text-blue-400" />
//             List all my published pages
//           </div>
//           <div className="bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#7373731c] p-4 rounded-sm border  flex items-center gap-3 cursor-pointer ho">
//             <FaRegNewspaper className="text-green-400" />
//             Create a blog post about AI technology
//           </div>
//           <div className="bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#7373731c] p-4 rounded-sm border  flex items-center gap-3 cursor-pointer ho">
//             <FaRegNewspaper className="text-green-400" />
//             Show me all draft posts
//           </div>
//           <div className="bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#7373731c] p-4 rounded-sm border  flex items-center gap-3 cursor-pointer ho">
//             <FiSettings className="text-gray-400" />
//             Change site title to &quot;My AI Website&quot;
//           </div>
//           <div className="bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#7373731c] p-4 rounded-sm border  flex items-center gap-3 cursor-pointer ho">
//             <FiFile className="text-blue-400" />
//             Create a contact page with form
//           </div>
//         </div>

//         {/* WordPress Management */}
//         <h2 className="text-sm font-semibold mb-4">🛠 WordPress Management</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//           {[
//             {
//               name: "Pages",
//               icon: <FiFile className="text-blue-400" size={20} />,
//             },
//             {
//               name: "Posts",
//               icon: <FaRegNewspaper className="text-green-400" size={20} />,
//             },
//             {
//               name: "Media",
//               icon: <FiImage className="text-pink-400" size={20} />,
//             },
//             {
//               name: "Comments",
//               icon: <FiMessageSquare className="text-yellow-400" size={20} />,
//             },
//             {
//               name: "Users",
//               icon: <FiUsers className="text-purple-400" size={20} />,
//             },
//             {
//               name: "Themes",
//               icon: <BsPalette className="text-red-400" size={20} />,
//             },
//             {
//               name: "Plugins",
//               icon: <BsPlugin className="text-orange-400" size={20} />,
//             },
//             {
//               name: "Settings",
//               icon: <FiSettings className="text-gray-400" size={20} />,
//             },
//           ].map((item, i) => (
//             <div
//               key={i}
//               className="bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#7373731c] p-4 rounded-sm border  flex flex-col items-center justify-center gap-2 cursor-pointer ho"
//             >
//               {item.icon}
//               <span>{item.name}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }import React, { useState } from 'react';
"use client";
import React, { Suspense, useEffect, useState } from "react";
import { ArrowRight, Edit, X, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { NEXT_PUBLIC_API } from "@/app/utils/config";
interface Sitedata {
  data:{
  content_counts: {
    posts: number;
    pages: number;
    comments: number;
    users: number;
  },
  user_counts: {
    admins: number;
    editors: number;
    authors: number;
    contributors: number;
    subscribers: number;total_users:number;
  },
  site_info: {
    site_name: string;
    site_url: string;
    site_language: string;
    site_timezone: string;
  },
themes:{
  active_theme: string;
  current_theme:Currenttheme;
  available_themes:Currenttheme[];
},
recent_activity:{
  last_login: string;
  last_activity: string;
  last_user_registration: string;
  last_published_page: string;
  last_comment: string;
  last_plugin_update: string;
last_post:string;
}
  }
}
interface Currenttheme {
   author: string;
    name: string;
    version: string;
    description: string;
    tags: string[];
    preview_image: string;

}
 function DashboardPage () {
  const [isPluginsOpen, setIsPluginsOpen] = useState(false);
  // const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [sitedata, setSitedata] = useState({} as Sitedata);
  // const [isPagesOpen, setIsPagesOpen] = useState(false);
  // const [isPostsOpen, setIsPostsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
const search=useSearchParams()
const siteId=search.get("siteId")

const getSiteData=async()=>{
  try{
    const res=await axios.get(`${NEXT_PUBLIC_API}/getsite/${siteId}`)
    if(res?.data?.success){
    setSitedata(res.data.data)
    }

  }
  catch(E){
    console.log(E)
  }
}
useEffect(()=>{
  getSiteData()
},[siteId])
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

  // const recentActivity = [
  //   { activity: "Last Post", time: "6:19 pm" },
  //   { activity: "last_comment", time: "6:56 am" },
  //   { activity: '"last_user_registration', time: "11:53 pm" },
  //   { activity: '"last_plugin_update', time: "3:41 pm" },
  //   { activity: "/store/accessories/", time: "1:33 am" },
  // ];

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
      `}</style>
      <div className="h-[calc(100vh-80px)] overflow-y-scroll p-4 border text-white flex">
        <div className="w-full mx-auto">
          {/* Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
            {/* Users Card */}
            <div className="bg-zinc-900 scale-90 rounded-xl p-6 border border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">{sitedata?.data?.user_counts?.total_users || 0} Users</h2>
                <div className="bg-zinc-800 p-3 rounded-lg">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center mb-4">
                {users.slice(0, sitedata?.data?.user_counts?.total_users).map((user, index) => (
                  <div
                    key={user.id}
                    className={`w-12 h-12 rounded-full border-2 border-zinc-900 overflow-hidden ${
                      index !== 0 ? "-ml-3" : ""
                    }`}
                  >
                    <img
                      src={user.avatar}
                      alt={`User ${user.id}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <button
                // onClick={() => setIsUsersOpen(true)}
                className="flex items-center gap-2 text-sm hover:text-zinc-300 transition-colors"
              >
                View All <ArrowRight size={16} />
              </button>
            </div>

            {/* Pages Card */}
            <div className="bg-zinc-900 scale-90 rounded-xl p-6 border border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Pages</h2>
                <div className="bg-zinc-800 p-3 rounded-lg">
                  <svg
                    className="w-6 h-6"
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
                <span className="text-4xl font-bold">{sitedata?.data?.content_counts?.comments || 0}</span>
                <span className="text-zinc-400 ml-2">comments</span>
              </div>
              <button
                // onClick={() => setIsPagesOpen(true)}
                className="flex items-center gap-2 text-sm hover:text-zinc-300 transition-colors"
              >
                View All <ArrowRight size={16} />
              </button>
            </div>

            {/* Posts Card */}
            <div className="bg-zinc-900 scale-90 rounded-xl p-6 border border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Posts</h2>
                <div className="bg-zinc-800 p-3 rounded-lg">
                  <svg
                    className="w-6 h-6 text-green-400"
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
                <span className="text-4xl font-bold">{sitedata?.data?.content_counts?.posts || 0}</span>
              </div>
              <button
                // onClick={() => setIsPostsOpen(true)}
                className="flex items-center gap-2 text-sm hover:text-zinc-300 transition-colors"
              >
                View All <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1  md:grid-cols-3 gap-2">
            {/* Themes Card */}
            <div className="bg-zinc-900 scale-90 rounded-xl p-6 border border-zinc-800">
              <div className="flex items-center gap-2 mb-6">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                </svg>
                <h2 className="text-xl font-semibold">Themes</h2>
              </div>

              <div className="mb-6">
                <h3 className="text-sm text-zinc-400 mb-3">Current Theme</h3>
                <div className="flex items-start gap-3">
                  <div className="w-24 h-16 bg-zinc-800 rounded overflow-hidden flex-shrink-0">
                    <img
                      src="https://via.placeholder.com/96x64/27272a/22c55e?text=Theme"
                      alt="Theme preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{sitedata?.data?.themes?.current_theme?.name || "Theme title"}</h4>
                    <p className="text-sm text-zinc-400 truncate">{sitedata?.data?.themes?.current_theme?.description.slice(0,30) || "Theme Description"}</p>
                    <p className="text-xs text-zinc-500 truncate">
                 {sitedata?.data?.themes?.current_theme?.author || "Author"}
                    </p>
                  </div>
                  <button className="text-zinc-400 hover:text-white transition-colors">
                    <Edit size={18} />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm text-zinc-400 mb-3">Available themes</h3>
                <div className="space-y-3">
                  {sitedata?.data?.themes?.available_themes?.length>0 && sitedata?.data?.themes?.available_themes?.map((d,i)=>(
                      <div key={i} className="flex items-start gap-3 group cursor-pointer">
                    <div className="w-24 h-16 bg-zinc-800 rounded overflow-hidden flex-shrink-0">
                      <img
                        src="https://via.placeholder.com/96x64/27272a/3b82f6?text=Theme+1"
                        alt="Theme 1"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{d?.name || "Theme title"}</h4>
                      <p className="text-sm text-zinc-400">...</p>
                      {/* <p className="text-xs text-zinc-500 truncate">
                        "last_user_registr...
                      </p> */}
                    </div>
                    <button className="text-zinc-400 group-hover:text-white transition-colors">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                  ))}
                
                  {/* <div className="flex items-start gap-3 group cursor-pointer">
                    <div className="w-24 h-16 bg-zinc-800 rounded overflow-hidden flex-shrink-0">
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
            <div className="bg-zinc-900 scale-90 rounded-xl p-6 border border-zinc-800">
              <div className="flex items-center gap-2 mb-6">
                <svg
                  className="w-5 h-5"
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
                <h2 className="text-xl font-semibold">Manage</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-start gap-3 mb-2">
                    <svg
                      className="w-5 h-5 mt-0.5 text-zinc-400"
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
                      <h3 className="font-medium mb-1">Plugins info.</h3>
                      <p className="text-sm text-zinc-400">Manage plugins</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsPluginsOpen(true)}
                    className="flex items-center gap-2 text-sm hover:text-zinc-300 transition-colors ml-8"
                  >
                    View All <ArrowRight size={16} />
                  </button>
                </div>

                <div>
                  <div className="flex items-start gap-3 mb-2">
                    <svg
                      className="w-5 h-5 mt-0.5 text-zinc-400"
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
                      <h3 className="font-medium mb-1">Database info.</h3>
                      <p className="text-sm text-zinc-400">
                        Browse through the directory
                      </p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 text-sm hover:text-zinc-300 transition-colors ml-8">
                    View All <ArrowRight size={16} />
                  </button>
                </div>

                <div>
                  <div className="flex items-start gap-3 mb-2">
                    <svg
                      className="w-5 h-5 mt-0.5 text-zinc-400"
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
                      <h3 className="font-medium mb-1">Server info.</h3>
                      <p className="text-sm text-zinc-400">
                        Browse through the directory
                      </p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 text-sm hover:text-zinc-300 transition-colors ml-8">
                    View All <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Activity Card */}
            <div className="bg-zinc-900 scale-90 rounded-xl p-6 border border-zinc-800">
              <div className="flex items-center gap-2 mb-6">
                <svg
                  className="w-5 h-5"
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
                <h2 className="text-xl font-semibold">Recent Activity</h2>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-zinc-400 mb-3">
                  <span>Activity</span>
                  <span>Time</span>
                </div>
                <div className="space-y-3">
                  {/* {sitedata?.data?.recent_activity?.current_theme.map((item, index) => ( */}
                    <div
                      // key={index}
                      className="flex justify-between items-center py-2"
                    >
                      <span className="text-sm">Last Comment</span>
                      <span className="text-sm text-zinc-400">{sitedata?.data?.recent_activity?.last_comment}</span>
                    </div>
                     <div
                      // key={index}
                      className="flex justify-between items-center py-2"
                    >
                      <span className="text-sm">Last plugin update</span>
                      <span className="text-sm text-zinc-400">{sitedata?.data?.recent_activity?.last_plugin_update}</span>
                    </div>
                     <div
                      // key={index}
                      className="flex justify-between items-center py-2"
                    >
                      <span className="text-sm">Last post</span>
                      <span className="text-sm text-zinc-400">{sitedata?.data?.recent_activity?.last_post}</span>
                    </div>
                     <div
                      // key={index}
                      className="flex justify-between items-center py-2"
                    >
                      <span className="text-sm">Last user registration</span>
                      <span className="text-sm text-zinc-400">{sitedata?.data?.recent_activity?.last_user_registration}</span>
                    </div>
                  {/* ))} */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Plugins Modal */}
        {isPluginsOpen && (
          <div className="fixed inset-0  bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-zinc-900 rounded-xl w-full max-w-md border border-zinc-800 shadow-2xl animate-scaleIn">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                <h2 className="text-2xl font-semibold">Plugins</h2>
                <button
                  onClick={() => setIsPluginsOpen(false)}
                  className="text-zinc-400 hover:text-white transition-all duration-300 hover:rotate-90"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Total Plugins */}
              <div className="px-6 py-4 border-b border-zinc-800">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Total Plugins</span>
                  <span className="text-3xl font-bold">{plugins.length}</span>
                </div>
              </div>

              {/* Tabs and Search */}
              <div className="px-6 py-4 border-b border-zinc-800">
                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={() => setActiveTab("All")}
                    className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 transform hover:scale-105 ${
                      activeTab === "All"
                        ? "bg-white text-black"
                        : "bg-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveTab("Active")}
                    className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 transform hover:scale-105 ${
                      activeTab === "Active"
                        ? "bg-white text-black"
                        : "bg-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setActiveTab("Not Active")}
                    className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 transform hover:scale-105 ${
                      activeTab === "Not Active"
                        ? "bg-white text-black"
                        : "bg-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    Not Active
                  </button>
                  <button className="ml-auto p-2 bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-all duration-300 hover:scale-110">
                    <Search size={18} />
                  </button>
                </div>
              </div>

              {/* Plugin List */}
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="space-y-3">
                  {filteredPlugins.map((plugin, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-4 bg-zinc-800 rounded-lg hover:bg-zinc-750 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-slideUp animate-delay-${Math.min(
                        index + 1,
                        5
                      )}`}
                    >
                      <div
                        className={`text-3xl ${plugin.color} transition-transform duration-300 hover:scale-110`}
                      >
                        {plugin.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{plugin.name}</h3>
                        <p className="text-sm text-zinc-400">
                          {plugin.service}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                          plugin.status === "Active"
                            ? "bg-green-500 text-white"
                            : "bg-yellow-500 text-black"
                        }`}
                      >
                        {plugin.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
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
