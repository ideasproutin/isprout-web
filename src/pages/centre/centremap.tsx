import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { useMemo } from "react";
import { COLORS } from "../../helpers/constants/Colors";
import cityData from "../../content/city&CenterObject.json";
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

// Helper function to map icon names from JSON to icon types
const getIconType = (iconName: string): "bus" | "city" | "airport" | "train" | "hotel" | "hospital" | "building" => {
	switch (iconName.toLowerCase()) {
		case "train":
			return "train";
		case "hospital":
			return "hospital";
		case "hotel":
			return "hotel";
		case "plane":
			return "airport";
		case "building":
			return "building";
		default:
			return "building";
	}
};

const getIcon = (
	type: "bus" | "city" | "airport" | "train" | "hotel" | "hospital" | "building",
) => {
	switch (type) {
		case "bus":
			return (
				<img src={busStopSvg} alt='Bus Stop' className='w-16 h-16' />
			);
		case "city":
			return <img src={commercialSvg} alt='City' className='w-16 h-16' />;
		case "airport":
			return <img src={airportSvg} alt='Airport' className='w-16 h-16' />;
		case "train":
			return <img src={metroSvg} alt='Metro/Train' className='w-16 h-16' />;
		case "hotel":
			return <img src={hotelSvg} alt='Hotel' className='w-16 h-16' />;
		case "hospital":
			return <img src={hotelSvg} alt='Hospital' className='w-16 h-16' />;
		case "building":
			return (
				<img src={commercialSvg} alt='Building' className='w-16 h-16' />
			);
		default:
			return (
				<img src={commercialSvg} alt='Location' className='w-16 h-16' />
			);
	}
};

export default function CenterMap({ centerName, centreId }: CenterMapProps) {
	// Find center data from JSON based on centreId
	const centerData = useMemo(() => {
		if (!centreId) return null;
		
		for (const city of cityData) {
			const center = city.centers.find((c) => c.id === centreId);
			if (center) return center;
		}
		return null;
	}, [centreId]);

	if (!centerData || !centerData.nearestCoordinates) {
		return null;
	}

	const locationData = {
		lat: centerData.coordinates.lat,
		lng: centerData.coordinates.lng,
		address: centerData.address,
		nearestLocations: centerData.nearestCoordinates.map(coord => ({
			type: getIconType(coord.icon),
			name: coord.name,
			distance: coord.distance
		}))
	};

	if (!locationData.nearestLocations || locationData.nearestLocations.length === 0) {
		return null;
	}

	return (
		<section
			className='w-full py-12 lg:py-16 px-4 relative'
			style={{ backgroundColor: COLORS.white, zIndex: 1 }}
		>
			<style>{`
				.custom-map-marker {
					mix-blend-mode: multiply;
				}
			`}</style>
			<h2 className='text-3xl lg:text-5xl font-bold text-center mb-8 lg:mb-12'>
				<span style={{ color: COLORS.brandBlueDark }}>
					Map and Micro Market
				</span>
			</h2>
			<div className='max-w-7xl mx-auto'>
				<div className='grid lg:grid-cols-2 gap-8 lg:gap-12'>
					{/* Left Side - Map */}
					<div className='w-full h-[400px] lg:h-[450px]'>
						<div className='w-full h-full rounded-2xl overflow-hidden shadow-lg border-4 border-gray-200 relative z-0'>
							<MapContainer
								center={[locationData.lat, locationData.lng]}
								zoom={14}
								className='w-full h-full z-0'
								scrollWheelZoom={false}
								zoomControl={true}
							>
								<TileLayer
									attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
									url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
								/>
								<Marker
									position={[
										locationData.lat,
										locationData.lng,
									]}
									icon={markerIcon}
								>
									<Popup
										closeButton={true}
										className='z-1000'
									>
										<div
											style={{
												fontFamily:
													"Outfit, sans-serif",
											}}
										>
											<strong>{centerName}</strong>
											<br />
											<span className='text-sm text-gray-600'>
												{locationData.address}
											</span>
										</div>
									</Popup>
								</Marker>
							</MapContainer>
						</div>

						{/* Get Directions Button */}
						<div className='mt-4'>
							<button
								onClick={() =>
									window.open(
										`https://www.google.com/maps/dir/?api=1&destination=${locationData.lat},${locationData.lng}`,
										"_blank",
									)
								}
								className='w-full px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 hover:opacity-90 cursor-pointer'
								style={{
									backgroundColor: COLORS.brandYellow,
									color: COLORS.brandBlueDark,
									fontFamily: "Outfit, sans-serif",
								}}
							>
								Get Directions
							</button>
						</div>
					</div>

					{/* Right Side - Nearest Locations */}
					<div className='flex flex-col h-[400px] lg:h-[450px]'>
						<h2
							className='text-3xl lg:text-4xl font-bold mb-6'
							style={{ color: COLORS.brandBlueDark }}
						>
							
						</h2>
						<div className='flex-1 overflow-y-auto pr-2 space-y-6'>
							{locationData.nearestLocations.map(
								(location, index) => (
									<div
										key={index}
										className='flex items-center gap-6 pb-6 border-b border-gray-200 last:border-b-0'
									>
										<div className='shrink-0'>
											{getIcon(location.type)}
										</div>
										<div className='flex-1'>
											<h3
												className='text-lg font-semibold'
												style={{
													color: COLORS.brandBlueDark,
												}}
											>
												{location.name}
											</h3>
											<div className='flex items-center gap-2 mt-1'>
												<img
													src={mapPinIcon}
													alt='location'
													className='w-4 h-4'
												/>
												<span
													className='text-base font-medium'
													style={{
														color: COLORS.brandBlueDark,
													}}
												>
													{location.distance}
												</span>
											</div>
										</div>
									</div>
								),
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
