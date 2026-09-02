"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavVisibility } from "./NavVisibilityContext";
import { Icon } from "@iconify/react";

const WAITLIST_URL =
	process.env.NEXT_PUBLIC_WAITLIST_URL ||
	"https://waitlist.cultcreativeasia.com";

const AppWaitlistBanner = () => {
	const isNavVisible = useNavVisibility();

	const [isDismissed, setIsDismissed] = useState(false);
	const [isGone, setIsGone] = useState(false);
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		setHydrated(true);
	}, []);

	const dismiss = () => setIsDismissed(true);

	if (!hydrated) return null;

	return (
		<>
			{!isGone && (
				<motion.div
					className="fixed left-0 right-0 z-40 flex justify-center px-2 md:px-4"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: isNavVisible ? 0 : -80 }}
					transition={{ duration: 0.3, ease: "easeInOut" }}
					style={{ top: "104px" }}
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
								marginRight: isDismissed ? 0 : 20,
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
							<div className="relative flex h-[86px] items-center gap-3 rounded-l-[100px] rounded-r-[40px] bg-gradient-to-r from-[#8a5afe] via-[#6b46d6] to-[#231F20] px-3 md:gap-6 md:px-6 md:pr-12">
									{/* Close */}
									<button
										onClick={dismiss}
										aria-label="Dismiss app waitlist banner"
										className="shrink-0 cursor-pointer p-1 text-white/80 transition-colors duration-200 hover:text-white"
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
											className="truncate text-sm font-bold text-white md:text-xl"
											style={{
												fontFamily: "Aileron, sans-serif",
												fontWeight: 700,
												fontSize: "32px",
												lineHeight: "36px",
												letterSpacing: "-0.06em",
											}}
										>
											Our App Is On The Way,
										</p>
										<p
											className="truncate italic text-white/90 md:text-base font-baskerville"
											style={{
												fontWeight: 400,
												fontSize: "20px",
												lineHeight: "24px",
												letterSpacing: "-0.04em",
											}}
										>
											We know you&apos;ve been waiting for this one!
										</p>
									</div>

									{/* Right group — sub-copy above CTA */}
									<div className="flex shrink-0 flex-col items-start gap-1.5">
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
												className="flex cursor-pointer items-center gap-1.5 rounded-full bg-[#1340ff] px-3 py-2 text-white shadow-lg transition-colors
  duration-200 hover:bg-[#0f33cc] md:px-8 md:py-2"
												style={{
													fontFamily: "Aileron, sans-serif",
													fontWeight: 700,
													fontSize: "12px",
													lineHeight: "16px",
												}}
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
											>
												<span className="whitespace-nowrap">
													GO TO WAITLIST
												</span>
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
							className="shrink-0 rounded-[20px] shadow-2xl"
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
								className="h-[64px] w-[64px] rounded-[20px] md:h-[86px] md:w-[86px]"
							/>
						</motion.div>
					</div>
				</motion.div>
			)}
		</>
	);
};

export default AppWaitlistBanner;
