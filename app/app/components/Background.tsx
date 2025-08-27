import React from "react";

const Background = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center ">
      <div className="border-2 border-dashed border-[#373737] opacity-40 rounded-[70px] h-[250px] flex items-center justify-center w-[250px]">
        <div className="border-2 border-dashed border-[#373737] rounded-[50px] h-[150px] flex items-center justify-center w-[150px]">
          <div className="border-2 border-dashed border-[#373737] rounded-[30px] h-[100px] flex items-center justify-center w-[100px]">
            <div className="bg-[#F94CFF] blur-3xl  h-[100px] w-[100px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Background;
