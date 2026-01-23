import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ourLocations from "../../content/ourLocations";
import centerPageHero from "../../assets/centers/centerpage_hero.png";
import SubNavbar from "../../components/SubNavbar/subnavbar";
import FutureOfWork from "../home/components/futureofwork";
import Footer from "../../components/footer/footer";
import Form from "./form";
import CenterImages from "./centerimages";
import CenterMap from "./centremap";
import Amenities from "./amenities";
import { COLORS } from "../../helpers/constants/Colors";

// Import center images
import oneGoldenMileImg from "../../assets/centers/One Golden Mile 1.jpg";
import orbitImg from "../../assets/centers/Orbit.jpg";
import myHomeTwitzaImg from "../../assets/centers/My-home-twitza 1.jpg";
import trendsetImg from "../../assets/centers/Trendset 1.jpg";
import sohiniImg from "../../assets/centers/Sohini Tech Park.jpg";
import divyasreeImg from "../../assets/centers/Divyashree Trinity.jpg";
import purvaImg from "../../assets/centers/Pranava One.jpg";
import purvaSummitImg from "../../assets/centers/purvasummit.jpg";
import sreshtaMarvelImg from "../../assets/centers/sreshata marvel.jpg";
import profoundImg from "../../assets/centers/Profound 1.jpg";
import nrEnclaveImg from "../../assets/centers/NREnclave.jpg";
import prestigeImg from "../../assets/centers/Prestige Saleh Ahmed 1.jpg";
import shilpithaImg from "../../assets/centers/Shilpitha Tech Park 1.jpg";
import jadeImg from "../../assets/centers/Kochar Jade.jpg";
import smTowerImg from "../../assets/centers/SMT 1.jpg";
import greyStoneImg from "../../assets/centers/GreyStone.jpg";
import panchshilTechparkImg from "../../assets/centers/Panchshil Techpark 1.jpg";
import panchshilTechpark1Img from "../../assets/centers/Sigapi-Achi-Building 2.jpg";
import vijayawadaBenzImg from "../../assets/centers/Benz Circle.jpg";
import medhaTowersImg from "../../assets/centers/Medha_Tower.jpg";
import godrejWatersideImg from "../../assets/centers/GodrejWaterside.jpg";
import aurelienImg from "../../assets/centers/Aurelien.jpg";
import hq27Img from "../../assets/centers/HQ 27.jpg";
import minaasImg from "../../assets/centers/Minaas .jpg";
import sasTowerImg from "../../assets/centers/SAS Tower 1.jpg";

const Centre = () => {
	const { centreId } = useParams();

	// YouTube video mapping for each center
	const centerVideoMap: { [key: string]: string } = {
		'sm-towers': 'sKIDQ5pY_Bw',
		'panchasilal-tech-park-1': 'uZZXN5QzMlo',
		'minaas': 'Lo1qCDRmYgE',
		'sas-tower': 'YuziFJcUz9U',
		'grey-stone': '5lskt8a4iSY',
		'godrej-waterside': 'lViNkpWP7Hk',
		'prestige-saleh-ahmed': 'OzrwDjluzxM',
		'nr-enclave': 'eOtTC0hEOTM',
		'panchasilal-tech-park': '8iHsyLbrm4E',
		'orbit': '1X_PORFWgLw',
		'divyasree-trinity': '8397EuYb7fE',
		'my-home-twitza': 'v63_G2aGnSU',
		'benz-circle': 'Xz_eLTSfWSc',
		'sohini-tech-park': 'rmR5Hqfno2M',
		'kochar-jade': 'N0r1Y82Sh6M',
		'sigapiachi': 'jzUACE-Luh0',
		'aurelien': '_64Z2xPg7mk',
		'medha-towers': 'q_NyZAmpk1Y',
		'jayabheri-trendset': 'Oo445LEkuZw',
		'profound-tech-park': 'YtsK6D7HDXY',
		'one-golden-mile': 'LzOl5ipiqqo',
		'sreshta-marvel': 'TztCEKFlqNY',
		'hq27': '-JKsdytzIwE',
		'shilpitha-tech-park': '-sHHfLmGn44',
		'pranava-one': 'jzUACE-Luh0',
		'purva-summit': '5subCFtrE1s'
	};

	// Hero image mapping for each center
	const centerImageMap: { [key: string]: string } = {
		'one-golden-mile': oneGoldenMileImg,
		'orbit': orbitImg,
		'my-home-twitza': myHomeTwitzaImg,
		'jayabheri-trendset': trendsetImg,
		'sohini-tech-park': sohiniImg,
		'divyasree-trinity': divyasreeImg,
		'pranava-one': purvaImg,
		'sreshta-marvel': sreshtaMarvelImg,
		'profound-tech-park': profoundImg,
		'nr-enclave': nrEnclaveImg,
		'prestige-saleh-ahmed': prestigeImg,
		'shilpitha-tech-park': shilpithaImg,
		'kochar-jade': jadeImg,
		'sigapiachi': panchshilTechpark1Img,
		'sm-towers': smTowerImg,
		'grey-stone': greyStoneImg,
		'panchasilal-tech-park': panchshilTechparkImg,
		'panchasilal-tech-park-1': panchshilTechpark1Img,
		'benz-circle': vijayawadaBenzImg,
		'medha-towers': medhaTowersImg,
		'godrej-waterside': godrejWatersideImg,
		'aurelien': aurelienImg,
		'hq27': hq27Img,
		'minaas': minaasImg,
		'sas-tower': sasTowerImg,
		'purva-summit': purvaSummitImg
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

	// Get the hero image for the current center
	const centerHeroImage = centreId && centerImageMap[centreId] ? centerImageMap[centreId] : centerPageHero;

	// Extract the locality/area name from location string
	// Format: "Building Name, Area, City" -> extract "Area"
	const getLocalityName = (location: string, city: string) => {
		// Special case for orbit to show just "Knowledge City"
		if (centreId === 'orbit') {
			return 'Knowledge City';
		}
		
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
			className="relative w-full min-h-[400px] md:min-h-[480px] lg:min-h-[540px] bg-cover bg-center flex items-end"
			style={{ backgroundImage: `url(${centerHeroImage})` }}
		>
			<div className="absolute bottom-0 left-0 right-0 z-10 bg-black/20 py-4 md:py-5 lg:py-6 px-8 md:px-16 lg:px-24">
				   <h1 className="text-white text-[48px] md:text-[64px] lg:text-[80px] xl:text-[96px] font-bold font-['Inter',sans-serif] tracking-tight leading-none">
					   Managed Office Space{' '}
					   <span className="text-[#FFDE00]">
						   {centreId === 'profound-tech-park'
							   ? 'Kondapur'
							   : centreId === 'hq27'
								   ? 'Gurugram'
								   : localityName}
					   </span>
				   </h1>
			</div>

			{/* Video Card - Positioned in top right */}
			<div className="absolute top-24 right-8 lg:right-16 z-20 hidden md:block">
				<div className="w-[420px] lg:w-[520px] xl:w-[580px] bg-white rounded-2xl shadow-2xl overflow-hidden">
					<div className="relative w-full h-[240px] lg:h-[280px] xl:h-[320px]">
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
		</section>
		<Form centerName={centerDetails.center_name} location={centerDetails.location} />

		{/* Center Images Gallery */}
		<CenterImages centreId={centreId} />

		{/* Center Map Section */}
		<CenterMap centerName={centerDetails.center_name} centreId={centreId} />

		{/* Amenities Section */}
		<Amenities />

		{/* Footer Section */}
		<Footer />

		</div>
	);
};

export default Centre;
