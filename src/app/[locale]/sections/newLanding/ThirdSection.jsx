"use client";

import {
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import useIsMobile from "@/app/[locale]/hooks/useIsMobile";

const ThirdSection = () => {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transform values for all cards visible initially, then stack when scrolled
  // Always call hooks (Rules of Hooks), then conditionally use values
  const card1YTransform = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, -20, -60],
  );
  const card2YTransform = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 0, -40],
  );
  const card3YTransform = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 0, -20],
  );
  const card4YTransform = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, 0]);

  const card1ScaleTransform = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [1, 0.96, 0.94, 0.92],
  );
  const card2ScaleTransform = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [1, 1, 0.96, 0.94],
  );
  const card3ScaleTransform = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [1, 1, 1, 0.96],
  );
  const card4ScaleTransform = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [1, 1, 1, 1],
  );

  // Use static values on mobile, transform values on desktop
  const card1Y = isMobile ? 0 : card1YTransform;
  const card2Y = isMobile ? 0 : card2YTransform;
  const card3Y = isMobile ? 0 : card3YTransform;
  const card4Y = isMobile ? 0 : card4YTransform;

  const card1Scale = isMobile ? 1 : card1ScaleTransform;
  const card2Scale = isMobile ? 1 : card2ScaleTransform;
  const card3Scale = isMobile ? 1 : card3ScaleTransform;
  const card4Scale = isMobile ? 1 : card4ScaleTransform;

  return (
    <LazyMotion features={domAnimation}>
      <div
        ref={containerRef}
        className="bg-white py-8"
        style={{ contain: "layout" }}
      >
        <section
          className="py-20 rounded-3xl"
          style={{
            backgroundImage:
              "url(/images/NewMain/purplegradientbackground.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            contain: "content",
          }}
        >
          <div className="container mx-auto px-6">
            {/* Header Section */}
            <m.div
              className="text-center mb-16"
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              whileInView={
                isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
              }
              transition={isMobile ? {} : { duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-5xl md:text-6xl font-bold font-aileron relative mb-8 text-white"
                style={{ letterSpacing: "-0.06em" }}
              >
                How We Do It.
                <Image
                  src="/images/NewMain/howwedoit.svg"
                  alt="How We Do It underline"
                  width={384}
                  height={20}
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-96"
                  loading="lazy"
                />
              </h2>
            </m.div>

            {/* Feature Cards */}
            <div className="max-w-4xl mx-auto">
              {/* Creator Media Kit Card */}
              <m.div
                className="sticky top-2 bg-white shadow-lg overflow-visible md:overflow-hidden mb-4 md:-mb-1 mx-auto md:mx-0 w-full max-w-sm md:max-w-none md:w-[955px] md:h-[276px] h-auto md:rounded-[20px] rounded-lg md:py-[18px] py-6 md:px-9 px-5 md:border-[0.75px] border border-gray-200 md:ml-[-22px] ml-0"
                style={
                  isMobile
                    ? {
                        y: 0,
                        scale: 1,
                        zIndex: 1,
                      }
                    : {
                        y: card1Y,
                        scale: card1Scale,
                        zIndex: 1,
                        willChange: "transform",
                      }
                }
              >
                <div className="flex flex-col md:flex-row items-center h-full">
                  {/* Left side - Dashboard mockup */}
                  <div
                    className="flex items-center justify-center w-full md:w-[317.6px] h-[200px] md:h-[240px] mb-4 md:mb-0"
                    style={{
                      borderTopRightRadius: "6.67px",
                      borderBottomRightRadius: "6.67px",
                      gap: "31.5px",
                    }}
                  >
                    <Image
                      src="/images/NewMain/hwd1.svg"
                      alt="Creator Media Kit"
                      width={318}
                      height={240}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  {/* Right side - Content */}
                  <div
                    className="flex flex-col justify-center w-full md:w-[490.9px] text-start sm:text-center md:text-left md:ml-8"
                    style={
                      isMobile
                        ? {
                            minHeight: "auto",
                            gap: "8px",
                          }
                        : {
                            height: "81.25px",
                            gap: "5.25px",
                          }
                    }
                  >
                    <h3
                      className="text-gray-800 mb-2"
                      style={{
                        fontFamily: "Aileron, sans-serif",
                        fontWeight: 600,
                        fontSize: isMobile ? "24px" : "29.25px",
                        lineHeight: isMobile ? "30px" : "37.5px",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      Creator Media Kit
                    </h3>
                    <p
                      className="text-gray-600"
                      style={{
                        fontFamily: "Aileron, sans-serif",
                        fontWeight: 400,
                        fontSize: isMobile ? "16px" : "18px",
                        lineHeight: isMobile ? "24px" : "18.75px",
                        letterSpacing: "0%",
                      }}
                    >
                      A dynamic profile that showcases your audience, influence
                      and performance.
                    </p>
                  </div>
                </div>
              </m.div>

              {/* Campaign Analytics Card */}
              <m.div
                className="sticky top-2 bg-white shadow-lg overflow-visible md:overflow-hidden mb-4 mx-auto md:mx-0 w-full max-w-sm md:max-w-none md:w-[925px] md:h-[276px] h-auto md:rounded-[20px] rounded-lg md:py-[18px] py-6 md:px-9 px-5 md:border-[0.75px] border border-gray-200 md:ml-[-8px] ml-0"
                style={
                  isMobile
                    ? {
                        y: 0,
                        scale: 1,
                        zIndex: 2,
                      }
                    : {
                        y: card2Y,
                        scale: card2Scale,
                        zIndex: 2,
                        willChange: "transform",
                      }
                }
              >
                <div className="flex flex-col md:flex-row items-center h-full">
                  {/* Left side - Analytics mockup */}
                  <div
                    className="flex items-center justify-center w-full md:w-[317.6px] h-[200px] md:h-[240px] mb-4 md:mb-0"
                    style={{
                      borderTopRightRadius: "6.67px",
                      borderBottomRightRadius: "6.67px",
                      gap: "31.5px",
                    }}
                  >
                    <Image
                      src="/images/NewMain/hwd2.svg"
                      alt="Campaign Analytics"
                      width={318}
                      height={240}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  {/* Right side - Content */}
                  <div
                    className="flex flex-col justify-center w-full md:w-[490.9px] text-start sm:text-center md:text-left md:ml-8 "
                    style={
                      isMobile
                        ? {
                            minHeight: "auto",
                            gap: "8px",
                          }
                        : {
                            height: "81.25px",
                            gap: "5.25px",
                          }
                    }
                  >
                    <h3
                      className="text-gray-800 mb-2"
                      style={{
                        fontFamily: "Aileron, sans-serif",
                        fontWeight: 600,
                        fontSize: isMobile ? "24px" : "29.25px",
                        lineHeight: isMobile ? "30px" : "37.5px",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      Campaign Analytics
                    </h3>
                    <p
                      className="text-gray-600"
                      style={{
                        fontFamily: "Aileron, sans-serif",
                        fontWeight: 400,
                        fontSize: isMobile ? "16px" : "18px",
                        lineHeight: isMobile ? "24px" : "18.75px",
                        letterSpacing: "0%",
                      }}
                    >
                      A real-time dashboard to track, measure and optimise every
                      campaign.
                    </p>
                  </div>
                </div>
              </m.div>

              {/* Content & Creator Management Card */}
              <m.div
                className="sticky top-2 bg-white shadow-lg overflow-visible md:overflow-hidden mb-4 mx-auto w-full max-w-sm md:max-w-none md:w-[912px] md:h-[276px] h-auto md:rounded-[20px] rounded-lg md:py-[18px] py-6 md:px-9 px-5 md:border-[0.75px] border border-gray-200"
                style={
                  isMobile
                    ? {
                        y: 0,
                        scale: 1,
                        zIndex: 3,
                      }
                    : {
                        y: card3Y,
                        scale: card3Scale,
                        zIndex: 3,
                        willChange: "transform",
                      }
                }
              >
                <div className="flex flex-col md:flex-row items-center h-full">
                  {/* Left side - Management mockup */}
                  <div
                    className="flex items-center justify-center w-full md:w-[317.6px] h-[200px] md:h-[240px] mb-4 md:mb-0"
                    style={{
                      borderTopRightRadius: "6.67px",
                      borderBottomRightRadius: "6.67px",
                      gap: "31.5px",
                    }}
                  >
                    <Image
                      src="/images/NewMain/hwd3.svg"
                      alt="Content & Creator Management"
                      width={318}
                      height={240}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  {/* Right side - Content */}
                  <div
                    className="flex flex-col justify-center w-full md:w-[490.9px] text-start sm:text-center md:text-left md:ml-8"
                    style={
                      isMobile
                        ? {
                            minHeight: "auto",
                            gap: "8px",
                          }
                        : {
                            height: "81.25px",
                            gap: "5.25px",
                          }
                    }
                  >
                    <h3
                      className="text-gray-800 mb-2"
                      style={{
                        fontFamily: "Aileron, sans-serif",
                        fontWeight: 600,
                        fontSize: isMobile ? "24px" : "29.25px",
                        lineHeight: isMobile ? "30px" : "37.5px",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      Content & Creator Management
                    </h3>
                    <p
                      className="text-gray-600"
                      style={{
                        fontFamily: "Aileron, sans-serif",
                        fontWeight: 400,
                        fontSize: isMobile ? "16px" : "18px",
                        lineHeight: isMobile ? "24px" : "18.75px",
                        letterSpacing: "0%",
                      }}
                    >
                      Manage every creator, campaign and piece of content from a
                      single intelligent hub.
                    </p>
                  </div>
                </div>
              </m.div>

              {/* Automated Workflow Card */}
              <m.div
                className="sticky top-2 bg-white shadow-lg overflow-visible md:overflow-hidden mb-4 mx-auto w-full max-w-sm md:max-w-none md:w-[912px] md:h-[276px] h-auto md:rounded-[20px] rounded-lg md:py-[18px] py-6 md:px-9 px-5 md:border-[0.75px] border border-gray-200"
                style={
                  isMobile
                    ? {
                        y: 0,
                        scale: 1,
                        zIndex: 4,
                      }
                    : {
                        y: card4Y,
                        scale: card4Scale,
                        zIndex: 4,
                        willChange: "transform",
                      }
                }
              >
                <div className="flex flex-col md:flex-row items-center h-full">
                  {/* Left side - Workflow mockup */}
                  <div
                    className="flex items-center justify-center w-full md:w-[317.6px] h-[200px] md:h-[240px] mb-4 md:mb-0"
                    style={{
                      borderTopRightRadius: "6.67px",
                      borderBottomRightRadius: "6.67px",
                      gap: "31.5px",
                    }}
                  >
                    <Image
                      src="/images/NewMain/hwd4.svg"
                      alt="Automated Workflow"
                      width={318}
                      height={240}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  {/* Right side - Content */}
                  <div
                    className="flex flex-col justify-center w-full md:w-[490.9px] text-start sm:text-center md:text-left md:ml-8"
                    style={
                      isMobile
                        ? {
                            minHeight: "auto",
                            gap: "8px",
                          }
                        : {
                            height: "81.25px",
                            gap: "5.25px",
                          }
                    }
                  >
                    <h3
                      className="text-gray-800 mb-2"
                      style={{
                        fontFamily: "Aileron, sans-serif",
                        fontWeight: 600,
                        fontSize: isMobile ? "24px" : "29.25px",
                        lineHeight: isMobile ? "30px" : "37.5px",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      Automated Workflow
                    </h3>
                    <p
                      className="text-gray-600"
                      style={{
                        fontFamily: "Aileron, sans-serif",
                        fontWeight: 400,
                        fontSize: isMobile ? "16px" : "18px",
                        lineHeight: isMobile ? "24px" : "18.75px",
                        letterSpacing: "0%",
                      }}
                    >
                      Smart contracts and automated workflows to launch
                      campaigns faster.
                    </p>
                  </div>
                </div>
              </m.div>
            </div>
          </div>
        </section>
      </div>
    </LazyMotion>
  );
};

export default ThirdSection;
