import newsImage from "../../assets/news/news_herosection.png";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { useNews } from "../../hooks/useNews";
import { useParams } from "react-router-dom";
import { useMetaTags } from "../../hooks/useMetaTags";
import { COLORS } from "../../helpers/constants/Colors";

interface NewsArticle {
	title?: string;
	description?: string;
	url?: string;
	hero_image?: string;
	paragraph?: string[];
}

const News = () => {
	const { url } = useParams();
	const { data: newsData, isLoading, isError } = useNews();

	// Find article by URL slug
	const article: NewsArticle = newsData?.find((item: NewsArticle) => item.url === url) || {};

	// Dynamic meta tags for the article
	useMetaTags({
		title: article.title
			? `${article.title} | iSprout News`
			: "iSprout News",
		description:
			article.description ||
			"Get the latest iSprout news on coworking centres, office launches, workspace expansions, and managed office developments.",
		ogTitle: article.title || "iSprout News",
		ogDescription:
			article.description ||
			"Stay updated with the latest news from iSprout",
	});

	if (isLoading) {
		return (
			<div className='min-h-screen bg-white flex items-center justify-center'>
				<p className='text-xl' style={{ color: COLORS.textGray }}>
					Loading article...
				</p>
			</div>
		);
	}

	if (isError || !article.title) {
		return (
			<div className='min-h-screen bg-white flex items-center justify-center'>
				<p className='text-xl' style={{ color: COLORS.textGray }}>
					Unable to load article. Please try again later.
				</p>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-white'>
			{/* Hero Section with NEWS Badge - Full Width, extends behind navbar */}
			<section className='relative px-0 mt-16 md:mt-20'>
				<div className='w-full'>
					{/* Main News Image - Full Width Hero */}
					<div className='relative w-full h-[280px] sm:h-[350px] md:h-[450px] lg:h-[550px]'>
						<img
							src={article.hero_image || newsImage}
							alt='iSprout News'
							className='w-full h-full object-cover'
						/>

						{/* NEWS Badge Overlay - Bottom Left */}
						<div className='absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 lg:left-16 z-10'>
							<h2
								className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-1 sm:mb-2'
								style={{
									fontFamily: "Outfit, sans-serif",
									textShadow:
										"2px 2px 4px rgba(0, 0, 0, 0.5)",
								}}
							>
								NEWS
							</h2>
							<div className='h-0.5 sm:h-1 md:h-1.5 w-16 sm:w-20 md:w-32 lg:w-44 bg-black'></div>
						</div>
					</div>
				</div>
			</section>

			{/* News Content Section */}
			<section className='py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-16'>
				<div className='max-w-4xl lg:max-w-6xl mx-auto'>
					{/* News Heading */}
					<h1
						className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: "#000000",
							fontSize: "clamp(1.5rem, 4vw, 3rem)",
						}}
					>
						{article.title}
					</h1>

					{/* News Content */}
					<div
						className='space-y-4 sm:space-y-5 md:space-y-6 text-sm sm:text-base md:text-lg leading-relaxed'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: "#333333",
						}}
					>
						{article.paragraph?.map(
							(para: string, index: number) => (
								<p
									key={index}
									className='text-justify sm:text-left'
								>
									{para}
								</p>
							),
						)}
					</div>
				</div>
			</section>

			{/* Footer */}
			<Footer />
			<ScrollToTop />
		</div>
	);
};

export default News;
