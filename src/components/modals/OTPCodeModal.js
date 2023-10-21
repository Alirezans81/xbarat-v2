import React, { useEffect } from "react";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useThemeState } from "../../Providers/ThemeProvider";
import { Formik } from "formik";
import SubmitButton from "../common/SubmitButton";
import { useTimer } from "react-timer-hook";

export default function OTPCodeModal() {
  const lang = useLanguageState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  const timerDuration = 10;
  const date = new Date();
  date.setSeconds(date.getSeconds() + timerDuration);
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp: date, onExpire: () => {} });
  useEffect(() => {
    start();
  }, []);

  const resendButtonClass = isRunning
    ? `bg-${theme}-back pt-1 px-3 rounded-full font-mine-regular text-gray text-sm`
    : `bg-${theme}-back pt-1 px-3 rounded-full font-mine-regular text-blue text-sm`;
  const timerSpanClass = isRunning
    ? `bg-${theme}-back w-16 text-center font-mine-regular pt-1 px-3 rounded-full text-${oppositeTheme}`
    : `bg-${theme}-back w-16 text-center font-mine-regular pt-1 px-3 rounded-full text-gray`;

  return (
    <div className="w-80">
      <div className="flex flex-col mt-2">
        <span className={`text-${oppositeTheme} font-mine-thin`}>
          {lang["sended-otp-code-message-1st"] + "."}
        </span>
        <span className={`text-${oppositeTheme} font-mine-thin`}>
          {lang["sended-otp-code-message-2nd"] + "."}
        </span>
      </div>
      <Formik initialValues={{ code: "" }}>
        {({ handleBlur, handleChange, values, handleSubmit, handleReset }) => (
          <>
            <input
              className={`my-2 bg-${theme} focus-outline-blue px-2.5 font-mint-regular outline-1 outline-white py-1.5 w-full rounded-lg text-${oppositeTheme}`}
              type="text"
              onChange={handleChange("code")}
              onBlur={handleBlur("code")}
              value={values.code}
              placeholder={lang["otp-code"]}
            />
            <div className="flex flex-row mb-3 gap-x-2">
              <span className={timerSpanClass}>
                {(minutes < 10 ? "0" + minutes : minutes) +
                  ":" +
                  (seconds < 10 ? "0" + seconds : seconds)}
              </span>
              <button
                onClick={() => {
                  date.setSeconds(new Date().getSeconds() + timerDuration);
                  restart(date);
                }}
                className={resendButtonClass}
                disabled={isRunning}
              >
                {lang["resend"]}
              </button>
            </div>
            <SubmitButton
              className="w-full mb-2 mt-3 font-mine-bold text-lg"
              onClick={handleBlur}
              rounded="lg"
            >
              {lang["submit"]}
            </SubmitButton>
          </>
        )}
      </Formik>
    </div>
  );
}
