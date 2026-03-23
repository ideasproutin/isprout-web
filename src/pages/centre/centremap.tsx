import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { useMemo } from "react";
import { COLORS } from "../../helpers/constants/Colors";
import { useCityCenters } from "../../hooks/useCityCentre";
import locationIconMaps from "../../assets/centers/locationicon_maps.png";
import mapPinIcon from "../../assets/homepage/pin_icon.svg";
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

// Helper function to get icon from API
const getIconFromApi = (iconUrl: string) => {
	return <img src={iconUrl} alt='Location icon' className='w-16 h-16' />;
};

export default function CenterMap({ centerName, centreId }: CenterMapProps) {
	const { data: cityCentersData, isLoading } = useCityCenters();

	// Find center data from API based on centreId
	const centerData = useMemo(() => {
		if (!centreId || !cityCentersData) return null;

		for (const city of cityCentersData) {
			const center = city.centers.find((c: { id: string }) => c.id === centreId);
			if (center) return center;
		}
		return null;
	}, [centreId, cityCentersData]);

	// Show nothing while loading or if no data
	if (
		isLoading || 
		!centerData || 
		!centerData.nearestCoordinates ||
		!centerData.coordinates ||
		typeof centerData.coordinates.lat !== 'number' ||
		typeof centerData.coordinates.lng !== 'number'
	) {
		return null;
	}

	// Define the type for nearestCoordinates if not already defined
	type NearestCoordinate = {
		icon: string;
		name: string;
		distance: string;
	};

	const locationData = {
		lat: centerData.coordinates.lat,
		lng: centerData.coordinates.lng,
		address: centerData.address,
		nearestLocations: centerData.nearestCoordinates.map(
			(coord: NearestCoordinate) => ({
				icon: coord.icon,
				name: coord.name,
				distance: coord.distance,
			}),
		),
	};

	if (
		!locationData.nearestLocations ||
		locationData.nearestLocations.length === 0
	) {
		return null;
	}

	return (
		<section
			className='w-full py-12 lg:py-16 px-4 pb-16 lg:pb-20 relative bg-gray-50'
			style={{ zIndex: 1 }}
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
					<div className='w-full pb-6 lg:pb-0'>
						<div className='w-full h-[320px] sm:h-[380px] lg:h-[450px] rounded-2xl overflow-hidden shadow-lg border-4 border-gray-200 relative z-0'>
							<MapContainer
								center={[locationData.lat, locationData.lng]}
								zoom={14}
								className='w-full h-full z-0'
								scrollWheelZoom={false}
								zoomControl={true}
								attributionControl={false}
							>
								<TileLayer
									attribution=''
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
						<div className='mt-4 mb-2 flex justify-center'>
							<button
								onClick={() =>
									window.open(
										centerData.getDirections,
										"_blank",
									)
								}
								className='px-8 py-3 rounded-lg font-semibold text-base transition-all duration-300 hover:opacity-90 cursor-pointer'
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
					<div className='flex flex-col h-[400px] lg:h-[450px] pt-1 lg:pt-0'>
						<h2
							className='text-3xl lg:text-4xl font-bold mb-6'
							style={{ color: COLORS.brandBlueDark }}
						></h2>
						<div className='flex-1 overflow-y-auto pr-2 space-y-6'>
							{locationData.nearestLocations.map(
								(
									location: {
										icon: string;
										name: string;
										distance: string;
									},
									index: number,
								) => (
									<div
										key={index}
										className='flex items-center gap-6 pb-6 border-b border-gray-200 last:border-b-0'
									>
										<div className='shrink-0'>
											{getIconFromApi(location.icon)}
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
