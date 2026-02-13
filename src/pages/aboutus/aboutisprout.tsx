import { COLORS } from "../../helpers/constants/Colors";
import { useCareers } from "../../hooks/useCareers";
import { useEffect, useState } from "react";

const AboutiSprout = () => {
	const { data: careersDataResponse } = useCareers();
	const careersDataSource =
		careersDataResponse?.careersIntroData?.stats || [];

	return (
		<section className='w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-white'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Heading */}
				<h2
					className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-left mb-8 sm:mb-10 md:mb-12'
					style={{
						fontFamily: "Outfit, sans-serif",
						color: COLORS.brandBlue,
					}}
				>
					Why We Are Special
				</h2>

				{/* Content and Stats Grid */}
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start'>
					{/* Content Paragraphs - Left Side */}
					<div className='lg:col-span-7 space-y-6 sm:space-y-8'>
						<p
							className='text-base sm:text-lg md:text-xl leading-relaxed text-justify'
							style={{
								fontFamily: "Outfit, sans-serif",
								color: COLORS.textGray700,
							}}
						>
							At iSprout, we're a bunch of dreamers and doers who
							believe that workspaces should be anything but not
							boring. We're on a mission to create offices that
							people actually look forward to come to every day.
						</p>

						<p
							className='text-base sm:text-lg md:text-xl leading-relaxed text-justify'
							style={{
								fontFamily: "Outfit, sans-serif",
								color: COLORS.textGray700,
							}}
						>
							Imagine a place where you can brainstorm big ideas,
							collaborate with brilliant minds, and still have
							time for a quick game of foosball. That's the kind
							of vibe we're all about. We've got a knack for
							finding the coolest spaces in town and transforming
							them into productivity powerhouses.
						</p>

						<p
							className='text-base sm:text-lg md:text-xl leading-relaxed text-justify'
							style={{
								fontFamily: "Outfit, sans-serif",
								color: COLORS.textGray700,
							}}
						>
							But we don't just stop at the design - we go all out
							to make sure your office runs smoothly, from
							top-notch amenities to 24/7 support. Basically,
							we're here to take care of the little things so you
							can focus on changing the world, one big idea at a
							time.
						</p>
					</div>

					{/* Stats Grid - Right Side */}
					<div className='lg:col-span-5 flex items-center justify-center'>
						<div className='grid grid-cols-2 gap-4 w-full'>
							{careersDataSource.map(
								(
									stat: { number: string; label: string },
									index: number,
								) => (
									<StatBox key={index} stat={stat} />
								),
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

const StatBox = ({ stat }: { stat: { number: string; label: string } }) => {
	const [count, setCount] = useState(0);
	const [isVisible, setIsVisible] = useState(false);

	// Parse the number to extract numeric value and suffix
	const parseNumber = (str: string) => {
		const match = str.match(/^(\d+)(k\+|\+)?$/i);
		if (match) {
			const value = parseInt(match[1]);
			const suffix = match[2] || "";
			return { value, suffix };
		}
		return { value: parseInt(str) || 0, suffix: "" };
	};

	const { value: targetValue, suffix } = parseNumber(stat.number);

	useEffect(() => {
		// Trigger animation on mount
		setIsVisible(true);
	}, []);

	useEffect(() => {
		if (!isVisible) return;

		const duration = 2000; // 2 seconds
		const steps = 60;
		const increment = targetValue / steps;
		let current = 0;
		let frame = 0;

		const timer = setInterval(() => {
			frame++;
			current += increment;

			if (frame >= steps) {
				setCount(targetValue);
				clearInterval(timer);
			} else {
				setCount(Math.floor(current));
			}
		}, duration / steps);

		return () => clearInterval(timer);
	}, [isVisible, targetValue]);

	return (
		<div
			className='flex flex-col items-center justify-center p-6 rounded-lg'
			style={{
				backgroundColor: "#eaf4fb",
				minHeight: "150px",
			}}
		>
			<div
				className='text-4xl sm:text-5xl md:text-6xl font-bold mb-2'
				style={{
					fontFamily: "Outfit, sans-serif",
					color: COLORS.brandBlue,
					lineHeight: 1,
				}}
			>
				{count}
				{suffix}
			</div>
			<div
				className='text-sm sm:text-base text-center'
				style={{
					fontFamily: "Outfit, sans-serif",
					color: COLORS.brandBlue,
				}}
			>
				{stat.label}
			</div>
		</div>
	);
};

export default AboutiSprout;
