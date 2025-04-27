import { forwardRef } from "react";
import { useFontState } from "../../../Providers/FontProvider";
import { useLanguageState } from "../../../Providers/LanguageProvider";
const CustomBeacon = forwardRef(({ onClick, ...props }, ref) => {
  const lang = useLanguageState();
  const font = useFontState();
  return (
    <button
      ref={ref}
      onClick={onClick}
      {...props}
      className={`bg-blue text-light white animate-pulse py-6 px-4 rounded-full font-${font}-bold`}
    >
      {lang["start"]}
    </button>
  );
});

export default CustomBeacon;
