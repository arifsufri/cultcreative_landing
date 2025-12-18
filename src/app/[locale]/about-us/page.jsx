import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { setRequestLocale } from "next-intl/server";

// Dynamic import for floating navbar
const FloatingNavbar = dynamic(() =>
	import("@/app/[locale]/components/FloatingNavbar")
);

// Dynamic imports for better performance
const AboutUsSection = dynamic(() =>
	import("@/app/[locale]/sections/aboutUs/AboutUsSection")
);

const NewFooter = dynamic(() => import("@/app/[locale]/components/NewFooter"));

export const metadata = {
	title: {
		absolute: "About Us - Cult Creative",
	},
	description:
		"At Cult Creative, we empower creators to pursue passion, purpose and prosperity while challenging stereotypes about creativity.",
	openGraph: {
		title: "About Us - Cult Creative",
		description: "At Cult Creative, we empower creators to pursue passion, purpose and prosperity while challenging stereotypes about creativity.",
	},
	alternates: {
		canonical: "/about-us",
	},
};

const AboutUs = ({ params: { locale } }) => {
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
					<AboutUsSection />
					<NewFooter />
					<Toaster position="top-center" />
				</Suspense>
			</main>
		</>
	);
};

export default AboutUs;
