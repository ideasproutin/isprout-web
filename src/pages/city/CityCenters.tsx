import { useState } from "react";
import Center from "./Centerdata";
import { COLORS } from "../../helpers/constants/Colors";
import { useCityCenters } from "../../hooks/useCityCentre";
// import FutureOfWork from "../home/components/futureofwork";
import YouTubeVideo from "../home/components/youtubevideo";

interface CityCentersProps {
	cityName?: string;
}

const cityCenters = ({ cityName = "hyderabad" }: CityCentersProps) => {
	const [selectedCenter, setSelectedCenter] = useState("all");
	const { data: cityCentersData } = useCityCenters();

	const cityNameLower = cityName.toLowerCase();

	// Get city data from API
	const cityData = cityCentersData?.find(
		(city: any) => city.name.toLowerCase() === cityNameLower,
	);

	// Transform center data to match the expected format
	const centersList = cityData
		? ["All", ...cityData.centers.map((center: any) => center.name)]
		: ["All"];

	// Transform centers to expected format with images from API
	const transformedCenters = cityData
		? cityData.centers.map((center: any) => ({
				center: center.centerKey,
				name: center.name,
				image: center.cityLevelImages?.building || "",
				thumbnails: [
					center.cityLevelImages?.lobby,
					center.cityLevelImages?.workspace,
				].filter((img) => img),
				address: center.address,
				phone: center.phone,
				email: center.email,
				lat: center.coordinates.lat,
				lng: center.coordinates.lng,
				mapLink: center.getDirections,
				description: center.description,
			}))
		: [];

	const handleCenterClick = (centerName: string) => {
		if (centerName === "All") {
			setSelectedCenter("all");
		} else {
			setSelectedCenter(centerName.toLowerCase());
		}
	};

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
								selectedCenter ===
								(center === "All"
									? "all"
									: center.toLowerCase())
									? "text-white border-2 border-transparent"
									: "text-gray-800 border-2 border-gray-800 bg-white hover:bg-gray-100"
							}`}
							style={{
								backgroundColor:
									selectedCenter ===
									(center === "All"
										? "all"
										: center.toLowerCase())
										? COLORS.brandBlue
										: "white",
								color:
									selectedCenter ===
									(center === "All"
										? "all"
										: center.toLowerCase())
										? "white"
										: "gray",
								borderColor:
									selectedCenter ===
									(center === "All"
										? "all"
										: center.toLowerCase())
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
						? transformedCenters.map((item: any, index: number) => (
								<Center
									key={index}
									centerData={item}
									index={index}
								/>
							))
						: transformedCenters
								.filter(
									(item: any) =>
										item.center === selectedCenter ||
										item.name.toLowerCase() ===
											selectedCenter,
								)
								.map((item: any, index: number) => (
									<Center
										key={index}
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
export default cityCenters;
