import { React, useState, useEffect, useRef } from "react";
import SubmitButton from "../../common/SubmitButton";
import { useThemeState } from "../../../Providers/ThemeProvider";
const PendingRequestTipsUploadDocument = ({ setTips }) => {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const context = lang.TipsPending ? lang.TipsPending : "";
  const [haveRead, setHaveRead] = useState(false);
  const [bottomPage, setBottomPage] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setBottomPage(true);
    }
  };
  useEffect(() => {
    if (haveRead && bottomPage) {
      setEnableSubmit(true);
    }
    if (!haveRead || !bottomPage) {
      setEnableSubmit(false);
    }
  }, [haveRead, bottomPage]);
  return (
    <div className="w-screen h-screen absolute top-0 left-0 z-30 bg-transparent">
      <div className="w-full h-full flex justify-center items-center flex-col">
        <div
          className={`w-full h-full flex flex-col bg-${theme} max-w-lg max-h-96 overflow-y-scroll rounded-2xl p-5 gap-y-2`}
        >
          <span
            className={`text-${oppositeTheme} w-full flex flex-row font-bold`}
          >
            Tips
          </span>

          <div
            onScroll={handleScroll}
            className={`bg-${theme}-back w-fit h-full  text-${oppositeTheme} overflow-scroll rounded-2xl p-5`}
          >
            {context.map((tip, index) => (
              <div
                key={index}
                id={index}
                className={`m-2 text-${oppositeTheme}`}
              >
                <p>{Object.values(tip)[0]}</p>
              </div>
            ))}
          </div>
          <div className="w-full h-fit flex flex-row items-center gap-x-3 p-2">
            <button
              onClick={() => setHaveRead(!haveRead)}
              className={`w-4 h-4 rounded-sm ${
                haveRead
                  ? "bg-blue text-transparent border-2 border-solid border-blue"
                  : "border-2 border-solid border-gray text-transparent"
              }`}
            >
              .
            </button>
            <span className={`text-${oppositeTheme} text-sm`}>
              I Have Read The Terms Above Hence XBarat Will Not Be Resposible
              For Further Mistakes.
            </span>
          </div>
          <div className="w-full h-fit">
            <button
              onClick={() => setTips(true)}
              className={`w-full h-full p-1 rounded-2xl text-light ${
                enableSubmit ? "bg-blue" : "bg-gray"
              }`}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingRequestTipsUploadDocument;
