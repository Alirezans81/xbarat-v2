import React, { createContext, useContext, useState } from "react";

const DirectionContext = createContext();
const DirectionContextSetState = createContext();

const DirectionProvider = ({ children }) => {
  const [direction, setDirection] = useState({
    three: "ltr",
    one: "l",
    startComplete: "left",
    endComplete: "right",
  });

  return (
    <DirectionContext.Provider value={direction}>
      <DirectionContextSetState.Provider value={setDirection}>
        {children}
      </DirectionContextSetState.Provider>
    </DirectionContext.Provider>
  );
};

const useDirectionState = () => {
  return useContext(DirectionContext);
};

const useDirectionSetState = () => {
  return useContext(DirectionContextSetState);
};

export { DirectionProvider, useDirectionState, useDirectionSetState };
