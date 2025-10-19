import React, { useState, useEffect } from "react";
import Clippy from "../../Images/clippy.png";
const CustomAvatarGuide = ({ isMobile, component, timeout = 10000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout]);

  if (!isVisible) {
    return null;
  }
  console.log("kijashgfjsg");
  return (
    <div className="absolute top-0 left-0 w-screen h-screen z-40 bg-transparent/30">
      {!isMobile ? (
        <div className="absolute bottom-0 left-0">
          <div className="flex flex-col w-fit h-fit">
            {component}
            <img alt="clippy" src={Clippy} />
          </div>
        </div>
      ) : (
        <div className="bg-blue text-md text-light w-full h-full">
          {component}
        </div>
      )}
    </div>
  );
};

export default CustomAvatarGuide;
