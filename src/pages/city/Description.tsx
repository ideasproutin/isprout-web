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
// Guarded: Leaflet accesses `window` internally — skip during SSR
const createCustomIcon = (size: "small" | "medium" | "large" = "medium") => {
	if (typeof window === "undefined") return null as unknown as Icon;
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

const markerIcons =
	typeof window !== "undefined"
		? {
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
			}
		: (null as any);

type LocationType = "coworking" | "cafe" | "metro" | "mall" | "default";

type CenterLocation = {
	name: string;
	address: string;
	type: LocationType;
	lat: number;
	lng: number;
	image?: string;
	getDirections?: string;
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
	const { data: cityCentersData, isLoading } = useCityCenters();

	// City name mapping for API compatibility
	const cityNameMap: { [key: string]: string } = {
		visakhapatnam: "vizag",
	};

	// Use API data if available, otherwise fallback to local JSON
	const apiData = cityCentersData || localCityData;

	// Map city name if needed for API lookup
	const actualCityName = cityNameMap[cityNameLower] || cityNameLower;

	// Get city data from API - check both name and id fields
	const cityData = apiData.find(
		(city: { name: string; id?: string }) =>
			city.name.toLowerCase() === actualCityName ||
			city.id?.toLowerCase() === actualCityName,
	);

	// Use mapCenter from API data with validation
	const defaultCenter = { lat: 17.4435, lng: 78.3772 }; // Hyderabad default
	const cityConfig =
		cityData?.mapCenter &&
		typeof cityData.mapCenter.lat === "number" &&
		typeof cityData.mapCenter.lng === "number"
			? { center: cityData.mapCenter }
			: { center: defaultCenter };

	// Get centers for this city and transform to locations (from API only)
	const cityLocations = useMemo(
		() =>
			cityData?.centers
				?.filter(
					(center: any) =>
						center.coordinates &&
						typeof center.coordinates.lat === "number" &&
						typeof center.coordinates.lng === "number",
				)
				.map(
					(center: {
						name: string;
						address?: string;
						coordinates: { lat: number; lng: number };
						cityLevelImages?: { lobby?: string };
						getDirections?: string;
					}) => ({
						name: center.name,
						address: center.address || "",
						type: "coworking" as LocationType,
						lat: center.coordinates.lat,
						lng: center.coordinates.lng,
						image: center.cityLevelImages?.lobby || "",
						getDirections: center.getDirections || "",
					}),
				) || [],
		[cityData],
	);

	// Sync markerData with cityLocations
	const markerData = cityLocations;

	const cityInfo = cityData?.description || {
		title: "",
		highlight: "",
		text: "",
	};

	// Show loading state
	if (isLoading) {
		return (
			<section
				className='relative py-16 lg:py-24 px-4 lg:px-0'
				style={{ backgroundColor: "#FFFFFF" }}
			>
				<div className='max-w-7xl mx-auto text-center'>
					<p
						className='text-lg'
						style={{
							fontFamily:
								"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
							color: COLORS.brandBlue,
						}}
					>
						Loading city information...
					</p>
				</div>
			</section>
		);
	}

	// Show error or no data state
	if (!cityData) {
		console.warn(
			`No city data found for: ${cityNameLower} / ${actualCityName}`,
		);
		return (
			<section
				className='relative py-16 lg:py-24 px-4 lg:px-0'
				style={{ backgroundColor: "#FFFFFF" }}
			>
				<div className='max-w-7xl mx-auto text-center'>
					<p
						className='text-lg'
						style={{
							fontFamily:
								"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
							color: COLORS.brandBlue,
						}}
					>
						City information not available.
					</p>
				</div>
			</section>
		);
	}

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
								scrollWheelZoom={true}
								zoomControl={true}
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
									return markerData.map(
										(
											location: GeocodedLocation,
											idx: number,
										) => (
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
													markerIcons[iconSize]
														.default
												}
											>
												<Popup maxWidth={250}>
													<div
														style={{
															fontFamily:
																"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
															minWidth: "200px",
														}}
													>
														{location.image && (
															<img
																src={
																	location.image
																}
																alt={
																	location.name
																}
																style={{
																	width: "100%",
																	height: "120px",
																	objectFit:
																		"cover",
																	borderRadius:
																		"8px",
																	marginBottom:
																		"8px",
																}}
															/>
														)}
														<strong
															style={{
																fontSize:
																	"14px",
																display:
																	"block",
																marginBottom:
																	"4px",
															}}
														>
															{location.name}
														</strong>
														{location.address && (
															<span
																style={{
																	fontSize:
																		"12px",
																	color: "#666",
																	display:
																		"block",
																	marginBottom:
																		"8px",
																}}
															>
																{
																	location.address
																}
															</span>
														)}
														{location.getDirections && (
															<a
																href={
																	location.getDirections
																}
																target='_blank'
																rel='noopener noreferrer'
																style={{
																	display:
																		"inline-block",
																	padding:
																		"6px 12px",
																	backgroundColor:
																		COLORS.brandYellow,
																	color: COLORS.brandBlue,
																	textDecoration:
																		"none",
																	borderRadius:
																		"6px",
																	fontSize:
																		"12px",
																	fontWeight:
																		"600",
																	marginTop:
																		"4px",
																}}
															>
																Get Directions →
															</a>
														)}
													</div>
												</Popup>
											</Marker>
										),
									);
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
								fontFamily:
									"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
							}}
						>
							{cityInfo.title}{" "}
							<span
								style={{
									color: COLORS.brandYellow,
									fontFamily:
										"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
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
								fontFamily:
									"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
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
