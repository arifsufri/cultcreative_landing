import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const FloatingNavbar = dynamic(
  () => import("@/app/[locale]/components/FloatingNavbar"),
);

const CGCCredits = dynamic(
  () => import("@/app/[locale]/sections/cgc-credits/index"),
);

const NewFooter = dynamic(() => import("@/app/[locale]/components/NewFooter"));

const Page = () => {
  return (
    <>
      <FloatingNavbar />
      <main className="flex flex-col min-h-screen w-full overflow-x-clip bg-white">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-black">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
            </div>
          }
        >
          <CGCCredits />
          <NewFooter />
        </Suspense>
      </main>
    </>
  );
};

export default Page;
