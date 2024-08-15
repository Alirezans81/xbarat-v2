import { React, useState } from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import ExchangeFormTutorialComponent from "./ExchangeFormTutorialComponent";
const Tutorial = () => {
  const lang = useLanguageState();
  const context = lang.exchangeTutorial;
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const [hovered, setHovered] = useState("");
  return (
    <div className="w-full h-full overflow-scroll flex flex-col justify-center items-center w-fit h-fit px-0 md:px-5">
      <ul
        className={`text-${oppositeTheme} md:text-base w-fit h-full text-sm flex flex-col justify-start items-start gap-y-2`}
      >
        <li
          onMouseEnter={() => setHovered("Average Rate")}
          onClick={() => setHovered("Average Rate")}
          onMouseLeave={() => setHovered("")}
          className={` rounded-2xl transition-all duration-500 px-2 py-1 ${
            hovered === "Average Rate" ? "bg-blue" : "bg-none"
          }`}
        >
          {context["avgRate"]}
        </li>
        <li
          onMouseEnter={() => setHovered("Toggle")}
          onClick={() => setHovered("Toggle")}
          onMouseLeave={() => setHovered("")}
          className={` rounded-2xl transition-all duration-500 px-2 py-1 ${
            hovered === "Toggle" ? "bg-blue" : "bg-none"
          }`}
        >
          {context["reverse"]}
        </li>
        <li
          onMouseEnter={() => setHovered("Source Currency")}
          onClick={() => setHovered("Source Currency")}
          onMouseLeave={() => setHovered("")}
          className={` rounded-2xl transition-all duration-500 px-2 py-1 ${
            hovered === "Source Currency" ? "bg-blue" : "bg-none"
          }`}
        >
          {context["sourceCurrency"]}
        </li>
        <li
          onMouseEnter={() => setHovered("Target Currency")}
          onClick={() => setHovered("Target Currency")}
          onMouseLeave={() => setHovered("")}
          className={` rounded-2xl transition-all duration-500 px-2 py-1 ${
            hovered === "Target Currency" ? "bg-blue" : "bg-none"
          }`}
        >
          {context["targetCurrency"]}
        </li>
        <li
          onMouseEnter={() => setHovered("Source Amount")}
          onClick={() => setHovered("Source Amount")}
          onMouseLeave={() => setHovered("")}
          className={` rounded-2xl transition-all duration-500 px-2 py-1 ${
            hovered === "Source Amount" ? "bg-blue" : "bg-none"
          }`}
        >
          {context["sourceAmount"]}
        </li>
        <li
          onMouseEnter={() => setHovered("Custom Rate")}
          onClick={() => setHovered("Custom Rate")}
          onMouseLeave={() => setHovered("")}
          className={` rounded-2xl transition-all duration-500 px-2 py-1 ${
            hovered === "Custom Rate" ? "bg-blue" : "bg-none"
          }`}
        >
          {context["customRate"]}
        </li>
        <li
          onMouseEnter={() => setHovered("Target Amount")}
          onClick={() => setHovered("Target Amount")}
          onMouseLeave={() => setHovered("")}
          className={` rounded-2xl transition-all duration-500 px-2 py-1 ${
            hovered === "Target Amount" ? "bg-blue" : "bg-none"
          }`}
        >
          {context["targetAmount"]}
        </li>
        <li
          onMouseEnter={() => setHovered("Fee")}
          onClick={() => setHovered("Fee")}
          onMouseLeave={() => setHovered("")}
          className={` rounded-2xl transition-all duration-500 px-2 py-1 ${
            hovered === "Fee" ? "bg-blue" : "bg-none"
          }`}
        >
          {context["fee"]}
        </li>
      </ul>
      <div className="mt-10 border-blue border-solid border-2 rounded-2xl flex-1 h-full w-fit flex justify-center items-center">
        <ExchangeFormTutorialComponent hovered={hovered} />
      </div>
    </div>
  );
};

export default Tutorial;
