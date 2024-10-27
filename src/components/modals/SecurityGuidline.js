import { React, useState, useRef, useEffect } from "react";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useModalDataClose } from "../../Providers/ModalDataProvider";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useFontState } from "../../Providers/FontProvider";
const SecurityGuidline = () => {
  const [haveRead, setHaveRead] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [bottomPage, setBottomPage] = useState(false);
  const containerRef = useRef(null);
  const font = useFontState();
  const closeModal = useModalDataClose();

  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const context = lang["security-guidline"];
  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight;
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
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const hasOverflowed =
        container.scrollHeight > container.clientHeight ||
        container.scrollWidth > container.clientWidth;

      if (!hasOverflowed) {
        setBottomPage(true);
      }
    }
  }, []);
  const handleSaveClose = () => {
    localStorage.setItem("read_guidline", true);
    closeModal();
  };
  return (
    <div className="w-fit max-w-3xl h-fit max-h-[65dvh] flex flex-col">
      <div
        dir={font !== "Fa" ? "ltr" : "rtl"}
        className={`bg-${theme}-back p-2 rounded-2xl overflow-scroll`}
        ref={containerRef}
        onScroll={handleScroll}
      >
        {context.map((tip, index) => (
          <div key={index} id={index} className={`m-2 text-${oppositeTheme}`}>
            {index === 2 ||
            index === 3 ||
            index === 4 ||
            index === 5 ||
            index === 10 ||
            index === 11 ||
            index === 12 ||
            index === 13 ? (
              <pre className="text-sm text-blue">{Object.values(tip)[0]}</pre>
            ) : (
              <p className="text-lg">{Object.values(tip)[0]}</p>
            )}
          </div>
        ))}
      </div>
      <div
        dir={font !== "Fa" ? "ltr" : "rtl"}
        className="w-full h-fit flex flex-row py-5 px-1"
      >
        <button
          onClick={() => setHaveRead(!haveRead)}
          className={`w-4 h-4 rounded-sm p-2 ${
            haveRead
              ? "bg-blue text-transparent border-2 border-solid border-blue"
              : "border-2 border-solid border-gray text-transparent"
          }`}
        >
          .
        </button>
        <span className={`text-${oppositeTheme} text-sm px-1`}>
          {lang["securityGuidlineAgreement"]}
        </span>
      </div>
      <div className="w-full h-fit">
        <button
          onClick={enableSubmit ? () => handleSaveClose() : ""}
          className={`w-full h-full p-1 rounded-2xl text-light ${
            enableSubmit ? "bg-blue" : "bg-gray"
          }`}
        >
          {lang["submit"]}
        </button>
      </div>
    </div>
  );
};

export default SecurityGuidline;
