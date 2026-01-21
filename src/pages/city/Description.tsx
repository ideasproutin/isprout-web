import { COLORS } from "../../helpers/constants/Colors";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, LatLngBounds } from "leaflet";
import { useEffect, useState } from "react";

interface DescriptionProps {
	cityName?: string;
}

// Custom marker icons by type
const createCustomIcon = (color: string) =>
	new Icon({
		iconUrl: `data:image/svg+xml;base64,${btoa(`
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" fill="${color}">
				<path d="M12 0C5.4 0 0 5.4 0 12c0 8 12 24 12 24s12-16 12-24c0-6.6-5.4-12-12-12zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/>
			</svg>
		`)}`,
		iconSize: [30, 45],
		iconAnchor: [15, 45],
		popupAnchor: [0, -45],
	});

const markerIcons = {
	coworking: createCustomIcon(COLORS.brandBlue),
	cafe: createCustomIcon(COLORS.brandBlue),
	metro: createCustomIcon(COLORS.brandBlue),
	mall: createCustomIcon(COLORS.brandBlue),
	default: createCustomIcon(COLORS.brandBlue),
};

type LocationType = "coworking" | "cafe" | "metro" | "mall" | "default";

type CenterLocation = {
	name: string;
	address: string;
	type: LocationType;
	lat: number;
	lng: number;
};

// Centers data by city (addresses pulled from city centers object)
const centersByCity: Record<
	string,
	{ center: { lat: number; lng: number }; locations: CenterLocation[] }
