"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const SecondSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const features = [
    {
      title: "All-In-One Platform",
      description: "Simplifying the way creators and brands connect",
      image: "/images/NewMain/iphonestatic.svg",
    },
    {
      title: "Data-Based Results",
      description: "Real-time data to see how your content or campaign is performing",
      image: "/images/NewMain/tilt2.svg",
    },
    {
      title: "Tailored Recommendations",
      description: "Expert recommendations to maximise chances of success",
      image: "/images/NewMain/tilt3.svg",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

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
      // Swipe left - next slide
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      // Swipe right - previous slide
      prevSlide();
    }

    // Reset
    touchStartX.current = 0;
    touchEndX.current = 0;
  };
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={isMobile ? {} : { duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-4xl md:text-5xl font-bold font-aileron relative" style={{ color: '#231f20', letterSpacing: '-0.06em' }}>
              <img 
                src="/images/NewMain/what.svg" 
                alt="What decoration" 
                className="absolute -top-6 -left-12 w-10 h-10"
              />
              What <span className="relative">
                <img 
                  src="/images/NewMain/rectangle.svg" 
                  alt="Rectangle background" 
                  className="absolute top-4 left-10 w-3/4 h-3/4 object-cover"
                />
                <span className="relative px-2 py-1">We Do.</span>
              </span>
            </h2>
          </div>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto relative font-aileron">
            Cult Creative is the <strong className="text-black font-bold">all-in-one portal</strong> for <strong className="relative text-black font-bold">creators
              <img 
                src="/images/NewMain/creatoru.svg" 
                alt="Creator underline" 
                className="absolute -bottom-1 left-0 w-full h-auto"
              />
            </strong> and <strong className="relative text-black font-bold">brands
              <img 
                src="/images/NewMain/brandu.svg" 
                alt="Brand underline" 
                className="absolute -bottom-1 left-0 w-full h-auto"
              />
            </strong> <br />
            to seamlessly work, collaborate, and elevate.
          </p>
        </motion.div>

        {/* Mobile Carousel */}
        <div className="md:hidden max-w-md mx-auto">
          <div 
            className="relative overflow-hidden rounded-xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              className="flex"
              animate={{ x: `-${(currentSlide * 100) / features.length}%` }}
              transition={isMobile ? {} : { 
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              style={{ width: `${features.length * 100}%` }}
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="text-center flex-shrink-0"
                  style={{ width: `calc(100% / ${features.length})` }}
                >
                  <div className="rounded-xl p-8" style={{ backgroundColor: '#F4F4F4' }}>
                    <div className="relative mx-auto mb-6 max-w-[200px]">
                      <img 
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="min-h-[80px] flex flex-col justify-center">
                      <h3 className="text-xl text-black mb-2" style={{ fontFamily: 'Inter Display, sans-serif' }}>
                        {feature.title}
                      </h3>
                      <p 
                        className="text-gray-600 text-sm" 
                        style={{ fontFamily: 'Inter Display, sans-serif' }}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-[#231f20] w-8' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid - Three Phone Features */}
        <div className="hidden md:grid grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* All-In-One Platform */}
          <motion.div
            className="text-center group"
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{}}
            viewport={{ once: true }}
          >
              <div className="rounded-xl p-8 transition-all duration-300 cursor-pointer group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-purple-600" style={{ backgroundColor: '#F4F4F4' }}>
                <div className="relative mx-auto mb-6 max-w-[200px]">
                  <img 
                    src="/images/NewMain/iphonestatic.svg" 
                    alt="All-In-One Platform" 
                    className="w-full h-auto transform rotate-12 group-hover:rotate-0 transition-transform duration-300"
                  />
                </div>
              <div className="min-h-[80px] flex flex-col justify-center">
                <h3 className="text-xl text-black group-hover:text-white mb-2 transition-colors duration-300" style={{ fontFamily: 'Inter Display, sans-serif' }}>
                  All-In-One Platform
                </h3>
                <p 
                  className="text-gray-600 group-hover:text-white text-sm opacity-0 group-hover:opacity-100 transition-all duration-300" 
                  style={{ fontFamily: 'Inter Display, sans-serif' }}
                >
                  Simplifying the way creators and brands connect
                </p>
              </div>
            </div>
          </motion.div>

          {/* Data-Based Results */}
          <motion.div
            className="text-center group"
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{}}
            viewport={{ once: true }}
          >
              <div className="rounded-xl p-8 transition-all duration-300 cursor-pointer group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-purple-600" style={{ backgroundColor: '#F4F4F4' }}>
                <div className="relative mx-auto mb-6 max-w-[200px]">
                  <img 
                    src="/images/NewMain/tilt2.svg" 
                    alt="Data-Based Results" 
                    className="w-full h-auto transform rotate-12 group-hover:rotate-0 transition-transform duration-300"
                  />
                </div>
              <div className="min-h-[80px] flex flex-col justify-center">
                <h3 className="text-xl text-black group-hover:text-white mb-2 transition-colors duration-300" style={{ fontFamily: 'Inter Display, sans-serif' }}>
                  Data-Based Results
                </h3>
                <p 
                  className="text-gray-600 group-hover:text-white text-sm opacity-0 group-hover:opacity-100 transition-all duration-300" 
                  style={{ fontFamily: 'Inter Display, sans-serif' }}
                >
                  Real-time data to see how your content or campaign is performing
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tailored Recommendations */}
          <motion.div
            className="text-center group"
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{}}
            viewport={{ once: true }}
          >
              <div className="rounded-xl p-8 transition-all duration-300 cursor-pointer group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-purple-600" style={{ backgroundColor: '#F4F4F4' }}>
                <div className="relative mx-auto mb-6 max-w-[200px]">
                  <img 
                    src="/images/NewMain/tilt3.svg" 
                    alt="Tailored Recommendations" 
                    className="w-full h-auto transform rotate-12 group-hover:rotate-0 transition-transform duration-300"
                  />
                </div>
              <div className="min-h-[80px] flex flex-col justify-center">
                <h3 className="text-xl text-black group-hover:text-white mb-2 transition-colors duration-300" style={{ fontFamily: 'Inter Display, sans-serif' }}>
                  Tailored Recommendations
                </h3>
                <p 
                  className="text-gray-600 group-hover:text-white text-sm opacity-0 group-hover:opacity-100 transition-all duration-300" 
                  style={{ fontFamily: 'Inter Display, sans-serif' }}
                >
                  Expert recommendations to maximise chances of success
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
