"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";

const SixthSection = () => {
  const { isMdAndAbove } = useMediaQuery();
  const [isExpanded, setIsExpanded] = useState(false);

  // Animation variants for the two flexible columns' widths
  const textColumnVariants = {
    collapsed: { flexBasis: "72%" },
    expanded: { flexBasis: "28%" },
  };

  const visualColumnVariants = {
    collapsed: { flexBasis: "18%" },
    expanded: { flexBasis: "71%" },
  };

  const textFadeVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut", delay: 0.5 }, // Slight delay to let width settle
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <section className="relative md:w-full md:h-[750px] bg-linear-to-t from-[#5E2285] to-[#D26ECE] rounded-3xl p-6 md:p-28 md:pb-20 m-2">
      <div className="absolute top-16 md:top-20 left-6 md:left-20 z-40 text-[32px] md:text-6xl">
        <h2 className="font-aileron font-bold leading-none text-white tracking-[-0.06em]">
          Want To Go From{" "}
          <span className="relative inline-block">
            <Image
              src="/images/NewCreator/caPurpleRectangle.svg"
              alt="purple rectangle"
              width={242}
              height={58}
              className="absolute -bottom-0 left-0 w-full z-0"
            />
            <span className="relative z-10">Content,</span>
          </span>
          <br />
        </h2>
        <h3 className="italic font-baskerville leading-none text-black tracking-[-0.04em]">
          To{" "}
          <span className="relative inline-block">
            {" "}
            <Image
              src="/images/NewCreator/purpleStroke.svg"
              alt="underline"
              width={200}
              height={10}
              className="absolute -bottom-2 left-0 w-full"
            />
            Contentpreneur?
          </span>
        </h3>
      </div>

      <div className="flex flex-col md:flex-row h-full w-full pt-36 md:pt-28 md:space-x-8">
        <motion.div
          variants={isMdAndAbove ? textColumnVariants : {}}
          animate={isMdAndAbove && isExpanded ? "expanded" : "collapsed"}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
          className="relative z-10 flex flex-col justify-center text-white"
        >
          <motion.div
            key={isExpanded ? "expanded" : "collapsed"}
            variants={textFadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col"
          >
            <p className="mt-2 md:mt-8 font-aileron font-[400] text-xl md:text-3xl w-auto">
              Looking to kickstart your{" "}
              <strong className="font-bold text-[#97C423]">
                creator journey?
              </strong>
            </p>
            <p className="mt-6 md:mt-8 font-aileron font-[400] text-xl md:text-3xl w-auto">
              Learn directly from the experts,{" "}
              <strong className="font-semibold text-[#97C423]">
                Shermaine Wong
              </strong>{" "}
              and{" "}
              <strong className="font-semibold text-[#97C423]">
                Ceddy Ang
              </strong>{" "}
              on how to succeed as a creator.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`hidden md:block mt-8 bg-[#97C423] font-bold py-4 px-14 rounded-full self-start transition-opacity duration-300 ease-in-out ${
                isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <span className="font-aileron bg-[#5E2285] bg-clip-text text-transparent">
                ENROL NOW
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
        {isMdAndAbove ? (
          <>
            <motion.div
              variants={visualColumnVariants}
              animate={isExpanded ? "expanded" : "collapsed"}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
              onMouseEnter={() => setIsExpanded(true)}
              onMouseLeave={() => setIsExpanded(false)}
              className="relative cursor-pointer overflow-hidden bottom-2"
            >
              <motion.div
                animate={isExpanded ? "expanded" : "collapsed"}
                className="absolute bottom-2 left-0 z-10 w-[631px] h-[421px]"
              >
                <Image
                  src="/images/NewCreator/caFull.png"
                  alt="Creator Academy info banner"
                  fill
                  className="rounded-l-3xl border border-white"
                />
              </motion.div>
            </motion.div>
            <div className="absolute inset-0 z-20 md:right-20 md:-bottom-32 flex justify-end items-center pointer-events-none">
              <div className="relative w-[300px] h-[493px] drop-shadow-2xl flex-shrink-0">
                <Image
                  src="/images/NewCreator/shermaineScreenCA.svg"
                  alt="Shermaine in Iphone"
                  className="object-contain"
                  fill
                  priority
                />
              </div>
            </div>
          </>
        ) : (
          <div className="relative w-full flex flex-col items-center justify-center">
            <div className="relative w-[360px] h-[280px]">
              <Image
                src="/images/NewCreator/caStatic.png"
                alt="Creator Academy on mobile"
                fill
                className="object-contain"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`mb-8 bg-[#97C423] font-bold py-4 px-16 rounded-full transition-opacity duration-300 ease-in-out ${
                isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <span className="font-aileron bg-[#5E2285] bg-clip-text text-transparent">
                ENROL NOW
              </span>
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SixthSection;
