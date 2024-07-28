import ComponentTutorialCardBalance from "./ComponentTutorialCard";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useState } from "react";
const Tutorial = () => {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const [hovered, setHovered] = useState("");
  // const url =
  //   process.env.REACT_APP_MODE === "DEVELOPMENT"
  //     ? process.env.REACT_APP_DEV_API_DOMAIN
  //     : process.env.REACT_APP_API_DOMAIN;
  const url = "https://xbarat-back.pro/";
  const walletAssetTemp = {
    currency: `${url}api/currency/iranian-rial/`,
    currency_abb: "IRR",
    currency_floating_number: null,
    currency_sym_pic_gray: `${url}media/images/Currency/irr-gray_pFwnrQh.png`,
    currency_sym_pic_light: `${url}media/images/Currency/irr-light_1Nr58Ii.png`,
    currency_sym_pic_dark: `${url}media/images/Currency/irr-dark_cUCE9I6.png`,
    balance: "1000.000000",
    pending: "500.000000",
    locked: "200.000000",
  };
  return (
    <div
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
        This Part Shows Your Balance
      </button>
      <button
        onClick={() => setHovered("pending")}
        onMouseEnter={() => setHovered("pending")}
        onMouseLeave={() => setHovered("")}
        className={`col-span-12 row-span-1  px-5 ${
          hovered === "pending" ? "bg-blue-500 py-1 px-5" : ""
        } transition-all duration-500 rounded-2xl mt-2 w-full flex justify-start items-start h-full`}
      >
        This Part Shows Your Pending Money Amount
      </button>
      <button
        onClick={() => setHovered("locked")}
        onMouseEnter={() => setHovered("locked")}
        onMouseLeave={() => setHovered("")}
        className={`col-span-12 row-span-1  px-5 ${
          hovered === "locked" ? "bg-blue-500 py-1 px-5" : ""
        } transition-all duration-500 rounded-2xl  mt-2 w-full flex justify-start items-start h-full`}
      >
        This Part Shows Your Locked Money Amount
      </button>
      <button
        onClick={() => setHovered("transfer")}
        onMouseEnter={() => setHovered("transfer")}
        onMouseLeave={() => setHovered("")}
        className={`col-span-12 row-span-1  px-5 ${
          hovered === "transfer" ? "bg-blue-500 py-1 px-5" : ""
        } transition-all duration-500 rounded-2xl  mt-2 w-full flex justify-start items-start h-full`}
      >
        This Button Enables You To Transfer Your Money To Others
      </button>
      <button
        onClick={() => setHovered("withdraw")}
        onMouseEnter={() => setHovered("withdraw")}
        onMouseLeave={() => setHovered("")}
        className={`col-span-12 row-span-1  px-5 ${
          hovered === "withdraw" ? "bg-blue-500 py-1 px-5" : ""
        } transition-all duration-500 rounded-2xl  mt-2 w-full flex justify-start items-start h-full`}
      >
        This Button Enables You To Withdraw Your Money
      </button>

      <div
        className={`col-span-12 row-span-7 flex justify-center items-center p-5 bg-${theme}`}
      >
        <ComponentTutorialCardBalance
          hovered={hovered}
          setHovered={setHovered}
          walletAsset={walletAssetTemp}
        />
      </div>
    </div>
  );
};

export default Tutorial;
