import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { setRequestLocale } from "next-intl/server";

// Dynamic import for floating navbar
const FloatingNavbar = dynamic(() =>
	import("@/app/[locale]/components/FloatingNavbar")
);

// Dynamic imports for better performance
const FirstSection = dynamic(() =>
	import("@/app/[locale]/sections/creator/FirstSection")
);
const SecondSection = dynamic(() =>
	import("@/app/[locale]/sections/creator/SecondSection")
);
const ThirdSection = dynamic(() =>
	import("@/app/[locale]/sections/creator/ThirdSection")
);
const FourthSection = dynamic(() =>
	import("@/app/[locale]/sections/creator/FourthSection")
);
const FifthSection = dynamic(() =>
	import("@/app/[locale]/sections/creator/FifthSection")
);
const SixthSection = dynamic(() =>
	import("@/app/[locale]/sections/creator/SixthSection")
);
const SeventhSection = dynamic(() =>
	import("@/app/[locale]/sections/creator/SeventhSection")
);

const NewFooter = dynamic(() => import("@/app/[locale]/components/NewFooter"));

export const metadata = {
	title: {
		absolute: "Brand Deals For Content Creators - Cult Creative",
	},
	description:
		"Step into Cult Creative, Southeast Asia's #1 creator marketplace where creators access top brand deals, grow their content, and build thriving creative careers.",
	openGraph: {
		title: "Brand Deals For Content Creators - Cult Creative",
		description: "Step into Cult Creative, Southeast Asia's #1 creator marketplace where creators access top brand deals, grow their content, and build thriving creative careers.",
	},
	alternates: {
		canonical: "/creator",
	},
};

const Creator = ({ params: { locale } }) => {
	setRequestLocale(locale);

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
					<FirstSection />
					<SecondSection />
					<ThirdSection />
					<FourthSection />
					<FifthSection />
					<SixthSection />
					<SeventhSection />
					<NewFooter />
					<Toaster position="top-center" />
				</Suspense>
			</main>
		</>
	);
};

export default Creator;
