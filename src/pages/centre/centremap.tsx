import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { COLORS } from "../../helpers/constants/Colors";
import mapPinIcon from "../../assets/homepage/map-pin.png";
import locationIconMaps from "../../assets/centers/locationicon_maps.png";
import busStopSvg from "../../assets/centers/nearest locations/busstop.svg";
import metroSvg from "../../assets/centers/nearest locations/metro.svg";
import hotelSvg from "../../assets/centers/nearest locations/hotel.svg";
import airportSvg from "../../assets/centers/nearest locations/airport.svg";
import commercialSvg from "../../assets/centers/nearest locations/commercial_properties.svg";

interface CenterMapProps {
	centerName: string;
	centreId?: string;
}

// Custom marker icon using the location icon
const markerIcon = new Icon({
	iconUrl: locationIconMaps,
	iconSize: [50, 50],
	iconAnchor: [25, 50],
	popupAnchor: [0, -50],
	className: "custom-map-marker",
});

type CenterLocation = {
	lat: number;
	lng: number;
	address: string;
	nearestLocations: {
		type: "bus" | "city" | "airport" | "metro" | "hotel" | "nearby";
		name: string;
		distance: string;
	}[];
};

// Center coordinates and nearest locations data
const centerLocations: { [key: string]: CenterLocation } = {
		// jade: { ... } removed duplicate entry, see below for the retained one.
		"profound-tech-park": {
			lat: 17.4691,
			lng: 78.357,
			address: "Modern Profound, 2nd Floor, Survey No. 12, Office No. 201, Kondapur, Hyderabad, Telangana 500032",
			nearestLocations: [
				{ type: "metro", name: "Hitech City Metro Station", distance: "1.8 KM" },
				{ type: "bus", name: "Bus Stop", distance: "1 KM" },
				{ type: "hotel", name: "Novotel Hyderabad Convention Centre", distance: "4.8 KM" },
				{ type: "airport", name: "Airport", distance: "35.5 KM" },
				{ type: "nearby", name: "Western Aqua", distance: "2.0 KM" },
			],
		},
		"pranava-one": {
		lat: 17.426,
		lng: 78.4556,
		address: "Pranava One, 6-5-654, Punjagutta Rd, Raj Bhavan Quarters Colony, Somajiguda, Hyderabad, Telangana 500082",
			nearestLocations: [
			{ type: "metro", name: "IrrumManzil Metro", distance: "300m" },
			{ type: "bus", name: "Bus Stop", distance: "500m" },
			{ type: "hotel", name: "Taj Deccan", distance: "1.1 KM" },
			{ type: "airport", name: "Rajiv Gandhi International Airport", distance: "30 KM" },
			{ type: "nearby", name: "Next Galleria Mall", distance: "2.3 KM" },
			],
		},
	"one-golden-mile": {
		lat: 17.401151977915994,
		lng: 78.33827643502595,
		address: "One Golden Mile, 9th Floor, Survey no 113, Golden Mile Rd, Kokapet, Hyderabad, Telangana 500075",
		nearestLocations: [
			{ type: "metro", name: "Durgam Cheruvu Metro Station", distance: "12 KM" },
			{ type: "bus", name: "Bus Stop", distance: "9.7 KM" },
			{ type: "hotel", name: "Hyatt Gachibowli", distance: "2.8 KM" },
			{ type: "airport", name: "Airport", distance: "9.5 KM" },
			{ type: "nearby", name: "Prestige Sky Tech", distance: "3.6 KM" },
		],
	},
	orbit: {
		lat: 17.434956417220725,
		lng: 78.3767676110163,
		address: "Orbit, Plot No 30/C, Sy No 83/1, Hyderabad Knowledge City Raidurg Panmaktha, Serilingampally Mandal, Hyderabad, Telangana 500019",
		nearestLocations: [
			{ type: "metro", name: "Raidurg Metro", distance: "1.5 KM" },
			{ type: "bus", name: "Bus Stop", distance: "0.5 KM" },
			{ type: "hotel", name: "ITC Kohenur", distance: "1.6 KM" },
			{ type: "airport", name: "Airport", distance: "36 KM" },
			{ type: "city", name: "City Center", distance: "0.3 KM" },
			{ type: "nearby", name: "Salarpuria Knowledge City", distance: "1.5 KM" },
		],
	},
	"my-home-twitza": {
		lat: 17.435255553297168,
		lng: 78.37478950804488,
		address: "My Home Twitza, Survey No 83/1, APIIC- Hyderabad Knowledge Center, 5th & 6th Floor, Plot No 30/A, Rai Durg, Hyderabad, Telangana 500081",
		nearestLocations: [
			{ type: "metro", name: "Raidurg Metro", distance: "1.5 KM" },
			{ type: "bus", name: "Bus Stop", distance: "0.5 KM" },
			{ type: "airport", name: "Airport", distance: "36 KM" },
			{ type: "nearby", name: "Salarpuria Knowledge City", distance: "1.5 KM" },
		],
	},
	"jayabheri-trendset": {
		lat: 17.4581,
		lng: 78.3565,
		address: "Jayabheri Trendset Connect, SY No 5 Kondapur village, Madhapur Hyderabad Telangana India 500084",
		nearestLocations: [
			{ type: "metro", name: "Hitech City Metro", distance: "2.2 KM" },
			{ type: "bus", name: "Bus Stop", distance: "Opposite" },
			{ type: "hotel", name: "Trident", distance: "4.3 KM" },
			{ type: "airport", name: "Airport", distance: "37 KM" },
			{ type: "nearby", name: "Western Aqua", distance: "1.3 KM" },
		],
	},
	"sohini-tech-park": {
		lat: 17.4274,
		lng: 78.3476,
		address: "Sohini Tech Park, 8th & 9th Floor, Survey No. 142, Nanakramguda Village, Serilingampally Mandal, RR District, Hyderabad 500032",
		nearestLocations: [
			{ type: "metro", name: "Raidurgam Metro Station", distance: "8 KM" },
			{ type: "bus", name: "Bus Stop", distance: "2 KM" },
			{ type: "hotel", name: "Radisson", distance: "4.8 KM" },
			{ type: "airport", name: "Airport", distance: "31.4 KM" },
			{ type: "nearby", name: "Rajapushpa Summit", distance: "1.7 KM" },
		],
	},
	"divyasree-trinity": {
		lat: 17.4504,
		lng: 78.38,
		address: "Divyasree Trinity, 7th & 8th Floor, Plot No. 5, at HITEC City Layout, survey number 64 (part), Madhapur Village, Serilingampally Mandal, R R District, Hyderabad 500081",
		nearestLocations: [
			{ type: "metro", name: "Raidurgam Metro Station", distance: "450m" },
			{ type: "bus", name: "Bus Stop", distance: "0.5 KM" },
			{ type: "hotel", name: "Trident", distance: "1.2 KM" },
			{ type: "airport", name: "Airport", distance: "35 KM" },
			{ type: "nearby", name: "Galaxy by Auro Realty", distance: "1.9 KM" },
		],
	},
	"purva-summit": {
		lat: 17.4566,
		lng: 78.3765,
		address: "Purva Summit, 2nd Floor, Survey No 8, Whitefields Road, White Fields, Hitech City, Hyderabad, Telangana 500081",
		nearestLocations: [
			{ type: "metro", name: "Raidurgam Metro Station", distance: "1.5 KM" },
			{ type: "bus", name: "Bus Stop", distance: "1 KM" },
			{ type: "hotel", name: "Radisson Hotel", distance: "3.8 KM" },
			{ type: "airport", name: "Airport", distance: "28.3 KM" },
			{ type: "nearby", name: "Mindspace IT Park", distance: "4.2 KM" },
		],
	},
	"sreshta-marvel": {
		lat: 17.467,
		lng: 78.3578,
		address: "Sreshta Marvel, 2nd floor, Sy.No.136, Kondapur Main Road, P Janardhan Reddy Nagar, Gachibowli, Hyderabad, Telangana 500032",
		nearestLocations: [
			{ type: "metro", name: "Raidurgam Metro Station", distance: "3.5 KM" },
			{ type: "bus", name: "Bus Stop", distance: "Opposite" },
			{ type: "hotel", name: "Radisson Hotel", distance: "600M" },
			{ type: "airport", name: "Airport", distance: "34.7 KM" },
			{ type: "nearby", name: "Mindspace IT Park", distance: "3.5 KM" },
		],
	},
	profound: {
		lat: 17.4691,
		lng: 78.357,
		address: "Modern Profound, 2nd Floor, Survey No. 12, Office No. 201, Kondapur, Hyderabad, Telangana 500032",
		nearestLocations: [
			{ type: "metro", name: "Hitech City Metro Station", distance: "1.8 KM" },
			{ type: "bus", name: "Bus Stop", distance: "1 KM" },
			{ type: "hotel", name: "Novotel Hyderabad Convention Centre", distance: "4.8 KM" },
			{ type: "airport", name: "Airport", distance: "35.5 KM" },
			{ type: "nearby", name: "Western Aqua", distance: "2.0 KM" },
		],
	},
	"nr-enclave": {
		lat: 13.1939,
		lng: 77.7064,
		address: "DivyaSree N R Enclave, 1st Main Rd, KIADB Export Promotion Industrial Area, Whitefield, Bengaluru, Karnataka 560066",
		nearestLocations: [
			{ type: "metro", name: "Baiyappanahalli Metro Station", distance: "11.9 KM" },
			{ type: "bus", name: "Bus Stop", distance: "300 Mts" },
			{ type: "hotel", name: "Oakwood Residence Whitefield", distance: "8.9 KM" },
			{ type: "airport", name: "Airport", distance: "39 KM" },
			{ type: "city", name: "City Center", distance: "5 KM" },
			{ type: "nearby", name: "DivyaSree Technopark", distance: "2.7 KM" },
		],
	},
	"prestige-saleh-ahmed": {
		lat: 13.0055,
		lng: 77.5932,
		address: "Prestige Saleh Ahmed 132, Lady Curzon Rd, Tasker Town, Infantry Road, Bangalore, 560001",
		nearestLocations: [
			{ type: "metro", name: "Cubbon Park Metro", distance: "950m" },
			{ type: "bus", name: "Bus Stop", distance: "Within 1 KM" },
			{ type: "hotel", name: "ITC Windsor", distance: "3.1 KM" },
			{ type: "airport", name: "Airport", distance: "33.3 KM" },
			{ type: "city", name: "City Center", distance: "4.5 KM" },
			{ type: "nearby", name: "Embassy Square", distance: "1.2 KM" },
		],
	},
	"shilpitha-tech-park": {
		lat: 12.9356,
		lng: 77.6245,
		address: "Shilpitha Tech Park, Sakra World Hospital, 55/3 55/4, Shilpitha Tech Park - Maithri Developers, Devarabisanahalli Road Bellandur, Kariyammana Agrahara, Bengaluru Karnataka 560103",
		nearestLocations: [
			{ type: "metro", name: "Baiyappanahalli Metro Station", distance: "11.9 KM" },
			{ type: "bus", name: "Bus Stop", distance: "300 Mts" },
			{ type: "hotel", name: "Novotel Bengaluru Outer Ring Road", distance: "450M" },
			{ type: "airport", name: "Airport", distance: "43 KM" },
			{ type: "city", name: "City Center", distance: "10 KM" },
			{ type: "nearby", name: "Embassy Tech Village", distance: "850M" },
		],
	},
	"jade": {
		lat: 13.0028,
		lng: 80.2156,
		address: "Kochar Jade - 5th Floor, Kochar Jade, Ambedkar Nagar, SIDCO Industrial Estate, Guindy, Chennai, Tamil Nadu 600032",
		nearestLocations: [
			{ type: "metro", name: "Guindy Metro Station", distance: "1.7 KM" },
			{ type: "bus", name: "Bus Stop", distance: "1.5 KM" },
			{ type: "hotel", name: "ITC Hotels - Grand Chola", distance: "3.6 KM" },
			{ type: "airport", name: "Airport", distance: "6.8 KM" },
			{ type: "city", name: "City Center", distance: "4.0 KM" },
			{ type: "nearby", name: "The Lords Building", distance: "2.1 KM" },
		],
	},
	"kochar-jade": {
		lat: 13.0028,
		lng: 80.2156,
		address: "Kochar Jade - 5th Floor, Kochar Jade, Ambedkar Nagar, SIDCO Industrial Estate, Guindy, Chennai, Tamil Nadu 600032",
		nearestLocations: [
			{ type: "metro", name: "Guindy Metro Station", distance: "1.7 KM" },
			{ type: "bus", name: "Bus Stop", distance: "1.5 KM" },
			{ type: "hotel", name: "ITC Hotels - Grand Chola", distance: "3.6 KM" },
			{ type: "airport", name: "Airport", distance: "6.8 KM" },
			{ type: "city", name: "City Center", distance: "4.0 KM" },
			{ type: "nearby", name: "The Lords Building", distance: "2.1 KM" },
		],
	},
	"sigapiachi": {
		lat: 13.0122,
		lng: 80.2727,
		address: "No.18/3, Rukmani Lakshmipathi Road, Egmore, Chennai 600008",
		nearestLocations: [
			{ type: "metro", name: "Guindy Metro Station", distance: "1.7 KM" },
			{ type: "bus", name: "Bus Stop", distance: "1.5 KM" },
			{ type: "hotel", name: "ITC Hotels - Grand Chola", distance: "3.6 KM" },
			{ type: "airport", name: "Airport", distance: "6.8 KM" },
			{ type: "city", name: "City Center", distance: "4.0 KM" },
			{ type: "nearby", name: "The Lords Building", distance: "2.1 KM" },
		],
	},
	"sm-towers": {
		lat: 12.9714,
		lng: 80.2506,
		address: "SM Towers, 5th & 6th Floors of Saravana Matrix Tower, No.2 / 88, Seevaram Village. OMR. Perungudi, Chennai 600096",
		nearestLocations: [
			{ type: "metro", name: "Little Mount Metro Station", distance: "13 KM" },
			{ type: "bus", name: "Bus Stop", distance: "400M" },
			{ type: "hotel", name: "Park Plaza", distance: "3.6 KM" },
			{ type: "airport", name: "Airport", distance: "14.5 KM" },
			{ type: "city", name: "City Center", distance: "2.8 KM" },
			{ type: "nearby", name: "World Trade Center", distance: "2.1 KM" },
		],
	},
	"grey-stone": {
		lat: 18.5614,
		lng: 73.7997,
		address: "iSprout GreyStone Tremont HQ7F+WFP, Near Kargar Facility Management Services, Veerbhadra Nagar, Baner, Pune, Maharashtra 411045",
		nearestLocations: [
			{ type: "metro", name: "Balewadi Phata Metro Station", distance: "600m" },
			{ type: "bus", name: "Bus Stop", distance: "5 KM" },
			{ type: "hotel", name: "Sayaji Pune", distance: "5.4 KM" },
			{ type: "airport", name: "Airport", distance: "18.9 KM" },
			{ type: "city", name: "City Center", distance: "4.4 KM" },
			{ type: "nearby", name: "Balaji Business Centre", distance: "1.6 KM" },
		],
	},
	"panchasilal-tech-park": {
		lat: 18.5921,
		lng: 73.7605,
		address: "Panchshil Techpark, 4th Floor, Survey No 19, 20, Hinjawadi Village, Hinjawadi, Pune, Pimpri-Chinchwad, Maharashtra 411057",
		nearestLocations: [
			{ type: "metro", name: "Ramwadi Metro Station", distance: "3 KM" },
			{ type: "hotel", name: "Vivanta Pune, Hinjawadi", distance: "500m" },
			{ type: "airport", name: "Airport", distance: "2.8 KM" },
			{ type: "city", name: "City Center", distance: "18.9 KM" },
			{ type: "nearby", name: "Menlo Professional Park", distance: "1.3 KM" },
		],
	},
	"panchasilal-tech-park-1": {
		lat: 18.5445,
		lng: 73.9117,
		address: "Panchsil Tech Park One, Tower E, 191 IBM TECH PARK, Shastrinagar, Yerawada, Pune, Maharashtra 411006",
		nearestLocations: [
			{ type: "metro", name: "Yerwada Metro Station", distance: "1.9 KM" },
			{ type: "bus", name: "Bus Stop", distance: "2 MIN WALK" },
			{ type: "hotel", name: "Hyatt Pune", distance: "2.4 KM" },
			{ type: "airport", name: "Airport", distance: "4.4 KM" },
			{ type: "city", name: "City Center", distance: "6.5 KM" },
			{ type: "nearby", name: "Muttha Towers", distance: "750M" },
		],
	},
	"benz-circle": {
		lat: 16.5062,
		lng: 80.648,
		address: "Door No: 40-14-8/2, near jyothi convention hall, Benz Circle, Vijayawada, Andhra Pradesh 520010",
		nearestLocations: [
			{ type: "bus", name: "Bus Stop", distance: "1 KM" },
			{ type: "hotel", name: "Novotel Vijayawada", distance: "2.4 KM" },
			{ type: "airport", name: "Vijayawada International Airport", distance: "18 KM" },
			{ type: "city", name: "City Center", distance: "1.2 KM" },
			{ type: "nearby", name: "Vertex Siris Signa", distance: "2.8 KM" },
		],
	},
	"medha-towers": {
		lat: 16.5083,
		lng: 80.5583,
		address: "Medha Towers, Sy. No. 53, Kesarapalli, IT Park Rd, Gannavaram, Vijayawada, Andhra Pradesh 521102",
		nearestLocations: [
			{ type: "bus", name: "Bus Stop", distance: "0.3 km" },
			{ type: "hotel", name: "KN GUPTA RESIDENCY", distance: "3.2 KM" },
			{ type: "airport", name: "Vijayawada International Airport", distance: "1.0 KM" },
			{ type: "nearby", name: "MEDHA HI-TECH CITY", distance: "850 mts" },
		],
	},
	"godrej-waterside": {
		lat: 22.5765,
		lng: 88.3994,
		address: "Godrej Waterside, Street No. 13, DP Block, Sector V, Bidhannagar, Kolkata, West Bengal 700091",
		nearestLocations: [
			{ type: "metro", name: "Salt Lake Sector V", distance: "1.7 KM" },
			{ type: "bus", name: "Bus Stop", distance: "0.2 km" },
			{ type: "hotel", name: "Novotel Kolkata", distance: "3.6 KM" },
			{ type: "airport", name: "Airport", distance: "12 km" },
			{ type: "nearby", name: "Millennium City IT Park", distance: "800m" },
		],
	},
	aurelien: {
		lat: 23.0225,
		lng: 72.5714,
		address: "XFRQ+R4P, Makarba, Ahmedabad, Sarkhej-Okaf, Gujarat 380054",
		nearestLocations: [
			{ type: "metro", name: "Gandhigram Metro Station", distance: "9.2 KM" },
			{ type: "bus", name: "Bus Stop", distance: "0.3 km" },
			{ type: "hotel", name: "NOVOTEL Ahmedabad", distance: "5.0 KM" },
			{ type: "airport", name: "Airport", distance: "23.7 KM" },
			{ type: "nearby", name: "Westgate Business Bay", distance: "3.1 KM" },
		],
	},
	hq27: {
		lat: 28.4595,
		lng: 77.0266,
		address: "B-660, 5th floor, Sushant Lok Phase I, Sector 27, Gurugram, Haryana 122009",
		nearestLocations: [
			{ type: "metro", name: "Iffco Metro / Huda City Metro", distance: "0.9km / 1.6km" },
			{ type: "bus", name: "Bus Stop", distance: "1 KM" },
			{ type: "hotel", name: "Radisson Hotel Gurugram", distance: "1.6 KM" },
			{ type: "airport", name: "Airport", distance: "15.2 KM" },
			{ type: "nearby", name: "Millennium Plaza", distance: "260m" },
		],
	},
};

