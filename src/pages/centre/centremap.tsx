import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { COLORS } from "../../helpers/constants/Colors";
import { Bus, Building2, Plane } from "lucide-react";

interface CenterMapProps {
	centerName: string;
	centreId?: string;
}

// Custom marker icon
const createCustomIcon = (color: string) =>
	new Icon({
		iconUrl: `data:image/svg+xml;base64,${btoa(`
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" fill="${color}">
				<path d="M12 0C5.4 0 0 5.4 0 12c0 8 12 24 12 24s12-16 12-24c0-6.6-5.4-12-12-12zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/>
			</svg>
		`)}`,
		iconSize: [40, 60],
		iconAnchor: [20, 60],
		popupAnchor: [0, -60],
	});

const markerIcon = createCustomIcon(COLORS.brandBlue);

type CenterLocation = {
	lat: number;
	lng: number;
	address: string;
	nearestLocations: {
		type: "bus" | "city" | "airport";
		name: string;
		distance: string;
	}[];
};

// Center coordinates and nearest locations data
const centerLocations: { [key: string]: CenterLocation } = {
	"one-golden-mile": {
		lat: 17.3827,
		lng: 78.3471,
		address: "One Golden Mile, 9th Floor, Survey no 113, Golden Mile Rd, Kokapet, Hyderabad, Telangana 500075",
		nearestLocations: [
			{ type: "bus", name: "Bus Stop", distance: "9.7 KM" },
			{ type: "city", name: "Hi-Tech City", distance: "12.1 KM" },
			{ type: "airport", name: "Airport", distance: "20 KM" },
		],
	},
	orbit: {
		lat: 17.4312,
		lng: 78.3777,
		address: "Orbit, Plot No 30/C, Sy No 83/1, Hyderabad Knowledge City Raidurg Panmaktha, Serilingampally Mandal, Hyderabad, Telangana 500019",
		nearestLocations: [
			{ type: "bus", name: "Bus Stop", distance: "2.5 KM" },
			{ type: "city", name: "Hi-Tech City", distance: "3.8 KM" },
			{ type: "airport", name: "Airport", distance: "32 KM" },
		],
	},
	"myhome-twitza": {
		lat: 17.4342,
		lng: 78.3823,
		address: "My Home Twitza, Survey No 83/1, APIIC- Hyderabad Knowledge Center, 5th & 6th Floor, Plot No 30/A, Rai Durg, Hyderabad, Telangana 500081",
		nearestLocations: [
			{ type: "bus", name: "Bus Stop", distance: "1.8 KM" },
			{ type: "city", name: "Hi-Tech City", distance: "4.2 KM" },
			{ type: "airport", name: "Airport", distance: "33 KM" },
		],
	},
	"jayabheri-trendset": {
		lat: 17.4581,
		lng: 78.3565,
		address: "Jayabheri Trendset Connect, SY No 5 Kondapur village, Madhapur Hyderabad Telangana India 500084",
		nearestLocations: [
			{ type: "bus", name: "Bus Stop", distance: "3.2 KM" },
			{ type: "city", name: "Hi-Tech City", distance: "5.6 KM" },
			{ type: "airport", name: "Airport", distance: "35 KM" },
		],
	},
	"sohini-tech-park": {
		lat: 17.4274,
		lng: 78.3476,
		address: "Sohini Tech Park, 8th & 9th Floor, Survey No. 142, Nanakramguda Village, Serilingampally Mandal, RR District, Hyderabad 500032",
		nearestLocations: [
			{ type: "bus", name: "Bus Stop", distance: "2.1 KM" },
			{ type: "city", name: "Hi-Tech City", distance: "5.4 KM" },
			{ type: "airport", name: "Airport", distance: "30 KM" },
		],
	},
	"divyasree-trinity": {
		lat: 17.4504,
		lng: 78.38,
		address: "Divyasree Trinity, 7th & 8th Floor, Plot No. 5, at HITEC City Layout, survey number 64 (part), Madhapur Village, Serilingampally Mandal, R R District, Hyderabad 500081",
		nearestLocations: [
			{ type: "bus", name: "Bus Stop", distance: "1.5 KM" },
			{ type: "city", name: "Hi-Tech City", distance: "2.8 KM" },
			{ type: "airport", name: "Airport", distance: "34 KM" },
		],
	},
	purva: {
		lat: 17.4566,
		lng: 78.3765,
		address: "Purva Summit, 2nd Floor, Survey No 8, Whitefields Road, White Fields, Hitech City, Hyderabad, Telangana 500081",
		nearestLocations: [
			{ type: "bus", name: "Bus Stop", distance: "1.2 KM" },
			{ type: "city", name: "Hi-Tech City", distance: "2.5 KM" },
			{ type: "airport", name: "Airport", distance: "35 KM" },
		],
	},
	"sreshta-marvel": {
		lat: 17.467,
		lng: 78.3578,
		address: "Sreshta Marvel, 2nd floor, Sy.No.136, Kondapur Main Road, P Janardhan Reddy Nagar, Gachibowli, Hyderabad, Telangana 500032",
		nearestLocations: [
			{ type: "bus", name: "Bus Stop", distance: "2.8 KM" },
			{ type: "city", name: "Gachibowli", distance: "3.5 KM" },
			{ type: "airport", name: "Airport", distance: "36 KM" },
		],
	},
	profound: {
		lat: 17.4691,
		lng: 78.357,
		address: "Modern Profound Techpark, 2nd Floor, Survey No. 12, Office No. 201, Kondapur, Hyderabad, Telangana 500032",
		nearestLocations: [
			{ type: "bus", name: "Bus Stop", distance: "3.1 KM" },
			{ type: "city", name: "Gachibowli", distance: "4.2 KM" },
			{ type: "airport", name: "Airport", distance: "37 KM" },
		],
	},
	"nr-enclave": {
		lat: 13.1939,
		lng: 77.7064,
		address: "DivyaSree N R Enclave, 1st Main Rd, KIADB Export Promotion Industrial Area, Whitefield, Bengaluru, Karnataka 560066",
		nearestLocations: [
			{ type: "bus", name: "Bus Stop", distance: "1.8 KM" },
			{ type: "city", name: "Whitefield", distance: "3.2 KM" },
			{ type: "airport", name: "Airport", distance: "42 KM" },
		],
	},
	"prestige-saleh-ahmed": {
		lat: 13.0055,
		lng: 77.5932,
		address: "Prestige Saleh Ahmed 132, Lady Curzon Rd, Tasker Town, Infantry Road, Bangalore, 560001",
		nearestLocations: [
			{ type: "bus", name: "Bus Stop", distance: "0.5 KM" },
			{ type: "city", name: "MG Road", distance: "2.1 KM" },
			{ type: "airport", name: "Airport", distance: "28 KM" },
		],
	},
	"shilpitha-tech-park": {
		lat: 12.9356,
		lng: 77.6245,
		address: "Shilpitha Tech Park, Sakra World Hospital, 55/3 55/4, Shilpitha Tech Park - Maithri Developers, Devarabisanahalli Road Bellandur, Kariyammana Agrahara, Bengaluru Karnataka 560103",
		nearestLocations: [
			{ type: "bus", name: "Bus Stop", distance: "2.3 KM" },
			{ type: "city", name: "Koramangala", distance: "8.5 KM" },
			{ type: "airport", name: "Airport", distance: "38 KM" },
		],
	},
	jade: {
		lat: 13.0028,
		lng: 80.2156,
		address: "Kochar Jade - 5th Floor, Kochar Jade, Ambedkar Nagar, SIDCO Industrial Estate, Guindy, Chennai, Tamil Nadu 600032",
		nearestLocations: [
			{ type: "bus", name: "Bus Stop", distance: "1.2 KM" },
			{ type: "city", name: "Guindy", distance: "2.8 KM" },
			{ type: "airport", name: "Airport", distance: "8 KM" },
		],
	},
	"sm-tower": {
		lat: 12.9714,
		lng: 80.2506,
		address: "SM Towers, 5th & 6th Floors of Saravana Matrix Tower, No.2 / 88, Seevaram Village. OMR. Perungudi, Chennai 600096",
		nearestLocations: [
			{ type: "bus", name: "Bus Stop", distance: "1.5 KM" },
			{ type: "city", name: "OMR", distance: "3.2 KM" },
			{ type: "airport", name: "Airport", distance: "15 KM" },
		],
	},
	"grey-stone": {
		lat: 18.5614,
		lng: 73.7997,
		address: "iSprout GreyStone Tremont HQ7F+WFP, Near Kargar Facility Management Services, Veerbhadra Nagar, Baner, Pune, Maharashtra 411045",
		nearestLocations: [
			{ type: "bus", name: "Bus Stop", distance: "2.1 KM" },
			{ type: "city", name: "Baner", distance: "3.5 KM" },
			{ type: "airport", name: "Airport", distance: "18 KM" },
		],
	},
	"panchshil-tech-park": {
		lat: 18.5921,
		lng: 73.7605,
		address: "Panchshil Techpark, 4th Floor, Survey No 19, 20, Hinjawadi Village, Hinjawadi, Pune, Pimpri-Chinchwad, Maharashtra 411057",
		nearestLocations: [
			{ type: "bus", name: "Bus Stop", distance: "1.8 KM" },
			{ type: "city", name: "Hinjawadi", distance: "2.5 KM" },
			{ type: "airport", name: "Airport", distance: "25 KM" },
		],
	},
	"panchshil-tech-park-1": {
		lat: 18.5445,
		lng: 73.9117,
		address: "Panchsil Tech Park One, Tower E, 191 IBM TECH PARK, Shastrinagar, Yerawada, Pune, Maharashtra 411006",
		nearestLocations: [
			{ type: "bus", name: "Bus Stop", distance: "1.2 KM" },
			{ type: "city", name: "Yerawada", distance: "2.8 KM" },
			{ type: "airport", name: "Airport", distance: "12 KM" },
		],
	},
	"vijayawada-benz-circle": {
		lat: 16.5062,
		lng: 80.648,
		address: "Door No: 40-14-8/2, near jyothi convention hall, Benz Circle, Vijayawada, Andhra Pradesh 520010",
		nearestLocations: [
			{ type: "bus", name: "Bus Stop", distance: "0.8 KM" },
			{ type: "city", name: "Benz Circle", distance: "1.5 KM" },
			{ type: "airport", name: "Airport", distance: "22 KM" },
		],
	},
	"medha-towers": {
		lat: 16.5083,
		lng: 80.5583,
		address: "Medha Towers, Sy. No. 53, Kesarapalli, IT Park Rd, Gannavaram, Vijayawada, Andhra Pradesh 521102",
		nearestLocations: [
			{ type: "bus", name: "Bus Stop", distance: "2.5 KM" },
			{ type: "city", name: "IT Park", distance: "3.8 KM" },
			{ type: "airport", name: "Airport", distance: "8 KM" },
		],
	},
	"godrej-water-side": {
		lat: 22.5765,
		lng: 88.3994,
		address: "Godrej Waterside, Street No. 13, DP Block, Sector V, Bidhannagar, Kolkata, West Bengal 700091",
		nearestLocations: [
			{ type: "bus", name: "Bus Stop", distance: "1.5 KM" },
			{ type: "city", name: "Salt Lake", distance: "3.2 KM" },
			{ type: "airport", name: "Airport", distance: "18 KM" },
		],
	},
	aurelian: {
		lat: 23.0225,
		lng: 72.5714,
		address: "XFRQ+R4P, Makarba, Ahmedabad, Sarkhej-Okaf, Gujarat 380054",
		nearestLocations: [
			{ type: "bus", name: "Bus Stop", distance: "2.8 KM" },
			{ type: "city", name: "Makarba", distance: "4.5 KM" },
			{ type: "airport", name: "Airport", distance: "12 KM" },
		],
	},
	hq27: {
		lat: 28.4595,
		lng: 77.0266,
		address: "B-660, 5th floor, Sushant Lok Phase I, Sector 27, Gurugram, Haryana 122009",
		nearestLocations: [
			{ type: "bus", name: "Bus Stop", distance: "1.2 KM" },
			{ type: "city", name: "Sushant Lok", distance: "2.5 KM" },
			{ type: "airport", name: "Airport", distance: "15 KM" },
		],
	},
};

