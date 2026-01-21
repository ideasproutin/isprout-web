import React, { useLayoutEffect, useRef, useState } from "react";
import managedOfficeImg from "../../assets/managedofficeintro/managedofficeimg.png";
import { COLORS } from "../../helpers/constants/Colors";

// SVG path definitions
const svgPaths = {
	p3c7a1100:
		"M16 8C18.2091 8 20 9.79086 20 12C20 14.2091 18.2091 16 16 16C13.7909 16 12 14.2091 12 12C12 9.79086 13.7909 8 16 8ZM16 18C19.3137 18 22 20.6863 22 24V26H10V24C10 20.6863 12.6863 18 16 18Z",
	p1702f600: "M9 419C9 416.333 10 411 14 411C18 411 25 414 28.5 419",
};

function UserIcon() {
	return (
		<div className='[grid-area:1_/_1] ml-[12px] mt-[12px] relative size-[24px]'>
			<svg
				className='block size-full'
				fill='none'
				preserveAspectRatio='none'
				viewBox='0 0 32 32'
			>
				<path d={svgPaths.p3c7a1100} fill='#F4F3F8' />
			</svg>
		</div>
	);
}

function Icon() {
	return (
		<div className='grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0'>
			<div className='[grid-area:1_/_1] bg-[#ffde00] ml-0 mt-0 rounded-[18px] size-[48px]' />
			<UserIcon />
		</div>
	);
}

function FeatureCard({
	title,
	subtitle,
	style,
}: {
	title: string;
	subtitle: string;
	style: React.CSSProperties;
}) {
	return (
		<div
			className='absolute bg-[#f4f3f8] content-stretch flex gap-[12px] h-[104px] items-start p-[24px] rounded-[24px] shadow-[0px_12px_32px_0px_rgba(0,0,0,0.15)] w-[247px] transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0px_16px_40px_0px_rgba(0,0,0,0.2)] cursor-pointer'
			style={style}
		>
			<Icon />
			<div className='content-stretch flex flex-col items-start leading-[normal] not-italic relative shrink-0 text-left'>
				<p className='relative shrink-0 text-[#333] text-[18px] font-medium'>
					{title}
				</p>
				<p className='relative shrink-0 text-[#909090] text-[14px]'>
					{subtitle}
				</p>
			</div>
		</div>
	);
}

const DESIGN_W = 1000;
const DESIGN_H = 580;

