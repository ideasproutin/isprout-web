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

const City = () => {
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
