import React from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";

export default function DocumentInfo({ userInfo }) {
  const theme = useThemeState();

  return <div className={`bg-${theme}-back rounded-3xl w-full flex-1`}></div>;
}
