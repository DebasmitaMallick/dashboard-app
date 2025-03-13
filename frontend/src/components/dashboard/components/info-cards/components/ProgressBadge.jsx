import React from "react";
import {
  FaArrowTrendUp as UpIcon,
  FaArrowTrendDown as DownIcon,
} from "react-icons/fa6";

const ProgressBadge = ({ val }) => {
  const isUp = val > 20;
  return (
    <div
      className={`text-xs flex gap-1.5 items-center justify-center px-2 rounded-3xl font-bold border-2 ${
        isUp
          ? "bg-green-100 text-green-500 border-green-200"
          : "bg-red-200 text-red-500 border-red-200"
      }`}
    >
      <p>
        {val > 0 ? "+" : "-"}
        {val}%
      </p>
      {isUp ? <UpIcon /> : <DownIcon />}
    </div>
  );
};

export default ProgressBadge;
