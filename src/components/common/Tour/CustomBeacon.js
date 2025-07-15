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
      className={`w-full h-full bg-green text-light flex justify-center items-center animate-pulse p-3 rounded-2xl font-${font}-bold shadpw-2xl drop-shadow-2xl`}
    >
      {lang["guide"]}
    </button>
  );
});

export default CustomBeacon;
