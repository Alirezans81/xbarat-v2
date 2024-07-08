import React, { useEffect, useRef, useState } from "react";
import { CustomTooltip2 } from "./CustomTooltip2";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useFontState } from "../../Providers/FontProvider";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useNotificationsState } from "../../Providers/NotificationProvider";

export function Notif() {
  const theme = useThemeState();
  const font = useFontState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  return (
    <div
      className={`flex flex-col gap-y-2 font-${font}-regular text-${oppositeTheme} bg-${theme} p-3 rounded-xl`}
    >
      <div className="w-full flex justify-between items-start gap-x-10">
        <div className="flex items-center gap-x-2.5">
          <img
            alt=""
            src={require(`../../Images/pages/layout/Navbar/wallet-${oppositeTheme}.png`)}
            className={`w-12 h-12 bg-${theme}-back p-3 rounded-full`}
          />
          <span className={`-mb-1 text-lg`}>Deposit Confirmation</span>
        </div>

        <button className="">
          <img
            alt=""
            className="w-5 h-5"
            src={require(`../../Images/multiplication.png`)}
          />
        </button>
      </div>
      <span className="">
        Your deposit has been confirmed.ahsdhfs esaahydsy ser hsr hrsd ursd
      </span>
    </div>
  );
}

function Content() {
  const lang = useLanguageState();
  const Notifs = useNotificationsState();
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const [notifs, setNotifs] = useState([]);
  useEffect(() => {
    console.log(Notifs);
  }, []);
  return (
    <div className="max-w-[90dvw] md:max-w-[23rem] flex flex-col gap-y-3 px-1.5 py-2 max-h-[80dvh] overflow-y-auto">
      {notifs.length !== 0 ? (
        notifs.map((notif, index) => <Notif key={index} />)
      ) : (
        <div className="px-10 pt-5 pb-4">
          <span
            className={`text-${oppositeTheme} font-${font}-regular text-lg md:text-xl`}
          >
            {lang["no-data"]}
          </span>
        </div>
      )}
      {/* {notifs.length === 0 && (
        <div className="px-10 pt-5 pb-4">
          <span
            className={`text-${oppositeTheme} font-${font}-regular text-lg md:text-xl`}
          >
            {lang["no-data"]}
          </span>
        </div>
      )} */}
    </div>
  );
}

export default function Notification() {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const font = useFontState();

  const [open, setOpen] = useState(false);
  function useOutsideAlerter(ref1) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref1.current && !ref1.current.contains(event.target)) {
          setOpen(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref1]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <CustomTooltip2
      trigger="click"
      content={<Content />}
      style={theme}
      placement="bottom"
      className="rounded-xl z-[200]"
    >
      <button
        ref={wrapperRef}
        id="notification"
        onClick={() => setOpen(true)}
        className={`relative font-${font}-bold`}
      >
        <span className="absolute right-0 bg-red text-light w-5 h-5 rounded-full flex justify-center items-center">
          <span className={`${font === "Fa" ? "-mb-0.5" : "-mb-1.5"} text-sm`}>
            0
          </span>
        </span>
        <img
          className="w-10 h-10"
          alt="Notification"
          src={require(`../../Images/pages/layout/notification-${oppositeTheme}.png`)}
        />
      </button>
    </CustomTooltip2>
  );
}
