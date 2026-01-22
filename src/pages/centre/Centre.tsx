import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ourLocations from "../../content/ourLocations";
import centerPageHero from "../../assets/centers/centerpage_hero.png";
import SubNavbar from "../../components/SubNavbar/subnavbar";
import FutureOfWork from "../home/components/futureofwork";
import Footer from "../../components/footer/footer";
import Form from "./form";
import CenterMap from "./centremap";
import Amenities from "./amenities";
import { COLORS } from "../../helpers/constants/Colors";

const Centre = () => {
	const { centreId } = useParams();

	// YouTube video mapping for each center
	const centerVideoMap: { [key: string]: string } = {
		'sm-tower': 'sKIDQ5pY_Bw',
		'panchshil-tech-park-1': 'uZZXN5QzMlo',
		'minaas': 'Lo1qCDRmYgE',
		'sas-itower': 'YuziFJcUz9U',
		'grey-stone': '5lskt8a4iSY',
		'godrej-water-side': 'lViNkpWP7Hk',
		'prestige-saleh-ahmed': 'OzrwDjluzxM',
		'nr-enclave': 'OzrwDjluzxM',
		'panchshil-tech-park': '8iHsyLbrm4E',
		'orbit': '1X_PORFWgLw',
		'divyasree-trinity': '8397EuYb7fE',
		'myhome-twitza': 'v63_G2aGnSU',
		'vijayawada-benz-circle': 'Xz_eLTSfWSc',
		'sohini-tech-park': 'rmR5Hqfno2M',
		'jade': 'N0r1Y82Sh6M',
		'aurelian': '_64Z2xPg7mk',
		'medha-towers': 'q_NyZAmpk1Y',
		'jayabheri-trendset': 'Oo445LEkuZw',
		'profound': 'YtsK6D7HDXY',
		'one-golden-mile': 'LzOl5ipiqqo',
		'sreshta-marvel': 'TztCEKFlqNY',
		'hq27': '-JKsdytzIwE',
		'shilpitha-tech-park': '-sHHfLmGn44',
		'purva': '5subCFtrE1s'
	};

	// Scroll to top when component mounts
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [centreId]);

	// Find the center details
	let centerDetails: any = null;
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

	// Get the video URL for the current center
	const videoId = centreId ? centerVideoMap[centreId] : null;
	const youtubeEmbedUrl = videoId 
		? `https://www.youtube.com/embed/${videoId}`
		: "https://www.youtube.com/embed/Lo1qCDRmYgE"; // Default fallback

	// Extract the locality/area name from location string
	// Format: "Building Name, Area, City" -> extract "Area"
	const getLocalityName = (location: string, city: string) => {
		const parts = location.split(',').map(part => part.trim());
		// Remove the city name and building name, get the middle part
		const withoutCity = parts.filter(part => !part.includes(city));
		// Return the last part (which should be the locality/area)
		return withoutCity.length > 1 ? withoutCity[withoutCity.length - 1] : withoutCity[0];
	};

	const localityName = getLocalityName(centerDetails.location, cityName);

	return (
		<div className='min-h-screen' style={{ backgroundColor: COLORS.white }}>
			{/* Navbar on top */}
			<div className='sticky top-0 z-50 bg-white'>
				<SubNavbar />
			</div>

			{/* Hero Section */}
			<section
				className="relative w-full min-h-[400px] md:min-h-[480px] lg:min-h-[540px] bg-cover bg-center flex items-end pt-24"
				style={{ backgroundImage: `url(${centerPageHero})` }}
			>
				{/* Dark Overlay */}
				<div className="absolute inset-0 bg-black/40" />

				{/* Content Container */}
				<div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pb-8 md:pb-12 lg:pb-16">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center lg:items-end">
						{/* Left Side - Text Content */}
						<div className="flex flex-col gap-6 lg:gap-8">
							{/* View Location Button */}
							{/* <button
								onClick={handleViewLocation}
								className="inline-flex items-center justify-center px-10 py-4 text-black font-extrabold text-xl md:text-2xl rounded-full shadow-lg w-fit"
								style={{ 
									fontFamily: 'Outfit, sans-serif',
									backgroundColor: COLORS.brandYellow
								}}
							>
								View Location
							</button> */}

							{/* Headline */}
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
								<span className="text-white whitespace-nowrap" style={{ fontFamily: 'Outfit, sans-serif' }}>
									Managed Office Space{' '}
								</span>
								<span className="text-[#FFDE00] whitespace-nowrap" style={{ fontFamily: 'Outfit, sans-serif' }}>
								{localityName}
								</span>
							</h1>
						</div>

						{/* Right Side - Video Card */}
						<div className="flex items-center justify-center lg:justify-end lg:-mb-12 lg:-translate-y-26 lg:translate-x-48">
							<div className="w-full max-w-[520px] md:max-w-[580px] lg:max-w-[640px] bg-white rounded-2xl shadow-2xl overflow-hidden">
								{/* YouTube Embed */}
								<div className="relative w-full h-[260px] md:h-[320px] lg:h-[360px]">
									<iframe
										className="absolute top-0 left-0 w-full h-full"
										src={youtubeEmbedUrl}
										title="Video preview"
										frameBorder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

		{/* Form Section */}
		<Form centerName={centerDetails.center_name} location={centerDetails.location} />

		{/* Center Map Section */}
		<CenterMap centerName={centerDetails.center_name} centreId={centreId} />

	{/* Amenities Section */}
	<Amenities />


		</div>
	);
};

export default Centre;
