import React from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import CustomSlider from "../../../common/CustomSlider";
import OtherExchangeCard from "./OtherExchanges/OtherExchangeCard";

export default function OtherExcahnges() {
  const lang = useLanguageState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  const exchanges = [
    {
      title: "Tawfiq",
      buy: {
        source: {
          title: "USD",
          imageSource: {
            gray: require("../../../../Images/currency symbols/usd-gray.png"),
          },
        },
        target: {
          title: "IRR",
          imageSource: {
            gray: require("../../../../Images/currency symbols/irr-gray.png"),
          },
        },
        rate: 397500,
      },
      sell: {
        source: {
          title: "IRR",
          imageSource: {
            gray: require("../../../../Images/currency symbols/irr-gray.png"),
          },
        },
        target: {
          title: "USD",
          imageSource: {
            gray: require("../../../../Images/currency symbols/usd-gray.png"),
          },
        },
        rate: 397800,
      },
      rateType: "USD/IRR",
      date: new Date(),
    },
    {
      title: "Jafari",
      buy: {
        source: {
          title: "USD",
          imageSource: {
            gray: require("../../../../Images/currency symbols/usd-gray.png"),
          },
        },
        target: {
          title: "IRR",
          imageSource: {
            gray: require("../../../../Images/currency symbols/irr-gray.png"),
          },
        },
        rate: 347500,
      },
      sell: {
        source: {
          title: "IRR",
          imageSource: {
            gray: require("../../../../Images/currency symbols/irr-gray.png"),
          },
        },
        target: {
          title: "USD",
          imageSource: {
            gray: require("../../../../Images/currency symbols/usd-gray.png"),
          },
        },
        rate: 367800,
      },
      rateType: "USD/IRR",
      date: new Date(),
    },
  ];

  return (
    <div className="px-5 py-3 h-full flex flex-col w-10/12">
      <span className={`text-2xl text-${oppositeTheme} mx-0.5`}>
        {lang["other-exchanges"]}
      </span>
      <div className="w-11/12 px-5 flex flex-col justify-center">
        <CustomSlider slidesToShow={1} slidesToScroll={1} infinite>
          {exchanges.map((exchange, index) => (
            <div
              key={index}
              className="flex justify-center items-center h-full px-4 mt-2.5"
            >
              <OtherExchangeCard data={exchange} />
            </div>
          ))}
        </CustomSlider>
      </div>
    </div>
  );
}
