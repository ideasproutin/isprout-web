import React, { useState, useEffect } from "react";
import managedoffice1 from "../../assets/managedoffice/managedoffice (1).jpg";
import managedoffice2 from "../../assets/managedoffice/managedoffice (2).jpg";
import managedoffice3 from "../../assets/managedoffice/managedoffice (3).jpg";
import managedoffice4 from "../../assets/managedoffice/managedoffice (4).jpg";

const IntroSection: React.FC = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const slides = [
		managedoffice1,
		managedoffice2,
		managedoffice3,
		managedoffice4,
	];

	// Auto-play carousel every 4 seconds
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % slides.length);
		}, 4000);

		return () => clearInterval(timer);
	}, [slides.length]);

	return (
		<section className='relative w-full min-h-[400px] md:min-h-[480px] lg:min-h-[540px] overflow-hidden flex items-end'>
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
							alt={`Managed Office ${index + 1}`}
							className='w-full h-full object-cover'
						/>
					</div>
				))}
				{/* Overlay */}
				<div className='absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent' style={{ zIndex: 5 }} />
			</div>

			{/* Title */}
			<div className='absolute bottom-0 left-0 right-0 bg-black/20 py-4 md:py-5 lg:py-6 px-8 md:px-16 lg:px-24' style={{ zIndex: 10 }}>
				<h1 className="text-white text-[48px] md:text-[64px] lg:text-[80px] xl:text-[96px] font-bold font-['Inter',sans-serif] tracking-tight leading-none">
					Managed Offices
				</h1>
			</div>
		</section>
	);
};

export default IntroSection;
