import React from "react";
import { homePageImages } from "../../assets";

const Innovators: React.FC = () => {
	// ✅ FLATTENED DATA (NO ROWS)
	const companies = [
		{ logo: homePageImages.adobe, name: "Adobe", width: 187, height: 97 },
		{ logo: homePageImages.indeed, name: "Indeed", width: 146, height: 73 },
		{ logo: homePageImages.phonepe, name: "PhonePe", width: 159, height: 63 },
		{ logo: homePageImages.sony, name: "Sony", width: 133, height: 75 },
		{ logo: homePageImages.hitachi, name: "Hitachi", width: 141, height: 59 },

		{ logo: homePageImages.lenskart, name: "Lenskart", width: 156, height: 78 },
		{ logo: homePageImages.deliveroo, name: "Deliveroo", width: 178, height: 89 },
		{ logo: homePageImages.bosch, name: "Bosch", width: 181, height: 94 },
		{ logo: homePageImages.drReddys, name: "Dr. Reddy's", width: 157, height: 34 },
		{ logo: homePageImages.vi, name: "Vi", width: 135, height: 101 },

		{ logo: homePageImages.dellLogo, name: "Dell", width: 169, height: 169 },
		{ logo: homePageImages.hyundai, name: "Hyundai Transys", width: 156, height: 35 },
		{ logo: homePageImages.arcelorMittal, name: "ArcelorMittal", width: 182, height: 91 },
		{ logo: homePageImages.cars24, name: "Cars24", width: 121, height: 121 },
		{ logo: homePageImages.siemens, name: "Siemens", width: 132, height: 66 },
	];

	return (
		<section
			className='w-full py-12 sm:py-16 md:py-20 bg-gray-50'
			style={{ fontFamily: "Outfit, sans-serif" }}
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
						{companies.map((company, index) => (
							<div
								key={index}
								className={`rounded-xl border bg-white ${
									company.name === "ArcelorMittal"
										? "hidden sm:block"
										: ""
								}`}
								style={{ borderColor: "#e5e7eb" }}
							>
								<div className='p-4 sm:p-6 flex items-center justify-center min-h-[120px]'>
									<img
										src={company.logo}
										alt={company.name}
										width={company.width}
										height={company.height}
										className='max-h-14 sm:max-h-16 md:max-h-20 w-auto object-contain'
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
