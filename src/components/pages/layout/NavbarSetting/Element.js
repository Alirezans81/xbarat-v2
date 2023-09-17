import React from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useDirectionState } from "../../../../Providers/DirectionProvider";
import { Link } from "react-router-dom";
import { useTogglePagesModal } from "../../../../Providers/IsPagesModalOpenProvider";

export default function Element({ data, toggle }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "light" ? "dark" : "light";
  const { one: direction } = useDirectionState();
  const togglePagesModal = useTogglePagesModal()

  return (
    <div
      className={`bg-${theme}-back rounded-lg px-2 py-1 flex justify-between my-2 w-52`}
    >
      <Link onClick={togglePagesModal} to={data.route} className={`flex flex-1 items-center`}>
        <div className={`bg-${theme} p-2.5 rounded-full`}>
          <img className="w-5 h-5" src={data.imgs[`${oppositeTheme}`]} />
        </div>
        <span
          className={`font-mine-regular mt-1 m${direction}-2 text-${oppositeTheme}`}
        >
          {data.title}
        </span>
      </Link>
      <button onClick={toggle}>
        <img
          className="w-5 h-5"
          src={require(`../../../../Images/pages/layout/Navbar/setting/star-shown-${data.shown}.png`)}
        />
      </button>
    </div>
  );
}
