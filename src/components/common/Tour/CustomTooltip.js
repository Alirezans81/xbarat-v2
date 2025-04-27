import { useThemeState } from "../../../Providers/ThemeProvider";
function CustomTooltip({
  closeProps,
  continuous,
  primaryProps,
  step,
  tooltipProps,
}) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  return (
    <div
      {...tooltipProps}
      className={`rounded-2xl shadow-xl p-6 bg-${theme} text-${oppositeTheme} max-w-md w-full relative`}
    >
      {/* Close Button */}
      <button
        {...closeProps}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
      >
        &times;
      </button>

      {/* Step Title */}
      {step.title && <h3 className="text-xl font-bold mb-2">{step.title}</h3>}

      {/* Step Content */}
      <div className="text-base mb-4">{step.content}</div>

      {/* Footer Buttons */}
      <div className="flex justify-between items-center">
        {/* Right Side: Back and Next */}
        <div className="flex gap-2">
          {continuous && (
            <button
              {...primaryProps}
              className="px-4 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm"
            >
              {primaryProps.title || "بعدی"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomTooltip;
