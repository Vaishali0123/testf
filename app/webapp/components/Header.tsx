"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bs0Circle } from "react-icons/bs";

const Header = () => {
  const [sites, setSites] = useState([]);
  const getSites = async () => {
    try {
      const res = await axios.get(
        "http://localhost:7002/api/getUserSites/web@gmail.com"
      );

      setSites(res?.data?.sites);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getSites();
  }, []);
  return (
    <div className="h-[60px]  ">
      <div className="h-[100%] w-full flex gap-4 py-1 justify-center items-center ">
        <div className="flex gap-4">
          {sites?.map((site: any) => (
            <div
              onClick={() => {
                sessionStorage.setItem("siteId", site._id);
                sessionStorage.setItem("siteurl", site.site_url);
              }}
              className="h-[50px] w-[50px] rounded-full border border-[#373737] "
            >
              <img
                src={site?.logo}
                alt="pic"
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* <div className="h-[50px] w-[50px] rounded-full border border-[#373737]"></div>
          <div className="h-[50px] w-[50px] rounded-full border border-[#373737]"></div>

          <div className="h-[50px] w-[50px] rounded-full border border-[#373737]"></div>
          <div className="h-[50px] w-[50px] rounded-full border border-[#373737]"></div> */}
        </div>
        <div className="w-[1px] h-full bg-[#626262]"></div>
        <div className="px-4 flex flex-col items-center">
          <div className="text-[#959595]">Willowave</div>
          <div className="text-[#626262] text-[12px]">@Webivus</div>
        </div>
        <div className="w-[1px] h-full bg-[#626262]"></div>
        <div className=" flex flex-col items-center gap-2">
          <Bs0Circle />
          <div className="text-[#626262] text-[12px]">@Webivus</div>
        </div>
        <div className=" flex flex-col items-center gap-2">
          <Bs0Circle />
          <div className="text-[#626262] text-[12px]">@Webivus</div>
        </div>
        <div className="w-[1px] h-full bg-[#626262]"></div>
        <div className=" flex flex-col items-center gap-2">
          <Bs0Circle />
          <div className="text-[#626262] text-[12px]">@Webivus</div>
        </div>
        <div className=" flex flex-col items-center gap-2">
          <Bs0Circle />
          <div className="text-[#626262] text-[12px]">@Webivus</div>
        </div>
      </div>
      <div className="h-[1px] bg-[radial-gradient(circle_at_center,_#959595,_#1e1e1e)]"></div>
    </div>
  );
};

export default Header;
