"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

interface Location {
  code: string;
  name: string;
  flag: string;
}

const locations: Location[] = [
  { code: "my", name: "Malaysia", flag: "/images/flags/my_flag.png" },
  { code: "sg", name: "Singapore", flag: "/images/flags/sg_flag.png" },
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
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-[#e0e0e0] bg-white/80 backdrop-blur-sm cursor-pointer"
        style={{ fontFamily: "Aileron, sans-serif" }}
        whileHover={{
          borderColor: "#1340ff",
          boxShadow: "0 0 0 3px rgba(19, 64, 255, 0.08)"
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15 }}
      >
        {currentLocation && (
          <span className="w-6 h-4 relative rounded-[3px] overflow-hidden ring-1 ring-black/10">
            <Image
              src={currentLocation.flag}
              alt={`${currentLocation.name} flag`}
              fill
              className="object-cover"
            />
          </span>
        )}
        <span
          className="text-sm font-semibold tracking-[-0.01em]"
          style={{ color: "#231f20" }}
        >
          {currentLocation?.name}
        </span>
        <motion.svg
          className="w-4 h-4"
          style={{ color: "#231f20" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px]"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{
                duration: 0.25,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="absolute bottom-full mb-3 right-0 z-50"
            >
              <div
                className="bg-white rounded-[20px] shadow-2xl overflow-hidden"
                style={{
                  width: "300px",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)"
                }}
              >
                {/* Header */}
                <div
                  className="px-6 pt-6 pb-5"
                  style={{
                    background: "linear-gradient(to bottom, #fafafa, #ffffff)"
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3
                        className="text-lg font-bold tracking-[-0.02em] mb-1"
                        style={{
                          fontFamily: "Aileron, sans-serif",
                          color: "#231f20",
                        }}
                      >
                        Select Location
                      </h3>
                    </div>
                    <motion.button
                      onClick={() => setIsOpen(false)}
                      className="w-8 h-8 rounded-full flex items-center justify-center -mr-1 -mt-1"
                      style={{ backgroundColor: "#f5f5f5" }}
                      whileHover={{ backgroundColor: "#ebebeb" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg
                        className="w-4 h-4"
                        style={{ color: "#6b7280" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </motion.button>
                  </div>
                </div>

                {/* Region Section */}
                <div className="px-4 pb-5">
                  {/* Region Label */}
                  <div className="flex items-center gap-2 px-2 mb-2">
                    <div
                      className="w-1 h-1 rounded-full"
                      style={{ backgroundColor: "#1340ff" }}
                    />
                    <span
                      className="text-[11px] font-semibold uppercase tracking-[0.08em]"
                      style={{
                        fontFamily: "Aileron, sans-serif",
                        color: "#9ca3af",
                      }}
                    >
                      Southeast Asia
                    </span>
                  </div>

                  {/* Location Options */}
                  <div className="space-y-1">
                    {locations.map((location, index) => {
                      const isActive = currentLocale === location.code;
                      return (
                        <motion.button
                          key={location.code}
                          onClick={() => handleSelect(location.code)}
                          className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-150 relative overflow-hidden cursor-pointer"
                          style={{
                            fontFamily: "Aileron, sans-serif",
                            backgroundColor: isActive ? "#1340ff" : "transparent",
                          }}
                          whileHover={{
                            backgroundColor: isActive ? "#1340ff" : "#f7f7f7",
                          }}
                        >
                          {/* Flag */}
                          <div
                            className="relative"
                            style={{
                              filter: isActive ? "brightness(1.05)" : "none"
                            }}
                          >
                            <span
                              className="w-10 h-7 relative rounded-md overflow-hidden block"
                              style={{
                                boxShadow: isActive
                                  ? "0 2px 8px rgba(0,0,0,0.2)"
                                  : "0 1px 3px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(0,0,0,0.06)"
                              }}
                            >
                              <Image
                                src={location.flag}
                                alt={`${location.name} flag`}
                                fill
                                className="object-cover"
                              />
                            </span>
                          </div>

                          {/* Country Info */}
                          <div className="flex-1 text-left">
                            <div
                              className="text-[15px] font-semibold tracking-[-0.01em]"
                              style={{
                                color: isActive ? "#ffffff" : "#231f20",
                              }}
                            >
                              {location.name}
                            </div>
                          </div>

                          {/* Selection Indicator */}
                          <div className="flex items-center">
                            {isActive ? (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
                              >
                                <svg
                                  className="w-3.5 h-3.5 text-white"
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
                              </motion.div>
                            ) : (
                              <div
                                className="w-5 h-5 rounded-full border-2"
                                style={{ borderColor: "#e0e0e0" }}
                              />
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Footer hint */}
                <div
                  className="px-6 py-3 border-t"
                  style={{
                    borderColor: "#f0f0f0",
                    backgroundColor: "#fafafa"
                  }}
                >
                  <p
                    className="text-[11px] text-center"
                    style={{
                      fontFamily: "Aileron, sans-serif",
                      color: "#9ca3af",
                    }}
                  >
                    Prices and content will update to your selection
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocationSelector;
