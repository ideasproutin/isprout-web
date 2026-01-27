import { useParams } from "react-router-dom";
import hyderabadHero from "../../assets/city/Hyderabad.jpg";
import bangaloreHero from "../../assets/city/Bangalore.jpg";
import chennaiHero from "../../assets/city/Chennai.jpg";
import puneHero from "../../assets/city/Pune.jpg";
import vijayawadaHero from "../../assets/city/Vijayawada.jpg";
import kolkataHero from "../../assets/city/Kolkata.jpg";
import ahmedabadHero from "../../assets/city/Amhedabad.jpg";
import delhiHero from "../../assets/city/Delhi NCR.jpg";
import vizagHero from "../../assets/city/Vizag.jpg";
import Description from "./Description";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

export default () => {
	const { cityName } = useParams();

	// Map city names to hero images
	const cityHeroImages: Record<string, string> = {
		hyderabad: hyderabadHero,
		bangalore: bangaloreHero,
		bengaluru: bangaloreHero,
		chennai: chennaiHero,
		pune: puneHero,
		vijayawada: vijayawadaHero,
		kolkata: kolkataHero,
		ahmedabad: ahmedabadHero,
		delhi: delhiHero,
		"delhi-ncr": delhiHero,
		gurugram: delhiHero,
		vizag: vizagHero,
	};

	const selectedHeroImage =
		cityHeroImages[cityName?.toLowerCase() || ""] || hyderabadHero;

	return (
		<div className='min-h-screen bg-white'>
			{/* Hero Section */}
			<section className='relative h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden'>
				{/* Background Image */}
				<div className='absolute inset-0'>
					<img
						src={selectedHeroImage}
						alt={`${cityName} workspace`}
						className='w-full h-full object-cover'
					/>
					{/* Dark Overlay */}
					<div className='absolute inset-0 bg-black/30'></div>
				</div>

				{/* Hero Text */}
				<div className='relative z-10 h-full flex items-end px-4 lg:px-16 pb-12 lg:pb-16'>
					<div className='max-w-7xl mx-auto w-full'>
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
			<ScrollToTop />
		</div>
	);
};
