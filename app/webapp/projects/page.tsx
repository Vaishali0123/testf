import React from "react";

const page = () => {
  return (
    <div className="flex w-full overflow-hidden h-full border">
      <div className="w-full  flex flex-wrap gap-4 p-4">
        <div className="w-[320px] h-[200px] bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#737373]  hover:from-[#737373] hover:via-[#7373730d] hover:to-[#d9d9d900] border hover:scale-105 duration-300"></div>
        <div className="w-[320px] h-[200px] bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#737373] border"></div>
        <div className="w-[320px] h-[200px] bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#737373] border"></div>
        <div className="w-[320px] h-[200px] bg-gradient-to-bl from-[#d9d9d900] via-[#7373730d] to-[#737373] border"></div>
      </div>
    </div>
  );
};

export default page;
