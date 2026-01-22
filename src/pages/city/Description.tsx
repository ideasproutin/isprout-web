import { COLORS } from "../../helpers/constants/Colors";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, LatLngBounds } from "leaflet";
import { useEffect, useState } from "react";

interface DescriptionProps {
	cityName?: string;
}

// Custom marker icons by type
const createCustomIcon = (
	color: string,
	size: "small" | "medium" | "large" = "medium",
) => {
	const sizes = {
		small: {
			iconSize: [15, 22],
			iconAnchor: [7.5, 22],
			popupAnchor: [0, -22],
		},
		medium: {
			iconSize: [20, 30],
			iconAnchor: [10, 30],
			popupAnchor: [0, -30],
		},
		large: {
			iconSize: [30, 45],
			iconAnchor: [15, 45],
			popupAnchor: [0, -45],
		},
	};
	const iconConfig = sizes[size];

	return new Icon({
		iconUrl: `data:image/svg+xml;base64,${btoa(`
			<svg width="32" height="45" viewBox="0 0 32 45" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M16 0C7.163 0 0 7.163 0 16C0 16.9 0.1 17.7 0.3 18.5C0.4 19 0.6 19.4 0.8 19.8C3.1 23.7 16 45 16 45C16 45 28.9 23.7 31.2 19.8C31.4 19.4 31.6 19 31.7 18.5C31.9 17.7 32 16.9 32 16C32 7.163 24.837 0 16 0Z" fill="#003D7A"/>
				<circle cx="16" cy="16" r="13" fill="none" stroke="white" stroke-width="1.5"/>
				<circle cx="16" cy="16" r="10.5" fill="none" stroke="white" stroke-width="1.5"/>
				<circle cx="16" cy="16" r="8" fill="none" stroke="white" stroke-width="1.5"/>
				<circle cx="16" cy="16" r="5.5" fill="none" stroke="white" stroke-width="1.5"/>
				<circle cx="16" cy="16" r="3" fill="none" stroke="white" stroke-width="1.5"/>
				<circle cx="16" cy="16" r="6" fill="#003D7A"/>
				<path d="M16 3C16 3 16 10 16 16L28.5 16C28.5 8.6 23.4 3 16 3Z" fill="#FFDE00"/>
				<circle cx="18.5" cy="13.5" r="2" fill="#FFDE00"/>
			</svg>
		`)}`,
		iconSize: iconConfig.iconSize as [number, number],
		iconAnchor: iconConfig.iconAnchor as [number, number],
		popupAnchor: iconConfig.popupAnchor as [number, number],
	});
};

