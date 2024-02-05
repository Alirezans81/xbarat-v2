import React from "react";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import { useFontState } from "../../../Providers/FontProvider";

export default function Stepper({ step }) {
  const notActiveCircle = "w-3 h-3 rounded-full bg-gray flex flex-col relative";
  const activeCircle = "w-4 h-4 rounded-full bg-blue flex flex-col relative";
  const notActiveLine = "w-40 h-0.5 bg-gray";
  const activeLine = "w-40 h-0.5 bg-blue";
  const notActiveText = "text-gray";
  const activeText = "text-blue";

  const lang = useLanguageState();
  const font = useFontState();

  return (
    <div className="w-full flex flex-row items-center pl-4 pr-7 md:pl-12 md:pr-14 pt-12">
      <div className={step < 1 ? notActiveCircle : activeCircle}>
        <div
          className={`text-base -left-8 absolute -top-14 text-center-important font-${font}-regular`}
        >
          <span className={step < 1 ? notActiveText : activeText}>
            {lang["personal-information"]}
          </span>
        </div>
      </div>
      <div className={step < 2 ? notActiveLine : activeLine} />
      <div className={step < 2 ? notActiveCircle : activeCircle}>
        <div
          className={`text-base -left-8 absolute -top-14 text-center-important font-${font}-regular`}
        >
          <span className={step < 2 ? notActiveText : activeText}>
            {lang["national-information"]}
          </span>
        </div>
      </div>
      <div className={step < 3 ? notActiveLine : activeLine} />
      <div className={step < 3 ? notActiveCircle : activeCircle}>
        <div
          className={`text-base -left-8 absolute -top-14 text-center-important font-${font}-regular`}
        >
          <span className={step < 3 ? notActiveText : activeText}>
            {lang["upload-document"]}
          </span>
        </div>
      </div>
      <div className={step < 4 ? notActiveLine : activeLine} />
      <div className={step < 4 ? notActiveCircle : activeCircle}>
        <div
          className={`text-base -left-8 absolute -top-14 text-center-important font-${font}-regular`}
        >
          <span className={step < 4 ? notActiveText : activeText}>
            {lang["bank-information"]}
          </span>
        </div>
      </div>
    </div>
  );
}
