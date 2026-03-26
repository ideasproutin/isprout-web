import React, { useState, useEffect } from "react";
import { MetaTags } from "../../hooks/useMetaTags";
import meetingroom1 from "../../assets/meetingroom/meetingroom_glimpse1.webp";
import meetingroom2 from "../../assets/meetingroom/meetingroom_glimpse2.webp";
import meetingroom3 from "../../assets/meetingroom/meetingroom_glimpse3.webp";
import meetingroom4 from "../../assets/meetingroom/meetingroom_glimpse4.webp";
import MeetingRooms from "./meetingrooms";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const IntroSection: React.FC = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const slides = [meetingroom1, meetingroom2, meetingroom3, meetingroom4];

	// Auto-play carousel every 4 seconds
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % slides.length);
		}, 4000);

		return () => clearInterval(timer);
	}, [slides.length]);

	return (
		<section className='relative w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden flex items-end mt-20 sm:mt-16 md:mt-20 lg:mt-24'>
			<MetaTags
				title='iSprout: Premium Meeting Rooms Across India'
				description='Book fully equipped, tech-enabled meeting rooms at iSprout with flexible plans and professional support for every business need.'
				keywords='meeting rooms, conference rooms, hourly booking, team meetings, presentation rooms, collaborative spaces'
			/>
			{/* Carousel Images */}
			<div className='absolute inset-0'>
				{slides.map((slide, index) => (
					<div
						key={index}
						className='absolute inset-0 transition-opacity duration-1000 ease-in-out'
						style={{
							opacity: index === currentSlide ? 1 : 0,
							zIndex: index === currentSlide ? 1 : 0,
						}}
					>
						<img
							src={slide}
							alt={`Meeting Room ${index + 1}`}
							className='w-full h-full object-cover'
						/>
					</div>
				))}
				{/* Overlay */}
				<div
					className='absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent'
					style={{ zIndex: 5 }}
				/>
			</div>

			{/* Title */}
			<div
				className='absolute bottom-0 left-0 right-0 bg-black/20 py-4 md:py-5 lg:py-6 px-8 md:px-16 lg:px-24'
				style={{ zIndex: 10 }}
			>
				<h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold font-['Inter',sans-serif] tracking-tight leading-none">
					Meeting Rooms
				</h1>
			</div>
		</section>
	);
};

const MeetingRoomsIntro = () => {
	return (
		<div>
			<IntroSection />
			<MeetingRooms />
			<Footer />
			<ScrollToTop />
		</div>
	);
};

export default MeetingRoomsIntro;
