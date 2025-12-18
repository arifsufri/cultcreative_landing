import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { setRequestLocale } from "next-intl/server";

// Dynamic import for floating navbar
const FloatingNavbar = dynamic(() =>
	import("@/app/[locale]/components/FloatingNavbar")
);

// Dynamic imports for better performance
const PrivacyPolicySection = dynamic(() =>
	import("@/app/[locale]/sections/legal/PrivacyPolicySection")
);

const NewFooter = dynamic(() => import("@/app/[locale]/components/NewFooter"));

export const metadata = {
	title: {
		absolute: "Privacy Policy - Cult Creative",
	},
	description:
		"Safeguard your data with Cult Creative's Privacy Policy. Learn how we protect your information and ensure transparency in our practices.",
	openGraph: {
		title: "Privacy Policy - Cult Creative",
		description: "Safeguard your data with Cult Creative's Privacy Policy. Learn how we protect your information and ensure transparency in our practices.",
	},
	alternates: {
		canonical: "/privacy-policy",
	},
};

const PrivacyPolicy = ({ params: { locale } }) => {
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
					<PrivacyPolicySection />
					<NewFooter />
					<Toaster position="top-center" />
				</Suspense>
			</main>
		</>
	);
};

export default PrivacyPolicy;
