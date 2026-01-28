import HQ27_1 from "../../assets/centers/centre_images/HQ27_1.jpg";
import HQ27_2 from "../../assets/centers/centre_images/HQ27_2.jpg";
import HQ27_3 from "../../assets/centers/centre_images/HQ27_3.jpg";
import HQ27_4 from "../../assets/centers/centre_images/HQ27_4.jpg";
import { useState } from "react";
import { COLORS } from "../../helpers/constants/Colors";

// Import center images - organized by center

import SMT_1 from "../../assets/centers/centre_images/SMT_1.png";
import SMT_2 from "../../assets/centers/centre_images/SMT_2.jpg";
import SMT_3 from "../../assets/centers/centre_images/SMT_3.jpg";
import SMT_4 from "../../assets/centers/centre_images/SMT_4.jpg";

import nrEnclave_1 from "../../assets/centers/centre_images/NREnclave_1.jpg";
import nrEnclave_2 from "../../assets/centers/centre_images/NREnclave_2.jpg";
import nrEnclave_3 from "../../assets/centers/centre_images/NREnclave_3.jpg";
import nrEnclave_4 from "../../assets/centers/centre_images/NREnclave_4.jpg";

import orbit_1 from "../../assets/centers/centre_images/orbit_1.jpg";
import orbit_2 from "../../assets/centers/centre_images/orbit_2.jpg";
import orbit_3 from "../../assets/centers/centre_images/orbit_3.jpg";
import orbit_4 from "../../assets/centers/centre_images/orbit_4.jpg";
import orbit_5 from "../../assets/centers/centre_images/orbit_5.jpg";
import orbit_6 from "../../assets/centers/centre_images/orbit_6.jpg";
import orbit_7 from "../../assets/centers/centre_images/orbit_7.jpg";
import orbit_8 from "../../assets/centers/centre_images/orbit_8.jpg";
import orbit_9 from "../../assets/centers/centre_images/orbit_9.jpg";
import orbit_10 from "../../assets/centers/centre_images/orbit_10.jpg";
import orbit_11 from "../../assets/centers/centre_images/orbit_11.jpg";
import orbit_12 from "../../assets/centers/centre_images/orbit_12.jpg";
import orbit_13 from "../../assets/centers/centre_images/orbit_13.jpg";
import orbit_14 from "../../assets/centers/centre_images/orbit_14.jpg";
import orbit_15 from "../../assets/centers/centre_images/orbit_15.jpg";
import orbit_16 from "../../assets/centers/centre_images/orbit_16.jpg";

import ogm_1 from "../../assets/centers/centre_images/ogm_1.jpg";
import ogm_2 from "../../assets/centers/centre_images/ogm_2.png";
import ogm_3 from "../../assets/centers/centre_images/ogm_3.jpg";
import ogm_4 from "../../assets/centers/centre_images/ogm_4.jpg";

import twitza_1 from "../../assets/centers/centre_images/twitza_1.jpeg";
import twitza_2 from "../../assets/centers/centre_images/twitza_2.jpeg";
import twitza_3 from "../../assets/centers/centre_images/twitza_3.jpeg";
import twitza_4 from "../../assets/centers/centre_images/twitza_4.jpeg";

import jayabheri_1 from "../../assets/centers/centre_images/jayabheri_1.jpeg";
import jayabheri_2 from "../../assets/centers/centre_images/jayabheri_2.jpeg";
import jayabheri_3 from "../../assets/centers/centre_images/jayabheri_3.jpeg";
import jayabheri_4 from "../../assets/centers/centre_images/jayabheri_4.jpeg";

import divyasreetrinity_1 from "../../assets/centers/centre_images/divyasreetrinity_1.jpg";
import divyasreetrinity_2 from "../../assets/centers/centre_images/divyasreetrinity_2.jpg";
import divyasreetrinity_3 from "../../assets/centers/centre_images/divyasreetrinity_3.jpg";
import divyasreetrinity_4 from "../../assets/centers/centre_images/divyasreetrinity_4.jpg";

