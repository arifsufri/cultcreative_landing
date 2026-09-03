"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useNavVisibility } from "./NavVisibilityContext";
import { Icon } from "@iconify/react";

const WAITLIST_URL =
	process.env.NEXT_PUBLIC_WAITLIST_URL ||
	"https://waitlist.cultcreativeasia.com";

const AppWaitlistBanner = () => {
	const isNavVisible = useNavVisibility();

	const [isDismissed, setIsDismissed] = useState(false);
	const [isGone, setIsGone] = useState(false);

	const dismiss = () => setIsDismissed(true);

	return (
		<>
			{!isGone && (
				<motion.div
					className="fixed left-0 right-0 z-40 flex justify-center px-2 [--banner-gap:8px] [--banner-top:100px] md:px-4 md:[--banner-gap:20px] md:[--banner-top:104px]"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: isNavVisible ? 0 : -80 }}
					transition={{ duration: 0.3, ease: "easeInOut" }}
					style={{ top: "var(--banner-top)" }}
				>
					{/* Rail — right-aligned so the collapse lands on the icon */}
					<div className="flex w-full max-w-[960px] items-center justify-end">
						{/* Collapsing body */}
						<motion.div
							className="overflow-hidden"
							initial={false}
							style={{ transformOrigin: "right center" }}
							animate={{
								width: isDismissed ? 0 : "100%",
								opacity: isDismissed ? 0 : 1,
								marginRight: isDismissed ? 0 : "var(--banner-gap)",
								scale: isDismissed ? 0.6 : 1,
							}}
							transition={{
								width: {
									type: "spring",
									stiffness: 260,
									damping: 24,
									mass: 0.9,
								},
								marginRight: {
									type: "spring",
									stiffness: 260,
									damping: 24,
									mass: 0.9,
								},
								scale: {
									type: "spring",
									stiffness: 260,
									damping: 22,
									mass: 0.9,
								},
							}}
						>
							{/* Radius and gradient on one element — a rounded parent
							    clipping a square child left a seam on the curve. */}
							<div className="relative flex min-h-[64px] items-center gap-2 rounded-l-[100px] rounded-r-[28px] bg-gradient-to-r from-[#8a5afe] via-[#6b46d6] to-[#231F20] px-2 py-2 sm:gap-3 sm:px-3 md:h-[86px] md:gap-6 md:rounded-r-[40px] md:px-6 md:py-0 md:pr-12">
								{/* Close */}
								<button
									onClick={dismiss}
									aria-label="Dismiss app waitlist banner"
									className="shrink-0 cursor-pointer p-0.5 text-white/80 transition-colors duration-200 hover:text-white md:p-1"
								>
									<svg
										className="h-4 w-4 md:h-5 md:w-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>

								{/* Headline */}
								<div className="min-w-0 flex-1">
									<p
										className="truncate text-base font-bold leading-tight text-white sm:text-xl md:text-[32px] md:leading-9"
										style={{
											fontFamily: "Aileron, sans-serif",
											fontWeight: 700,
											letterSpacing: "-0.06em",
										}}
									>
										<span className="md:hidden">App Coming Soon.</span>
										<span className="hidden md:inline">
											Our App Is On The Way,
										</span>
									</p>
									<p
										className="truncate text-xs italic leading-tight text-white/90 sm:text-sm md:text-xl md:leading-6 font-baskerville"
										style={{
											fontWeight: 400,
											letterSpacing: "-0.04em",
										}}
									>
										<span className="md:hidden">
											We know you&apos;ve been waiting!
										</span>
										<span className="hidden md:inline">
											We know you&apos;ve been waiting for this one!
										</span>
									</p>
								</div>

								{/* Right group — sub-copy above CTA */}
								<div className="flex shrink-0 flex-col items-end gap-1.5 lg:items-start">
									{/* Sub-copy — desktop only, space is tight on mobile */}
									<p
										className="hidden whitespace-nowrap text-sm text-white/90 lg:block"
										style={{
											fontFamily: "Aileron, sans-serif",
											fontWeight: 400,
											fontSize: "12px",
											lineHeight: "16px",
										}}
									>
										Join our waitlist to be one of our early adopters.
									</p>

									{/* CTA */}
									<a
										href={WAITLIST_URL}
										target="_blank"
										rel="noopener noreferrer"
									>
										<motion.button
											className="flex cursor-pointer items-center gap-1 rounded-full bg-[#1340ff] px-2.5 py-1.5 text-[10px] leading-4 text-white shadow-lg transition-colors duration-200 hover:bg-[#0f33cc] sm:gap-1.5 sm:px-3 sm:py-2 sm:text-xs md:px-8"
											style={{
												fontFamily: "Aileron, sans-serif",
												fontWeight: 700,
											}}
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
										>
											<span className="whitespace-nowrap">GO TO WAITLIST</span>
											<Icon
												icon="lucide:arrow-up-right"
												className="h-3.5 w-3.5 shrink-0"
											/>
										</motion.button>
									</a>
								</div>
							</div>
						</motion.div>

						<motion.div
							aria-hidden
							className="shrink-0 rounded-[14px] shadow-2xl sm:rounded-[20px]"
							animate={{
								opacity: isDismissed ? 0 : 1,
								scale: isDismissed ? 0.8 : 1,
							}}
							transition={{
								delay: isDismissed ? 0.45 : 0,
								duration: 0.25,
								ease: "easeOut",
							}}
							onAnimationComplete={() => {
								if (isDismissed) setIsGone(true);
							}}
						>
							<img
								src="/favicon-192x192.png"
								alt=""
								className="h-12 w-12 rounded-[14px] sm:h-16 sm:w-16 sm:rounded-[20px] md:h-[86px] md:w-[86px]"
							/>
						</motion.div>
					</div>
				</motion.div>
			)}
		</>
	);
};

export default AppWaitlistBanner;
