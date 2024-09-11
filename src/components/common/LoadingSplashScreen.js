import { Spinner } from "flowbite-react";
import React from "react";

export default function LoadingSplashScreen({ isLoading }) {
  if (isLoading) {
    return (
      <div
        className={`absolute w-browser h-browser bg-dark-glass flex justify-center items-center transition-all duration-150 ${
          isLoading ? "z-[600] opacity-100" : "-z-10 opacity-0"
        }`}
      >
        <Spinner className="w-24 h-24 fill-blue" color="#2A2B2E" />
      </div>
    );
  } else {
    return null;
  }
}
