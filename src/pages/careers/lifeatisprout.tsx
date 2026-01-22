import React, { useState, useEffect } from "react";
import lifeatisprout1 from "../../assets/lifeatisprout/lifeatisprout1.jpg";
import lifeatisprout2 from "../../assets/lifeatisprout/lifeatisprout2.jpg";
import lifeatisprout3 from "../../assets/lifeatisprout/lifeatisprout3.jpg";
import lifeatisprout4 from "../../assets/lifeatisprout/lifeatisprout4.jpg";
import lifeatisprout5 from "../../assets/lifeatisprout/lifeatisprout5.jpg";
import lifeatisprout6 from "../../assets/lifeatisprout/lifeatisprout6.png";
import lifeatisprout7 from "../../assets/lifeatisprout/lifeatisprout7.png";
import lifeatisprout8 from "../../assets/lifeatisprout/lifeatisprout8.jpg";

const LifeAtISprout: React.FC = () => {
	const [currentSet, setCurrentSet] = useState(0);

	// Group images into sets of 4
	const imageSets = [
		[lifeatisprout1, lifeatisprout2, lifeatisprout3, lifeatisprout4],
		[lifeatisprout5, lifeatisprout6, lifeatisprout7, lifeatisprout8],
	];

	const handleNext = () => {
		setCurrentSet((prev) => (prev + 1) % imageSets.length);
	};

	// Auto-rotate every 5 seconds
	useEffect(() => {
		const interval = setInterval(handleNext, 5000);
		return () => clearInterval(interval);
	}, []);

	const currentImages = imageSets[currentSet];

	return (
		<section className='py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-16 bg-white'>
			<div className='max-w-7xl mx-auto'>
				{/* Heading with Navigation */}
				<div className='flex items-center justify-between mb-8 sm:mb-12'>
					<h2
						className='text-3xl sm:text-4xl md:text-5xl font-bold flex items-center gap-3'
						style={{
							fontFamily: "Otomanopee One, sans-serif",
							color: "#00275c",
						}}
					>
						<span
							className='w-2 h-12 bg-yellow-400'
							style={{ backgroundColor: "#FFDE00" }}
						></span>
						Life At iSprout
					</h2>
				</div>

				{/* Image Grid - 4 images layout matching reference */}
				<div className='grid grid-cols-12 gap-4'>
					{/* Top Row */}
					<div className='col-span-12 md:col-span-4'>
						<img
							src={currentImages[0]}
							alt='Life at iSprout'
							className='w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg'
						/>
					</div>
					<div className='col-span-12 md:col-span-8'>
						<img
							src={currentImages[1]}
							alt='Life at iSprout'
							className='w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg'
						/>
					</div>

					{/* Bottom Row */}
					<div className='col-span-12 md:col-span-7'>
						<img
							src={currentImages[2]}
							alt='Life at iSprout'
							className='w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg'
						/>
					</div>
					<div className='col-span-12 md:col-span-5'>
						<img
							src={currentImages[3]}
							alt='Life at iSprout'
							className='w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg'
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LifeAtISprout;