const markerIcons = {
	small: {
		coworking: createCustomIcon(COLORS.brandBlue, "small"),
		cafe: createCustomIcon(COLORS.brandBlue, "small"),
		metro: createCustomIcon(COLORS.brandBlue, "small"),
		mall: createCustomIcon(COLORS.brandBlue, "small"),
		default: createCustomIcon(COLORS.brandBlue, "small"),
	},
	medium: {
		coworking: createCustomIcon(COLORS.brandBlue, "medium"),
		cafe: createCustomIcon(COLORS.brandBlue, "medium"),
		metro: createCustomIcon(COLORS.brandBlue, "medium"),
		mall: createCustomIcon(COLORS.brandBlue, "medium"),
		default: createCustomIcon(COLORS.brandBlue, "medium"),
	},
	large: {
		coworking: createCustomIcon(COLORS.brandBlue, "large"),
		cafe: createCustomIcon(COLORS.brandBlue, "large"),
		metro: createCustomIcon(COLORS.brandBlue, "large"),
		mall: createCustomIcon(COLORS.brandBlue, "large"),
		default: createCustomIcon(COLORS.brandBlue, "large"),
	},
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
				lat: 17.401151977915994,
				lng: 78.33827643502595,
			},
			{
				name: "Orbit",
				address:
					"Orbit, Plot No 30/C, Sy No 83/1, Hyderabad Knowledge City Raidurg Panmaktha, Serilingampally Mandal, Hyderabad, Telangana 500019",
				type: "coworking",
				lat: 17.434956417220725,
				lng: 78.3767676110163,
			},
			{
				name: "My Home Twitza",
				address:
					"My Home Twitza, Survey No 83/1, APIIC- Hyderabad Knowledge Center, 5th & 6th Floor, Plot No 30/A, Rai Durg, Hyderabad, Telangana 500081",
				type: "coworking",
				lat: 17.435255553297168,
				lng: 78.37478950804488,
			},
			{
				name: "Jayabheri Trendset Connect",
				address:
					"Jayabheri Trendset Connect, SY No 5 Kondapur village, Madhapur Hyderabad Telangana India 500084",
				type: "coworking",
				lat: 17.458115414697712,
				lng: 78.36723270989992,
			},
			{
				name: "Sohini Tech Park",
				address:
					"Sohini Tech Park, 8th & 9th Floor, Survey No. 142, Nanakramguda Village, Serilingampally Mandal, RR District, Hyderabad 500032",
				type: "coworking",
				lat: 17.42646454293652,
				lng: 78.34718750194108,
			},
			{
				name: "Divyasree Trinity",
				address:
					"Divyasree Trinity, 7th & 8th Floor, Plot No. 5, at HITEC City Layout, survey number 64 (part), Madhapur Village, Serilingampally Mandal, R R District, Hyderabad 500081",
				type: "coworking",
				lat: 17.444346894827476,
				lng: 78.37433104851799,
			},
			{
				name: "Purva Summit",
				address:
					"Purva Summit, 2nd Floor, Survey No 8, Whitefields Road, White Fields, Hitech City, Hyderabad, Telangana 500081",
				type: "coworking",
				lat: 17.454280611853402,
				lng: 78.370538495674,
			},
			{
				name: "Sreshta Marvel",
				address:
					"Sreshta Marvel, 2nd floor, Sy.No.136, Kondapur Main Road, P Janardhan Reddy Nagar, Gachibowli, Hyderabad, Telangana 500032",
				type: "coworking",
				lat: 17.447246146364506,
				lng: 78.3640830945543,
			},
			{
				name: "Modern Profound",
				address:
					"Modern Profound Techpark, 2nd Floor, Survey No. 12, Office No. 201, Kondapur, Hyderabad, Telangana 500032",
				type: "coworking",
				lat: 17.457390421077026,
				lng: 78.3705132203761,
			},
			{
				name: "Pranava One",
				address:
					"Pranava One, 6-5-654, Punjagutta Rd, Raj Bhavan Quarters Colony, Somajiguda, Hyderabad, Telangana 500082",
				type: "coworking",
				lat: 17.419754945635525,
				lng: 78.4573135233899,
			},
			{
				name: "Minaas Towers",
				address: "Minaas Towers, Gachibowli, Hyderabad, Telangana",
				type: "coworking",
				lat: 17.44291213831399,
				lng: 78.36835717735433,
			},
			{
				name: "SAS I Tower",
				address: "SAS I Tower, Gachibowli, Hyderabad, Telangana",
				type: "coworking",
				lat: 17.41944618275636,
				lng: 78.36010729269915,
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
				lat: 12.986897933672514,
				lng: 77.7302791526382,
			},
			{
				name: "Prestige Saleh Ahmed",
				address:
					"Prestige Saleh Ahmed 132, Lady Curzon Rd, Tasker Town, Infantry Road, Bangalore, 560001",
				type: "coworking",
				lat: 12.98073042620965,
				lng: 77.6033551373611,
			},
			{
				name: "Shilpitha Tech Park",
				address:
					"Shilpitha Tech Park, Sakra World Hospital, 55/3 55/4, Shilpitha Tech Park - Maithri Developers, Devarabisanahalli Road Bellandur, Kariyammana Agrahara, Bengaluru Karnataka 560103",
				type: "coworking",
				lat: 12.931356549288756,
				lng: 77.68558073863646,
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
				lat: 13.013164397306504,
				lng: 80.20211387272525,
			},
			{
				name: "Saravana Matrix Tower",
				address:
					"SM Towers, 5th & 6th Floors of Saravana Matrix Tower, No.2 / 88, Seevaram Village. OMR. Perungudi, Chennai 600096",
				type: "coworking",
				lat: 12.954025143781296,
				lng: 80.24184398280016,
			},
			{
				name: "Sigapi Achi",
				address:
					"No.18/3, Rukmani Lakshmipathi Road, Egmore, Chennai 600008",
				type: "coworking",
				lat: 13.06582955997722,
				lng: 80.25939035212987,
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
				lat: 18.564995505139684,
				lng: 73.7738591522569,
			},
			{
				name: "Panchshil Techpark",
				address:
					"Panchshil Techpark, 4th Floor, Survey No 19, 20, Hinjawadi Village, Hinjawadi, Pune, Pimpri-Chinchwad, Maharashtra 411057",
				type: "coworking",
				lat: 18.59267338401002,
				lng: 73.74695826888593,
			},
			{
				name: "Panchshil Techpark One",
				address:
					"Panchsil Tech Park One, Tower E, 191 IBM TECH PARK, Shastrinagar, Yerawada, Pune, Maharashtra 411006",
				type: "coworking",
				lat: 18.552905179173827,
				lng: 73.89253413691114,
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
				lat: 16.497351499731614,
				lng: 80.65147571349095,
			},
			{
				name: "Medha Towers",
				address:
					"Medha Towers, Sy. No. 53, Kesarapalli, IT Park Rd, Gannavaram, Vijayawada, Andhra Pradesh 521102",
				type: "coworking",
				lat: 16.538042668899436,
				lng: 80.78091173024038,
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
				lat: 22.57378496488076,
				lng: 88.43754883703603,
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
				lat: 22.99181867676229,
				lng: 72.4874710832406,
			},
		],
	},
	vizag: {
		center: { lat: 17.7437, lng: 83.3273 },
		locations: [
			{
				name: "Lansum Square",
				address: "Lansum Square, Visakhapatnam, Andhra Pradesh",
				type: "coworking",
				lat: 17.74369880790148,
				lng: 83.3273600368893,
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
				lat: 28.46640483155751,
				lng: 77.07398366610286,
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
		// Increase padding for cities with many locations to prevent marker overlap
		const padding = markers.length > 5 ? [80, 80] : [40, 40];
		map.fitBounds(bounds, {
			padding: padding as [number, number],
			maxZoom: markers.length > 5 ? 11 : 13,
		});
	}, [markers, map]);

	return null;
};

