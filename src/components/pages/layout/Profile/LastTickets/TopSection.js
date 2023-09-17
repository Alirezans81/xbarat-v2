import React from "react";
import { Link } from "react-router-dom";

export default function TopSection({ direction, oppositeTheme, lang }) {
  return (
    <div className="w-full flex flex-row items-center justify-between">
      <span className={`font-mine-bold text-2xl pt-2.5 text-${oppositeTheme}`}>
        {lang["last-tickets"]}
      </span>
      <Link to="/tickets">
        <img
          className="w-8 h-8"
          src={require(`../../../../../Images/arrow-${direction}-${oppositeTheme}.png`)}
        />
      </Link>
    </div>
  );
}
