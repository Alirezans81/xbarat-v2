import React, { useEffect, useRef, useState } from "react";
import { useUserState } from "../../../../../Providers/UserProvider";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useModalDataSetState } from "../../../../../Providers/ModalDataProvider";
import ChangePasswordModal from "../../../../modals/ChangePasswordModal";
import { Formik } from "formik";
import { useUpdateName } from "../../../../../apis/pages/Profile/hooks";
import { useIsLoadingSplashScreenSetState } from "../../../../../Providers/IsLoadingSplashScreenProvider";

export default function Topbar({ userInfo }) {
  const lang = useLanguageState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  const setModalData = useModalDataSetState();
  const openChangePasswordModal = () => {
    setModalData({
      title: lang["change-password"],
      children: <ChangePasswordModal />,
      canClose: true,
      isOpen: true,
    });
  };

  const [canEditName, setCanEditName] = useState(false);

  const setLoading = useIsLoadingSplashScreenSetState();
  const { updateName, error, isLoading } = useUpdateName();
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const profilePicRef = useRef();
  const pickPhoto = () => {
    profilePicRef.current.click();
  };

  return (
    <>
      <div className="w-full flex justify-between items-start">
        <div className="flex gap-3 items-center">
          {userInfo && userInfo["is_active"] ? (
            <button onClick={pickPhoto}>
              <input
                ref={profilePicRef}
                type="file"
                accept="image"
                className="w-0 h-0 absolute"
              />

              <img
                className="w-16 h-16"
                src={
                  userInfo && userInfo.avatar
                    ? userInfo.avatar
                    : require("../../../../../Images/pages/layout/Profile/no-profile.png")
                }
              />
            </button>
          ) : (
            <img
              className="w-16 h-16"
              src={
                userInfo && userInfo.avatar
                  ? userInfo.avatar
                  : require("../../../../../Images/pages/layout/Profile/no-profile.png")
              }
            />
          )}
          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              {canEditName ? (
                <Formik
                  initialValues={{
                    first_name:
                      userInfo && userInfo["first_name"]
                        ? userInfo["first_name"]
                        : "",
                    last_name:
                      userInfo && userInfo["last_name"]
                        ? userInfo["last_name"]
                        : "",
                  }}
                  onSubmit={(values) => {
                    updateName(values, () => {
                      setCanEditName(false);
                    });
                  }}
                >
                  {({ handleChange, handleBlur, values, submitForm }) => (
                    <div className="mb-2 flex gap-2">
                      <div className="flex flex-row gap-x-2">
                        <input
                          className={`bg-${theme}-back focus-outline-blue px-2.5 font-mint-regular py-1 w-28 rounded-lg text-${oppositeTheme}`}
                          type="text"
                          onChange={handleChange("first_name")}
                          onBlur={handleBlur("first_name")}
                          value={values.first_name}
                          placeholder={lang["first-name"]}
                        />
                        <input
                          className={`bg-${theme}-back focus-outline-blue px-2.5 font-mint-regular py-1 w-28 rounded-lg text-${oppositeTheme}`}
                          type="text"
                          onChange={handleChange("last_name")}
                          onBlur={handleBlur("last_name")}
                          value={values.last_name}
                          placeholder={lang["last-name"]}
                        />
                      </div>
                      <div className="flex gap-1">
                        <button onClick={submitForm}>
                          <img
                            className="w-5 h-5"
                            src={require("../../../../../Images/check.png")}
                          />
                        </button>
                        <button onClick={() => setCanEditName(false)}>
                          <img
                            className="w-5 h-5"
                            src={require("../../../../../Images/multiplication.png")}
                          />
                        </button>
                      </div>
                    </div>
                  )}
                </Formik>
              ) : (
                <div className="flex gap-2 items-center -mt-0.5">
                  <span
                    className={`font-mine-bold text-xl pt-2.5 text-${oppositeTheme}`}
                  >
                    {userInfo && userInfo["first_name"] && userInfo["last_name"]
                      ? userInfo["first_name"] + " " + userInfo["last_name"]
                      : ""}
                  </span>
                  {userInfo && userInfo["is_active"] && (
                    <button onClick={() => setCanEditName(true)}>
                      <img
                        className="w-4 h-4"
                        src={require("../../../../../Images/pages/layout/Profile/edit.png")}
                      />
                    </button>
                  )}
                </div>
              )}
            </div>
            <span className={`font-mine-regular text-gray -mt-1.5`}>
              {(userInfo && userInfo.personCode
                ? userInfo.personCode + " ("
                : "") + (userInfo && userInfo.role ? userInfo.role + ")" : "")}
            </span>
          </div>
        </div>
        <button onClick={openChangePasswordModal} className="text-blue">
          {lang["change-password"]}
        </button>
      </div>
    </>
  );
}
