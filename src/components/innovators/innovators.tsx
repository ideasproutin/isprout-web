import React from "react";

const Innovators: React.FC = () => {
	// Add new companies here in any order — they will render A–Z automatically
	const companies = [
		{ logo: "https://isprout-website.s3.ap-south-1.amazonaws.com/logo/adobe.jpg", name: "Adobe", width: 224, height: 116 },
		{ logo: "https://isprout-website.s3.ap-south-1.amazonaws.com/logo/Apple.png", name: "Apple", width: 96, height: 115 },
		{ logo: "https://isprout-website.s3.ap-south-1.amazonaws.com/logo/arcelor-mittal.png", name: "ArcelorMittal", width: 218, height: 109 },
		{ logo: "https://isprout-website.s3.ap-south-1.amazonaws.com/logo/Cars24.jpg", name: "Cars24", width: 145, height: 145 },
		{ logo: "https://isprout-website.s3.ap-south-1.amazonaws.com/logo/Cognizant.png", name: "Cognizant", width: 204, height: 60 },
		{ logo: "https://isprout-website.s3.ap-south-1.amazonaws.com/logo/Daikin.png", name: "Daikin", width: 192, height: 72 },
		{ logo: "https://isprout-website.s3.ap-south-1.amazonaws.com/logo/deliveroo.jpg", name: "Deliveroo", width: 214, height: 107 },
		{ logo: "https://isprout-website.s3.ap-south-1.amazonaws.com/logo/Dell.jpg", name: "Dell", width: 203, height: 203 },
		{ logo: "https://isprout-website.s3.ap-south-1.amazonaws.com/logo/Dr-Reddy.png", name: "Dr. Reddy's", width: 188, height: 41 },
		{ logo: "https://isprout-website.s3.ap-south-1.amazonaws.com/logo/HCL.jpg", name: "HCL", width: 156, height: 72 },
		{ logo: "https://isprout-website.s3.ap-south-1.amazonaws.com/logo/Hitachi.png", name: "Hitachi", width: 169, height: 71 },
		{ logo: "https://isprout-website.s3.ap-south-1.amazonaws.com/logo/Hyundai.png", name: "Hyundai Transys", width: 187, height: 42 },
		{ logo: "https://isprout-website.s3.ap-south-1.amazonaws.com/logo/IBM.png", name: "IBM", width: 156, height: 62 },
		{ logo: "https://isprout-website.s3.ap-south-1.amazonaws.com/logo/Indeed.jpg", name: "Indeed", width: 175, height: 88 },
		{ logo: "https://isprout-website.s3.ap-south-1.amazonaws.com/logo/JioSaavn.png", name: "JioSaavn", width: 192, height: 72 },
		{ logo: "https://isprout-website.s3.ap-south-1.amazonaws.com/logo/lenskart.jpg", name: "Lenskart", width: 187, height: 94 },
		{ logo: "https://isprout-website.s3.ap-south-1.amazonaws.com/logo/Phonepe.png", name: "PhonePe", width: 191, height: 76 },
		{ logo: "https://isprout-website.s3.ap-south-1.amazonaws.com/logo/siemens.jpg", name: "Siemens", width: 158, height: 79 },
		{ logo: "https://isprout-website.s3.ap-south-1.amazonaws.com/logo/Sony.png", name: "Sony", width: 160, height: 90 },
		{
  logo: "https://isprout-website.s3.ap-south-1.amazonaws.com/logo/Vodafone-Idea.png",
  name: "Vi",
  width: 162,
  height: 121,
},
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
