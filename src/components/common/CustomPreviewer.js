import React, { useRef, useState } from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useModalDataSetState } from "../../Providers/ModalDataProvider";
import PreviewImageModal from "../modals/PreviewImageModal";

export default function CustomPreviewer({ imageUrl }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const setModalData = useModalDataSetState();

  const openPreviewImageModal = () => {
    setModalData({
      title: "",
      children: <PreviewImageModal imageUrl={imageUrl} />,
      canClose: true,
      isOpen: true,
    });
  };

  const imageUrlSplited = imageUrl.split("/");
  const fileName = imageUrlSplited
    ? imageUrlSplited[imageUrlSplited.length - 1]
    : "";

  return (
    <div
      className={`flex flex-row justify-between gap-x-2 bg-${theme} py-2.5 px-2.5 rounded-md`}
    >
      <img className="h-5 w-5" src={require("../../Images/common/file.png")} />
      <span
        className={`text-${oppositeTheme} font-mine-regular flex-1 w-48 whitespace-nowrap overflow-hidden text-ellipsis`}
      >
        {fileName}
      </span>
      <button type="button" onClick={openPreviewImageModal}>
        <img
          className="h-5 w-5"
          src={require("../../Images/common/preview.png")}
        />
      </button>
    </div>
  );
}
