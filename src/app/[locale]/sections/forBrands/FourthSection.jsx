"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const FourthSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const features = [
    {
      id: 1,
      title: "Unified Workflow",
      description: "Run your entire creator campaign workflow in one platform.",
      mobileTitle: "Unified Workflow",
      mobileDescription:
        "Run your entire creator campaign workflow in one platform.",
      width: 721,
      height: 381,
      top: 0,
      left: 0,
      background: "linear-gradient(180deg, #1340FF 0%, #001FA3 100%)",
      image: "/images/ForBrands/unified.svg",
      mobileImage: "/images/ForBrands/mobile-feature1.png",
    },
    {
      id: 2,
      title: "Campaign Analytics",
      description: "See exactly how your campaigns perform in real time.",
      mobileTitle: "Campaign Analytics",
      mobileDescription: "See exactly how your campaigns perform in real time.",
      width: 453,
      height: 381,
      top: 0,
      left: 751,
      background: "linear-gradient(180deg, #FF3500 0%, #A72300 100%)",
      image: "/images/ForBrands/campaignanalytics-cropped.svg",
      mobileImage: "/images/ForBrands/mobile-feature2.png",
    },
    {
      id: 3,
      title: "Guided Strategy",
      description:
        "Support that goes beyond automation, expert advice and creative guidance when you need it most.",
      mobileTitle: "Guided Strategy",
      mobileDescription:
        "Support that goes beyond automation, expert advice and creative guidance when you need it most.",
      width: 445,
      height: 381,
      top: 400,
      left: 0,
      background: "linear-gradient(180deg, #026D54 0%, #025844 100%)",
      image: "/images/ForBrands/guided.svg",
      mobileImage: "/images/ForBrands/mobile-feature3.png",
    },
    {
      id: 4,
      title: "Smart Matching",
      description: "Our platform matches you with the right creators faster.",
      mobileTitle: "Smart Matching",
      mobileDescription:
        "Our platform matches you with the right creators faster.",
      width: 728,
      height: 381,
      top: 400,
      left: 476,
      background: "linear-gradient(180deg, #8A5AFE 0%, #533698 100%)",
      image: "/images/ForBrands/smartmatching.svg",
      mobileImage: "/images/ForBrands/mobile-feature4.png",
    },
  ];

  return (
    <div
      className="w-full flex justify-center py-4 md:py-8"
      style={{ background: "#FFFFFF" }}
    >
      <section
        className="relative w-full md:w-auto mx-1"
        style={{
          maxWidth: isMobile ? "100%" : "1440px",
          height: isMobile ? "auto" : "1172px",
          paddingTop: isMobile ? "40px" : "120px",
          paddingRight: isMobile ? "20px" : "120px",
          paddingBottom: isMobile ? "40px" : "140px",
          paddingLeft: isMobile ? "20px" : "120px",
          gap: "60px",
          opacity: 1,
          borderRadius: isMobile ? "20px" : "20px",
          background: isMobile
            ? "radial-gradient(circle, rgba(35, 31, 32, 1) 0%, rgba(0, 9, 79, 1) 35%, rgba(0, 13, 46, 1) 100%)"
            : "radial-gradient(circle, rgba(35, 31, 32, 1) 0%, rgba(0, 9, 79, 1) 35%, rgba(0, 13, 46, 1) 100%)",
          overflow: "hidden",
        }}
      >
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          {/* Title Section */}
          <motion.div
            className="text-left mb-8 md:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className="mb-4"
              style={{
                fontFamily: "Aileron",
                fontWeight: 700,
                fontStyle: "Bold",
                fontSize: isMobile ? "32px" : "58.32px",
                lineHeight: isMobile ? "36px" : "57.86px",
                letterSpacing: "-0.06em",
                textTransform: "capitalize",
                color: isMobile ? "#FFFFFF" : "#FFFFFF",
                background: isMobile ? "none" : "#FFFFFF",
                WebkitBackgroundClip: isMobile ? "unset" : "text",
                WebkitTextFillColor: isMobile ? "unset" : "transparent",
                backgroundClip: isMobile ? "unset" : "text",
              }}
            >
              {isMobile ? (
                <>
                  <span className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/NewMain/singlestar.svg"
                      alt="star"
                      className="w-6 h-6 opacity-0"
                    />
                    What&apos;s{""}
                    <span style={{ padding: "0 0px" }}>Inside.</span>
                  </span>
                </>
              ) : (
                "What's Inside."
              )}
            </h2>

            {/* Curly yellow underline - desktop only */}
            <div className="relative inline-block ml-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/ForBrands/curlyyellow.svg"
                alt="Curly yellow underline"
                className="md:w-auto h-8 w-50 -mt-10"
              />
            </div>
          </motion.div>

          {/* Features Grid */}
          {isMobile ? (
            /* Mobile Layout - Vertical Stack */
            <div className="flex flex-col gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  className="rounded-3xl p-6 relative overflow-hidden"
                  style={{
                    background: feature.background,
                    minHeight: "400px",
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Image at top */}
                  <div className="mb-6 flex justify-center">
                    <img
                      src={feature.image}
                      alt={feature.mobileTitle}
                      className="w-full h-auto"
                      style={{
                        maxHeight: "280px",
                        maxWidth: "320px",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  {/* Text content at bottom */}
                  <div className="text-white">
                    <h3
                      className="text-2xl font-bold mb-3"
                      style={{
                        fontFamily: "Aileron",
                        fontWeight: 700,
                      }}
                    >
                      {feature.mobileTitle}
                    </h3>
                    <p
                      className="text-base opacity-90"
                      style={{
                        fontFamily: "Aileron",
                        fontWeight: 400,
                      }}
                    >
                      {feature.mobileDescription}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Desktop Layout - Grid */
            <motion.div
              className="flex-1 relative"
              style={{ height: "800px" }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Top Row */}
              <div className="flex gap-4 mb-4">
                {/* Blue Card */}
                <motion.div
                  className="p-8 flex flex-col justify-center relative overflow-hidden"
                  style={{
                    width: "721px",
                    height: "381px",
                    borderRadius: "24px",
                    background:
                      "linear-gradient(180deg, #1340FF 0%, #001FA3 100%)",
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className="relative z-10 text-white flex items-center"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="mr-8">
                      <img
                        src="/images/ForBrands/unified.svg"
                        alt="Unified Workflow"
                        className="w-84 h-84"
                      />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-3xl font-bold mb-4"
                        style={{
                          fontFamily: "Aileron",
                          fontWeight: 700,
                          fontSize: "32px",
                        }}
                      >
                        Unified Workflow
                      </h3>
                      <p
                        className="text-lg opacity-90"
                        style={{
                          fontFamily: "Aileron",
                          fontWeight: 400,
                          fontSize: "18px",
                          lineHeight: "1.3",
                        }}
                      >
                        Run your entire creator campaign workflow in one
                        platform.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Red Card */}
                <motion.div
                  className="p-8 flex flex-col justify-center relative overflow-hidden"
                  style={{
                    width: "453px",
                    height: "381px",
                    borderRadius: "24px",
                    background:
                      "linear-gradient(180deg, #FF3500 0%, #A72300 100%)",
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className="relative z-10 text-white flex flex-col items-center"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="-mb-5">
                      <img
                        src="/images/ForBrands/campaignanalytics-cropped.svg"
                        alt="Campaign Analytics"
                        className="w-70 h-70"
                      />
                    </div>
                    <div className="text-left w-full">
                      <h3
                        className="text-3xl font-bold "
                        style={{
                          fontFamily: "Aileron",
                          fontWeight: 700,
                          fontSize: "32px",
                        }}
                      >
                        Campaign Analytics
                      </h3>
                      <p
                        className="text-lg opacity-90"
                        style={{
                          fontFamily: "Aileron",
                          fontWeight: 400,
                          fontSize: "18px",
                          lineHeight: "1.3",
                        }}
                      >
                        See exactly how your campaigns perform in real time.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Bottom Row */}
              <div className="flex gap-4">
                {/* Green Card */}
                <motion.div
                  className="p-8 flex flex-col justify-center relative overflow-hidden"
                  style={{
                    width: "445px",
                    height: "381px",
                    borderRadius: "24px",
                    background:
                      "linear-gradient(180deg, #026D54 0%, #025844 100%)",
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className="relative z-10 text-white flex flex-col items-center"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="-mb-10">
                      <img
                        src="/images/ForBrands/guided.svg"
                        alt="Guided Strategy"
                        className="w-70 h-70"
                      />
                    </div>
                    <div className="text-left w-full">
                      <h3
                        className="text-3xl font-bold"
                        style={{
                          fontFamily: "Aileron",
                          fontWeight: 700,
                          fontSize: "32px",
                        }}
                      >
                        Guided Strategy
                      </h3>
                      <p
                        className="text-lg opacity-90"
                        style={{
                          fontFamily: "Aileron",
                          fontWeight: 400,
                          fontSize: "18px",
                          lineHeight: "1.3",
                        }}
                      >
                        Support that goes beyond automation, expert advice and
                        creative guidance when you need it most.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Purple Card */}
                <motion.div
                  className="p-8 flex flex-col justify-center relative overflow-hidden"
                  style={{
                    width: "728px",
                    height: "381px",
                    borderRadius: "24px",
                    background:
                      "linear-gradient(180deg, #8A5AFE 0%, #533698 100%)",
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className="relative z-10 text-white flex items-center"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    viewport={{ once: true }}
                  >
                    <div className="mr-8">
                      <img
                        src="/images/ForBrands/smartmatching.svg"
                        alt="Smart Matching"
                        className="w-84 h-84"
                      />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-3xl font-bold mb-4"
                        style={{
                          fontFamily: "Aileron",
                          fontWeight: 700,
                          fontSize: "32px",
                        }}
                      >
                        Smart Matching
                      </h3>
                      <p
                        className="text-lg opacity-90"
                        style={{
                          fontFamily: "Aileron",
                          fontWeight: 400,
                          fontSize: "18px",
                          lineHeight: "1.3",
                        }}
                      >
                        Our platform matches you with the right creators faster.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FourthSection;
