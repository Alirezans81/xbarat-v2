import React, { useEffect, useRef, useState } from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import EditButton from "./common/EditButton";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";
import { Formik } from "formik";
import OTPCodeModal from "../../../../modals/OTPCodeModal";
import { useModalDataSetState } from "../../../../../Providers/ModalDataProvider";

export default function Personalnfo({ userInfo }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const [canEdit, setCanEdit] = useState();
  const formikRef = useRef();

  useEffect(() => {
    if (!canEdit) {
      formikRef.current?.resetForm();
    }
  }, [canEdit]);

  const setModalData = useModalDataSetState();
  const openOTPCodeModal = () => {
    setModalData({
      title: lang["verifying-phone-number"],
      children: <OTPCodeModal />,
      canClose: true,
      isOpen: true,
    });
  };

  return (
    <div
      className={`bg-${theme}-back rounded-3xl w-full relative grid grid-cols-2 grid-rows-2 px-5 py-4`}
    >
      <EditButton
        canEdit={canEdit}
        setCanEdit={setCanEdit}
        customFunction={openOTPCodeModal}
      />
      <Formik
        innerRef={formikRef}
        initialValues={{
          email: userInfo && userInfo.email ? userInfo.email : "",
          phoneNumber:
            userInfo && userInfo.phoneNumber ? userInfo.phoneNumber : "",
        }}
      >
        {({ handleChange, handleBlur, values, handleSubmit }) => (
          <>
            <div className="col-span-1 row-span-1 flex flex-col">
              <span className="text-gray font-mine-regular">
                {lang["email"]}
              </span>
              {canEdit ? (
                <input
                  className={`bg-${theme} focus-outline-blue px-2.5 font-mint-regular outline-1 outline-white py-1 w-52 rounded-lg text-gray`}
                  type="text"
                  onChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  disabled
                />
              ) : (
                <span
                  className={`font-mine-regular -mt-1 text-${oppositeTheme}`}
                >
                  {userInfo && userInfo.email ? userInfo.email : ""}
                </span>
              )}
            </div>
            <div className="col-span-1 row-span-1 flex flex-col">
              <span className="text-gray font-mine-regular">
                {lang["phone-number"]}
              </span>
              {canEdit ? (
                <input
                  className={`bg-${theme} focus-outline-blue px-2.5 font-mint-regular outline-1 outline-white py-1 w-52 rounded-lg text-${oppositeTheme}`}
                  type="text"
                  onChange={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  value={values.phoneNumber}
                />
              ) : (
                <span
                  className={`font-mine-regular -mt-1 text-${oppositeTheme}`}
                >
                  {userInfo && userInfo.email ? userInfo.phoneNumber : ""}
                </span>
              )}
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}
