import { useParams } from "react-router-dom";
import hyderabadHeroImage from "../../assets/city/hyderabadhero.png";
import Description from "./Description";
import CityCenters from "./CityCenters";
import Footer from "../../components/footer/footer";

const Hero = () => {
	const { cityName } = useParams<{ cityName: string }>();

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
			<div className='mt-4 lg:mt-6'>
				<Description cityName={cityName} />
			</div>

			{/* City Centers Section */}
			<CityCenters cityName={cityName} />

			{/* Footer */}
			<Footer />
		</div>
	);
};

export default Hero;
