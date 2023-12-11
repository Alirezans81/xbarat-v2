import React from "react";
import LoginForm from "./RightSide/LoginForm";
import { useThemeState } from "../../../Providers/ThemeProvider";

export default function RightSide({ setIsSplashScreenLoading }) {
  const theme = useThemeState();

  return (
    <div className="flex justify-center items-center px-10">
      <div className={`bg-${theme}-glass rounded-3xl login-width`}>
        <LoginForm setIsSplashScreenLoading={setIsSplashScreenLoading} />
      </div>
    </div>
  );
}
