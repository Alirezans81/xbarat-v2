import React, { useEffect, useRef, useState } from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import EditButton from "./common/EditButton";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";
import { Formik } from "formik";
import OTPCodeModal from "../../../../modals/OTPCodeModal";
import { useModalDataSetState } from "../../../../../Providers/ModalDataProvider";
import { useUpdatePhone } from "../../../../../apis/pages/Profile/hooks";
import CopyText from "../../../../common/CopyText";
import { useFontState } from "../../../../../Providers/FontProvider";

export default function Personalnfo({ userInfo }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();
  const [canEdit, setCanEdit] = useState();
  const formikRef = useRef();

  useEffect(() => {
    if (!canEdit) {
      formikRef.current?.resetForm();
    }
  }, [canEdit]);

  const { updatePhone, isLoading: updatePhoneIsLoading } = useUpdatePhone();
  const updatePhoneMine = (values) => {
    updatePhone({ phone: values && values.phone ? values.phone : "" });
  };

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
      className={`bg-${theme}-back rounded-3xl w-full relative grid grid-cols-2 grid-rows-2 gap-y-2 lg:gap-y-0 px-5 py-4`}
    >
      <Formik
        innerRef={formikRef}
        initialValues={{
          email: userInfo && userInfo.email ? userInfo.email : "",
          phone: userInfo && userInfo.phone ? userInfo.phone : "",
        }}
      >
        {({ handleChange, handleBlur, values }) => (
          <>
            {/* <EditButton
              canEdit={canEdit}
              setCanEdit={setCanEdit}
              customFunction={() => {
                setCanEdit(false);
                updatePhoneMine(values);
              }}
            /> */}
            <div className="col-span-2 lg:col-span-1 row-span-1 flex flex-col">
              <span className={`text-gray font-${font}-regular`}>
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
                  className={`font-${font}-regular -mt-1 text-${oppositeTheme}`}
                >
                  {userInfo && userInfo.email ? userInfo.email : ""}
                </span>
              )}
            </div>
            <div className="col-span-2 lg:col-span-1 row-span-1 flex flex-col">
              <span className={`text-gray font-${font}-regular`}>
                {lang["phone-number"]}
              </span>
              {canEdit ? (
                <input
                  className={`bg-${theme} focus-outline-blue px-2.5 font-mint-regular outline-1 outline-white py-1 w-52 rounded-lg text-${oppositeTheme}`}
                  type="text"
                  onChange={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                />
              ) : (
                <span
                  className={`font-${font}-regular -mt-1 text-${oppositeTheme}`}
                >
                  {userInfo && userInfo.phone ? userInfo.phone : ""}
                </span>
              )}
            </div>
            <div className="col-span-1 md:col-span-2 row-span-1 flex flex-col">
              <span className={`text-gray font-${font}-regular`}>
                {lang["referral-code"]}
              </span>
              <span
                className={`flex items-center font-${font}-regular border-2 border-dashed border-gray rounded-full w-fit px-3 mt-1 text-${oppositeTheme}`}
              >
                <span className="pt-1.5 pb-1">
                  {userInfo && userInfo.referral_code
                    ? userInfo.referral_code
                    : ""}
                </span>
                <div className="h-full border border-gray border-dashed mx-2" />

                <CopyText
                  text={
                    userInfo && userInfo.referral_code
                      ? userInfo.referral_code
                      : ""
                  }
                />
              </span>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}
