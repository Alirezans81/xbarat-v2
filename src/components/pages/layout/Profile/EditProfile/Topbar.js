import React, { useRef, useState } from "react";
import { useUserState } from "../../../../../Providers/UserProvider";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useModalDataSetState } from "../../../../../Providers/ModalDataProvider";
import ChangePasswordModal from "../../../../modals/ChangePasswordModal";
import { Formik } from "formik";

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
  const updateName = (name) => {
    console.log(name);
    setCanEditName(false);
  };

  const profilePicRef = useRef();
  const pickPhoto = () => {
    profilePicRef.current.click();
  };

  return (
    <>
      <div className="w-full flex justify-between items-start">
        <div className="flex gap-3 items-center">
          {userInfo && userInfo.isActive ? (
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
                  userInfo.avatar && userInfo.avatar
                    ? userInfo.avatar
                    : require("../../../../../Images/pages/layout/Profile/no-profile.png")
                }
              />
            </button>
          ) : (
            <img
              className="w-16 h-16"
              src={
                userInfo.avatar && userInfo.avatar
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
                    name: userInfo && userInfo.name ? userInfo.name : "",
                  }}
                  onSubmit={(values) => updateName(values.name)}
                >
                  {({ handleChange, handleBlur, values, submitForm }) => (
                    <div className="mb-2 flex gap-2">
                      <input
                        className={`bg-${theme}-back focus-outline-blue px-2.5 font-mint-regular py-1 w-44 rounded-lg text-${oppositeTheme}`}
                        type="text"
                        onChange={handleChange("name")}
                        onBlur={handleBlur("name")}
                        value={values.name}
                      />
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
                    {userInfo && userInfo.name ? userInfo.name : ""}
                  </span>
                  {userInfo && userInfo.isActive && (
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
