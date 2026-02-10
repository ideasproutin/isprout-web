import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
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
			const center = city.centers.find((c: any) => c.id === actualCentreId);
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

	// Centre-specific meta data
	const centreMetaData: { [key: string]: { title: string; description: string } } = {
		"orbit": {
			title: "Find Fully-Serviced Workspaces in Knowledge City, Hyderabad",
			description: "Discover premium managed office spaces in Knowledge City, Hyderabad, at iSprout. Our fully serviced workspaces offer top-notch amenities designed to elevate your business operations and drive growth."
		},
		"jayabheri-trendset-connect": {
			title: "Find Fully-Serviced Workspaces in Gachibowli, Hyderabad",
			description: "Explore iSprout's managed office spaces in Gachibowli, Hyderabad. Our fully equipped workspaces are ideal for businesses looking for flexibility, modern facilities, and strategic location near IT hubs."
		},
		"n-r-enclave": {
			title: "Find Fully-Serviced Workspaces in Kondapur, Hyderabad",
			description: "Step into iSprout's managed office spaces in Kondapur, Hyderabad. With cutting-edge amenities and flexible workspace options, we provide the ideal environment for your business to thrive."
		},
		"techverx": {
			title: "Find Fully-Serviced Workspaces in Madhapur, Hyderabad",
			description: "Elevate your work experience with iSprout's managed office spaces in Madhapur, Hyderabad. Enjoy fully serviced workspaces designed to meet your business needs in the heart of the city's tech district."
		},
		"eon": {
			title: "Find Fully-Serviced Workspaces in Kothaguda, Hyderabad",
			description: "Unlock productivity at iSprout's managed office spaces in Kothaguda, Hyderabad. Our fully serviced offices offer modern infrastructure, flexible terms, and premium amenities for your business success."
		},
		"jade": {
			title: "Find Fully-Serviced Workspaces in Koramangala, Bangalore",
			description: "Discover iSprout's managed office spaces in Koramangala, Bangalore. Our fully equipped, flexible workspaces are perfect for startups and established businesses seeking top-tier amenities and a strategic location."
		},
		"eon-free-press": {
			title: "Find Fully-Serviced Workspaces in Nariman Point, Mumbai",
			description: "Work smarter at iSprout's managed office spaces in Nariman Point, Mumbai. Offering fully serviced offices in one of Mumbai's prime business districts, we ensure your business thrives in an upscale environment."
		},
		"one-world": {
			title: "Find Fully-Serviced Workspaces in Lower Parel, Mumbai",
			description: "Experience premium managed office spaces at iSprout in Lower Parel, Mumbai. With state-of-the-art facilities and flexible options, our workspaces are designed to enhance productivity and collaboration."
		},
		"sigapi-achi-building": {
			title: "Find Fully-Serviced Workspaces in Alandur, Chennai",
			description: "Choose iSprout's managed office spaces in Alandur, Chennai, for a fully serviced workspace solution. Benefit from flexible terms, modern amenities, and a convenient location for your business needs."
		},
		"s-m-tower": {
			title: "Find Fully-Serviced Workspaces in Anna Nagar, Chennai",
			description: "Boost your business with iSprout's managed office spaces in Anna Nagar, Chennai. Our fully equipped offices offer flexible workspace solutions with premium amenities tailored to support your growth."
		},
		"managed-office-space-gurugram": {
			title: "Find Fully-Serviced Workspaces in Sector 37D, Gurgaon",
			description: "Discover iSprout's managed office spaces in Sector 37D, Gurgaon. Our flexible, fully serviced workspaces provide a professional environment with cutting-edge amenities for businesses of all sizes."
		},
		"grey-stone": {
			title: "Find Fully-Serviced Workspaces in Baner, Pune",
			description: "Unlock potential with iSprout's managed office spaces in Baner, Pune. Offering fully serviced, flexible workspaces with modern infrastructure to support your business in Pune's thriving commercial hub."
		},
		"pune-hinjewadi": {
			title: "Find Fully-Serviced Workspaces in Hinjewadi, Pune",
			description: "Experience iSprout's managed office spaces in Hinjewadi, Pune. Our fully equipped, flexible workspaces are designed to meet the demands of businesses in Pune's leading IT and business hub."
		},
		"pune-yerwada": {
			title: "Find Fully-Serviced Workspaces in Yerwada, Pune",
			description: "Enhance your business operations with iSprout's managed office spaces in Yerwada, Pune. Featuring state-of-the-art facilities and flexible terms, our workspaces are ideal for companies seeking convenience and quality."
		},
		"shlok-samruddhi": {
			title: "Find Fully-Serviced Workspaces in Viman Nagar, Pune",
			description: "Choose iSprout's managed office spaces in Viman Nagar, Pune. Offering fully serviced, flexible workspaces with premium amenities to help your business grow in one of Pune's key commercial areas."
		},
		"vijayawada": {
			title: "Find Fully-Serviced Workspaces in Benz Circle, Vijayawada",
			description: "Discover iSprout's managed office spaces in Benz Circle, Vijayawada. Our fully equipped workspaces provide a professional environment with flexible plans to suit businesses looking for growth in Vijayawada."
		},
		"medha-towers-vijayawada": {
			title: "Find Fully-Serviced Workspaces in Gunadala, Vijayawada",
			description: "Work smarter with iSprout's managed office spaces in Gunadala, Vijayawada. Offering fully serviced workspaces with modern amenities and flexible options to support your business success."
		},
		"managed-office-space-in-kolkata": {
			title: "Find Fully-Serviced Workspaces in Kolkata",
			description: "Explore iSprout's managed office spaces in Kolkata. Our fully serviced, flexible workspaces provide top-tier amenities and a strategic location, perfect for businesses looking to thrive in Kolkata's dynamic market."
		},
		"managed-office-space-ahmedabad": {
			title: "Find Fully-Serviced Workspaces in Ahmedabad",
			description: "Elevate your business with iSprout's managed office spaces in Ahmedabad. Offering flexible, fully serviced workspaces equipped with modern facilities to support your company's growth in Gujarat's commercial capital."
		},
		"managed-office-space-in-visakhapatnam": {
			title: "Find Fully-Serviced Workspaces in Visakhapatnam",
			description: "Discover iSprout's managed office spaces in Visakhapatnam. With fully equipped, flexible workspaces and premium amenities, our offices provide an ideal environment for businesses aiming to expand in Vizag."
		},
		"spaze-i-tech-park": {
			title: "Find Fully-Serviced Workspaces in Sohna Road, Gurgaon",
			description: "Choose iSprout's managed office spaces in Sohna Road, Gurgaon. Our fully serviced workspaces offer modern infrastructure, flexible terms, and a strategic location for businesses of all sizes."
		},
		"vipul-agora": {
			title: "Find Fully-Serviced Workspaces in Sector 81, Gurgaon",
			description: "Experience iSprout's managed office spaces in Sector 81, Gurgaon. Featuring fully equipped, flexible workspaces with premium amenities to help your business succeed in one of Gurgaon's prime locations."
		},
		"kiadb-industrial-area": {
			title: "Find Fully-Serviced Workspaces in Whitefield, Bangalore",
			description: "Unlock productivity at iSprout's managed office spaces in Whitefield, Bangalore. Our fully serviced offices provide flexible workspace solutions with modern amenities in Bangalore's thriving tech hub."
		},
		"ariisto-pinnacle": {
			title: "Find Fully-Serviced Workspaces in Bellandur, Bangalore",
			description: "Elevate your work experience with iSprout's managed office spaces in Bellandur, Bangalore. Offering fully equipped, flexible workspaces designed to support your business in Bangalore's key commercial area."
		},
		"divyasree-nrp": {
			title: "Find Fully-Serviced Workspaces in K R Puram, Bangalore",
			description: "Discover iSprout's managed office spaces in K R Puram, Bangalore. With state-of-the-art facilities and flexible terms, our workspaces provide the ideal environment for your business to thrive."
		},
		"tower-1": {
			title: "Find Fully-Serviced Workspaces in Mathura Road, New Delhi",
			description: "Choose iSprout's managed office spaces in Mathura Road, New Delhi. Our fully serviced, flexible workspaces are designed to meet your business needs in the heart of Delhi's commercial district."
		},
		"tower-2": {
			title: "Find Fully-Serviced Workspaces in Okhla Industrial Estate Phase 3, New Delhi",
			description: "Experience iSprout's managed office spaces in Okhla Industrial Estate Phase 3, New Delhi. Offering fully equipped workspaces with modern amenities and flexible plans to support your business growth."
		}
	};

	const meta = centreMetaData[centreId || ""] || {
		title: `Managed Office Spaces in ${cityName} - iSprout`,
		description: `Discover premium managed office spaces in ${cityName} at iSprout. Our fully serviced workspaces offer top-notch amenities designed to elevate your business operations.`
	};

	return (
		<div className='min-h-screen' style={{ backgroundColor: COLORS.white }}>
			<Helmet>
				<title>{meta.title}</title>
				<meta name='description' content={meta.description} />
			</Helmet>
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
