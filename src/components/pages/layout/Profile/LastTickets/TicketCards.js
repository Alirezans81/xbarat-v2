import React from "react";
import { Link } from "react-router-dom";

export default function TicketCards({
  lastTickets,
  lastTicketsShowQuantity,
  lang,
  theme,
  oppositeTheme,
}) {
  return (
    <>
      {lastTickets.map((ticket, index) => {
        if (index < lastTicketsShowQuantity) {
          return (
            <div
              key={index}
              className={`col-span-1 row-span-1 flex flex-col justify-between bg-${theme}-back rounded-3xl h-full px-3 pb-3 pt-2.5`}
            >
              <div className="w-full">
                <div className="w-full flex flex-row justify-between items-center">
                  <span
                    className={`mx-1.5 font-mine-bold text-${oppositeTheme} text-lg pt-1.5 -mb-2.5`}
                  >
                    {ticket.title}
                  </span>
                  <Link to="/tickets">
                    <img
                      className="w-6 h-6"
                      src={require(`../../../../../Images/open-modal-${oppositeTheme}.png`)}
                    />
                  </Link>
                </div>
                {ticket.status === "newMessage" && (
                  <span className="text-blue font-mine-regular text-sm mx-1.5">
                    {lang["ticket-new-message"] + "."}
                  </span>
                )}
                {ticket.status === "ended" && (
                  <span className="text-red font-mine-regular text-sm mx-1.5">
                    {lang["ticket-ended"] + "."}
                  </span>
                )}
                {ticket.status === "sendedMessage" && (
                  <span className="text-gray font-mine-regular text-sm mx-1.5">
                    {lang["ticket-sended-message"] + "."}
                  </span>
                )}
              </div>
              <span className="font-mine-regular mx-1.5 text-gray text-sm">
                {ticket && ticket.date ? ticket.date : ""}
              </span>
            </div>
          );
        }
      })}
    </>
  );
}
