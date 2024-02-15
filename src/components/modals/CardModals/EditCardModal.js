import { Formik } from "formik";
import React from "react";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useModalDataClose } from "../../../Providers/ModalDataProvider";
import SubmitButton from "../../common/SubmitButton";
import cross from "../../../Images/pages/layout/Profile/crossCardsGray.png";
import { useModalDataState } from "../../../Providers/ModalDataProvider";
import { useFontState } from "../../../Providers/FontProvider";
export default function EditCardModal() {
  const modalData = useModalDataState();
  const theme = useThemeState();
  const font = useFontState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const closeModal = useModalDataClose();
  const discard = () => {
    closeModal();
  };
  const updateCardInfo = (values) => {
    console.log(values);
    closeModal();
  };

  return (
    <>
      <Formik
        initialValues={{
          bank_name: modalData.data.bank_name,
          account_name: modalData.data.account_name,
          bank_info: modalData.data.bank_info,
          is_deleted: modalData.data.is_deleted,
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
                  Bank Name
                </span>
                <div className=" w-full">
                  <div className="w-full flex mt-0 px-2">
                    <input
                      onChange={handleChange("bank_name")}
                      value={values.bank_name}
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
                <div className=" w-full">
                  <div className="w-full flex mt-0 px-2">
                    <input
                      onChange={handleChange("account_name")}
                      value={values.account_name}
                      className={`flex-1 hide-input-arrows text-center-important font-${font}-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 outline-white rounded-lg w-full`}
                      placeholder="Bank Name"
                    />
                  </div>
                </div>
                <span
                  className={`text-${oppositeTheme} text-xl font-${font}-bold mt-3`}
                >
                  Bank Info
                </span>
                <div className=" w-full">
                  <div className="w-full flex mt-0 px-2">
                    <input
                      onChange={handleChange("bank_info")}
                      value={values.bank_info}
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
                      onClick={() => {
                        values.is_deleted = true;
                      }}
                      className={
                        "bg-red rounded-xl text-white w-fit h-10 mt-3 p-2"
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className={"xs:flex md:hidden flex-col h-full w-full "}>
                  <div className="w-full flex justify-center">
                    <button
                      onClick={() => {
                        values.is_deleted = true;
                      }}
                      className={
                        "bg-red rounded-xl text-white w-fit p-2 h-1/2 mt-5"
                      }
                    >
                      Delete
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
