import React, { useRef, useState } from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useLimitSize } from "../../hooks/useImageUploaderFunctions";
import { useToastDataSetState } from "../../Providers/ToastDataProvider";

export default function CustomUploader({ setImage }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const limitImageSize = useLimitSize();
  const setToastData = useToastDataSetState();

  const documentRef = useRef();
  const pickPhoto = () => {
    documentRef.current.click();
  };

  const [fileName, setFileName] = useState("");

  return (
    <div
      className={`flex-1 flex flex-row justify-between gap-x-2 bg-${theme}-back py-2.5 px-2.5 rounded-md`}
    >
      <input
        ref={documentRef}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={(event) => {
          if (limitImageSize(event.currentTarget.files[0])) {
            setFileName(event.currentTarget.files[0].name);
            setImage(event.currentTarget.files[0]);
          } else {
            setToastData({
              status: "failed",
              message: "The image is too big (Must be less than 4 MB).",
              canClose: true,
              isOpen: true,
              showTime: 3000,
            });
          }
        }}
      />

      <img className="h-5 w-5" src={require("../../Images/common/file.png")} />
      <span
        className={`text-${oppositeTheme} font-mine-regular flex-1 w-48 whitespace-nowrap overflow-hidden text-ellipsis`}
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
