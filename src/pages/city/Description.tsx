import { COLORS } from "../../helpers/constants/Colors";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, LatLngBounds } from "leaflet";
import { useEffect, useMemo } from "react";
import locationIconMaps from "../../assets/centers/locationicon_maps.png";
import { useCityCenters } from "../../hooks/useCityCentre";

import localCityData from "../../content/city&CenterObject.json";

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
	const cityNameLower = cityName?.toLowerCase() || "hyderabad";
	const { data: cityCentersData, isLoading, error } = useCityCenters();

	// City name mapping for API compatibility
	const cityNameMap: { [key: string]: string } = {
		"visakhapatnam": "vizag"
	};

	// Use API data if available, otherwise fallback to local JSON
	const apiData = cityCentersData || localCityData;

	console.log("API Status:", {
		isLoading,
		hasError: !!error,
		apiDataCount: cityCentersData?.length || 0,
		localDataCount: localCityData.length,
		usingLocalFallback: !cityCentersData
	});

	// Map city name if needed for API lookup
	const actualCityName = cityNameMap[cityNameLower] || cityNameLower;

	// Get city data from API - check both name and id fields
	const cityData = apiData.find(
		(city: { name: string; id?: string }) => 
			city.name.toLowerCase() === actualCityName || 
			city.id?.toLowerCase() === actualCityName
	);

	console.log("City lookup debug:", {
		cityNameLower,
		actualCityName,
		foundCity: cityData?.name,
		cityId: cityData?.id,
		hasMapCenter: !!cityData?.mapCenter,
		centersCount: cityData?.centers?.length || 0
	});

	// Use mapCenter from API data only
	const cityConfig = cityData?.mapCenter && 
		typeof cityData.mapCenter.lat === 'number' && 
		typeof cityData.mapCenter.lng === 'number'
		? { center: cityData.mapCenter }
		: { center: { lat: 17.4435, lng: 78.3772 } }; // Default fallback

	// Get centers for this city and transform to locations (from API only)
	const cityLocations = useMemo(
		() =>
			cityData?.centers
				?.filter((center: { coordinates?: { lat?: number; lng?: number } }) => 
					typeof center.coordinates?.lat === 'number' && 
					typeof center.coordinates?.lng === 'number'
				)
				.map((center: { name: string; address?: string; coordinates: { lat: number; lng: number } }) => ({
					name: center.name,
					address: center.address || "",
					type: "coworking" as LocationType,
					lat: center.coordinates.lat,
					lng: center.coordinates.lng,
				})) || [],
		[cityData],
	);

	// Sync markerData with cityLocations
	const markerData = cityLocations;

	console.log("Map marker data:", {
		cityLocationsCount: cityLocations.length,
		markerDataCount: markerData.length,
		mapCenter: cityConfig.center,
		markerData: markerData
	});

	const cityInfo = cityData?.description || {
		title: "",
		highlight: "",
		text: "",
	};

	console.log("City Info from API:", cityInfo);
	return (
		<section
			className='relative py-16 lg:py-24 px-4 lg:px-0 overflow-hidden'
			style={{
				backgroundColor: "#FFFFFF",
			}}
		>
			<div className='max-w-7xl mx-auto relative z-10 lg:px-8'>
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
								attributionControl={false}
							>
								<FitBoundsOnMarkers markers={markerData} />
								<TileLayer
								attribution=''
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
								return markerData.map((location: GeocodedLocation, idx: number) => (
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
									fontFamily: "Outfit, sans-serif",
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
								.map(
									(
										part: string,
										index: number,
										array: string[],
									) => (
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
									),
								)}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Description;
