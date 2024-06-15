import { useThemeState } from "../../Providers/ThemeProvider";
import Card from "./Card";
export default function Giftcard() {
  const cards = require("./fake.json");

  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  return (
    <div className="absolute w-full h-full overflow-y-auto pl-8 pr-8 md:pl-0 md:pr-6">
      <div className="grid grid-cols-12 w-full h-full grid-rows-2 gap-x-10 gap-y-7 pb-16 md:mt-0">
        <div
          className={`lg:col-span-3 md:col-span-5 col-span-6 row-span-2 bg-${theme} rounded-3xl overflow-y-scroll `}
        >
          {cards &&
            cards.map((data, index) => (
              <div key={index} className="w-full h-1/4 flex flex-col p-5">
                <Card data={data} />
              </div>
            ))}
        </div>

        <div
          className={`lg:col-span-9 md:col-span-7 col-span-6 row-span-1 bg-${theme} rounded-3xl flex flex-row`}
        ></div>
        <div
          className={`lg:col-span-9 md:col-span-7 col-span-6 row-span-1 bg-${theme} rounded-3xl flex flex-row`}
        ></div>
      </div>
    </div>
  );
}