> = {
	hyderabad: {
		center: { lat: 17.4435, lng: 78.3772 },
		locations: [
			{
				name: "One Golden Mile",
				address:
					"One Golden Mile, 9th Floor, Survey no 113, Golden Mile Rd, Kokapet, Hyderabad, Telangana 500075",
				type: "coworking",
				lat: 17.3827,
				lng: 78.3471,
			},
			{
				name: "Orbit",
				address:
					"Orbit, Plot No 30/C, Sy No 83/1, Hyderabad Knowledge City Raidurg Panmaktha, Serilingampally Mandal, Hyderabad, Telangana 500019",
				type: "coworking",
				lat: 17.4312,
				lng: 78.3777,
			},
			{
				name: "My Home Twitza",
				address:
					"My Home Twitza, Survey No 83/1, APIIC- Hyderabad Knowledge Center, 5th & 6th Floor, Plot No 30/A, Rai Durg, Hyderabad, Telangana 500081",
				type: "coworking",
				lat: 17.4342,
				lng: 78.3823,
			},
			{
				name: "Jayabheri Trendset Connect",
				address:
					"Jayabheri Trendset Connect, SY No 5 Kondapur village, Madhapur Hyderabad Telangana India 500084",
				type: "coworking",
				lat: 17.4581,
				lng: 78.3565,
			},
			{
				name: "Flyers Club",
				address:
					"Level C, Rajiv Gandhi International Airport, Unit No-C, Car Parking Level, SA-003, Arrival Dr, Shamshabad, Hyderabad, Telangana 500108",
				type: "cafe",
				lat: 17.2386,
				lng: 78.4294,
			},
			{
				name: "Sohini Tech Park",
				address:
					"Sohini Tech Park, 8th & 9th Floor, Survey No. 142, Nanakramguda Village, Serilingampally Mandal, RR District, Hyderabad 500032",
				type: "coworking",
				lat: 17.4274,
				lng: 78.3476,
			},
			{
				name: "Divyasree Trinity",
				address:
					"Divyasree Trinity, 7th & 8th Floor, Plot No. 5, at HITEC City Layout, survey number 64 (part), Madhapur Village, Serilingampally Mandal, R R District, Hyderabad 500081",
				type: "coworking",
				lat: 17.4504,
				lng: 78.38,
			},
			{
				name: "Purva Summit",
				address:
					"Purva Summit, 2nd Floor, Survey No 8, Whitefields Road, White Fields, Hitech City, Hyderabad, Telangana 500081",
				type: "coworking",
				lat: 17.4566,
				lng: 78.3765,
			},
			{
				name: "Sreshta Marvel",
				address:
					"Sreshta Marvel, 2nd floor, Sy.No.136, Kondapur Main Road, P Janardhan Reddy Nagar, Gachibowli, Hyderabad, Telangana 500032",
				type: "coworking",
				lat: 17.467,
				lng: 78.3578,
			},
			{
				name: "Modern Profound",
				address:
					"Modern Profound Techpark, 2nd Floor, Survey No. 12, Office No. 201, Kondapur, Hyderabad, Telangana 500032",
				type: "coworking",
				lat: 17.4691,
				lng: 78.357,
			},
			{
				name: "Pranava One",
				address:
					"Pranava One, 6-5-654, Punjagutta Rd, Raj Bhavan Quarters Colony, Somajiguda, Hyderabad, Telangana 500082",
				type: "coworking",
				lat: 17.426,
				lng: 78.4556,
			},
		],
	},
	bengaluru: {
		center: { lat: 13.0827, lng: 80.2707 },
		locations: [
			{
				name: "NR Enclave",
				address:
					"DivyaSree N R Enclave, 1st Main Rd, KIADB Export Promotion Industrial Area, Whitefield, Bengaluru, Karnataka 560066",
				type: "coworking",
				lat: 13.1939,
				lng: 77.7064,
			},
			{
				name: "Prestige Saleh Ahmed",
				address:
					"Prestige Saleh Ahmed 132, Lady Curzon Rd, Tasker Town, Infantry Road, Bangalore, 560001",
				type: "coworking",
				lat: 13.0055,
				lng: 77.5932,
			},
			{
				name: "Shilpitha Tech Park",
				address:
					"Shilpitha Tech Park, Sakra World Hospital, 55/3 55/4, Shilpitha Tech Park - Maithri Developers, Devarabisanahalli Road Bellandur, Kariyammana Agrahara, Bengaluru Karnataka 560103",
				type: "coworking",
				lat: 12.9356,
				lng: 77.6245,
			},
		],
	},
	chennai: {
		center: { lat: 13.0827, lng: 80.2707 },
		locations: [
			{
				name: "Kochar Jade",
				address:
					"Kochar Jade - 5th Floor, Kochar Jade, Ambedkar Nagar, SIDCO Industrial Estate, Guindy, Chennai, Tamil Nadu 600032",
				type: "coworking",
				lat: 13.0028,
				lng: 80.2156,
			},
			{
				name: "Saravana Matrix Tower",
				address:
					"SM Towers, 5th & 6th Floors of Saravana Matrix Tower, No.2 / 88, Seevaram Village. OMR. Perungudi, Chennai 600096",
				type: "coworking",
				lat: 12.9714,
				lng: 80.2506,
			},
			{
				name: "Sigapi Achi",
				address:
					"No.18/3, Rukmani Lakshmipathi Road, Egmore, Chennai 600008",
				type: "coworking",
				lat: 13.0122,
				lng: 80.2727,
			},
		],
	},
	pune: {
		center: { lat: 18.5204, lng: 73.8567 },
		locations: [
			{
				name: "Greystone Baner",
				address:
					"iSprout GreyStone Tremont HQ7F+WFP, Near Kargar Facility Management Services, Veerbhadra Nagar, Baner, Pune, Maharashtra 411045",
				type: "coworking",
				lat: 18.5614,
				lng: 73.7997,
			},
			{
				name: "Panchshil Techpark",
				address:
					"Panchshil Techpark, 4th Floor, Survey No 19, 20, Hinjawadi Village, Hinjawadi, Pune, Pimpri-Chinchwad, Maharashtra 411057",
				type: "coworking",
				lat: 18.5921,
				lng: 73.7605,
			},
			{
				name: "Panchshil Techpark One",
				address:
					"Panchsil Tech Park One, Tower E, 191 IBM TECH PARK, Shastrinagar, Yerawada, Pune, Maharashtra 411006",
				type: "coworking",
				lat: 18.5445,
				lng: 73.9117,
			},
		],
	},
	vijayawada: {
		center: { lat: 16.5062, lng: 80.648 },
		locations: [
			{
				name: "Benz Circle - Amaravathi",
				address:
					"Door No: 40-14-8/2, near jyothi convention hall, Benz Circle, Vijayawada, Andhra Pradesh 520010",
				type: "coworking",
				lat: 16.5062,
				lng: 80.648,
			},
			{
				name: "Medha Towers",
				address:
					"Medha Towers, Sy. No. 53, Kesarapalli, IT Park Rd, Gannavaram, Vijayawada, Andhra Pradesh 521102",
				type: "coworking",
				lat: 16.5083,
				lng: 80.5583,
			},
		],
	},
	kolkata: {
		center: { lat: 22.5726, lng: 88.3639 },
		locations: [
			{
				name: "Godrej Waterside",
				address:
					"Godrej Waterside, Street No. 13, DP Block, Sector V, Bidhannagar, Kolkata, West Bengal 700091",
				type: "coworking",
				lat: 22.5765,
				lng: 88.3994,
			},
		],
	},
	ahmedabad: {
		center: { lat: 23.0225, lng: 72.5714 },
		locations: [
			{
				name: "Aurelien",
				address:
					"XFRQ+R4P, Makarba, Ahmedabad, Sarkhej-Okaf, Gujarat 380054",
				type: "coworking",
				lat: 23.0225,
				lng: 72.5714,
			},
		],
	},
	gurugram: {
		center: { lat: 28.4595, lng: 77.0266 },
		locations: [
			{
				name: "HQ27 The Headquarters",
				address:
					"B-660, 5th floor, Sushant Lok Phase I, Sector 27, Gurugram, Haryana 122009",
				type: "coworking",
				lat: 28.4595,
				lng: 77.0266,
			},
		],
	},
};

