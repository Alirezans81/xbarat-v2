import { Spinner } from "flowbite-react";
import React from "react";

export default function LoadingSplashScreen({ isLoading }) {
  const containerClass = isLoading ? "z-100 opacity-100" : "-z-10 opacity-0";

  if (isLoading) {
    return (
      <div
        className={
          "absolute w-screen h-screen bg-dark-glass flex justify-center items-center transition-all duration-300 " +
          containerClass
        }
      >
        <Spinner className="w-24 h-24 fill-blue" />
      </div>
    );
  } else {
    return null;
  }
}
