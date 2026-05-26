"use client";

import { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import useMediaQuery from "../../hooks/useMediaQuery";

// reusable child component for creator avatars
const CreatorAvatar = ({
	creator,
	onClick,
	size,
	positionClass = "",
	isActive = false,
	isMobile = false,
}) => {
	return (
		<button
			onClick={onClick}
			className={`rounded-full transition-all duration-300 ease-in-out transform focus:outline-none hover:cursor-pointer ${size} ${
				isMobile
					? `relative ${isActive ? "scale-[1.3] opacity-100" : "opacity-70"}`
					: `absolute ${positionClass}`
			}`}
		>
			<div className="relative w-full h-full">
				{/* The Image container */}
				<div className="w-full h-full rounded-full overflow-hidden">
					<Image
						src={creator.svgPath}
						alt={creator.name}
						fill
						className="object-cover" // Removed rounded-full from here
					/>
				</div>

				{/* The colored ring overlay */}
				<div
					className={`absolute inset-0 rounded-full border-4 ${creator.borderColor} pointer-events-none`}
				></div>
			</div>
		</button>
	);
};

const SeventhSection = () => {
	const testimonialsData = [
		{
			id: 1,
			name: "Amanda Liew Su Ling",
			svgPath: "/images/NewCreator/amanda.png",
			testimonial:
				"As a small creator I've never come across working with an agency that is organised with a platform. I'm just happy to be part of this!",
			borderColor: "border-lavender",
			position: "top-1/5 left-1/7 ",
			size: "w-28 h-28",
		},
		{
			id: 2,
			name: "Ayuni Hazan",
			svgPath: "/images/NewCreator/AyuniHazan.png",
			testimonial:
				"Since using the platform, my productivity has significantly increased. I can't fathom returning to my previous working style!",
			borderColor: "border-cc-green",
			position: "bottom-1/2 right-20 -translate-y-1/2",
			size: "w-20 h-20",
		},
		{
			id: 3,
			name: "Telvinder Singh",
			svgPath: "/images/NewCreator/TelvinderSingh.png",
			testimonial:
				"The platform is great! I really like that I don't have to spend too much time uploading and tracking my drafts.",
			borderColor: "border-bright-yellow",
			position: "top-1/5 right-1/6",
			size: "w-12 h-12",
		},
		{
			id: 4,
			name: "Lim Shan May",
			svgPath: "/images/NewCreator/LimShanMay.png",
			testimonial:
				"The Cult Creative team really took time to really understand our voice and gave us unique tasks that we enjoyed.",
			borderColor: "border-vibrant-purple",
			position: "top-1/2 left-20 -translate-y-1/2",
			size: "w-16 h-16",
		},
		{
			id: 5,
			name: "Ujay Dani",
			svgPath: "/images/NewCreator/ujay.png",
			testimonial:
				"All of the processes in the platform has helped me in my content journey. It's been great!",
			borderColor: "border-cc-blue",
			position: "bottom-1/3 right-1/6",
			size: "w-24 h-24",
		},
		{
			id: 6,
			name: "Puteri Shahiera",
			svgPath: "/images/NewCreator/puteri.png",
			testimonial:
				"The platform is easy to navigate and I love having all the campaigns in one place!",
			borderColor: "border-cc-pink",
			position: "bottom-1/5 left-1/5 -translate-y-1/2",
			size: "w-18 h-18",
		},
	];

	// Initialize state with the first creator's ID
	const [activeId, setActiveId] = useState(testimonialsData[0].id);
	const activeTestimonial = testimonialsData.find((t) => t.id === activeId);
	const { isMdAndAbove } = useMediaQuery();

	const [cardHeight, setCardHeight] = useState("auto");
	const contentRef = useRef(null);

	useLayoutEffect(() => {
		if (contentRef.current) {
			setCardHeight(contentRef.current.scrollHeight);
		}
	}, [activeId]);

	return (
		<section className="relative w-full bg-white py-28 md:pt-40 overflow-hidden">
			<div className="flex flex-col items-center md:mx-60">
				<div className="max-w-4xl text-center mx-auto">
					<h2 className="font-aileron text-4xl md:text-[64px] font-bold leading-[57.86px] tracking-[-0.06em] text-center capitalize text-cc-onyx">
						What Our Creators Say
					</h2>
					<p className="md:mt-4 font-aileron font-normal text-base/5 md:text-2xl md:leading-[28px] text-center text-[400] max-w-2xl mx-auto text-cc-onyx">
						A short message reflecting our value of{" "}
						<br className="block md:hidden" />
						putting creators first. We love them!
					</p>
				</div>
				{isMdAndAbove ? (
					<div>
						<div className="absolute inset-0 w-full z-10" aria-hidden="true">
							{testimonialsData.map((creator) => (
								<CreatorAvatar
									key={creator.id}
									creator={creator}
									onClick={() => setActiveId(creator.id)}
									size={creator.size}
									positionClass={creator.position}
									isMobile={false}
								/>
							))}
						</div>
						<div className="relative mt-32 flex justify-center min-h-[400px] max-w-3xl mx-auto">
							<div className="relative">
								<div className="relative bg-neutral-100 rounded-2xl p-12 md:p-20 shadow-sm mx-auto">
									{/* THE TESTIMONIAL CARD */}
									<div
										style={{ height: cardHeight }}
										className="transition-[height] duration-500 ease-in-out"
									>
										<div ref={contentRef}>
											<div className="flex flex-col items-center justify-center gap-6">
												<p className="font-aileron text-xl font-normal leading-none tracking-normal text-center text-gray-700">
													{activeTestimonial.testimonial}
												</p>
												<p className="font-baskerville text-2xl italic leading-[28px] text-center text-gray-900">
													{activeTestimonial.name}
												</p>
											</div>
										</div>
									</div>

									{/* Quotation Marks */}
									<div className="absolute top-0 left-0 translate-x-9 -translate-y-7">
										<Image
											src="/images/NewCreator/openQuote.svg"
											alt="Quote start"
											width={64}
											height={64}
										/>
									</div>
									<div className="absolute bottom-0 right-0 -translate-x-9 translate-y-7">
										<Image
											src="/images/NewCreator/closeQuote.svg"
											alt="Quote end"
											width={64}
											height={64}
										/>
									</div>

									{/* Active creator's avatar */}
									<div className="absolute -top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
										<div
											className={`w-30 h-30 rounded-full border-8 ${activeTestimonial.borderColor}`}
										>
											<Image
												src={activeTestimonial.svgPath}
												alt={activeTestimonial.name}
												width={96}
												height={96}
												className="w-full h-full object-cover rounded-full"
											/>
										</div>
									</div>
								</div>
								{/* Large active avatar for desktop */}
								<div className="absolute -top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
									<div
										className={`w-30 h-30 rounded-full border-6 ${activeTestimonial.borderColor}`}
									>
										<Image
											src={activeTestimonial.svgPath}
											alt={activeTestimonial.name}
											width={96}
											height={96}
											className="w-full h-full object-cover rounded-full"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className="mt-12">
						<div className="flex justify-center items-center gap-2 px-4 pb-4 z-20">
							{testimonialsData.map((creator) => (
								<CreatorAvatar
									key={creator.id}
									creator={creator}
									onClick={() => setActiveId(creator.id)}
									size="w-12 h-12"
									isActive={creator.id === activeId}
									isMobile={true}
								/>
							))}
						</div>

						<div className="relative mt-12 flex justify-center min-h-[300px] max-w-3xl mx-auto px-4">
							<div className="relative w-full">
								<div className="relative bg-neutral-100 rounded-2xl p-8 pt-16 shadow-sm mx-auto">
									{/* Card content with animation */}
									<div
										style={{ height: cardHeight }}
										className="transition-[height] duration-500 ease-in-out"
									>
										<div ref={contentRef}>
											<div className="flex flex-col items-center justify-center gap-6">
												<p className="font-aileron text-lg md:text-xl font-normal leading-none tracking-normal text-center text-cc-onyx">
													{activeTestimonial.testimonial}
												</p>
												<p className="font-baskerville text-xl md:text-2xl italic leading-[28px] text-center text-cc-onyx">
													{activeTestimonial.name}
												</p>
											</div>
										</div>
									</div>

									{/* Quotation Marks */}
									<div className="absolute top-0 left-0 translate-x-4 -translate-y-4">
										<Image
											src="/images/NewCreator/openQuote.svg"
											alt="Quote start"
											width={48}
											height={48}
										/>
									</div>
									<div className="absolute bottom-0 right-0 -translate-x-4 translate-y-4">
										<Image
											src="/images/NewCreator/closeQuote.svg"
											alt="Quote end"
											width={48}
											height={48}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default SeventhSection;