type GeocodedLocation = CenterLocation & { lat: number; lng: number };

const FitBoundsOnMarkers = ({ markers }: { markers: GeocodedLocation[] }) => {
	const map = useMap();

	useEffect(() => {
		if (!markers.length) return;
		const bounds = new LatLngBounds(
			markers.map((m) => [m.lat, m.lng]) as [number, number][],
		);
		map.fitBounds(bounds, { padding: [40, 40] });
	}, [markers, map]);

	return null;
};

const Description = ({ cityName = "Hyderabad" }: DescriptionProps) => {
	const cityDescriptions: {
		[key: string]: { title: string; highlight: string; text: string };
	} = {
		hyderabad: {
			title: "Hyderabad's Hotspots for",
			highlight: "Hustlers",
			text: "Hyderabad has become one of India's leading business hubs, known for its thriving IT sector and entrepreneurial spirit. Our strategically located coworking spaces across the city provide the perfect environment for your business to flourish. From Hitec City to Gachibowli, we're positioned at the heart of innovation.",
		},
		bengaluru: {
			title: "Bengaluru's Best Spaces for",
			highlight: "Innovation",
			text: "Bengaluru, India's Silicon Valley, is home to countless startups and tech giants. Our premium coworking spaces are strategically located across key business districts, offering you the perfect environment to collaborate, innovate, and grow. Experience world-class amenities in the heart of India's startup capital.",
		},
		chennai: {
			title: "Chennai's Premier Hubs for",
			highlight: "Growth",
			text: "Chennai, the cultural and economic capital of South India, is a thriving hub for manufacturing, IT, and business services. Our strategically positioned coworking spaces across Chennai offer modern facilities and a vibrant community. From Guindy to OMR, we provide the perfect environment for your business to succeed in this dynamic city.",
		},
		pune: {
			title: "Pune's Dynamic Spaces for",
			highlight: "Entrepreneurs",
			text: "Pune, known as the Oxford of the East, has emerged as a major IT and manufacturing hub in India. Our premium coworking spaces across Hinjawadi, Baner, and Yerawada provide the perfect blend of modern infrastructure and collaborative environment. Experience flexible workspaces designed for startups, SMEs, and enterprise teams in one of India's most liveable cities.",
		},
		vijayawada: {
			title: "Vijayawada's Prime Locations for",
			highlight: "Success",
			text: "Vijayawada, the business capital of Andhra Pradesh, is rapidly emerging as a key commercial and IT hub in South India. Our modern coworking spaces at Benz Circle and IT Park Road offer state-of-the-art facilities and a professional environment. Join a growing community of businesses and entrepreneurs in this strategic location connecting major cities of South India.",
		},
		kolkata: {
			title: "Kolkata's Modern Workspace for",
			highlight: "Visionaries",
			text: "Kolkata, the cultural capital of India, is witnessing a surge in startups and IT companies. Our premium coworking space in Sector V, Salt Lake provides world-class infrastructure and a collaborative ecosystem. Experience the perfect blend of tradition and innovation in the heart of Eastern India's IT corridor, where your business can thrive alongside industry leaders.",
		},
		ahmedabad: {
			title: "Ahmedabad's Strategic Space for",
			highlight: "Achievers",
			text: "Ahmedabad, Gujarat's commercial hub, is a vibrant ecosystem for manufacturing, textiles, and emerging technology sectors. Our modern coworking space in Makarba offers premium facilities and a collaborative environment for businesses of all sizes. Be part of one of India's fastest-growing cities where tradition meets innovation and entrepreneurship thrives.",
		},
		gurugram: {
			title: "Gurugram's Premium Workspace for",
			highlight: "Leaders",
			text: "Gurugram, part of the National Capital Region, is India's leading corporate and financial hub. Our coworking space in Sushant Lok provides sophisticated infrastructure and a professional atmosphere in the heart of the city's business district. Join Fortune 500 companies and dynamic startups in this thriving metropolitan center that drives India's economic growth.",
		},
	};

	const cityNameLower = cityName.toLowerCase();
	const cityConfig = centersByCity[cityNameLower] || centersByCity.hyderabad;
	const [markerData, setMarkerData] = useState<GeocodedLocation[]>([]);

	useEffect(() => {
		setMarkerData(cityConfig.locations);
	}, [cityConfig]);

	const cityInfo =
		cityDescriptions[cityNameLower] || cityDescriptions.hyderabad;
	return (
		<section
			className='relative py-16 lg:py-24 px-4 lg:px-0 overflow-hidden'
			style={{
				backgroundColor: COLORS.brandBlue,
			}}
		>
			{/* Upper Yellow Ellipse - responsive positioning */}
			<div
				style={{
					position: "absolute",
					top: "50%",
					right: "-15%",
					width: "807px",
					height: "689px",
					backgroundColor: COLORS.brandYellow,
					borderRadius: "50%",
					opacity: 0.85,
					zIndex: 0,
					border: `8px solid ${COLORS.brandBlue}`,
					transform: "translateY(-50%)",
				}}
			></div>
			{/* Inner Yellow Ellipse - responsive positioning */}
			<div
				style={{
					position: "absolute",
					top: "55%",
					right: "-10%",
					width: "792px",
					height: "551px",
					backgroundColor: COLORS.brandYellow,
					borderRadius: "50%",
					opacity: 0.9,
					zIndex: 0,
					border: `6px solid ${COLORS.brandBlue}`,
					transform: "translateY(-50%)",
				}}
			></div>

			<div className='max-w-[1280px] mx-auto relative z-10 lg:px-8'>
				{/* Main Heading */}
				<div className='mb-12'>
					<h2
						className='text-4xl lg:text-5xl font-bold'
						style={{
							color: "#FFFFFF",
							fontFamily: "Outfit, sans-serif",
							marginBottom: "2rem",
						}}
					>
						{cityInfo.title}{" "}
						<span
							style={{
								color: COLORS.brandYellow,
								fontFamily: "Otomanopee One, sans-serif",
							}}
						>
							{cityInfo.highlight}
						</span>
					</h2>
				</div>

				{/* Two Column Layout */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start'>
					{/* Left Column - Description */}
					<div
						className='p-6 lg:p-8 rounded-2xl backdrop-blur-sm max-w-xl'
						style={{
							backgroundColor: "#D9D9D94A",
							border: "1px solid rgba(255, 255, 255, 0.1)",
						}}
					>
						<p
							className='text-sm lg:text-base leading-relaxed'
							style={{
								color: "#E8F4F8",
								fontFamily: "Outfit, sans-serif",
								lineHeight: "1.7",
							}}
						>
							{cityInfo.text}
						</p>
					</div>

					{/* Right Column - Map Image */}
					{/* Right Column - Interactive Map */}
					<div className='relative w-full h-[350px] lg:h-[420px] max-w-2xl'>
						{/* Map container */}
						<div className='relative w-full h-full rounded-2xl overflow-hidden shadow-xl border-4 border-white/20'>
							<MapContainer
								center={[
									cityConfig.center.lat,
									cityConfig.center.lng,
								]}
								zoom={12}
								className='w-full h-full'
								scrollWheelZoom={false}
							>
								<FitBoundsOnMarkers markers={markerData} />
								<TileLayer
									attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
									url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
								/>
								{markerData.map((location, idx) => (
									<Marker
										key={idx}
										position={[location.lat, location.lng]}
										icon={
											markerIcons[
												location.type as keyof typeof markerIcons
											] || markerIcons.default
										}
									>
										<Popup>
											<div
												style={{
													fontFamily:
														"Outfit, sans-serif",
												}}
											>
												<strong>{location.name}</strong>
												<br />
												<span
													style={{
														textTransform:
															"capitalize",
													}}
												>
													{location.type}
												</span>
											</div>
										</Popup>
									</Marker>
								))}
							</MapContainer>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Description;
