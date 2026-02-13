import { Link } from "react-router-dom";
import { useMetaTags } from "../../hooks/useMetaTags";
import newsHeroImage from "../../assets/news/news_herosection.png";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { COLORS } from "../../helpers/constants/Colors";
import { useNews } from "../../hooks/useNews";

function IntroText() {
	return (
		<div className='w-full px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 lg:py-10 flex justify-center'>
			<div className='max-w-[900px] mx-auto'>
				<p
					className="font-['Outfit',sans-serif] font-semibold text-lg sm:text-xl md:text-2xl lg:text-[32px] leading-snug text-center sm:text-left"
					style={{ color: COLORS.textBlack }}
				></p>
			</div>
		</div>
	);
}

function NewsArticle({
	url,
	date,
	title,
	image,
	imagePosition = "left",
}: {
	url: string;
	date: string;
	title: string;
	image: string;
	imagePosition?: "left" | "right";
}) {
	return (
		<div
			className={`flex flex-col ${imagePosition === "right" ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-6 sm:gap-8 lg:gap-16 xl:gap-20 relative px-4 sm:px-0`}
		>
			{/* Blue background element that creates an even border around the image */}
			<div className={`relative shrink-0 w-full sm:w-auto`}>
				{/* Blue border background */}
				<div
					className={`w-full sm:w-[calc(100vw-3rem)] lg:w-[714px] h-[280px] sm:h-[330px] md:h-[381px] lg:h-[481px] ${imagePosition === "left" ? "rounded-tr-[120px] rounded-br-[120px] sm:rounded-tr-[165px] sm:rounded-br-[165px] md:rounded-tr-[200px] md:rounded-br-[200px] lg:rounded-tr-[400px] lg:rounded-br-[400px]" : "rounded-tl-[120px] rounded-bl-[120px] sm:rounded-tl-[165px] sm:rounded-bl-[165px] md:rounded-tl-[200px] md:rounded-bl-[200px] lg:rounded-tl-[400px] lg:rounded-bl-[400px]"}`}
					style={{ backgroundColor: COLORS.brandBlue }}
				/>

				{/* Image positioned on top of blue element with even spacing */}
				<div
					className={`absolute top-3 sm:top-[15px] bottom-3 sm:bottom-[15px] ${imagePosition === "left" ? "left-3 sm:left-[15px] lg:left-[19px]" : "right-3 sm:right-[15px] lg:right-[19px]"} w-[calc(100%-24px)] sm:w-[calc(100%-30px)] lg:w-[676px] ${imagePosition === "left" ? "rounded-tr-[110px] rounded-br-[110px] sm:rounded-tr-[150px] sm:rounded-br-[150px] md:rounded-tr-[185px] md:rounded-br-[185px] lg:rounded-tr-[370px] lg:rounded-br-[370px]" : "rounded-tl-[110px] rounded-bl-[110px] sm:rounded-tl-[150px] sm:rounded-bl-[150px] md:rounded-tl-[185px] md:rounded-bl-[185px] lg:rounded-tl-[370px] lg:rounded-bl-[370px]"} overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.15)] sm:shadow-[0px_8px_4px_0px_rgba(0,0,0,0.25)]`}
				>
					<img
						src={image}
						alt={title}
						className='w-full h-full object-cover'
					/>
				</div>
			</div>

			<div
				className={`flex-1 ${imagePosition === "right" ? "px-4 sm:px-6 lg:pl-8" : "px-4 sm:px-6 lg:px-0"} relative z-10 flex flex-col items-center text-center`}
			>
				<p
					className="font-['Outfit',sans-serif] font-semibold text-base sm:text-lg md:text-[20px] capitalize mb-3 sm:mb-4"
					style={{ color: "#a4a4a4" }}
				>
					{date}
				</p>
				<h3
					className="font-['Outfit',sans-serif] font-semibold text-xl sm:text-2xl md:text-3xl lg:text-[32px] capitalize leading-tight mb-4 sm:mb-6 max-w-[453px] px-2 sm:px-0"
					style={{ color: COLORS.textBlack }}
				>
					{title}
				</h3>
				<Link to={`/news/article/${url}`}>
					<button
						className='border-2 rounded-lg sm:rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] px-4 sm:px-6 py-2.5 sm:py-3 inline-flex items-center gap-2 hover:bg-white transition-all duration-300 ease-in-out'
						style={{
							backgroundColor: COLORS.brandYellow,
							borderColor: COLORS.brandYellow,
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.borderColor =
								COLORS.brandYellow;
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.borderColor =
								COLORS.brandYellow;
						}}
					>
						<span
							className="font-['Outfit',sans-serif] font-semibold text-base sm:text-lg md:text-[20px] capitalize whitespace-nowrap"
							style={{ color: COLORS.brandBlue }}
						>
							read Article →
						</span>
					</button>
				</Link>
			</div>
		</div>
	);
}

