import React, { useState, useEffect, useRef } from "react";
import { homePageImages } from "../../../assets";

interface Visionary {
	image: string;
	name: string;
	title: string;
	linkedin?: string;
}

const LinkedInIcon = () => (
	<svg
		width='28'
		height='32'
		viewBox='0 0 28 31.2533'
		fill='none'
		className='w-7 h-8'
	>
		<path
			d='M25.9296 0.000218506H2.07042C1.80222 -0.00391409 1.53592 0.0506098 1.28671 0.160677C1.03751 0.270743 0.810286 0.434197 0.618025 0.641702C0.425763 0.849208 0.272227 1.0967 0.166186 1.37005C0.0601442 1.64339 0.00367379 1.93724 0 2.2348V29.0185C0.00367379 29.3161 0.0601442 29.6099 0.166186 29.8833C0.272227 30.1566 0.425763 30.4041 0.618025 30.6116C0.810286 30.8191 1.03751 30.9826 1.28671 31.0926C1.53592 31.2027 1.80222 31.2572 2.07042 31.2531H25.9296C26.1978 31.2572 26.4641 31.2027 26.7133 31.0926C26.9625 30.9826 27.1897 30.8191 27.382 30.6116C27.5742 30.4041 27.7278 30.1566 27.8338 29.8833C27.9399 29.6099 27.9963 29.3161 28 29.0185V2.2348C27.9963 1.93724 27.9399 1.64339 27.8338 1.37005C27.7278 1.0967 27.5742 0.849208 27.382 0.641702C27.1897 0.434197 26.9625 0.270743 26.7133 0.160677C26.4641 0.0506098 26.1978 -0.00391409 25.9296 0.000218506ZM8.49296 26.1589H4.26761V12.0951H8.49296V26.1589ZM6.38028 10.1261C5.79755 10.1261 5.23869 9.86932 4.82664 9.41215C4.41459 8.95499 4.1831 8.33495 4.1831 7.68842C4.1831 7.0419 4.41459 6.42185 4.82664 5.96469C5.23869 5.50753 5.79755 5.2507 6.38028 5.2507C6.68971 5.21177 7.00306 5.24578 7.29982 5.35053C7.59658 5.45527 7.87005 5.62837 8.10233 5.85851C8.33461 6.08864 8.52046 6.37061 8.64771 6.68596C8.77495 7.00131 8.84073 7.34292 8.84073 7.68842C8.84073 8.03393 8.77495 8.37554 8.64771 8.69089C8.52046 9.00623 8.33461 9.2882 8.10233 9.51834C7.87005 9.74847 7.59658 9.92158 7.29982 10.0263C7.00306 10.1311 6.68971 10.1651 6.38028 10.1261ZM23.7324 26.1589H19.507V18.6113C19.507 16.7205 18.9014 15.486 17.3662 15.486C16.8911 15.4899 16.4284 15.6552 16.0406 15.9598C15.6528 16.2643 15.3584 16.6934 15.1972 17.1893C15.087 17.5566 15.0392 17.9434 15.0563 18.33V26.1432H10.831C10.831 26.1432 10.831 13.3608 10.831 12.0794H15.0563V14.064C15.4402 13.325 15.9985 12.7163 16.671 12.3032C17.3436 11.8902 18.105 11.6886 18.8732 11.72C21.6901 11.72 23.7324 13.7359 23.7324 18.0644V26.1589Z'
			fill='currentColor'
		/>
	</svg>
);

interface TeamCardProps {
	member: Visionary;
}

const TeamCard: React.FC<TeamCardProps> = ({ member }) => (
	<div className='bg-[#e3e2de] rounded-[15px] p-6 flex flex-col items-center w-full h-full'>
		<div className='w-full aspect-296/287 overflow-hidden mb-6 rounded-[10px]'>
			<img
				src={member.image}
				alt={member.name}
				className='w-full h-full object-cover'
			/>
		</div>
		<div className='flex items-start gap-3 w-full'>
			<div className='flex-1'>
				<h3 className="font-['Outfit',sans-serif] font-bold text-[20px] md:text-[24px] leading-[1.17] text-black capitalize mb-1">
					{member.name}
				</h3>
				<p className="font-['Outfit',sans-serif] font-normal text-[14px] md:text-[16px] leading-[1.17] text-black capitalize">
					{member.title}
				</p>
			</div>
			<div className='shrink-0 mt-1'>
				{member.linkedin ? (
					<a
						href={member.linkedin}
						target='_blank'
						rel='noopener noreferrer'
						className='text-gray-700 hover:text-gray-900 transition-colors cursor-pointer'
					>
						<LinkedInIcon />
					</a>
				) : (
					<div className='text-gray-700'>
						<LinkedInIcon />
					</div>
				)}
			</div>
		</div>
	</div>
);

