import { useEffect, useState, Suspense } from "react";
import { useParams } from "react-router-dom";
import { MetaTags } from "../../hooks/useMetaTags";
import centerPageHero from "../../assets/centers/centerpage_hero.png";
import SubNavbar from "../../components/SubNavbar/subnavbar";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import Form from "./form.tsx";
import CenterImages from "./centerimages";
import { lazyWithRetry } from "../../utils/lazyWithRetry";
const CenterMap = lazyWithRetry(() => import("./centremap"), "centremap");
import Amenities from "../home/components/amenities";
import { COLORS } from "../../helpers/constants/Colors";
import { useCityCenters } from "../../hooks/useCityCentre";
import { useCentreSeo } from "../../hooks/useCentreSeo";

const Centre = () => {
	const { data: cityCentersApiData = [], isLoading } = useCityCenters();
	const { centreId } = useParams();
	const { data: centerSeoData } = useCentreSeo(centreId || "");
	const [isVideoPlaying, setIsVideoPlaying] = useState(false);

	// Find center data from city&CenterObject.json
	const findCenterData = () => {
		for (const city of cityCentersApiData) {
			const center = city.centers.find(
				(c: { id: string }) => c.id === centreId,
			);
			if (center) {
				return { ...center, cityName: city.name };
			}
		}
		return null;
	};

	const centerData = findCenterData();

	// Extract video ID from YouTube URL
	const getVideoId = (videoLink: string) => {
		if (!videoLink) return null;
		const match = videoLink.match(
			/(?:youtu\.be\/|youtube\.com\/embed\/|v=)([a-zA-Z0-9_-]+)/,
		);
		return match ? match[1] : null;
	};

	// Scroll to top when component mounts
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [centreId]);

	// Centre-specific meta data
	const centreMetaData: {
		[key: string]: { title: string; description: string; keywords: string };
	} = {
		orbit: {
			title: "Find Fully-Serviced Workspaces in Knowledge City",
			description:
				"Empower your team with iSprout managed offices at Orbit, offering adaptable spaces, smart infrastructure, and all the essentials for a smooth workday.",
			keywords:
				"Orbit office space, Knowledge City workspace, Hyderabad managed office, iSprout Orbit",
		},
		"one-golden-mile": {
			title: "Fully-Equipped Managed Office Space at Kokapet",
			description:
				"Set up your business at iSprouts managed office space in One Gold Mile, Kokapet - premium location, modern amenities & flexible plans that fit your needs.",
			keywords:
				"One Golden Mile office, Kokapet workspace, Hyderabad office space, iSprout Kokapet",
		},
		"my-home-twitza": {
			title: "Work Better from Premium Workspaces in Raidurg",
			description:
				"iSprout brings modern, fully managed office spaces to Twitza with flexible layouts, collaborative zones, and premium amenities for growing businesses",
			keywords:
				"My Home Twitza office, Raidurg workspace, Hyderabad managed office, iSprout Twitza",
		},
		"jayabheri-trendset-connect": {
			title: "Level Up Your Ideal Workspace in Kondapur Now",
			description:
				"Premium managed workspaces with modern design, flexible setups, and full business support, expertly delivered by iSprout at Jayabheri for growing teams.",
			keywords:
				"Jayabheri Trendset office, Kondapur workspace, Hyderabad office space, iSprout Jayabheri",
		},
		"sohini-tech-park": {
			title: "Explore Fully-Serviced Office Spaces in Nanakramguda",
			description:
				"In Hyderabads IT hub, isprout provides premium managed workspaces at Sohini, equipped with flexible plans, modern amenities & a business ready setup.",
			keywords:
				"Sohini Tech Park office, Nanakramguda workspace, Hyderabad IT hub, iSprout Sohini",
		},
		"divyasree-trinity": {
			title: "Secure Fully-Furnished Office Space in Madhapur Now",
			description:
				"Flexible layouts & seamless support come together with iSprout managed office spaces at Divyasree Trinity, designed for productivity and team efficiency.",
			keywords:
				"Divyasree Trinity office, Madhapur workspace, Hyderabad office space, iSprout Madhapur",
		},
		"modern-profound": {
			title: "Set Up Your Business in Kondapurs Premium Workspaces",
			description:
				"From startups to enterprises, iSprout office space at Modern Profound Tech Park offers the perfect blend of flexibility, infrastructure, & support at Kondapur.",
			keywords:
				"Modern Profound office, Kondapur workspace, Hyderabad tech park, iSprout Kondapur",
		},
		"pranava-one": {
			title: "Move Into Business-Ready Managed Offices in Somajiguda",
			description:
				"iSprout provides sleek, fully managed office space at Pranava One, offering flexibility, great connectivity, and premium amenities for growing teams.",
			keywords:
				"Pranava One office, Somajiguda workspace, Hyderabad office space, iSprout Pranava",
		},
		"purva-summit": {
			title: "Get Flexible Managed Office Space in Whitefields",
			description:
				"Smartly designed managed work space by iSprout at Purva Summit offer agility, comfort, and services tailored for startups, teams, and growing enterprises.",
			keywords:
				"Purva Summit office, Whitefield Bangalore, Bengaluru workspace, iSprout Whitefield",
		},
		"sreshta-marvel": {
			title: "Rent Managed Office Space available in Gachibowli",
			description:
				"iSprout brings premium workspaces to Sreshta Marvel, offering smart design, full-service support, and flexibility for teams of all sizes.",
			keywords:
				"Sreshta Marvel office, Gachibowli workspace, Hyderabad office space, iSprout Gachibowli",
		},
		"n-r-enclave": {
			title: "Get your Premium Managed Office Space in Whitefield",
			description:
				"Find your perfect managed office with iSprout at NR Enclave, Whitefield, Enjoy smart workspace designs, support services, and business-ready setups.",
			keywords:
				"NR Enclave office, Whitefield Bangalore, Bengaluru workspace, iSprout Whitefield",
		},
		"prestige-saleh-ahmed": {
			title: "Grow Smarter with Managed Office Space on Infantry Road",
			description:
				"Experience modern work space with iSprout at Prestige Saleh Ahmed, Infantry Rd. Enjoy vibrant workspaces, premium amenities, and flexible rental plans.",
			keywords:
				"Prestige Saleh Ahmed office, Infantry Road Bangalore, Bengaluru workspace, iSprout Infantry Road",
		},
		"shilpitha-tech-park": {
			title: "Get Bellandurs Best Fully-Managed Office Space",
			description:
				"Rent fully equipped workspaces with iSprout at Shilpitha Tech Park, Bellandur. Ideal for startups and enterprises seeking flexibility and convenience.",
			keywords:
				"Shilpitha Tech Park office, Bellandur workspace, Bangalore office space, iSprout Bellandur",
		},
		jade: {
			title: "Find Top-Tier Managed Office Space in Guindy Today",
			description:
				"iSprout brings flexible, high-end office spaces to Jade in Guindy, Chennai. Set up your business in a dynamic environment built for productivity and scale.",
			keywords:
				"Jade office Guindy, Chennai workspace, Kochar Jade, iSprout Guindy",
		},
		"sigapi-achi-building": {
			title: "Fully-Equipped Managed Office Space Available Egmore",
			description:
				"Flexible managed office space near Egmore offering modern amenities, hassle-free operations, and a business-ready environment.",
			keywords:
				"Sigapi Achi Building office, Egmore workspace, Chennai office space, iSprout Egmore",
		},
		"s-m-tower": {
			title: "Fully-Managed Office Space Available for rent on OMR",
			description:
				"Book your work space with iSprout at SM Tower, OMR Chennai. Enjoy flexible plans, modern amenities, and a vibrant workspace designed for success.",
			keywords:
				"SM Tower office, OMR Chennai, Saravana Matrix, iSprout OMR",
		},
		"managed-office-space-gurugram": {
			title: "Find Managed Office Space in Gurugram",
			description:
				"Find your ideal managed workspace with iSprout at HQ27, Gurugram. Enjoy top amenities, flexible plans, and a professional business setting.",
			keywords:
				"HQ27 office Gurugram, Gurgaon workspace, Delhi NCR office space, iSprout Gurugram",
		},
		"grey-stone": {
			title: "Premium Office Space for Businesses in Baner's IT Zone",
			description:
				"Set up your workspace with iSprout at Grey Stone, Baner, Pune. Enjoy flexible office solutions, premium amenities & a thriving professional environment.",
			keywords:
				"Greystone Baner office, Pune workspace, Baner IT zone, iSprout Pune",
		},
		"pune-hinjewadi": {
			title: "Premium Managed Office Space available at Hinjewadi",
			description:
				"Elevate your business presence with iSprouts premium office spaces in Hinjewadi, Pune. Enjoy top facilities, seamless services, and flexible leasing options.",
			keywords:
				"Hinjewadi office Pune, Panchshil Tech Park, Pune workspace, iSprout Hinjewadi",
		},
		"pune-yerwada": {
			title: "Explore Smart Managed Office Space Options in Yerwada",
			description:
				"Explore iSprouts vibrant managed workspaces in Yerwada, Pune. Designed for productivity, these offices come with top amenities and seamless business support.",
			keywords:
				"Yerwada office Pune, Panchshil workspace, Pune office space, iSprout Yerwada",
		},
		vijayawada: {
			title: "Work Smart in Fully-Managed Office space at Benz Circle",
			description:
				"Make the smart move with iSprout at Benz Circle, VJA. Flexible workspace solutions tailored for evolving teams, complete with top-class business amenities.",
			keywords:
				"Benz Circle office Vijayawada, VJA workspace, Vijayawada office space, iSprout Vijayawada",
		},
		"medha-towers-vijayawada": {
			title: "Premium Managed Office Space available in Gannavaram",
			description:
				"Discover iSprouts premium office spaces at Medha Towers, Vijayawada. Experience seamless operations, top-class facilities, and a vibrant work environment.",
			keywords:
				"Medha Towers office, Gannavaram workspace, Vijayawada office space, iSprout Medha Towers",
		},
		"managed-office-space-in-kolkata": {
			title: "Book Modern Managed Office Space at Bidhannagar Now",
			description:
				"iSprout offers premium managed office spaces at Godrej Waterside, Salt Lake ideal for teams seeking flexibility, modern amenities, and a prime IT location.",
			keywords:
				"Godrej Waterside Kolkata, Bidhannagar office, Salt Lake workspace, iSprout Kolkata",
		},
		"managed-office-space-ahmedabad": {
			title: "Discover Managed Office Space in Makarba, Ahmedabad",
			description:
				"Explore iSprout's dynamic office spaces at Aurelien, Makarba. Ideal for startups & enterprises seeking vibrant, fully serviced workspaces.",
			keywords:
				"Aurelien office Ahmedabad, Makarba workspace, Ahmedabad office space, iSprout Ahmedabad",
		},
		"managed-office-space-in-visakhapatnam": {
			title: "Premium Managed Workspaces in Maddilapalem",
			description:
				"Experience flexible managed workspaces in Maddilapalem, Visakhapatnam, designed for productivity, collaboration, and business success.",
			keywords:
				"Lansum Square Visakhapatnam, Maddilapalem office, Vizag workspace, iSprout Visakhapatnam",
		},
	};

	const meta = centreMetaData[centreId || ""] || {
		title: `Managed Office Spaces in ${centerData?.cityName || "India"} - iSprout`,
		description: `Discover premium managed office spaces in ${centerData?.cityName || "India"} at iSprout. Our fully serviced workspaces offer top-notch amenities designed to elevate your business operations.`,
		keywords: `managed office ${centerData?.cityName || "India"}, ${centerData?.name || "office space"}, coworking space, iSprout`,
	};

	// Show loading state while data is being fetched
	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<MetaTags
					title='iSprout Office Space'
					description='Explore premium managed office spaces at iSprout.'
				/>
				<div className='text-center'>
					<p className='text-xl text-gray-600'>
						Loading center information...
					</p>
				</div>
			</div>
		);
	}

	if (!centerData) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<MetaTags
					title='iSprout Office Space'
					description='Explore premium managed office spaces at iSprout.'
				/>
				<div className='text-center'>
					<h1 className='text-2xl font-bold mb-4'>
						Center not found
					</h1>
					<p className='text-gray-600'>Center ID: {centreId}</p>
				</div>
			</div>
		);
	}

	// Get the video URL and hero image from center data
	const videoId = centerData?.videoLink ? getVideoId(centerData.videoLink) : null;
	const effectiveVideoId = videoId || "Lo1qCDRmYgE";
	const youtubeEmbedUrl = `https://www.youtube-nocookie.com/embed/${effectiveVideoId}?autoplay=1&rel=0`;
	const youtubeThumbnailUrl = `https://i.ytimg.com/vi/${effectiveVideoId}/hqdefault.jpg`;
	const videoTitle = `${centerData?.name || "Center"} video tour`;

	const centerHeroImage = centerData?.heroImage || centerPageHero;

	// Use shortAddress directly from API data
	const locationFirstWord =
		centerData.shortAddress?.split(",")[0] || centerData.cityName;

	return (
		<div className='min-h-screen' style={{ backgroundColor: COLORS.white }}>
			<MetaTags
				title={meta.title}
				description={meta.description}
				keywords={meta.keywords}
				ogTitle={meta.title}
				ogDescription={meta.description}
			/>
			{/* Dynamic SEO Schema */}
			{centerSeoData && (
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(centerSeoData),
					}}
				/>
			)}
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
							{locationFirstWord}
						</span>
					</h1>
				</div>

				{/* Video Card - Positioned in top right */}
				<div className='absolute top-24 right-8 lg:right-16 z-20 hidden md:block' key={centreId}>
					<div className='w-[420px] lg:w-[520px] xl:w-[580px] bg-black rounded-2xl shadow-2xl overflow-hidden'>
						<div className='relative w-full h-60 lg:h-[280px] xl:h-80'>
							{isVideoPlaying ? (
								<iframe
									className='absolute top-0 left-0 w-full h-full'
									src={youtubeEmbedUrl}
									title={videoTitle}
									aria-label={videoTitle}
									width='580'
									height='320'
									frameBorder='0'
									allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
									allowFullScreen
								/>
							) : (
								<button
									type='button'
									onClick={() => setIsVideoPlaying(true)}
									className='absolute inset-0 w-full h-full group p-0 border-0 rounded-none bg-transparent'
									aria-label={`Play ${videoTitle}`}
								>
									<img
										src={youtubeThumbnailUrl}
										alt={videoTitle}
										className='w-full h-full object-cover'
									/>
									<div className='absolute inset-0 ' />
									<div className='absolute inset-0 flex items-center justify-center'>
										<div className='w-14 h-10 rounded-xl bg-red-500 flex items-center justify-center shadow-lg'>
											<svg width='24' height='24' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
												<path d='M8 5V19L19 12L8 5Z' fill='#ffffff' />
											</svg>
										</div>
									</div>
								</button>
							)}
						</div>
					</div>
				</div>
			</section>
			<Form centerName={centerData.name} location={centerData.address} />

			{/* Center Map Section */}
			<Suspense
				fallback={
					<div className='h-96 animate-pulse bg-gray-100 rounded-lg' />
				}
			>
				<CenterMap
					centerName={centerData.name}
					centreId={centreId}
				/>
			</Suspense>

			{/* Center Images Gallery */}
			<CenterImages centreId={centreId} />

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
