import { forwardRef } from "react";
import { useFontState } from "../../../Providers/FontProvider";
import { useThemeState } from "../../../Providers/ThemeProvider";
const CustomBeacon = forwardRef(({ onClick, ...props }, ref) => {
  const font = useFontState();
  return (
    <button
      ref={ref}
      onClick={onClick}
      {...props}
      className={`bg-blue text-light white animate-pulse py-6 px-4 rounded-full font-${font}-bold`}
    >
      Start
    </button>
  );
});

export default CustomBeacon;
