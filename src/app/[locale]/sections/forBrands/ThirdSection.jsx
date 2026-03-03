"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

// SVG Filter for liquid glass effect - full surface refraction like real glass
const LiquidGlassFilter = () => (
  <svg style={{ position: "absolute", width: 0, height: 0 }}>
    <defs>
      <filter
        id="liquid-glass-edge"
        x="-50%"
        y="-50%"
        width="200%"
        height="200%"
      >
        {/* Organic fractal noise for glass-like distortion pattern */}
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.01"
          numOctaves="2"
          seed="42"
          result="turbulence"
        />

        {/* Light blur for smooth refraction transitions */}
        <feGaussianBlur in="turbulence" stdDeviation="2" result="blurred" />

        {/* Apply glass-like displacement across entire surface */}
        <feDisplacementMap
          in="SourceGraphic"
          in2="blurred"
          scale="55"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
  </svg>
);

// Info Card Component with liquid glass effect and elastic hover
const InfoCard = ({
  title,
  description,
  icon,
  position,
  animationDirection,
  delay = 0,
  isMobile,
  cardWidth,
  cardMinHeight,
  screenSize,
}) => {
  // Responsive border radius
  const getBorderRadius = () => {
    if (screenSize === "mobile") return "24px";
    if (screenSize === "tablet-small") return "26px";
    if (screenSize === "tablet") return "28px";
    return "32px";
  };
  const borderRadius = getBorderRadius();

  // Responsive font sizes
  const getTitleSize = () => {
    if (screenSize === "mobile") return "20px";
    if (screenSize === "tablet-small") return "22px";
    if (screenSize === "tablet") return "26px";
    if (screenSize === "desktop-small") return "28px";
    return "32px";
  };

  const getDescriptionSize = () => {
    if (screenSize === "mobile") return "13px";
    if (screenSize === "tablet-small") return "14px";
    if (screenSize === "tablet") return "15px";
    if (screenSize === "desktop-small") return "16px";
    return "18px";
  };

  const getIconSize = () => {
    if (screenSize === "mobile") return "20px";
    if (screenSize === "tablet-small") return "22px";
    if (screenSize === "tablet") return "24px";
    return "28px";
  };

  const getPadding = () => {
    if (screenSize === "mobile") return "18px 20px";
    if (screenSize === "tablet-small") return "20px 22px";
    if (screenSize === "tablet") return "22px 26px";
    if (screenSize === "desktop-small") return "24px 28px";
    return "28px 32px";
  };
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const isFromLeft = animationDirection === "left";

  // Motion values for cursor tracking (normalized -1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for bouncy overshoot
  const springConfig = { stiffness: 300, damping: 20, mass: 0.8 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Elastic transforms - 3D tilt (8 degrees max)
  const rotateX = useTransform(springY, [-1, 1], [8, -8]);
  const rotateY = useTransform(springX, [-1, 1], [-8, 8]);

  // Subtle scale stretch (5% max based on distance from center)
  const scale = useTransform(
    [springX, springY],
    ([x, y]) => 1 + Math.sqrt(x * x + y * y) * 0.05,
  );

  // Cursor blob highlight position (percentage)
  const blobX = useTransform(springX, [-1, 1], [20, 80]);
  const blobY = useTransform(springY, [-1, 1], [20, 80]);

  // Surface reflection position
  const reflectionX = useTransform(springX, [-1, 1], [0, 100]);

  // Glow intensification based on cursor distance
  const distance = useTransform([springX, springY], ([x, y]) =>
    Math.sqrt(x * x + y * y),
  );
  const glowOpacity = useTransform(distance, [0, 1], [0.45, 0.75]);
  const shadowSpread = useTransform(distance, [0, 1], [0, 15]);

  // Responsive blob size
  const getBlobSize = () => {
    if (screenSize === "mobile") return "130px";
    if (screenSize === "tablet-small") return "150px";
    if (screenSize === "tablet") return "170px";
    if (screenSize === "desktop-small") return "185px";
    return "200px";
  };

  // Dynamic background for cursor blob
  const blobBackground = useMotionTemplate`radial-gradient(${getBlobSize()} circle at ${blobX}% ${blobY}%, rgba(255,255,255,0.25) 0%, transparent 70%)`;

  // Dynamic background for surface reflection
  const reflectionBackground = useMotionTemplate`linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.15) ${reflectionX}%, transparent 100%)`;

  // Dynamic border style
  const borderStyle = useMotionTemplate`1.5px solid rgba(255, 255, 255, ${glowOpacity})`;

  // Dynamic box shadow
  const boxShadowStyle = useMotionTemplate`inset 0 1px 2px rgba(255, 255, 255, 0.3), 0 8px 32px rgba(31, 38, 135, 0.15), 0 0 ${shadowSpread}px rgba(255, 255, 255, 0.2)`;

  // Mouse event handlers
  const handleMouseMove = (event) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const normalizedX = Math.max(
      -1,
      Math.min(1, (event.clientX - centerX) / (rect.width / 2)),
    );
    const normalizedY = Math.max(
      -1,
      Math.min(1, (event.clientY - centerY) / (rect.height / 2)),
    );
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Touch event handlers for mobile
  const handleTouchMove = (event) => {
    if (!cardRef.current || event.touches.length === 0) return;
    const touch = event.touches[0];
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const normalizedX = Math.max(
      -1,
      Math.min(1, (touch.clientX - centerX) / (rect.width / 2)),
    );
    const normalizedY = Math.max(
      -1,
      Math.min(1, (touch.clientY - centerY) / (rect.height / 2)),
    );
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleTouchEnd = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Slide-in animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      x: isFromLeft ? -120 : 120,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
        delay: delay,
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      className="absolute"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        ...position,
        borderRadius: borderRadius,
        width: cardWidth,
        minHeight: cardMinHeight,
        perspective: "1000px",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Elastic card container with 3D transforms */}
      <motion.div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: borderRadius,
          overflow: "hidden",
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
          scale,
        }}
      >
        {/* Liquid glass distortion - full surface refraction effect */}
        <div
          style={{
            position: "absolute",
            inset: "-20px",
            backdropFilter: "blur(3px) saturate(120%)",
            WebkitBackdropFilter: "blur(3px) saturate(120%)",
            filter: "url(#liquid-glass-edge)",
          }}
        />

        {/* Tinted overlay - brand blue at 20% opacity */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(19, 64, 255, 0.20)",
            borderRadius: borderRadius,
          }}
        />

        {/* Cursor blob highlight */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: borderRadius,
            background: blobBackground,
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* Surface reflection */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: borderRadius,
            background: reflectionBackground,
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* Subtle top reflection for glass feel */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "40%",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 100%)",
            borderRadius: `${borderRadius} ${borderRadius} 0 0`,
            pointerEvents: "none",
            zIndex: 3,
          }}
        />

        {/* Animated border and shadow with glow intensification */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: borderRadius,
            border: borderStyle,
            boxShadow: boxShadowStyle,
            pointerEvents: "none",
            zIndex: 4,
          }}
        />

        {/* Content layer with padding */}
        <div
          style={{
            position: "relative",
            zIndex: 5,
            padding: getPadding(),
          }}
        >
          {/* Icon + Title on same line */}
          <div
            className="flex items-center gap-2 mb-2"
            style={{ marginBottom: isMobile ? "8px" : "12px" }}
          >
            <span style={{ fontSize: getIconSize() }}>{icon}</span>
            <h3
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: getTitleSize(),
                lineHeight: 1.1,
                letterSpacing: "-0.04em",
                color: "#ffffff",
                textShadow:
                  "0 2px 4px rgba(0, 0, 0, 0.5), 0 4px 12px rgba(0, 0, 0, 0.3)",
              }}
            >
              {title}
            </h3>
          </div>

          {/* Description */}
          <p
            style={{
              fontFamily: "Aileron, sans-serif",
              fontWeight: 400,
              fontSize: getDescriptionSize(),
              lineHeight: 1.5,
              color: "#ffffff",
              textShadow:
                "0 1px 3px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            {description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ThirdSection = () => {
  const [screenSize, setScreenSize] = useState("desktop");
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      if (width < 480) {
        setScreenSize("mobile");
      } else if (width < 768) {
        setScreenSize("tablet-small");
      } else if (width < 1024) {
        setScreenSize("tablet");
      } else if (width < 1280) {
        setScreenSize("desktop-small");
      } else {
        setScreenSize("desktop");
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const isMobile = screenSize === "mobile" || screenSize === "tablet-small";

  // Responsive card dimensions using viewport-relative calculations
  const getCardWidth = () => {
    if (windowWidth < 480) return "min(220px, 58vw)";
    if (windowWidth < 768) return "min(260px, 42vw)";
    if (windowWidth < 1024) return "min(300px, 35vw)";
    if (windowWidth < 1280) return "min(320px, 28vw)";
    return "360px";
  };

  const getCardMinHeight = () => {
    if (windowWidth < 480) return "120px";
    if (windowWidth < 768) return "130px";
    if (windowWidth < 1024) return "140px";
    return "160px";
  };

  // Responsive container dimensions
  const getContainerMaxWidth = () => {
    if (windowWidth < 480) return "100%";
    if (windowWidth < 768) return "95%";
    if (windowWidth < 1024) return "90%";
    return "1200px";
  };

  const getContainerHeight = () => {
    if (windowWidth < 480) return "580px";
    if (windowWidth < 768) return "620px";
    if (windowWidth < 1024) return "680px";
    if (windowWidth < 1280) return "720px";
    return "750px";
  };

  // Responsive laptop width
  const getLaptopWidth = () => {
    if (windowWidth < 480) return "min(340px, 85vw)";
    if (windowWidth < 768) return "min(380px, 60vw)";
    if (windowWidth < 1024) return "min(450px, 50vw)";
    if (windowWidth < 1280) return "min(550px, 48vw)";
    return "650px";
  };

  // Responsive card positions based on screen size
  // Mobile: cards positioned closer together around laptop
  const getCardPosition = (cardId) => {
    const positions = {
      signup: {
        mobile: { top: "0%", left: "3%" },
        "tablet-small": { top: "0%", left: "3%" },
        tablet: { top: "2%", left: "3%" },
        "desktop-small": { top: "0%", left: "6%" },
        desktop: { top: "0%", left: "10%" },
      },
      matched: {
        mobile: { top: "22%", right: "3%" },
        "tablet-small": { top: "20%", right: "3%" },
        tablet: { top: "10%", right: "3%" },
        "desktop-small": { top: "10%", right: "6%" },
        desktop: { top: "10%", right: "10%" },
      },
      review: {
        mobile: { top: "44%", left: "3%" },
        "tablet-small": { top: "42%", left: "3%" },
        tablet: { top: "45%", left: "3%" },
        "desktop-small": { top: "48%", left: "5%" },
        desktop: { top: "48%", left: "8%" },
      },
      results: {
        mobile: { top: "72%", right: "3%" },
        "tablet-small": { top: "68%", right: "3%" },
        tablet: { bottom: "8%", right: "3%" },
        "desktop-small": { bottom: "10%", right: "6%" },
        desktop: { bottom: "10%", right: "10%" },
      },
    };
    return positions[cardId][screenSize] || positions[cardId].desktop;
  };

  // Card data - positioned closer to center around the laptop
  // Sign Up & Get Matched appear together (delay 0.2), Review & Get Results appear together (delay 0.6)
  const cards = [
    {
      id: "signup",
      title: "Sign Up",
      description: "Create your account and submit your campaign brief.",
      icon: "✏️",
      animationDirection: "left",
      delay: 0.2,
      position: getCardPosition("signup"),
    },
    {
      id: "matched",
      title: "Get Matched",
      description:
        "We match you with creators that fit your brand and audience.",
      icon: "🤝",
      animationDirection: "right",
      delay: 0.2,
      position: getCardPosition("matched"),
    },
    {
      id: "review",
      title: "Review",
      description:
        "Review creators and content while our team manages the rest.",
      icon: "🔍",
      animationDirection: "left",
      delay: 0.6,
      position: getCardPosition("review"),
    },
    {
      id: "results",
      title: "Get Results",
      description: "Track results in real-time and scale what works.",
      icon: "📊",
      animationDirection: "right",
      delay: 0.6,
      position: getCardPosition("results"),
    },
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      {/* SVG Filter Definition */}
      <LiquidGlassFilter />

      <div className="container mx-auto px-6">
        {/* Title Section */}
        <div className="text-left mb-8 md:mb-16 ml-4 md:ml-8">
          <h2
            className="mb-2 md:mb-4"
            style={{
              fontFamily: "Aileron",
              fontWeight: 700,
              fontSize: isMobile ? "36px" : "58.32px",
              lineHeight: isMobile ? "38px" : "57.86px",
              letterSpacing: "-0.06em",
              textTransform: "capitalize",
              color: "#231f20",
            }}
          >
            Launch Creator Campaigns In
          </h2>
          <h2
            className="mb-4"
            style={{
              fontFamily: "Aileron",
              fontWeight: 700,
              fontSize: isMobile ? "36px" : "58.32px",
              lineHeight: isMobile ? "38px" : "57.86px",
              letterSpacing: "-0.06em",
              textTransform: "capitalize",
              color: "#231f20",
            }}
          >
            <span
              className="text-white px-2 py-1 rounded"
              style={{
                backgroundColor: "#1340ff",
                fontFamily: "Aileron",
                fontWeight: 700,
              }}
            >
              4 Steps.
            </span>
          </h2>
        </div>

        {/* Laptop + Floating Cards Container */}
        <div
          className="relative mx-auto flex items-center justify-center"
          style={{
            width: "100%",
            maxWidth: getContainerMaxWidth(),
            height: getContainerHeight(),
          }}
        >
          {/* Laptop - centered in container, drops from top with multi-bounce effect */}
          <motion.div
            initial={{ opacity: 0, y: -200 }}
            whileInView={{
              opacity: 1,
              y: [null, 0, -30, 0, -12, 0, -4, 0],
            }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              opacity: { duration: 0.3 },
              y: {
                duration: 1.2,
                times: [0, 0.4, 0.55, 0.7, 0.8, 0.88, 0.94, 1],
                ease: "easeOut",
              },
            }}
            className="relative"
            style={{
              width: getLaptopWidth(),
              zIndex: 1,
            }}
          >
            <img
              src="/images/NewMain/cmme_laptop.svg"
              alt="Creator Marketing Platform Dashboard"
              className="w-full h-auto"
              style={{
                filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))",
              }}
            />
          </motion.div>

          {/* Floating Info Cards - glassmorphism cards positioned around the centered laptop */}
          {cards.map((card) => (
            <InfoCard
              key={card.id}
              title={card.title}
              description={card.description}
              icon={card.icon}
              position={{ ...card.position, zIndex: 10 }}
              animationDirection={card.animationDirection}
              delay={card.delay}
              isMobile={isMobile}
              cardWidth={getCardWidth()}
              cardMinHeight={getCardMinHeight()}
              screenSize={screenSize}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12 md:mt-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-12 py-4 text-white font-bold rounded-full text-lg relative overflow-hidden cursor-pointer"
            style={{
              backgroundColor: "#1340ff",
              background: "linear-gradient(135deg, #1340ff 0%, #0d2eb8 100%)",
              boxShadow: "0 8px 25px rgba(19, 64, 255, 0.3)",
              fontFamily: "Aileron",
              fontWeight: 700,
            }}
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
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default ThirdSection;
