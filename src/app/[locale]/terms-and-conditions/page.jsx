import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { setRequestLocale } from "next-intl/server";

// Dynamic import for floating navbar
const FloatingNavbar = dynamic(() =>
	import("@/app/[locale]/components/FloatingNavbar")
);

// Dynamic imports for better performance
const TermsAndConditionsSection = dynamic(() =>
	import("@/app/[locale]/sections/legal/TermsAndConditionsSection")
);

const NewFooter = dynamic(() => import("@/app/[locale]/components/NewFooter"));

export const metadata = {
	title: {
		absolute: "Terms and Conditions - Cult Creative",
	},
	description:
		"Review Cult Creative's terms and conditions. Understand the rules, policies, and legal guidelines for using our platform and services. Read more here.",
	openGraph: {
		title: "Terms and Conditions - Cult Creative",
		description: "Review Cult Creative's terms and conditions. Understand the rules, policies, and legal guidelines for using our platform and services. Read more here.",
	},
	alternates: {
		canonical: "/terms-and-conditions",
	},
};

const TermsAndConditions = ({ params: { locale } }) => {
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
					<TermsAndConditionsSection />
					<NewFooter />
					<Toaster position="top-center" />
				</Suspense>
			</main>
		</>
	);
};

export default TermsAndConditions;
