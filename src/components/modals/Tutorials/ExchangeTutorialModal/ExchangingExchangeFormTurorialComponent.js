import { Formik } from "formik";
import { CustomDropdown, CustomItem } from "../../../common/CustomDropdown2";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useAddComma } from "../../../../hooks/useNumberFunctions";
import { useRemoveComma } from "../../../../hooks/useNumberFunctions";
import { useDirectionState } from "../../../../Providers/DirectionProvider";
import { useCurrenciesState } from "../../../../Providers/CurrenciesProvider";
import { useFontState } from "../../../../Providers/FontProvider";

export default function ExchangingExchangeFormTutorialComponent() {
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
        <CustomDropdown
          className={`flex-1 font-${font}-regular`}
          label={
            <div className="flex">
              <img
                className={`w-7 h-7 -mt-1.5 -m${oneDirection}-1`}
                src={currencies[0] ? currencies[0].sym_pic_gray : ""}
              />

              <span className={`-m${oneDirection}-0.5`}>{lang["source"]}</span>
            </div>
          }
        >
          {currencies.map((currency, index) => {
            if (currency && currency.abbreviation) {
              if (index === 0) {
                if (index === currencies.length - 1) {
                  return (
                    <CustomItem className="rounded-xl" key={index}>
                      <div className="flex pl-4">
                        <img
                          className="w-7 h-7 -mt-1.5 mx-0.5"
                          src={currency.sym_pic_gray}
                        />
                        <span>{currency.abbreviation}</span>
                      </div>
                    </CustomItem>
                  );
                } else {
                  return (
                    <CustomItem className="rounded-t-xl" key={index}>
                      <div className="flex pl-4">
                        <img
                          className="w-7 h-7 -mt-1.5 mx-0.5"
                          src={currency.sym_pic_gray}
                        />
                        <span>{currency.abbreviation}</span>
                      </div>
                    </CustomItem>
                  );
                }
              } else if (index === currencies.length - 1) {
                return (
                  <CustomItem className="rounded-b-xl" key={index}>
                    <div className="flex pl-4">
                      <img
                        className="w-7 h-7 -mt-1.5 mx-0.5"
                        src={currency.sym_pic_gray}
                      />
                      <span>{currency.abbreviation}</span>
                    </div>
                  </CustomItem>
                );
              } else {
                return (
                  <CustomItem key={index}>
                    <div className="flex pl-4">
                      <img
                        className="w-7 h-7 -mt-1.5 mx-0.5"
                        src={currency.sym_pic_gray}
                      />
                      <span>{currency.abbreviation}</span>
                    </div>
                  </CustomItem>
                );
              }
            }
          })}
        </CustomDropdown>
        <button type="button">
          <img
            className="w-5 h-5"
            src={require("../../../../Images/arrow-left-blue.png")}
          />
        </button>
        <CustomDropdown
          className={`flex-1 font-${font}-regular`}
          label={
            <div className="flex">
              <img
                className="w-7 h-7 -mt-1.5 mx-0.5"
                src={currencies[1] ? currencies[1].sym_pic_gray : ""}
              />

              <span>{lang["target"]}</span>
            </div>
          }
        >
          {currencies.map((currency, index) => {
            if (index === 0) {
              if (index === currencies.length - 1) {
                return (
                  <CustomItem className="rounded-xl" key={index}>
                    <div className="flex pl-4">
                      <img
                        className="w-7 h-7 -mt-1.5 mx-0.5"
                        src={currency.sym_pic_gray}
                      />
                      <span>{currency.abbreviation}</span>
                    </div>
                  </CustomItem>
                );
              } else {
                return (
                  <CustomItem className="rounded-t-xl" key={index}>
                    <div className="flex pl-4">
                      <img
                        className="w-7 h-7 -mt-1.5 mx-0.5"
                        src={currency.sym_pic_gray}
                      />
                      <span>{currency.abbreviation}</span>
                    </div>
                  </CustomItem>
                );
              }
            } else if (index === currencies.length - 1) {
              return (
                <CustomItem className="rounded-b-xl" key={index}>
                  <div className="flex pl-4">
                    <img
                      className="w-7 h-7 -mt-1.5 mx-0.5"
                      src={currency.sym_pic_gray}
                    />
                    <span>{currency.abbreviation}</span>
                  </div>
                </CustomItem>
              );
            } else {
              return (
                <CustomItem key={index}>
                  <div className="flex pl-4">
                    <img
                      className="w-7 h-7 -mt-1.5 mx-0.5"
                      src={currency.sym_pic_gray}
                    />
                    <span>{currency.abbreviation}</span>
                  </div>
                </CustomItem>
              );
            }
          })}
        </CustomDropdown>
      </div>
      <div
        className={`flex flex-row ${
          font === "Fa" && "-reverse"
        } items-center w-full gap-7 text-${oppositeTheme} font-${font}-regular mt-2`}
      >
        <div className="flex-1 flex relative">
          <input
            className={`flex-1 text-left hide-input-arrows bg-${theme}-back px-3 outline-1 h-9 outline-white rounded-lg w-0 pt-2 pb-1`}
            placeholder={lang["amount"]}
            name="amount"
            value={addComma(100000, false)}
          />
        </div>

        <div className="flex-1 flex">
          <input
            className={`flex-1 text-center hide-input-arrows bg-${theme}-back px-3 outline-1 h-9 outline-white rounded-lg w-0 pt-2 pb-1`}
            placeholder={lang["rate"]}
            name="rate"
            value={addComma(3, true)}
          />
        </div>
      </div>

      <div className="mt-1 flex items-center">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-x-1">
            <img
              className="w-5 h-5"
              src={require(`../../../../Images/arrow-right-${oppositeTheme}.png`)}
            />
            <span
              className={`text-${oppositeTheme} font-${font}-regular mt-0.5 text`}
            >
              {addComma(10000) +
                " " +
                (currencies[1] ? currencies[1].abbreviation : "")}
            </span>
          </div>
          <span
            className={`text-${oppositeTheme} font-${font}-regular -mb-0.5`}
          >
            {"-" +
              addComma((+removeComma(100000) * +10) / 100) +
              " " +
              currencies[0].abbreviation +
              " " +
              lang["fee"]}
          </span>
        </div>
      </div>
    </form>
  );
}
