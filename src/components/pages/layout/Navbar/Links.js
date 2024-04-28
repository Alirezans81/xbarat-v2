import React, { useEffect, useState } from "react";
import NavbarLink from "./Links/NavbarLink";
import { useLocation } from "react-router-dom";
import { useDirectionState } from "../../../../Providers/DirectionProvider";

export default function Links({ links }) {
  const [activeRouteShapeTopPosition, setActiveRouteShapeTopPosition] =
    useState("4px");
  const [activeRouteShapeIsVisible, setActiveRouteShapeIsVisible] =
    useState(false);

  const { pathname: currentRoute } = useLocation();
  const checkRouteShapeVisibility = () => {
    let found = false;
    links.map((link, index) => {
      if (link) {
        if (currentRoute === link.route) {
          setActiveRouteShapeIsVisible(true);
          found = true;
        }
      }
    });

    if (!found) {
      setActiveRouteShapeIsVisible(false);
      setActiveRouteShapeTopPosition(0);
    }
  };

  useEffect(() => checkRouteShapeVisibility());

  const { three: direction } = useDirectionState();
  const shapeDirectionClasses =
    direction === "rtl" ? "left-0 rotate-180" : "right-0";

  return (
    <div className="flex flex-col items-center relative w-full">
      <img
        style={{
          top: activeRouteShapeTopPosition,
          opacity: activeRouteShapeIsVisible ? "100%" : "0%",
        }}
        className={`active-route-shape absolute ${shapeDirectionClasses} transition-all duration-200`}
        src={require("../../../../Images/pages/layout/active-route-shape.png")}
      />
      {links.map((link, index) => (
        <div key={index}>
          <NavbarLink
            title={link.title}
            imgs={link.imgs}
            route={link ? link.route : ""}
            setActiveRouteShapeTopPosition={setActiveRouteShapeTopPosition}
            setActiveRouteShapeIsVisible={setActiveRouteShapeIsVisible}
          />
        </div>
      ))}
    </div>
  );
}
