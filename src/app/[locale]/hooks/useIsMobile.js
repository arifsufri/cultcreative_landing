"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for detecting mobile viewport with debounced resize handling
 * @param {number} breakpoint - The width breakpoint for mobile (default: 768)
 * @returns {boolean} - Whether the viewport is considered mobile
 */
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < breakpoint);
  }, [breakpoint]);

  useEffect(() => {
    // Set initial value
    checkMobile();

    // Debounced resize handler for better performance
    let timeoutId;
    const debouncedCheck = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 100);
    };

    window.addEventListener("resize", debouncedCheck);

    return () => {
      window.removeEventListener("resize", debouncedCheck);
      clearTimeout(timeoutId);
    };
  }, [checkMobile]);

  return isMobile;
};

export default useIsMobile;
