import award1 from "../../../assets/homepage/award (1).png";
import award2 from "../../../assets/homepage/award (2).png";
import award3 from "../../../assets/homepage/award (3).png";
import award4 from "../../../assets/homepage/award (4).png";
import award5 from "../../../assets/homepage/award (5).png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type AwardHexProps = {
	image: string;
	alt: string;
	sizeClass: string;
};

const hexClip = {
	clipPath: "polygon(50% 1%, 95% 25%, 95% 75%, 50% 99%, 5% 75%, 5% 25%)",
};

const staggerContainer = {
	hidden: { opacity: 1 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const awardItem = {
	hidden: {
		opacity: 0,
		y: 20,
		scale: 0.95,
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.55,
		},
	},
};

const AwardHex = ({ image, alt, sizeClass }: AwardHexProps) => {
	return (
		<motion.div
			variants={awardItem}
			whileHover={{
				scale: 1.05,
				y: -6,
				transition: {
					duration: 0.3,
					ease: "easeOut",
				},
			}}
			className={`${sizeClass} relative shrink-0 transform-gpu will-change-transform`}
		>
			<div className='h-full w-full transition-[filter] duration-300 ease-out [filter:drop-shadow(0_20px_40px_rgba(0,0,0,0.15))_drop-shadow(0_-8px_18px_rgba(0,0,0,0.08))_drop-shadow(0_0_10px_rgba(255,255,255,0.20))] hover:[filter:drop-shadow(0_26px_54px_rgba(0,0,0,0.22))_drop-shadow(0_-10px_24px_rgba(0,0,0,0.12))_drop-shadow(0_0_14px_rgba(255,255,255,0.32))]'>
				<div className='relative h-full w-full bg-white p-[5px]' style={hexClip}>
					<motion.div
						aria-hidden='true'
						className='pointer-events-none absolute inset-0 border border-white/55'
						style={hexClip}
						animate={{ opacity: [0.35, 0.5, 0.35] }}
						transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
					/>
					<div className='h-full w-full bg-black' style={hexClip}>
						<img
							src={image}
							alt={alt}
							className='h-full w-full object-contain'
							style={hexClip}
						/>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

const Awards = () => {
	const navigate = useNavigate();

	const hexSizeClass =
		"h-[86px] w-[90px] sm:h-[130px] sm:w-[136px] md:h-[175px] md:w-[184px] lg:h-[210px] lg:w-[220px]";

	const topRow = [
		{ image: award1, alt: "South Indian Business Awards" },
		{ image: award5, alt: "Realty Conclave Excellence Award" },	
		{ image: award3, alt: "Times Business Awards" },
	];

	const bottomRow = [
		{ image: award4, alt: "Outlook Business Spotlight Realty Awards" },
		{ image: award2, alt: "Women Leader Award" },
	];

	return (
		<section className='w-full bg-white px-4 pb-8 pt-6 sm:px-6 sm:pt-8 md:px-8 md:pt-10 lg:pt-12'>
			<div className='mx-auto max-w-7xl'>
				<div className='mb-8 flex justify-center sm:mb-10 md:mb-12'>
					<h2 className='text-center text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl'>
						Awards That Define Us
					</h2>
				</div>

				<p className='mx-auto mb-10 max-w-4xl px-4 text-center text-sm text-gray-700 sm:mb-14 sm:text-base md:mb-16 md:text-lg'>
					From workspace design to service excellence, iSprout&apos;s
					awards reflect the standards we strive for and the values we
					stand by.
				</p>

				<motion.div
					className='mx-auto flex max-w-6xl flex-col items-center gap-3 sm:gap-4 md:gap-5'
					variants={staggerContainer}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: false, amount: 0.2 }}
				>
					<div className='flex flex-nowrap items-start justify-center gap-2 sm:gap-4 md:gap-6'>
						{topRow.map((award) => (
							<AwardHex
								key={award.alt}
								image={award.image}
								alt={award.alt}
								sizeClass={hexSizeClass}
							/>
						))}
					</div>

					<div className='flex flex-nowrap items-start justify-center gap-4 sm:gap-8 md:gap-12'>
						{bottomRow.map((award) => (
							<AwardHex
								key={award.alt}
								image={award.image}
								alt={award.alt}
								sizeClass={hexSizeClass}
							/>
						))}
					</div>
					{/* View More Button */}
					<div className='flex justify-center'>
						<button
							onClick={() => navigate("/awards/")}
							className='px-10 py-3 sm:px-12 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:shadow-lg hover:opacity-90'
							style={{
								backgroundColor: "#FFDE00",
								color: "#000000",
								fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
							}}
						>
							View More
						</button>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default Awards;
