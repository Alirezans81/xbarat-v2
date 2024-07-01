import { useCurrencyPairsState } from "../../../Providers/CurrencyPairsProvider";
import { useUserState } from "../../../Providers/UserProvider";
import { useFontState } from "../../../Providers/FontProvider";
import SubmitButton from "../../common/SubmitButton";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useModalDataClose } from "../../../Providers/ModalDataProvider";
const SubmitModal = ({ data, exchange }) => {
  const lang = useLanguageState();
  const theme = useThemeState();
  const closeModal = useModalDataClose();
  const currencyPairs = useCurrencyPairsState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const font = useFontState();
  const user = useUserState();
  const pairs = currencyPairs.filter((pair) => pair.url === data.currency_pair);

  return (
    <div>
      <div
        className={`grid grid-cols-1 gird-rows-6 w-fit h-fit font-${font}-regular gap-y-5 pb-3 `}
      >
        <div
          className={`row-span-1 col-span-1 bg-${theme}-back text-blue  min-w-[20rem] rounded-2xl p-2 flex justify-center`}
        >
          {lang["exchange"]}
        </div>
        <div
          className={`col-span-1 row-span-5 bg-${theme}-back flex flex-col  rounded-2xl p-5 `}
        >
          <div
            dir={font === "Fa" ? "rtl" : "ltr"}
            className="flex flex-row gap-x-2"
          >
            <span className="text-blue-gradient w-1/2 flex justify-start">
              {lang["from"]}
            </span>
            <span className={`w-1/2 flex justify-end text-${oppositeTheme}`}>
              {user.username}
            </span>
          </div>
          <div
            dir={font === "Fa" ? "rtl" : "ltr"}
            className="flex flex-row gap-x-2"
          >
            <span className="text-blue-gradient w-1/2 flex justify-start">
              {lang["currency-pair"]}
            </span>
            <span className={`w-1/2 flex justify-end text-${oppositeTheme}`}>
              {pairs[0].title}
            </span>
          </div>
          <div
            dir={font === "Fa" ? "rtl" : "ltr"}
            className="flex flex-row gap-x-2"
          >
            <div className="text-blue-gradient gap-x-1 flex flex-row w-1/2">
              <span>{lang["amount"]}</span>
              <span>{lang["source"]}</span>
            </div>
            <span className={`w-1/2 flex justify-end text-${oppositeTheme}`}>
              {data.amount_source}
            </span>
          </div>
          <div
            dir={font === "Fa" ? "rtl" : "ltr"}
            className="flex flex-row gap-x-2"
          >
            <span className="text-blue-gradient flex justify-start w-1/2">
              {lang["rate"]}
            </span>
            <span className={`w-1/2 flex justify-end text-${oppositeTheme}`}>
              {data.rate}
            </span>
          </div>
          <div
            dir={font === "Fa" ? "rtl" : "ltr"}
            className="flex flex-row gap-x-2 w-full"
          >
            <div className="text-blue-gradient gap-x-1 flex flex-row w-1/2 justify-start">
              <span>{lang["amount"]}</span>
              <span>{lang["target"]}</span>
            </div>
            <span className={`text-${oppositeTheme} w-1/2 flex justify-end`}>
              {data.amount_destination}
            </span>
          </div>
        </div>
        <SubmitButton
          onClick={() => exchange(closeModal)}
          rounded={"2xl"}
          className="w-full h-full max-h-[3rem] text-light p-2 "
        >
          {lang["submit"]}
        </SubmitButton>
      </div>
    </div>
  );
};

export default SubmitModal;
