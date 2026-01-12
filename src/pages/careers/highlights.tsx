import companyCultureIcon from "../../assets/careers/companyculture_icon .png";
import workLifeIcon from "../../assets/careers/worklife_icon.png";
import flightIcon from "../../assets/careers/flight_icon.png";

import { COLORS } from '../../helpers/constants/Colors';

export function Highlights() {
	const highlights = [
		{
			title: "Company Culture",
			icon: () => (
				<div className='relative w-[100px] h-[100px]'>
					<svg
						className='w-full h-full'
						viewBox='0 0 108 109'
						fill='none'
					>
						<g filter='url(#filter0_d_1_746)'>
							<circle cx='54' cy='50' r='50' fill={COLORS.brandYellow} />
						</g>
						<defs>
							<filter
								id='filter0_d_1_746'
								x='0'
								y='0'
								width='108'
								height='109'
								filterUnits='userSpaceOnUse'
								colorInterpolationFilters='sRGB'
							>
								<feFlood
									floodOpacity='0'
									result='BackgroundImageFix'
								/>
								<feColorMatrix
									in='SourceAlpha'
									type='matrix'
									values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
									result='hardAlpha'
								/>
								<feOffset dy='5' />
								<feGaussianBlur stdDeviation='2' />
								<feComposite in2='hardAlpha' operator='out' />
								<feColorMatrix
									type='matrix'
									values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
								/>
								<feBlend
									mode='normal'
									in2='BackgroundImageFix'
									result='effect1_dropShadow_1_746'
								/>
								<feBlend
									mode='normal'
									in='SourceGraphic'
									in2='effect1_dropShadow_1_746'
									result='shape'
								/>
							</filter>
						</defs>
					</svg>
					<div className='absolute inset-0 flex items-center justify-center'>
						<img
							src={companyCultureIcon}
							alt='Company Culture'
							className='w-[35px] h-[35px]'
						/>
					</div>
				</div>
			),
		},
		{
			title: "Work Life",
			icon: () => (
				<div className='relative w-[100px] h-[100px]'>
					<svg
						className='w-full h-full'
						viewBox='0 0 108 109'
						fill='none'
					>
						<g filter='url(#filter0_d_1_746_2)'>
							<circle cx='54' cy='50' r='50' fill={COLORS.brandYellow} />
						</g>
						<defs>
							<filter
								id='filter0_d_1_746_2'
								x='0'
								y='0'
								width='108'
								height='109'
								filterUnits='userSpaceOnUse'
								colorInterpolationFilters='sRGB'
							>
								<feFlood
									floodOpacity='0'
									result='BackgroundImageFix'
								/>
								<feColorMatrix
									in='SourceAlpha'
									type='matrix'
									values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
									result='hardAlpha'
								/>
								<feOffset dy='5' />
								<feGaussianBlur stdDeviation='2' />
								<feComposite in2='hardAlpha' operator='out' />
								<feColorMatrix
									type='matrix'
									values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
								/>
								<feBlend
									mode='normal'
									in2='BackgroundImageFix'
									result='effect1_dropShadow_1_746_2'
								/>
								<feBlend
									mode='normal'
									in='SourceGraphic'
									in2='effect1_dropShadow_1_746_2'
									result='shape'
								/>
							</filter>
						</defs>
					</svg>
					<div className='absolute inset-0 flex items-center justify-center'>
						<img
							src={workLifeIcon}
							alt='Work Life'
							className='w-[35px] h-[35px]'
						/>
					</div>
				</div>
			),
		},
		{
			title: "All over India",
			icon: () => (
				<div className='relative w-[100px] h-[100px]'>
					<svg
						className='w-full h-full'
						viewBox='0 0 108 109'
						fill='none'
					>
						<g filter='url(#filter0_d_1_746_3)'>
							<circle cx='54' cy='50' r='50' fill={COLORS.brandYellow} />
						</g>
						<defs>
							<filter
								id='filter0_d_1_746_3'
								x='0'
								y='0'
								width='108'
								height='109'
								filterUnits='userSpaceOnUse'
								colorInterpolationFilters='sRGB'
							>
								<feFlood
									floodOpacity='0'
									result='BackgroundImageFix'
								/>
								<feColorMatrix
									in='SourceAlpha'
									type='matrix'
									values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
									result='hardAlpha'
								/>
								<feOffset dy='5' />
								<feGaussianBlur stdDeviation='2' />
								<feComposite in2='hardAlpha' operator='out' />
								<feColorMatrix
									type='matrix'
									values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
								/>
								<feBlend
									mode='normal'
									in2='BackgroundImageFix'
									result='effect1_dropShadow_1_746_3'
								/>
								<feBlend
									mode='normal'
									in='SourceGraphic'
									in2='effect1_dropShadow_1_746_3'
									result='shape'
								/>
							</filter>
						</defs>
					</svg>
					<div className='absolute inset-0 flex items-center justify-center'>
						<img
							src={flightIcon}
							alt='All over India'
							className='w-[35px] h-[35px]'
						/>
					</div>
				</div>
			),
		},
	];

	const awards = [
		{ year: "2025", title: "Women Leader Award" },
		{ year: "2024", title: "SIBA Awards" },
		{ year: "2024", title: "Managed office Brand Of The Year" },
		{ year: "2021", title: "Outlook Business Spotlight Awards" },
		{ year: "2019", title: "Times Business Award" },
	];

	return (
		<aside className='w-full lg:w-96' style={{ backgroundColor: COLORS.white }}>
			{/* Vertical Line */}
			<div className='hidden lg:block absolute left-0 top-0 h-full w-px' style={{ backgroundColor: COLORS.textBlack }} />

			<div className='pl-0 lg:pl-8'>
				{/* Key Highlights */}
				<div className='mb-12'>
					<h3
					className='text-2xl mb-8'
					style={{ color: COLORS.textBlack, fontFamily: "Outfit, sans-serif" }}
					>
						Key Highlights at iSprout
					</h3>
					<div className='space-y-8'>
						{highlights.map((item, index) => (
							<div
								key={index}
								className='flex items-center gap-4'
							>
								<div className='shrink-0'>{item.icon()}</div>
								<span
									className='text-2xl'
									style={{ color: COLORS.textBlack, fontFamily: "Outfit, sans-serif" }}
								>
									{item.title}
								</span>
							</div>
						))}
					</div>
				</div>

				{/* Awards & Recognition */}
				<div className='relative'>
					<h3
					className='text-2xl mb-8 flex items-center gap-2'
					style={{ color: COLORS.textBlack, fontFamily: "Outfit, sans-serif" }}
					>
						<svg
							width='28'
							height='28'
							viewBox='0 0 24 24'
							fill='none'
						stroke={COLORS.brandYellow}
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<circle cx='12' cy='8' r='7'></circle>
							<polyline points='8.21 13.89 7 23 12 20 17 23 15.79 13.88'></polyline>
						</svg>
						Awards & Recognition
					</h3>

					<div className='space-y-8'>
						{awards.map((award, index) => (
							<div
								key={index}
								className='flex gap-4 relative pl-10'
							>
								{/* Dot */}
								<div className='absolute left-0 top-2'>
									<div className='w-4 h-3.5 bg-black rounded-full' />
									{index < awards.length - 1 && (
										<div className='absolute left-1/2 -translate-x-1/2 top-4 w-px h-[52px]' style={{ backgroundColor: COLORS.textBlack }} />
									)}
								</div>
								<div>
									<p
										className='text-xl mb-1'
										style={{
											fontFamily: "Outfit, sans-serif",
											color: COLORS.textBlack,
										}}
									>
										{award.year}
									</p>
									<p
										className='text-[#A4A4A4] text-base leading-relaxed'
										style={{
											fontFamily: "Outfit, sans-serif",
										}}
									>
										{award.title}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Connect With Us Footer */}
				<div className='mt-12 pt-8 border-t border-gray-200'>
					<h4
						className='text-sm mb-4 text-gray-600 uppercase tracking-wider'
						style={{ fontFamily: "Outfit, sans-serif" }}
					>
						Connect With Us
					</h4>
					<div className='flex gap-3 flex-wrap'>
						{/* Instagram */}
						<a
							href='#'
							className='w-12 h-12 border-2 border-black rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors'
						>
							<svg
								width='20'
								height='20'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<rect
									x='2'
									y='2'
									width='20'
									height='20'
									rx='5'
									ry='5'
								></rect>
								<path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'></path>
								<line
									x1='17.5'
									y1='6.5'
									x2='17.51'
									y2='6.5'
								></line>
							</svg>
						</a>
						{/* Facebook */}
						<a
							href='#'
							className='w-12 h-12 border-2 border-black rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors'
						>
							<svg
								width='20'
								height='20'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'></path>
							</svg>
						</a>
						{/* Twitter */}
						<a
							href='#'
							className='w-12 h-12 border-2 border-black rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors'
						>
							<svg
								width='20'
								height='20'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path d='M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z'></path>
							</svg>
						</a>
						{/* YouTube */}
						<a
							href='#'
							className='w-12 h-12 border-2 border-black rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors'
						>
							<svg
								width='20'
								height='20'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path d='M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z'></path>
								<polygon points='9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02'></polygon>
							</svg>
						</a>
						{/* LinkedIn */}
						<a
							href='#'
							className='w-12 h-12 border-2 border-black rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors'
						>
							<svg
								width='20'
								height='20'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z'></path>
								<rect x='2' y='9' width='4' height='12'></rect>
								<circle cx='4' cy='4' r='2'></circle>
							</svg>
						</a>
					</div>
				</div>
			</div>
		</aside>
	);
}
