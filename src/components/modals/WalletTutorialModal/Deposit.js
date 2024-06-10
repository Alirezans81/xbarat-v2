import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useStatusesState } from "../../../Providers/StatusesProvider";

const Deposit = ({ setTutorial }) => {
  const [depositStatus, setDepositStatus] = useState("");

  const theme = useThemeState();
  const status = useStatusesState();
  const [statusState, setStatusState] = useState("");
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const numStatuses = status ? status.length : 9;
  useEffect(() => {
    const filtered = status
      ? status.filter((data) => data.title === depositStatus)
      : "";
    setStatusState(filtered.length ? filtered : "");
    setTutorial({
      title: "Deposit",
      status: filtered.length ? filtered[0].title : "",
    });
  }, [depositStatus]);
  console.log();
  return (
    <div className={`w-full max-w-[1280px] overflow-scroll  h-full `}>
      <div
        id="one"
        className={
          depositStatus === ""
            ? `grid grid-cols-${
                document.getElementById("one").offsetWidth <= 100
                  ? 1
                  : numStatuses / 2 - (numStatuses % 2) / 2
              }  gap-x-5   gap-y-2`
            : "hidden"
        }
      >
        {status ? (
          status.map((data) => (
            <button
              onClick={() => setDepositStatus(data.title)}
              className={`col-span-1 row-span-1 grid grid-cols-1 grid-rows-6 gap-y-2`}
            >
              <div className="bg-blue flex justify-center items-center rounded-2xl p-2 col-span-1 row-span-1 text-light h-full">
                {data.title}
              </div>
              <div
                className={`bg-${oppositeTheme} text-start text-${theme} rounded-2xl p-5 justify-center items-start col-span-1 row-span-4 h-full`}
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
          depositStatus.length !== 0
            ? `w-full h-full text-${oppositeTheme}`
            : "hidden"
        }
      >
        {statusState.length !== 0 ? statusState[0].url : "Fuck You"}
      </div>
    </div>
  );
};

export default Deposit;
