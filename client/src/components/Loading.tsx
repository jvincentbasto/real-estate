import { Loader2 } from "lucide-react";
import React from "react";

const Loading = ({ fixed = false, overlay = false }) => {
  const position = fixed ? "fixed top-0 left-0 mt-[-40px]" : "mt-[-40px]"
  const bg = overlay ? "bg-black/5" : ""
  const height = fixed ? "min-h-dvh h-screen" : "h-full"

  return (
    <div className={`w-full ${height} flex justify-center items-center ${position} ${bg}`}>
      <div className={`w-full h-full flex gap-2 justify-center items-center`}>
        <Loader2 className="w-[32px] h-[32px] animate-spin text-primary-700" />
        {/* <span className="text-[26px] font-medium text-primary-700">loading...</span> */}
      </div>
    </div>
  );
};

export default Loading;
