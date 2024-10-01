import React from "react";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import { useFontState } from "../../../Providers/FontProvider";

export default function Stepper({ type, step }) {
  const notActiveCircle = "w-3 h-3 rounded-full bg-gray flex flex-col relative";
  const activeCircle = "w-4 h-4 rounded-full bg-blue flex flex-col relative";
  const notActiveLine = "w-[4.65rem] h-0.5 bg-gray";
  const activeLine = "w-[4.65rem] h-0.5 bg-blue";
  const notActiveText = "text-gray";
  const activeText = "text-blue";

  const lang = useLanguageState();
  const font = useFontState();

  if (type === "deposit" || type === "withdrawal") {
    return (
      <div className="w-full flex flex-row items-center justify-center pb-3 pt-14 pr-2">
        <div className={step < 1 ? notActiveCircle : activeCircle}>
          <div
            className={`text-base -left-4 absolute -top-14 text-center-important font-${font}-regular leading-5`}
          >
            <span className={step < 1 ? notActiveText : activeText}>
              {lang["admin-assign"]}
            </span>
          </div>
        </div>
        <div className={step < 2 ? notActiveLine : activeLine} />
        <div className={step < 2 ? notActiveCircle : activeCircle}>
          <div
            className={`text-base -left-7 absolute -top-14 text-center-important font-${font}-regular leading-5`}
          >
            <span className={step < 2 ? notActiveText : activeText}>
              {lang["upload-document"]}
            </span>
          </div>
        </div>
        <div className={step < 3 ? notActiveLine : activeLine} />
        <div className={step < 3 ? notActiveCircle : activeCircle}>
          <div
            className={`text-base -left-6 absolute -top-14 text-center-important font-${font}-regular leading-5`}
          >
            <span className={step < 3 ? notActiveText : activeText}>
              {lang["admin-approve"]}
            </span>
          </div>
        </div>
        <div className={step < 4 ? notActiveLine : activeLine} />
        <div className={step < 4 ? notActiveCircle : activeCircle}>
          <div
            className={`text-base -left-[1.5rem] absolute -top-14 text-center-important font-${font}-regular leading-5`}
          >
            <span className={step < 4 ? notActiveText : activeText}>
              {lang["accept"] + "/\n" + lang["reject"]}
            </span>
          </div>
        </div>
      </div>
    );
  } else if (type === "transfer") {
    return (
      <div className="w-full flex flex-row items-center justify-center pb-3 pt-14 pr-2">
        <div className={step < 1 ? notActiveCircle : activeCircle}>
          <div
            className={`text-base -left-6 absolute -top-14 text-center-important font-${font}-regular leading-5`}
          >
            <span className={step < 1 ? notActiveText : activeText}>
              {lang["admin-approve"]}
            </span>
          </div>
        </div>
        <div className={step < 2 ? notActiveLine : activeLine} />
        <div className={step < 2 ? notActiveCircle : activeCircle}>
          <div
            className={`text-base -left-5 absolute -top-14 text-center-important font-${font}-regular leading-5`}
          >
            <span className={step < 2 ? notActiveText : activeText}>
              {lang["accept"] + "/\n" + lang["reject"]}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
