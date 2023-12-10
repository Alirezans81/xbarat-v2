import React from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useModalDataSetState } from "../../Providers/ModalDataProvider";
import { useDirectionState } from "../../Providers/DirectionProvider";
import DateTimePickerModal from "../modals/DateTimePickerModal";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useFontState } from "../../Providers/FontProvider";

export default function CustomDateTimeInput({
  selectionRange,
  setSelectionRange,
  className,
  placeHolder,
  type,
}) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const { one: direction } = useDirectionState();
  const lang = useLanguageState();
  const font = useFontState();
  const setModalData = useModalDataSetState();

  const openDateTimePickerModal = () => {
    setModalData({
      title: lang["pick"],
      children: (
        <DateTimePickerModal
          selectionRange={selectionRange}
          setSelectionRange={setSelectionRange}
        />
      ),
      canClose: true,
      isOpen: true,
    });
  };

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  return (
    <div
      className={
        `border border-gray px-3 pt-1 pb-0 rounded-lg flex flex-row justify-between font-${font}-regular items-center ` +
        className
      }
    >
      <button
        onClick={openDateTimePickerModal}
        className="flex-1 flex justify-start"
      >
        {selectionRange ? (
          <span className={`text-${oppositeTheme}`}>
            {formatDate(selectionRange[`${type}Date`])}
          </span>
        ) : (
          <span className="text-gray">{placeHolder}</span>
        )}
      </button>
      <div>
        <button onClick={() => setSelectionRange(null)}>
          <img
            className={`w-5 h-5 m${direction}-2`}
            src={require("../../Images/common/delete.png")}
          />
        </button>
        <button onClick={openDateTimePickerModal}>
          <img
            className={`w-6 h-6 m${direction}-2`}
            src={require("../../Images/common/calender.png")}
          />
        </button>
      </div>
    </div>
  );
}
