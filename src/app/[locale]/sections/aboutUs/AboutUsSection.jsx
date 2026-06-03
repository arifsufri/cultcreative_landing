"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const LinkMotion = motion(Link);

// A reusable component for the stat boxes to keep the code clean
const StatBox = ({ number, text, iconSrc = null, iconPosition, iconSize }) => (
  <div className="relative w-full max-w-sm md:w-[419px] h-[132px] md:h-[200px] rounded-[20px] md:rounded-[40px] p-[2px] bg-gradient-to-br from-[#F4F4F4]/70 to-[#8F8E8C]/10  backdrop-opacity-0">
    <div
      className={`relative h-full w-full bg-gradient-to-br from-[#081b6c]/10 to-[#F5F4F0]/20  backdrop-blur-none rounded-[19px] md:rounded-[38px] flex flex-col backdrop-blur-lg items-center justify-center text-white text-center  backdrop-opacity-0`}
    >
      <div className="relative h-full w-full rounded-[19px] md:rounded-[38px] bg-[#081b6c]/50 flex flex-col items-center justify-center backdrop-blur-sm text-white text-center px-16 py-8">
        {iconSrc && (
          <div className={`absolute z-10 ${iconPosition}`}>
            <Image
              src={iconSrc}
              alt="decoration"
              width={iconSize}
              height={iconSize}
            />
          </div>
        )}

        <p className="text-[3.375rem] md:text-6xl font-bold leading-none">
          {number}
        </p>
        <p className="text-base md:text-lg">{text}</p>
      </div>
    </div>
  </div>
);

const AboutUsSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="flex flex-col w-full bg-cover bg-center bg-no-repeat bg-about-mobile md:bg-about-desktop pt-28 pb-20 md:pt-60 md:pb-40 gap-10 md:gap-40">
      {/* 1. The White Content Card */}
      <div className="bg-white rounded-3xl md:rounded-[36px] px-6 md:p-60 py-[60px] md:py-[120px] mx-3 md:mx-6 z-10">
        {/* Header Text */}
        <div className="text-center leading-none">
          <h1 className="text-[1.75rem] md:text-[4rem] font-aileron font-bold text-cc-onyx relative inline-block tracking-[-0.06em]">
            Cultivating Collaboration
            {/* Decorative Sparkle */}
            <span className="absolute -top-2 -right-4 md:-top-4 md:-right-10">
              {isMobile ? (
                <Image
                  src="/images/NewAboutUs/titleDeco.svg"
                  alt="sparkle"
                  width={22}
                  height={22}
                />
              ) : (
                <Image
                  src="/images/NewAboutUs/titleDeco.svg"
                  alt="sparkle"
                  width={50}
                  height={50}
                />
              )}
            </span>
          </h1>
          <p className="text-2xl md:text-5xl font-baskerville font-[400] italic text-cc-onyx tracking-[-0.04em] ">
            between creators and brands.
          </p>
        </div>

        {/* Self-Playing Video */}
        <div className="mt-12 rounded-2xl overflow-hidden shadow-lg">
          <video
            src="https://storage.googleapis.com/landing-cultcreative/brands/cm96oy47r02hcqe01mfl7ehsp_copy_3235B186-45B2-4061-B1F5-9D0E2AB93812%20(1).mp4"
            autoPlay
            loop
            muted
            playsInline
            className="aspect-16/9 w-full h-full object-cover"
          />
        </div>

        {/* About Us Text */}
        <div className="mt-12">
          <h2 className="text-2xl md:text-[2rem] font-bold text-cc-onyx tracking-[-0.06em]">
            About Us
          </h2>
          <p className="mt-4 text-xs md:text-xl text-cc-onyx w-full mx-auto ">
            Cult Creative is a data-driven platform that streamlines
            creator-brand collaborations, backed by a dedicated team ensuring
            every partnership succeeds.
          </p>
          <p className="mt-4 text-xs md:text-xl text-cc-onyx w-full mx-auto ">
            We believe that meaningful collaborations are founded on creativity,
            trust, and insight. By merging technology with human expertise, we
            empower creators and brands to grow together, shaping the future of
            creator-brand partnerships.
          </p>
        </div>
      </div>

      {/* 2. Content Outside the White Card (in the dark blue area) */}
      <div className="flex flex-col mx-6 text-center text-white gap-10 md:gap-20">
        {/* Stats Boxes Section */}
        {/* - Mobile: flex-col (stacks them vertically) */}
        {/* - Desktop: md:flex-row (places them side-by-side) */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          <StatBox
            number="13,000+"
            text="Creators Contributed"
            iconSrc="/images/NewAboutUs/statDeco.svg"
            iconPosition="top-0 right-0 -translate-y-3/4 translate-x-2/3"
            iconSize={60}
            gradient=" md:bg-gradient-to-b md:from-[#040e37]/80 to-[#030922]/80"
          />
          <StatBox
            number="900+"
            text="Companies Onboarded"
            gradient="bg-gradient-to-b from-[#040e37]/80 to-[#030922]/80"
          />
          <StatBox
            number="1,200"
            text="Jobs Matched"
            iconSrc="/images/NewAboutUs/statStar.svg"
            iconPosition="top-0 left-0 translate-y-1/4 -translate-x-1/3"
            iconSize={77}
            gradient="bg-gradient-to-b from-[#040e37]/80 to-[#030922]/80"
          />
        </div>
        <div>
          {/* Empowering Text Line */}
          <p className="text-xl md:text-[2.5rem] font-baskerville italic">
            We’re here to empower creators to thrive
          </p>
          <p className="text-xl md:text-[2.5rem] font-baskerville italic leading-none">
            and shape the future of brands.
          </p>
        </div>

        {/* Buttons Section */}
        {/* - Mobile: flex-col (stacks them vertically) */}
        {/* - Desktop: md:flex-row (places them side-by-side) */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <motion.div
            className="flex justify-center w-full md:w-auto md:mb-16"
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={isMobile ? {} : { duration: 0.8, delay: 0.4 }}
          >
            <LinkMotion
              href={"https://app.cultcreativeasia.com/auth/jwt/register"}
              target="_blank"
              className="px-8 w-full md:w-auto md:px-16 py-3 justify-center flex text-white font-semibold rounded-full text-base md:text-lg relative overflow-hidden "
              style={{
                backgroundColor: "#1340ff",
                background: "#1340ff",
                boxShadow:
                  "0 0 10px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3), 0 8px 20px rgba(0, 0, 0, 0.2)",
                filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
              }}
              whileHover={
                isMobile
                  ? {}
                  : {
                      scale: 1.05,
                      background: "#1340ff",
                      boxShadow:
                        "0 0 10px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.6), 0 12px 30px rgba(0, 0, 0, 0.4)",
                      filter: "drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4))",
                    }
              }
              transition={isMobile ? {} : { duration: 0.3 }}
            >
              <span className="flex items-center gap-2">
                SIGN UP AS A CREATOR
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 inline-block"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </LinkMotion>
          </motion.div>
          <motion.div
            className="flex justify-center w-full md:w-auto mb-12 md:mb-16"
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={isMobile ? {} : { duration: 0.8, delay: 0.4 }}
          >
            <LinkMotion
              href="https://api.whatsapp.com/send/?phone=60178698757&text=I%27m+interested+in+a+creator+marketing+package%21&type=phone_number&app_absent=0"
              className="px-8 md:px-16 w-full md:w-auto py-3 text-white font-semibold justify-center flex  rounded-full text-base md:text-lg relative overflow-hidden"
              style={{
                backgroundColor: "#000000",
                background: "#000000",
                boxShadow:
                  "0 0 10px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3), 0 8px 20px rgba(0, 0, 0, 0.2)",
                filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))",
              }}
              whileHover={
                isMobile
                  ? {}
                  : {
                      scale: 1.05,
                      background: "#000000",
                      boxShadow:
                        "0 0 10px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.6), 0 12px 30px rgba(0, 0, 0, 0.4)",
                      filter: "drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4))",
                    }
              }
              transition={isMobile ? {} : { duration: 0.3 }}
            >
              <span className="flex items-center gap-2">
                CONTACT OUR TEAM
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 inline-block"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </LinkMotion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
