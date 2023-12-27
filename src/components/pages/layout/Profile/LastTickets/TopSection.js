import React from "react";
import { Link } from "react-router-dom";
import { useFontState } from "../../../../../Providers/FontProvider";

export default function TopSection({ direction, oppositeTheme, lang }) {
  const font = useFontState();

  return (
    <div className="w-full flex flex-row items-center justify-between">
      <span
        className={`font-${font}-bold text-2xl pt-2.5 text-${oppositeTheme}`}
      >
        {lang["last-tickets"]}
      </span>
      <Link
      // to="/tickets"
      >
        <img
          className="w-7 h-7"
          src={require(`../../../../../Images/arrow-${direction}-${oppositeTheme}.png`)}
        />
      </Link>
    </div>
  );
}
