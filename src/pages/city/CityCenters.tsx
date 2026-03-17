import { useState } from "react";
import Center from "./Centerdata";
import { COLORS } from "../../helpers/constants/Colors";
import { useCityCenters } from "../../hooks/useCityCentre";
// import FutureOfWork from "../home/components/futureofwork";
import YouTubeVideo from "../home/components/youtubevideo";

interface CityCentersProps {
	cityName?: string;
}

interface ApiCenter {
	centerKey: string;
	name: string;
	cityLevelImages?: {
		building?: string;
		lobby?: string;
		workspace?: string;
	};
	address?: string;
	phone?: string;
	email?: string;
	coordinates?: {
		lat?: number;
		lng?: number;
	};
	getDirections?: string;
	description?: string;
	explore?: string;
}

interface ApiCity {
	name: string;
	id?: string;
	centers: ApiCenter[];
}

interface TransformedCenter {
	center: string;
	name: string;
	image: string;
	thumbnails: string[];
	address?: string;
	phone?: string;
	email?: string;
	lat?: number;
	lng?: number;
	mapLink?: string;
	getDirections?: string;
	description?: string;
	explore?: string;
}

const CityCenters = ({ cityName = "hyderabad" }: CityCentersProps) => {
	const [selectedCenterByCity, setSelectedCenterByCity] = useState<
		Record<string, string>
	>({});
	const { data: cityCentersData = [], isLoading } = useCityCenters();

	const cityNameLower = cityName.toLowerCase();
	const selectedCenter = selectedCenterByCity[cityNameLower] || "all";

	// City name mapping for API compatibility
	const cityNameMap: { [key: string]: string } = {
		visakhapatnam: "vizag",
	};

	// Map city name if needed for API lookup
	const actualCityName = cityNameMap[cityNameLower] || cityNameLower;

	// Get city data from API - check both name and id fields
	const cityData = (cityCentersData as ApiCity[]).find(
		(city: ApiCity) =>
			city.name.toLowerCase() === actualCityName ||
			city.id?.toLowerCase() === actualCityName,
	);

	// Transform center data to match the expected format
	const centersList = cityData
		? ["All", ...cityData.centers.map((center: ApiCenter) => center.name)]
		: ["All"];

	// Transform centers to expected format with images from API
	const transformedCenters: TransformedCenter[] = cityData
		? cityData.centers.map((center: ApiCenter) => ({
				center: center.centerKey,
				name: center.name,
				image: center.cityLevelImages?.building || "",
				thumbnails: [
					center.cityLevelImages?.lobby,
					center.cityLevelImages?.workspace,
				].filter((img): img is string => !!img),
				address: center.address,
				phone: center.phone,
				email: center.email,
				lat: center.coordinates?.lat,
				lng: center.coordinates?.lng,
				mapLink: center.getDirections,
				getDirections: center.getDirections,
				description: center.description,
				explore: center.explore,
			}))
		: [];

	const handleCenterClick = (centerName: string) => {
		if (centerName === "All") {
			setSelectedCenterByCity((previousState) => ({
				...previousState,
				[cityNameLower]: "all",
			}));
		} else {
			setSelectedCenterByCity((previousState) => ({
				...previousState,
				[cityNameLower]: centerName.toLowerCase(),
			}));
		}
	};

	// Helper to check if a button is selected
	const isSelected = (center: string) => {
		if (center === "All") return selectedCenter === "all";
		return selectedCenter === center.toLowerCase();
	};

	// Show loading state
	if (isLoading) {
		return (
			<div
				className='py-12 lg:py-20 px-4 lg:px-8'
				style={{ backgroundColor: "white" }}
			>
				<div className='max-w-7xl mx-auto text-center'>
					<p className='text-gray-500'>Loading centers...</p>
				</div>
			</div>
		);
	}

	return (
		<div
			className='py-12 lg:py-20 px-4 lg:px-8'
			style={{ backgroundColor: "white" }}
		>
			<div className='max-w-7xl mx-auto'>
				{/* Filter Buttons */}
				<div className='flex flex-wrap gap-3 lg:gap-4 justify-center mb-12'>
					{centersList.map((center) => (
						<button
							key={center}
							onClick={() => handleCenterClick(center)}
							className={`px-4 lg:px-6 py-2 lg:py-3 rounded-full font-semibold text-sm lg:text-base transition-all duration-300 border-2 ${
								isSelected(center)
									? "text-white border-2 border-transparent"
									: "text-gray-800 border-2 border-gray-800 bg-white hover:bg-gray-100"
							}`}
							style={{
								backgroundColor: isSelected(center)
									? COLORS.brandBlue
									: "white",
								color: isSelected(center) ? "white" : "gray",
								borderColor: isSelected(center)
									? COLORS.brandBlue
									: "#d1d5db",
							}}
						>
							{center}
						</button>
					))}
				</div>
				{/* Centers Display */}
				<div className='flex flex-col items-center gap-8 lg:gap-12'>
					{selectedCenter === "all"
						? transformedCenters.map((item: TransformedCenter, index: number) => (
								<Center
									key={item.center || item.name}
									centerData={item}
									index={index}
								/>
							))
						: transformedCenters
								.filter(
									(item: TransformedCenter) =>
										item.center === selectedCenter ||
										item.name.toLowerCase() ===
											selectedCenter,
								)
								.map((item: TransformedCenter) => (
									<Center
										key={item.center || item.name}
										centerData={item}
										index={transformedCenters.indexOf(item)}
									/>
								))}
				</div>
			</div>
			{/* <FutureOfWork /> */}
			<YouTubeVideo />
		</div>
	);
};
export default CityCenters;
