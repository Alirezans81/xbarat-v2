import React, { useState, useEffect } from "react";
import BOT from "../../Images/Xbot.png";
const CustomAvatarGuide = ({
  isMobile,
  currentCandidate,
  onTimeout,
  timeout = 10000,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onTimeout?.();
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout, onTimeout]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="absolute top-0 left-0 w-screen h-screen z-40 bg-transparent/40">
      {!isMobile ? (
        <div className="absolute bottom-32 left-0">
          <div className="flex flex-col w-fit h-fit">
            {currentCandidate[1]}
            <img
              className="w-72 h-72 drop-shadow-2xl ml-10"
              alt="avatar"
              src={BOT}
            />
          </div>
        </div>
      ) : (
        <div className="bg-blue text-md text-light w-full h-full">
          {currentCandidate[1]}
        </div>
      )}
    </div>
  );
};

export default CustomAvatarGuide;
