"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";

const SecondSection = () => {
  const [displayedNumbers, setDisplayedNumbers] = useState([0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDistance, setSlideDistance] = useState(0);

  useEffect(() => {
    const calculateSlideDistance = () => {
      if (typeof window !== "undefined") {
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
          // Calculate card width with proper padding
          const viewportWidth = window.innerWidth;
          const padding = 24; // 12px on each side
          const cardWidth = Math.min(viewportWidth - padding * 2, 340);

          // Center the card by calculating the offset needed
          const containerWidth = viewportWidth;
          const cardOffset = (containerWidth - cardWidth) / 2;

          setSlideDistance(cardWidth + cardOffset);
        }
      }
    };

    calculateSlideDistance();
    window.addEventListener("resize", calculateSlideDistance);
    return () => window.removeEventListener("resize", calculateSlideDistance);
  }, []);

  const stats = [
    {
      number: 300,
      suffix: "+",
      label: "Campaigns Launched",
    },
    {
      number: 600,
      suffix: "K+",
      label: "Total Reach Across Campaigns",
    },
    {
      number: 3.5,
      suffix: "K+",
      label: "Creators On Our Platform",
    },
  ];

  // Custom hook for counting animation
  const useCountUp = (end, start = 0, duration = 2000) => {
    const [count, setCount] = useState(start);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
      if (!isVisible) return;

      setIsAnimating(true);
      const startTime = Date.now();
      const startValue = start;
      const endValue = end;

      const updateCount = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue =
          startValue + (endValue - startValue) * easeOutQuart;

        setCount(currentValue);

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          setIsAnimating(false);
        }
      };

      requestAnimationFrame(updateCount);
    }, [isVisible, end, start, duration]);

    return { count, isAnimating };
  };

  const count1 = useCountUp(stats[0].number, 0, 2000);
  const count2 = useCountUp(stats[1].number, 0, 2000);
  const count3 = useCountUp(stats[2].number, 0, 2000);

  const counts = [count1, count2, count3];

  // Case study data
  const caseStudies = [
    {
      title: "Spritzer",
      metrics: [
        { value: "900K", label: "Views" },
        { value: "19", label: "Posts" },
        { value: "90K", label: "Interactions" },
        { value: "8.87%", label: "Avg Engagement Rate" },
      ],
      phoneContent: "restaurant",
      videoSrc:
        "https://storage.googleapis.com/landing-cultcreative/brands/brand1.mp4",
    },
    {
      title: "Marriott Hotels",
      metrics: [
        { value: "500K", label: "Views" },
        { value: "38", label: "Posts" },
        { value: "50K", label: "Interactions" },
        { value: "6.06%", label: "Avg Engagement Rate" },
      ],
      phoneContent: "hotel",
      videoSrc:
        "https://storage.googleapis.com/landing-cultcreative/brands/brand2.mp4",
    },
    {
      title: "Noir Fine Dining",
      metrics: [
        { value: "3.2M", label: "Views" },
        { value: "55", label: "Posts" },
        { value: "360K", label: "Interactions" },
        { value: "8.2%", label: "Avg Engagement Rate" },
      ],
      phoneContent: "tech",
      videoSrc:
        "https://storage.googleapis.com/landing-cultcreative/brands/brand3.mp4",
    },
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % caseStudies.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [caseStudies.length]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Performance Statistics */}
        <motion.div
          className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          onViewportEnter={() => setIsVisible(true)}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center w-full md:w-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col md:block items-center">
                <div
                  className="text-4xl md:text-6xl font-bold mb-2"
                  style={{
                    fontFamily: "Aileron",
                    fontWeight: 700,
                    color: "#231f20",
                  }}
                >
                  {counts[index].count.toFixed(stat.number % 1 !== 0 ? 1 : 0)}
                  {stat.suffix}
                </div>
                <div
                  style={{
                    fontFamily: "Aileron",
                    fontWeight: 400,
                    fontStyle: "normal",
                    fontSize: "16px",
                    lineHeight: "24px",
                    letterSpacing: "0%",
                    textAlign: "center",
                    textTransform: "capitalize",
                    color: "#231f20",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Case Study Carousel */}
        <motion.div
          className="max-w-6xl mx-auto mt-16 md:mt-64 relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Three iPhones positioned above their respective containers */}
          <motion.div
            className="absolute hidden md:block"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            animate={{ x: -currentSlide * 1139 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              zIndex: 50,
              top: "-100px",
              left: "-20px",
            }}
          >
            <div className="flex">
              {caseStudies.map((study, phoneIndex) => (
                <div
                  key={phoneIndex}
                  className="shrink-0"
                  style={{ width: "1139px" }}
                >
                  {/* iPhone Frame */}
                  <div className="transform scale-[0.6] origin-top">
                    <DeviceFrameset device="iPhone X" color="black">
                      <div className="h-full w-full bg-white">
                        <video
                          src={study.videoSrc}
                          autoPlay={phoneIndex === currentSlide}
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover"
                          ref={(el) => {
                            if (el) {
                              if (phoneIndex === currentSlide) {
                                el.play().catch(() => {});
                              } else {
                                el.pause();
                              }
                            }
                          }}
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </DeviceFrameset>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Desktop Container */}
          <div
            className="relative overflow-hidden hidden md:block"
            style={{ width: "1139px", height: "500px" }}
          >
            {/* Carousel Container */}
            <motion.div
              className="flex"
              animate={{ x: -currentSlide * 1139 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {caseStudies.map((study, studyIndex) => (
                <div
                  key={studyIndex}
                  className="shrink-0 relative"
                  style={{ width: "1139px", height: "500px" }}
                >
                  {/* SVG Frame Background - Desktop */}
                  <img
                    src="/images/ForBrands/framebrands.svg"
                    alt="Card frame"
                    className="absolute inset-0 w-full h-full"
                    style={{ zIndex: 1 }}
                  />

                  <div className="relative z-10 flex flex-col lg:flex-row items-center h-full">
                    {/* Left Side - Empty space for iPhone */}
                    <div className="w-full lg:w-1/2 p-12 flex justify-center lg:justify-start relative">
                      {/* Empty space - iPhone is positioned outside */}
                    </div>

                    {/* Right Side - Content */}
                    <div className="w-full lg:w-1/2 p-12 flex items-center">
                      <div className="w-full">
                        {/* Campaign Title */}
                        <h3
                          className="mb-12"
                          style={{
                            fontFamily: "Aileron",
                            fontWeight: 700,
                            fontStyle: "Bold",
                            fontSize: "58.32px",
                            lineHeight: "57.86px",
                            letterSpacing: "-0.06em",
                            textTransform: "capitalize",
                            color: "#231f20",
                          }}
                        >
                          {study.title}
                        </h3>

                        {/* Performance Metrics */}
                        <div className="space-y-0.5">
                          {study.metrics.map((metric, index) => (
                            <div key={index} className="flex items-center">
                              <span
                                className="text-3xl font-bold mr-4"
                                style={{
                                  fontFamily: "Aileron",
                                  fontWeight: 700,
                                  fontStyle: "Bold",
                                  fontSize: "32px",
                                  lineHeight: "50px",
                                  letterSpacing: "0%",
                                  textAlign: "right",
                                  verticalAlign: "bottom",
                                  color: "#231f20",
                                }}
                              >
                                {metric.value}
                              </span>
                              <span
                                className="text-xl"
                                style={{
                                  fontFamily: "Aileron",
                                  fontWeight: 400,
                                  fontStyle: "Regular",
                                  fontSize: "24px",
                                  lineHeight: "100%",
                                  letterSpacing: "-4%",
                                  verticalAlign: "middle",
                                  color: "#231f20",
                                }}
                              >
                                {metric.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Mobile Container */}
          <div
            className="relative overflow-hidden md:hidden"
            style={{ height: "680px" }}
          >
            {/* Carousel Container */}
            <motion.div
              className="flex"
              animate={{ x: -currentSlide * slideDistance }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{
                width: "fit-content",
                paddingLeft: "12px",
                paddingRight: "12px",
              }}
            >
              {caseStudies.map((study, studyIndex) => {
                const viewportWidth =
                  typeof window !== "undefined" ? window.innerWidth : 375;
                const cardWidth = Math.min(viewportWidth - 24, 340);

                return (
                  <div
                    key={studyIndex}
                    className="shrink-0 relative mx-auto"
                    style={{
                      width: `${cardWidth}px`,
                      height: "650px",
                      marginLeft:
                        studyIndex === 0
                          ? `${(viewportWidth - cardWidth) / 2 - 12}px`
                          : "12px",
                      marginRight: "12px",
                    }}
                  >
                    {/* SVG Frame Background - Mobile */}
                    <img
                      src="/images/ForBrands/mobile-framebrands.svg"
                      alt="Card frame"
                      className="absolute inset-0 w-full h-full object-contain"
                      style={{ zIndex: 1 }}
                    />

                    {/* Mobile iPhone - positioned inside the frame centered */}
                    <motion.div
                      className="absolute md:hidden z-50"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {/* iPhone Frame */}
                      <div
                        className="transform scale-[0.5]"
                        style={{
                          filter:
                            "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15))",
                        }}
                      >
                        <DeviceFrameset device="iPhone X" color="black">
                          <div className="h-full w-full bg-white relative">
                            <video
                              src={study.videoSrc}
                              autoPlay={studyIndex === currentSlide}
                              muted
                              loop
                              playsInline
                              className="w-full h-full object-cover"
                              ref={(el) => {
                                if (el) {
                                  if (studyIndex === currentSlide) {
                                    el.play().catch(() => {});
                                  } else {
                                    el.pause();
                                  }
                                }
                              }}
                            >
                              Your browser does not support the video tag.
                            </video>
                            {/* Stats Overlay */}
                            <div
                              className="absolute bottom-8 left-0 right-0 p-6 text-white"
                              style={{
                                background:
                                  "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
                              }}
                            >
                              <h3
                                className="text-4xl font-bold mb-4"
                                style={{
                                  fontFamily: "Aileron",
                                  color: "#FFFFFF",
                                }}
                              >
                                {study.title}
                              </h3>
                              {study.metrics.map((metric, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-baseline gap-3 -mb-2"
                                >
                                  <span
                                    className="text-3xl font-bold text-right"
                                    style={{
                                      fontFamily: "Aileron",
                                      color: "#FFFFFF",
                                      minWidth: "90px",
                                    }}
                                  >
                                    {metric.value}
                                  </span>
                                  <span
                                    className="text-lg text-left"
                                    style={{
                                      fontFamily: "Aileron",
                                      color: "#FFFFFF",
                                    }}
                                  >
                                    {metric.label}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </DeviceFrameset>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SecondSection;
