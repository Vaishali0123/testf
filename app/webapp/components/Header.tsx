"use client";
import { setBasicdata } from "@/app/redux/slices/basicDetails";
import { RootState } from "@/app/redux/store";
import { useAuthContext } from "@/app/utils/auth";
import { NEXT_PUBLIC_API } from "@/app/utils/config";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import { FaMobileAlt } from "react-icons/fa";
import { IoIosTabletPortrait, IoMdLaptop } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

interface Site {
  _id: string;
  name: string;
  url: string;
  site_url: string;
  logo: string;
}
const Header = () => {
  const path = usePathname();
  const [sites, setSites] = useState([]);
  const [currentsite, setCurrentsite] = useState("");
  // const [tab, setTab] = useState("tab");
  const [currentsitename, setCurrentsitename] = useState("tab");
  const [currentsitedata, setCurrentsitedata] = useState({});
  const { data } = useAuthContext();
  const tab = useSelector((state: RootState) => state.basicDetails.data.tab);

  const dispatch = useDispatch();
  const getSites = async () => {
    try {
      const res = await axios.get(
        `${NEXT_PUBLIC_API}/getUserSites/${data?._id}`
      );

      setSites(res?.data?.sites);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    setCurrentsite(sessionStorage.getItem("siteId") || "");
    setCurrentsitename(sessionStorage.getItem("siteurl") || "");
    if(data)
   { getSites();}
  }, []);

  return (
    <div className="h-[60px]">
      <div className="h-[100%] w-full flex px-6 gap-4 py-1 justify-center items-center ">
        {path === "/webapp" && currentsite && (
          <div className="flex gap-4 w-[60%] justify-end">
            {[
              // Move the current site to the end
              ...sites.filter((site: Site) => site._id !== currentsite),
              ...sites.filter((site: Site) => site._id === currentsite),
            ].map((site: Site) => (
              <div
                key={site._id}
                onClick={() => {
                  setCurrentsite(site._id);
                  sessionStorage.setItem("siteId", site._id);
                  sessionStorage.setItem("siteurl", site.site_url);
                }}
                className={`h-[50px] w-[50px] ${
                  currentsite === site._id ? "border " : "scale-90"
                } rounded-full`}
              >
                <img
                  src={site?.logo}
                  alt="pic"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
        {path === "/webapp" && currentsite && (
          <div className="w-[1px] h-full bg-[#626262]"></div>
        )}

        <div className="px-4 flex flex-col items-center">
          <div className="text-[#fff]">
            {path === "/webapp" || !currentsite
              ? currentsitename || "Workspace"
              : path === "/webapp/dashboard"
              ? "Dashboard"
              : path === "/webapp/settings"
              ? "Settings"
              : "Projects"}
          </div>
          <div className="text-[#626262] text-[12px]">@Webivus</div>
        </div>
        {path === "/webapp" && currentsite && (
          <div className="w-[1px] h-full bg-[#626262] "></div>
        )}
        {/* Change layouts */}
        {path === "/webapp" && currentsite && (
          <div className=" flex items-center gap-2 border border-[#888] p-1  rounded-full">
            <button
              onClick={() => {
                // setTab("phone");
                dispatch(setBasicdata({ tab: "phone" }));
                sessionStorage.setItem("tab", "phone");
              }}
              className={`p-2 rounded-full ${
                tab === "phone" ? "bg-white text-black" : "text-white"
              }`}
            >
              <FaMobileAlt size={17} />
            </button>
            <button
              onClick={() => {
                // setTab("tab");
                dispatch(setBasicdata({ tab: "tab" }));

                sessionStorage.setItem("tab", "tab");
              }}
              className={`p-2 rounded-full ${
                tab === "tab" ? "bg-white text-black" : "text-white"
              }`}
            >
              <IoIosTabletPortrait size={20} />
            </button>
            {/* <div
            className={`${
              tab === "tab" && "bg-white  h-full w-full my-2 rounded-full"
            }`}
          >
            <IoIosTabletPortrait
              onClick={() => {
                setTab("tab");
              }}
              size={20}
              className={`${tab === "tab" ? " text-black" : "text-white"}`}
            />
          </div> */}
            <button
              onClick={() => {
                // setTab("laptop");
                dispatch(setBasicdata({ tab: "laptop" }));

                sessionStorage.setItem("tab", "laptop");
              }}
              className={`p-2 rounded-full ${
                tab === "laptop" ? "bg-white text-black" : "text-white"
              }`}
            >
              <IoMdLaptop size={20} />
            </button>
          </div>
        )}
        {path === "/webapp" && currentsite && (
          <div className="w-[1px] h-full bg-[#626262]"></div>
        )}

        {path === "/webapp" && currentsite && (
          <div className="flex items-center gap-5 w-[40%] justify-end">
            <button className="text-[14px] text-[#999] hover:text-white">
              Save Draft
            </button>
            <button className="text-black font-semibold hover:bg-slate-200  bg-white h-[30px] px-4 text-[12px]">
              Publish
            </button>
          </div>
        )}
      </div>

      <div className="h-[1px] bg-[radial-gradient(circle_at_center,_#959595,_#1e1e1e)]"></div>
    </div>
  );
};

export default Header;
