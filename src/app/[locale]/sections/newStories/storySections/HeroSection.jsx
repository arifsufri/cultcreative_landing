"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const HeroSection = ({ storyData }) => {
  const { title, subtitle, campaignGoal, stats, infoChips, iphoneImage } = storyData;

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-4 lg:px-8 pt-20 pb-20 lg:pb-60"
      style={{
        backgroundImage: "url('/images/newStories/bg-story-hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        borderBottomLeftRadius: "20px",
        borderBottomRightRadius: "20px",
      }}
    >
      {/* MOBILE LAYOUT - Hidden on desktop */}
      <div className="flex flex-col items-center w-full lg:hidden">
        {/* Title and Subtitle - Mobile */}
        <div className="mx-auto my-16 px-10">
          <div className="relative z-10 inline-block">
            <h1 className="text-4xl font-aileron font-bold tracking-tighter text-white text-left relative z-10">
              {title}
            </h1>
            <div className="absolute bottom-1 -left-1 w-[180px] h-7 bg-[#8A5AFE] z-0"></div>
            <p className="text-4xl leading-none italic font-baskerville text-white text-left tracking-tighter z-10 translate-x-0 -translate-y-1">
              {subtitle}
            </p>
          </div>
        </div>

        {/* iPhone + Stats Container - Mobile */}
        <div className="flex items-center justify-center gap-6 px-4 mb-8 w-full">
          <motion.div
            className="shrink-0"
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.2,
            }}
          >
            <Image
              width={200}
              height={400}
              src="/images/newStories/iphone.png"
              alt="Campaign preview"
              className="object-contain"
              style={{
                filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))",
              }}
            />
          </motion.div>

          {/* Stats - Mobile */}
          <div className="flex flex-col gap-2">
            {stats.map((stat, index) => (
              <div key={index} className="text-left">
                <p className="text-white font-aileron font-bold text-xl tracking-tight">{stat.label}</p>
                <p className="text-3xl tracking-tighter font-aileron-light text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Info Chips - Mobile */}
        <div className="flex flex-wrap justify-center gap-2 w-full max-w-md px-2">
          {infoChips.map((chip, index) => (
            <div
              key={index}
              className="px-4 py-1 border border-white rounded-full text-white text-sm font-extralight"
            >
              {chip}
            </div>
          ))}
        </div>

        {/* Campaign Goal - Mobile */}
        <div className="w-full max-w-xl px-4 my-16 text-center">
          <h2 className="text-2xl font-aileron font-semibold tracking-tight text-white mb-3">
            Campaign Goal
          </h2>
          <p style={{ fontWeight: 300 }} className="text-base text-white text-justify">
            {campaignGoal}
          </p>
        </div>
      </div>

      {/* DESKTOP LAYOUT - Hidden on mobile, shown on lg+ */}
      <div className="hidden lg:flex lg:flex-col lg:items-center lg:w-full">
        {/* Title, Subtitle, Campaign Goal Container with Floating iPhone */}
        <div className="flex row-auto justify-center my-40">
          {/* Floating iPhone Image - Left Side */}
          <motion.div
            className="relative left-12"
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.2,
            }}
            style={{ zIndex: 5 }}
          >
            <Image
              width={350}
              height={700}
              src={iphoneImage}
              alt="Campaign preview"
              className="object-contain"
              style={{
                filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))",
              }}
            />
          </motion.div>

          {/* Content Container - Centered with consistent spacing */}
          <div className="flex flex-col max-w-[50%] gap-40">
            {/* Title and Subtitle */}
            <div className="max-w-max">
              <div className="relative z-10 inline-block">
                <h1 className="text-6xl font-aileron font-bold tracking-4 text-white text-left relative z-10">
                  {title}
                </h1>
                <div className="absolute bottom-2 -left-1 w-[233px] h-[38px] bg-[#8A5AFE] z-0"></div>
                {/* Subtitle text - offset from highlight */}
                <p className="text-[47px] leading-none italic font-baskerville text-white text-left tracking-tighter z-10 translate-x-0 -translate-y-2">
                  {subtitle}
                </p>
              </div>
            </div>

            {/* Campaign Goal */}
            <div className="max-w-max relative left-[15%] leading-6 ">
              <h2 className="text-[34px] font-aileron font-semibold tracking-tight text-white mb-4 text-left">
                Campaign Goal
              </h2>
              <p style={{ fontWeight: 300 }} className="text-[20px] text-white text-left">
                {campaignGoal}
              </p>
            </div>
          </div>
        </div>

        {/* Stats and Info Chips - Separate Container */}
        <div className="max-w-max">
          {/* Stats */}
          <div className="mb-6 flex flex-row gap-24">
            {stats.map((stat, index) => (
              <div key={index} className="text-left">
                <p className="text-white font-family-aileron font-bold text-[36px] tracking-tight mb-1">{stat.label}</p>
                <p className="text-6xl tracking-tighter font-aileron-light text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Info Chips */}
          <div className="flex flex-wrap gap-4">
            {infoChips.map((chip, index) => (
              <div
                key={index}
                className="px-6 py-2 border border-white rounded-full text-white text-sm font-extralight"
              >
                {chip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;