import { useState, useMemo } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { COLORS } from "../../helpers/constants/Colors";
import cityData from "../../content/city&CenterObject.json";
import { useCityCenters } from "../../hooks/useCityCentre";

interface CenterImagesProps {
	centreId?: string;
}

export default function CenterImages({ centreId }: CenterImagesProps) {
	const { data: cityCentersData } = useCityCenters();
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(0);

	// Find center images from city data
	const images = useMemo(() => {
		if (!centreId) return null;

		interface Center {
			id: string;
			centerLevelImages?: string[];
			// add other properties as needed
		}
	
		for (const city of cityCentersData || cityData) {
			const center = city.centers.find((c: Center) => c.id === centreId);
			if (center && center.centerLevelImages && center.centerLevelImages.length > 0) {
				return center.centerLevelImages;
			}
		}
		return null;
	}, [centreId, cityCentersData]);

	// If no images available for this center, don't render the section
	if (!images || images.length === 0) {
		return null;
	}

	const imagesPerPage = 4;
	const totalPages = Math.ceil(images.length / imagesPerPage);
	const startIndex = currentPage * imagesPerPage;
	const endIndex = startIndex + imagesPerPage;
	const currentImages = images.slice(startIndex, endIndex);

	const handleNext = () => {
		if (currentPage < totalPages - 1) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handlePrevious = () => {
		if (currentPage > 0) {
			setCurrentPage(currentPage - 1);
		}
	};

	return (
		<>
			<section
				className='w-full py-12 lg:py-16 px-4'
				style={{ backgroundColor: COLORS.white }}
			>
				<h2 className='text-3xl lg:text-5xl font-bold text-center mb-8 lg:mb-12'>
					<span style={{ color: COLORS.brandYellow }}>Centre</span>{" "}
					<span style={{ color: COLORS.brandBlueDark }}>Gallery</span>
				</h2>

				<div className='max-w-7xl mx-auto relative'>
					{/* Navigation Arrows */}
					{totalPages > 1 && (
						<>
							<button
								onClick={handlePrevious}
								disabled={currentPage === 0}
								className={`absolute -left-6 lg:-left-8 top-1/2 -translate-y-1/2 z-10 w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition-all ${
									currentPage === 0
										? "bg-transparent cursor-not-allowed opacity-50"
										: "bg-transparent shadow-2xl hover:shadow-3xl hover:scale-110 cursor-pointer"
								}`}
								style={{}}
							>
								<FaChevronLeft
									size={24}
									color={
										currentPage === 0
											? "#999"
											: COLORS.brandBlueDark
									}
								/>
							</button>
							<button
								onClick={handleNext}
								disabled={currentPage === totalPages - 1}
								className={`absolute -right-6 lg:-right-8 top-1/2 -translate-y-1/2 z-10 w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition-all ${
									currentPage === totalPages - 1
										? "bg-transparent cursor-not-allowed opacity-50"
										: "bg-transparent shadow-2xl hover:shadow-3xl hover:scale-110 cursor-pointer"
								}`}
								style={{}}
							>
								<FaChevronRight
									size={24}
									color={
										currentPage === totalPages - 1
											? "#999"
											: COLORS.brandBlueDark
									}
								/>
							</button>
						</>
					)}

					<div className='px-12'>
						<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
							{currentImages.map((image: string, index: number) => (
								<div
									key={startIndex + index}
									className='relative aspect-271/298 rounded-2xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity'
									onClick={() => setSelectedImage(image)}
								>
									<img
										src={image}
										alt={`Center view ${startIndex + index + 1}`}
										className='w-full h-full object-cover'
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Modal for full-size image */}
			{selectedImage && (
				<div
					className='fixed inset-0 bg-black/80 z-100 flex items-center justify-center p-4'
					onClick={() => setSelectedImage(null)}
				>
					<div className='relative max-w-5xl max-h-[90vh]'>
						<button
							onClick={() => setSelectedImage(null)}
							className='absolute -top-10 right-0 text-white text-3xl hover:text-gray-300'
						>
							×
						</button>
						<img
							src={selectedImage}
							alt='Center view full size'
							className='max-w-full max-h-[90vh] object-contain rounded-lg'
						/>
					</div>
				</div>
			)}
		</>
	);
}
