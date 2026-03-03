// import dynamic from "next/dynamic";
// import { Suspense } from "react";
// import { Toaster } from "react-hot-toast";
// import { setRequestLocale } from "next-intl/server";

// // Dynamic import for floating navbar
// const FloatingNavbar = dynamic(
//   () => import("@/app/[locale]/components/FloatingNavbar"),
// );

// // Dynamic import for For Brands sections
// const FirstSection = dynamic(
//   () => import("@/app/[locale]/sections/forBrands/FirstSection"),
// );

// const SecondSection = dynamic(
//   () => import("@/app/[locale]/sections/forBrands/SecondSection"),
// );
// const ThirdSection = dynamic(
//   () => import("@/app/[locale]/sections/forBrands/ThirdSection"),
// );
// const FourthSection = dynamic(
//   () => import("@/app/[locale]/sections/forBrands/FourthSection"),
// );
// const FifthSection = dynamic(
//   () => import("@/app/[locale]/sections/forBrands/FifthSection"),
// );
// const SixthSection = dynamic(
//   () => import("@/app/[locale]/sections/forBrands/SixthSection"),
// );
// const NewFooter = dynamic(() => import("@/app/[locale]/components/NewFooter"));

// export const metadata = {
//   title: {
//     absolute: "Hire Content Creators To Promote Your Brand - Cult Creative",
//   },
//   description:
//     "Boost your brand with customised UGC campaigns. Collaborate with trusted social media creators to increase reach, engagement, and impact of your campaigns.",
//   openGraph: {
//     title: "Hire Content Creators To Promote Your Brand - Cult Creative",
//     description:
//       "Boost your brand with customised UGC campaigns. Collaborate with trusted social media creators to increase reach, engagement, and impact of your campaigns.",
//   },
//   alternates: {
//     canonical: "/for-brands",
//   },
// };

// const ForBrandsPage = async ({ params }) => {
//   const { locale } = await params;
//   setRequestLocale(locale);

//   return (
//     <>
//       <FloatingNavbar />
//       <main className="flex flex-col min-h-screen w-full overflow-x-clip">
//         <Suspense
//           fallback={
//             <div className="min-h-screen flex items-center justify-center bg-black">
//               <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
//             </div>
//           }
//         >
//           <FirstSection />
//           <SecondSection />
//           <ThirdSection />
//           <FourthSection />
//           <FifthSection />
//           <SixthSection />
//           <NewFooter />
//           <Toaster position="top-center" />
//         </Suspense>
//       </main>
//     </>
//   );
// };

// export default ForBrandsPage;

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { setRequestLocale } from "next-intl/server";
import Script from "next/script";

// Dynamic import for floating navbar
const FloatingNavbar = dynamic(
  () => import("@/app/[locale]/components/FloatingNavbar"),
);

// Dynamic import for For Brands sections
const FirstSection = dynamic(
  () => import("@/app/[locale]/sections/forBrands/FirstSection"),
);

const SecondSection = dynamic(
  () => import("@/app/[locale]/sections/forBrands/SecondSection"),
);

const ThirdSection = dynamic(
  () => import("@/app/[locale]/sections/forBrands/ThirdSection"),
);

const FourthSection = dynamic(
  () => import("@/app/[locale]/sections/forBrands/FourthSection"),
);

const FifthSection = dynamic(
  () => import("@/app/[locale]/sections/forBrands/FifthSection"),
);

const SixthSection = dynamic(
  () => import("@/app/[locale]/sections/forBrands/SixthSection"),
);

const PricingSection = dynamic(
  () => import("@/app/[locale]/sections/forBrands/PricingSection"),
);

const NewFooter = dynamic(() => import("@/app/[locale]/components/NewFooter"));

export const metadata = {
  title: {
    absolute: "Hire Content Creators To Promote Your Brand - Cult Creative",
  },
  description:
    "Boost your brand with customised UGC campaigns. Collaborate with trusted social media creators to increase reach, engagement, and impact of your campaigns.",
  openGraph: {
    title: "Hire Content Creators To Promote Your Brand - Cult Creative",
    description:
      "Boost your brand with customised UGC campaigns. Collaborate with trusted social media creators to increase reach, engagement, and impact of your campaigns.",
  },
  alternates: {
    canonical: "/for-brands",
  },
};

const ForBrandsPage = async ({ params }) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Script
        id="apollo-tracker"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            function initApollo(){
              var n=Math.random().toString(36).substring(7),
                  o=document.createElement("script");
              o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n;
              o.async=true;
              o.defer=true;
              o.onload=function(){
                window.trackingFunctions.onLoad({appId:"6985ba2d8a53e0001126c8c3"})
              };
              document.head.appendChild(o);
            }
            initApollo();
          `,
        }}
      />
      <FloatingNavbar />
      <main className="flex flex-col min-h-screen w-full overflow-x-clip">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-black">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
            </div>
          }
        >
          <FirstSection />
          <SecondSection />
          <ThirdSection />
          <FourthSection />
          {/* <FifthSection /> */}
          <PricingSection />
          <SixthSection />
          <NewFooter />
          <Toaster position="top-center" />
        </Suspense>
      </main>
    </>
  );
};

export default ForBrandsPage;
