import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useMetaTags } from "../../hooks/useMetaTags";
import ourLocations from "../../content/ourLocations";
import centerPageHero from "../../assets/centers/centerpage_hero.png";
import SubNavbar from "../../components/SubNavbar/subnavbar";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import Form from "./form";
import CenterImages from "./centerimages";
import CenterMap from "./centremap";
import Amenities from "../home/components/amenities";
import { COLORS } from "../../helpers/constants/Colors";
import cityData from "../../content/city&CenterObject.json";
import { useCityCenters } from "../../hooks/useCityCentre";

const Centre = () => {
	const { data: cityCentersApiData } = useCityCenters();
	const { centreId } = useParams();

	// URL mapping: new URL slug -> API id
	const urlToIdMap: { [key: string]: string } = {
		"jayabheri-trendset-connect": "jayabheri-trendset",
		"n-r-enclave": "nr-enclave",
		"jade": "kochar-jade",
		"sigapi-achi-building": "sigapi-achi",
		"s-m-tower": "saravana-matrix",
		"managed-office-space-gurugram": "hq27",
		"grey-stone": "greystone-baner",
		"pune-hinjewadi": "panchshil-techpark",
		"pune-yerwada": "panchshil-techpark-one",
		"vijayawada": "benz-circle",
		"medha-towers-vijayawada": "medha-towers",
		"managed-office-space-in-kolkata": "godrej-waterside",
		"managed-office-space-ahmedabad": "aurelien",
		"managed-office-space-in-visakhapatnam": "lansum-square",
	};

	// Get the actual center ID for API lookup
	const actualCentreId = urlToIdMap[centreId || ""] || centreId;

	// Find center data from city&CenterObject.json
	const centerData = useMemo(() => {
		for (const city of cityCentersApiData || cityData) {
			const center = city.centers.find((c: { id: string }) => c.id === actualCentreId);
			if (center) {
				return center;
			}
		}
		return null;
	}, [actualCentreId, cityCentersApiData]);

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
			(c) => c.centreRedirect === `/office/${centreId}`,
		);
		if (center) {
			centerDetails = center;
			cityName = cityData.city;
			break;
		}
	}

	// Centre-specific meta data
	const centreMetaData: { [key: string]: { title: string; description: string } } = {
		"orbit": {
			title: "Find Fully-Serviced Workspaces in Knowledge City",
			description: "Empower your team with iSprout managed offices at Orbit, offering adaptable spaces, smart infrastructure, and all the essentials for a smooth workday."
		},
		"one-golden-mile": {
			title: "Fully-Equipped Managed Office Space at Kokapet",
			description: "Set up your business at iSprouts managed office space in One Gold Mile, Kokapet - premium location, modern amenities & flexible plans that fit your needs."
		},
		"my-home-twitza": {
			title: "Work Better from Premium Workspaces in Raidurg",
			description: "iSprout brings modern, fully managed office spaces to Twitza with flexible layouts, collaborative zones, and premium amenities for growing businesses"
		},
		"jayabheri-trendset-connect": {
			title: "Level Up Your Ideal Workspace in Kondapur Now",
			description: "Premium managed workspaces with modern design, flexible setups, and full business support, expertly delivered by iSprout at Jayabheri for growing teams."
		},
		"sohini-tech-park": {
			title: "Explore Fully-Serviced Office Spaces in Nanakramguda",
			description: "In Hyderabads IT hub, isprout provides premium managed workspaces at Sohini, equipped with flexible plans, modern amenities & a business ready setup."
		},
		"divyasree-trinity": {
			title: "Secure Fully-Furnished Office Space in Madhapur Now",
			description: "Flexible layouts & seamless support come together with iSprout managed office spaces at Divyasree Trinity, designed for productivity and team efficiency."
		},
		"modern-profound": {
			title: "Set Up Your Business in Kondapurs Premium Workspaces",
			description: "From startups to enterprises, iSprout office space at Modern Profound Tech Park offers the perfect blend of flexibility, infrastructure, & support at Kondapur."
		},
		"pranava-one": {
			title: "Move Into Business-Ready Managed Offices in Somajiguda",
			description: "iSprout provides sleek, fully managed office space at Pranava One, offering flexibility, great connectivity, and premium amenities for growing teams."
		},
		"purva-summit": {
			title: "Get Flexible Managed Office Space in Whitefields",
			description: "Smartly designed managed work space by iSprout at Purva Summit offer agility, comfort, and services tailored for startups, teams, and growing enterprises."
		},
		"sreshta-marvel": {
			title: "Rent Managed Office Space available in Gachibowli",
			description: "iSprout brings premium workspaces to Sreshta Marvel, offering smart design, full-service support, and flexibility for teams of all sizes."
		},
		"n-r-enclave": {
			title: "Get your Premium Managed Office Space in Whitefield",
			description: "Find your perfect managed office with iSprout at NR Enclave, Whitefield, Enjoy smart workspace designs, support services, and business-ready setups."
		},
		"prestige-saleh-ahmed": {
			title: "Grow Smarter with Managed Office Space on Infantry Road",
			description: "Experience modern work space with iSprout at Prestige Saleh Ahmed, Infantry Rd. Enjoy vibrant workspaces, premium amenities, and flexible rental plans."
		},
		"shilpitha-tech-park": {
			title: "Get Bellandurs Best Fully-Managed Office Space",
			description: "Rent fully equipped workspaces with iSprout at Shilpitha Tech Park, Bellandur. Ideal for startups and enterprises seeking flexibility and convenience."
		},
		"jade": {
			title: "Find Top-Tier Managed Office Space in Guindy Today",
			description: "iSprout brings flexible, high-end office spaces to Jade in Guindy, Chennai. Set up your business in a dynamic environment built for productivity and scale."
		},
		"sigapi-achi-building": {
			title: "Fully-Equipped Managed Office Space Available Egmore",
			description: "Flexible managed office space near Egmore offering modern amenities, hassle-free operations, and a business-ready environment."
		},
		"s-m-tower": {
			title: "Fully-Managed Office Space Available for rent on OMR",
			description: "Book your work space with iSprout at SM Tower, OMR Chennai. Enjoy flexible plans, modern amenities, and a vibrant workspace designed for success."
		},
		"managed-office-space-gurugram": {
			title: "Find Managed Office Space in Gurugram",
			description: "Find your ideal managed workspace with iSprout at HQ27, Gurugram. Enjoy top amenities, flexible plans, and a professional business setting."
		},
		"grey-stone": {
			title: "Premium Office Space for Businesses in Baner's IT Zone",
			description: "Set up your workspace with iSprout at Grey Stone, Baner, Pune. Enjoy flexible office solutions, premium amenities & a thriving professional environment."
		},
		"pune-hinjewadi": {
			title: "Premium Managed Office Space available at Hinjewadi",
			description: "Elevate your business presence with iSprouts premium office spaces in Hinjewadi, Pune. Enjoy top facilities, seamless services, and flexible leasing options."
		},
		"pune-yerwada": {
			title: "Explore Smart Managed Office Space Options in Yerwada",
			description: "Explore iSprouts vibrant managed workspaces in Yerwada, Pune. Designed for productivity, these offices come with top amenities and seamless business support."
		},
		"vijayawada": {
			title: "Work Smart in Fully-Managed Office space at Benz Circle",
			description: "Make the smart move with iSprout at Benz Circle, VJA. Flexible workspace solutions tailored for evolving teams, complete with top-class business amenities."
		},
		"medha-towers-vijayawada": {
			title: "Premium Managed Office Space available in Gannavaram",
			description: "Discover iSprouts premium office spaces at Medha Towers, Vijayawada. Experience seamless operations, top-class facilities, and a vibrant work environment."
		},
		"managed-office-space-in-kolkata": {
			title: "Book Modern Managed Office Space at Bidhannagar Now",
			description: "iSprout offers premium managed office spaces at Godrej Waterside, Salt Lake ideal for teams seeking flexibility, modern amenities, and a prime IT location."
		},
		"managed-office-space-ahmedabad": {
			title: "Discover Managed Office Space in Makarba, Ahmedabad",
			description: "Explore iSprout's dynamic office spaces at Aurelien, Makarba. Ideal for startups & enterprises seeking vibrant, fully serviced workspaces."
		},
		"managed-office-space-in-visakhapatnam": {
			title: "Premium Managed Workspaces in Maddilapalem",
			description: "Experience flexible managed workspaces in Maddilapalem, Visakhapatnam, designed for productivity, collaboration, and business success."
		}
	};

	const meta = centreMetaData[centreId || ""] || {
		title: `Managed Office Spaces in ${cityName} - iSprout`,
		description: `Discover premium managed office spaces in ${cityName} at iSprout. Our fully serviced workspaces offer top-notch amenities designed to elevate your business operations.`
	};

	useMetaTags({
		title: meta.title,
		description: meta.description
	});

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
				className='relative w-full min-h-[440px] md:min-h-[520px] lg:min-h-[600px] bg-cover bg-center flex items-end mt-20 sm:mt-16 md:mt-20 lg:mt-24'
				style={{ backgroundImage: `url(${centerHeroImage})` }}
			>
				<div className='absolute bottom-0 left-0 right-0 z-10 bg-black/20 py-4 md:py-5 lg:py-6 px-8 md:px-16 lg:px-24'>
					<h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold font-['Inter',sans-serif] tracking-tight leading-none">
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

		{/* Center Map Section */}
		<CenterMap
			centerName={centerDetails.center_name}
			centreId={actualCentreId}
		/>

		{/* Center Images Gallery */}
		<CenterImages centreId={actualCentreId} />

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
