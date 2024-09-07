import React from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";

export default function SuggestionCard({ data }) {
  const theme = useThemeState();

  return (
    <div
      className={`mx-auto h-52 w-[12.5rem] bg-${theme}-back rounded-2xl flex flex-col justify-center items-center gap-y-1`}
    >
      <span className={`text-4xl`}>$1</span>
      <button className="border-2 border-green px-8 rounded-lg text-green pt-1 text-xl hover:text-light hover-bg-green transition-all duration-150">
        Buy
      </button>
    </div>
  );
}
