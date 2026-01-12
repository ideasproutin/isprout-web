import { homePageImages } from "../../../assets";
import { Link } from "react-router-dom";
import { COLORS } from "../../../helpers/constants/Colors";

function GlowingEllipse() {
	return (
		<div className='absolute inset-[-19.72%]'>
			<svg
				className='block size-full'
				fill='none'
				preserveAspectRatio='none'
				viewBox='0 0 198 198'
			>
				<g filter='url(#filter0_f_spotlight)'>
					<circle
						cx='99'
						cy='99'
						fill='white'
						fillOpacity='0.68'
						r='71'
					/>
				</g>
				<defs>
					<filter
						colorInterpolationFilters='sRGB'
						filterUnits='userSpaceOnUse'
						height='198'
						width='198'
						x='0'
						y='0'
						id='filter0_f_spotlight'
					>
						<feFlood floodOpacity='0' result='BackgroundImageFix' />
						<feBlend
							in='SourceGraphic'
							in2='BackgroundImageFix'
							mode='normal'
							result='shape'
						/>
						<feGaussianBlur
							result='effect1_foregroundBlur'
							stdDeviation='14'
						/>
					</filter>
				</defs>
			</svg>
		</div>
	);
}

interface TestimonialCardProps {
	logo: string;
	company: string;
	description: string;
	image?: string;
}

