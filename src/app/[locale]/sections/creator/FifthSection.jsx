"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const FifthSection = () => {
  return (
    <section className="relative min-h-screen bg-white flex flex-col items-center overflow-hidden md:py-32">
      <div className="flex flex-col w-full items-center gap-y-4 py-32 md:py-0">
        <div className="flex flex-col text-center">
          <h2 className="text-[2rem]/10 md:text-[4rem]/10 font-bold font-aileron text-black relative inline-block tracking-[-0.06em]">
            Landing Brand Deals Is
          </h2>
          <div className="relative h-12 md:h-24">
            <h2 className="text-[2rem] md:text-[4rem] font-bold font-aileron text-black relative inline-block tracking-[-0.06em]">
              {/* <span className="text-white">4 </span>
              <div className="absolute top-1/2 -left-6 md:-left-4 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16">
                <Image
                  src="/images/NewCreator/4.svg"
                  alt="number 4"
                  fill
                  className="object-contain"
                />
              </div> */}
              Easier Than You Think.
            </h2>
          </div>
          <p className="text-base/5 md:text-xl/5 font-aileron text-black font-[400] my-4 md:my-8">
            No <strong>paperwork</strong>, no <strong>hassle</strong>.{" "}
            <br className="md:hidden" />
            Just focus on being creative.
          </p>
        </div>
        <Image
          src="/images/NewCreator/stepbystep.png"
          alt="Monetize your contents"
          width={1200}
          height={437}
          className="hidden md:block w-full max-w-7xl h-auto px-4 md:py-10 md:mb-10"
        />
        <Image
          src="/images/NewCreator/test.png"
          alt="Monetize your contents"
          width={437}
          height={1200}
          className="block md:hidden w-full max-w-7xl h-auto px-4 pb-10"
        />
        <div>
          <motion.a
            href="https://app.cultcreativeasia.com/auth/jwt/register"
            target="_blank"
            rel="noopener noreferrer"
            className="px-16 py-2 md:py-4 text-base md:text-lg font-aileron text-white font-semibold rounded-full text-lg shadow-lg inline-block"
            style={{
              backgroundColor: "#1340ff",
              background: "#1340ff",
              filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
            }}
            whileHover={{
              scale: 1.05,
              background: "#1340ff",
              filter: "drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4))",
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="flex items-center gap-2">
              GET STARTED
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="inline-block"
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
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default FifthSection;
