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
	const navigate = useNavigate();
	const [currentImage, setCurrentImage] = useState(centerData.image || "");

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

	const getCenterSlug = (centerName: string): string => {
		const slugMap: Record<string, string> = {
			// Hyderabad
			"one golden mile": "one-golden-mile",
			orbit: "orbit",
			"my home twitza": "my-home-twitza",
			"jayabheri trendset connect": "jayabheri-trendset",
			"sohini tech park": "sohini-tech-park",
			"divyasree trinity": "divyasree-trinity",
			"purva summit": "purva-summit",
			"sreshta marvel": "sreshta-marvel",
			"modern profound": "modern-profound",
			"pranava one": "pranava-one",
			// Bengaluru
			"nr enclave": "nr-enclave",
			"prestige saleh ahmed": "prestige-saleh-ahmed",
			"shilpitha tech park": "shilpitha-tech-park",
			// Chennai
			"kochar jade": "kochar-jade",
			"saravana matrix tower": "saravana-matrix",
			"sigapi achi": "sigapi-achi",
			// Pune
			"greystone baner": "grey-stone",
			"panchshil techpark": "panchshil-techpark",
			"panchshil techpark one": "panchshil-techpark-one",
			// Vijayawada
			"benz circle - amaravathi": "benz-circle",
			"medha towers": "medha-towers",
			// Kolkata
			"godrej waterside": "godrej-waterside",
			// Ahmedabad
			aurelien: "aurelien",
			// Gurugram
			"hq27 the headquarters": "hq27",
			// Visakhapatnam
			"lansum square": "lansum-square",
		};
		const normalized = centerName.toLowerCase();
		return slugMap[normalized] || normalized.replace(/\s+/g, "-");
	};

	const handleExploreMore = () => {
		// Use explore path from API, fallback to slug generation
		const explorePath =
			centerData.explore || `/office/${getCenterSlug(centerData.name)}`;
		window.scrollTo({ top: 0, behavior: "smooth" });
		setTimeout(() => {
			navigate(explorePath);
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
									fontFamily: "Outfit, sans-serif",
									color: COLORS.brandBlue,
								}}
							>
								{String(index + 1).padStart(2, "0")}
							</h3>

							{/* Title */}
							<h4
								className='text-xl lg:text-2xl font-bold mb-4'
								style={{
									fontFamily: "Outfit, sans-serif",
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
											fontFamily: "Outfit, sans-serif",
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
											fontFamily: "Outfit, sans-serif",
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
											fontFamily: "Outfit, sans-serif",
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
								className='w-full sm:w-auto px-20 py-6 rounded-lg font-bold text-xl transition-all duration-300 hover:opacity-90 cursor-pointer'
								style={{
									backgroundColor: COLORS.brandBlue,
									color: "white",
									fontFamily: "Outfit, sans-serif",
								}}
							>
								Explore More
							</button>
							<button
								onClick={() =>
									window.open(
										centerData.getDirections ||
											`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(centerData.address || centerData.name)}`,
										"_blank",
									)
								}
								className='w-full sm:w-auto px-20 py-6 rounded-lg font-bold text-xl transition-all duration-300 hover:opacity-90 cursor-pointer'
								style={{
									backgroundColor: COLORS.brandBlue,
									color: "white",
									fontFamily: "Outfit, sans-serif",
								}}
							>
								Get Direction
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

			{/* Tabs and Content Section */}
			{/* <div className='mt-8 bg-white rounded-2xl shadow-lg p-6 lg:p-8'> */}
			{/* Tab Buttons */}
			{/* <div className='flex gap-1 border-b-2 border-gray-200 mb-6'>
					<button
						onClick={() => setActiveTab("about")}
						className={`px-6 py-3 font-semibold text-base transition-all relative ${
							activeTab === "about"
								? "text-gray-900"
								: "text-gray-500"
						}`}
						style={{ fontFamily: "Outfit, sans-serif" }}
					>
						About
						{activeTab === "about" && (
							<div
								className='absolute bottom-0 left-0 right-0 h-1 rounded-t-full'
								style={{ backgroundColor: COLORS.brandYellow }}
							/>
						)}
					</button>
					<button
						onClick={() => setActiveTab("amenities")}
						className={`px-6 py-3 font-semibold text-base transition-all relative ${
							activeTab === "amenities"
								? "text-gray-900"
								: "text-gray-500"
						}`}
						style={{ fontFamily: "Outfit, sans-serif" }}
					>
						Amenities
						{activeTab === "amenities" && (
							<div
								className='absolute bottom-0 left-0 right-0 h-1 rounded-t-full'
								style={{ backgroundColor: COLORS.brandYellow }}
							/>
						)}
					</button>
					<button
						onClick={() => setActiveTab("location")}
						className={`px-6 py-3 font-semibold text-base transition-all relative ${
							activeTab === "location"
								? "text-gray-900"
								: "text-gray-500"
						}`}
						style={{ fontFamily: "Outfit, sans-serif" }}
					>
						Location
						{activeTab === "location" && (
							<div
								className='absolute bottom-0 left-0 right-0 h-1 rounded-t-full'
								style={{ backgroundColor: COLORS.brandYellow }}
							/>
						)}
					</button>
				</div> */}

			{/* Tab Content */}
			{/* <div className='min-h-[200px]'>
					{activeTab === "about" && (
						<div className='animate-fadeIn'>
							<div
								className='relative rounded-2xl p-6 lg:p-8'
								style={{ backgroundColor: "#00275c29" }}
							>
								<p
									className='text-base lg:text-lg leading-relaxed mb-6'
									style={{
										fontFamily: "Outfit, sans-serif",
										color: "#000000",
									}}
								>
									Welcome to {centerData.name}, Spanning
									36,000 sq. ft., in Hyderabad offers a
									dynamic workspace tailored for innovation
									and growth.
									<br />
									<br />
									From collaborative zones that spark ideas to
									private offices for focused work, every
									corner is designed to enhance productivity.
									Equipped with meeting rooms, cozy lounge
									areas, and a vibrant professional community,
									this space is perfect for businesses of all
									sizes. Whether you're a startup or an
									established company, {centerData.name}{" "}
									provides more than just a workspace - it's a
									platform for success. Experience
									convenience, creativity, and collaboration
									like never before at iSprout's premium
									coworking destination.
								</p>
								<div className='flex items-center justify-between'>
								<div className='flex gap-3'>
									<button
										onClick={handleExploreMore}
									className='px-7 py-3.5 rounded-lg font-semibold text-base transition-all duration-300 hover:opacity-90 cursor-pointer'
										style={{
											backgroundColor: COLORS.brandBlue,
											color: "white",
											fontFamily: "Outfit, sans-serif",
										}}
									>
										Explore More
									</button>
									<button
										onClick={() =>
											window.open(
												centerData.getDirections || 
												`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(centerData.address || centerData.name)}`,
												"_blank",
											)
										}
									className='px-7 py-3.5 rounded-lg font-semibold text-base transition-all duration-300 hover:opacity-90 cursor-pointer'
										style={{
											backgroundColor: COLORS.brandBlue,
											color: "white",
											fontFamily: "Outfit, sans-serif",
										}}
									>
										Get Direction
									</button>
								</div>
									<div className='flex items-center'>
										<svg
											width='60'
											height='30'
											viewBox='0 0 60 30'
											fill='none'
										>
											<path
												d='M35 5L45 15L35 25'
												stroke={COLORS.brandBlue}
												strokeWidth='3'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
											<path
												d='M45 5L55 15L45 25'
												stroke={COLORS.brandBlue}
												strokeWidth='3'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
										</svg>
									</div>
								</div>
							</div>
						</div>
					)}

					{activeTab === "amenities" && (
						<div className='animate-fadeIn -mx-6 lg:-mx-8'>
							<AmenitiesSection />
						</div>
					)}

					{activeTab === "location" && (
						<div className='animate-fadeIn'>
							<div className='bg-gray-100 rounded-xl p-6 mb-6'>
								<div className='flex items-start gap-3'>
									<MdLocationOn
										size={24}
										style={{ color: COLORS.brandBlue }}
									/>
									<div>
										<h4
											className='font-bold text-lg mb-2'
											style={{
												fontFamily:
													"Outfit, sans-serif",
												color: COLORS.brandBlue,
											}}
										>
											Address
										</h4>
										<p
											className='text-base'
											style={{
												fontFamily:
													"Outfit, sans-serif",
												color: COLORS.brandBlue,
											}}
										>
											{centerData.address}
										</p>
									</div>
								</div>
							</div>
							{centerData.lat && centerData.lng ? (
								<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
									<div className='h-[500px] lg:h-[600px]'>
										<MapContainer
											center={[
												centerData.lat,
												centerData.lng,
											]}
											zoom={16}
											style={{
												height: "100%",
												borderRadius: "12px",
												overflow: "hidden",
											}}
										>
											<TileLayer
												url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
												attribution='&copy; OpenStreetMap contributors'
											/>
											<Marker
												position={[
													centerData.lat,
													centerData.lng,
												]}
												icon={L.icon({
													iconUrl: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDMyIDQwIj48cGF0aCBmaWxsPSIjMDAzRDdBIiBkPSJNMTYsMEM4LjcxOCwwIDMsMi41IDMsMTBjMCw1LjEyNSAxMywyOSAxMywyOXMxMy0yMy44NzUgMTMtMjljMC03LjUtNS43MTgtMTAtMTItMTB6Ii8+PGNpcmNsZSBjeD0iMTYiIGN5PSIxMCIgcj0iMyIgZmlsbD0id2hpdGUiLz48L3N2Zz4=`,
													iconSize: [32, 40],
													iconAnchor: [16, 40],
													popupAnchor: [0, -40],
												})}
											>
												<Popup>{centerData.name}</Popup>
											</Marker>
										</MapContainer>
									</div>

									<NearbyLocationsList
										centerName={centerData.center}
									/>
								</div>
							) : (
								<div className='bg-gray-200 rounded-xl h-[300px] flex items-center justify-center'>
									<p
										className='text-gray-500 font-medium'
										style={{
											fontFamily: "Outfit, sans-serif",
										}}
									>
										Location coordinates not available
									</p>
								</div>
							)}
						</div>
					)}
				</div>
			</div> */}
		</div>
	);
};

export default Center;
