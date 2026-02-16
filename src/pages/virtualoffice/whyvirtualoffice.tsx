import { useState } from "react";
import img1 from "../../assets/virtualoffice/govt-compilant-documentation.png";
import img2 from "../../assets/virtualoffice/premium-bussiness-address.png";
import img3 from "../../assets/virtualoffice/mail-packaging.png";


const WhyVirtualOffice = () => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<div className='w-full bg-gray-100'>
			{/* Virtual Office At iSprout Section */}
			<section
				id='why-virtual-office'
				className='py-10 sm:py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-16'
			>
				<div className='max-w-7xl mx-auto'>
					<h2
						className='text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: "#00275c",
						}}
					>
						Virtual Office At iSprout
					</h2>

					<p
						className='text-sm sm:text-base md:text-lg mb-8 sm:mb-12 leading-relaxed'
						style={{ fontFamily: "Outfit, sans-serif" }}
					>
						A virtual office at iSprout gives your business a
						premium address, reliable mail handling, and essential
						support services without the cost of a physical
						workspace. It helps you build credibility, expand into
						new cities, and manage operations smoothly while working
						from anywhere.
					</p>

					{/* Image Grid */}
					<div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-6'>
						{[
							{
								img: img2,
								text: "Premium & credible business address",
								title: "Premium Business Addresses",
								desc: "Establish your presence in prime business locations that add trust and professionalism to your brand",
							},
							{
								img: img1,
								text: "Govt-compliant documentation",
								title: "Government-Compliant Documentation",
								desc: "Access GST-ready and regulatory-compliant documentation to support registrations and official requirements.",
							},
							{
								img: img3,
								text: "Professional mail & package handling",
								title: "Professional Mail and Package Handling",
								desc: "All mail and packages are securely received, managed, and notified, so nothing important is missed.",
							},
						].map((item, index) => (
							<div
								key={index}
								className='rounded-3xl overflow-hidden shadow-xl relative cursor-pointer transition-all duration-500 ease-in-out h-full'
								onMouseEnter={() => setHoveredIndex(index)}
								onMouseLeave={() => setHoveredIndex(null)}
							>
								<img
									src={item.img}
									alt={item.text}
									className='w-full aspect-square object-cover'
								/>

								{/* Dark overlay for readability on hover */}
								<div
									className='absolute inset-0 bg-gray-800 transition-opacity duration-500 ease-in-out'
									style={{
										opacity:
											hoveredIndex === index ? 0.6 : 0,
									}}
								/>

								{/* Content - centered vertically and horizontally */}
								<div className='absolute inset-0 flex items-center justify-center p-4'>
									{hoveredIndex === index ? (
										<div className='text-white flex flex-col items-center text-center px-2 transition-opacity duration-500 ease-in-out'>
											<h3 className='font-bold text-base sm:text-lg md:text-xl mb-2'>
												{item.title}
											</h3>
											<p className='text-sm sm:text-base leading-relaxed'>
												{item.desc}
											</p>
										</div>
									) : (
										<div
											className='absolute bottom-0 left-0 right-0 p-3 sm:p-4 rounded-b-3xl'
											style={{
												backgroundColor:
													"rgba(0, 0, 0, 0.3)",
											}}
										>
											<p
												className='text-white text-center text-sm sm:text-base md:text-lg'
												style={{
													fontFamily:
														"Outfit, sans-serif",
												}}
											>
												{item.text}
											</p>
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default WhyVirtualOffice;
