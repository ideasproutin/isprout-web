// import React from "react";

// const Amenities1 = () => {
// 	return <div></div>;
// };

// export default Amenities1;
// import { homePageImages } from "../../../assets";

// import { COLORS } from "../../../helpers/constants/Colors";

// const YELLOW = "#F2C94C";
// const svgPaths = { p1e772e00: "M0 60a60 60 0 1 0 120 0a60 60 0 1 0 -120 0z" };

// export default function Amenities() {
// 	const amenities = [
// 		{ icon: homePageImages.internet, label: "Internet Access" },
// 		{ icon: homePageImages.customspace, label: "Custom Build Space" },
// 		{ icon: homePageImages.frontdesk, label: "Front Desk Service" },
// 		{ icon: homePageImages.ambience, label: "Great Ambience" },
// 		{ icon: homePageImages.parking, label: "Parking" },
// 		{ icon: homePageImages.phonebooth, label: "Phone Booth" },
// 		{ icon: homePageImages.dailycleaning, label: "Daily Cleaning" },
// 		{ icon: homePageImages.security, label: "24/7 Security" },
// 		{ icon: homePageImages.cafeteria, label: "Cafeteria" },
// 		{ icon: homePageImages.printers, label: "Printer & Scanners" },
// 	];

// 	return (
// 		<div
// 			className='relative w-full py-12 overflow-hidden'
// 			data-name='amenities'
// 			style={{ backgroundColor: COLORS.white }}
// 		>
// 			{/* Yellow gradient background effect */}
// 			<div
// 				className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-70 blur-[140px] pointer-events-none'
// 				style={{ backgroundColor: "#FFDE00" }}
// 			/>

// 			<div className='relative max-w-6xl mx-auto px-4 z-10'>
// 				<h2 className='text-4xl font-semibold text-center mb-12'>
// 					<span className='text-[#ffde00]'>iSprout</span>
// 					<span style={{ color: COLORS.textBlack }}> Amenities</span>
// 				</h2>

// 				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center'>
// 					{amenities.map((amenity, index) => {
// 						// Stagger pattern per column: up, down, up, down, up
// 						const col = index % 5;
// 						const colOffsets = [0, 24, 0, 24, 0];
// 						const marginTop = colOffsets[col] || 0;

// 						return (
// 							<div
// 								key={index}
// 								className='flex flex-col items-center'
// 								style={{ marginTop }}
// 							>
// 								<div className='relative w-[140px] h-[160px]'>
// 									<div
// 										className='absolute inset-0 border-2 border-[#c4c4c4] border-solid rounded-[15px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
// 										style={{
// 											backgroundColor: COLORS.white,
// 										}}
// 									/>
// 									<div className='relative z-10 flex h-full flex-col items-center justify-start pt-3 pb-4'>
// 										<div className='relative w-[100px] h-[100px]'>
// 											<svg
// 												className='absolute inset-0 w-full h-full'
// 												fill='none'
// 												preserveAspectRatio='none'
// 												viewBox='0 0 120 120'
// 											>
// 												<g
// 													filter='url(#filter0_ii_1_65)'
// 													id='Vector'
// 												>
// 													<path
// 														d={svgPaths.p1e772e00}
// 														fill='#F2C94C'
// 													/>
// 												</g>
// 												<defs>
// 													<filter
// 														colorInterpolationFilters='sRGB'
// 														filterUnits='userSpaceOnUse'
// 														height='130'
// 														id='filter0_ii_1_65'
// 														width='120'
// 														x='0'
// 														y='-4'
// 													>
// 														<feFlood
// 															floodOpacity='0'
// 															result='BackgroundImageFix'
// 														/>
// 														<feBlend
// 															in='SourceGraphic'
// 															in2='BackgroundImageFix'
// 															mode='normal'
// 															result='shape'
// 														/>
// 														<feColorMatrix
// 															in='SourceAlpha'
// 															result='hardAlpha'
// 															type='matrix'
// 															values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
// 														/>
// 														<feOffset dy='6' />
// 														<feGaussianBlur stdDeviation='3' />
// 														<feComposite
// 															in2='hardAlpha'
// 															k2='-1'
// 															k3='1'
// 															operator='arithmetic'
// 														/>
// 														<feColorMatrix
// 															type='matrix'
// 															values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'
// 														/>
// 														<feBlend
// 															in2='shape'
// 															mode='normal'
// 															result='effect1_innerShadow_1_65'
// 														/>
// 														<feColorMatrix
// 															in='SourceAlpha'
// 															result='hardAlpha'
// 															type='matrix'
// 															values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
// 														/>
// 														<feOffset dy='-4' />
// 														<feGaussianBlur stdDeviation='3' />
// 														<feComposite
// 															in2='hardAlpha'
// 															k2='-1'
// 															k3='1'
// 															operator='arithmetic'
// 														/>
// 														<feColorMatrix
// 															type='matrix'
// 															values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0'
// 														/>
// 														<feBlend
// 															in2='effect1_innerShadow_1_65'
// 															mode='normal'
// 															result='effect2_innerShadow_1_65'
// 														/>
// 													</filter>
// 												</defs>
// 											</svg>
// 											<img
// 												alt={amenity.label}
// 												className='absolute inset-[10px] w-[80px] h-[80px] object-contain'
// 												src={amenity.icon}
// 											/>
// 										</div>
// 										<p className='mt-3 text-[14px] text-center text-[rgba(0,0,0,0.83)] font-normal leading-tight'>
// 											{amenity.label}
// 										</p>
// 									</div>
// 								</div>
// 							</div>
// 						);
// 					})}
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
