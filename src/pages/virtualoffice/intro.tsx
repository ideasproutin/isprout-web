import React, { useLayoutEffect, useRef, useState } from "react";
import { User, Mail, Phone, MapPin, Building2 } from "lucide-react";
import heroImage from "../../assets/managedoffice/managedoffice1.png";
import formImage from "../../assets/managedoffice/managedoffice2.png";
import WhyVirtualOffice from "./whyvirtualoffice";
import Locations from "../home/components/locations";
import VirtualOfficeProcess from "./virtualoffice_process";
import FutureOfWork from "../home/components/futureofwork";
import Footer from "../../components/footer/footer";
import { COLORS } from "../../helpers/constants/Colors";
import { FloatingInput } from "../contactus/FloatingLabelInput";

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

// ---- SAME "SCALED CANVAS" METHOD ----
const DESIGN_W = 1000;
const DESIGN_H = 580;

const VirtualOfficeIntro = () => {
	const wrapRef = useRef<HTMLDivElement | null>(null);
	const [scale, setScale] = useState(1);

	useLayoutEffect(() => {
		if (!wrapRef.current) return;

		const el = wrapRef.current;

		const update = () => {
			const available = el.clientWidth;
			if (!available) return;

			// scale down only (desktop stays identical)
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
		<div className='min-h-screen bg-white'>
			{/* HERO SECTION (Scaled Canvas Responsive, No UI Change) */}
			<section className='bg-white w-full'>
				<div
					className='w-full flex items-start justify-center pt-10'
					style={{ backgroundColor: COLORS.white }}
				>
					{/* wrapper controls available width */}
					<div
						ref={wrapRef}
						className='w-full max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8'
					>
						{/* preserves flow height so next section doesn't overlap */}
						<div
							className='relative w-full'
							style={{ height: scaledHeight }}
						>
							{/* fixed-size canvas that scales */}
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
														<feOffset
															dx='4'
															dy='10'
														/>
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

									{/* Virtual office image in circle with border */}
									<div className='absolute h-[530px] left-[302px] top-[-28px] w-[590px]'>
										<div className='w-full h-full rounded-[50%] overflow-hidden border-[2px] border-black'>
											<img
												alt='Modern office workspace with laptop'
												className='block max-w-none size-full object-cover'
												src={heroImage}
											/>
										</div>
									</div>

									{/* Yellow speech bubble ellipse with shadow and border */}
									<div className='absolute h-[310px] left-[50px] top-[105px] w-[318px]'>
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
														<feOffset
															dx='-5'
															dy='4'
														/>
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
									<div className='absolute left-[880px] size-[52px] top-[218px]'>
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

									{/* Virtual Office heading */}
									<p
										className='absolute font-bold leading-normal left-[98px] text-[30px] whitespace-nowrap top-[200px]'
										style={{ color: COLORS.textBlack }}
									>
										Virtual Office
									</p>

									{/* Subtitle */}
									<p
										className='absolute font-normal leading-normal left-[92px] text-[18px] whitespace-nowrap top-[270px]'
										style={{ color: COLORS.textBlack }}
									>
										Your Business, Anywhere. Instantly
									</p>

									{/* Feature cards */}
									<FeatureCard
										title='Flexible'
										subtitle='Cost-Effective'
										style={{
											left: "2%",
											top: "360px",
											width: "200px",
											height: "76px",
											padding: "16px",
										}}
									/>
									<FeatureCard
										title='Secure'
										subtitle='Verified Handling'
										style={{
											left: "24%",
											top: "420px",
											width: "200px",
											height: "76px",
											padding: "16px",
										}}
									/>
									<FeatureCard
										title='Hassle-Free'
										subtitle='Quick Setup'
										style={{
											left: "46%",
											top: "480px",
											width: "200px",
											height: "76px",
											padding: "16px",
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* BELOW CONTENT (UNCHANGED) */}
			<section className='py-10 sm:py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-16 bg-white'>
				<div className='max-w-7xl mx-auto'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-start'>
						{/* LEFT CONTENT */}
						<div className='flex flex-col items-start'>
							<h2
								className='text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6'
								style={{
									fontFamily: "Outfit, sans-serif",
									color: "#00275c",
								}}
							>
								<span>Set Up Your </span>
								<span style={{ color: "#FFDE00" }}>
									Virtual Office
								</span>
								<span> Today</span>
							</h2>

							<p
								className='text-base sm:text-lg md:text-xl mb-6 sm:mb-8'
								style={{ fontFamily: "Outfit, sans-serif" }}
							>
								Share your details, choose your city, and our team will help you set up a premium business address with professional support services. 
							</p>

							<div className='rounded-xl overflow-hidden w-full max-w-md'>
								<img
									alt='Virtual Office Space'
									className='w-full h-auto object-cover max-h-[600px]'
									src={formImage}
								/>
							</div>
						</div>

						{/* FORM */}
						<div className='bg-white p-5 sm:p-6 md:p-8 rounded-xl w-full lg:mt-[120px] flex flex-col'>
							<form className='space-y-5'>
								<FloatingInput
									label="Full Name"
									value=""
									onChange={() => {}}
									icon={<User size={18} />}
									required
								/>

								<FloatingInput
									label="Your Email"
									type="email"
									value=""
									onChange={() => {}}
									icon={<Mail size={18} />}
									required
								/>

								<FloatingInput
									label="Phone Number"
									type="tel"
									value=""
									onChange={() => {}}
									icon={<Phone size={18} />}
									required
								/>

								<FloatingInput
									label="Preferred City"
									value=""
									onChange={() => {}}
									icon={<MapPin size={18} />}
									required
								/>

								<FloatingInput
									label="Company Name"
									value=""
									onChange={() => {}}
									icon={<Building2 size={18} />}
									required
								/>

								<div className='flex items-start gap-3'>
									<input
										type='checkbox'
										id='terms'
										className='mt-1 w-5 h-5'
										required
									/>
									<label
										htmlFor='terms'
										className='text-sm italic'
										style={{
											fontFamily: "Outfit, sans-serif",
										}}
									>
										I agree to the{" "}
										<span className='underline'>
											terms & policy
										</span>
									</label>
								</div>

								<button
									type='submit'
									className='w-full sm:w-auto px-10 sm:px-12 py-3 rounded-xl transition-colors text-base font-medium'
									style={{
										backgroundColor: "#FFDE00",
										color: "#00275c",
										fontFamily: "Outfit, sans-serif",
									}}
									onMouseEnter={(e) =>
										(e.currentTarget.style.backgroundColor =
											"#e6c900")
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.backgroundColor =
											"#FFDE00")
									}
								>
									Submit
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>

			<WhyVirtualOffice />
			<Locations />
			<VirtualOfficeProcess />
			<FutureOfWork />
			<Footer />
		</div>
	);
};

export default VirtualOfficeIntro;
