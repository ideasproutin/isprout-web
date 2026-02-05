import { useState, useEffect } from "react";
import { COLORS } from "../../helpers/constants/Colors";
// import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

import { awardsPageContent } from "../../content/awards";



// Import award images
import managedOfficeBrand from "../../assets/awards_achievements/managedofficebrand.png";
import managedOfficeBrandImg from "../../assets/awards_achievements/managedofficebrand-img.jpg";
import outlookSpotlight from "../../assets/awards_achievements/outlookbusinessspotlight.png";
import outlookSpotlightImg from "../../assets/awards_achievements/outlookbusinessspotlight-img.jpg";
import sibaAward from "../../assets/awards_achievements/SIBA.png";
import sibaAwardImg from "../../assets/awards_achievements/SIBA-img.jpg";
import timesBusinessAward from "../../assets/awards_achievements/timesbusiness.png";
import timesBusinessAwardImg from "../../assets/awards_achievements/timesbusinessaward-img.jpg";
import womenLeaderAward from "../../assets/awards_achievements/womenleader.png";
import womenLeaderAwardImg from "../../assets/awards_achievements/womenleader-img.jpg";

interface Award {
	id: number;
	title: string;
	description: string;
	year: string;
	mainImage: string;
	thumbnailImage: string;
}

// Map image paths to imported images
const imageMap: { [key: string]: string } = {
	"/src/assets/awards_achievements/managedofficebrand.png": managedOfficeBrand,
	"/src/assets/awards_achievements/managedofficebrand-img.jpg": managedOfficeBrandImg,
	"/src/assets/awards_achievements/outlookbusinessspotlight.png": outlookSpotlight,
	"/src/assets/awards_achievements/outlookbusinessspotlight-img.jpg": outlookSpotlightImg,
	"/src/assets/awards_achievements/SIBA.png": sibaAward,
	"/src/assets/awards_achievements/SIBA-img.jpg": sibaAwardImg,
	"/src/assets/awards_achievements/timesbusiness.png": timesBusinessAward,
	"/src/assets/awards_achievements/timesbusinessaward-img.jpg": timesBusinessAwardImg,
	"/src/assets/awards_achievements/womenleader.png": womenLeaderAward,
	"/src/assets/awards_achievements/womenleader-img.jpg": womenLeaderAwardImg,
};

// Transform awards data with actual imported images
const awardsData: Award[] = awardsPageContent.awards.map((award) => ({
	...award,
	mainImage: imageMap[award.mainImage] || award.mainImage,
	thumbnailImage: imageMap[award.thumbnailImage] || award.thumbnailImage,
}));

interface AwardCardProps {
	award: Award;
}

const AwardCard: React.FC<AwardCardProps> = ({ award }) => {
	const [showMainImage, setShowMainImage] = useState(true);

	useEffect(() => {
		const interval = setInterval(() => {
			setShowMainImage((prev) => !prev);
		}, 3000); // Switch every 3 seconds

		return () => clearInterval(interval);
	}, []);

	return (
		<div className='my-3 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 shrink-0 w-[280px] sm:w-[320px] md:w-[350px] mx-4 sm:mx-3'>
			{/* Award Image */}
			<div className='relative h-60 sm:h-[260px] overflow-hidden bg-gray-100'>
				{/* Main Image */}
				<img
					src={award.mainImage}
					alt={award.title}
					className='absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ease-in-out'
					style={{
						opacity: showMainImage ? 1 : 0,
					}}
				/>
				{/* Thumbnail Image */}
				<img
					src={award.thumbnailImage}
					alt={award.title}
					className='absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ease-in-out'
					style={{
						opacity: showMainImage ? 0 : 1,
					}}
				/>
			</div>

			{/* Card Content */}
			<div className='p-6 sm:p-6'>
				{/* Title */}
				<h3
					className='text-lg sm:text-xl font-bold mb-3 min-h-14'
					style={{
						fontFamily: "Outfit, sans-serif",
						color: COLORS.brandBlue,
					}}
				>
					{award.title}
				</h3>

				{/* Year Badge */}
				<div className='mb-4'>
					<span
						className='inline-block px-4 py-1.5 rounded-full text-sm font-semibold'
						style={{
							backgroundColor: COLORS.brandBlue,
							color: "white",
							fontFamily: "Outfit, sans-serif",
						}}
					>
						{award.year}
					</span>
				</div>

				{/* Description */}
				<p
					className='text-sm leading-relaxed min-h-20'
					style={{
						fontFamily: "Outfit, sans-serif",
						color: COLORS.textGray,
					}}
				>
					{award.description}
				</p>
			</div>
		</div>
	);
};

const Awards = () => {
	// Duplicate awards for seamless infinite scroll
	const duplicatedAwards = [...awardsData, ...awardsData];

	return (
		<>
			<style>{`
				@keyframes scroll-left {
					0% {
						transform: translateX(0);
					}
					100% {
						transform: translateX(-50%);
					}
				}

				.animate-scroll-left {
					animation: scroll-left 40s linear infinite;
				}

				.scroll-container:hover .animate-scroll-left {
					animation-play-state: paused;
				}
			`}</style>

			<div className='min-h-screen' style={{ backgroundColor: "white" }}>
				{/* Hero Section */}
				<section className='py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 md:px-8'>
					<div className='max-w-7xl mx-auto'>
						{/* Heading */}
						<div className='text-center mb-12 sm:mb-16 md:mb-20'>
							<h1
								className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6'
								style={{
									fontFamily: "Otomanopee One, sans-serif",
									color: COLORS.brandBlue,
								}}
							>
								{awardsPageContent.heading}
							</h1>
							<p
								className='text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto px-4'
								style={{
									fontFamily: "Outfit, sans-serif",
									color: COLORS.textGray,
								}}
							>
								{awardsPageContent.subheading}
							</p>
						</div>

						{/* Scrolling Awards Container */}
					<div className='relative mb-4'>
							{/* Scrolling Container */}
							<div className='scroll-container overflow-x-hidden overflow-y-visible flex items-start'>
								<div className='flex animate-scroll-left'>
									{duplicatedAwards.map((award, index) => (
										<AwardCard
											key={`award-${index}`}
											award={award}
										/>
									))}
								</div>
							</div>
						</div>
					</div>
				</section>

				

				{/* <Footer /> */}
				<ScrollToTop />
			</div>
		</>
	);
};

export default Awards;
