/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { CustomTooltip2 } from "./CustomTooltip2";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useFontState } from "../../Providers/FontProvider";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useDeleteNotification } from "../../apis/pages/Layout/hooks";
import { useGetNotifs } from "../../apis/pages/Layout/hooks";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";
import { useStatusesState } from "../../Providers/StatusesProvider";
import { useConvertNotif } from "../../hooks/useConvertNotif";
import { useUserState } from "../../Providers/UserProvider";

export function Notif({ notif, getNotifications }) {
  const theme = useThemeState();
  const font = useFontState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const convertNotif = useConvertNotif();
  const statuses = useStatusesState();
  const { deleteNotification, isLoading: deleteNotificationIsLoading } =
    useDeleteNotification();
  useEffect(
    () => setIsLoadingSplashScreen(deleteNotificationIsLoading),
    [deleteNotificationIsLoading]
  );

  const getStatusImage = (status_link) => {
    if (statuses && !status_link.length) {
      const result = statuses.find((e) => e.url === status_link);
      return result.image_url;
    }
  };

  return (
    <div
      className={`flex flex-col gap-y-3 font-${font}-regular text-${oppositeTheme} bg-${theme} p-3 rounded-xl`}
    >
      <div className="w-full flex justify-between items-start gap-x-2">
        <div className="flex items-center gap-x-2.5">
          <img
            alt=""
            src={getStatusImage(notif.status)}
            className={`w-12 h-12 bg-${theme}-back p-3 rounded-full float-left inline`}
          />
          <span
            dir={font === "Fa" || font === "Ar" ? "rtl" : "ltr"}
            className={`-mb-1 text-lg max-w-[60dvw] md:w-72 leading-5`}
          >
            {convertNotif(notif.subject)}
          </span>
        </div>

        <button
          onClick={() => {
            deleteNotification(notif.url, () => {
              getNotifications();
            });
          }}
          className="w-5"
        >
          <img
            alt=""
            className="w-5 h-5"
            src={require(`../../Images/multiplication.png`)}
          />
        </button>
      </div>
      <span
        dir={font === "Fa" || font === "Ar" ? "rtl" : "ltr"}
        className={`max-w-[80dvw] md:w-96 border-t pt-2.5 border-gray-700 ${
          font === "Fa" || font === "Ar" ? "pb-2" : ""
        }`}
      >
        {convertNotif(notif.message)}
      </span>
    </div>
  );
}

function Content({ notifs, getNotifications }) {
  const lang = useLanguageState();
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  return (
    <div className="max-w-[90dvw] flex flex-col gap-y-3 px-1.5 py-2 max-h-[80dvh] overflow-y-auto">
      {notifs &&
        notifs.map((notif, index) => (
          <Notif
            key={index}
            notif={notif}
            getNotifications={getNotifications}
          />
        ))}
      {(!notifs || notifs.length === 0) && (
        <div className="px-10 pt-5 pb-4">
          <span
            className={`text-${oppositeTheme} font-${font}-regular text-lg md:text-xl`}
          >
            {lang["no-data"]}
          </span>
        </div>
      )}
    </div>
  );
}

export default function Notification() {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const font = useFontState();
  const userInfo = useUserState();

  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();

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

  const [notifs, setNotifs] = useState([]);
  const { getNotifs, isLoading: getNotifsIsLoading } = useGetNotifs();
  useEffect(
    () => setIsLoadingSplashScreen(getNotifsIsLoading),
    [getNotifsIsLoading]
  );
  function getNotifications() {
    userInfo &&
      userInfo.username &&
      getNotifs(userInfo.username, setNotifs, null, null);
  }
  useEffect(() => {
    userInfo && userInfo.username && getNotifications(userInfo.username);
  }, [userInfo]);

  useEffect(() => {
    if (notifs && notifs.length !== 0 && wrapperRef && wrapperRef.current) {
      wrapperRef.current.click();
    }
  }, [notifs, wrapperRef]);

  return (
    <CustomTooltip2
      trigger="click"
      content={<Content notifs={notifs} getNotifications={getNotifications} />}
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
          <span
            className={`${
              font === "Fa" || font === "Ar" ? "-mb-0.5" : "-mb-1.5"
            } text-sm`}
          >
            {notifs ? notifs.length : 0}
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
