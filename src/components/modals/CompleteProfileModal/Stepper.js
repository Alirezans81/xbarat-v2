import React from "react";
import { useLanguageState } from "../../../Providers/LanguageProvider";

export default function Stepper({ step }) {
  const notActiveCircle = "w-3 h-3 rounded-full bg-gray flex flex-col";
  const activeCircle = "w-4 h-4 rounded-full bg-blue flex flex-col";
  const notActiveLine = "w-40 h-0.5 bg-gray";
  const activeLine = "w-40 h-0.5 bg-blue";
  const notActiveText = "font-mine-regular text-center";
  const activeText = "font-mine-regular text-center";

  const lang = useLanguageState();

  if (step === 4) {
  } else {
    return (
      <div className="flex flex-row items-center">
        <div className={step < 1 ? notActiveCircle : activeCircle}>
          <div className="">
            <span className={step < 1 ? notActiveText : activeText}>
              grsbjgrs
            </span>
          </div>
        </div>
        <div className={step < 2 ? notActiveLine : activeLine} />
        <div className={step < 2 ? notActiveCircle : activeCircle}></div>
        <div className={step < 3 ? notActiveLine : activeLine} />
        <div className={step < 3 ? notActiveCircle : activeCircle}></div>
        <div className={step < 4 ? notActiveLine : activeLine} />
        <div className={step < 4 ? notActiveCircle : activeCircle}></div>
      </div>
    );
  }
}