const Description = ({ cityName = "Hyderabad" }: DescriptionProps) => {
	const cityDescriptions: {
		[key: string]: { title: string; highlight: string; text: string };
	} = {
		hyderabad: {
			title: "Hyderabad's Unique Co-working Spots: Where Ideas Flourish and",
			highlight: "Businesses Bloom",
			text: "Hey there, Hyderabad folks! Looking for a workspace that's as dynamic and exciting as your business ideas? Well, you're in luck! iSprout's flexible managed office spaces in the city are designed to get your creative juices flowing and your productivity soaring. From solo entrepreneurs cooking up the next big thing to growing startups making waves, these spaces are buzzing with opportunity and collaboration. Whether you choose the sleek vibes of Orbit, My Home Twitza, One Golden Mile, Sohini Tech Park, Jayabheri Trendset Connect, Divyasree Trinity, Purva Summit, Modern Profound, Minaas, Pranava One, and Sreshta Marvel, you'll find state-of-the-art facilities, comfy work areas, and a community of like-minded go-getters. So why settle for a boring office when you can be part of Hyderabad's most inspiring workspace revolution at iSprout?",
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
		vizag: {
			title: "Vizag's Coastal Workspace for",
			highlight: "Innovators",
			text: "Visakhapatnam, fondly known as Vizag, is a major port city and industrial hub on India's eastern coast. Our premium coworking space at Lansum Square offers modern facilities and a professional environment for businesses looking to establish a presence in this strategic location. Experience the perfect blend of coastal charm and business opportunity in one of Andhra Pradesh's most dynamic cities.",
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
				backgroundColor: "#FFFFFF",
			}}
		>
			<div className='max-w-[1280px] mx-auto relative z-10 lg:px-8'>
				{/* Two Column Layout */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start'>
					{/* Left Column - Interactive Map */}
					<div className='relative w-full h-[400px] lg:h-[500px] max-w-2xl'>
						{/* Map container */}
						<div className='relative w-full h-full rounded-2xl overflow-hidden shadow-xl border border-gray-300'>
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
								{(() => {
									// Dynamically select icon size based on number of locations
									const iconSize =
										markerData.length > 7
											? "small"
											: markerData.length > 3
												? "medium"
												: "large";
									return markerData.map((location, idx) => (
										<Marker
											key={idx}
											position={[
												location.lat,
												location.lng,
											]}
											icon={
												markerIcons[iconSize][
													location.type as keyof typeof markerIcons.small
												] ||
												markerIcons[iconSize].default
											}
										>
											<Popup>
												<div
													style={{
														fontFamily:
															"Outfit, sans-serif",
													}}
												>
													<strong>
														{location.name}
													</strong>
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
									));
								})()}
								)){"}"}
							</MapContainer>
						</div>
					</div>

					{/* Right Column - Heading and Description */}
					<div className='max-w-2xl'>
						{/* Heading */}
						<h2
							className='text-3xl lg:text-4xl font-bold mb-6'
							style={{
								color: "#000000",
								fontFamily: "Outfit, sans-serif",
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

						{/* Description Text */}
						<p
							className='text-sm lg:text-base leading-relaxed'
							style={{
								color: "#000000",
								fontFamily: "Outfit, sans-serif",
								lineHeight: "1.7",
							}}
						>
							{cityInfo.text
								.split("iSprout's")
								.map((part, index, array) => (
									<span key={index}>
										{part}
										{index < array.length - 1 && (
											<span
												style={{
													color: COLORS.brandYellow,
													fontWeight: "600",
												}}
											>
												iSprout's
											</span>
										)}
									</span>
								))}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Description;