function NewsSection() {
	// Fetch news data from API only
	const { data: newsDataSource, isLoading, isError } = useNews();

	if (isLoading) {
		return (
			<section className='w-full px-4 py-16 flex justify-center'>
				<div className='flex items-center justify-center h-64'>
					<p className='text-xl' style={{ color: COLORS.textGray }}>
						Loading news...
					</p>
				</div>
			</section>
		);
	}

	if (isError || !newsDataSource) {
		return (
			<section className='w-full px-4 py-16 flex justify-center'>
				<div className='flex items-center justify-center h-64'>
					<p className='text-xl' style={{ color: COLORS.textGray }}>
						Unable to load news. Please try again later.
					</p>
				</div>
			</section>
		);
	}

	return (
		<section className='w-full px-0 py-8 sm:py-12 md:py-16 lg:py-24 space-y-16 sm:space-y-24 md:space-y-32 lg:space-y-48'>
			{newsDataSource.map(
				(
					article: {
						title: string;
						head_image: string;
						date?: string;
						url: string;
					},
					index: number,
				) => (
					<NewsArticle
						key={article.url || index}
						url={article.url}
						date={article.date || "Recent"}
						title={article.title}
						image={article.head_image}
						imagePosition={index % 2 === 0 ? "left" : "right"}
					/>
				),
			)}
		</section>
	);
}

const NewsHomepage = () => {
	useMetaTags({
		title: "iSprout News | Coworking & Office Space Updates",
		description:
			"Get the latest iSprout news on coworking centres, office launches, workspace expansions, and managed office developments.",
	});

	return (
		<div className='min-h-screen' style={{ backgroundColor: COLORS.white }}>
			{/* Hero Section - Full Width */}
			<section className='relative mt-16 sm:mt-20 md:mt-24 lg:mt-25 px-0'>
				<div className='w-full'>
					<div className='relative w-full'>
						<img
							src={newsHeroImage}
							alt='iSprout News'
							className='w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] object-cover'
						/>

						{/* NEWS Text Overlay - Bottom Left */}
						<div className='absolute bottom-6 sm:bottom-8 md:bottom-10 lg:bottom-12 left-4 sm:left-6 md:left-8 lg:left-16 z-10'>
							<h1
								className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-1 sm:mb-2'
								style={{
									fontFamily: "Outfit, sans-serif",
									textShadow:
										"2px 2px 4px rgba(0, 0, 0, 0.5)",
								}}
							>
								NEWS
							</h1>
							<p
								className='text-base sm:text-lg md:text-xl lg:text-2xl text-white'
								style={{
									fontFamily: "Outfit, sans-serif",
									textShadow:
										"2px 2px 4px rgba(0, 0, 0, 0.5)",
								}}
							>
								All The Buzz From iSprout
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Intro Text */}
			<IntroText />

			{/* News Section */}
			<NewsSection />

			{/* Footer */}
			<Footer />
			<ScrollToTop />
		</div>
	);
};

export default NewsHomepage;
