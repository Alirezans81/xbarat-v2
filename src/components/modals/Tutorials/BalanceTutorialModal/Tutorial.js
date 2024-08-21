import ComponentTutorialCardBalance from "./ComponentTutorialCard";
import { useWalletState } from "../../../../Providers/WalletProvider";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useFontState } from "../../../../Providers/FontProvider";
import { useState } from "react";
const Tutorial = () => {
  const font=useFontState()
  const theme = useThemeState();
  const wallet = useWalletState();
  const lang = useLanguageState();
  const context = lang.yourBalanceTutorial;
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const [hovered, setHovered] = useState("");
  return (
    <div
      dir={font!=="Fa"?"ltr":"rtl"}
      className={`w-fit h-full gird gird-cols-12 grid-rows-12 bg-${theme} p-5 rounded-2xl text-${oppositeTheme} transition-all duration-500`}
    >
      <button
        onClick={() => setHovered("balance")}
        onMouseEnter={() => setHovered("balance")}
        onMouseLeave={() => setHovered("")}
        className={`col-span-12 row-span-1  px-5  ${
          hovered === "balance" ? "bg-blue-500 py-1 px-5" : ""
        } transition-all duration-500 rounded-2xl  w-full flex justify-start items-start h-full`}
      >
        {context["balance"]}
      </button>
      <button
        onClick={() => setHovered("pending")}
        onMouseEnter={() => setHovered("pending")}
        onMouseLeave={() => setHovered("")}
        className={`col-span-12 row-span-1  px-5 ${
          hovered === "pending" ? "bg-blue-500 py-1 px-5" : ""
        } transition-all duration-500 rounded-2xl mt-2 w-full flex justify-start items-start h-full`}
      >
        {context["pending"]}
      </button>
      <button
        onClick={() => setHovered("locked")}
        onMouseEnter={() => setHovered("locked")}
        onMouseLeave={() => setHovered("")}
        className={`col-span-12 row-span-1  px-5 ${
          hovered === "locked" ? "bg-blue-500 py-1 px-5" : ""
        } transition-all duration-500 rounded-2xl  mt-2 w-full flex justify-start items-start h-full`}
      >
        {context["locked"]}
      </button>
      <button
        onClick={() => setHovered("transfer")}
        onMouseEnter={() => setHovered("transfer")}
        onMouseLeave={() => setHovered("")}
        className={`col-span-12 row-span-1  px-5 ${
          hovered === "transfer" ? "bg-blue-500 py-1 px-5" : ""
        } transition-all duration-500 rounded-2xl  mt-2 w-full flex justify-start items-start h-full`}
      >
        {context["transfer"]}
      </button>
      <button
        onClick={() => setHovered("withdraw")}
        onMouseEnter={() => setHovered("withdraw")}
        onMouseLeave={() => setHovered("")}
        className={`col-span-12 row-span-1  px-5 ${
          hovered === "withdraw" ? "bg-blue-500 py-1 px-5" : ""
        } transition-all duration-500 rounded-2xl  mt-2 w-full flex justify-start items-start h-full`}
      >
        {context["withdraw"]}
      </button>

      <div
        className={`col-span-12 row-span-7 flex w-full h-full justify-center items-center p-5 bg-${theme}`}
      >
        <ComponentTutorialCardBalance
          hovered={hovered}
          setHovered={setHovered}
          walletAsset={wallet.walletAssets[0]}
        />
      </div>
    </div>
  );
};

export default Tutorial;
