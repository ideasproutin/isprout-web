import React from "react";
import { MdLocationOn } from "react-icons/md";
import { COLORS } from "../../helpers/constants/Colors";
import {
	getNearbyLocations,
	type NearbyLocation,
	type CategoryLocations,
} from "../../content/nearbyLocations";

interface NearbyLocationsListProps {
	centerName: string;
}

const CATEGORIES = [
	{
		key: "residential" as keyof CategoryLocations,
		label: "Residential",
		icon: "🏠",
	},
	{ key: "hotels" as keyof CategoryLocations, label: "Hotels", icon: "🏨" },
	{
		key: "commercial" as keyof CategoryLocations,
		label: "Commercial Properties",
		icon: "🏢",
	},
	{
		key: "retail" as keyof CategoryLocations,
		label: "Retail & Malls",
		icon: "🛍️",
	},
	{ key: "metro" as keyof CategoryLocations, label: "Metro", icon: "🚇" },
	{ key: "airport" as keyof CategoryLocations, label: "Airport", icon: "✈️" },
];

const NearbyLocationsList: React.FC<NearbyLocationsListProps> = ({
	centerName,
}) => {
	const nearbyData = getNearbyLocations(centerName);

	return (
		<div className='bg-white rounded-xl overflow-hidden'>
			<div
				className='p-4 font-bold text-xl border-b'
				style={{
					fontFamily: "Outfit, sans-serif",
					color: COLORS.brandBlue,
				}}
			>
				Nearest Locations
			</div>
			<div className='overflow-y-auto h-[440px] lg:h-[540px] p-4'>
				{CATEGORIES.map((category) => {
					const locations = nearbyData[category.key];
					if (!locations || locations.length === 0) return null;

					return (
						<div key={category.key} className='mb-6'>
							<h5
								className='font-semibold text-base mb-3 flex items-center gap-2'
								style={{
									fontFamily: "Outfit, sans-serif",
									color: COLORS.brandBlue,
								}}
							>
								<span className='text-xl'>{category.icon}</span>
								{category.label}
							</h5>
							<div className='space-y-2 ml-8'>
								{locations.map(
									(location: NearbyLocation, idx: number) => (
										<div
											key={idx}
											className='flex items-center justify-between py-2 border-b border-gray-100 hover:bg-gray-50 transition-colors rounded px-2'
										>
											<span
												className='text-sm'
												style={{
													fontFamily:
														"Outfit, sans-serif",
													color: "#333",
												}}
											>
												{location.name}
											</span>
											<div className='flex items-center gap-1'>
												<MdLocationOn
													size={14}
													style={{
														color: COLORS.brandBlue,
													}}
												/>
												<span
													className='text-sm font-medium'
													style={{
														fontFamily:
															"Outfit, sans-serif",
														color: COLORS.brandBlue,
													}}
												>
													{location.distance}
												</span>
											</div>
										</div>
									),
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default NearbyLocationsList;
