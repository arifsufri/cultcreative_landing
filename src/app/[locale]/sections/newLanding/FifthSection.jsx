"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import useIsMobile from "@/app/[locale]/hooks/useIsMobile";

const FifthSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useIsMobile();
  const [hoveredCard, setHoveredCard] = useState(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    // Preload tilt images for smooth transitions
    const tiltImages = [
      '/images/NewMain/Quote 1 Tilt.svg',
      '/images/NewMain/Quote 2 Tilt.svg',
      '/images/NewMain/Quote 3 Tilt.svg'
    ];
    tiltImages.forEach(src => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  const testimonials = [
    {
      id: 1,
      text: "The **responsiveness** of the team was **exceptional**. They took great initiative to understand our brand, address our pain points, and **meet our needs**.",
      author: "Aniyl Selvam",
      company: "**Aloft Kuala Lumpur Sentral**",
      svgImage: "/images/NewMain/Quote (1).svg",
    },
    {
      id: 2,
      text: "Cult Creative helped **streamline** the process for us by handling the sourcing and coordination of influencers, making our campaigns **efficient** and **quick**.",
      author: "Nasya-Ann Appaduray, **RAEA**.",
      company: "",
      svgImage: "/images/NewMain/Quote (2).svg",
    },
    {
      id: 3,
      text: "We love the **price** package and **flexibility**!",
      author: "Sabrina Salehuddin, **BATA**.",
      company: "",
      svgImage: "/images/NewMain/Quote (3).svg",
    },
  ];

  // Handle touch events for swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSlide < testimonials.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <LazyMotion features={domAnimation}>
      <section className="bg-white py-20" style={{ contain: 'content' }}>
        <div className="container mx-auto px-6">
          {/* Header */}
          <m.div
            className="text-left mb-20 max-w-4xl ml-10 hidden md:block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className="mb-0"
              style={{
                fontFamily: "Aileron, sans-serif",
                fontWeight: 700,
                fontSize: "64px",
                lineHeight: "73px",
                letterSpacing: "-0.06em",
                textTransform: "capitalize",
                color: "#231F20",
              }}
            >
              Don&apos;t Take Our Word For
              <span className="relative inline-block">
                &nbsp;It.
                <Image
                  src="/images/NewMain/forit.svg"
                  alt="For It decoration"
                  width={48}
                  height={40}
                  className="absolute -top-4 left-8 w-12 h-10"
                  loading="lazy"
                />
              </span>
            </h2>
            <p
              style={{
                fontFamily: "Times New Roman, serif",
                fontWeight: 100,
                fontStyle: "italic",
                fontSize: "64px",
                lineHeight: "86.5px",
                letterSpacing: "-0.04em",
                color: "#231F20",
                marginTop: "-20px",
              }}
            >
              See what they&apos;re saying.
            </p>
          </m.div>

          {/* Mobile Header */}
          <m.div
            className="text-left mb-8 px-4 md:hidden"
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{}}
            viewport={{ once: true }}
          >
            <h2
              className="mb-0 relative"
              style={{
                fontFamily: "Aileron, sans-serif",
                fontWeight: 700,
                fontSize: "32px",
                lineHeight: "38px",
                letterSpacing: "-0.06em",
                textTransform: "capitalize",
                color: "#231F20",
              }}
            >
              Don&apos;t Take Our Word For
              <span className="relative inline-block">
                &nbsp;It.
                <Image
                  src="/images/NewMain/singlestar.svg"
                  alt="Star decoration"
                  width={24}
                  height={20}
                  className="absolute -top-2 left-6 w-6 h-5"
                  loading="lazy"
                />
              </span>
            </h2>
            <p
              style={{
                fontFamily: "Times New Roman, serif",
                fontWeight: 100,
                fontStyle: "italic",
                fontSize: "20px",
                lineHeight: "27px",
                letterSpacing: "-0.04em",
                color: "#231F20",
                marginTop: "4px",
              }}
            >
              See what they&apos;re saying.
            </p>
          </m.div>

          {/* Desktop Testimonials Grid */}
          <div className="hidden md:flex justify-center items-center gap-10 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <m.div
                key={testimonial.id}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredCard(testimonial.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ perspective: "1000px" }}
              >
                <m.img
                  src={hoveredCard === testimonial.id
                    ? `/images/NewMain/Quote ${testimonial.id} Tilt.svg`
                    : testimonial.svgImage
                  }
                  alt={`Testimonial ${testimonial.id}`}
                  className={`${
                    testimonial.id === 1
                      ? "w-[460px] h-[460px] translate-y-4"
                      : testimonial.id === 3
                      ? "w-[400px] h-[400px] translate-y-2"
                      : "w-[400px] h-[400px]"
                  } ${hoveredCard === testimonial.id ? "scale-125" : ""}`}
                  animate={hoveredCard === testimonial.id ? {
                    rotateY: 5,
                    rotateZ: 3
                  } : {
                    rotateY: 0,
                    rotateZ: 0
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut"
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                />
              </m.div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div
              className="relative mx-auto max-w-sm"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Carousel Container */}
              <div className="relative overflow-hidden">
                <m.div
                  className="flex"
                  animate={{
                    x: `-${currentSlide * 100}%`,
                  }}
                  transition={isMobile ? {} : {
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="w-full shrink-0 px-4 flex justify-center items-center"
                      style={{
                        marginLeft: testimonial.id === 1 ? '-20px' : testimonial.id === 2 ? '20px' : '0px'
                      }}
                    >
                      <Image
                        src={testimonial.svgImage}
                        alt={`Testimonial ${testimonial.id}`}
                        width={350}
                        height={350}
                        className={testimonial.id === 1 ? "w-full h-auto object-contain scale-110" : "w-full h-auto object-contain"}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </m.div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? "bg-black w-8"
                        : "bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default FifthSection;
