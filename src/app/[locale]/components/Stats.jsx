"use client";

import React, { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

// --- The Custom Hook ---
// This hook uses Framer Motion's `animate` function to count from 0 to a target number.
function useCountUp(ref, inView, target, options = {}) {
	const { duration = 2, suffix = "", decimals = 0 } = options;

	useEffect(() => {
		const element = ref.current;
		if (!element || !inView) return;

		animate(0, 0, {});
		// The core of the animation
		const controls = animate(0, target, {
			duration: duration,
			ease: "easeOut",
			onUpdate(value) {
				// On each animation frame, update the element's text content
				// This is more performant than re-rendering the component on every frame.
				element.textContent = value.toFixed(decimals) + suffix;
			},
		});

		// Cleanup function to stop the animation when the component unmounts
		return () => controls.stop();
	}, [ref, inView, target, duration, suffix, decimals]);
}

// --- A single Stat Item ---
function StatItem({ target, label, suffix = "", decimals = 0 }) {
	const ref = useRef(null);

	const inView = useInView(ref, { once: true });

	useCountUp(ref, inView, target, { duration: 2, suffix, decimals });

	return (
		<div className="text-center">
			<h2
				ref={ref}
				className="text-5xl md:text-8xl font-bold md:font-bold font-aileron text-white tracking-[-0.06em]"
			>
				0
			</h2>
			<p className="text-sm md:text-2xl  md:mt-2 font-light font-aileron">
				{label}
			</p>
		</div>
	);
}

// --- The main Stats Section component ---
export default function StatsSection() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 max-w-5xl mx-auto text-white font-aileron">
			<StatItem target={300} label="Campaigns Completed" suffix="+" />
			<StatItem
				target={600}
				label="Payments Processed (USD)"
				suffix="K+"
				decimals={0}
			/>
			<StatItem
				target={7.5}
				label="Creators Matched"
				suffix="K+"
				decimals={1}
			/>
		</div>
	);
}
