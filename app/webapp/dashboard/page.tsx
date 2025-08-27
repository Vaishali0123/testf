"use client";

import {
  FiFile,
  FiUsers,
  FiImage,
  FiMessageSquare,
  FiSettings,
  FiZap,
} from "react-icons/fi";
import { FaRegNewspaper } from "react-icons/fa";
import { BsPlugin, BsPalette } from "react-icons/bs";

export default function Page() {
  return (
    <div className="h-full overflow-y-scroll p-4 border text-white flex">
      {/* Main Content */}
      <div className="flex-1 ">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#7373731c] p-4 rounded-sm shadow border  flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Pages</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <FiFile className="text-blue-400" size={28} />
          </div>
          <div className="bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#7373731c] p-4 rounded-sm shadow border  flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Posts</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <FaRegNewspaper className="text-green-400" size={28} />
          </div>
          <div className="bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#7373731c] p-4 rounded-sm shadow border  flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Users</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <FiUsers className="" size={28} />
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <FiZap className="text-yellow-400" /> Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#7373731c] p-4 rounded-sm border  flex items-center gap-3 cursor-pointer ho">
            <FiFile className="text-blue-400" />
            Create a new page called "About Us" with welcome content
          </div>
          <div className="bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#7373731c] p-4 rounded-sm border  flex items-center gap-3 cursor-pointer ho">
            <FiFile className="text-blue-400" />
            List all my published pages
          </div>
          <div className="bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#7373731c] p-4 rounded-sm border  flex items-center gap-3 cursor-pointer ho">
            <FaRegNewspaper className="text-green-400" />
            Create a blog post about AI technology
          </div>
          <div className="bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#7373731c] p-4 rounded-sm border  flex items-center gap-3 cursor-pointer ho">
            <FaRegNewspaper className="text-green-400" />
            Show me all draft posts
          </div>
          <div className="bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#7373731c] p-4 rounded-sm border  flex items-center gap-3 cursor-pointer ho">
            <FiSettings className="text-gray-400" />
            Change site title to "My AI Website"
          </div>
          <div className="bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#7373731c] p-4 rounded-sm border  flex items-center gap-3 cursor-pointer ho">
            <FiFile className="text-blue-400" />
            Create a contact page with form
          </div>
        </div>

        {/* WordPress Management */}
        <h2 className="text-sm font-semibold mb-4">🛠 WordPress Management</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            {
              name: "Pages",
              icon: <FiFile className="text-blue-400" size={20} />,
            },
            {
              name: "Posts",
              icon: <FaRegNewspaper className="text-green-400" size={20} />,
            },
            {
              name: "Media",
              icon: <FiImage className="text-pink-400" size={20} />,
            },
            {
              name: "Comments",
              icon: <FiMessageSquare className="text-yellow-400" size={20} />,
            },
            {
              name: "Users",
              icon: <FiUsers className="text-purple-400" size={20} />,
            },
            {
              name: "Themes",
              icon: <BsPalette className="text-red-400" size={20} />,
            },
            {
              name: "Plugins",
              icon: <BsPlugin className="text-orange-400" size={20} />,
            },
            {
              name: "Settings",
              icon: <FiSettings className="text-gray-400" size={20} />,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#7373731c] p-4 rounded-sm border  flex flex-col items-center justify-center gap-2 cursor-pointer ho"
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
