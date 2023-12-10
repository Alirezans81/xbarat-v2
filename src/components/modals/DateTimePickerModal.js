import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { useLanguageState } from "../../Providers/LanguageProvider";
import SubmitButton from "../common/SubmitButton";
import { useModalDataClose } from "../../Providers/ModalDataProvider";
import { useFontState } from "../../Providers/FontProvider";

export default function DateTimePickerModal({
  selectionRange,
  setSelectionRange,
}) {
  const lang = useLanguageState();
  const font = useFontState();

  const closeModal = useModalDataClose();

  const [innerSelectionRange, setInnerSelectionRange] = useState(
    selectionRange
      ? selectionRange
      : {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        }
  );

  const handleSelect = (ranges) => {
    setInnerSelectionRange(ranges.selection);
  };

  const submit = () => {
    setSelectionRange(innerSelectionRange);
  };

  return (
    <div className="flex flex-col pb-2">
      <DateRange
        classNames={{
          dateDisplayWrapper: `hidden`,
          dateRangeWrapper: `rounded-xl p-2 border border-gray`,
        }}
        color="dark"
        ranges={[innerSelectionRange]}
        onChange={handleSelect}
      />
      <SubmitButton
        onClick={() => {
          submit();
          closeModal();
        }}
        className={`py-1 font-${font}-bold mt-3`}
        rounded="lg"
      >
        {lang["submit"]}
      </SubmitButton>
    </div>
  );
}