const getIcon = (type: "bus" | "city" | "airport" | "metro" | "hotel" | "nearby") => {
	switch (type) {
		case "bus":
			return <img src={busStopSvg} alt="Bus Stop" className="w-16 h-16" />;
		case "city":
			return <img src={commercialSvg} alt="City" className="w-16 h-16" />;
		case "airport":
			return <img src={airportSvg} alt="Airport" className="w-16 h-16" />;
		case "metro":
			return <img src={metroSvg} alt="Metro" className="w-16 h-16" />;
		case "hotel":
			return <img src={hotelSvg} alt="Hotel" className="w-16 h-16" />;
		case "nearby":
			return <img src={commercialSvg} alt="Nearby" className="w-16 h-16" />;
	}
};

export default function CenterMap({ centerName, centreId }: CenterMapProps) {
	const locationData = centreId ? centerLocations[centreId] : null;

	if (!locationData) {
		return null;
	}

	return (
		<section className="w-full py-12 lg:py-16 px-4 relative" style={{ backgroundColor: COLORS.white, zIndex: 1 }}>
			<style>{`
				.custom-map-marker {
					mix-blend-mode: multiply;
				}
			`}</style>
			<h2 className="text-3xl lg:text-5xl font-bold text-center mb-8 lg:mb-12">
					<span style={{ color: COLORS.brandBlueDark }}>Map and Micro Market</span>
				</h2>
			<div className="max-w-7xl mx-auto">
				<div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
					{/* Left Side - Map */}
					<div className="w-full h-[400px] lg:h-[450px]">
						<div className="w-full h-full rounded-2xl overflow-hidden shadow-lg border-4 border-gray-200 relative z-0">
							<MapContainer
								center={[locationData.lat, locationData.lng]}
								zoom={14}
								className="w-full h-full z-0"
								scrollWheelZoom={false}
								zoomControl={true}
							>
								<TileLayer
									attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
									url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
								/>
								<Marker position={[locationData.lat, locationData.lng]} icon={markerIcon}>
									<Popup closeButton={true} className="z-[1000]">
										<div style={{ fontFamily: "Outfit, sans-serif" }}>
											<strong>{centerName}</strong>
											<br />
											<span className="text-sm text-gray-600">{locationData.address}</span>
										</div>
									</Popup>
								</Marker>
							</MapContainer>
						</div>
					</div>

					{/* Right Side - Nearest Locations */}
					<div className="flex flex-col h-[400px] lg:h-[450px]">
						<h2 className="text-3xl lg:text-4xl font-bold mb-6" style={{ color: COLORS.brandBlueDark }}>
							Nearest Locations
						</h2>
						<div className="flex-1 overflow-y-auto pr-2 space-y-6">
							{locationData.nearestLocations.map((location, index) => (
								<div
									key={index}
									className="flex items-center gap-6 pb-6 border-b border-gray-200 last:border-b-0"
								>
									<div className="flex-shrink-0">
										{getIcon(location.type)}
									</div>
									<div className="flex-1">
										<h3 className="text-lg font-semibold" style={{ color: COLORS.brandBlueDark }}>
											{location.name}
										</h3>
										<div className="flex items-center gap-2 mt-1">
											<img src={mapPinIcon} alt="location" className="w-4 h-4" />
											<span className="text-base font-medium" style={{ color: COLORS.brandBlueDark }}>
												{location.distance}
											</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
