import React, { useState } from "react";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useDirectionState } from "../../../../Providers/DirectionProvider";
import TopSection from "./LastTickets/TopSection";
import TicketCards from "./LastTickets/TicketCards";

export default function LastTickets() {
  const lang = useLanguageState();
  const theme = useThemeState();
  const { endComplete: direction } = useDirectionState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  const [lastTickets, setLastTickets] = useState([]);
  const lastTicketsShowQuantity = 3;

  return (
    <div className="flex flex-col px-6 pt-3 pb-5 w-full h-full">
      <TopSection
        direction={direction}
        oppositeTheme={oppositeTheme}
        lang={lang}
      />
      <div className={`flex-1 mt-2`}>
        <TicketCards
          lastTickets={lastTickets}
          lastTicketsShowQuantity={lastTicketsShowQuantity}
          lang={lang}
          theme={theme}
          oppositeTheme={oppositeTheme}
        />
      </div>
    </div>
  );
}
