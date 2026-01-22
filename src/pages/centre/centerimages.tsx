import { useState } from "react";
import { COLORS } from "../../helpers/constants/Colors";

// Import center images - organized by center
import aurelien_1 from "../../assets/centers/centre_images/aurelian_1.jpg";
import aurelien_2 from "../../assets/centers/centre_images/aurelian_2.jpg";
import aurelien_3 from "../../assets/centers/centre_images/aurelian_3.jpg";
import aurelien_4 from "../../assets/centers/centre_images/aurelian_4.jpg";

import nrEnclave_1 from "../../assets/centers/centre_images/NREnclave_1.jpg";
import nrEnclave_2 from "../../assets/centers/centre_images/NREnclave_2.jpg";
import nrEnclave_3 from "../../assets/centers/centre_images/NREnclave_3.jpg";
import nrEnclave_4 from "../../assets/centers/centre_images/NREnclave_4.jpg";

import psa_1 from "../../assets/centers/centre_images/PSA_1.jpg";
import psa_2 from "../../assets/centers/centre_images/PSA_2.jpg";
import psa_3 from "../../assets/centers/centre_images/PSA_3.jpg";
import psa_4 from "../../assets/centers/centre_images/PSA_4.jpg";

import shilpitha_1 from "../../assets/centers/centre_images/Shilpitha_1.jpg";
import shilpitha_2 from "../../assets/centers/centre_images/Shilpitha_2.jpg";
import shilpitha_3 from "../../assets/centers/centre_images/Shilpitha_3.jpg";
import shilpitha_4 from "../../assets/centers/centre_images/Shilpitha_4.jpg";

interface CenterImagesProps {
	centreId?: string;
}

// Map center IDs to their image arrays
const centerImageMap: { [key: string]: string[] } = {
	aurelien: [aurelien_1, aurelien_2, aurelien_3, aurelien_4],
	"nr-enclave": [nrEnclave_1, nrEnclave_2, nrEnclave_3, nrEnclave_4],
	"prestige-saleh-ahmed": [psa_1, psa_2, psa_3, psa_4],
	"shilpitha-tech-park": [shilpitha_1, shilpitha_2, shilpitha_3, shilpitha_4],
	// Add more centers as images become available
};

export default function CenterImages({ centreId }: CenterImagesProps) {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	// Get images for the current center
	const images = centreId ? centerImageMap[centreId] : null;

	// If no images available for this center, don't render the section
	if (!images || images.length === 0) {
		return null;
	}

	return (
		<>
			<section className="w-full py-12 lg:py-16 px-4" style={{ backgroundColor: COLORS.white }}>
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{images.map((image, index) => (
							<div
								key={index}
								className="relative aspect-[271/298] rounded-2xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
								onClick={() => setSelectedImage(image)}
							>
								<img
									src={image}
									alt={`Center view ${index + 1}`}
									className="w-full h-full object-cover"
								/>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Modal for full-size image */}
			{selectedImage && (
				<div
					className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
					onClick={() => setSelectedImage(null)}
				>
					<div className="relative max-w-5xl max-h-[90vh]">
						<button
							onClick={() => setSelectedImage(null)}
							className="absolute -top-10 right-0 text-white text-3xl hover:text-gray-300"
						>
							×
						</button>
						<img
							src={selectedImage}
							alt="Center view full size"
							className="max-w-full max-h-[90vh] object-contain rounded-lg"
						/>
					</div>
				</div>
			)}
		</>
	);
}
