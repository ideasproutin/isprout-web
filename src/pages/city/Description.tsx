import { COLORS } from "../../helpers/constants/Colors";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, LatLngBounds } from "leaflet";
import { useEffect, useState } from "react";
import locationIconMaps from "../../assets/centers/locationicon_maps.png";
import { getCityData } from "../../content/city&CenterObject";

interface DescriptionProps {
	cityName?: string;
}

// Custom marker icons by type
const createCustomIcon = (size: "small" | "medium" | "large" = "medium") => {
	const sizes = {
		small: {
			iconSize: [25, 25],
			iconAnchor: [12.5, 25],
			popupAnchor: [0, -25],
		},
		medium: {
			iconSize: [32, 32],
			iconAnchor: [16, 32],
			popupAnchor: [0, -32],
		},
		large: {
			iconSize: [40, 40],
			iconAnchor: [20, 40],
			popupAnchor: [0, -40],
		},
	};
	const iconConfig = sizes[size];

	return new Icon({
		iconUrl: locationIconMaps,
		iconSize: iconConfig.iconSize as [number, number],
		iconAnchor: iconConfig.iconAnchor as [number, number],
		popupAnchor: iconConfig.popupAnchor as [number, number],
	});
};

const markerIcons = {
	small: {
		coworking: createCustomIcon("small"),
		cafe: createCustomIcon("small"),
		metro: createCustomIcon("small"),
		mall: createCustomIcon("small"),
		default: createCustomIcon("small"),
	},
	medium: {
		coworking: createCustomIcon("medium"),
		cafe: createCustomIcon("medium"),
		metro: createCustomIcon("medium"),
		mall: createCustomIcon("medium"),
		default: createCustomIcon("medium"),
	},
	large: {
		coworking: createCustomIcon("large"),
		cafe: createCustomIcon("large"),
		metro: createCustomIcon("large"),
		mall: createCustomIcon("large"),
		default: createCustomIcon("large"),
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
				lat: 17.401028,
				lng: 78.338389,
			},
			{
				name: "Orbit",
				address:
					"Orbit, Plot No 30/C, Sy No 83/1, Hyderabad Knowledge City Raidurg Panmaktha, Serilingampally Mandal, Hyderabad, Telangana 500019",
				type: "coworking",
				lat: 17.434389,
				lng: 78.376778,
			},
			{
				name: "My Home Twitza",
				address:
					"My Home Twitza, Survey No 83/1, APIIC- Hyderabad Knowledge Center, 5th & 6th Floor, Plot No 30/A, Rai Durg, Hyderabad, Telangana 500081",
				type: "coworking",
				lat: 17.433972,
				lng: 78.374972,
			},
			{
				name: "Jayabheri Trendset Connect",
				address:
					"Jayabheri Trendset Connect, SY No 5 Kondapur village, Madhapur Hyderabad Telangana India 500084",
				type: "coworking",
				lat: 17.457833,
				lng: 78.367222,
			},
			{
				name: "Sohini Tech Park",
				address:
					"Sohini Tech Park, 8th & 9th Floor, Survey No. 142, Nanakramguda Village, Serilingampally Mandal, RR District, Hyderabad 500032",
				type: "coworking",
				lat: 17.42275,
				lng: 78.347194,
			},
			{
				name: "Divyasree Trinity",
				address:
					"Divyasree Trinity, 7th & 8th Floor, Plot No. 5, at HITEC City Layout, survey number 64 (part), Madhapur Village, Serilingampally Mandal, R R District, Hyderabad 500081",
				type: "coworking",
				lat: 17.443556,
				lng: 78.374389,
			},
			{
				name: "Purva Summit",
				address:
					"Purva Summit, 2nd Floor, Survey No 8, Whitefields Road, White Fields, Hitech City, Hyderabad, Telangana 500081",
				type: "coworking",
				lat: 17.4535,
				lng: 78.37011,
			},
			{
				name: "Sreshta Marvel",
				address:
					"Sreshta Marvel, 2nd floor, Sy.No.136, Kondapur Main Road, P Janardhan Reddy Nagar, Gachibowli, Hyderabad, Telangana 500032",
				type: "coworking",
				lat: 17.446861,
				lng: 78.364083,
			},
			{
				name: "Modern Profound",
				address:
					"Modern Profound, 2nd Floor, Survey No. 12, Office No. 201, Kondapur, Hyderabad, Telangana 500032",
				type: "coworking",
				lat: 17.457306,
				lng: 78.3705,
			},
			{
				name: "Pranava One",
				address:
					"Pranava One, 6-5-654, Punjagutta Rd, Raj Bhavan Quarters Colony, Somajiguda, Hyderabad, Telangana 500082",
				type: "coworking",
				lat: 17.419639,
				lng: 78.457306,
			},
			{
				name: "Minaas Towers",
				address: "Minaas Towers, Gachibowli, Hyderabad, Telangana",
				type: "coworking",
				lat: 17.442722,
				lng: 78.368361,
			},
			{
				name: "SAS I Tower",
				address: "SAS I Tower, Gachibowli, Hyderabad, Telangana",
				type: "coworking",
				lat: 17.41925,
				lng: 78.360111,
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
				lat: 12.986472,
				lng: 77.730528,
			},
			{
				name: "Prestige Saleh Ahmed",
				address:
					"Prestige Saleh Ahmed 132, Lady Curzon Rd, Tasker Town, Infantry Road, Bangalore, 560001",
				type: "coworking",
				lat: 12.980348,
				lng: 77.603538,
			},
			{
				name: "Shilpitha Tech Park",
				address:
					"Shilpitha Tech Park, Sakra World Hospital, 55/3 55/4, Shilpitha Tech Park - Maithri Developers, Devarabisanahalli Road Bellandur, Kariyammana Agrahara, Bengaluru Karnataka 560103",
				type: "coworking",
				lat: 12.931222,
				lng: 77.685583,
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
				lat: 13.012861,
				lng: 80.202167,
			},
			{
				name: "Saravana Matrix Tower",
				address:
					"SM Towers, 5th & 6th Floors of Saravana Matrix Tower, No.2 / 88, Seevaram Village. OMR. Perungudi, Chennai 600096",
				type: "coworking",
				lat: 12.953833,
				lng: 80.241889,
			},
			{
				name: "Sigapi Achi",
				address:
					"No.18/3, Rukmani Lakshmipathi Road, Egmore, Chennai 600008",
				type: "coworking",
				lat: 13.065833,
				lng: 80.259583,
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
				lat: 18.564917,
				lng: 73.773861,
			},
			{
				name: "Panchshil Techpark",
				address:
					"Panchshil Techpark, 4th Floor, Survey No 19, 20, Hinjawadi Village, Hinjawadi, Pune, Pimpri-Chinchwad, Maharashtra 411057",
				type: "coworking",
				lat: 18.592673,
				lng: 73.746958,
			},
			{
				name: "Panchshil Techpark One",
				address:
					"Panchsil Tech Park One, Tower E, 191 IBM TECH PARK, Shastrinagar, Yerawada, Pune, Maharashtra 411006",
				type: "coworking",
				lat: 18.552778,
				lng: 73.892546,
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
				lat: 16.497139,
				lng: 80.651528,
			},
			{
				name: "Medha Towers",
				address:
					"Medha Towers, Sy. No. 53, Kesarapalli, IT Park Rd, Gannavaram, Vijayawada, Andhra Pradesh 521102",
				type: "coworking",
				lat: 16.526056,
				lng: 80.779694,
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
				lat: 22.573785,
				lng: 88.437549,
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
				lat: 22.991388,
				lng: 72.487518,
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
				lat: 17.743399,
				lng: 83.327411,
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
				lat: 28.466216,
				lng: 77.074073,
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
	const cityNameLower = cityName.toLowerCase();
	const cityConfig = centersByCity[cityNameLower] || centersByCity.hyderabad;
	const [markerData, setMarkerData] = useState<GeocodedLocation[]>([]);

	useEffect(() => {
		setMarkerData(cityConfig.locations);
	}, [cityConfig]);

	const cityData = getCityData(cityName);
	const cityInfo = cityData.description || {
		title: "",
		highlight: "",
		text: "",
	};
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
