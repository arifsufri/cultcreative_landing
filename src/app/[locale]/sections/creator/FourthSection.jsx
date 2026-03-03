"use client";

import Image from "next/image";

const column1 = [
  "https://storage.googleapis.com/landing-cultcreative/creator/new/images/photo2.jpeg",
  "https://storage.googleapis.com/landing-cultcreative/creator/new/images/photo1.jpeg",
  "https://storage.googleapis.com/landing-cultcreative/creator/new/images/photo3.jpg",
];

const column2 = [
  "https://storage.googleapis.com/landing-cultcreative/creator/new/images/photo5.jpg",
  "https://storage.googleapis.com/landing-cultcreative/creator/new/images/photo6.JPG",
  "https://storage.googleapis.com/landing-cultcreative/creator/new/images/photo4.JPG",
];

const column3 = [
  "https://storage.googleapis.com/landing-cultcreative/creator/new/images/photo9.jpg",
  "https://storage.googleapis.com/landing-cultcreative/creator/new/images/photo10.jpg",
  "https://storage.googleapis.com/landing-cultcreative/creator/new/images/photo11.jpg",
];

const allColumns = [...column1, ...column2, ...column3];

const ImageColumn = ({ images, isReversed = false }) => {
  const imageBlock = (
    <>
      {images.map((src, index) => (
        <div
          key={index}
          className="relative w-48 h-72 overflow-hidden shadow-lg flex-shrink-0"
        >
          <Image
            src={src}
            alt={`Scrolling images ${index + 1}`}
            fill
            className="object-cover"
            sizes="200px"
          />
        </div>
      ))}
    </>
  );

  return (
    <div className="h-full overflow-hidden flex-shrink-0">
      <div
        className={`flex flex-col gap-16 ${
          isReversed ? "animate-loop-scroll-reverse" : "animate-loop-scroll"
        }`}
        style={{ willChange: "transform" }}
      >
        {imageBlock}
        {imageBlock}
        {imageBlock}
        {imageBlock}
      </div>
    </div>
  );
};

const MobileImageCarousel = ({ images }) => {
  const imageBlock = (
    <>
      {images.map((src, index) => (
        <div
          key={index}
          className={`relative w-32 flex-shrink-0 overflow-hidden shadow-lg 
						${index % 2 === 1 ? "mt-28" : " "} 
					`} //stagger images
        >
          {/* Use aspect ratio to maintain a consistent shape */}
          <div className="relative aspect-[9/16]">
            <Image
              src={src}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-cover"
              sizes="125px"
            />
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="w-full ">
      <div
        className="flex flex-nowrap items-center gap-4 animate-scroll-x"
        style={{ willChange: "transform" }}
      >
        {imageBlock}
        {imageBlock}
        {imageBlock}
      </div>
    </div>
  );
};

const FourthSection = () => {
  return (
    <section className="relative h-screen bg-cc-onyx rounded-3xl md:rounded-2xl flex items-start md:items-center justify-center overflow-hidden p-4 md:p-8 m-2 sm:m-0">
      <div className="relative w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative z-20 h-[280px] md:h-[600px] bg-blue flex flex-col md:justify-center items-center">
          <Image
            src="/images/NewCreator/csGalaxy.svg"
            alt="Galaxy background"
            fill
            className="md:absolute object-contain translate-y-10 translate-x-36 md:-translate-x-0 "
          />
          <Image
            src="/images/NewCreator/csSun.svg"
            alt="Sun"
            width={400}
            height={400}
            className="absolute -top-48 md:-top-32 -left-40 md:-left-20"
          />
          <Image
            src="/images/NewCreator/starsV2.png"
            alt="Sun"
            width={500}
            height={500}
            className="absolute -bottom-40 md:-bottom-56 right-32 md:-right-10"
          />
          <h1 className="relative z-30 font-baskerville italic text-5xl md:text-8xl text-white text-nowrap drop-shadow-lg leading-tight tracking-[-0.06em] top-20 md:top-0">
            Your creative space,
          </h1>
          <h1 className="relative z-30 font-aileron font-bold text-[2.5rem] md:text-7xl text-white text-nowrap drop-shadow-lg leading-tight tracking-[-0.06em] top-20 md:top-0">
            Not Just A Platform.
          </h1>
        </div>
        {/* <div className="absolute left-1/2 md:relative top-1/2 md:right-auto w-[150vw] h-[150vh] md:w-full md:h-[120%] transform -translate-x-56 -translate-y-1/2 transform-none -rotate-[21.53deg]"> */}
        <div className="block md:hidden">
          <MobileImageCarousel images={allColumns} />
        </div>
        <div className="hidden md:block absolute left-1/2 md:relative  w-[150vw] h-[150vh] md:w-full md:h-[200%] -translate-x-56 transform-none md:transform  -rotate-[21.53deg]">
          <div className="absolute inset-0 flex justify-center items-center gap-8">
            <ImageColumn images={column1} />
            <ImageColumn images={column2} isReversed={true} />
            <ImageColumn images={column3} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FourthSection;
