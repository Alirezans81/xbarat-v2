import React from "react";
import { useNavigate } from "react-router-dom";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";
import { useDirectionState } from "../../../../../Providers/DirectionProvider";

export default function TopSection({ route }) {
  const navigate = useNavigate();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const { endComplete: direction } = useDirectionState();
  const lang = useLanguageState();
  const convertedRoute = `${route}-history`;

  return (
    <div
      className={`w-full flex flex-row justify-between text-${oppositeTheme} text-2xl`}
    >
      <div className="flex flex-row">
        {route === "exchange" && (
          <span className="text-yellow">{lang["exchange"]}</span>
        )}
        {route === "deposit" && (
          <span className="text-green">{lang["deposit"]}</span>
        )}
        {route === "withdrawal" && (
          <span className="text-red">{lang["withdrawal"]}</span>
        )}
        {route === "transfer" && (
          <span className="text-blue">{lang["transfer"]}</span>
        )}
        <span className="mx-2">{lang["history"]}</span>
      </div>
      <button onClick={() => navigate("/" + convertedRoute)}>
        <img
          className="w-7 h-7"
          src={require(`../../../../../Images/arrow-${direction}-${oppositeTheme}.png`)}
        />
      </button>
    </div>
  );
}
