"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";
import useIsMobile from "@/app/[locale]/hooks/useIsMobile";

const FourthSection = () => {
  const [videoOrder, setVideoOrder] = useState([0, 1, 2, 3, 4]);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const isMobile = useIsMobile();
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const sectionRef = useRef(null);

  // Video data - Cult Creative brand videos
  const videos = [
    {
      id: 1,
      title: "Brand Video 1",
      creator: "Faizah",
      name: "Faizah",
      brand: "Dettol SG",
      quote: "Lazy people don't",
      videoUrl: "https://storage.googleapis.com/landing-cultcreative/main/v2/lp1.mp4",
      description: "Cult Creative brand video"
    },
    {
      id: 2,
      title: "Brand Video 2",
      creator: "Ainna",
      name: "Ainna",
      brand: "Binti's",
      quote: "Lazy people don't",
      videoUrl: "https://storage.googleapis.com/landing-cultcreative/main/v2/lp2.mp4",
      description: "Cult Creative brand video"
    },
    {
      id: 3,
      title: "Brand Video 3",
      creator: "Rachael",
      name: "Rachael",
      brand: "GMBB",
      quote: "Lazy people don't",
      videoUrl: "https://storage.googleapis.com/landing-cultcreative/main/v2/lp3.mp4",
      description: "Cult Creative brand video"
    },
    {
      id: 4,
      title: "Brand Video 4",
      creator: "Zairul Rusdi",
      name: "Zairul Rusdi",
      brand: "Barkath",
      quote: "Lazy people don't",
      videoUrl: "https://storage.googleapis.com/landing-cultcreative/main/v2/lp4.mp4",
      description: "Cult Creative brand video"
    },
    {
      id: 5,
      title: "Brand Video 5",
      creator: "Avanyeesh",
      name: "Avanyeesh",
      brand: "MAE Tabung 2",
      quote: "Lazy people don't",
      videoUrl: "https://storage.googleapis.com/landing-cultcreative/main/v2/lp5.mp4",
      description: "Cult Creative brand video"
    }
  ];

  // Trusted brands data
  const trustedBrands = [
    { name: "Bata", logo: "/images/NewMain/Brands/bata.svg" },
    { name: "Dettol", logo: "/images/NewMain/Brands/dettol.svg" },
    { name: "Grab", logo: "/images/NewMain/Brands/grab.svg" },
    { name: "Jameson", logo: "/images/NewMain/Brands/jameson.svg" },
    { name: "Longchamp", logo: "/images/NewMain/Brands/longchamp.svg" },
    { name: "Marriott", logo: "/images/NewMain/Brands/marriott.svg" },
    { name: "Maybank", logo: "/images/NewMain/Brands/maybank.svg" },
    { name: "Nespresso", logo: "/images/NewMain/Brands/nespresso.svg" },
    { name: "Samsung", logo: "/images/NewMain/Brands/samsung.svg" },
    { name: "Shopee", logo: "/images/NewMain/Brands/shopee.svg" },
    { name: "Sunway Malls", logo: "/images/NewMain/Brands/sunwaymalls.svg" },
    { name: "Taco Bell", logo: "/images/NewMain/Brands/tacobell.svg" },
    { name: "The Body Shop", logo: "/images/NewMain/Brands/thebodyshop.svg" },
    { name: "Uniqlo", logo: "/images/NewMain/Brands/uniqlo.svg" },
    { name: "Universal", logo: "/images/NewMain/Brands/universal.svg" }
  ];

  const reorderMap = {
    1: [2, 3, 1, 4, 5],
    2: [3, 5, 2, 1, 4],
    3: [4, 1, 3, 5, 2],
    4: [5, 1, 4, 2, 3],
    5: [3, 2, 5, 1, 4],
  };

  const convertTo0Based = (oneBasedArray) => {
    return oneBasedArray.map(num => num - 1);
  };

  const handleVideoClick = (clickedVideoId) => {
    const clickedIndex = clickedVideoId - 1;
    const currentCenterIndex = videoOrder[2];
    if (clickedIndex === currentCenterIndex) return;

    let newOrder;

    if (reorderMap[clickedVideoId]) {
      const mappedOrder = reorderMap[clickedVideoId];
      newOrder = convertTo0Based(mappedOrder);
    } else {
      const clickedCurrentPosition = videoOrder.indexOf(clickedIndex);
      const stepsToCenter = clickedCurrentPosition - 2;

      newOrder = [...videoOrder];
      if (stepsToCenter !== 0) {
        const rotations = stepsToCenter > 0
          ? Array(Math.abs(stepsToCenter)).fill(0).map(() => (prevIdx) => (prevIdx + 1) % 5)
          : Array(Math.abs(stepsToCenter)).fill(0).map(() => (prevIdx) => (prevIdx + 4) % 5);

        rotations.forEach((fn) => {
          newOrder = newOrder.map(fn);
        });
      }
    }

    setVideoOrder(newOrder);
  };

  const getVideoPosition = (videoIndex) => {
    const positionInOrder = videoOrder.indexOf(videoIndex);
    const positions = ["left", "left1", "center", "right1", "right"];
    return positions[positionInOrder];
  };

  const isCenterVideo = (videoIndex) => {
    return videoOrder[2] === videoIndex;
  };

  // Mobile swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      setCurrentMobileIndex((prev) => (prev + 1) % videos.length);
    } else if (distance < -minSwipeDistance) {
      setCurrentMobileIndex((prev) => (prev - 1 + videos.length) % videos.length);
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const goToSlide = (index) => {
    setCurrentMobileIndex(index);
  };

  return (
    <LazyMotion features={domAnimation}>
      <section ref={sectionRef} className="relative bg-white py-20 overflow-hidden" style={{ contain: 'content' }}>
        {/* Trusted By Section */}
        <div className="container mx-auto px-6 mb-36">
          <m.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-aileron relative z-10" style={{ color: '#231F20', letterSpacing: '-0.06em' }}>
              Trusted By
              <Image
                src="/images/NewMain/trustedunderlined.svg"
                alt="Trusted By underline"
                width={320}
                height={20}
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-80 z-0"
                loading="lazy"
              />
            </h2>
          </m.div>

          {/* Moving Brands */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll" style={{ width: 'max-content' }}>
              <div className="flex shrink-0">
                {trustedBrands.map((brand, index) => (
                  <div key={`set1-${index}`} className="shrink-0 mx-6">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={120}
                      height={40}
                      className="h-10 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              <div className="flex shrink-0">
                {trustedBrands.map((brand, index) => (
                  <div key={`set2-${index}`} className="shrink-0 mx-6">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={120}
                      height={40}
                      className="h-10 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }

            .animate-scroll {
              animation: scroll 20s linear infinite;
              display: flex;
            }
          `}</style>
        </div>

        {/* Main Hero Content */}
        <div className="container mx-auto md:px-6">
          <div className="text-center mb-16">
            <m.h1
              className="text-4xl md:text-6xl text-black mb-8 relative leading-none"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-serif italic" style={{ fontFamily: 'Times New Roman, serif', letterSpacing: '-0.04em' }}>
                Where creators win,
              </span>
              <br />
              <span className="relative font-aileron font-bold" style={{ letterSpacing: '-0.06em' }}>
                And Brands
                <span className="relative inline-block">
                  <Image
                    src="/images/NewMain/bluerectangle.svg"
                    alt="Blue rectangle background"
                    width={212}
                    height={64}
                    className="absolute inset-0 w-53 h-16 object-cover left-1"
                    loading="lazy"
                  />
                  <Image
                    src="/images/NewMain/blueflowers.svg"
                    alt="Blue flowers decoration"
                    width={80}
                    height={48}
                    className="absolute -top-20 left-40 md:left-40 w-20 h-12 z-10 md:block hidden"
                    loading="lazy"
                  />
                  {/* Mobile flowers - moved more to the right */}
                  <Image
                    src="/images/NewMain/blueflowers.svg"
                    alt="Blue flowers decoration mobile"
                    width={80}
                    height={48}
                    className="absolute -top-20 right-0 w-20 h-12 z-10 md:hidden block"
                    loading="lazy"
                  />
                  <span className="relative text-white px-4 py-2 font-bold -ml-2">Want In.</span>
                </span>
              </span>
            </m.h1>
          </div>

          {/* Video Carousel with Smooth Reordering */}
          <div className="py-20">
            <div className="w-full">
              {/* Desktop Layout */}
              <div className="hidden md:flex justify-center items-center relative h-[500px] max-w-7xl mx-auto">
                {videos.map((video, index) => {
                  const videoId = index + 1;
                  const currentPosition = getVideoPosition(index);
                  const isCenter = isCenterVideo(index);

                  const positionVariants = {
                    center: { x: 0, scale: 1.1, zIndex: 5, y: -35 },
                    left1: { x: -380, scale: 0.9, zIndex: 3, y: -15 },
                    left: { x: -700, scale: 0.9, zIndex: 2, y: -15 },
                    right1: { x: 380, scale: 0.9, zIndex: 3, y: -15 },
                    right: { x: 700, scale: 0.9, zIndex: 2, y: -15 },
                  };

                  return (
                    <m.div
                      key={video.id}
                      className="relative cursor-pointer"
                      layout
                      initial="center"
                      animate={currentPosition}
                      variants={positionVariants}
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                        layout: { duration: 0.6 }
                      }}
                      onClick={() => handleVideoClick(videoId)}
                      style={{
                        width: "300px",
                        height: "400px",
                        position: "absolute"
                      }}
                    >
                      <div className={`relative rounded-3xl overflow-hidden transition-all duration-300 ${
                        isCenter ? 'shadow-2xl' : ''
                      }`}>
                        {/* Video Element */}
                        <div className="aspect-9/16 bg-gray-200 flex items-center justify-center relative">
                          <video
                            className="w-full h-full object-cover"
                            autoPlay={isCenter}
                            muted
                            loop={isCenter}
                            playsInline
                            controls={false}
                            preload={isCenter ? "auto" : "metadata"}
                            ref={(el) => {
                              if (el) {
                                if (isCenter) {
                                  el.currentTime = 0;
                                  el.play().catch(() => {});
                                } else {
                                  el.pause();
                                }
                              }
                            }}
                          >
                            <source src={video.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>

                          {/* Bottom Overlay with Brand and Creator - Only show on center video */}
                          {isCenter && (
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                              <h3 className="text-white font-aileron font-bold capitalize" style={{ fontSize: '33.87px', lineHeight: '40px', letterSpacing: '-0.06em' }}>
                                {video.brand}
                              </h3>
                              <p className="text-white/90 italic" style={{ fontFamily: 'Times New Roman, serif', fontSize: '21.17px', lineHeight: '38.11px', letterSpacing: '-0.04em', fontWeight: 400 }}>
                                {video.name}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </m.div>
                  );
                })}
              </div>

              {/* Mobile Layout - Swipeable Carousel with Side Peek */}
              <div
                className="md:hidden relative w-full"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div className="relative h-[600px] w-full overflow-x-clip">
                  <m.div
                    className="flex h-full items-center"
                    style={{
                      paddingLeft: 'calc(50vw - 170px)',
                      paddingRight: 'calc(50vw - 170px)',
                    }}
                    animate={{
                      x: `-${currentMobileIndex * 340}px`,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    {videos.map((video, index) => (
                      <div
                        key={video.id}
                        className="shrink-0 px-2.5"
                        style={{ width: "340px" }}
                      >
                        <div
                          className={`relative rounded-[32px] overflow-hidden transition-all duration-300 ${
                            index === currentMobileIndex ? 'shadow-2xl scale-100' : 'shadow-lg scale-90 opacity-60'
                          }`}
                          style={{ width: "320px", height: "550px" }}
                          onClick={() => setCurrentMobileIndex(index)}
                        >
                          <div className="relative bg-gray-200 w-full h-full">
                            <video
                              className="w-full h-full object-cover"
                              autoPlay={index === currentMobileIndex}
                              muted
                              loop={index === currentMobileIndex}
                              playsInline
                              controls={false}
                              preload={index === currentMobileIndex ? "auto" : "metadata"}
                              ref={(el) => {
                                if (el) {
                                  if (index === currentMobileIndex) {
                                    el.currentTime = 0;
                                    el.play().catch(() => {});
                                  } else {
                                    el.pause();
                                  }
                                }
                              }}
                            >
                              <source src={video.videoUrl} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>

                            {/* Bottom Overlay with Brand and Creator */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                              <h3 className="text-white font-aileron font-bold capitalize" style={{ fontSize: '33.87px', lineHeight: '40px', letterSpacing: '-0.06em' }}>
                                {video.brand}
                              </h3>
                              <p className="text-white/90 italic" style={{ fontFamily: 'Times New Roman, serif', fontSize: '21.17px', lineHeight: '38.11px', letterSpacing: '-0.04em', fontWeight: 400 }}>
                                {video.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </m.div>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-2 mt-6">
                  {videos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentMobileIndex
                          ? "bg-black w-8"
                          : "bg-gray-300"
                      }`}
                      aria-label={`Go to video ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </LazyMotion>
  );
};

export default FourthSection;