import profound_1 from "../../assets/centers/centre_images/profound_1.jpeg";
import profound_2 from "../../assets/centers/centre_images/profound_2.jpeg";
import profound_3 from "../../assets/centers/centre_images/profound_3.jpeg";
import profound_4 from "../../assets/centers/centre_images/profound_4.jpeg";

import purva_1 from "../../assets/centers/centre_images/purva_1.jpeg";
import purva_2 from "../../assets/centers/centre_images/purva_2.jpeg";
import purva_3 from "../../assets/centers/centre_images/purva_3.jpeg";
import purva_4 from "../../assets/centers/centre_images/purva_4.jpeg";

import stp_1 from "../../assets/centers/centre_images/stp_1.jpeg";
import stp_2 from "../../assets/centers/centre_images/stp_2.jpeg";
import stp_3 from "../../assets/centers/centre_images/stp_3.jpeg";
import stp_4 from "../../assets/centers/centre_images/stp_4.jpeg";

import jade_1 from "../../assets/centers/centre_images/Jade_1.jpg";
import jade_2 from "../../assets/centers/centre_images/Jade_2.jpg";
import jade_3 from "../../assets/centers/centre_images/Jade_3.jpg";
import jade_4 from "../../assets/centers/centre_images/Jade_4.jpg";

import sreshta_1 from "../../assets/centers/centre_images/sreshta_1.jpeg";
import sreshta_2 from "../../assets/centers/centre_images/sreshta_2.jpeg";
import sreshta_3 from "../../assets/centers/centre_images/sreshta_3.jpeg";
import sreshta_4 from "../../assets/centers/centre_images/sreshta_4.jpeg";

import greystone_1 from "../../assets/centers/centre_images/greystone_1.jpeg";
import greystone_2 from "../../assets/centers/centre_images/greystone_2.jpeg";
import greystone_3 from "../../assets/centers/centre_images/greystone_3.jpeg";
import greystone_4 from "../../assets/centers/centre_images/greystone_4.jpeg";

import ptp_1 from "../../assets/centers/centre_images/ptp_1.jpeg";
import ptp_2 from "../../assets/centers/centre_images/ptp_2.jpeg";
import ptp_3 from "../../assets/centers/centre_images/ptp_3.jpeg";
import ptp_4 from "../../assets/centers/centre_images/ptp_4.jpeg";

import ptp1_1 from "../../assets/centers/centre_images/ptp1_1.jpeg";
import ptp1_2 from "../../assets/centers/centre_images/ptp1_2.jpeg";
import ptp1_3 from "../../assets/centers/centre_images/ptp1_3.jpeg";
import ptp1_4 from "../../assets/centers/centre_images/ptp1_4.jpeg";

import benz_1 from "../../assets/centers/centre_images/benz_1.jpeg";
import benz_2 from "../../assets/centers/centre_images/benz_2.jpeg";
import benz_3 from "../../assets/centers/centre_images/benz_3.jpeg";
import benz_4 from "../../assets/centers/centre_images/benz_4.jpeg";

import medha_1 from "../../assets/centers/centre_images/medha_1.jpeg";
import medha_2 from "../../assets/centers/centre_images/medha_2.jpeg";
import medha_3 from "../../assets/centers/centre_images/medha_3.jpeg";
import medha_4 from "../../assets/centers/centre_images/medha_4.jpeg";

import godrej_1 from "../../assets/centers/centre_images/aurelian_1.jpg";
import godrej_2 from "../../assets/centers/centre_images/aurelian_2.jpg";
import godrej_3 from "../../assets/centers/centre_images/aurelian_3.jpg";
import godrej_4 from "../../assets/centers/centre_images/aurelian_4.jpg";

interface CenterImagesProps {
	centreId?: string;
}

