import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useIsPagesModalOpenState } from "../../../Providers/IsPagesModalOpenProvider";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import Element from "./NavbarSetting/Element";
import { useDirectionState } from "../../../Providers/DirectionProvider";

export default function NavbarSetting({ setLinks }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "light" ? "dark" : "light";
  const isOpen = useIsPagesModalOpenState();
  const containerClass = isOpen ? "opcity-100 z-40" : "opacity-0 -z-10";
  const imgClass = isOpen ? " opacity-100 z-40" : "opacity-0 -z-10";
  const lang = useLanguageState();
  const { startComplete: direction } = useDirectionState();
  const containerPositionClass = direction === "right" ? "right-2" : "left-24";
  const arrowPositionClass = direction === "right" ? "right-7" : "left-32";

  const [allLinks, setAllLinks] = useState([
    {
      title: lang["home"],
      route: "/home",
      imgs: {
        dark: require("../../../Images/pages/layout/Navbar/home-dark.png"),
        light: require("../../../Images/pages/layout/Navbar/home-light.png"),
        gray: require("../../../Images/pages/layout/Navbar/home-gray.png"),
      },
      shown: true,
    },
    {
      title: lang["wallet"],
      route: "/wallet",
      imgs: {
        dark: require("../../../Images/pages/layout/Navbar/wallet-dark.png"),
        light: require("../../../Images/pages/layout/Navbar/wallet-light.png"),
        gray: require("../../../Images/pages/layout/Navbar/wallet-gray.png"),
      },
      shown: true,
    },
    {
      title: lang["reports"],
      route: "/reports",
      imgs: {
        dark: require("../../../Images/pages/layout/Navbar/reports-dark.png"),
        light: require("../../../Images/pages/layout/Navbar/reports-light.png"),
        gray: require("../../../Images/pages/layout/Navbar/reports-gray.png"),
      },
      shown: true,
    },
    {
      title: lang["tickets"],
      route: "/tickets",
      imgs: {
        dark: require("../../../Images/pages/layout/Navbar/tickets-dark.png"),
        light: require("../../../Images/pages/layout/Navbar/tickets-light.png"),
        gray: require("../../../Images/pages/layout/Navbar/tickets-gray.png"),
      },
      shown: false,
    },
    {
      title: lang["assignment"],
      route: "/submitting/assignment",
      imgs: {
        dark: require("../../../Images/pages/layout/Navbar/submitting/assignment-dark.png"),
        light: require("../../../Images/pages/layout/Navbar/submitting/assignment-light.png"),
        gray: require("../../../Images/pages/layout/Navbar/submitting/assignment-gray.png"),
      },
      shown: false,
    },
    {
      title: lang["exchanges"],
      route: "/submitting/exchanges",
      imgs: {
        dark: require("../../../Images/pages/layout/Navbar/submitting/exchanges-dark.png"),
        light: require("../../../Images/pages/layout/Navbar/submitting/exchanges-light.png"),
        gray: require("../../../Images/pages/layout/Navbar/submitting/exchanges-gray.png"),
      },
      shown: false,
    },
    {
      title: lang["transfers"],
      route: "/submitting/transfers",
      imgs: {
        dark: require("../../../Images/pages/layout/Navbar/submitting/transfers-dark.png"),
        light: require("../../../Images/pages/layout/Navbar/submitting/transfers-light.png"),
        gray: require("../../../Images/pages/layout/Navbar/submitting/transfers-gray.png"),
      },
      shown: false,
    },
    {
      title: lang["accounting"],
      route: "/submitting/accounting",
      imgs: {
        dark: require("../../../Images/pages/layout/Navbar/submitting/accounting-dark.png"),
        light: require("../../../Images/pages/layout/Navbar/submitting/accounting-light.png"),
        gray: require("../../../Images/pages/layout/Navbar/submitting/accounting-gray.png"),
      },
      shown: false,
    },
    {
      title: lang["users"],
      route: "/user-management/users",
      imgs: {
        dark: require("../../../Images/pages/layout/Navbar/user-management/users-dark.png"),
        light: require("../../../Images/pages/layout/Navbar/user-management/users-light.png"),
        gray: require("../../../Images/pages/layout/Navbar/user-management/users-gray.png"),
      },
      shown: false,
    },
    {
      title: lang["admins"],
      route: "/user-management/admins",
      imgs: {
        dark: require("../../../Images/pages/layout/Navbar/user-management/admins-dark.png"),
        light: require("../../../Images/pages/layout/Navbar/user-management/admins-light.png"),
        gray: require("../../../Images/pages/layout/Navbar/user-management/admins-gray.png"),
      },
      shown: false,
    },
    {
      title: lang["branches"],
      route: "/user-management/branches",
      imgs: {
        dark: require("../../../Images/pages/layout/Navbar/user-management/branches-dark.png"),
        light: require("../../../Images/pages/layout/Navbar/user-management/branches-light.png"),
        gray: require("../../../Images/pages/layout/Navbar/user-management/branches-gray.png"),
      },
      shown: false,
    },
    {
      title: lang["singular"],
      route: "/currency/singular",
      imgs: {
        dark: require("../../../Images/pages/layout/Navbar/currency/singular-dark.png"),
        light: require("../../../Images/pages/layout/Navbar/currency/singular-light.png"),
        gray: require("../../../Images/pages/layout/Navbar/currency/singular-gray.png"),
      },
      shown: false,
    },
    {
      title: lang["pair"],
      route: "/currency/pair",
      imgs: {
        dark: require("../../../Images/pages/layout/Navbar/currency/pair-dark.png"),
        light: require("../../../Images/pages/layout/Navbar/currency/pair-light.png"),
        gray: require("../../../Images/pages/layout/Navbar/currency/pair-gray.png"),
      },
      shown: false,
    },
    {
      title: lang["robots"],
      route: "/more/robots",
      imgs: {
        dark: require("../../../Images/pages/layout/Navbar/more/robots-dark.png"),
        light: require("../../../Images/pages/layout/Navbar/more/robots-light.png"),
        gray: require("../../../Images/pages/layout/Navbar/more/robots-gray.png"),
      },
      shown: false,
    },
  ]);

  const maxShownLinksQuantity = 5;
  const checkShownLinksQuantity = () => {
    let quantity = 0;
    allLinks.map((link) => link.shown === true && quantity++);

    if (quantity < maxShownLinksQuantity) return true;
    return false;
  };

  const toggleInNavbar = (index) => {
    const editedLink = allLinks.map((link, i) => {
      if (i === index) {
        if (checkShownLinksQuantity() || link.shown === true) {
          link.shown = !link.shown;
        }
      }
      return link;
    });

    setAllLinks(editedLink);
    window.localStorage.setItem("linksShown", JSON.stringify(editedLink));
  };

  useEffect(() => {
    setLinks(allLinks.filter((link) => link.shown === true));
  }, [allLinks]);

  useEffect(() => {
    const savedLinksShown = JSON.parse(
      window.localStorage.getItem("linksShown")
    );

    savedLinksShown && setAllLinks(savedLinksShown);
  }, []);

  return (
    <div
      className={
        `absolute transition-all duration-300 overflow-hidden top-12 ${containerClass} pt-5 ` +
        containerPositionClass
      }
    >
      <img
        className={
          `absolute -top-0 transition-all w-14 duration-300 navbar-setting-height ${imgClass} ` +
          arrowPositionClass
        }
        src={require(`../../../Images/pages/layout/div-arrow-${theme}.png`)}
      />
      <div
        className={`w-full h-full grid grid-cols-4 gap-4 bg-${theme} rounded-3xl border-2 border-gray z-30 px-5 py-5`}
      >
        <div className="flex flex-col col-span-1">
          <span className={`text-xl font-mine-bold text-${oppositeTheme}`}>
            {lang["main-routes-title"]}
          </span>
          <Element data={allLinks[0]} toggle={() => toggleInNavbar(0)} />
          <Element data={allLinks[1]} toggle={() => toggleInNavbar(1)} />
          <Element data={allLinks[2]} toggle={() => toggleInNavbar(2)} />
          <Element data={allLinks[3]} toggle={() => toggleInNavbar(3)} />
        </div>
        <div className="flex flex-col col-span-1">
          <span className={`text-xl font-mine-bold text-${oppositeTheme}`}>
            {lang["submitting-routes-title"]}
          </span>
          <Element data={allLinks[4]} toggle={() => toggleInNavbar(4)} />
          <Element data={allLinks[5]} toggle={() => toggleInNavbar(5)} />
          <Element data={allLinks[6]} toggle={() => toggleInNavbar(6)} />
          <Element data={allLinks[7]} toggle={() => toggleInNavbar(7)} />
        </div>
        <div className="flex flex-col col-span-1">
          <span className={`text-xl font-mine-bold text-${oppositeTheme}`}>
            {lang["user-management-routes-title"]}
          </span>
          <Element data={allLinks[8]} toggle={() => toggleInNavbar(8)} />
          <Element data={allLinks[9]} toggle={() => toggleInNavbar(9)} />
          <Element data={allLinks[10]} toggle={() => toggleInNavbar(10)} />
        </div>
        <div className="flex flex-col col-span-1">
          <span className={`text-xl font-mine-bold text-${oppositeTheme}`}>
            {lang["currency-routes-title"]}
          </span>
          <Element data={allLinks[11]} toggle={() => toggleInNavbar(11)} />
          <Element data={allLinks[12]} toggle={() => toggleInNavbar(12)} />
        </div>
        <div className="flex flex-col col-span-1">
          <span className={`text-xl font-mine-bold text-${oppositeTheme}`}>
            {lang["more-routes-title"]}
          </span>
          <Element data={allLinks[13]} toggle={() => toggleInNavbar(13)} />
        </div>
      </div>
    </div>
  );
}
