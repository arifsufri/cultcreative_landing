"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { videoGallery } from "../../components/videoData";

// ============ ANIMATION VARIANTS ============
const headingVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
};

const subheadingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.2, ease: "easeOut" },
  },
};

const descriptionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.4, ease: "easeOut" },
  },
};

const iphoneVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.0, delay: 0.5 } },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0, ease: "easeOut" },
  },
};

const thumbnailVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 0.6,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// Helper for stagger delay based on position
const getStaggerDelay = (index, rowIndex) =>
  0.6 + rowIndex * 0.1 + index * 0.03;

const Thumbnail = ({
  videoData,
  onClick,
  index,
  rowIndex,
  shouldAnimate,
  eager,
}) => (
  <motion.div
    className="w-24 md:w-36 flex-shrink-0"
    variants={shouldAnimate ? thumbnailVariants : undefined}
    initial={shouldAnimate ? "hidden" : { opacity: 1, scale: 1, y: 0 }}
    animate={shouldAnimate ? undefined : { opacity: 1, scale: 1, y: 0 }}
    whileInView={shouldAnimate ? "visible" : undefined}
    viewport={{ once: true, amount: 0.3 }}
    transition={
      shouldAnimate ? { delay: getStaggerDelay(index, rowIndex) } : undefined
    }
    style={shouldAnimate ? { willChange: "transform, opacity" } : undefined}
  >
    <motion.button
      onClick={onClick}
      className="group w-full rounded-xl md:rounded-2xl overflow-hidden opacity-60 hover:opacity-100 hover:cursor-pointer"
      whileHover={
        shouldAnimate
          ? { scale: 1.05, opacity: 1, transition: { duration: 0.2 } }
          : undefined
      }
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative aspect-[6/7] md:aspect-[16/18]">
        <Image
          src={videoData.thumbnail}
          alt={videoData.alt}
          fill
          sizes="(max-width: 768px) 96px, 144px"
          className="object-cover"
          loading={eager ? "eager" : "lazy"}
          quality={60}
        />
      </div>
    </motion.button>
  </motion.div>
);

