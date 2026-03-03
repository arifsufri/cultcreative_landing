"use client";

import StatsSection from "../../components/Stats";
import CreatorCardDeck from "../../components/CreatorCardDeck";
import Image from "next/image";
import useMediaQuery from "../../hooks/useMediaQuery";

const creators_col_1 = [
  {
    id: 1,
    name: "Sabrina Haiadz",
    tag: "Travel",
    img: "https://storage.googleapis.com/landing-cultcreative/creator/new/images/sabrinahaiadz.jpg",
    gradientColor: "bg-gradient-to-b from-vibrant-purple to-cc-blue",
  },
  {
    id: 2,
    name: "Shahiera",
    tag: "Beauty & Skincare",
    img: "https://storage.googleapis.com/landing-cultcreative/creator/new/images/shahiera.jpg",
    gradientColor: "bg-gradient-to-b from-cc-red to-vibrant-purple",
  },
  {
    id: 3,
    name: "Kevin Lee",
    tag: "Travel",
    img: "https://storage.googleapis.com/landing-cultcreative/creator/new/images/kevinlee.jpg",
    gradientColor: "bg-gradient-to-b from-cc-blue to-cc-red",
  },
];

const creators_col_2 = [
  {
    id: 4,
    name: "Efan Hamza",
    tag: "Lifestyle",
    img: "https://storage.googleapis.com/landing-cultcreative/creator/new/images/efanhamzah.jpg",
    gradientColor: "bg-gradient-to-b from-cc-blue to-cc-red",
  },
  {
    id: 5,
    name: "Jaclyn Lim",
    tag: "Events",
    img: "https://storage.googleapis.com/landing-cultcreative/creator/new/images/jaclynlim.jpg",
    gradientColor: "bg-gradient-to-b from-vibrant-purple to-cc-blue",
  },
  {
    id: 6,
    name: "Ayanyeesh",
    tag: "Lifestyle",
    img: "https://storage.googleapis.com/landing-cultcreative/creator/new/images/avanyeesh.jpg",
    gradientColor: "bg-gradient-to-b from-cc-red to-vibrant-purple",
  },
];

const creators_col_3 = [
  {
    id: 7,
    name: "Adam Hamid",
    tag: "F&B",
    img: "https://storage.googleapis.com/landing-cultcreative/creator/new/images/adamhamid.jpg",
    gradientColor: "bg-gradient-to-b from-cc-red to-vibrant-purple",
  },
  {
    id: 8,
    name: "Fatin N Daud",
    tag: "Beauty & Skincare",
    img: "https://storage.googleapis.com/landing-cultcreative/creator/new/images/fatinndaud.jpg",
    gradientColor: "bg-gradient-to-b from-cc-blue to-cc-red",
  },
  {
    id: 9,
    name: "Caleb Chin",
    tag: "Fashion",
    img: "https://storage.googleapis.com/landing-cultcreative/creator/new/images/calebcheen.jpg",
    gradientColor: "bg-gradient-to-b from-vibrant-purple to-cc-blue",
  },
];

const creators_combined = [
  ...creators_col_1,
  ...creators_col_2,
  ...creators_col_3,
];

const SecondSection = () => {
  const { isMdAndAbove } = useMediaQuery();

  return (
    <div className="bg-white md:py-8">
      <section className="md:py-20 rounded-3xl bg-star-creator-mobile md:bg-star-creator-desktop bg-contain bg-center bg-no-repeat">
        <div className="relative z-10 container mx-auto px-4 py-32 md:py-40">
          <StatsSection />

          {/* Title Section */}
          <div className="text-center mt-32 md:mt-72 md:mb-16">
            <h2 className="text-[2rem] md:text-6xl font-semibold md:font-bold text-white font-aileron relative inline-block tracking-[-0.06em]">
              {/* Sparkle effect */}
              <Image
                src="/images/NewCreator/starsV2.png"
                alt="stars"
                width={840}
                height={840}
                className="absolute object-contain z-0 left-32 -top-28 md:-left-72 md:-top-52"
              />
              Our Star Creators.
            </h2>
            <p className="md:mt-4 text-base md:text-xl font-light text-white">
              Creator building real partnerships with brands
            </p>
          </div>
          <div className="w-full">
            {isMdAndAbove ? (
              <div className="flex flex-col md:flex-row">
                <CreatorCardDeck creators={creators_col_1} />
                <CreatorCardDeck creators={creators_col_2} />
                <CreatorCardDeck creators={creators_col_3} />
              </div>
            ) : (
              <div>
                <CreatorCardDeck creators={creators_combined} />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecondSection;
