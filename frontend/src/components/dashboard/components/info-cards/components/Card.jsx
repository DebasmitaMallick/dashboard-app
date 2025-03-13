import React from "react";
import ProgressBadge from "./ProgressBadge";

const Card = ({ title, value, progressPercent }) => {
  return (
    <div className="bg-white rounded-xl border-2 border-stone-200 w-full px-4 py-3 text-left">
      <p className="text-sm text-stone-400 font-medium pb-3">{title}</p>
      <div className="flex gap-3">
        <h2 className="text-2xl font-bold text-stone-700">{value}</h2>
        <ProgressBadge val={progressPercent} />
      </div>
    </div>
  );
};

export default Card;
