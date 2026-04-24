import React, { useState, useEffect, useMemo } from "react";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import { useCityCenters } from "../../hooks/useCityCentre";
import { COLORS } from "../../helpers/constants/Colors";
import pinIcon from "../../assets/homepage/pin2.svg";

type LeafletModule = typeof import("leaflet");
type ReactLeafletModule = typeof import("react-leaflet");

// Type definitions
interface Center {
	name: string;
	shortAddress?: string;
	address?: string;
	explore?: string;
}

interface CityData {
	name: string;
	cityRedirect?: string;
	centers?: Center[];
}

// Zoom thresholds
const OFFICE_ZOOM_THRESHOLD = 9; // Above this, show office locations

// City-specific center mapping (only show these centers for specific cities)
const CITY_SPECIFIC_CENTERS: Record<string, string> = {
	"hyderabad": "Divyasree Trinity",
	"chennai": "S M Tower",
	"pune": "Greystone Baner",
	"bengaluru": "NR Enclave",
	"vijayawada": "Benz Circle - Amaravathi",
	"vizag": "Lansum Square",
};

// City coordinates (approximate center of each city)
const CITY_COORDINATES: Record<string, [number, number]> = {
	"Hyderabad": [17.385044, 78.486671],
	"Bengaluru": [12.971599, 77.594566],
	"Chennai": [13.082680, 80.270721],
	"Pune": [18.520430, 73.856743],
	"Vijayawada": [16.506174, 80.648018],
	"Vizag": [17.686816, 83.218482],
	"Kolkata": [22.572646, 88.363895],
	"Gurugram": [28.457523, 77.026344],
};

// Create custom city capsule marker
const createCityIcon = (Leaflet: LeafletModule, cityName: string, isSelected: boolean) => {
	const color = isSelected ? COLORS.brandYellow : "#475569";
	const textColor = isSelected ? COLORS.brandBlueDark : "#ffffff";
	
	return Leaflet.divIcon({
		className: "custom-city-marker",
		html: `
			<div style="
				background-color: ${color};
				color: ${textColor};
				padding: 8px 14px;
				border-radius: 20px;
				font-weight: 600;
				font-size: 13px;
				white-space: nowrap;
				box-shadow: 0 2px 8px rgba(0,0,0,0.25);
				font-family: 'Outfit', sans-serif;
				transition: all 0.3s ease;
				cursor: pointer;
				min-width: 80px;
				max-width: 200px;
				text-overflow: ellipsis;
				overflow: hidden;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				height: 32px;
				box-sizing: border-box;
			">
				<svg width="18" height="26" viewBox="0 0 18 26" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 6px; width: 14px; height: 20px;">
					<style type="text/css">{.pin-outer { fill: #FFDE00; } .pin-inner { fill: #30394F; }}</style>
					<path class="pin-outer" d="M9,0C4,0,0,4,0,9c0,0.9,0.1,1.7,0.3,2.5c0.1,0.5,0.3,1,0.5,1.4C2.7,16.3,9,26,9,26 s6.3-9.7,8.1-13.1c0.2-0.4,0.4-0.9,0.5-1.4C17.9,10.7,18,9.9,18,9C18,4,14,0,9,0z"/>
					<g class="pin-inner">
						<path d="M3.8,9.1c0,2.8,2.3,5.2,5.2,5.2c2.7,0,4.9-2.1,5.2-4.7h-0.6c-0.2,2.3-2.2,4.2-4.6,4.2c-2.5,0-4.6-2.1-4.6-4.6 c0-2.4,1.8-4.3,4.1-4.6V4C5.9,4.2,3.8,6.4,3.8,9.1z"/>
						<path d="M8.5,5.6V5.1C6.5,5.3,5,7.1,5,9.1c0,2.2,1.8,4,4,4c2.1,0,3.8-1.6,4-3.6h-0.6c-0.2,1.7-1.7,3-3.5,3 c-1.9,0-3.5-1.6-3.5-3.5C5.5,7.3,6.8,5.9,8.5,5.6z"/>
						<path d="M15.9,9.6C15.6,13.1,12.7,16,9,16c-3.8,0-6.9-3.1-6.9-6.9c0-3.6,2.8-6.6,6.4-6.9V1.7C4.7,1.9,1.6,5.2,1.6,9.1 c0,4.1,3.3,7.4,7.4,7.4c3.9,0,7.1-3.1,7.4-6.9H15.9z"/>
						<path d="M2.7,9.1c0,3.5,2.8,6.3,6.3,6.3c3.3,0,6.1-2.6,6.3-5.9h-0.6c-0.2,3-2.7,5.3-5.7,5.3c-3.2,0-5.7-2.6-5.7-5.7 c0-3,2.3-5.5,5.3-5.7V2.8C5.3,3.1,2.7,5.8,2.7,9.1z"/>
						<path d="M9.5,5.6c1.6,0.2,2.8,1.4,3,3h3.9c-0.2-3.7-3.2-6.7-6.9-6.9V5.6z"/>
						<path d="M10.3,7.1c0.4,0,0.8,0.4,0.8,0.8c0,0.4-0.4,0.8-0.8,0.8c-0.4,0-0.8-0.4-0.8-0.8C9.5,7.4,9.8,7.1,10.3,7.1z"/>
					</g>
				</svg>
				<span style="line-height: 1;">${cityName}</span>
			</div>
		`,
		iconSize: [150, 32],
		iconAnchor: [75, 32],
	});
};

