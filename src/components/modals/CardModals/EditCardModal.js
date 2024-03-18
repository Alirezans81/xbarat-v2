import { Formik } from "formik";
import { React, useEffect, useState } from "react";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useModalDataClose } from "../../../Providers/ModalDataProvider";
import SubmitButton from "../../common/SubmitButton";
import { useEditWalletTanks } from "../../../apis/common/wallet/hooks";
import { useIsLoadingSplashScreenSetState } from "../../../Providers/IsLoadingSplashScreenProvider";
import cross from "../../../Images/pages/layout/Profile/crossCardsGray.png";
import { useModalDataState } from "../../../Providers/ModalDataProvider";
import { useFontState } from "../../../Providers/FontProvider";
import { useToastDataSetState } from "../../../Providers/ToastDataProvider";
import { useNavigate } from "react-router-dom";

export default function EditCardModal() {
  const modalData = useModalDataState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const theme = useThemeState();
  const navigate = useNavigate();
  const font = useFontState();
  const setToastData = useToastDataSetState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const closeModal = useModalDataClose();
  const { editWalletTank, isLoading: editWalletTankIsLoading } =
    useEditWalletTanks();

  useEffect(() => {
    setIsLoadingSplashScreen(editWalletTankIsLoading);
  }, [editWalletTankIsLoading]);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const discard = () => {
    closeModal();
  };
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  const validation = (values) => {
    if (
      !values.account_name ||
      !values.bank_info ||
      !values.bank_name ||
      !values.wallet_tank_type
    ) {
      return false;
    }
    if (
      values.wallet_tank_type.includes("shaba") &&
      !values.bank_info.includes("IR")
    ) {
      return false;
    }
    if (values.wallet_tank_type.includes("email")) {
      if (!isValidEmail(values.bank_info)) {
        return false;
      }
    }
    return true;
  };
  const updateCardInfo = (values) => {
    values.bank_info = values.bank_info.replace(/\s/g, "");
    if (validation(values)) {
      editWalletTank(values.url, values);
      closeModal();
      navigate("/profile/");
      sleep(2800).then(() => {
        window.location.reload();
      });
    } else {
      setToastData({
        status: "failed",
        message: "Please Enter Valid Data",
        canClose: true,
        isOpen: true,
        showTime: 10000,
      });
      closeModal();
    }
  };
  const params = { is_deleted: true, is_favorite: modalData.data.is_favorite };

  function handleDeleteCard() {
    editWalletTank(modalData.data.url, params);
    closeModal();
    navigate("/profile/");
    sleep(2800).then(() => {
      window.location.reload();
    });
  }

  const addSpacefour = (values) => {
    const value = values.bank_info;
    let result = values.bank_info;
    if (values.wallet_tank_type.includes("card")) {
      const sanitizedValue = value.replace(/\D/g, "");
      const chunks = sanitizedValue.match(/.{1,4}/g);
      result = chunks ? chunks.join(" ") : "";
    }
    return result;
  };
  console.log(modalData);

  return (
    <>
      <Formik
        initialValues={{
          url: modalData.data.url,
          bank_name: modalData.data.bank_name,
          account_name: modalData.data.account_name,
          bank_info: modalData.data.bank_info,
          is_deleted: false,
          is_favorite: modalData.data.is_favorite,
          wallet_tank_type: modalData.data.wallet_tank_type,
        }}
        onSubmit={(values) => updateCardInfo(values)}
      >
        {({ handleChange, values, submitForm }) => (
          <div
            className={`fixed top-0 left-0 w-browser h-browser flex items-center justify-center z-20 min-w-fit`}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

            <div
              style={{ height: "fit-content" }}
              className={`bg-${theme} flex flex-col xs:w-1/2 md:w-1/4 p-5 rounded-lg z-50`}
            >
              <button className="flex justify-end h-fit" onClick={discard}>
                <img className="w-6" src={cross} alt="" />
              </button>
              <div className="w-full h-full flex justify-center flex-col">
                <span
                  className={`text-${oppositeTheme} text-xl font-${font}-bold mt-3`}
                >
                  {lang["Bank_Name"]}
                </span>
                <div className=" w-full">
                  <div className="w-full flex mt-0 px-2">
                    <input
                      onChange={handleChange("bank_name")}
                      value={values.bank_name}
                      className={`flex-1 hide-input-arrows text-center-important font-${font}-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full`}
                      placeholder={lang["Bank_Name"]}
                    />
                  </div>
                </div>
                <span
                  className={`text-${oppositeTheme} text-xl font-${font}-bold mt-3`}
                >
                  {lang["Account_Name"]}
                </span>
                <div className=" w-full">
                  <div className="w-full flex mt-0 px-2">
                    <input
                      onChange={handleChange("account_name")}
                      value={values.account_name}
                      className={`flex-1 hide-input-arrows text-center-important font-${font}-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full`}
                      placeholder={lang["Account_Name"]}
                    />
                  </div>
                </div>
                <span
                  className={`text-${oppositeTheme} text-xl font-${font}-bold mt-3`}
                >
                  {lang["Bank_Info"]}
                </span>
                <div className=" w-full">
                  <div className="w-full flex mt-0 px-2">
                    <input
                      onChange={handleChange("bank_info")}
                      value={addSpacefour(values)}
                      className={`flex-1 hide-input-arrows text-center-important font-${font}-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full`}
                      placeholder={lang["add_cards_title"]}
                    />
                  </div>
                </div>
                <div
                  className={"xs:hidden md:flex flex-row-reverse h-full w-full"}
                >
                  <div className="w-1/2 flex justify-end">
                    <SubmitButton
                      rounded="xl"
                      className="mt-3 mb-3 h-10 p-2"
                      onClick={submitForm}
                    >
                      {lang["submit"]}
                    </SubmitButton>
                  </div>
                  <div className="w-1/2 flex justify-start">
                    <button
                      onClick={handleDeleteCard}
                      className={
                        "bg-red rounded-xl text-white w-fit h-10 mt-3 p-2"
                      }
                    >
                      {lang["delete"]}
                    </button>
                  </div>
                </div>
                <div className={"xs:flex md:hidden flex-col h-full w-full "}>
                  <div className="w-full flex justify-center">
                    <button
                      className={
                        "bg-red rounded-xl text-white w-fit h-10 mt-3 p-2"
                      }
                      onClick={handleDeleteCard}
                    >
                      {lang["delete"]}
                    </button>
                  </div>
                  <div className="w-full flex justify-center">
                    <SubmitButton
                      rounded="lg"
                      className="mt-6 mb-3 h-10 p-2"
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
