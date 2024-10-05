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
import { CopyToClipboard } from "react-copy-to-clipboard";
import prod from "../../../../../apis/api";
import dev from "../../../../../apis/api-dev";
import { CustomTooltip } from "../../../../common/CustomTooltip";
const api = process.env.REACT_APP_MODE === "DEVELOPMENT" ? dev() : prod();

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
      className={`bg-${theme}-back rounded-3xl w-full relative grid grid-cols-2 grid-rows-2 gap-y-2 gap-x-4 lg:gap-y-0 px-5 py-4`}
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
            <div className="col-span-2 lg:col-span-1 row-span-1 flex flex-col justify-between">
              <span className={`text-gray font-${font}-regular`}>
                {lang["address"]}
              </span>
              {canEdit ? (
                <input
                  className={`bg-${theme} focus-outline-blue px-2.5 font-mint-regular outline-1 outline-white py-1 w-52 rounded-lg text-${oppositeTheme}`}
                  type="text"
                  onChange={handleChange("address")}
                  onBlur={handleBlur("address")}
                  value={values.address}
                />
              ) : (
                <span
                  className={`font-${font}-regular -mb-0.5 text-${oppositeTheme} w-full line-clamp-2 leading-5`}
                >
                  {userInfo && userInfo.address ? userInfo.address : ""}
                </span>
              )}
            </div>
            <div className="col-span-2 md:col-span-1 row-span-1 flex flex-col">
              <span className={`text-gray font-${font}-regular`}>
                {lang["referral-code"]}
              </span>
              <div className="flex items-center gap-x-3">
                <div className="flex">
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
                <div className="">
                  <CustomTooltip
                    trigger="click"
                    placement="top"
                    style={oppositeTheme}
                    content={
                      api["sign-up"] +
                      "?referral=" +
                      (userInfo ? userInfo.referral_code : "") +
                      " " +
                      lang["copied"] +
                      "!"
                    }
                    className={`font-${font}-bold pt-2.5`}
                  >
                    <CopyToClipboard
                      text={
                        api["sign-up"] +
                        "?referral=" +
                        (userInfo ? userInfo.referral_code : "")
                      }
                    >
                      <button>
                        <span className="text-blue w-fit">
                          {lang["copy-link"]}
                        </span>
                      </button>
                    </CopyToClipboard>
                  </CustomTooltip>
                </div>
              </div>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}
