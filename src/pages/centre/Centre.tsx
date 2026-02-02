import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import ourLocations from "../../content/ourLocations";
import centerPageHero from "../../assets/centers/centerpage_hero.png";
import SubNavbar from "../../components/SubNavbar/subnavbar";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import Form from "./form";
import CenterImages from "./centerimages";
import CenterMap from "./centremap";
import Amenities from "./amenities";
import { COLORS } from "../../helpers/constants/Colors";
import cityData from "../../content/city&CenterObject.json";

const Centre = () => {
	const { centreId } = useParams();

	// Find center data from city&CenterObject.json
	const centerData = useMemo(() => {
		for (const city of cityData) {
			const center = city.centers.find((c) => c.id === centreId);
			if (center) {
				return center;
			}
		}
		return null;
	}, [centreId]);

	// Extract video ID from YouTube URL
	const getVideoId = (videoLink: string) => {
		if (!videoLink) return null;
		const match = videoLink.match(/(?:youtu\.be\/|youtube\.com\/embed\/|v=)([a-zA-Z0-9_-]+)/);
		return match ? match[1] : null;
	};

	// Scroll to top when component mounts
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [centreId]);

	// Find the center details
	let centerDetails: typeof ourLocations[0]['centers'][0] | null = null;
	let cityName: string = "";

	for (const cityData of ourLocations) {
		const center = cityData.centers.find(
			(c) => c.centreRedirect === `/centre/${centreId}`,
		);
		if (center) {
			centerDetails = center;
			cityName = cityData.city;
			break;
		}
	}

	console.log("Center Details:", centerDetails);
	if (!centerDetails) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				Center not found
			</div>
		);
	}

	// Get the video URL and hero image from center data
	const videoId = centerData?.videoLink ? getVideoId(centerData.videoLink) : null;
	const youtubeEmbedUrl = videoId
		? `https://www.youtube.com/embed/${videoId}`
		: "https://www.youtube.com/embed/Lo1qCDRmYgE"; // Default fallback

	const centerHeroImage = centerData?.heroImage || centerPageHero;

	// Extract the locality/area name from location string
	// Format: "Building Name, Area, City" -> extract "Area"
	const getLocalityName = (location: string, city: string) => {
		// Special case for orbit to show just "Knowledge City"
		if (centreId === "orbit") {
			return "Knowledge City";
		}

		const parts = location.split(",").map((part) => part.trim());
		// Remove the city name and building name, get the middle part
		const withoutCity = parts.filter((part) => !part.includes(city));
		// Return the last part (which should be the locality/area)
		return withoutCity.length > 1
			? withoutCity[withoutCity.length - 1]
			: withoutCity[0];
	};

	const localityName = getLocalityName(centerDetails.location, cityName);

	return (
		<div className='min-h-screen' style={{ backgroundColor: COLORS.white }}>
			{/* Navbar on top */}
			<SubNavbar />

			{/* Hero Section */}
			<section
				className='relative w-full min-h-[440px] md:min-h-[520px] lg:min-h-[600px] bg-cover bg-center flex items-end'
				style={{ backgroundImage: `url(${centerHeroImage})` }}
			>
				<div className='absolute bottom-0 left-0 right-0 z-10 bg-black/20 py-4 md:py-5 lg:py-6 px-8 md:px-16 lg:px-24'>
					<h1 className="text-white text-[48px] md:text-[64px] lg:text-[80px] xl:text-[96px] font-bold font-['Inter',sans-serif] tracking-tight leading-none">
						Managed Offices{" "}
						<span className='text-[#FFDE00]'>
							{centreId === "modern-profound"
								? "Kondapur"
								: centreId === "hq27"
									? "Gurugram"
									: localityName}
						</span>
					</h1>
				</div>

				{/* Video Card - Positioned in top right */}
				<div className='absolute top-24 right-8 lg:right-16 z-20 hidden md:block'>
					<div className='w-[420px] lg:w-[520px] xl:w-[580px] bg-white rounded-2xl shadow-2xl overflow-hidden'>
						<div className='relative w-full h-60 lg:h-[280px] xl:h-80'>
							<iframe
								className='absolute top-0 left-0 w-full h-full'
								src={youtubeEmbedUrl}
								title='Video preview'
								frameBorder='0'
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
								allowFullScreen
							/>
						</div>
					</div>
				</div>
			</section>
			<Form
				centerName={centerDetails.center_name}
				location={centerDetails.location}
			/>

			{/* Center Images Gallery */}
			<CenterImages centreId={centreId} />

			{/* Center Map Section */}
			<CenterMap
				centerName={centerDetails.center_name}
				centreId={centreId}
			/>

			{/* Amenities Section */}
			<Amenities />

			{/* Footer Section */}
			<Footer />

			{/* Scroll to Top Button */}
			<ScrollToTop />
		</div>
	);
};

export default Centre;