const FirstSection = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [isMobile, setIsMobile] = useState(true); // Default to true to prevent SSR flash
  const [isClient, setIsClient] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const playerRef = useRef(null);

  const posterSrc = activeVideo?.thumbnail ?? videoGallery[0].thumbnail;

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const node = playerRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setActiveVideo((current) => current ?? videoGallery[0]);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setActiveVideo((current) => current ?? videoGallery[0]);
        observer.disconnect();
      },
      { rootMargin: "200px", threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Only animate on desktop, after client hydration, and when user doesn't prefer reduced motion
  const shouldAnimate = isClient && !isMobile && !prefersReducedMotion;

  const handleThumbnailClick = (video) => {
    setActiveVideo(video);
  };

  const row1 = videoGallery.slice(0, 7);
  const row2 = videoGallery.slice(7, 14);
  const row3 = videoGallery.slice(14, 21);

  return (
    <section className="min-h-screen flex justify-center items-center w-full bg-white pt-32 pb-0 lg:pt-56 md:pb-12">
      <div className="container mx-auto px-6 flex flex-col items-center gap-y-18 md:gap-y-48">
        <div className="relative text-center">
          <motion.div
            className="flex items-center justify-center"
            variants={shouldAnimate ? headingVariants : undefined}
            initial={shouldAnimate ? "hidden" : { opacity: 1, y: 0, scale: 1 }}
            animate={shouldAnimate ? undefined : { opacity: 1, y: 0, scale: 1 }}
            whileInView={shouldAnimate ? "visible" : undefined}
            viewport={{ once: true }}
            style={
              shouldAnimate ? { willChange: "transform, opacity" } : undefined
            }
          >
            <h2
              className="text-4xl md:text-7xl font-bold font-aileron relative tracking-[-0.06em]"
              style={{ color: "#231f20" }}
            >
              Get{" "}
              <span className="relative inline-block align-middle -top-1">
                <Image
                  src="/images/NewCreator/heroPurpleRectangle.svg"
                  alt="Rectangle background"
                  fill
                  className="object-cover z-0"
                />
                <span className="relative z-10 px-2 py-1 text-white">
                  Brand Deals,
                </span>
              </span>
            </h2>
          </motion.div>
          <motion.h3
            className="text-4xl md:text-5xl font-baskerville font-[400] italic relative tracking-[-0.06em] mb-2 text-cc-onyx"
            variants={shouldAnimate ? subheadingVariants : undefined}
            initial={shouldAnimate ? "hidden" : { opacity: 1, y: 0 }}
            animate={shouldAnimate ? undefined : { opacity: 1, y: 0 }}
            whileInView={shouldAnimate ? "visible" : undefined}
            viewport={{ once: true }}
            style={
              shouldAnimate ? { willChange: "transform, opacity" } : undefined
            }
          >
            Get paid.
          </motion.h3>

          <motion.p
            className="text-sm md:text-xl max-w-3xl mx-auto relative font-aileron"
            style={{
              color: "#231f20",
              ...(shouldAnimate ? { willChange: "transform, opacity" } : {}),
            }}
            variants={shouldAnimate ? descriptionVariants : undefined}
            initial={shouldAnimate ? "hidden" : { opacity: 1, y: 0 }}
            animate={shouldAnimate ? undefined : { opacity: 1, y: 0 }}
            whileInView={shouldAnimate ? "visible" : undefined}
            viewport={{ once: true }}
          >
            Stop chasing opportunities. Let brands find
            <br /> you on Cult Creative.
          </motion.p>
        </div>
        <div className="relative flex flex-col justify-center items-center">
          <div className="z-10 flex flex-col justify-center items-center gap-0 md:gap-2">
            <div className="flex justify-center gap-2 md:gap-5 w-full pl-20">
              {row1.map((video, index) => (
                <Thumbnail
                  key={video.id}
                  videoData={video}
                  index={index}
                  rowIndex={0}
                  shouldAnimate={shouldAnimate}
                  eager
                  onClick={() => handleThumbnailClick(video)}
                />
              ))}
            </div>
            <div className="flex justify-center gap-2 md:gap-5 w-full">
              {row2.map((video, index) => (
                <Thumbnail
                  key={video.id}
                  videoData={video}
                  index={index}
                  rowIndex={1}
                  shouldAnimate={shouldAnimate}
                  onClick={() => handleThumbnailClick(video)}
                />
              ))}
            </div>
            <div className="flex justify-center gap-2 md:gap-5 w-full pr-20">
              {row3.map((video, index) => (
                <Thumbnail
                  key={video.id}
                  videoData={video}
                  index={index}
                  rowIndex={2}
                  shouldAnimate={shouldAnimate}
                  onClick={() => handleThumbnailClick(video)}
                />
              ))}
            </div>
          </div>
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none"
            variants={shouldAnimate ? overlayVariants : undefined}
            initial={shouldAnimate ? "hidden" : { opacity: 1 }}
            animate={shouldAnimate ? undefined : { opacity: 1 }}
            whileInView={shouldAnimate ? "visible" : undefined}
            viewport={{ once: true }}
          >
            <Image
              src="/images/NewCreator/radialBlur.svg"
              alt="Radial blur"
              fill
              className="object-cover"
            />
          </motion.div>
          {/* Iphone video player */}
          <motion.div
            ref={playerRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-52 h-auto md:w-80 lg:w-80 drop-shadow-2xl hover:cursor-default"
            variants={shouldAnimate ? iphoneVariants : undefined}
            initial={shouldAnimate ? "hidden" : { opacity: 1, scale: 1 }}
            animate={shouldAnimate ? undefined : { opacity: 1, scale: 1 }}
            whileInView={shouldAnimate ? "visible" : undefined}
            viewport={{ once: true }}
            style={
              shouldAnimate ? { willChange: "transform, opacity" } : undefined
            }
          >
            <div className="aspect-[9/19]">
              <Image
                src="/images/NewCreator/iphone.svg"
                alt="iPhone frame"
                fill
                sizes="(max-width: 768px) 240px, 270px"
                className="object-contain"
              />
              {activeVideo ? (
                <video
                  key={activeVideo.videoUrl}
                  className="absolute top-0 left-0 w-full h-full object-cover px-[5.5%] py-[9.5%] rounded-[40px] md:rounded-[60px]"
                  poster={posterSrc}
                  preload="auto"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={activeVideo.videoUrl} />
                </video>
              ) : (
                <div className="absolute top-0 left-0 w-full h-full px-[5.5%] py-[9.5%]">
                  <div className="relative w-full h-full overflow-hidden rounded-[40px] md:rounded-[60px]">
                    <Image
                      src={posterSrc}
                      alt={videoGallery[0].alt}
                      fill
                      sizes="(max-width: 768px) 208px, 320px"
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
        <motion.div
          className="flex justify-center mb-24 md:mb-28"
          variants={shouldAnimate ? ctaVariants : undefined}
          initial={shouldAnimate ? "hidden" : { opacity: 1, y: 0 }}
          animate={shouldAnimate ? undefined : { opacity: 1, y: 0 }}
          whileInView={shouldAnimate ? "visible" : undefined}
          viewport={{ once: true }}
          style={
            shouldAnimate ? { willChange: "transform, opacity" } : undefined
          }
        >
          <motion.a
            href="https://app.cultcreativeasia.com/auth/jwt/register"
            target="_blank"
            rel="noopener noreferrer"
            className="px-12 py-4 md:px-16 md:py-3 text-white font-semibold rounded-full text-xs md:text-lg font-aileron relative overflow-hidden inline-block"
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
              JOIN AS A CREATOR
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
        </motion.div>
      </div>
    </section>
  );
};

export default FirstSection;
