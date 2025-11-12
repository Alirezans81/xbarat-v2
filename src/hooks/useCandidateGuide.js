import { useRef, useState, useCallback, useEffect } from "react";

const useCandidateGuide = (candidateComponents, isMobile) => {
  const timeoutRef = useRef(null);
  const [showGuide, setShowGuide] = useState(false);
  const [currentCandidate, setCurrentCandidate] = useState([null, null]);

  const findComponentByKey = useCallback(
    (key) => {
      const allComponents = isMobile
        ? [...candidateComponents.mobile]
        : [...candidateComponents.desktop];

      return allComponents.find((item) => item.key === key)?.component || null;
    },
    [candidateComponents, isMobile]
  );

  const clearTimeoutFunc = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const showCandidateGuide = useCallback(
    (candidate) => {
      const temp = findComponentByKey(candidate);
      setCurrentCandidate([candidate, temp]);
      setShowGuide(true);
    },
    [findComponentByKey]
  );

  const handleMouseEnter = useCallback(
    (candidate) => {
      clearTimeoutFunc();
      timeoutRef.current = setTimeout(() => {
        showCandidateGuide(candidate);
      }, 2000);
    },
    [clearTimeout, showCandidateGuide]
  );

  const handleFocus = useCallback(
    (candidate) => {
      clearTimeoutFunc();
      timeoutRef.current = setTimeout(() => {
        showCandidateGuide(candidate);
      }, 2000);
    },
    [clearTimeout, showCandidateGuide]
  );

  const handleMouseLeave = useCallback(() => {
    clearTimeout();
  }, [clearTimeout]);

  const handleBlur = useCallback(() => {
    clearTimeout();
  }, [clearTimeout]);

  const hideGuide = useCallback(() => {
    setShowGuide(false);
    setCurrentCandidate([null, null]);
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout();
    };
  }, [clearTimeout]);

  return {
    showGuide,
    currentCandidate,
    handleMouseEnter,
    handleFocus,
    handleMouseLeave,
    handleBlur,
    hideGuide,
    clearTimeout,
    setCurrentCandidate,
  };
};

export default useCandidateGuide;
