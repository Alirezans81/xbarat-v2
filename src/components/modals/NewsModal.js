import React from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useFontState } from "../../Providers/FontProvider";
import { useConvertDateTime } from "../../hooks/useConvertDateTime";

const Row = ({ reverse, img, desc, oppositeTheme, font }) => {
  return (
    <div className={`w-full`}>
      {img && (
        <img
          alt=""
          className={`w-36 h-36 md:w-44 md:h-44 rounded-xl ${
            reverse ? "float-right mb-4 ml-4" : "float-left mb-4 mr-4"
          } `}
          src={img}
        />
      )}
      <p className={`flex-1 text-${oppositeTheme} font-${font}-regular`}>
        {desc || ""}
      </p>
    </div>
  );
};

export default function NewsModal({
  title,
  poster,
  summary,
  img_1_url,
  description_1,
  img_2_url,
  description_2,
  start_date,
  end_date,
  btn_1_active,
  btn_1_title,
  btn_1_link,
  btn_2_active,
  btn_2_title,
  btn_2_link,
}) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const font = useFontState();
  const convertDateTime = useConvertDateTime();

  return (
    <div className="md:w-[44rem] flex flex-col gap-8 pb-2">
      <div className="flex flex-col gap-y-2.5">
        {poster && (
          <img alt={title} className="w-full rounded-xl" src={poster} />
        )}
        <span className={`text-${oppositeTheme} font-${font}-bold md:text-xl`}>
          {summary || ""}
        </span>
      </div>
      <div className="flex flex-col gap-8 md:gap-4 max-h-[42dvh] md:max-h-[26dvh] overflow-y-auto">
        <Row
          font={font}
          oppositeTheme={oppositeTheme}
          img={img_1_url}
          desc={description_1}
        />
        <Row
          font={font}
          oppositeTheme={oppositeTheme}
          img={img_2_url}
          desc={description_2}
          reverse
        />
      </div>
      <div className="w-full flex justify-between items-end">
        <span
          className={`text-gray text-sm font-${font}-regular flex w-32 md:w-auto`}
        >
          {convertDateTime(start_date) + " - " + convertDateTime(end_date)}
        </span>
        <div className="flex items-center gap-x-2">
          {btn_1_active && (
            <a
              className={`bg-${theme}-back font-${font}-regular rounded-full text-blue px-5 pt-2 pb-1`}
              href={btn_1_link}
            >
              {btn_1_title}
            </a>
          )}
          {btn_2_active && (
            <a
              className={`bg-blue font-${font}-regular rounded-full text-light px-5 pt-2 pb-1`}
              href={btn_2_link}
            >
              {btn_2_title}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
