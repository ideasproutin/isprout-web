import React, { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import { useCityCenters } from "../../hooks/useCityCentre";
import { COLORS } from "../../helpers/constants/Colors";

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

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as unknown as { _getIconUrl: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
	iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
	shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Zoom thresholds
const OFFICE_ZOOM_THRESHOLD = 9; // Above this, show office locations

// City-specific center mapping (only show these centers for specific cities)
const CITY_SPECIFIC_CENTERS: Record<string, string> = {
	"hyderabad": "Divyasree Trinity",
	"chennai": "S M Tower",
	"pune": "Greystone Baner",
	"bengaluru": "NR Enclave",
};

// City coordinates (approximate center of each city)
const CITY_COORDINATES: Record<string, [number, number]> = {
	"Hyderabad": [17.385044, 78.486671],
	"Bengaluru": [12.971599, 77.594566],
	"Chennai": [13.082680, 80.270721],
	"Pune": [18.520430, 73.856743],
	"Vijayawada": [16.506174, 80.648018],
	"Visakhapatnam": [17.686816, 83.218482],
	"Kolkata": [22.572646, 88.363895],
	"Gurugram": [28.457523, 77.026344],
};

// Create custom city capsule marker
const createCityIcon = (cityName: string, isSelected: boolean) => {
	const color = isSelected ? COLORS.brandYellow : "#475569";
	const textColor = isSelected ? COLORS.brandBlueDark : "#ffffff";
	
	return L.divIcon({
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
				<span style="margin-right: 6px; font-size: 14px;">📍</span>
				<span style="line-height: 1;">${cityName}</span>
			</div>
		`,
		iconSize: [150, 32],
		iconAnchor: [75, 32],
	});
};

// Create custom office marker icon
const createOfficeIcon = () => {
	return L.divIcon({
		className: "custom-office-marker",
		html: `
			<div style="
				background-color: ${COLORS.brandYellow};
				width: 32px;
				height: 32px;
				border-radius: 50% 50% 50% 0;
				transform: rotate(-45deg);
				display: flex;
				align-items: center;
				justify-content: center;
				box-shadow: 0 3px 10px rgba(0,0,0,0.3);
				border: 3px solid white;
			">
				<div style="
					transform: rotate(45deg);
					font-size: 16px;
				">🏢</div>
			</div>
		`,
		iconSize: [32, 32],
		iconAnchor: [16, 32],
		popupAnchor: [0, -32],
	});
};

// Map event handler component
const MapEventHandler: React.FC<{
	onZoomChange: (zoom: number) => void;
}> = ({ onZoomChange }) => {
	const map = useMapEvents({
		zoomend: () => {
			onZoomChange(map.getZoom());
		},
	});
	return null;
};

// Component to handle map zoom and center
const MapController: React.FC<{
	center: [number, number] | null;
	zoom: number | null;
}> = ({ center, zoom }) => {
	const map = useMap();

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

// Component to fit bounds on initial load
const InitialBoundsFitter: React.FC<{
	cityCoordinates: [number, number][];
}> = ({ cityCoordinates }) => {
	const map = useMap();

	useEffect(() => {
		if (cityCoordinates.length > 0) {
			const bounds = L.latLngBounds(cityCoordinates);
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
	
	const [currentZoom, setCurrentZoom] = useState<number>(5);
	const [selectedCity, setSelectedCity] = useState<string | null>(initialCity || null);
	const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
	const [targetZoom, setTargetZoom] = useState<number | null>(null);

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

						<MapEventHandler onZoomChange={setCurrentZoom} />
						<MapController center={mapCenter} zoom={targetZoom} />
						<InitialBoundsFitter cityCoordinates={cities.map(c => c.coordinates)} />

					{/* City Capsule Markers (shown at initial zoom until offices appear) */}
					{showCityCapsules &&
							cities.map((city) => (
								<Marker
								key={`city-${city.name}`}
								position={city.coordinates}
								icon={createCityIcon(city.name, selectedCity === city.name)}
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
											<p style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}>
												{city.centersCount} {city.centersCount === 1 ? "Center" : "Centers"} Available
											</p>
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
									icon={createOfficeIcon()}
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
