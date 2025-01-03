import React from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import {
  useModalDataClose,
  useModalDataState,
} from "../../Providers/ModalDataProvider";
import { useDirectionState } from "../../Providers/DirectionProvider";
import { useFontState } from "../../Providers/FontProvider";

export default function CustomModal() {
  const theme = useThemeState();
  const font = useFontState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const { one: oneDirection } = useDirectionState();

  const { title, children, canClose, isOpen, onClose } = useModalDataState();
  const closeModal = useModalDataClose();

  const containerClass = isOpen ? "z-40 opacity-100" : "-z-10 opacity-0";

  return (
    <div
      className={
        "absolute w-browser h-browser bg-modal-glass flex justify-center items-center transition-all duration-300 " +
        containerClass
      }
    >
      <div className={`w-max bg-${theme} rounded-2xl px-4 pb-2`}>
        <div className="flex justify-between items-center pt-4">
          <span
            className={`font-${font}-bold text-${oppositeTheme} mt-2 mr-10 text-xl`}
          >
            {title}
          </span>
          {canClose && (
            <button
              className={`m${oneDirection}-3`}
              onClick={() => {
                onClose && onClose();
                closeModal();
              }}
            >
              <img
                alt=""
                className="w-5 h-5"
                src={require(`../../Images/close-${oppositeTheme}.png`)}
              />
            </button>
          )}
        </div>
        <div className="max-h-[90dvh] overflow-y-auto md:overflow-y-hidden overflow-x-hidden pt-5">
          {children}
        </div>
      </div>
    </div>
  );
}