// Map center IDs to their image arrays
const centerImageMap: { [key: string]: string[] } = {
	"sm-towers": [SMT_1, SMT_2, SMT_3, SMT_4],
	hq27: [HQ27_1, HQ27_2, HQ27_3, HQ27_4],
	"nr-enclave": [nrEnclave_1, nrEnclave_2, nrEnclave_3, nrEnclave_4],
	orbit: [orbit_1, orbit_2, orbit_3, orbit_4, orbit_5, orbit_6, orbit_7, orbit_8, orbit_9, orbit_10, orbit_11, orbit_12, orbit_13, orbit_14, orbit_15, orbit_16],
	"one-golden-mile": [ogm_1, ogm_2, ogm_3, ogm_4],
	"my-home-twitza": [twitza_1, twitza_2, twitza_3, twitza_4],
	"jayabheri-trendset": [jayabheri_1, jayabheri_2, jayabheri_3, jayabheri_4],
	"divyasree-trinity": [
		divyasreetrinity_1,
		divyasreetrinity_2,
		divyasreetrinity_3,
		divyasreetrinity_4,
	],
	"profound-tech-park": [profound_1, profound_2, profound_3, profound_4],
	"purva-summit": [purva_1, purva_2, purva_3, purva_4],
	"sohini-tech-park": [stp_1, stp_2, stp_3, stp_4],
	"kochar-jade": [jade_1, jade_2, jade_3, jade_4],
	"sreshta-marvel": [sreshta_1, sreshta_2, sreshta_3, sreshta_4],
	"grey-stone": [greystone_1, greystone_2, greystone_3, greystone_4],
	"panchasilal-tech-park": [ptp_1, ptp_2, ptp_3, ptp_4],
	"panchasilal-tech-park-1": [ptp1_1, ptp1_2, ptp1_3, ptp1_4],
	"benz-circle": [benz_1, benz_2, benz_3, benz_4],
	"medha-towers": [medha_1, medha_2, medha_3, medha_4],
	"godrej-waterside": [godrej_1, godrej_2, godrej_3, godrej_4],
	// Add more centers as images become available
};

export default function CenterImages({ centreId }: CenterImagesProps) {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(0);

	// Get images for the current center
	const images = centreId ? centerImageMap[centreId] : null;

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
				<h2 className="text-3xl lg:text-5xl font-bold text-center mb-8 lg:mb-12">
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
										? 'bg-gray-300 cursor-not-allowed opacity-50'
										: 'shadow-2xl hover:shadow-3xl hover:scale-110 cursor-pointer'
								}`}
								style={currentPage === 0 ? {} : { backgroundColor: COLORS.brandYellow }}
							>
								<svg
									width="32"
									height="32"
									viewBox="0 0 24 24"
									fill="none"
									stroke={currentPage === 0 ? "#999" : COLORS.brandBlueDark}
									strokeWidth="3"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M15 18l-6-6 6-6" />
								</svg>
							</button>
							<button
								onClick={handleNext}
								disabled={currentPage === totalPages - 1}
								className={`absolute -right-6 lg:-right-8 top-1/2 -translate-y-1/2 z-10 w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition-all ${
									currentPage === totalPages - 1
										? 'bg-gray-300 cursor-not-allowed opacity-50'
										: 'shadow-2xl hover:shadow-3xl hover:scale-110 cursor-pointer'
								}`}
								style={currentPage === totalPages - 1 ? {} : { backgroundColor: COLORS.brandYellow }}
							>
								<svg
									width="32"
									height="32"
									viewBox="0 0 24 24"
									fill="none"
									stroke={currentPage === totalPages - 1 ? "#999" : COLORS.brandBlueDark}
									strokeWidth="3"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M9 18l6-6-6-6" />
								</svg>
							</button>
						</>
					)}

					<div className='px-12'>
						<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
							{currentImages.map((image, index) => (
								<div
									key={startIndex + index}
									className='relative aspect-[271/298] rounded-2xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity'
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
						
						{/* Page indicators */}
						{totalPages > 1 && (
							<div className='flex justify-center items-center gap-2 mt-8'>
								{Array.from({ length: totalPages }, (_, i) => (
									<button
										key={i}
										onClick={() => setCurrentPage(i)}
										className={`w-3 h-3 rounded-full transition-all ${
											i === currentPage ? 'w-8' : ''
										}`}
										style={{
											backgroundColor: i === currentPage ? COLORS.brandYellow : '#D1D5DB',
										}}
									/>
								))}
							</div>
						)}
					</div>
				</div>
			</section>

			{/* Modal for full-size image */}
			{selectedImage && (
				<div
					className='fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4'
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
