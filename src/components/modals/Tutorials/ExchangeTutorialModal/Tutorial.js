import { React, useState } from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import ExchangeFormTutorialComponent from "./ExchangeFormTutorialComponent";
const Tutorial = () => {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const [hovered, setHovered] = useState("");
  return (
    <div className="flex flex-row justify-center items-center w-fit h-fit px-5">
      <ul
        className={`text-${oppositeTheme} w-fit h-full list-disc h-fit text-base flex flex-col dotted justify-start items-start gap-y-2`}
      >
        <li
          onMouseEnter={() => setHovered("Average Rate")}
          onClick={() => setHovered("Average Rate")}
          onMouseLeave={() => setHovered("")}
          className={` rounded-2xl transition-all duration-500 px-2 py-1 ${
            hovered === "Average Rate" ? "bg-blue" : "bg-none"
          }`}
        >
          This Is The Average Rate For This Currency Pair
        </li>
        <li
          onMouseEnter={() => setHovered("Toggle")}
          onClick={() => setHovered("Toggle")}
          onMouseLeave={() => setHovered("")}
          className={` rounded-2xl transition-all duration-500 px-2 py-1 ${
            hovered === "Toggle" ? "bg-blue" : "bg-none"
          }`}
        >
          With This Button You Can Toggle Reverse Your Exchange
        </li>
        <li
          onMouseEnter={() => setHovered("Source Currency")}
          onClick={() => setHovered("Source Currency")}
          onMouseLeave={() => setHovered("")}
          className={` rounded-2xl transition-all duration-500 px-2 py-1 ${
            hovered === "Source Currency" ? "bg-blue" : "bg-none"
          }`}
        >
          You Can Pick The Source Currency Here
        </li>
        <li
          onMouseEnter={() => setHovered("Target Currency")}
          onClick={() => setHovered("Target Currency")}
          onMouseLeave={() => setHovered("")}
          className={` rounded-2xl transition-all duration-500 px-2 py-1 ${
            hovered === "Target Currency" ? "bg-blue" : "bg-none"
          }`}
        >
          You Can Pick The Target Currency Here
        </li>
        <li
          onMouseEnter={() => setHovered("Source Amount")}
          onClick={() => setHovered("Source Amount")}
          onMouseLeave={() => setHovered("")}
          className={` rounded-2xl transition-all duration-500 px-2 py-1 ${
            hovered === "Source Amount" ? "bg-blue" : "bg-none"
          }`}
        >
          You Can Enter The Source Amount Here
        </li>
        <li
          onMouseEnter={() => setHovered("Custom Rate")}
          onClick={() => setHovered("Custom Rate")}
          onMouseLeave={() => setHovered("")}
          className={` rounded-2xl transition-all duration-500 px-2 py-1 ${
            hovered === "Custom Rate" ? "bg-blue" : "bg-none"
          }`}
        >
          You Can Enter Your Custom Rate For Exchange Here
        </li>
        <li
          onMouseEnter={() => setHovered("Target Amount")}
          onClick={() => setHovered("Target Amount")}
          onMouseLeave={() => setHovered("")}
          className={` rounded-2xl transition-all duration-500 px-2 py-1 ${
            hovered === "Target Amount" ? "bg-blue" : "bg-none"
          }`}
        >
          This Part Is The Target Amount
        </li>
        <li
          onMouseEnter={() => setHovered("Fee")}
          onClick={() => setHovered("Fee")}
          onMouseLeave={() => setHovered("")}
          className={` rounded-2xl transition-all duration-500 px-2 py-1 ${
            hovered === "Fee" ? "bg-blue" : "bg-none"
          }`}
        >
          This Is Our Exchange Fee
        </li>
      </ul>
      <div className="border-blue border-solid border-2 rounded-2xl flex-1 h-full w-fit flex justify-center items-center">
        <ExchangeFormTutorialComponent hovered={hovered} />
      </div>
    </div>
  );
};

export default Tutorial;
