import { useWalletState } from "../../Providers/WalletProvider";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useLanguageState } from "../../Providers/LanguageProvider";
import starChecked from "../../Images/pages/layout/Profile/starChecked.png";
import starUnChecked from "../../Images/pages/layout/Profile/starUnChecked.png";
import { useState } from "react";
const SingleCardTank = ({ show }) => {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const wallet = useWalletState();
  const lang = useLanguageState();

  const walletTanks = wallet.walletTanks.filter(
    (data) => data.currency_abb === show
  );

  console.log(walletTanks);
  const [isChecked, setIsChecked] = useState(walletTanks.is_favorite);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  function handleIsActive() {
    console.log("s");
  }
  return (
    <>
      {walletTanks.map((data, index) => (
        <div
          className={`bg-${theme}-back h-full w-5/6  ml-11 rounded-lg`}
          style={{
            gridRow: Math.ceil(index / 2),
            gridColumn: index % 2 === 0 ? 1 : 2,
          }}
        >
          <div className="grid grid-cols-10 grid-rows-3 gap-x-2 gap-y-4 w-full h-full">
            <span
              style={{ gridRow: 1, gridColumn: 1 }}
              className={`col-span-7 w-72 text-blue text-lg ml-2 mt-1`}
            >
              {data.title}
            </span>
            <button
              onClick={handleCheckboxChange}
              className="flex justify-end w-32 mt-1 mr-1"
              style={{ gridRow: 1, gridColumn: 8 }}
            >
              <img
                className="w-9 mr-2"
                alt=""
                src={isChecked === false ? starUnChecked : starChecked}
              />
            </button>

            <span
              style={{ gridRow: 2, gridColumn: 1 }}
              className={`col-span-7 text-gray  w-72 ml-2 flex items-end`}
            >
              {data.wallet_tank_type === null
                ? lang["wallet_tank_type_title_null_cards"]
                : data.wallet_tank_type}
            </span>
            <button
              style={{ gridRow: 2, gridColumn: 8 }}
              className="col-span-2  w-32"
            ></button>
            <span
              style={{ gridRow: 3, gridColumn: 1 }}
              className={`col-span-7 text-${oppositeTheme}  w-72 ml-2`}
            >
              {data.bank_info.length === 0
                ? lang["bank_info_null_cards"]
                : data.bank_info}
            </span>
            <span
              style={{ gridRow: 3, gridColumn: 8 }}
              className="col-span-2  w-32"
            ></span>
            <span
              style={{ gridRow: 3, gridColumn: 1 }}
              className="col-span-7 ml-2  w-72"
            ></span>
            <form
              style={{ gridRow: 3, gridColumn: 8 }}
              className="col-span-2   w-32"
            >
              <label className={`text-${oppositeTheme}`}>Is Active</label>
              <input
                onChange={handleIsActive}
                className="ml-8 bg-transparent border-2 border-solid border-blue rounded-sm focus:border-0"
                type="checkbox"
              />
            </form>
          </div>
        </div>
      ))}
    </>
  );
};

export default SingleCardTank;