// Create custom office marker icon
const createOfficeIcon = (Leaflet: LeafletModule) => {
	return Leaflet.divIcon({
		className: "custom-office-marker",
		html: `
			<img src="${pinIcon}" alt="Office" style="width: 32px; height: 45px; filter: drop-shadow(0 3px 10px rgba(0,0,0,0.3));" />
		`,
		iconSize: [32, 45],
		iconAnchor: [16, 45],
		popupAnchor: [0, -45],
	});
};

const MapEventHandler: React.FC<{
	reactLeaflet: ReactLeafletModule;
	onZoomChange: (zoom: number) => void;
}> = ({ reactLeaflet, onZoomChange }) => {
	const map = reactLeaflet.useMapEvents({
		zoomend: () => {
			onZoomChange(map.getZoom());
		},
	});

	return null;
};

const MapController: React.FC<{
	reactLeaflet: ReactLeafletModule;
	center: [number, number] | null;
	zoom: number | null;
}> = ({ reactLeaflet, center, zoom }) => {
	const map = reactLeaflet.useMap();

	useEffect(() => {
		if (center && zoom) {
			map.flyTo(center, zoom, {
				duration: 1.5,
				easeLinearity: 0.25,
			});
		}
	}, [center, zoom, map]);

	return null;
};

const InitialBoundsFitter: React.FC<{
	reactLeaflet: ReactLeafletModule;
	leaflet: LeafletModule;
	cityCoordinates: [number, number][];
}> = ({ reactLeaflet, leaflet, cityCoordinates }) => {
	const map = reactLeaflet.useMap();

	useEffect(() => {
		if (cityCoordinates.length > 0) {
			const bounds = leaflet.latLngBounds(cityCoordinates);
			map.fitBounds(bounds, {
				padding: [50, 50],
				maxZoom: 6,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return null;
};

interface InteractiveMapProps {
	initialCity?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ initialCity }) => {
	const navigate = useNavigate();
	const { data: cityCentersData = [] } = useCityCenters();
	const [leafletModule, setLeafletModule] = useState<LeafletModule | null>(null);
	const [reactLeafletModule, setReactLeafletModule] = useState<ReactLeafletModule | null>(null);
	
	const [currentZoom, setCurrentZoom] = useState<number>(5);
	const [selectedCity, setSelectedCity] = useState<string | null>(initialCity || null);
	const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
	const [targetZoom, setTargetZoom] = useState<number | null>(null);

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		let isMounted = true;

		const loadMapModules = async () => {
			const [leaflet, reactLeaflet] = await Promise.all([
				import("leaflet"),
				import("react-leaflet"),
			]);

			delete (leaflet.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
			leaflet.Icon.Default.mergeOptions({
				iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
				iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
				shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
			});

			if (!isMounted) {
				return;
			}

			setLeafletModule(leaflet);
			setReactLeafletModule(reactLeaflet);
		};

		void loadMapModules();

		return () => {
			isMounted = false;
		};
	}, []);

	// Prepare cities data
	const cities = useMemo(() => {
		return Object.keys(CITY_COORDINATES).map(cityName => {
			const cityData = cityCentersData.find(
				(loc: CityData) => loc.name?.toLowerCase() === cityName.toLowerCase()
			);
			return {
				name: cityName,
				coordinates: CITY_COORDINATES[cityName],
				path: cityData ? cityData.cityRedirect : "#",
				centersCount: cityData?.centers?.length || 0,
			};
		});
	}, [cityCentersData]);

	// Prepare offices data
	const offices = useMemo(() => {
		const allOffices: Array<{
			name: string;
			city: string;
			coordinates: [number, number];
			address: string;
			path: string;
		}> = [];

		cityCentersData.forEach((cityData: CityData) => {
			const cityName = cityData.name;
			const cityKey = cityName?.toLowerCase() || "";
			const specificCenter = CITY_SPECIFIC_CENTERS[cityKey];
			
			// Filter centers based on city-specific mapping
			const centersToShow = specificCenter
				? cityData.centers?.filter((center: Center) => center.name === specificCenter)
				: cityData.centers;

			if (centersToShow) {
				centersToShow.forEach((center: Center, index: number) => {
					// Get base coordinates for the city
					const baseCoords = CITY_COORDINATES[cityName];
					if (baseCoords) {
						// Add slight offset to each office to prevent overlapping
						const offset = index * 0.01;
						allOffices.push({
							name: center.name,
							city: cityName,
							coordinates: [baseCoords[0] + offset, baseCoords[1] + offset],
							address: center.shortAddress || center.address || "Address not available",
							path: center.explore || "#",
						});
					}
				});
			}
		});

		return allOffices;
	}, [cityCentersData]);

	// Handle city marker click
	const handleCityClick = (cityName: string) => {
		const coords = CITY_COORDINATES[cityName];
		if (coords) {
			setSelectedCity(cityName);
			setMapCenter(coords);
			setTargetZoom(11);
		}
	};

	// Handle office marker click (navigate to virtual office form)
	const handleOfficeClick = () => {
		navigate("/virtual-office/");
		window.scrollTo(0, 0);
	};

	// Handle reset to initial view
	const handleResetView = () => {
		setSelectedCity(null);
		setMapCenter([20.5937, 78.9629]); // Center of India
		setTargetZoom(5); // Reset to initial zoom
	};

	// Determine what to show based on zoom level (two-tier system)
	const showCityCapsules = currentZoom < OFFICE_ZOOM_THRESHOLD;
	const showOffices = currentZoom >= OFFICE_ZOOM_THRESHOLD;
	const isMapReady = leafletModule && reactLeafletModule;

	if (!isMapReady) {
		return (
			<section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-white relative z-0">
				<div className="max-w-7xl mx-auto relative z-0">
					<h2
						className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center"
						style={{
							color: COLORS.brandBlueDark,
							fontFamily: "Outfit, sans-serif",
						}}
					>
						Interactive Map
					</h2>
					<div className="relative z-0 w-full h-[500px] sm:h-[600px] rounded-xl overflow-hidden shadow-2xl border-4 border-gray-100 flex items-center justify-center bg-slate-50">
						<p
							style={{
								color: COLORS.brandBlueDark,
								fontFamily: "Outfit, sans-serif",
								fontSize: "16px",
								fontWeight: 600,
							}}
						>
							Loading map...
						</p>
					</div>
				</div>
			</section>
		);
	}

	const loadedLeafletModule = leafletModule;
	const loadedReactLeafletModule = reactLeafletModule;
	const { MapContainer, TileLayer, Marker, Popup } = loadedReactLeafletModule;

	return (
			<section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-white relative z-0">
				<div className="max-w-7xl mx-auto relative z-0">
				<h2
					className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center"
					style={{
						color: COLORS.brandBlueDark,
						fontFamily: "Outfit, sans-serif",
					}}
				>
					Interactive Map 
				</h2>

					<div className="relative z-0 w-full h-[500px] sm:h-[600px] rounded-xl overflow-hidden shadow-2xl border-4 border-gray-100">
					<MapContainer
						center={[20.5937, 78.9629]} // Center of India
						zoom={5}
						style={{ height: "100%", width: "100%" }}
						zoomControl={true}
						scrollWheelZoom={true}
					>
						<TileLayer
							// attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a>'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>

						<MapEventHandler reactLeaflet={loadedReactLeafletModule} onZoomChange={setCurrentZoom} />
						<MapController reactLeaflet={loadedReactLeafletModule} center={mapCenter} zoom={targetZoom} />
						<InitialBoundsFitter reactLeaflet={loadedReactLeafletModule} leaflet={loadedLeafletModule} cityCoordinates={cities.map(c => c.coordinates)} />

					{/* City Capsule Markers (shown at initial zoom until offices appear) */}
					{showCityCapsules &&
							cities.map((city) => (
								<Marker
								key={`city-${city.name}`}
								position={city.coordinates}
								icon={createCityIcon(loadedLeafletModule, city.name, selectedCity === city.name)}
									eventHandlers={{
										click: () => handleCityClick(city.name),
									}}
								>
									<Popup>
										<div style={{ fontFamily: "Outfit, sans-serif" }}>
											<h3
												style={{
													fontWeight: "700",
													fontSize: "16px",
													color: COLORS.brandBlueDark,
													marginBottom: "8px",
												}}
											>
												{city.name}
											</h3>
											<button
												onClick={() => handleCityClick(city.name)}
												style={{
													backgroundColor: COLORS.brandYellow,
													color: COLORS.brandBlueDark,
													padding: "6px 12px",
													borderRadius: "6px",
													border: "none",
													fontWeight: "600",
													cursor: "pointer",
													fontSize: "13px",
												}}
											>
												Zoom In →
											</button>
										</div>
									</Popup>
								</Marker>
							))}

						{/* Office Markers (shown at high zoom) */}
						{showOffices &&
							offices.map((office, index) => (
								<Marker
									key={`office-${index}`}
									position={office.coordinates}
									icon={createOfficeIcon(loadedLeafletModule)}
									eventHandlers={{
										click: () => {},
									}}
								>
									<Popup>
										<div style={{ fontFamily: "Outfit, sans-serif", minWidth: "200px" }}>
											<h3
												style={{
													fontWeight: "700",
													fontSize: "16px",
													color: COLORS.brandBlueDark,
													marginBottom: "4px",
												}}
											>
												{office.name}
											</h3>
											<p style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>
												{office.city}
											</p>
											<p
												style={{
													fontSize: "13px",
													color: "#666",
													marginBottom: "12px",
													display: "flex",
													gap: "4px",
													alignItems: "start",
												}}
											>
												<span>📍</span>
												<span>{office.address}</span>
											</p>
											<button
												onClick={handleOfficeClick}
												style={{
													backgroundColor: COLORS.brandYellow,
													color: COLORS.brandBlueDark,
													padding: "8px 16px",
													borderRadius: "6px",
													border: "none",
													fontWeight: "600",
													cursor: "pointer",
													fontSize: "13px",
													width: "100%",
												}}
											>
												Book Virtual Office →
											</button>
										</div>
									</Popup>
								</Marker>
							))}
					</MapContainer>

					{/* Reset/Zoom Out Button */}
					<button
						onClick={handleResetView}
						style={{
							position: "absolute",
							top: "10px",
							right: "10px",
						backgroundColor: "white",
						color: COLORS.brandBlueDark,
						padding: "10px 14px",
						borderRadius: "8px",
						border: `2px solid ${COLORS.brandBlueDark}`,
						boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
						zIndex: 1000,
						fontFamily: "Outfit, sans-serif",
						fontSize: "14px",
						fontWeight: "600",
						cursor: "pointer",
					}}
					title="Reset to show all cities"
				>
					Reset
				</button>

				{/* Zoom level indicator */}
				<div
					style={{
						position: "absolute",
						bottom: "20px",
						left: "20px",
						backgroundColor: "white",
						padding: "8px 16px",
						borderRadius: "8px",
						boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
						zIndex: 10,
						fontFamily: "Outfit, sans-serif",
						fontSize: "12px",
						color: COLORS.brandBlueDark,
					}}
				>
					{showCityCapsules && "📍 City View"}
					{showOffices && "🏢 Office View"}
					{" "} (Zoom: {currentZoom.toFixed(1)})
				</div>
			</div>

			{/* Instructions */}
			<div
				className="mt-6 text-center text-sm sm:text-base"
				style={{
					color: "#666",
					fontFamily: "Outfit, sans-serif",
				}}
			>
				<p>
					<strong>Tip:</strong> Zoom in or click on a city to see office locations • Scroll or use zoom controls
				</p>
			</div>
		</div>
	</section>
	);
};

export default InteractiveMap;
