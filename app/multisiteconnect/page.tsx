"use client";

import axios from "axios";
import { useState } from "react";

export default function MultisiteConnectPage() {
  const [siteUrl, setSiteUrl] = useState("");
  const email = "web@gmail.com";
  // console.log(email, "email");
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
      const res = await axios.post("http://localhost:7002/api/site", {
        email,
        site_url: cleanUrl,
      });

      console.log(res?.data?.success);
      if (!res?.data?.success) return alert("Something went wrong");

      // Open plugins page in new tab
      window.open(pluginsUrl, "_blank");
    } catch (err) {
      console.error(err);
      alert("Invalid site URL");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 text-black">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-xl font-semibold mb-6 text-center">
          Connect to Your WordPress Site
        </h1>

        <label className="block mb-2 text-sm font-medium">Enter Site URL</label>
        <input
          type="text"
          placeholder="example.com"
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
          value={siteUrl}
          onChange={(e) => setSiteUrl(e.target.value)}
          required
        />

        <button
          onClick={handleConnect}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Connect
        </button>
      </div>
    </div>
  );
}
