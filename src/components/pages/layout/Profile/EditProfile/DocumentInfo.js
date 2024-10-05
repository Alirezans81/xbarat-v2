import React from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";
import CustomPreviewer from "../../../../common/CustomPreviewer";
import { useFontState } from "../../../../../Providers/FontProvider";
import SubmitButton from "../../../../common/SubmitButton";
import { useModalDataSetState } from "../../../../../Providers/ModalDataProvider";
import CompleteProfileModal from "../../../../modals/CompleteProfileModal";

export default function DocumentInfo({ userInfo }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();
  const setModalData = useModalDataSetState();

  const openCompleteProfileModal = () => {
    setModalData({
      title: "",
      children: <CompleteProfileModal />,
      canClose: false,
      isOpen: true,
    });
  };

  return (
    <div
      className={`bg-${theme}-back grid grid-cols-2 gap-y-2 gap-x-4 lg:gap-y-0 rounded-3xl w-full flex-1 px-5 py-4`}
    >
      {userInfo && userInfo.document ? (
        <>
          <div className="flex flex-col col-span-2 lg:col-span-1">
            <span className={`font-${font}-regular text-gray`}>
              {lang["number-of-document"]}
            </span>
            <span className={`font-${font}-regular text-${oppositeTheme}`}>
              {userInfo && userInfo.identity_code ? userInfo.identity_code : ""}
            </span>
          </div>
          <div className="flex flex-col col-span-2 lg:col-span-1">
            <span className={`font-${font}-regular text-gray`}>
              {lang["document"]}
            </span>
            <CustomPreviewer imageUrl={userInfo.document} />
          </div>
        </>
      ) : (
        <div className="col-span-2">
          <SubmitButton
            rounded="xl"
            type="button"
            onClick={openCompleteProfileModal}
            className={`w-full bg-blue py-3 text-light font-${font}-regular text-lg`}
          >
            {lang["upload-document"]}
          </SubmitButton>
        </div>
      )}
    </div>
  );
}
