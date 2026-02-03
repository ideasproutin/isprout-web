import { useParams } from "react-router-dom";
import citiesData from "../../content/city&CenterObject.json";
import { useCityCenters } from "../../hooks/useCityCentre";
import Description from "./Description";
// import CityCenters from "./CityCenters";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

// eslint-disable-next-line react-refresh/only-export-components
export default () => {
	const { data: cityCentersData } = useCityCenters();
	const { cityName } = useParams();

	// Format city name for display
	const formatCityName = (name: string | undefined): string => {
		if (!name) return "Hyderabad";
		// Handle special cases
		if (
			name.toLowerCase() === "delhi-ncr" ||
			name.toLowerCase() === "gurugram"
		) {
			return "Delhi NCR";
		}
		if (
			name.toLowerCase() === "bengaluru" ||
			name.toLowerCase() === "bangalore"
		) {
			return "Bengaluru";
		}
		// Capitalize first letter
		return name.charAt(0).toUpperCase() + name.slice(1);
	};

	// Get hero image from city data
	const city =
		(cityCentersData || citiesData).find(
			(c:any) => c.id === (cityName?.toLowerCase() || "hyderabad"),
		) || (cityCentersData || citiesData)[0];

	const selectedHeroImage = city.heroImage;

	return (
		<div className='bg-white'>
			{/* Hero Section */}
			<section className='relative w-full h-screen overflow-hidden'>
				{/* Background Image */}
				<div className='absolute inset-0'>
					<img
						src={selectedHeroImage}
						alt={`${cityName} workspace`}
						className='w-full h-full object-cover'
					/>
				</div>

				{/* Hero Text with Glassy Black Rectangle Background - Full Width at Bottom */}
				<div
					className='absolute bottom-0 left-0 right-0 z-10 py-4 md:py-5 lg:py-6 px-8 md:px-16 lg:px-24'
					style={{
						backgroundColor: "rgba(0, 0, 0, 0.3)",
						backdropFilter: "blur(10px)",
						WebkitBackdropFilter: "blur(10px)",
					}}
				>
					<h1
						className='text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-none tracking-tight'
						style={{ fontFamily: "Outfit, sans-serif" }}
					>
						<span className='text-white'>
							Managed Office Space{" "}
						</span>
						<span
							style={{
								fontFamily: "Otomanopee One, sans-serif",
								color: "#FFDE00",
							}}
						>
							{formatCityName(cityName)}
						</span>
					</h1>
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