function TestimonialCard({ logo, company, description }: TestimonialCardProps) {
	return (
		<div className='relative w-full max-w-[400px] mx-auto'>
			{/* Logo with glowing ellipse - positioned at top left */}
			<div className='absolute -top-[78px] left-[-21px] z-20'>
				<div className='relative w-[142px] h-[142px] flex items-center justify-center'>
					<div className='rotate-90'>
						<div className='relative w-[142px] h-[142px]'>
							<GlowingEllipse />
						</div>
					</div>
					<img
						src={logo}
						alt={company}
						className='absolute w-[100px] h-[100px] object-contain'
					/>
				</div>
			</div>

			{/* Testimonial card with gradient background */}
			<div
				className='relative w-full h-[268px] rounded-[10px] backdrop-blur-[21px] px-[27px] py-[64px] flex flex-col justify-between'
				style={{
					backgroundImage:
						"url('data:image/svg+xml;utf8,<svg viewBox='0 0 400 268' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(10.563 32.256 -60.656 11.142 188.74 -1.675)'><stop stop-color='rgba(255,255,255,0.4)' offset='0'/><stop stop-color='rgba(255,255,255,0)' offset='1'/></radialGradient></defs></svg>')",
				}}
			>
				<p className='text-white text-[24px] leading-[32px]'>
					{description}
				</p>

				<div className='flex justify-center'>
					<Link
						to='/spotlight'
						className='bg-[rgba(254,255,222,0.32)] rounded-[10px] px-[26px] py-[13px] inline-flex items-center justify-center'
						aria-label={`Read more about ${company}`}
						style={{ textDecoration: "none" }}
					>
						<span
							className='text-white text-[14px] leading-[14px] whitespace-nowrap'
							style={{
								textShadow: "0px 4px 4px rgba(0,0,0,0.25)",
							}}
						>
							Read more →
						</span>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default function Spotlight() {
	return (
		<div className='w-full'>
			{/* Blue header banner */}
			<section className='bg-[#204758] px-4 pt-[40px] pb-[60px]'>
				<div className='flex justify-center pb-[80px]'>
					<div className='bg-[#ffde00] border border-[rgba(0,0,0,0.12)] rounded-tl-[40px] rounded-br-[40px] px-[48px] py-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'>
						<h2 className='text-[40px] leading-normal text-[rgba(0,0,0,0.83)] whitespace-nowrap'>
							In the Spotlight
						</h2>
					</div>
				</div>

				<div className='max-w-7xl mx-auto px-4 lg:px-8'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
						<div>
							<h1
								className='text-4xl lg:text-[48px] font-extrabold'
								style={{ color: COLORS.textWhite }}
							>
								Leading Brands
							</h1>
							<p className='mt-4 text-white max-w-xl'>
								Celebrating the companies that grow with us. At
								iSprout, we&apos;re honored to host industry
								leaders, innovators, and high-growth teams who
								bring energy and excellence to our workspaces.
							</p>
						</div>

						<div className='flex justify-end'>
							<div className='relative w-[260px] h-[260px] lg:w-[420px] lg:h-[420px]'>
								<div
									className='absolute inset-0 rounded-full'
									style={{
										backgroundColor: "#FFDE00",
										padding: "8px",
										boxShadow:
											"0 6px 12px rgba(0,0,0,0.12)",
									}}
								/>
								<div className='absolute inset-[12px] rounded-full overflow-hidden bg-white'>
									<img
										src={homePageImages.spotlightDell}
										alt='hero'
										className='w-full h-full object-cover rounded-full'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Dell block: pale-yellow card left, circular image right with subtle curved background */}
			<section className='relative py-12 lg:py-20 bg-white'>
				{/* subtle curved pale background behind the card to match Adobe style */}
				<div className='absolute left-0 top-12 hidden lg:block w-[48%] h-[260px] pointer-events-none -translate-x-6'>
					<div
						className='w-full h-full rounded-tr-[80px] rounded-br-[80px]'
						style={{ backgroundColor: "#F3F9FB" }}
					/>
				</div>

				<div className='max-w-7xl mx-auto px-4 lg:px-8 relative z-10'>
					<div className='grid grid-cols-1 lg:grid-cols-12 items-center gap-6'>
						<div className='lg:col-span-6 z-20'>
							<div
								className='relative bg-[#fff9e6] border border-gray-200 rounded-md p-6 lg:p-10 shadow-md max-w-xl'
								style={{ position: "relative", zIndex: 30 }}
							>
								<div className='absolute -top-8 -right-8 w-20 h-20 rounded-full bg-white flex items-center justify-center shadow'>
									<div
										className='w-16 h-16 rounded-full flex items-center justify-center'
										style={{ backgroundColor: "#D2E6F5" }}
									>
										<img
											src={homePageImages.dellLogo}
											alt='dell'
											className='w-12 h-12 object-contain'
										/>
									</div>
								</div>
								<h3 className='text-xl lg:text-2xl font-extrabold mb-2'>
									DELL
								</h3>
								<p className='mb-4 text-gray-800'>
									"Scaling their India teams with iSprout's
									flexible workspace solutions."
								</p>
								<p className='text-sm text-gray-500'>
									Global Brand
								</p>
								<p className='text-sm text-gray-700 mt-4 font-semibold'>
									📍 iSprout – Financial District
								</p>
							</div>
						</div>

						<div className='lg:col-span-6 flex justify-center lg:justify-end z-20'>
							<div className='relative w-[260px] h-[260px] md:w-[300px] md:h-[300px] lg:w-[360px] lg:h-[360px]'>
								<div
									className='absolute inset-0 rounded-full flex items-center justify-center'
									style={{
										boxShadow:
											"0 6px 12px rgba(0,0,0,0.12)",
									}}
								>
									<div
										className='w-full h-full rounded-full'
										style={{
											backgroundColor: COLORS.brandYellow,
											padding: "10px",
										}}
									/>
								</div>
								<div className='absolute inset-[14px] rounded-full overflow-hidden bg-white'>
									<img
										src={homePageImages.spotlightDell}
										alt='dell-team'
										className='w-full h-full object-cover rounded-full'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Adobe block: mirrored layout (image left, card right) with same light-blue ellipse */}
			<section className='relative py-12 lg:py-20 bg-white'>
				<div className='absolute left-0 top-16 w-[48%] h-[520px] pointer-events-none'>
					<div
						className='w-full h-full rounded-[50%]'
						style={{ backgroundColor: "#D2E6F5" }}
					/>
				</div>

				<div className='max-w-7xl mx-auto px-4 lg:px-8 relative z-10'>
					<div className='grid grid-cols-1 lg:grid-cols-12 items-center gap-6'>
						<div className='lg:col-span-6 flex justify-center lg:justify-start'>
							<div className='relative w-[260px] h-[260px] md:w-[300px] md:h-[300px] lg:w-[360px] lg:h-[360px]'>
								<div
									className='absolute inset-0 rounded-full flex items-center justify-center'
									style={{
										boxShadow:
											"0 6px 12px rgba(0,0,0,0.12)",
									}}
								>
									<div
										className='w-full h-full rounded-full'
										style={{
											backgroundColor: COLORS.brandYellow,
											padding: "10px",
										}}
									/>
								</div>
								<div className='absolute inset-[14px] rounded-full overflow-hidden bg-white'>
									<img
										src={homePageImages.spotlightAdobe}
										alt='adobe-team'
										className='w-full h-full object-cover rounded-full'
									/>
								</div>
							</div>
						</div>

						<div className='lg:col-span-6'>
							<div className='relative bg-[#fff9e6] border border-gray-200 rounded-md p-6 lg:p-10 shadow-md max-w-xl ml-0 lg:ml-8'>
								<div className='absolute -top-8 -left-8 w-20 h-20 rounded-full bg-white flex items-center justify-center shadow'>
									<div
										className='w-16 h-16 rounded-full flex items-center justify-center'
										style={{ backgroundColor: "#D2E6F5" }}
									>
										<img
											src={homePageImages.adobeLogo}
											alt='adobe'
											className='w-12 h-12 object-contain'
										/>
									</div>
								</div>
								<h3 className='text-xl lg:text-2xl font-extrabold mb-2'>
									Adobe
								</h3>
								<p className='mb-4 text-gray-800'>
									"Scaling their India teams with iSprout's
									flexible workspace solutions."
								</p>
								<p className='text-sm text-gray-500'>
									Global Brand
								</p>
								<p className='text-sm text-gray-700 mt-4 font-semibold'>
									📍 iSprout – Financial District
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
