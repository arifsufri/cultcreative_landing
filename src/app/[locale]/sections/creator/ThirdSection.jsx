"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";

// Data for our feature cards - this makes the main component cleaner
const featuresData = [
  {
    id: 1,
    title: "Brand Deal Access",
    description: "Access brand deals that align with your content and audience",
    imageSrc: "/images/NewCreator/okfBrandDealsV2.png",
    bgColor: "bg-cc-blue",
  },
  {
    id: 2,
    title: "Admin Automation",
    description:
      "Generate contracts, sign agreements and manage paperwork in one place",
    imageSrc: "/images/NewCreator/okfAdminAutomation.svg",
    bgColor: "bg-cc-green",
  },
  {
    id: 3,
    title: "Media Kit",
    description:
      "A dynamic media kit that highlights your audience and performance",
    imageSrc: "/images/NewCreator/okfMediaKit.svg",
    bgColor: "bg-cc-orange",
  },
  {
    id: 4,
    title: "Skill Elevation",
    description: "Resources and courses to help you level up as a creator",
    imageSrc: "/images/NewCreator/okfSkillElevation.svg",
    bgColor: "bg-vibrant-purple",
  },
];

// A reusable component for each feature card
const FeatureCard = ({ imageSrc, title, description, bgColor }) => (
  <div
    className={`relative w-[340px] h-[350px] md:w-96 md:h-[400px] flex-shrink-0 ${bgColor} rounded-3xl px-6 py-10 md:p-10 flex flex-col justify-end text-white overflow-hidden`}
  >
    <div className="absolute top-0 left-0 w-full h-3/4 md:h-2/3">
      <Image
        src={imageSrc}
        alt={title}
        fill
        className="object-contain object-center p-4"
      />
    </div>
    <div className="relative z-10">
      <h3 className="text-2xl md:text-3xl font-aileron font-[700] md:mb-2 tracking-[-0.06em]">
        {title}
      </h3>
      <p className="text-base/5 md:text-sm font-aileron font-[400]">
        {description}
      </p>
    </div>
  </div>
);

const ThirdSection = () => {
  // State to track which side is being hovered
  const [hoverZone, setHoverZone] = useState("center");

  const { isMdAndAbove } = useMediaQuery();

  // Determine the x-offset based on the hover state
  let xOffset = "12%";
  if (hoverZone === "left") {
    xOffset = "12%";
  } else if (hoverZone === "right") {
    xOffset = "-12%";
  }

  return (
    <section className="relative min-h-screen md:h-screen bg-white flex flex-col items-center justify-center overflow-hidden py-28 md:py-0">
      {/* Invisible hover zones */}
      {isMdAndAbove ? (
        <>
          <div
            className="absolute -left-56 top-0 w-1/4 h-full z-20"
            onMouseEnter={() => setHoverZone("left")}
          />
          <div
            className="absolute -right-56 top-0 w-1/4 h-full z-20"
            onMouseEnter={() => setHoverZone("right")}
          />
        </>
      ) : (
        []
      )}

      {/* Section Title */}
      <div className="w-full text-center mb-6 md:mb-12">
        <h2 className="text-[2rem] md:text-6xl font-bold font-aileron relative inline-block text-black tracking-[-0.06em]">
          <span className="relative">
            <Image
              src="/images/NewCreator/okfDashes.svg"
              alt="Highlight"
              width={40}
              height={40}
              className="absolute -top-6 -left-10"
            />
            <span>Things </span>
          </span>
          <span className="relative">
            <Image
              src="/images/NewCreator/okfYellowRectangle.svg"
              alt="Highlight"
              width={220}
              height={60}
              className="absolute top-2 left-1 md:top-6 md:left-2 -translate-y-1"
            />
            <span className="relative z-10">We Do.</span>
          </span>
        </h2>
      </div>

      {isMdAndAbove ? (
        <>
          {/* Animated container for all the cards */}
          <motion.div
            className="flex flex-row items-center gap-8"
            animate={{ x: xOffset }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {featuresData.map((feature) => (
              <FeatureCard key={feature.id} {...feature} />
            ))}
          </motion.div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-8">
          {featuresData.map((feature) => (
            <FeatureCard key={feature.id} {...feature} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ThirdSection;