const IntroSection: React.FC = () => {
	const wrapRef = useRef<HTMLDivElement | null>(null);
	const [scale, setScale] = useState(1);

	useLayoutEffect(() => {
		if (!wrapRef.current) return;

		const el = wrapRef.current;

		const update = () => {
			// available width inside wrapper
			const available = el.clientWidth;
			if (!available) return;

			// scale down when screen is smaller than design width
			const nextScale = Math.min(1, available / DESIGN_W);

			setScale(nextScale);
		};

		update();

		const ro = new ResizeObserver(update);
		ro.observe(el);

		return () => ro.disconnect();
	}, []);

	// Keep height exactly matching scaled canvas so it doesn't overflow / create weird spacing
	const scaledHeight = Math.round(DESIGN_H * scale);

	return (
		<section className='w-full' style={{ backgroundColor: COLORS.white }}>
			{/* Wrapper controls the available width */}
			<div
				ref={wrapRef}
				className='mx-auto w-full max-w-[1000px] px-4 sm:px-6 lg:px-8'
				style={{
					// vertical padding stays responsive; canvas height is controlled below
					paddingTop: 24,
					paddingBottom: 24,
				}}
			>
				{/* This is the “viewport” for the scaled design */}
				<div
					className='relative w-full'
					style={{
						height: scaledHeight, // important: prevents overlap with next section
					}}
				>
					{/* Scaled canvas (keeps your exact absolute layout) */}
					<div
						className='absolute left-0 top-0'
						style={{
							width: DESIGN_W,
							height: DESIGN_H,
							transform: `scale(${scale})`,
							transformOrigin: "top left",
						}}
					>
						{/* Black background ellipse with shadow */}
						<div className='absolute h-[560px] left-[285px] top-[-40px] w-[625px]'>
							<div className='absolute inset-[0_-0.94%_-1.83%_0]'>
								<svg
									className='block size-full'
									fill='none'
									preserveAspectRatio='none'
									viewBox='0 0 855 777'
								>
									<defs>
										<filter
											colorInterpolationFilters='sRGB'
											filterUnits='userSpaceOnUse'
											height='777'
											id='filter0_d_1_68'
											width='855'
											x='0'
											y='0'
										>
											<feFlood
												floodOpacity='0'
												result='BackgroundImageFix'
											/>
											<feColorMatrix
												in='SourceAlpha'
												result='hardAlpha'
												type='matrix'
												values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
											/>
											<feOffset dx='4' dy='10' />
											<feGaussianBlur stdDeviation='2' />
											<feComposite
												in2='hardAlpha'
												operator='out'
											/>
											<feColorMatrix
												type='matrix'
												values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
											/>
											<feBlend
												in2='BackgroundImageFix'
												mode='normal'
												result='effect1_dropShadow_1_68'
											/>
											<feBlend
												in='SourceGraphic'
												in2='effect1_dropShadow_1_68'
												mode='normal'
												result='shape'
											/>
										</filter>
									</defs>
									<ellipse
										cx='423.5'
										cy='381.5'
										fill='black'
										rx='423.5'
										ry='381.5'
										filter='url(#filter0_d_1_68)'
									/>
								</svg>
							</div>
						</div>

						{/* Office image in circle with border */}
						<div className='absolute h-[530px] left-[302px] top-[-28px] w-[590px]'>
							<div className='w-full h-full rounded-[50%] overflow-hidden border-[2px] border-black'>
								<img
									alt='Office reception area'
									className='block max-w-none size-full object-cover'
									src={managedOfficeImg}
								/>
							</div>
						</div>

						{/* Yellow speech bubble ellipse */}
						<div className='absolute h-[310px] left-[50px] top-[80px] w-[318px]'>
							<div className='absolute inset-[0_0_-1.91%_-2.1%]'>
								<svg
									className='block size-full'
									fill='none'
									preserveAspectRatio='none'
									viewBox='0 0 437 427'
								>
									<defs>
										<filter
											colorInterpolationFilters='sRGB'
											filterUnits='userSpaceOnUse'
											height='427'
											id='filter0_d_1_66'
											width='437'
											x='0'
											y='0'
										>
											<feFlood
												floodOpacity='0'
												result='BackgroundImageFix'
											/>
											<feColorMatrix
												in='SourceAlpha'
												result='hardAlpha'
												type='matrix'
												values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
											/>
											<feOffset dx='-5' dy='4' />
											<feGaussianBlur stdDeviation='2' />
											<feComposite
												in2='hardAlpha'
												operator='out'
											/>
											<feColorMatrix
												type='matrix'
												values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
											/>
											<feBlend
												in2='BackgroundImageFix'
												mode='normal'
												result='effect1_dropShadow_1_66'
											/>
											<feBlend
												in='SourceGraphic'
												in2='effect1_dropShadow_1_66'
												mode='normal'
												result='shape'
											/>
										</filter>
									</defs>
									<ellipse
										cx='223'
										cy='209.5'
										fill='#FFDE00'
										rx='214'
										ry='209.5'
										stroke='black'
										strokeWidth='2'
										filter='url(#filter0_d_1_66)'
									/>
									<path
										d={svgPaths.p1702f600}
										stroke='black'
										strokeWidth='2'
										fill='none'
									/>
								</svg>
							</div>
						</div>

						{/* Small yellow decorative circle */}
						<div className='absolute left-[878px] size-[52px] top-[193px]'>
							<svg
								className='block size-full'
								fill='none'
								preserveAspectRatio='none'
								viewBox='0 0 70 70'
							>
								<circle
									cx='35'
									cy='35'
									fill='#FFDE00'
									r='34'
									stroke='black'
									strokeWidth='2'
								/>
							</svg>
						</div>

						{/* Heading */}
						<p
							className='absolute font-bold leading-normal left-[98px] text-[30px] whitespace-nowrap top-[175px]'
							style={{ color: COLORS.textBlack }}
						>
							Managed Office
						</p>

						{/* Subtitle */}
						<p
							className='absolute font-normal leading-normal left-[92px] text-[18px] whitespace-nowrap top-[245px]'
							style={{ color: COLORS.textBlack }}
						>
							Work where ideas spark fast.
						</p>

						{/* Feature cards */}
						<FeatureCard
							title='Innovation'
							subtitle='stands out'
							style={{
								left: "20px",
								top: "330px",
								width: "200px",
								height: "76px",
								padding: "16px",
							}}
						/>
						<FeatureCard
							title='Flexibility'
							subtitle='& Comfort'
							style={{
								left: "240px",
								top: "390px",
								width: "200px",
								height: "76px",
								padding: "16px",
							}}
						/>
						<FeatureCard
							title='Vibrant'
							subtitle='Community'
							style={{
								left: "460px",
								top: "450px",
								width: "200px",
								height: "76px",
								padding: "16px",
							}}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default IntroSection;
