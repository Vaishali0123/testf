"use client";
import { useAuthContext } from "@/app/utils/auth";
import { NEXT_PUBLIC_API } from "@/app/utils/config";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosAdd } from "react-icons/io";

interface Site {
  _id: string;
  name: string;
  url: string;
  site_url: string;
  logo: string;
  title: string;
  data: {
    site_id: string;
    site_name: string;
    url: string;
    site_url: string;
    logo: string;
    title: string;
  };
}

const Page = () => {
  const router = useRouter();
  const [sites, setSites] = useState([]);
  const [addproject, setAddproject] = useState(false);
  const [siteUrl, setSiteUrl] = useState("");
  const { data } = useAuthContext();

  const handleConnect = async () => {
    if (!data) return alert("User data is missing");
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
        email: data?.email ? data?.email : data?.user?.email,
        site_url: cleanUrl,
      });

      if (!res?.data?.success) return alert("Something went wrong");
      setAddproject(false);
      if (data) {
        getSites();
      }
      // Open plugins page in new tab
      window.open(pluginsUrl, "_blank");
    } catch (err) {
      console.error(err);
      alert("Invalid site URL");
    }
  };

  const getSites = async () => {
    try {
      const res = await axios.get(
        `${NEXT_PUBLIC_API}/getUserSites/${data?.user?._id || data?._id}`
      );

      if (res?.data?.success) {
        setSites(res?.data?.sites);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (data) {
      getSites();
    }
  }, [data]);
  return (
    <div className="flex w-full overflow-hidden h-full ">
      <div className="w-full  flex flex-wrap gap-4 p-4">
        <div
          onClick={() => {
            // setAddproject(true);
            if (typeof window !== "undefined") {
              sessionStorage.removeItem("siteId");
              sessionStorage.removeItem("siteurl");
            }
            router.push("/webapp");
          }}
          className="w-[320px] h-[200px] bg-gradient-to-bl flex items-center justify-center flex-col from-[#d9d9d900] via-[#7373730d] to-[#737373] rounded-3xl  border hover:scale-105 duration-300"
        >
          <IoIosAdd size={40} color="#BDC1CA" />
          <div className="text-[#BDC1CA]">New Project</div>
        </div>
        {sites.length > 0 &&
          sites.map((site: Site, index) => (
            <div
              key={index}
              className="w-[320px] h-[200px] bg-gradient-to-bl overflow-hidden flex items-center justify-center flex-col from-[#d9d9d900] via-[#7373730d] to-[#737373] rounded-3xl  border hover:scale-105 duration-300"
            >
              <img
                src={site?.logo}
                alt="pic"
                className="w-full h-[70%] object-cover"
              />
              <div className="w-full bg-[#18191C] rounded-2xl h-[30%] flex flex-row ">
                <div
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      sessionStorage.setItem("siteId", site._id);
                      sessionStorage.setItem("siteurl", site.site_url);
                    }
                    router.push("/webapp");
                  }}
                  className="w-[85%] h-[100%]  px-2 flex flex-col justify-center"
                >
                  <div className="font-bold text-[#fff]">
                    {site?.data?.site_name || "Site Title"}
                  </div>
                  <div className="text-[12px]">Lets start editing..</div>
                </div>
                <Link
                  href={`/webapp/dashboard?siteId=${site._id}`}
                  className="w-[20%]  justify-center items-center flex h-[100%]"
                >
                  <BsThreeDotsVertical
                    size={15}
                    color="#fff"
                    className="hover:text-[#888] cursor-pointer"
                  />
                </Link>
              </div>
            </div>
          ))}
        {addproject && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center h-screen z-50">
            <div className="bg-white/5 text-white relative flex flex-col items-center justify-evenly shadow-md rounded-lg p-8 w-full max-w-md ">
              <h1 className="text-xl font-semibold mb-6 text-center">
                Connect to Your WordPress Site
              </h1>

              <label className="block mb-2 text-sm font-medium">
                Enter Site URL
              </label>
              <input
                type="text"
                placeholder="example.com"
                className="w-full outline-none text-black  border border-gray-300  p-2 mb-4"
                value={siteUrl}
                onChange={(e) => setSiteUrl(e.target.value)}
                required
              />

              <button
                onClick={handleConnect}
                className="w-[50%] bg-blue-600 text-white py-2  hover:bg-blue-700"
              >
                Connect
              </button>
              <button
                onClick={() => {
                  setAddproject(false);
                }}
                className=" bg-red-600  mt-4 w-[50%] text-white py-2  hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {/* <div className="w-[320px] h-[200px] bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#737373] border hover:scale-105"></div>
        <div className="w-[320px] h-[200px] bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#737373] border hover:scale-105"></div>
        <div className="w-[320px] h-[200px] bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#737373] border hover:scale-105"></div> */}
      </div>
    </div>
  );
};

export default Page;
