import { useState } from "react";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useThemeState } from "../../Providers/ThemeProvider";
import cross from "../../Images/pages/layout/Profile/cross.png";
import {
  CustomDropdown,
  CustomItem,
} from "../../components/common/CustomDropdown";
import axios from "axios";
import { da } from "date-fns/locale";
const Addcard = ({ addAsset, setAddAsset, walletAsset }) => {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const [currency, setCurrency] = useState("");
  let listCurrency = ["TMN", "TRY", "AFN", "EUR", "USD"];
  let listAsset = walletAsset.map((data) => data.currency_abb);
  console.log(listAsset);
  let AvailableNewAssets = listCurrency.filter(
    (data) => listAsset.includes(data) === false
  );
  console.log(AvailableNewAssets);
  const handleAddAssets = async (e) => {
    e.preventDefault();
    setAddAsset(false);
  };
  const discard = () => {
    setAddAsset(false);
  };
  return (
    <>
      <div
        className={
          addAsset
            ? `bg-${theme}-back w-10/12 h-fit ml-8 mb-0 rounded-lg p-2 absolute left-0 z-10`
            : "hidden"
        }
      >
        <div className="w-full h-full bg-transparent grid grid-cols-1 grid-rows-10">
          <button
            className={`bg-transparent rounded-lg flex justify-end`}
            style={{ gridRow: 1, gridColumn: 1 }}
            onClick={discard}
            type="button"
          >
            <img className="" alt="" src={cross} />
          </button>
          <span
            className={`text-${oppositeTheme}  row-span-1`}
            style={{ gridRow: 2, gridColumn: 1 }}
          >
            {lang["choose_add_currency_cards_add_asset"]}
          </span>
          <form className="flex justify-center row-span-8 h-80">
            <CustomDropdown className={"bg-transparent"} label="Currency">
              {AvailableNewAssets.map((data) => (
                <CustomItem className={"bg-transparent"}>{data}</CustomItem>
              ))}
            </CustomDropdown>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addcard;
