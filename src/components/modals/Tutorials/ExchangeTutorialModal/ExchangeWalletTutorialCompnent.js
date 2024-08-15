import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useAddComma } from "../../../../hooks/useNumberFunctions";
import { useFontState } from "../../../../Providers/FontProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";

export default function WallExchangeWalletTutorialComponent({ hovered }) {
  const theme = useThemeState();
  const font = useFontState();
  const lang = useLanguageState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  const addComma = useAddComma();

  return (
    <div className="flex flex-col ov">
      <div className={`w-[17.5rem] md:w-[20rem] `}>
        <span
          className={`transition-all duration-500 text-${
            hovered === "Balance" ? "3xl" : "2xl"
          } font-${font}-bold text-${oppositeTheme}`}
        >
          {addComma(5000000, true)}
        </span>
        <span
          className={`transition-all duration-500 font-${font}-bold text-gray ml-1 text-${
            hovered === "Balance" ? "3xl" : "2xl"
          }`}
        >
          IRR
        </span>
      </div>
      <div className="flex flex-col justify-end -mt-0.5">
        <span
          dir="ltr"
          className={`w-fit transition-all duration-500 text-${
            hovered === "Pending" ? "lg" : "sm"
          } whitespace-nowrap font-${font}-regular text-green`}
        >
          {"+ " + addComma(120000) + " " + lang["pending"]}
        </span>

        <span
          dir="ltr"
          className={`w-fit transition-all duration-500 text-${
            hovered === "Locked" ? "lg" : "sm"
          } whitespace-nowrap font-${font}-regular text-red -mt-1`}
        >
          {"- " + addComma(2000000) + " " + lang["locked"]}
        </span>
      </div>
    </div>
  );
}