const Visionaries: React.FC = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [typedText, setTypedText] = useState("");
	const sectionRef = useRef<HTMLDivElement>(null);
	const fullText = "Leadership";

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !isVisible) {
					setIsVisible(true);
				}
			},
			{ threshold: 0.1 },
		);

		const currentSection = sectionRef.current;

		if (currentSection) {
			observer.observe(currentSection);
		}

		return () => {
			if (currentSection) {
				observer.unobserve(currentSection);
			}
		};
	}, [isVisible]);

	useEffect(() => {
		if (!isVisible) return;

		let currentIndex = 0;
		const typingInterval = setInterval(() => {
			if (currentIndex <= fullText.length) {
				setTypedText(fullText.slice(0, currentIndex));
				currentIndex++;
			} else {
				clearInterval(typingInterval);
			}
		}, 100); // 100ms per character

		return () => clearInterval(typingInterval);
	}, [isVisible]);

	const topMembers: Visionary[] = [
		{
			image: homePageImages.sundari,
			name: "Sundari Patibandla",
			title: "CEO & Co-Founder",
			linkedin: "https://www.linkedin.com/in/sundaripatibandla/",
		},
		{
			image: homePageImages.sreenivas,
			name: "Sreenivas Tirdhala",
			title: "Co-Founder & CSO",
			linkedin: "https://www.linkedin.com/in/sreenivastirdhala/",
		},
	];

	const bottomMembers: Visionary[] = [
		{
			image: homePageImages.vasumathi,
			name: "Vasumathi Krishnan",
			title: "Chief Business Officer",
			linkedin:
				"https://www.linkedin.com/in/vasumathi-krishnan-20b47712/",
		},
		{
			image: homePageImages.vijay,
			name: "Vijay Pasupulati",
			title: "Chief Experience Officer",
			linkedin: "https://www.linkedin.com/in/vijaypasupulati/",
		},
		{
			image: homePageImages.sundari,
			name: "Sundari Patibandla",
			title: "CEO & Co-Founder",
			linkedin: "https://www.linkedin.com/in/sundaripatibandla/",
		},
	];

	return (
		<section className='bg-[#292929] min-h-screen py-12 md:py-20 px-4 md:px-8 lg:px-16'>
			<div className='max-w-7xl mx-auto' ref={sectionRef}>
				{/* Top Section - Heading on left, 2 cards on right */}
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 lg:mb-16'>
					{/* Left column - Heading and description */}
					<div className='lg:col-span-4'>
						<h1
							className='font-bold text-[40px] md:text-[56px] lg:text-[64px] leading-[1.17] text-white capitalize mb-6 md:mb-8'
							style={{ fontFamily: "Otomanopee One, sans-serif" }}
						>
							Our {typedText}
						</h1>
						<p className='font-normal text-[16px] md:text-[18px] leading-normal text-white max-w-[355px]'>
							iSprout's leadership team is dedicated to building
							workspaces that help businesses perform better every
							day. With deep expertise across strategy,
							operations, and customer experience, they guide
							iSprout's growth while keeping people and
							productivity at the center.
						</p>
					</div>

					{/* Right column - 2 cards */}
					<div className='lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8'>
						{topMembers.map((member, index) => (
							<TeamCard key={index} member={member} />
						))}
					</div>
				</div>

				{/* Bottom Section - 3 cards */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
					{bottomMembers.map((member, index) => (
						<TeamCard key={index} member={member} />
					))}
				</div>
			</div>
		</section>
	);
};

export default Visionaries;
