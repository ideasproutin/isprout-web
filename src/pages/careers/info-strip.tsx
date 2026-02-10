import { COLORS } from "../../helpers/constants/Colors";
import { useEffect, useRef, useState } from "react";
import { useCareers } from "../../hooks/useCareers";

const InfoStrip = () => {
	const { data: careersDataResponse } = useCareers();
	const careersDataSource =
		careersDataResponse?.careersIntroData?.stats || [];

	const [isVisible, setIsVisible] = useState(false);
	const sectionRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
				}
			},
			{ threshold: 0.3 },
		);

		const currentRef = sectionRef.current;
		if (currentRef) {
			observer.observe(currentRef);
		}

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef);
			}
		};
	}, []);

	return (
		<section
			ref={sectionRef}
			className='w-full py-2 sm:py-4 md:py-6'
			style={{ backgroundColor: COLORS.brandBlue }}
		>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16'>
				<div className='grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'>
					{careersDataSource.map(
						(
							stat: { number: string; label: string },
							index: number,
						) => (
							<CountUpStat
								key={index}
								stat={stat}
								isVisible={isVisible}
							/>
						),
					)}
				</div>
			</div>
		</section>
	);
};

const CountUpStat = ({
	stat,
	isVisible,
}: {
	stat: { number: string; label: string };
	isVisible: boolean;
}) => {
	const [count, setCount] = useState(0);

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
		<div className='text-center'>
			<h2
				className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1'
				style={{ fontFamily: "Outfit, sans-serif" }}
			>
				{count}
				{suffix}
			</h2>
			<p
				className='text-base sm:text-lg md:text-xl text-white font-normal'
				style={{ fontFamily: "Outfit, sans-serif" }}
			>
				{stat.label}
			</p>
		</div>
	);
};

export default InfoStrip;
