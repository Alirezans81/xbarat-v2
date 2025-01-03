import React, { useEffect, useRef, useState } from "react";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useModalDataSetState } from "../../../../../Providers/ModalDataProvider";
import { useToastDataSetState } from "../../../../../Providers/ToastDataProvider";
import ChangePasswordModal from "../../../../modals/ChangePasswordModal";
import { Formik } from "formik";
import { useUpdateNameAndAvatar } from "../../../../../apis/pages/Profile/hooks";
import { useIsLoadingSplashScreenSetState } from "../../../../../Providers/IsLoadingSplashScreenProvider";
import { useLimitSize } from "../../../../../hooks/useImageUploaderFunctions";
import { useFontState } from "../../../../../Providers/FontProvider";
import CopyText from "../../../../common/CopyText";

export default function Topbar({ userInfo }) {
  const lang = useLanguageState();
  const font = useFontState();
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

  const setToastData = useToastDataSetState();

  const [canEditNameAndAvatar, setCanEditNameAndAvatar] = useState(false);

  const setLoading = useIsLoadingSplashScreenSetState();
  const { updateNameAndAvatar, error, isLoading } = useUpdateNameAndAvatar();
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const limitImageSize = useLimitSize();

  const profilePicRef = useRef();
  const pickPhoto = () => {
    profilePicRef.current.click();
  };

  const previewImageRef = useRef();

  return (
    <>
      <div className="w-full flex justify-between items-center md:py-3">
        <div className="flex gap-3 items-center h-9">
          <Formik
            initialValues={{
              first_name:
                userInfo && userInfo["first_name"]
                  ? userInfo["first_name"]
                  : "",
              last_name:
                userInfo && userInfo["last_name"] ? userInfo["last_name"] : "",
              avatar: null,
            }}
            onSubmit={(values) => {
              if (!values.avatar || limitImageSize(values.avatar)) {
                updateNameAndAvatar(values, () => {
                  setCanEditNameAndAvatar(false);
                });
              } else {
                setToastData({
                  status: "failed",
                  message: "The image is too big (Must be less than 4 MB).",
                  canClose: true,
                  isOpen: true,
                  showTime: 10000,
                });
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              values,
              submitForm,
              setFieldValue,
            }) => (
              <>
                {canEditNameAndAvatar ? (
                  <button onClick={pickPhoto}>
                    <input
                      ref={profilePicRef}
                      type="file"
                      accept="image/*"
                      className="w-0 h-0 hidden absolute"
                      name="avatar"
                      onChange={(event) => {
                        if (event.currentTarget.files[0]) {
                          const fileReader = new FileReader();
                          fileReader.onload = (event) => {
                            previewImageRef.current.src = event.target.result;
                          };
                          fileReader.readAsDataURL(
                            event.currentTarget.files[0]
                          );
                        }
                        setFieldValue("avatar", event.currentTarget.files[0]);
                      }}
                    />

                    <img
                      ref={previewImageRef}
                      className="w-10 h-10 md:w-16 md:h-16 rounded-full object-cover"
                      src={require("../../../../../Images/pages/layout/Profile/edit-profile.png")}
                      alt="selected avatar"
                    />
                  </button>
                ) : (
                  <div className="relative">
                    <img
                      className="w-10 h-10 md:w-16 md:h-16 rounded-full"
                      style={{ objectFit: "cover" }}
                      src={
                        userInfo && userInfo.avatar
                          ? userInfo.avatar
                          : require("../../../../../Images/pages/layout/Profile/no-profile.png")
                      }
                      alt="current avatar"
                    />
                    <div
                      className={`absolute md:hidden top-0 w-10 h-10 md:w-16 md:h-16 rounded-full bg-dark-glass flex justify-center items-center`}
                    >
                      {userInfo && userInfo["is_verified"] && (
                        <button onClick={() => setCanEditNameAndAvatar(true)}>
                          <img
                            className="w-5 h-5"
                            src={require("../../../../../Images/pages/layout/Profile/edit-light.png")}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                )}
                <div className="flex flex-col">
                  <div className="flex gap-2 items-center">
                    {canEditNameAndAvatar ? (
                      <div className="md:mb-2 flex gap-2">
                        <div className="flex flex-row gap-x-2">
                          <input
                            className={`bg-${theme}-back focus-outline-blue px-2.5 font-mint-regular py-1 text-xs md:text-base w-20 md:w-28 rounded-lg text-${oppositeTheme}`}
                            type="text"
                            onChange={handleChange("first_name")}
                            onBlur={handleBlur("first_name")}
                            value={values.first_name}
                            placeholder={lang["first-name"]}
                          />
                          <input
                            className={`bg-${theme}-back focus-outline-blue px-2.5 font-mint-regular py-1 text-xs md:text-base w-20 md:w-28 rounded-lg text-${oppositeTheme}`}
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
                          <button
                            onClick={() => setCanEditNameAndAvatar(false)}
                          >
                            <img
                              className="w-5 h-5"
                              src={require("../../../../../Images/multiplication.png")}
                            />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-x-2 items-center -mt-0.5">
                        <span
                          className={`font-${font}-bold whitespace-nowrap text-sm md:text-xl pt-2.5 text-${oppositeTheme}`}
                        >
                          {userInfo && userInfo["get_full_name"]
                            ? userInfo["get_full_name"]
                            : ""}
                        </span>
                        {userInfo && userInfo["is_verified"] && (
                          <button onClick={() => setCanEditNameAndAvatar(true)}>
                            <img
                              className="hidden w-5 h-5 md:block"
                              src={require("../../../../../Images/pages/layout/Profile/edit.png")}
                            />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  {!canEditNameAndAvatar && (
                    <div className="flex items-center gap-x-0.5 -mt-0.5">
                      <span
                        className={`text-sm md:text-base font-${font}-regular text-gray`}
                      >
                        {userInfo && userInfo.code ? userInfo.code : ""}
                      </span>
                      <div className="-mt-1">
                        <CopyText
                          text={userInfo && userInfo.code ? userInfo.code : ""}
                          small
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </Formik>
        </div>
        {!canEditNameAndAvatar && (
          <button
            onClick={openChangePasswordModal}
            className="text-blue text-xs md:text-base w-12 text-center-important md:w-auto"
          >
            {lang["change-password"]}
          </button>
        )}
      </div>
    </>
  );
}
