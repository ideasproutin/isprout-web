import React from "react";
import { homePageImages } from "../../assets";

const Innovators: React.FC = () => {
	// Add new companies here in any order — they will render A–Z automatically
	const companies = [
		{ logo: homePageImages.adobe, name: "Adobe", width: 224, height: 116 },
		{ logo: homePageImages.apple, name: "Apple", width: 96, height: 115 },
		{ logo: homePageImages.arcelorMittal, name: "ArcelorMittal", width: 218, height: 109 },
		{ logo: homePageImages.cars24, name: "Cars24", width: 145, height: 145 },
		{ logo: homePageImages.cognizant, name: "Cognizant", width: 204, height: 60 },
		{ logo: homePageImages.daikin, name: "Daikin", width: 192, height: 72 },
		{ logo: homePageImages.deliveroo, name: "Deliveroo", width: 214, height: 107 },
		{ logo: homePageImages.dellLogo, name: "Dell", width: 203, height: 203 },
		{ logo: homePageImages.drReddys, name: "Dr. Reddy's", width: 188, height: 41 },
		{ logo: homePageImages.hcl, name: "HCL", width: 156, height: 72 },
		{ logo: homePageImages.hitachi, name: "Hitachi", width: 169, height: 71 },
		{ logo: homePageImages.hyundai, name: "Hyundai Transys", width: 187, height: 42 },
		{ logo: homePageImages.ibm, name: "IBM", width: 156, height: 62 },
		{ logo: homePageImages.indeed, name: "Indeed", width: 175, height: 88 },
		{ logo: homePageImages.jioSaavn, name: "JioSaavn", width: 192, height: 72 },
		{ logo: homePageImages.lenskart, name: "Lenskart", width: 187, height: 94 },
		{ logo: homePageImages.phonepe, name: "PhonePe", width: 191, height: 76 },
		{ logo: homePageImages.siemens, name: "Siemens", width: 158, height: 79 },
		{ logo: homePageImages.sony, name: "Sony", width: 160, height: 90 },
		{ logo: homePageImages.vi, name: "Vi", width: 162, height: 121 },
	];

	const sortedCompanies = [...companies].sort((a, b) =>
		a.name.localeCompare(b.name)
	);

	return (
		<section
			className='w-full py-12 sm:py-16 md:py-20 bg-gray-50'
			style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
		>
			{/* ✅ SINGLE SOURCE OF HORIZONTAL ALIGNMENT */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Header */}
				<div className='mb-10 text-center'>
					<div
						className='inline-block px-8 py-4 mb-6 rounded-lg shadow-lg'
						style={{ backgroundColor: "#00275c" }}
					>
						<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white'>
							Our Partners in Growth
						</h2>
					</div>

					<p className='text-base sm:text-lg md:text-xl text-gray-700 max-w-4xl mx-auto'>
						iSprout partners with 350+ high-growth companies across
						industries, including leading global enterprises and
						prominent Global Capability Centers (GCCs).
					</p>
				</div>

				{/* ✅ SINGLE RESPONSIVE GRID (NO GAPS EVER) */}
				<div className='bg-gray-50 rounded-3xl'>
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6'>
						{sortedCompanies.map((company, index) => (
							<div
								key={index}
								className={`rounded-xl border bg-white ${company.name === "ArcelorMittal"
									? "hidden sm:block"
									: ""
									}`}
								style={{ borderColor: "#e5e7eb" }}
							>
								<div className='p-3 sm:p-4 flex items-center justify-center min-h-[96px]'>
									<img
										src={company.logo}
										alt={company.name}
										width={company.width}
										height={company.height}
										className='max-h-[67px] sm:max-h-[77px] md:max-h-[67px] w-auto object-contain'
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Innovators;
