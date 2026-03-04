import Image from "next/image";
import React from "react";
import packages from "@/data/packages.json";

const CGCCredits = () => {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(179.81deg, #8A5AFE 0.17%, #F5F5F5 63.77%)",
      }}
    >
      <div className="m-10 mt-30 sm:m-40">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-15 sm:gap-0">
          <div className="flex flex-col flex-1/2 gap-4">
            <div className="relative">
              <h1 className="font-bold text-5xl text-white tracking-tighter">
                CGC Credits,
                <br />
                <span className="font-extralight font-family-times italic tracking-normal">
                  what are those?
                </span>
              </h1>

              <Image
                width={200}
                height={50}
                src={"/images/vector.svg"}
                alt="vector"
                className="absolute top-9 hidden sm:block"
              />
            </div>
            <p className="text-pretty text-shadow-md leading-tight">
              CGC Credits are your campaign currency inside our ecosystem.
              Creators are tiered by their quality of work and audience size,
              letting you allocate credits strategically across different
              creators to maximise reach, engagement and budget efficiency.
            </p>

            <p className="text-pretty text-shadow-md leading-tight">
              Each CGC Credit Tier represents one campaign deliverable - so for
              example, a Macro Creator uses 8 Credits per deliverable.
            </p>
          </div>

          <div className="flex-1/2">
            {/* Image */}
            <Image
              width={200}
              height={50}
              src={"/images/profile.svg"}
              alt="Profile"
              className="justify-self-center"
            />
          </div>
        </div>

        <div className="flex justify-between gap-10 mt-15 sm:mt-10 overflow-x-scroll snap-x snap-mandatory sm:snap-none">
          {packages.map((item, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col justify-between min-w-full md:min-w-0 snap-center"
            >
              <div className="text-center">
                <div className="flex gap-1.5 justify-center">
                  <Image
                    width={15}
                    height={15}
                    alt={item.type}
                    src={item.icon}
                  />
                  <p className="text-black font-semibold">{item.type}</p>
                </div>
                <div className="bg-[#1340FF] w-full h-0.5 mt-2" />

                <div className="flex flex-row justify-center gap-10 mt-4">
                  {item.subPackages.map((subPackage) => (
                    <div key={subPackage.type}>
                      <div>
                        <p className="text-black font-medium text-sm">
                          {subPackage.type}
                        </p>
                        <p className="text-black font-light text-sm sm:text-xs">
                          {subPackage.credits}
                        </p>

                        <div className="bg-[#1340FF] w-full h-px my-2" />

                        <p className="font-medium text-sm sm:text-xs text-white text-shadow-md">
                          {subPackage.followers}
                        </p>
                        <p className="text-white text-sm sm:text-[10px] text-shadow-md">
                          Followers
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-[#1340FF] w-full h-0.5 my-2" />

                <p className="text-black font-light text-xs text-start text-pretty leading-tight">
                  {item.notes}
                </p>
              </div>

              <div className="bg-[#1340FF] w-0.5 h-12 my-2 mx-auto relative">
                <div className="w-px h-px bg-white border-2 border-[#1340FF] p-0.5 rounded-full absolute left-1/2 top-0 -translate-x-1/2" />
                <div className="w-px h-px bg-white border-2 border-[#1340FF] p-0.5 rounded-full absolute left-1/2 bottom-0 -translate-x-1/2" />
              </div>

              {/* Video */}
              {/* <div className="aspect-video max-w-full"> */}
              <video
                key={item.videoUrl}
                className="rounded-2xl aspect-auto"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={item.videoUrl} type="video/mp4" />
              </video>
              {/* </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CGCCredits;
