import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

const TourGuide = ({ steps, run, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [position, setPosition] = useState(null);
  const targetRef = useRef(null);

  useEffect(() => {
    if (!run || !steps[currentStep]) return;

    const target = document.querySelector(steps[currentStep].selector);
    if (!target) return;

    const rect = target.getBoundingClientRect();
    setPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      height: rect.height,
    });

    targetRef.current = target;

    // Optional: scroll into view
    target.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [currentStep, run, steps]);

  if (!run || !position) return null;

  const step = steps[currentStep];
  const { placement = "bottom" } = step;

  // Dynamic positioning
  const getTooltipStyle = () => {
    const padding = 10;
    const common = {
      position: "absolute",
      zIndex: 10000,
      backgroundColor: "white",
      padding: "16px",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      maxWidth: "300px",
    };

    switch (placement) {
      case "top":
        return {
          ...common,
          top: position.top - 10 - 100,
          left: position.left,
        };
      case "right":
        return {
          ...common,
          top: position.top,
          left: position.left + position.width + padding,
        };
      case "left":
        return {
          ...common,
          top: position.top,
          left: position.left - 300 - padding,
        };
      case "bottom":
      default:
        return {
          ...common,
          top: position.top + position.height + padding,
          left: position.left,
        };
    }
  };

  const handleNext = () => {
    if (currentStep + 1 < steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const Tooltip = (
    <div>
      {/* Overlay */}
      <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-60 z-[9998]" />

      {/* Highlight Box */}
      <div
        style={{
          position: "absolute",
          top: position.top - 10,
          left: position.left - 10,
          width: position.width + 20,
          height: position.height + 20,
          border: "2px solid #0A8DFF",
          borderRadius: 10,
          zIndex: 9999,
          boxShadow: "0 0 10px #0A8DFF",
        }}
      />

      {/* Tooltip */}
      <div style={getTooltipStyle()}>
        <p className="mb-2 text-sm text-gray-800">{step.content}</p>
        <div className="flex justify-between gap-2 mt-2">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`px-3 py-1 rounded bg-gray-300 text-sm ${
              currentStep === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-3 py-1 rounded bg-blue-500 text-white text-sm"
          >
            {currentStep + 1 === steps.length ? "Done" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(Tooltip, document.body);
};

export default TourGuide;
