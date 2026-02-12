import React from "react";
import privacyHeroImage from "../../assets/privacypolicy/privacypolicy-hero.jpg";

const PrivacyPolicyHero: React.FC = () => {
	return (
		<section className='relative w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden flex items-end mt-20 sm:mt-16 md:mt-20 lg:mt-24'>
			{/* Hero Image */}
			<div className='absolute inset-0'>
				<img 
					src={privacyHeroImage} 
					alt="Privacy Policy"
					className='w-full h-full object-cover'
				/>
				{/* Overlay */}
				<div className='absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent' style={{ zIndex: 5 }} />
			</div>

			{/* Title */}
			<div className='absolute bottom-0 left-0 right-0 bg-black/20 py-4 md:py-5 lg:py-6 px-8 md:px-16 lg:px-24' style={{ zIndex: 10 }}>
				<h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold font-['Inter',sans-serif] tracking-tight leading-none">
					Privacy Policy
				</h1>
			</div>
		</section>
	);
};

export default PrivacyPolicyHero;
