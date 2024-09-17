import React, { useRef, useState } from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useLimitSize } from "../../hooks/useImageUploaderFunctions";
import { useToastDataSetState } from "../../Providers/ToastDataProvider";
import { useFontState } from "../../Providers/FontProvider";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useCropImageModalOpen } from "../../Providers/CropImageModalProvider";

export default function CustomUploader({ setImage }) {
  const lang = useLanguageState();
  const theme = useThemeState();
  const font = useFontState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const limitImageSize = useLimitSize();
  const setToastData = useToastDataSetState();

  const openCropImageModal = useCropImageModalOpen();

  const documentRef = useRef();
  const pickPhoto = () => {
    documentRef.current.click();
  };

  const [fileName, setFileName] = useState("");

  const handleImageInputChange = (e) => {
    const file = e.target.files[0];
    if (limitImageSize(file)) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setFileName(file.name);

        const imageSrc = reader.result.toString() || "";
        openCropImageModal(imageSrc, setImage);
      });
      reader.readAsDataURL(file);
    } else {
      setToastData({
        status: "failed",
        message: lang["file-too-big-toast-message"],
        canClose: true,
        isOpen: true,
        showTime: 10000,
      });
    }
  };

  return (
    <div
      className={`flex-1 flex flex-row justify-between gap-x-2 bg-${theme}-back py-2.5 px-2.5 rounded-md`}
    >
      <input
        ref={documentRef}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleImageInputChange}
      />

      <img className="h-5 w-5" src={require("../../Images/common/file.png")} />
      <span
        className={`text-${oppositeTheme} font-${font}-regular flex-1 w-48 whitespace-nowrap overflow-hidden text-ellipsis`}
      >
        {fileName}
      </span>
      <button type="button" onClick={pickPhoto}>
        <img
          className="h-5 w-5"
          src={require("../../Images/common/upload.png")}
        />
      </button>
    </div>
  );
}
