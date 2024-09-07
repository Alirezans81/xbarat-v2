import React from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";

export default function SiteCard({ data, onClick, selected }) {
  const theme = useThemeState();

  return (
    <button
      onClick={onClick}
      className={`w-full flex flex-col justify-center items-center gap-y-3 pt-5 pb-3 ${
        selected ? "bg-blue" : `bg-${theme}-back`
      } rounded-2xl transition-all duration-150 hover-bg-blue`}
    >
      <img
        alt=""
        className="w-20 h-20"
        src={data && data.icon ? data.icon : ""}
      />
      <span className="text-xl">{data && data.title ? data.title : ""}</span>
    </button>
  );
}
