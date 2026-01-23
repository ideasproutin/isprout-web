import React, { useLayoutEffect, useRef, useState } from "react";
import heroImage from "../../assets/meetingroom/meetingroom_herosection.png";
import MeetingRoomGlimpse from "./glimpse";
import WhyMeetingRoom from "./whymeetingrom";
import Locations from "../home/components/locations";
import Amenities from "../home/components/amenities";
import SpiceThings from "../managedoffice/spicethings";
import MeetingRoomFAQ from "./faq";
import FutureOfWork from "../home/components/futureofwork";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
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
			className='absolute bg-[#f4f3f8] content-stretch flex gap-[12px] items-start p-[16px] rounded-[24px] shadow-[0px_12px_32px_0px_rgba(0,0,0,0.15)] transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0px_16px_40px_0px_rgba(0,0,0,0.2)] cursor-pointer'
			style={style}
		>
			<Icon />
			<div className='flex flex-col items-start leading-[normal] not-italic relative shrink-0 text-left pr-2'>
				<p className='text-[#333] text-[18px] font-medium leading-tight'>
					{title}
				</p>
				<p className='text-[#909090] text-[14px] leading-tight'>
					{subtitle}
				</p>
			</div>
		</div>
	);
}

/** These are your "design canvas" dimensions */
const DESIGN_W = 1200;
const DESIGN_H = 680;

const MeetingRoomsIntro = () => {
	const wrapRef = useRef<HTMLDivElement | null>(null);
	const [scale, setScale] = useState(1);

	useLayoutEffect(() => {
		if (!wrapRef.current) return;

		const el = wrapRef.current;

		const update = () => {
			const available = el.clientWidth;
			if (!available) return;

			// Scale down only when needed (keeps desktop identical)
			const nextScale = Math.min(1, available / DESIGN_W);
			setScale(nextScale);
		};

		update();

		const ro = new ResizeObserver(update);
		ro.observe(el);

		return () => ro.disconnect();
	}, []);

	const scaledHeight = Math.round(DESIGN_H * scale);

	return (
		<div
			className='overflow-x-hidden'
			style={{ backgroundColor: COLORS.white }}
		>
			{/* HERO SECTION (Scaled Canvas) */}
			<section
				className='w-full overflow-x-hidden'
				style={{ backgroundColor: COLORS.white }}
			>
				<div
					ref={wrapRef}
					className='mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8'
					style={{
						paddingTop: 60,
						paddingBottom: 24,
					}}
				>
					{/* Keeps correct layout flow height */}
					<div
						className='relative w-full'
						style={{ height: scaledHeight }}
					>
						{/* The actual fixed-size canvas that we scale */}
						<div
							className='absolute left-0 top-0'
							style={{
								width: DESIGN_W,
								height: DESIGN_H,
								transform: `scale(${scale})`,
								transformOrigin: "top left",
							}}
						>
							<div className='relative w-full h-full'>
								{/* Black background ellipse with shadow */}
								<div className='absolute h-[640px] left-[320px] top-[-40px] w-[720px]'>
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

								{/* Meeting room image in circle */}
								<div className='absolute h-[610px] left-[340px] top-[-28px] w-[680px]'>
									<div className='w-full h-full rounded-[50%] overflow-hidden border-[0px] border-black'>
										<img
											alt='Modern meeting room with conference table'
											className='block max-w-none size-full object-cover'
											src={heroImage}
										/>
									</div>
								</div>

								{/* Yellow speech bubble ellipse */}
								<div className='absolute h-[360px] left-[50px] top-[120px] w-[370px]'>
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
								<div className='absolute left-[1000px] size-[64px] top-[250px]'>
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
									className='absolute font-bold leading-normal left-[98px] text-[36px] whitespace-nowrap top-[230px]'
									style={{ color: COLORS.textBlack }}
								>
									Meeting Rooms
								</p>

								{/* Subtitle */}
								<p
									className='absolute font-normal leading-normal left-[92px] text-[22px] whitespace-nowrap top-[310px]'
									style={{ color: COLORS.textBlack }}
								>
									Where Ideas Meet Excellence.
								</p>

								{/* Feature cards */}
								<FeatureCard
									title='Productive'
									subtitle='Focus-Driven'
									style={{
										left: "2%",
										top: "420px",
										padding: "12px",
									}}
								/>
								<FeatureCard
									title='Professional'
									subtitle='Client-Ready'
									style={{
										left: "22%",
										top: "490px",
										padding: "12px",
									}}
								/>
								<FeatureCard
									title='Flexible'
									subtitle='Hourly / Daily'
									style={{ left: "43%", top: "560px" }}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Rest of the page stays normal */}
			<MeetingRoomGlimpse />
			<WhyMeetingRoom />
			<Locations />
			<Amenities />
			<SpiceThings />
			<MeetingRoomFAQ />
			<FutureOfWork />
			<Footer />
			<ScrollToTop />
		</div>
	);
};

export default MeetingRoomsIntro;
