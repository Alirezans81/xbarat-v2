import React from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useDirectionState } from "../../Providers/DirectionProvider";
import { useFontState } from "../../Providers/FontProvider";
import {
  useCropImageModalClose,
  useCropImageModalState,
} from "../../Providers/CropImageModalProvider";

export default function CustomModal() {
  const theme = useThemeState();
  const font = useFontState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const { one: oneDirection } = useDirectionState();

  const { title, children, canClose, isOpen } = useCropImageModalState();
  const closeModal = useCropImageModalClose();

  return (
    <div
      className={`absolute w-browser h-browser bg-modal-glass flex justify-center items-center transition-all duration-300 ${
        isOpen ? "z-50 opacity-100" : "-z-10 opacity-0"
      } `}
    >
      <div
        className={`w-max bg-${theme} rounded-2xl px-4 py-2 overflow-hidden`}
      >
        <div className="flex justify-between items-center mb-3">
          <span
            className={`font-${font}-bold text-${oppositeTheme} mt-2 mr-10 text-xl`}
          >
            {title}
          </span>
          {canClose && (
            <button
              className={`m${oneDirection}-3`}
              onClick={() => closeModal()}
            >
              <img
                className="w-5 h-5"
                src={require(`../../Images/close-${oppositeTheme}.png`)}
              />
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
