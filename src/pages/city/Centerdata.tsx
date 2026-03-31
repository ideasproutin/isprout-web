import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../helpers/constants/Colors";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
// Removed unused react-leaflet and leaflet imports (map block is commented-out)

interface CenterDataProps {
	centerData: {
		center: string;
		name: string;
		image?: string;
		thumbnails?: string[];
		address?: string;
		phone?: string;
		email?: string;
		lat?: number;
		lng?: number;
		mapLink?: string;
		getDirections?: string;
		description?: string;
		explore?: string;
	};
	index?: number;
}

const Center: React.FC<CenterDataProps> = ({ centerData, index = 0 }) => {
	console.log(centerData);
	const navigate = useNavigate();
	const [currentImage, setCurrentImage] = useState(centerData.image || "");

	// Reset to first image when a different center is selected
	useEffect(() => {
		setCurrentImage(centerData.image || "");
	}, [centerData.name, centerData.image]);

	// Auto-rotate images every 5 seconds
	useEffect(() => {
		if (!centerData.thumbnails || centerData.thumbnails.length === 0) {
			return;
		}

		let idx = 0;
		const allImages = [
			centerData.image || "",
			...(centerData.thumbnails || []),
		];
		const interval = setInterval(() => {
			idx = (idx + 1) % allImages.length;
			setCurrentImage(allImages[idx]);
		}, 5000);

		return () => clearInterval(interval);
	}, [centerData.image, centerData.thumbnails]);

	// const getCenterSlug = (centerName: string): string => {
	// 	const slugMap: Record<string, string> = {
	// 		// Hyderabad
	// 		"one golden mile": "one-golden-mile",
	// 		orbit: "orbit",
	// 		"my home twitza": "my-home-twitza",
	// 		"jayabheri trendset connect": "jayabheri-trendset",
	// 		"sohini tech park": "sohini-tech-park",
	// 		"divyasree trinity": "divyasree-trinity",
	// 		"purva summit": "purva-summit",
	// 		"sreshta marvel": "sreshta-marvel",
	// 		"modern profound": "modern-profound",
	// 		"pranava one": "pranava-one",
	// 		// Bengaluru
	// 		"nr enclave": "nr-enclave",
	// 		"prestige saleh ahmed": "prestige-saleh-ahmed",
	// 		"shilpitha tech park": "shilpitha-tech-park",
	// 		// Chennai
	// 		"kochar jade": "kochar-jade",
	// 		"saravana matrix tower": "saravana-matrix",
	// 		"sigapi achi": "sigapi-achi",
	// 		// Pune
	// 		"greystone baner": "grey-stone",
	// 		"panchshil techpark": "panchshil-techpark",
	// 		"panchshil techpark one": "panchshil-techpark-one",
	// 		// Vijayawada
	// 		"benz circle - amaravathi": "benz-circle",
	// 		"medha towers": "medha-towers",
	// 		// Kolkata
	// 		"godrej waterside": "godrej-waterside",
	// 		// Ahmedabad
	// 		aurelien: "aurelien",
	// 		// Gurugram
	// 		"hq27 the headquarters": "hq27",
	// 		// Visakhapatnam
	// 		"lansum square": "lansum-square",
	// 	};
	// 	const normalized = centerName.toLowerCase();
	// 	return slugMap[normalized] || normalized.replace(/\s+/g, "-");
	// };

	const handleExploreMore = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		setTimeout(() => {
			navigate(`${centerData.explore}/`);
		}, 100);
	};

	return (
		<div className='w-full'>
			{/* Card */}
			<div className='relative w-full min-h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl'>
				{/* Blue Background */}
				<div
					className='absolute inset-0 z-0'
					style={{
						backgroundColor: "#eaf4fb",
					}}
				></div>

				{/* Content Container */}
				<div className='relative z-10 h-full flex flex-col lg:flex-row'>
					{/* Left Side - Info */}
					<div className='w-full lg:w-[35%] p-6 lg:p-8 flex flex-col justify-start'>
						<div>
							{/* Number */}
							<h3
								className='text-5xl lg:text-6xl font-bold mb-4'
								style={{
									fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
									color: COLORS.brandBlue,
								}}
							>
								{String(index + 1).padStart(2, "0")}
							</h3>

							{/* Title */}
							<h4
								className='text-xl lg:text-2xl font-bold mb-4'
								style={{
									fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
								}}
							>
								{centerData.name}
							</h4>

							{/* Address */}
							{centerData.address && (
								<div className='flex items-start gap-2 mb-3'>
									<MdLocationOn
										className='shrink-0 mt-1'
										size={18}
										style={{ color: COLORS.brandBlue }}
									/>
									<p
										className='text-xs lg:text-sm'
										style={{
											fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
											color: COLORS.brandBlue,
										}}
									>
										{centerData.address}
									</p>
								</div>
							)}

							{/* Phone */}
							{centerData.phone && (
								<div className='flex items-center gap-2 mb-2'>
									<MdPhone
										size={16}
										style={{ color: COLORS.brandBlue }}
									/>
									<a
										href={`tel:${centerData.phone}`}
										className='text-xs lg:text-sm font-medium hover:underline'
										style={{
											fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
											color: COLORS.brandBlue,
										}}
									>
										{centerData.phone}
									</a>
								</div>
							)}

							{/* Email */}
							{centerData.email && (
								<div className='flex items-center gap-2 mb-4'>
									<MdEmail
										size={16}
										style={{ color: COLORS.brandBlue }}
									/>
									<a
										href={`mailto:${centerData.email}`}
										className='text-xs lg:text-sm font-medium hover:underline'
										style={{
											fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
											color: COLORS.brandBlue,
										}}
									>
										{centerData.email}
									</a>
								</div>
							)}
						</div>
						{/* Action Buttons */}
						<div className='flex flex-col sm:flex-row gap-4 mt-6 justify-center items-center'>
							<button
								onClick={handleExploreMore}
								className='w-full sm:w-auto px-7 py-3 rounded-lg font-semibold text-base transition-all duration-300 hover:opacity-90 cursor-pointer'
								style={{
									backgroundColor: COLORS.brandBlue,
									color: "white",
									fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
								}}
							>
								Explore More
							</button>
							<button
								onClick={() =>
									window.open(
										centerData.mapLink ||
											centerData.getDirections ||
											`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(centerData.address || centerData.name)}`,
										"_blank",
									)
								}
								className='w-full sm:w-auto px-7 py-3 rounded-lg font-semibold text-base transition-all duration-300 hover:opacity-90 cursor-pointer'
								style={{
									backgroundColor: COLORS.brandBlue,
									color: "white",
									fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
								}}
							>
								Get Directions
							</button>
						</div>
					</div>
					{/* Right Side - Image */}
					<div className='w-full lg:w-[65%] h-[300px] lg:h-full relative'>
						{centerData.image ? (
							<>
								<img
									src={currentImage}
									alt={centerData.name}
									className='w-full h-full object-cover transition-all duration-300'
								/>
								{/* Thumbnail Images at Bottom Left */}
								{centerData.thumbnails &&
									centerData.thumbnails.length > 0 && (
										<div className='absolute bottom-4 left-4 flex gap-2 lg:gap-3'>
											{/* Main image thumbnail */}
											<div
												onClick={() => {
													setCurrentImage(
														centerData.image || "",
													);
												}}
												className={`w-16 h-16 lg:w-24 lg:h-24 rounded-lg overflow-hidden shadow-lg border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
													currentImage ===
													centerData.image
														? "border-blue-500 ring-2 ring-blue-500"
														: "border-white"
												}`}
											>
												<img
													src={centerData.image}
													alt={`${centerData.name} main view`}
													className='w-full h-full object-cover'
												/>
											</div>
											{/* Additional thumbnails */}
											{centerData.thumbnails.map(
												(
													thumbnail: string,
													idx: number,
												) => (
													<div
														key={idx}
														onClick={() => {
															setCurrentImage(
																thumbnail,
															);
														}}
														className={`w-16 h-16 lg:w-24 lg:h-24 rounded-lg overflow-hidden shadow-lg border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
															currentImage ===
															thumbnail
																? "border-blue-500 ring-2 ring-blue-500"
																: "border-white"
														}`}
													>
														<img
															src={thumbnail}
															alt={`${centerData.name} view ${idx + 1}`}
															className='w-full h-full object-cover'
														/>
													</div>
												),
											)}
										</div>
									)}
							</>
						) : (
							<div
								className='w-full h-full flex items-center justify-center'
								style={{ backgroundColor: "#f3f4f6" }}
							>
								<p className='text-gray-400'>No Image</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Center;
