export interface NearbyLocation {
	name: string;
	distance: string;
}

export interface CategoryLocations {
	residential?: NearbyLocation[];
	hotels?: NearbyLocation[];
	commercial?: NearbyLocation[];
	retail?: NearbyLocation[];
	metro?: NearbyLocation[];
	airport?: NearbyLocation[];
}

interface CenterNearbyData {
	[centerName: string]: CategoryLocations;
}

export const nearbyLocationsData: CenterNearbyData = {
	"one golden mile": {
		residential: [{ name: "Rajapuspa Prime", distance: "1.0 KM" }],
		hotels: [{ name: "Hyatt Gachibowli", distance: "2.8 KM" }],
		commercial: [{ name: "Prestige Sky Tech", distance: "3.6 KM" }],
		retail: [{ name: "Inorbit Mall Cyberabad", distance: "6.9 KM" }],
		metro: [{ name: "Durgam Cheruvu Metro Station", distance: "12 KM" }],
		airport: [],
	},
	orbit: {
		residential: [{ name: "My Home Bhooja", distance: "1 KM" }],
		hotels: [{ name: "ITC Kohenur", distance: "1.6 KM" }],
		commercial: [{ name: "Salarpuria Knowledge City", distance: "1.5 KM" }],
		retail: [{ name: "Inorbit Mall", distance: "2 KM" }],
		metro: [{ name: "Raidurg Metro", distance: "1.5 KM" }],
		airport: [
			{ name: "Rajiv Gandhi International Airport", distance: "36 KM" },
		],
	},
	"my home twitza": {
		residential: [{ name: "My Home Navadweepa", distance: "2.2 KM" }],
		hotels: [{ name: "Trident", distance: "1.2 km" }],
		commercial: [{ name: "Galaxy by Auro Realty", distance: "1.9 KM" }],
		retail: [{ name: "Atrium Mall", distance: "2.7 KM" }],
		metro: [{ name: "Raidurgam Metro Station", distance: "450m" }],
		airport: [{ name: "Airport", distance: "35 KM" }],
	},
	"jayabheri trendset connect": {
		residential: [{ name: "My Home Mangala", distance: "4.3 KM" }],
		hotels: [{ name: "Trident", distance: "4.3 km" }],
		commercial: [{ name: "Westren Aqua", distance: "1.3 KM" }],
		retail: [{ name: "Sarath City Capital Mall", distance: "800M" }],
		metro: [{ name: "Hitech City Metro", distance: "2.2 KM" }],
		airport: [
			{ name: "Rajiv Gandhi International Airport", distance: "37 KM" },
		],
	},
	"sohini tech park": {
		residential: [{ name: "Prestige High Fields", distance: "3.0 KM" }],
		hotels: [{ name: "Radisson", distance: "4.8 km" }],
		commercial: [{ name: "Rajapushpa Summit", distance: "1.7 KM" }],
		retail: [{ name: "Inorbit Mall", distance: "6.9 KM" }],
		metro: [{ name: "Raidurgam Metro Station", distance: "8 KM" }],
		airport: [{ name: "Airport", distance: "31.4 KM" }],
	},
	"divyasree trinity": {
		residential: [{ name: "My Home Navadweepa", distance: "2.2 KM" }],
		hotels: [{ name: "Trident", distance: "1.2 km" }],
		commercial: [{ name: "Galaxy by Auro Realty", distance: "1.9 KM" }],
		retail: [{ name: "Atrium Mall", distance: "2.7 KM" }],
		metro: [{ name: "Raidurgam Metro Station", distance: "450m" }],
		airport: [{ name: "Airport", distance: "35 KM" }],
	},
	"purva summit": {
		residential: [{ name: "Aditya Heights", distance: "1.4 KM" }],
		hotels: [{ name: "Radisson Hotel", distance: "3.8 KM" }],
		commercial: [{ name: "Mindspace IT Park", distance: "4.2 KM" }],
		retail: [{ name: "Sarath City Capital Mall", distance: "2.3 KM" }],
		metro: [{ name: "Raidurgam Metro Station", distance: "1.5 KM" }],
		airport: [{ name: "Airport", distance: "28.3 KM" }],
	},
	"sreshta marvel": {
		residential: [{ name: "Aparna Serene Park", distance: "5.1 KM" }],
		hotels: [{ name: "Radisson Hotel", distance: "600M" }],
		commercial: [{ name: "Mindspace IT Park", distance: "3.5 KM" }],
		retail: [{ name: "Atrium Mall", distance: "170M" }],
		metro: [{ name: "Raidurgam Metro Station", distance: "3.5 KM" }],
		airport: [{ name: "Airport", distance: "34.7 KM" }],
	},
	"modern profound": {
		residential: [{ name: "My Home Mangala", distance: "5.9 KM" }],
		hotels: [
			{ name: "Novotel Hyderabad Convention Centre", distance: "4.8 km" },
		],
		commercial: [{ name: "Western Aqua", distance: "2.0 km" }],
		retail: [{ name: "Inorbit Mall Hyderabad", distance: "3.0 km" }],
		metro: [{ name: "Hitech City Metro Station", distance: "1.8 KM" }],
		airport: [{ name: "Airport", distance: "35.5 KM" }],
	},
	"pranava one": {
		residential: [{ name: "Shanti Soudha Apartments", distance: "1 KM" }],
		hotels: [{ name: "Taj Deccan", distance: "1.1 KM" }],
		commercial: [],
		retail: [{ name: "Next Galleria Mall", distance: "2.3 KM" }],
		metro: [{ name: "IrrumManzil Metro", distance: "300m" }],
		airport: [
			{ name: "Rajiv Gandhi International Airport", distance: "30 KM" },
		],
	},
	"minaas towers": {
		residential: [{ name: "My Home Bhooja", distance: "3.7 KM" }],
		hotels: [{ name: "Peerless Hotel", distance: "2.6 KM" }],
		commercial: [{ name: "Meenakshi Pride Rock", distance: "550M" }],
		retail: [{ name: "Atrium Mall", distance: "1.0 KM" }],
		metro: [{ name: "Raidurg Metro", distance: "4.3 KM" }],
		airport: [
			{ name: "Rajiv Gandhi International Airport", distance: "38 KM" },
		],
	},
	"sas towers": {
		residential: [{ name: "My Home Avatar", distance: "4.7 KM" }],
		hotels: [{ name: "Hyatt Hyderabad Gachibowli", distance: "4.2 KM" }],
		commercial: [{ name: "SATTVA", distance: "5.6 KM" }],
		retail: [{ name: "Anvi's Eco Grand Mall", distance: "3.9 KM" }],
		metro: [{ name: "Raidurg Metro", distance: "6.6 KM" }],
		airport: [
			{ name: "Rajiv Gandhi International Airport", distance: "34.5 KM" },
		],
	},
	"medha towers": {
		residential: [{ name: "Sri Sai Sawbagya Satan", distance: "3.6 KM" }],
		hotels: [{ name: "KN GUPTA RESIDENCY", distance: "3.2 KM" }],
		commercial: [],
		retail: [{ name: "Venus shopping mall", distance: "3.2 KM" }],
		metro: [],
		airport: [
			{ name: "Vijayawada International Airport", distance: "1.0 KM" },
		],
	},
	"benz circle": {
		residential: [{ name: "Aparna Amaravati One", distance: "7.9 KM" }],
		hotels: [{ name: "Novotel Vijayawada", distance: "2.4 KM" }],
		commercial: [{ name: "Vertex Siris Signa", distance: "2.8 KM" }],
		retail: [{ name: "Trendset Mall", distance: "1.2 KM" }],
		metro: [],
		airport: [
			{ name: "Vijayawada International Airport", distance: "18 KM" },
		],
	},
	"kochar jade": {
		residential: [{ name: "VGN Richmond Towers", distance: "1.9 KM" }],
		hotels: [{ name: "ITC Hotels - Grand Chola", distance: "3.6 KM" }],
		commercial: [{ name: "The Lords Building", distance: "2.1 KM" }],
		retail: [{ name: "Palladium", distance: "2.8 KM" }],
		metro: [{ name: "Guindy Metro Station", distance: "1.7 KM" }],
		airport: [
			{ name: "Chennai International Airport", distance: "6.8 KM" },
		],
	},
	"saravana matrix tower": {
		residential: [{ name: "Olympia Grande", distance: "10.3 KM" }],
		hotels: [{ name: "Park Plaza", distance: "3.6 KM" }],
		commercial: [{ name: "World Trade Center", distance: "2.1 KM" }],
		retail: [{ name: "BSR mall", distance: "8.2 KM" }],
		metro: [{ name: "Little Mount Metro Station", distance: "13 KM" }],
		airport: [
			{ name: "Chennai International Airport", distance: "14.5 KM" },
		],
	},
	"panchshil techpark": {
		residential: [{ name: "PARK ISLAND", distance: "1.2 KM" }],
		hotels: [{ name: "Vivanta Pune, Hinjawadi", distance: "500m" }],
		commercial: [{ name: "Menlo Professional Park", distance: "1.3 KM" }],
		retail: [{ name: "Xion Mall", distance: "5.4 km" }],
		metro: [{ name: "Ramwadi Metro Station", distance: "3 KM" }],
		airport: [{ name: "Pune International Airport", distance: "2.8 KM" }],
	},
	"greystone baner": {
		residential: [{ name: "Kolte-Patil 24K Sereno", distance: "1.9 KM" }],
		hotels: [{ name: "Sayaji Pune", distance: "5.4 KM" }],
		commercial: [{ name: "Balaji Business Centre", distance: "1.6 KM" }],
		retail: [{ name: "Westside Baner", distance: "1.5 km" }],
		metro: [{ name: "Balewadi Phata Metro Station", distance: "600m" }],
		airport: [{ name: "Pune International Airport", distance: "18.9 KM" }],
	},
	yerwada: {
		residential: [{ name: "Goel Hari Ganga", distance: "800M" }],
		hotels: [{ name: "Hyatt Pune", distance: "2.4 KM" }],
		commercial: [{ name: "Muttha Towers", distance: "750M" }],
		retail: [{ name: "Ishanya Mall", distance: "1.3 KM" }],
		metro: [{ name: "Yerwada Metro Station", distance: "1.9 KM" }],
		airport: [{ name: "Pune International Airport", distance: "4.4 KM" }],
	},
	"shilpitha tech park": {
		residential: [{ name: "Sobha Insignia", distance: "2.1 KM" }],
		hotels: [
			{ name: "Novotel Bengaluru Outer Ring Road", distance: "450M" },
		],
		commercial: [{ name: "Embassy Tech Village", distance: "850M" }],
		retail: [{ name: "Central Mall", distance: "1.5 Km" }],
		metro: [{ name: "Baiyappanahalli Metro Station", distance: "11.9 KM" }],
		airport: [
			{
				name: "Kempegowda International Airport Bengaluru",
				distance: "43 KM",
			},
		],
	},
	"nr enclave": {
		residential: [{ name: "Prestige White Meadows", distance: "4.4 KM" }],
		hotels: [{ name: "Oakwood Residence Whitefield", distance: "8.9 KM" }],
		commercial: [{ name: "DivyaSree Technopark", distance: "2.7 KM" }],
		retail: [{ name: "Phoniex MarketCity", distance: "3.8 Km" }],
		metro: [
			{ name: "Sri Sathya Sai Hospital Metro Station", distance: "750m" },
		],
		airport: [
			{
				name: "Kempegowda International Airport Bengaluru",
				distance: "39 KM",
			},
		],
	},
	"prestige saleh ahmed": {
		residential: [{ name: "Sivanchetti Gardens", distance: "2.3 KM" }],
		hotels: [{ name: "ITC Windsor", distance: "3.1 KM" }],
		commercial: [{ name: "Embassy Square", distance: "1.2 KM" }],
		retail: [{ name: "1MG Mall", distance: "1.8 KM" }],
		metro: [{ name: "Cubbon Park METRO", distance: "950m" }],
		airport: [
			{
				name: "Kempegowda International Airport Bengaluru",
				distance: "33.3 KM",
			},
		],
	},
	"hq27 the headquarters": {
		residential: [{ name: "DLF Ridgewood Estate", distance: "1.3 KM" }],
		hotels: [{ name: "Radisson Hotel Gurugram", distance: "1.6 KM" }],
		commercial: [{ name: "Millennium Plaza", distance: "260m" }],
		retail: [{ name: "Galleria Market", distance: "700m" }],
		metro: [{ name: "Iffco Metro", distance: "0.9 km" }],
		airport: [
			{
				name: "Indira Gandhi International Airport",
				distance: "15.2 KM",
			},
		],
	},
	aurelien: {
		residential: [{ name: "Riviera Blues", distance: "3.4 KM" }],
		hotels: [{ name: "NOVOTEL Ahemedabad", distance: "5.0 KM" }],
		commercial: [{ name: "Westgate Business Bay", distance: "3.1 K" }],
		retail: [{ name: "Nexus Ahmedabad One", distance: "9.5 KM" }],
		metro: [{ name: "Gandhigram Metro Station", distance: "9.2 KM" }],
		airport: [
			{
				name: "Sardar Vallabhbhai Patel International Airport",
				distance: "23.7 KM",
			},
		],
	},
	"godrej waterside": {
		residential: [{ name: "Shaila Towers", distance: "500 m" }],
		hotels: [{ name: "Novotel Kolkata", distance: "3.6 KM" }],
		commercial: [{ name: "Millennium City IT Park", distance: "800m" }],
		retail: [{ name: "City Centre Salt Lake", distance: "3.9 KM" }],
		metro: [{ name: "Salt Lake Sector V", distance: "1.7 KM" }],
		airport: [
			{
				name: "Netaji Subhash Chandra Bose International Airport",
				distance: "12 km",
			},
		],
	},
};

export const getNearbyLocations = (centerName: string): CategoryLocations => {
	const normalizedName = centerName.toLowerCase();
	return nearbyLocationsData[normalizedName] || {};
};

export default {
	nearbyLocationsData,
	getNearbyLocations,
};
