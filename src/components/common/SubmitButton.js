import React, { useState } from "react";
import { useFontState } from "../../Providers/FontProvider";

export default function SubmitButton({
  className,
  onClick,
  type,
  children,
  rounded,
  disabled,
}) {
  const [bgGradientClass, setBgGradient] = useState("opacity-100");
  const [bgGradientOppositeClass, setBgGradientOpposite] =
    useState("opacity-0");
  const font = useFontState();

  return (
    <button
      className={
        className +
        ` flex justify-center items-center bg-gray font-${font}-bold relative rounded-${rounded}`
      }
      onClick={onClick}
      type={type}
      onMouseOver={() => {
        setBgGradient("opacity-0");
        setBgGradientOpposite("opacity-100");
      }}
      onMouseOut={() => {
        setBgGradient("opacity-100");
        setBgGradientOpposite("opacity-0");
      }}
      disabled={disabled}
    >
      {!disabled && (
        <>
          <div
            className={`transition-all duration-300 rounded-${rounded} absolute w-full h-full bg-blue-gradient ${bgGradientClass}`}
          />
          <div
            className={`transition-all duration-300 rounded-${rounded} absolute w-full h-full bg-blue-gradient-opposite ${bgGradientOppositeClass}`}
          />
        </>
      )}
      <span className="mt-2 text-light z-10">{children}</span>
    </button>
  );
}
