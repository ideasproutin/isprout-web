import React from "react";
import { useParams } from "react-router-dom";
import cityData from "../../content/city";
import hyderabadHeroImage from "../../assets/city/hyderabadhero.png";
import Description from "./Description";

const City = () => {
	const { cityName } = useParams();

	const cityData = [
		{ city: "hyderabad", data: "aaaaaaaaaaaaaaaa" },
		{ city: "bangalore", data: "bbbbbbbbbbbb" },
		{ city: "chennai", data: "ccccccccccc" },
	];

	const selectedCityData = cityData.find(
		(obj) => obj.city.toLowerCase() === cityName?.toLowerCase()
	);

	return (
		<div className='min-h-screen bg-white'>
			{/* Hero Section */}
			<section className='relative h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden'>
				{/* Background Image */}
				<div className='absolute inset-0'>
					<img
						src={hyderabadHeroImage}
						alt={`${cityName} workspace`}
						className='w-full h-full object-cover'
					/>
					{/* Dark Overlay */}
					<div className='absolute inset-0 bg-black/30'></div>
				</div>

				{/* Hero Text */}
				<div className='relative z-10 h-full flex items-end px-4 lg:px-16 pb-12 lg:pb-16'>
					<div className='max-w-[1280px] mx-auto w-full'>
						<h1
							className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight'
							style={{ fontFamily: "Outfit, sans-serif" }}
						>
							<span className='text-white'>
								Managed Office Space{" "}
							</span>
							<span
								className='font-bold'
								style={{
									fontFamily: "Otomanopee One, sans-serif",
									color: "#FFDE00",
								}}
							></span>
						</h1>
					</div>
				</div>
			</section>

			{/* Description Section with Map */}
			<div className='mt-10 lg:mt-16'>
				<Description />
			</div>
		</div>
	);
};

export default City;
