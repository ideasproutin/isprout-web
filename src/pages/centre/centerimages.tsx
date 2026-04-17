import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { COLORS } from "../../helpers/constants/Colors";
import cityData from "../../content/city&CenterObject.json";
import { useCityCenters } from "../../hooks/useCityCentre";

interface CenterImagesProps {
	centreId?: string;
}

export default function CenterImages({ centreId }: CenterImagesProps) {
	const { data: cityCentersData } = useCityCenters();
	const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
	const [currentPage, setCurrentPage] = useState(0);
	const lockedScrollYRef = useRef(0);

	// Lock body scroll when modal is open
	useEffect(() => {
		if (selectedImageIndex !== null) {
			lockedScrollYRef.current = window.scrollY;
			document.body.style.overflow = "hidden";
			document.body.style.position = "fixed";
			document.body.style.top = `-${lockedScrollYRef.current}px`;
			document.body.style.width = "100%";
			document.documentElement.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
			document.body.style.position = "";
			document.body.style.top = "";
			document.body.style.width = "";
			document.documentElement.style.overflow = "";
			window.scrollTo(0, lockedScrollYRef.current);
		}
		return () => {
			document.body.style.overflow = "";
			document.body.style.position = "";
			document.body.style.top = "";
			document.body.style.width = "";
			document.documentElement.style.overflow = "";
			if (selectedImageIndex !== null) {
				window.scrollTo(0, lockedScrollYRef.current);
			}
		};
	}, [selectedImageIndex]);

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

	// Navigation handlers
	const handleNextImage = useCallback(() => {
		if (selectedImageIndex !== null && images && selectedImageIndex < images.length - 1) {
			setSelectedImageIndex(selectedImageIndex + 1);
		}
	}, [selectedImageIndex, images]);

	const handlePreviousImage = useCallback(() => {
		if (selectedImageIndex !== null && selectedImageIndex > 0) {
			setSelectedImageIndex(selectedImageIndex - 1);
		}
	}, [selectedImageIndex]);

	// Keyboard navigation
	useEffect(() => {
		if (selectedImageIndex === null || !images) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "ArrowLeft") {
				handlePreviousImage();
			} else if (e.key === "ArrowRight") {
				handleNextImage();
			} else if (e.key === "Escape") {
				setSelectedImageIndex(null);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [selectedImageIndex, images, handleNextImage, handlePreviousImage]);

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
									className='relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity'
									onClick={() => setSelectedImageIndex(startIndex + index)}
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
			{selectedImageIndex !== null && images && (
				<div
					className='fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4'
					onClick={() => setSelectedImageIndex(null)}
				>
					<div
						className='relative w-[90vw] aspect-[4/5] lg:w-[80vw] lg:aspect-[16/9] max-w-6xl'
						onClick={(event) => event.stopPropagation()}
					>
						{/* Close button */}
						<button
							onClick={() => setSelectedImageIndex(null)}
							className='absolute -top-1 -right-1 flex h-8 w-8
							 items-center justify-center rounded-full bg-black text-white text-xl leading-none hover:bg-gray-900 border-none outline-none z-10'
						>
							×
						</button>

						{/* Previous button */}
						{selectedImageIndex > 0 && (
							<button
								onClick={handlePreviousImage}
								className='absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-all z-10'
							>
								<FaChevronLeft size={20} />
							</button>
						)}

						{/* Next button */}
						{selectedImageIndex < images.length - 1 && (
							<button
								onClick={handleNextImage}
								className='absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-all z-10'
							>
								<FaChevronRight size={20} />
							</button>
						)}

						<img
							src={images[selectedImageIndex]}
							alt='Center view full size'
							className='w-full h-full object-cover rounded-lg'
						/>
					</div>
				</div>
			)}
		</>
	);
}