const getIcon = (type: "bus" | "city" | "airport") => {
	switch (type) {
		case "bus":
			return <Bus className="w-8 h-8" />;
		case "city":
			return <Building2 className="w-8 h-8" />;
		case "airport":
			return <Plane className="w-8 h-8" />;
	}
};

export default function CenterMap({ centerName, centreId }: CenterMapProps) {
	const locationData = centreId ? centerLocations[centreId] : null;

	if (!locationData) {
		return null;
	}

	return (
		<section className="w-full py-12 lg:py-16 px-4 relative" style={{ backgroundColor: COLORS.white, zIndex: 1 }}>
			<div className="max-w-7xl mx-auto">
				<div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
					{/* Left Side - Map */}
					<div className="w-full h-[400px] lg:h-[500px]">
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
					<div className="flex flex-col justify-center">
						<h2 className="text-3xl lg:text-4xl font-bold mb-8" style={{ color: COLORS.brandBlueDark }}>
							Nearest Locations
						</h2>
						<div className="space-y-6">
							{locationData.nearestLocations.map((location, index) => (
								<div
									key={index}
									className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
								>
									<div className="flex items-center gap-4">
										<div
											className="p-3 rounded-full"
											style={{ backgroundColor: "#F0F9FF", color: COLORS.brandBlue }}
										>
											{getIcon(location.type)}
										</div>
										<span className="text-lg font-semibold" style={{ color: COLORS.brandBlueDark }}>
											{location.name}
										</span>
									</div>
									<div className="flex items-center gap-2">
										<svg className="w-5 h-5" style={{ color: COLORS.brandBlue }} fill="currentColor" viewBox="0 0 20 20">
											<path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
										</svg>
										<span className="text-lg font-bold" style={{ color: COLORS.brandBlueDark }}>
											{location.distance}
										</span>
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
