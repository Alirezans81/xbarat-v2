import { useWalletState } from "../../Providers/WalletProvider";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useLanguageState } from "../../Providers/LanguageProvider";
import starChecked from "../../Images/pages/layout/Profile/starChecked.png";
import starUnChecked from "../../Images/pages/layout/Profile/starUnChecked.png";
import { useState } from "react";
const SingleCardTank = ({ show, index, data }) => {
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

  const temp = walletTanks.map((data, index) => index);
  console.log(temp);
  return (
    <>
      <div
        className={`bg-${theme}-back h-full w-11/12 p-5 px-8 rounded-3xl ml-5 mt-1`}
        style={{
          gridRow:
            index % 6 === 0
              ? 1
              : index % 6 === 1
              ? 1
              : index % 6 === 2
              ? 2
              : index % 6 === 3
              ? 2
              : index % 6 === 4
              ? 3
              : 3,
          gridColumn: index % 2 === 0 ? 1 : 2,
        }}
      >
        <div className="grid grid-cols-10 grid-rows-1 gap-y-4 w-full h-full">
          <div className="h-full w-52" style={{ gridRow: 1, gridColumn: 1 }}>
            <div className="grid grid-rows-2 grid-cols-1 h-full">
              <span
                style={{ gridRow: 1, gridColumn: 1 }}
                className="text-blue text-xl"
              >
                {data.title}
              </span>
              <div
                className="flex flex-col justify-start"
                style={{ gridRow: 2, gridColumn: 1 }}
              >
                <span className="text-gray text-xl">
                  {data.bank_name === null
                    ? lang["bank_name_null_cards"]
                    : data.bank_name}
                </span>
                <span className={`text-${oppositeTheme} text-lg`}>
                  {data.bank_info.length === 0
                    ? lang["cards_card_number_placeholder"]
                    : data.bank_info}
                </span>
              </div>
            </div>
          </div>
          <div className="h-full w-32" style={{ gridRow: 1, gridColumn: 8 }}>
            <div className="grid grid-cols-1 grid-rows-4 h-full">
              <button
                className="w-full flex justify-end"
                style={{ gridRow: 1, gridColumn: 1 }}
              >
                <img className=" w-1/4" alt="" src={starChecked} />
              </button>
              <span style={{ gridRow: 2, gridColumn: 1 }}></span>
              <span style={{ gridRow: 3, gridColumn: 1 }}></span>
              <form
                style={{ gridRow: 4, gridColumn: 1 }}
                className="pt-8 flex justify-end w-full "
              >
                <label className={`text-${oppositeTheme}`}>Is Active</label>
                <input
                  onChange={handleIsActive}
                  className="bg-transparent border-2 border-solid border-blue rounded-sm focus:border-0 ml-1"
                  type="checkbox"
                />
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* <span
              style={{ gridRow: 1, gridColumn: 1 }}
              className={`w-72 text-blue text-lg`}
            >
              {data.title}
            </span>
            <button
              onClick={handleCheckboxChange}
              className="flex justify-end w-32"
              style={{ gridRow: 1, gridColumn: 2 }}
            >
              <img
                className="w-7 mr-2"
                alt=""
                src={isChecked === false ? starUnChecked : starChecked}
              />
            </button>

            <span
              style={{ gridRow: 2, gridColumn: 1 }}
              className={`text-gray  w-72 ml-2 flex items-end`}
            >
              {data.wallet_tank_type === null
                ? lang["wallet_tank_type_title_null_cards"]
                : data.wallet_tank_type}
            </span>
            <button
              style={{ gridRow: 2, gridColumn: 2 }}
              className="w-32"
            ></button>
            <span
              style={{ gridRow: 3, gridColumn: 1 }}
              className={`text-${oppositeTheme}  w-72`}
            >
              {data.bank_info.length === 0
                ? lang["bank_info_null_cards"]
                : data.bank_info}
            </span>
            <span style={{ gridRow: 3, gridColumn: 2 }} className="w-32"></span>
            <span style={{ gridRow: 3, gridColumn: 1 }} className="w-72"></span>
            <form style={{ gridRow: 3, gridColumn: 2 }} className="w-32">
              <label className={`text-${oppositeTheme}`}>Is Active</label>
              <input
                onChange={handleIsActive}
                className="bg-transparent border-2 border-solid border-blue rounded-sm focus:border-0"
                type="checkbox"
              />
            </form> */}
    </>
  );
};

export default SingleCardTank;
