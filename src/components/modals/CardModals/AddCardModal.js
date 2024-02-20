import { useLanguageState } from "../../../Providers/LanguageProvider";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useFontState } from "../../../Providers/FontProvider";
import { useIsLoadingSplashScreenSetState } from "../../../Providers/IsLoadingSplashScreenProvider";
import { useCreateWalletTank } from "../../../apis/common/wallet/hooks";
import { useModalDataState } from "../../../Providers/ModalDataProvider";
import {
  CustomDropdown,
  CustomItem,
} from "../../../components/common/CustomDropdown";
import { useModalDataClose } from "../../../Providers/ModalDataProvider";
import { useCurrenciesState } from "../../../Providers/CurrenciesProvider";
import { Formik } from "formik";
import SubmitButton from "../../common/SubmitButton";
import cross from "../../../Images/pages/layout/Profile/crossCardsGray.png";
import { useDirectionState } from "../../../Providers/DirectionProvider";
import { useState, useEffect } from "react";
import { useUserState } from "../../../Providers/UserProvider";
import { useToastDataSetState } from "../../../Providers/ToastDataProvider";

export default function AddCardModal() {
  const user = useUserState();
  const oneDirection = useDirectionState();
  const modalData = useModalDataState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const theme = useThemeState();
  const currencies = useCurrenciesState();
  const setToastData = useToastDataSetState();
  const lang = useLanguageState();
  const font = useFontState();
  const closeModal = useModalDataClose();
  const [asset, setAsset] = useState("");
  const [type, setType] = useState("");

  const oppositeTheme = theme === "dark" ? "light" : "dark";

  const api =
    process.env.REACT_APP_MODE === "PRODUCTION"
      ? require("../../../apis/api-dev.json")
      : require("../../../apis/api.json");

  let listCurrency = currencies.map((data) => [
    data.abbreviation,
    data.url,
    data.sym_pic_gray,
  ]);

  function discard() {
    closeModal();
  }
  const addSpacefour = (value) => {
    const sanitizedValue = value.replace(/\D/g, "");
    const chunks = sanitizedValue.match(/.{1,4}/g);
    const result = chunks ? chunks.join(" ") : "";
    return result;
  };
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const { createWalletTank, isLoading: createWalletTankIsLoading } =
    useCreateWalletTank();
  useEffect(() => {
    setIsLoadingSplashScreen(createWalletTankIsLoading);
  }, [createWalletTankIsLoading]);

  const validation = (params) => {
    if (
      params.wallet_tank_type.includes("email") &&
      !isValidEmail(params.bank_info)
    ) {
      return false;
    }
    if (
      params.wallet_tank_type.includes("card") &&
      params.bank_info.length !== 16
    ) {
      return false;
    }
    const sanitizedValue = params.bank_info.replace(/\D/g, "");
    if (
      params.wallet_tank_type.includes("shaba") &&
      (!params.bank_info.includes("IR") || sanitizedValue.length !== 24)
    ) {
      return false;
    }
    return true;
  };

  const AddCard = (values) => {
    const params = {
      user: user.url,
      title: "title",
      bank_name: values.bank_name,
      account_name: values.account_name,
      bank_info: values.bank_info,
      is_deleted: false,
      is_favorite: false,
      balance: 0,
      locked: 0,
      pending: 0,
      currency: asset[1],
      wallet_tank_type:
        type === "Card"
          ? api["wallet-tank-type"] + "card-number/"
          : type === "Email"
          ? api["wallet-tank-type"] + "paypal-email/"
          : api["wallet-tank-type"] + "shaba-number/",
    };
    if (validation(params)) {
      createWalletTank(params);
    } else {
      setToastData({
        status: "failed",
        message: "Please enter valid data",
        canClose: true,
        isOpen: true,
        showTime: 3000,
      });
    }
    closeModal();
  };
  console.log(listCurrency);
  return (
    <>
      <Formik
        initialValues={{
          user: modalData,
          title: "title",
          bank_name: "",
          account_name: "",
          bank_info: "",
          is_deleted: false,
          is_favorite: false,
          wallet_tank_type: "",
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
              <div className="w-full h-full flex justify-center flex-col">
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
                        className={"bg-transparent h-fit"}
                      >
                        <div className="flex flex-row  w-10 h-10 justify-center">
                          <img className="w-fit h-fit" alt="" src={data[2]} />
                          <span className=" w-fit h-fit mt-3 ml-2">
                            {data[0]}
                          </span>
                        </div>
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
                        onChange={handleChange("bank_name")}
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
                        onChange={handleChange("account_name")}
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
                          onChange={handleChange("bank_info")}
                          className={`flex-1 hide-input-arrows text-center-important font-${font}-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1 mb-3`}
                          placeholder={lang["cards_card_number_placeholder"]}
                          value={addSpacefour(values.bank_info)}
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
                          onChange={handleChange("bank_info")}
                          className={`flex-1 hide-input-arrows text-center-important font-${font}-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1 mb-3`}
                          placeholder={lang["cards_shaba_number_placeholder"]}
                          value={values.bank_info}
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
                          onChange={handleChange("bank_info")}
                          className={`flex-1 hide-input-arrows text-center-important font-${font}-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1 mb-3`}
                          placeholder="example@domain.com"
                          value={values.bank_info}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <SubmitButton
                      rounded="lg"
                      className="mt-5 h-1/3 w-1/4"
                      onClick={submitForm}
                    >
                      {lang["submit"]}
                    </SubmitButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}