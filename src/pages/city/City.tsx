import { useParams } from "react-router-dom";
import { useCityCenters } from "../../hooks/useCityCentre";
import { useMetaTags } from "../../hooks/useMetaTags";
import Description from "./Description";
// import CityCenters from "./CityCenters";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const City = () => {
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
			return "Gurugram";
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

	// City-specific meta tags
	const getCityMetaTags = (city: string | undefined) => {
		const formattedCity = formatCityName(city);
		console.log("City from URL:", city, "Formatted:", formattedCity);
		const metaData: { [key: string]: { title: string; description: string } } = {
			"Hyderabad": {
				title: "Top Managed Office Spaces in Hyderabad near IT HUB",
				description: "Enhance your work environment with fully serviced offices close to Hyderabads tech hub, offering seamless operations, scalability, and modern infrastructure."
			},
			"Bengaluru": {
				title: "Innovative Managed Office Space in Bangalore",
				description: "Creative, collaborative managed workspaces in Bangalore, A perfect space for startups & growing teams. Flexible plans with full-service support for businesses."
			},
			"Chennai": {
				title: "Work Smarter with Fully-Serviced Office space @Chennai",
				description: "Experience fully-managed office space in Chennais top tech hubs with flexible plans, premium amenities, and a business-ready environment."
			},
			"Gurugram": {
				title: "Managed Office Space in Gurugram Prime Business Hub",
				description: "Boost your business presence with iSprout, a fully serviced offices in Gurugram. Enjoy flexible layouts, on-site support, top-tier amenities in prime location."
			},
			"Pune": {
				title: "Are you looking for Managed Office Space in Pune?",
				description: "Set up your business with iSprout in iHub. A fully managed space designed for productivity with flexible pricing. Call @+91 84649 99920"
			},
			"Vijayawada": {
				title: "Premium Managed Office Space in Vijayawada",
				description: "Experience business-ready office spaces with iSprout. Offering modern amenities, flexible leasing, and a hassle-free professional work environment."
			},
			"Kolkata": {
				title: "Premium Managed Office Space in Kolkata",
				description: "Establish your business presence in Kolkata with flexible managed offices featuring modern infrastructure, prime locations, and comprehensive support."
			},
			"Ahmedabad": {
				title: "Get your Managed Office Space in Ahmedabad",
				description: "Set up your business in the heart of Ahmedabad with iSprout dynamic office spaces. Offering flexible plans with modern amenities"
			},
			"Visakhapatnam": {
				title: "Premium Managed Office Spaces in Visakhapatnam",
				description: "Upgrade your work experience with iSprouts managed offices in Vizag. Fully furnished, tech-enabled, and ready for global enterprises."
			}
		};

		return metaData[formattedCity] || {
			title: `Managed Office Space in ${formattedCity} | iSprout`,
			description: `Discover premium managed office spaces in ${formattedCity} with iSprout. Flexible, fully-serviced workspaces for growing businesses.`
		};
	};

	const cityMeta = getCityMetaTags(cityName);
	console.log("Meta tags being set:", cityMeta);
	
	useMetaTags({
		title: cityMeta.title,
		description: cityMeta.description
	});

	// Get hero image from city data
	const city =
		cityCentersData?.find(
			(c: { id: string }) => c.id === (cityName?.toLowerCase() || "hyderabad"),
		) || cityCentersData?.[0];

	const selectedHeroImage = city?.heroImage;

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
								fontFamily: "Outfit, sans-serif",
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
				<Description cityName={cityName} />
			</div>
			<ScrollToTop />
		</div>
	);
};
export default City;