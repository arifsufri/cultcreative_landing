"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const FirstSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-white relative overflow-hidden pt-32 md:pt-64" style={{ backgroundColor: '#231f20' }}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Moving Gradient Blobs - Bigger Size */}
        <motion.div
          className="absolute opacity-40"
          style={{
            width: '800px',
            height: '600px',
            background: `radial-gradient(ellipse 400px 300px at 60% 40%, #1340ff, #855afe, transparent)`,
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            filter: 'blur(80px)',
            left: '-10%',
            top: '10%',
          }}
          animate={isMobile ? {
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
          } : {
            x: [0, 200, -150, 100, 0],
            y: [0, -100, 150, -80, 0],
            scale: [1, 1.4, 0.8, 1.2, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={isMobile ? {} : {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Circle 1 - #1340ff (blue) - Top Left */}
        <motion.div
          className="absolute w-80 h-80 rounded-full blur-3xl opacity-30"
          style={{
            background: '#1340ff',
            left: '10%',
            top: '10%',
          }}
          animate={isMobile ? {
            x: 0,
            y: 0,
            scale: 1,
          } : {
            x: [0, 200, 0],
            y: [0, 150, 0],
            scale: [1, 1.3, 1],
          }}
          transition={isMobile ? {} : {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Circle 2 - #1340ff (blue) - Top Right */}
        <motion.div
          className="absolute w-72 h-72 rounded-full blur-3xl opacity-28"
          style={{
            background: '#1340ff',
            right: '15%',
            top: '15%',
          }}
          animate={isMobile ? {
            x: 0,
            y: 0,
            scale: 1,
          } : {
            x: [0, -180, 0],
            y: [0, 120, 0],
            scale: [1, 1.2, 1],
          }}
          transition={isMobile ? {} : {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Circle 3 - #8a5afe (purple) - Bottom Left */}
        <motion.div
          className="absolute w-88 h-88 rounded-full blur-3xl opacity-32"
          style={{
            background: '#8a5afe',
            left: '20%',
            bottom: '20%',
          }}
          animate={isMobile ? {
            x: 0,
            y: 0,
            scale: 1,
          } : {
            x: [0, 150, 0],
            y: [0, -100, 0],
            scale: [1, 1.4, 1],
          }}
          transition={isMobile ? {} : {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Circle 4 - #8a5afe (purple) - Bottom Right */}
        <motion.div
          className="absolute w-76 h-76 rounded-full blur-3xl opacity-29"
          style={{
            background: '#8a5afe',
            right: '25%',
            bottom: '15%',
          }}
          animate={isMobile ? {
            x: 0,
            y: 0,
            scale: 1,
          } : {
            x: [0, -120, 0],
            y: [0, -80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={isMobile ? {} : {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />

        {/* Circle 5 - #a992df (light purple) - Center */}
        <motion.div
          className="absolute w-64 h-64 rounded-full blur-3xl opacity-35"
          style={{
            background: '#a992df',
            left: '45%',
            top: '40%',
          }}
          animate={isMobile ? {
            x: 0,
            y: 0,
            scale: 1,
          } : {
            x: [0, -50, 50, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.5, 1],
          }}
          transition={isMobile ? {} : {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
        
        {/* Stars positioned above "Creators" - responsive */}
        <div
          className="absolute"
          style={{
            top: '3%',
            right: '8%',
          }}
        >
          <img 
            src="/images/NewMain/stars.svg" 
            alt="decorative stars" 
            className="w-96 h-96 opacity-100 hidden md:block"
          />
        </div>

      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 flex-1 flex items-center justify-center">
        <div className="text-center max-w-6xl mx-auto">
          <motion.h1
            className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight text-white font-aileron"
            style={{ 
              textShadow: '0 4px 6px rgba(0, 0, 0, 0.25)',
              letterSpacing: '-0.05em'
            }}
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={isMobile ? {} : { duration: 0.8 }}
          >
            Connecting <span className="relative inline-block">Brands
            </span> With 
            <br />
            <span className="relative inline-block mb-8">Creators
              <img 
                src="/images/NewMain/curlyline.svg" 
                alt="decorative line" 
                className="absolute left-1/2 w-64 md:w-72"
                style={{ 
                  transform: isMobile ? 'translateX(-50%)' : 'translateX(-40%)',
                  bottom: isMobile ? '-1rem' : '-2rem'
                }}
              />
            </span> Who Move <span className="relative inline-block">Culture
            </span>
          </motion.h1>
          
          <motion.p
            className="text-base sm:text-xl md:text-3xl lg:text-4xl mb-8 md:mb-12 text-white leading-relaxed italic px-2"
            style={{ 
              fontFamily: '"Times New Roman", Times, serif',
              textShadow: '0 4px 6px rgba(0, 0, 0, 0.25)'
            }}
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={isMobile ? {} : { duration: 0.8, delay: 0.2 }}
          >
            SEA's Leading AI Platform for Content Collaboration
          </motion.p>

          <motion.div
            className="flex justify-center mb-12 md:mb-16"
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={isMobile ? {} : { duration: 0.8, delay: 0.4 }}
          >
            <Link href="https://app.cultcreativeasia.com/auth/jwt/login?returnTo=%2Fdashboard" target="_blank" rel="noopener noreferrer">
              <motion.button 
                className="px-8 md:px-16 py-2.5 md:py-3 text-white font-semibold rounded-full text-sm md:text-lg relative overflow-hidden cursor-pointer"
                style={{
                  backgroundColor: '#1340ff',
                  background: '#1340ff',
                  boxShadow: '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3), 0 8px 20px rgba(0, 0, 0, 0.2)',
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
                }}
                whileHover={isMobile ? {} : {
                  scale: 1.05,
                  background: '#1340ff',
                  boxShadow: '0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.6), 0 12px 30px rgba(0, 0, 0, 0.4)',
                  filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4))'
                }}
                transition={isMobile ? {} : { duration: 0.3 }}
              >
                <span className="flex items-center gap-2">
                  JOIN US NOW 
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
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Interactive Phone Images Section */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 pb-8 md:pb-8">
        <div className="flex justify-center items-center">
          <motion.div
            ref={ref}
            className="relative cursor-pointer w-full md:w-auto"
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={isMobile ? {} : { duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Default state - show only ipmid.svg with skew effect */}
            <motion.div
              className="relative flex justify-center items-center"
              animate={isMobile ? {
                scale: 1,
                skewX: 0,
                skewY: 0,
                opacity: isInView ? 0 : 1,
              } : {
                scale: isInView ? 0.5 : 1,
                skewX: isInView ? 58 : 0,
                skewY: isInView ? -15 : 0,
                opacity: isInView ? 0 : 1,
              }}
              transition={isMobile ? {} : { 
                duration: 0.4, 
                ease: [0.4, 0.0, 0.2, 1],
                delay: isInView ? 0 : 0.15
              }}
            >
              <img 
                src="/images/NewMain/ipmid.svg" 
                alt="Platform overview" 
                className="w-auto h-auto max-w-full max-h-[280px] md:max-h-[600px] mx-auto"
                style={{
                  height: 'auto',
                  filter: isInView ? 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))' : 'none',
                }}
              />
            </motion.div>

            {/* Scroll-triggered state - show all three images exactly like ip3d.svg */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={isMobile ? {
                opacity: isInView ? 1 : 0,
              } : {
                opacity: isInView ? 1 : 0,
              }}
              transition={isMobile ? {} : { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
              style={{ 
                perspective: '1200px',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Back image (ipbottom) - bottom center stacking */}
              <motion.div
                className="absolute"
                animate={isMobile ? {
                  x: 0,
                  y: 80,
                  scale: 1,
                  rotateX: 0,
                  rotateY: 0,
                  rotateZ: 0,
                } : {
                  x: isInView ? 0 : 0,
                  y: isInView ? 80 : 0,
                  scale: isInView ? 1.0 : 1,
                  rotateX: isInView ? 15 : 0,
                  rotateY: isInView ? 0 : 0,
                  rotateZ: isInView ? 0 : 0,
                }}
                transition={isMobile ? {} : { 
                  duration: 0.35, 
                  delay: 0.08, 
                  ease: [0.4, 0.0, 0.2, 1]
                }}
                style={{ 
                  transformOrigin: 'center center',
                  transformStyle: 'preserve-3d',
                  zIndex: 1,
                }}
              >
                 <img 
                   src="/images/NewMain/ipbottom1.svg" 
                   alt="Bottom analytics" 
                   className="w-full max-w-[280px] md:max-w-none md:w-[600px] h-auto"
                   style={{
                     height: 'auto'
                   }}
                 />
              </motion.div>

              {/* Middle image (ipmid) - center cascading */}
              <motion.div
                className="absolute"
                animate={isMobile ? {
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotateX: 0,
                  rotateY: 0,
                  rotateZ: 0,
                } : {
                  x: isInView ? 0 : 0,
                  y: isInView ? 0 : 0,
                  scale: isInView ? 1.0 : 1,
                  rotateX: isInView ? 15 : 0,
                  rotateY: isInView ? 0 : 0,
                  rotateZ: isInView ? 0 : 0,
                }}
                transition={isMobile ? {} : { 
                  duration: 0.35, 
                  delay: 0.12, 
                  ease: [0.4, 0.0, 0.2, 1]
                }}
                style={{
                  transformOrigin: 'center center',
                  transformStyle: 'preserve-3d',
                  zIndex: 10,
                }}
              >
                 <img 
                   src="/images/NewMain/ipmid1.png" 
                   alt="Platform overview" 
                   className="w-full max-w-[280px] md:max-w-none md:w-[600px] h-auto"
                   style={{
                     height: 'auto'
                   }}
                 />
              </motion.div>

              {/* Front image (iptop) - top center stacking */}
              <motion.div
                className="absolute"
                animate={isMobile ? {
                  x: 0,
                  y: -80,
                  scale: 1,
                  rotateX: 0,
                  rotateY: 0,
                  rotateZ: 0,
                } : {
                  x: isInView ? 0 : 0,
                  y: isInView ? -80 : 0,
                  scale: isInView ? 1.0 : 1,
                  rotateX: isInView ? 15 : 0,
                  rotateY: isInView ? 0 : 0,
                  rotateZ: isInView ? 0 : 0,
                }}
                transition={isMobile ? {} : { 
                  duration: 0.35, 
                  delay: 0.18, 
                  ease: [0.4, 0.0, 0.2, 1]
                }}
                style={{ 
                  transformOrigin: 'center center',
                  transformStyle: 'preserve-3d',
                  zIndex: 20,
                }}
              >
                 <img 
                   src="/images/NewMain/iptop1.svg" 
                   alt="Top engagement" 
                   className="w-full max-w-[280px] md:max-w-none md:w-[600px] h-auto"
                   style={{
                     height: 'auto'
                   }}
                 />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Brands section - "as seen on" */}
        <div className="mt-12 md:mt-16 flex flex-col items-center justify-center">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={isMobile ? {} : { duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full max-w-4xl"
          >
            {/* "as seen on" text for mobile */}
            <p className="text-white text-sm mb-4 md:hidden text-center">as seen on</p>
            <img 
              src="/images/NewMain/mullogos.svg" 
              alt="Brands" 
              className="w-full h-auto opacity-70"
            />
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default FirstSection;
