import React from "react";
import { useParams } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import locationIconMaps from "../../assets/centers/locationicon_maps.png";

interface NearbyLocation {
	name: string;
	distance: string;
	icon: string;
	type: string;
}

interface CityData {
	lat: number;
	lng: number;
	locations: NearbyLocation[];
}

interface CityNearbyData {
	[key: string]: CityData;
}

const NearestLocations: React.FC = () => {
	const { cityName = "" } = useParams<{ cityName: string }>();

	const nearbyLocationsByCity: CityNearbyData = {
		hyderabad: {
			lat: 17.434389,
			lng: 78.376778,
			locations: [
				{
					name: "Bus Stop",
					distance: "9.7 KM",
					icon: "🚌",
					type: "transport",
				},
				{
					name: "Hi-Tech City",
					distance: "12.1 KM",
					icon: "🏢",
					type: "landmark",
				},
				{
					name: "Airport",
					distance: "20 KM",
					icon: "✈️",
					type: "airport",
				},
			],
		},
		bengaluru: {
			lat: 12.980347956650435,
			lng: 77.60353825265815,
			locations: [
				{
					name: "Bus Stop",
					distance: "8.5 KM",
					icon: "🚌",
					type: "transport",
				},
				{
					name: "Whitefield",
					distance: "15 KM",
					icon: "🏢",
					type: "landmark",
				},
				{
					name: "Kempegowda International Airport",
					distance: "35 KM",
					icon: "✈️",
					type: "airport",
				},
			],
		},
		pune: {
			lat: 18.59267338401002,
			lng: 73.74695826888593,
			locations: [
				{
					name: "Bus Stop",
					distance: "7.2 KM",
					icon: "🚌",
					type: "transport",
				},
				{
					name: "Hinjewadi IT Park",
					distance: "10.5 KM",
					icon: "🏢",
					type: "landmark",
				},
				{
					name: "Pune Airport",
					distance: "25 KM",
					icon: "✈️",
					type: "airport",
				},
			],
		},
		chennai: {
			lat: 13.012861,
			lng: 80.202167,
			locations: [
				{
					name: "Bus Stop",
					distance: "6.8 KM",
					icon: "🚌",
					type: "transport",
				},
				{
					name: "Old Mahabalipuram Road",
					distance: "8.3 KM",
					icon: "🏢",
					type: "landmark",
				},
				{
					name: "Chennai International Airport",
					distance: "16 KM",
					icon: "✈️",
					type: "airport",
				},
			],
		},
		vijayawada: {
			lat: 16.497139,
			lng: 80.651528,
			locations: [
				{
					name: "Bus Stop",
					distance: "5.4 KM",
					icon: "🚌",
					type: "transport",
				},
				{
					name: "Benz Circle",
					distance: "8.9 KM",
					icon: "🏢",
					type: "landmark",
				},
				{
					name: "Vijayawada Airport",
					distance: "12 KM",
					icon: "✈️",
					type: "airport",
				},
			],
		},
		kolkata: {
			lat: 22.57378496488076,
			lng: 88.43754883703603,
			locations: [
				{
					name: "Bus Stop",
					distance: "7.6 KM",
					icon: "🚌",
					type: "transport",
				},
				{
					name: "Kolkata City Centre",
					distance: "9.2 KM",
					icon: "🏢",
					type: "landmark",
				},
				{
					name: "Netaji Subhas Chandra Bose International Airport",
					distance: "18 KM",
					icon: "✈️",
					type: "airport",
				},
			],
		},
		ahmedabad: {
			lat: 22.991387543747027,
			lng: 72.48751749532124,
			locations: [
				{
					name: "Bus Stop",
					distance: "6.3 KM",
					icon: "🚌",
					type: "transport",
				},
				{
					name: "SG Highway",
					distance: "11.5 KM",
					icon: "🏢",
					type: "landmark",
				},
				{
					name: "Sardar Vallabhbhai Patel International Airport",
					distance: "22 KM",
					icon: "✈️",
					type: "airport",
				},
			],
		},
		gurugram: {
			lat: 28.46621588267456,
			lng: 77.0740724558554,
			locations: [
				{
					name: "Bus Stop",
					distance: "4.2 KM",
					icon: "🚌",
					type: "transport",
				},
				{
					name: "Cyber City",
					distance: "7.8 KM",
					icon: "🏢",
					type: "landmark",
				},
				{
					name: "Indira Gandhi International Airport",
					distance: "28 KM",
					icon: "✈️",
					type: "airport",
				},
			],
		},
	};

	const normalizedCityName =
		cityName?.toLowerCase().replace(/\s+/g, "") || "hyderabad";
	const cityData =
		nearbyLocationsByCity[normalizedCityName] ||
		nearbyLocationsByCity["hyderabad"];

	const customMarkerIcon = new Icon({
		iconUrl: locationIconMaps,
		iconSize: [40, 40],
		iconAnchor: [20, 40],
		popupAnchor: [0, -40],
	});

	return (
		<div className='w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16'>
			<div className='max-w-7xl mx-auto'>
				{/* Title */}
				<h2
					className='text-3xl sm:text-4xl md:text-5xl font-bold mb-12'
					style={{
						fontFamily: "Outfit, sans-serif",
						color: "#2C3E50",
					}}
				>
					Nearest Locations
				</h2>

				{/* Map and Locations Grid */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					{/* Map Section - Left */}
					<div className='rounded-2xl overflow-hidden shadow-lg h-[400px] sm:h-[500px]'>
						<MapContainer
							center={[cityData.lat, cityData.lng]}
							zoom={13}
							style={{ width: "100%", height: "100%" }}
						>
							<TileLayer
								url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
								attribution='&copy; OpenStreetMap contributors'
							/>
							<Marker
								position={[cityData.lat, cityData.lng]}
								icon={customMarkerIcon}
							>
								<Popup>
									iSprout Location in{" "}
									{cityName?.charAt(0).toUpperCase() +
										cityName?.slice(1)}
								</Popup>
							</Marker>
						</MapContainer>
					</div>

					{/* Nearby Locations List - Right */}
					<div className='flex flex-col gap-6'>
						{cityData.locations.map((location, index) => (
							<div
								key={index}
								className='flex items-start gap-6 pb-6 border-b border-gray-200 last:border-b-0'
							>
								{/* Icon Section */}
								<div className='shrink-0 mt-2'>
									<div className='flex items-center justify-center w-20 h-20 rounded-full bg-gray-100'>
										<span className='text-4xl'>
											{location.icon}
										</span>
									</div>
								</div>

								{/* Content Section */}
								<div className='grow'>
									<h3
										className='text-xl font-bold mb-2'
										style={{
											fontFamily: "Outfit, sans-serif",
											color: "#2C3E50",
										}}
									>
										{location.name}
									</h3>
									<div className='flex items-center gap-2 text-gray-600'>
										<MdLocationOn
											className='text-red-500 shrink-0'
											size={24}
										/>
										<span
											style={{
												fontFamily:
													"Outfit, sans-serif",
											}}
											className='font-semibold text-gray-700 text-lg'
										>
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
	);
};

export default NearestLocations;
