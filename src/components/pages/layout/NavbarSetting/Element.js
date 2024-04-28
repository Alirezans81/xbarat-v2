import React from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useDirectionState } from "../../../../Providers/DirectionProvider";
import { Link } from "react-router-dom";
import { useFontState } from "../../../../Providers/FontProvider";

export default function Element({ data, toggle, onClick }) {
  const theme = useThemeState();
  const font = useFontState();
  const oppositeTheme = theme === "light" ? "dark" : "light";
  const { one: direction } = useDirectionState();

  const getOnClickFunction = () => {
    if (onClick) {
      return onClick;
    } else if (toggle) {
      return toggle;
    } else {
      return () => {};
    }
  };

  if (data) {
    return (
      <div
        className={`bg-${theme}-back rounded-lg px-2 py-1 flex justify-between my-2 min-w-[13rem]`}
      >
        <Link
          onClick={getOnClickFunction()}
          to={data.route}
          className={`flex flex-1 items-center`}
        >
          <div className={`bg-${theme} p-2.5 rounded-full`}>
            <img className="w-5 h-5" src={data.imgs[`${oppositeTheme}`]} />
          </div>
          <span
            className={`font-${font}-regular mt-1 m${direction}-2 text-${oppositeTheme}`}
          >
            {data.title}
          </span>
        </Link>
        {toggle && (
          <button onClick={toggle}>
            <img
              className="w-5 h-5"
              src={require(`../../../../Images/pages/layout/Navbar/setting/star-shown-${data.shown}.png`)}
            />
          </button>
        )}
      </div>
    );
  }
}
