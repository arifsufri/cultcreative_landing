import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { setRequestLocale } from "next-intl/server";

// Section skeleton for loading states
const SectionSkeleton = ({ height = "min-h-screen" }) => (
  <div className={`${height} bg-gray-100 animate-pulse`} />
);

// Above-the-fold components - load with SSR for better LCP
const FloatingNavbar = dynamic(() =>
  import("@/app/[locale]/components/FloatingNavbar"),
  { ssr: true }
);

const FirstSection = dynamic(() =>
  import("@/app/[locale]/sections/newLanding/FirstSection"),
  { ssr: true }
);

// Below-the-fold components - lazy load with loading skeletons
const SecondSection = dynamic(() =>
  import("@/app/[locale]/sections/newLanding/SecondSection"),
  { loading: () => <SectionSkeleton height="min-h-[600px]" /> }
);

const ThirdSection = dynamic(() =>
  import("@/app/[locale]/sections/newLanding/ThirdSection"),
  { loading: () => <SectionSkeleton height="min-h-[800px]" /> }
);

const FourthSection = dynamic(() =>
  import("@/app/[locale]/sections/newLanding/FourthSection"),
  { loading: () => <SectionSkeleton height="min-h-[1200px]" /> }
);

const FifthSection = dynamic(() =>
  import("@/app/[locale]/sections/newLanding/FifthSection"),
  { loading: () => <SectionSkeleton height="min-h-[600px]" /> }
);

const SixthSection = dynamic(() =>
  import("@/app/[locale]/sections/newLanding/SixthSection"),
  { loading: () => <SectionSkeleton height="min-h-[800px]" /> }
);

const NewFooter = dynamic(() =>
  import("@/app/[locale]/components/NewFooter")
);

export const metadata = {
  title: {
    absolute: "Cult Creative: Connecting Brands With Content Creators",
  },
  description:
    "Hire top creators across Southeast Asia with Cult Creative. Our trusted platform makes it easy for brands and creators to connect and collaborate seamlessly.",
  openGraph: {
    title: "Cult Creative: Connecting Brands With Content Creators",
    description: "Hire top creators across Southeast Asia with Cult Creative. Our trusted platform makes it easy for brands and creators to connect and collaborate seamlessly.",
  },
  alternates: {
    canonical: "/new-landing",
  },
};

const NewLanding = async ({ params }) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <FloatingNavbar />
      <main className="flex flex-col min-h-screen w-full overflow-x-clip">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
          </div>
        }>
          <FirstSection />
          <SecondSection />
          <ThirdSection />
          <FourthSection />
          <FifthSection />
          <SixthSection />
          <NewFooter />
          <Toaster position="top-center" />
        </Suspense>
      </main>
    </>
  );
};

export default NewLanding;
