import careersData from "../../content/careersData.json";
import { useMetaTags } from "../../hooks/useMetaTags";
import Footer from "../../components/footer/footer";
import Jobs from "./jobs";
import InfoStrip from "./info-strip";
import LifeAtISprout from "./lifeatisprout";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { COLORS } from "../../helpers/constants/Colors";
import { useCareers } from "../../hooks/useCareers";

const CareersIntro = () => {
	useMetaTags({
		title: "Join iSprout: Shape the Future of Workspaces | Careers",
		description: "Build your career with iSprout, a leader in innovative coworking and managed office spaces. Explore exciting opportunities in workspace management."
	});

	// Fetch careers data from API
	const { data: apiCareersData, isLoading } = useCareers();

	// Use API data if available, otherwise fall back to local JSON
	const careersDataSource = apiCareersData || careersData;
	const heroVideo = careersDataSource.careersIntroData.heroVideo;

	if (isLoading) {
		return (
			<div
				className='min-h-screen flex items-center justify-center'
				style={{ backgroundColor: COLORS.white }}
			>
				<p className='text-xl' style={{ color: COLORS.textGray }}>
					Loading careers page...
				</p>
			</div>
		);
	}

	return (
		<div className='min-h-screen' style={{ backgroundColor: COLORS.white }}>
			{/* Hero Section with Video */}
			<section className='relative w-full h-[85vh] flex items-center justify-end overflow-hidden mt-20 sm:mt-16 md:mt-20 lg:mt-24'>
				{/* Video Background */}
				<div className='absolute inset-0 w-full h-full'>
					<video
						autoPlay
						loop
						muted
						playsInline
						className='absolute inset-0 w-full h-full object-cover object-center'
					>
						<source src={heroVideo} type='video/mp4' />
						Your browser does not support the video tag.
					</video>
				</div>

				{/* Dark Overlay */}
				<div className='absolute inset-0 bg-black opacity-30'></div>
				{/* Bottom Left Title */}
				<div className='absolute bottom-8 sm:bottom-12 md:bottom-16 left-6 sm:left-8 md:left-12 lg:left-16 z-10'>
					<h1
						className='text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-normal'
						style={{ fontFamily: "Outfit, sans-serif" }}
					>
						Careers At iSprout
					</h1>
				</div>
				{/* Hero Text - Right Side */}
				<div className='relative z-10 max-w-xl lg:max-w-2xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8'>
					<div className='mb-6 sm:mb-8 md:mb-10'>
						<h2
							className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase leading-tight mb-4 sm:mb-6'
							style={{ fontFamily: "Outfit, sans-serif" }}
						>
							<div className='mb-1 sm:mb-2 text-white'>COME BUILD</div>
							<div
								className='mb-1 sm:mb-2'
								style={{
									fontFamily: "Outfit, sans-serif",
									color: "#FFDE00",
								}}
							>
								FUTURE
							</div>
							<div className='text-white'>WITH US!</div>
						</h2>
					</div>

					<div className='space-y-3 sm:space-y-4'>
						<p
							className='text-sm sm:text-base md:text-lg lg:text-xl text-white leading-relaxed'
							style={{ fontFamily: "Outfit, sans-serif" }}
						>
							We are team iSprout. we're a bunch of dreamers and
							doers who believe that workspaces should be anything
							but not boring. We're on a mission to create offices
							that people actually look forward to come to every
							day.
						</p>
					</div>
				</div>
			</section>

			{/* Info Strip - Stats Section */}
			<InfoStrip />

			{/* Jobs Section */}
			<section className='px-4 sm:px-6 md:px-8 lg:px-16 py-8 sm:py-10 md:py-12 lg:py-16'>
				<div className='max-w-7xl mx-auto'>
					<Jobs />
				</div>
			</section>

			{/* Life At iSprout Section */}
			<LifeAtISprout />

			{/* Footer */}
			<Footer />

			{/* Scroll to Top Button */}
			<ScrollToTop />
		</div>
	);
};

export default CareersIntro;
