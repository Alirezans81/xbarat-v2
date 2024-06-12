import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useStatusesState } from "../../../Providers/StatusesProvider";

const Transfer = ({ tutorial, setTutorial }) => {
  const [transferStatus, setTransferStatus] = useState("");
  useEffect(() => {
    !tutorial.status && setTransferStatus("");
  }, [tutorial]);
  const theme = useThemeState();
  const status = useStatusesState();
  const [statusState, setStatusState] = useState("");
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  var w = window.innerWidth;
  useEffect(() => {
    const filtered = status
      ? status.filter((data) => data.title === transferStatus)
      : "";
    transferStatus && setStatusState(filtered.length ? filtered : "");
    transferStatus &&
      setTutorial({
        title: "Transfer",
        status: filtered.length ? filtered[0].title : "",
      });
  }, [transferStatus]);
  return (
    <div className={`w-full max-w-[1280px] overflow-scroll  h-full `}>
      <div
        className={
          transferStatus === ""
            ? `grid grid-cols-${w <= 500 ? 2 : 4}
              }  gap-x-5   gap-y-2`
            : "hidden"
        }
      >
        {status ? (
          status.map((data) => (
            <button
              onClick={() => setTransferStatus(data.title)}
              className={`bg-${theme}-back rounded-2xl p-5 col-span-1 row-span-1 grid grid-cols-1 grid-rows-6 gap-y-2 animate-upward`}
            >
              <div className="bg-blue flex justify-center items-center rounded-2xl p-2 col-span-1 row-span-1 text-light h-full">
                {data.title}
              </div>
              <div
                className={`bg-${theme} text-start text-${oppositeTheme} h-full rounded-2xl p-5 justify-center items-start col-span-1 row-span-5`}
              >
                This Status Is Fuck You
              </div>
            </button>
          ))
        ) : (
          <div></div>
        )}
      </div>
      <div
        className={
          transferStatus.length !== 0
            ? `w-full h-full text-${oppositeTheme} animate-upward`
            : "hidden"
        }
      >
        {statusState.length !== 0 ? statusState[0].url : "Fuck You"}
      </div>
    </div>
  );
};

export default Transfer;
