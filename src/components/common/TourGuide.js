import { useState, useEffect } from "react";
const TourGuide = ({ targetRef, explanation, onNext }) => {
  const [targetRect, setTargetRect] = useState(null);

  useEffect(() => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setTargetRect(rect);
    }
  }, [targetRef]);

  if (!targetRect) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60">
      <div
        className="absolute bg-transparent border-4 border-yellow-400 rounded-xl pointer-events-none"
        style={{
          top: targetRect.top - 8,
          left: targetRect.left - 8,
          width: targetRect.width + 16,
          height: targetRect.height + 16,
        }}
      />
      <div className="absolute z-[10000] top-[calc(100vh-150px)] left-1/2 transform -translate-x-1/2 text-white max-w-md p-4">
        <p>{explanation}</p>
        <button onClick={onNext} className="mt-4 px-4 py-2 bg-blue-600 rounded">
          Next
        </button>
      </div>
    </div>
  );
};
export default TourGuide;
