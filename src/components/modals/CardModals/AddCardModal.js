import { useLanguageState } from "../../../Providers/LanguageProvider";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useFontState } from "../../../Providers/FontProvider";
import { useIsLoadingSplashScreenSetState } from "../../../Providers/IsLoadingSplashScreenProvider";
import { useCreateWalletTank } from "../../../apis/common/wallet/hooks";
import { useModalDataState } from "../../../Providers/ModalDataProvider";
import { useModalDataClose } from "../../../Providers/ModalDataProvider";
import { useCurrenciesState } from "../../../Providers/CurrenciesProvider";
import SubmitButton from "../../common/SubmitButton";
export default function AddCard() {
  const modalData = useModalDataState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const theme = useThemeState();
  const currencies = useCurrenciesState();
  const lang = useLanguageState();
  const font = useFontState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const api =
    process.env.REACT_APP_MODE === "PRODUCTION"
      ? require("../../apis/api-dev.json")
      : require("../../apis/api.json");

  let listCurrency = currencies.map((data) => [
    data.abbreviation,
    data.url,
    data.sym_pic_gray,
  ]);

  const AddCard = (values) => {};
  return (
    <>
      <Formik
        initialValues={{
          user: modal,
          title: "title",
          bank_name: "",
          account_name: "",
          bank_info: "",
          is_deleted: false,
          is_favorite: false,
          balance: 0,
          locked: 0,
          pending: 0,
        }}
        onSubmit={(values) => AddCard(values)}
      >
        {({ handleChange, values, submitForm }) => (
          <div
            className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-20 `}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

            <div
              style={{ height: "fit-content" }}
              className={`bg-${theme} flex flex-col w-1/4 px-5 py-5 rounded-lg z-50`}
            >
              <button className="flex justify-end h-fit" onClick={discard}>
                <img className="w-6" src={cross} alt="" />
              </button>
              <form
                onSubmit={handleAddCards}
                className="w-full h-full flex justify-center flex-col"
              >
                <div className={"w-full px-2 py-5 flex justify-end"}>
                  <CustomDropdown
                    className={"bg-transparent w-fit"}
                    label={
                      <div>
                        <div className={asset ? "flex flex-row" : "hidden"}>
                          <img
                            className={`w-7 h-7 -mt-1.5 -m${oneDirection}-1`}
                            src={asset[2]}
                            alt=""
                          />
                          <span>{asset[0]}</span>
                        </div>
                        <div className={asset ? "hidden" : "flex flex-row"}>
                          <span>{lang["currency"]}</span>
                        </div>
                      </div>
                    }
                  >
                    {listCurrency.map((data) => (
                      <CustomItem
                        onClick={() => setAsset(data)}
                        className={"bg-transparent"}
                      >
                        {data[0]}
                      </CustomItem>
                    ))}
                  </CustomDropdown>
                </div>
                <div
                  className={
                    type.length !== 0
                      ? "hidden"
                      : "flex flex-col justify-center w-full px-2"
                  }
                >
                  <span
                    className={`text-${oppositeTheme} text-xl font-${font}-bold mt-3`}
                  >
                    {type.length === 0 ? "Card or Shaba number or Email" : type}
                  </span>
                  <div className="flex w-full justify-end">
                    <CustomDropdown
                      className={"bg-transparent w-fit"}
                      label={type.length === 0 ? "Card/Shaba/Email" : type}
                    >
                      <CustomItem onClick={() => setType("Card")}>
                        Card Number
                      </CustomItem>
                      <CustomItem onClick={() => setType("Shaba")}>
                        Shaba Number
                      </CustomItem>
                      <CustomItem onClick={() => setType("Email")}>
                        Email
                      </CustomItem>
                    </CustomDropdown>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-${oppositeTheme} text-xl font-${font}-bold mt-3`}
                  >
                    Bank Name
                  </span>
                  <div className="w-full">
                    <div className="w-full flex mt-0 px-2">
                      <input
                        onChange={(e) => setBankName(e.target.value)}
                        required
                        className={`flex-1 hide-input-arrows text-center-important font-${font}-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full`}
                        placeholder="Bank Name"
                      />
                    </div>
                  </div>
                  <span
                    className={`text-${oppositeTheme} text-xl font-${font}-bold mt-3`}
                  >
                    Account Name
                  </span>
                  <div className="w-full">
                    <div className="w-full flex mt-0 px-2">
                      <input
                        onChange={(e) => setAccountName(e.target.value)}
                        required
                        className={`flex-1 hide-input-arrows text-center-important font-${font}-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full`}
                        placeholder="Account Name"
                      />
                    </div>
                  </div>
                </div>

                <div className={type ? "block" : "hidden"}>
                  <div className={type === "Card" ? "flex flex-col" : "hidden"}>
                    <span
                      className={`text-${oppositeTheme} text-xl font-${font}-bold mt-1`}
                    >
                      Bank Information
                    </span>
                    <div className=" w-full">
                      <div className="w-full flex mt-0 px-2">
                        <input
                          onChange={(e) => setCardNumber(e.target.value)}
                          className={`flex-1 hide-input-arrows text-center-important font-${font}-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1 mb-3`}
                          placeholder={lang["cards_card_number_placeholder"]}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={type === "Shaba" ? "flex flex-col" : "hidden"}
                  >
                    <span
                      className={`text-${oppositeTheme} text-xl font-${font}-bold mt-1`}
                    >
                      {lang["cards_shaba_number"]}
                    </span>
                    <div className=" w-full">
                      <div className="w-full flex mt-0 px-2">
                        <input
                          onChange={(e) => setShabaNumber(e.target.value)}
                          className={`flex-1 hide-input-arrows text-center-important font-${font}-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1 mb-3`}
                          placeholder={lang["cards_shaba_number_placeholder"]}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={type === "Email" ? "flex flex-col" : "hidden"}
                  >
                    <span
                      className={`text-${oppositeTheme} text-xl font-${font}-bold mt-1`}
                    >
                      Email
                    </span>
                    <div className=" w-full">
                      <div className="w-full flex mt-0 px-2">
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          className={`flex-1 hide-input-arrows text-center-important font-${font}-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1 mb-3`}
                          placeholder="example@domain.com"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className={
                        type.length !== 0
                          ? "bg-blue-gradient rounded-xl text-white w-1/4 h-1/3 pt-1 mt-5"
                          : "hidden"
                      }
                    >
                      {lang["submit"]}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}
