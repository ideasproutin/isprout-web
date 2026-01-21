import { homePageImages } from "../../../assets";
import { Link } from "react-router-dom";

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
				className='relative w-full h-[268px] rounded-[10px] backdrop-blur-[21px] px-[27px] pt-16 pb-6 flex flex-col justify-between'
				style={{
					backgroundImage:
						"url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 400 268\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(10.563 32.256 -60.656 11.142 188.74 -1.675)\\'><stop stop-color=\\'rgba(255,255,255,0.4)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>')",
				}}
			>
				<p className='text-white text-[24px] leading-8'>
					{description}
				</p>

				<div className='flex justify-center mt-4'>
					<Link
						to='/spotlight'
						className='bg-[rgba(254,255,222,0.32)] rounded-[10px] px-[26px] py-[13px] inline-block no-underline'
					>
						<p
							className='text-white text-[14px] leading-3.5 whitespace-nowrap'
							style={{
								textShadow: "0px 4px 4px rgba(0,0,0,0.25)",
							}}
						>
							Read more →
						</p>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default function Spotlight() {
	const testimonials = [
		{
			logo: homePageImages.dellLogo,
			company: "Dell",
			description:
				"Dell — Growing stronger with flexible workspace solutions powered by iSprout.",
		},
		{
			logo: homePageImages.adobeLogo,
			company: "Adobe",
			description:
				"Adobe — Scaling creative teams efficiently through iSprout's modern workspace solutions.",
		},
	];

	return (
		<div className='relative w-full'>
			{/* Blue background section */}
			<div className='bg-[#00275c] px-4 pt-10 pb-[60px]'>
				{/* Yellow heading banner - centered on page */}
				<div className='flex justify-center pb-20'>
					<div className='bg-[#ffde00] border border-[rgba(0,0,0,0.12)] border-solid rounded-tl-[40px] rounded-br-[40px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] px-[65px] py-[17.5px]'>
						<h2 className='text-[48px] leading-normal text-[rgba(0,0,0,0.83)] whitespace-nowrap'>
							In the Spotlight
						</h2>
					</div>
				</div>

				<div className='max-w-7xl mx-auto pb-[60px]'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-x-[154px] gap-y-[200px] lg:gap-y-0'>
						{testimonials.map((testimonial, index) => (
							<TestimonialCard
								key={index}
								logo={testimonial.logo}
								company={testimonial.company}
								description={testimonial.description}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
