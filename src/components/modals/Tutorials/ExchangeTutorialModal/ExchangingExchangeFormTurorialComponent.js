import { CustomDropdown2, CustomItem2 } from "../../../common/CustomDropdown2";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useAddComma } from "../../../../hooks/useNumberFunctions";
import { useRemoveComma } from "../../../../hooks/useNumberFunctions";
import { useDirectionState } from "../../../../Providers/DirectionProvider";
import { useCurrenciesState } from "../../../../Providers/CurrenciesProvider";
import { useFontState } from "../../../../Providers/FontProvider";

export default function ExchangingExchangeFormTutorialComponent({ hovered }) {
  const addComma = useAddComma();
  const currencies = useCurrenciesState();
  const lang = useLanguageState();
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const { one: oneDirection } = useDirectionState();

  const removeComma = useRemoveComma();

  return (
    <form className="mt-2 h-full">
      <div className="flex items-center gap-1">
        <CustomDropdown2
          className={`flex-1 font-${font}-regular ${
            hovered === "Source Currency" ? "animate-leftward" : ""
          }`}
          label={
            <div className="flex">
              {/* <img
                className={`w-7 h-7 -mt-1.5 -m${oneDirection}-1`}
                src={currencies[0] ? currencies[0].sym_pic_gray : ""}
              /> */}

              <span className={`-m${oneDirection}-0.5`}>{lang["source"]}</span>
            </div>
          }
        >
          {currencies.map((currency, index) => {
            if (currency && currency.abbreviation) {
              if (index === 0) {
                if (index === currencies.length - 1) {
                  return (
                    <CustomItem2 className="rounded-xl" key={index}>
                      <div className="flex pl-4">
                        <span>{currency.abbreviation}</span>
                      </div>
                    </CustomItem2>
                  );
                } else {
                  return (
                    <CustomItem2 className="rounded-t-xl" key={index}>
                      <div className="flex pl-4">
                        {/* <img
                          className="w-7 h-7 -mt-1.5 mx-0.5"
                          src={currency.sym_pic_gray}
                        /> */}
                        <span>{currency.abbreviation}</span>
                      </div>
                    </CustomItem2>
                  );
                }
              } else if (index === currencies.length - 1) {
                return (
                  <CustomItem2 className="rounded-b-xl" key={index}>
                    <div className="flex pl-4">
                      {/* <img
                        className="w-7 h-7 -mt-1.5 mx-0.5"
                        src={currency.sym_pic_gray}
                      /> */}
                      <span>{currency.abbreviation}</span>
                    </div>
                  </CustomItem2>
                );
              } else {
                return (
                  <CustomItem2 key={index}>
                    <div className="flex pl-4">
                      {/* <img
                        className="w-7 h-7 -mt-1.5 mx-0.5"
                        src={currency.sym_pic_gray}
                      /> */}
                      <span>{currency.abbreviation}</span>
                    </div>
                  </CustomItem2>
                );
              }
            }
          })}
        </CustomDropdown2>
        <button type="button">
          <img
            className="w-5 h-5"
            src={require("../../../../Images/arrow-right-blue.png")}
          />
        </button>
        <CustomDropdown2
          className={`flex-1 font-${font}-regular ${
            hovered === "Target Currency" ? "animate-leftward" : ""
          }`}
          label={
            <div className="flex">
              {/* <img
                className="w-7 h-7 -mt-1.5 mx-0.5"
                src={currencies[1] ? currencies[1].sym_pic_gray : ""}
              /> */}

              <span>{lang["target"]}</span>
            </div>
          }
        >
          {currencies.map((currency, index) => {
            if (index === 0) {
              if (index === currencies.length - 1) {
                return (
                  <CustomItem2 className="rounded-xl" key={index}>
                    <div className="flex pl-4">
                      {/* <img
                        className="w-7 h-7 -mt-1.5 mx-0.5"
                        src={currency.sym_pic_gray}
                      /> */}
                      <span>{currency.abbreviation}</span>
                    </div>
                  </CustomItem2>
                );
              } else {
                return (
                  <CustomItem2 className="rounded-t-xl" key={index}>
                    <div className="flex pl-4">
                      {/* <img
                        className="w-7 h-7 -mt-1.5 mx-0.5"
                        src={currency.sym_pic_gray}
                      /> */}
                      <span>{currency.abbreviation}</span>
                    </div>
                  </CustomItem2>
                );
              }
            } else if (index === currencies.length - 1) {
              return (
                <CustomItem2 className="rounded-b-xl" key={index}>
                  <div className="flex pl-4">
                    {/* <img
                      className="w-7 h-7 -mt-1.5 mx-0.5"
                      src={currency.sym_pic_gray}
                    /> */}
                    <span>{currency.abbreviation}</span>
                  </div>
                </CustomItem2>
              );
            } else {
              return (
                <CustomItem2 key={index}>
                  <div className="flex pl-4">
                    {/* <img
                      className="w-7 h-7 -mt-1.5 mx-0.5"
                      src={currency.sym_pic_gray}
                    /> */}
                    <span>{currency.abbreviation}</span>
                  </div>
                </CustomItem2>
              );
            }
          })}
        </CustomDropdown2>
      </div>
      <div
        className={`flex flex-row ${
          font === "Fa" || (font === "Ar" && "-reverse")
        } items-center w-full gap-7 text-${oppositeTheme} font-${font}-regular mt-2`}
      >
        <div className="flex-1 flex relative">
          <input
            className={`flex-1 text-left ${
              hovered === "Source Amount" ? "animate-leftward" : ""
            } hide-input-arrows bg-${theme}-back px-3 outline-1 h-9 outline-white rounded-lg w-0 pt-2 pb-1`}
            placeholder={lang["amount"]}
            name="amount"
            value={addComma(100000, false)}
          />
        </div>

        <div className="flex-1 flex">
          <input
            className={`flex-1 ${
              hovered === "Custom Rate" ? "animate-leftward" : ""
            } text-center hide-input-arrows bg-${theme}-back px-3 outline-1 h-9 outline-white rounded-lg w-0 pt-2 pb-1`}
            placeholder={lang["rate"]}
            name="rate"
            value={addComma(1.6, true)}
          />
        </div>
      </div>

      <div className="mt-1 flex items-center">
        <div className="w-full flex items-center justify-between">
          <div
            className={`flex items-center gap-x-1 ${
              hovered === "Target Amount"
                ? "text-xl transition-all duration-500"
                : ""
            }`}
          >
            <img
              className="w-5 h-5"
              src={require(`../../../../Images/arrow-right-${oppositeTheme}.png`)}
            />
            <span
              className={`text-${oppositeTheme} font-${font}-regular mt-0.5 text`}
            >
              {addComma(61.875) +
                " " +
                (currencies[1] ? currencies[1].abbreviation : "")}
            </span>
          </div>
          <span
            className={`text-${oppositeTheme} font-${font}-regular -mb-0.5 ${
              hovered === "Fee" ? "text-xl transition-all duration-500" : ""
            }`}
          >
            {"-" +
              addComma((+removeComma(61.875) * +1) / 100) +
              " " +
              currencies[1].abbreviation +
              " " +
              lang["fee"]}
          </span>
        </div>
      </div>
    </form>
  );
}
