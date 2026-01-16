"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

interface Location {
  code: string;
  name: string;
  flag: string;
}

const locations: Location[] = [
  { code: "my", name: "Malaysia", flag: "🇲🇾" },
  { code: "sg", name: "Singapore", flag: "🇸🇬" },
];

const LocationSelector = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname?.split("/")[1] || "my";
  const [isOpen, setIsOpen] = useState(false);

  const currentLocation = locations.find((loc) => loc.code === currentLocale);

  const handleSelect = (code: string) => {
    if (code === currentLocale) {
      setIsOpen(false);
      return;
    }

    const pathParts = pathname.split("/");
    pathParts[1] = code;
    setIsOpen(false);
    router.push(pathParts.join("/"));
  };

  return (
    <div className="relative">
      {/* Trigger Button - Shows current location clearly */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full border border-[#E7E7E7] bg-white"
        style={{ fontFamily: "Aileron, sans-serif" }}
        whileHover={{ borderColor: "#d1d1d1" }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-base">{currentLocation?.flag}</span>
        <span
          className="text-sm font-medium"
          style={{ color: "#231f20" }}
        >
          {currentLocation?.name}
        </span>
        <svg
          className="w-3.5 h-3.5 ml-0.5"
          style={{ color: "#6b7280" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
          />
        </svg>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Content */}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute bottom-full mb-2 right-0 z-50"
            >
              <div
                className="bg-white rounded-xl shadow-lg border border-[#E7E7E7] overflow-hidden py-1"
                style={{ minWidth: "160px" }}
              >
                {locations.map((location) => {
                  const isActive = currentLocale === location.code;
                  return (
                    <motion.button
                      key={location.code}
                      onClick={() => handleSelect(location.code)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 transition-colors duration-100"
                      style={{
                        fontFamily: "Aileron, sans-serif",
                        backgroundColor: isActive ? "#f5f5f5" : "transparent",
                        color: "#231f20",
                      }}
                      whileHover={{
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      <span className="text-base">{location.flag}</span>
                      <span
                        className="text-sm"
                        style={{ fontWeight: isActive ? 600 : 400 }}
                      >
                        {location.name}
                      </span>
                      {isActive && (
                        <svg
                          className="w-3.5 h-3.5 ml-auto"
                          style={{ color: "#1340ff" }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocationSelector;
