import { useParams } from "react-router-dom";
import newsImage from "../../assets/news/news_herosection.png";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import newsData from "../../content/News.json";
import { useNews } from "../../hooks/useNews";
import { COLORS } from "../../helpers/constants/Colors";

const News = () => {
	// Get article ID from URL params
	const { id } = useParams<{ id: string }>();
	const articleIndex = id ? parseInt(id) : 0;

	// Fetch news data from API
	const { data: apiNewsData, isLoading } = useNews();

	// Use API data if available, otherwise fall back to local JSON
	const newsDataSource = apiNewsData || newsData;
	const article = newsDataSource[articleIndex] || newsDataSource[0] || {};

	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-white'>
				<p className='text-xl' style={{ color: COLORS.textGray }}>
					Loading news article...
				</p>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-white'>
			{/* Hero Section with NEWS Badge - Full Width, extends behind navbar */}
			<section className='relative -mt-20 w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-cover bg-center px-0'>
				<div className='w-full h-full relative'>
					{/* Main News Image */}
					<img
						src={article.head_image || newsImage}
						alt='iSprout News'
						className='w-full h-full object-cover'
					/>

					{/* NEWS Badge Overlay - Bottom Left */}
					<div className='absolute bottom-8 left-4 md:left-8 lg:left-16 z-10'>
						<h2
							className='text-4xl md:text-5xl lg:text-6xl font-bold text-white'
							style={{
								fontFamily: "Outfit, sans-serif",
								textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
							}}
						>
							NEWS
						</h2>
					</div>
				</div>
			</section>

			{/* News Content Section */}
			<section className='py-8 md:py-12 px-4 md:px-8 lg:px-16'>
				<div className='max-w-6xl mx-auto'>
					{/* News Heading */}
					<h1
						className='text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: "#000000",
						}}
					>
						{article.title}
					</h1>

					{/* News Content */}
					<div
						className='space-y-6 text-base md:text-lg leading-relaxed'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: "#333333",
						}}
					>
						{(article.paragraph || article.paragraphs || []).map(
							(para: string, index: number) => (
								<p key={index}>{para}</p>
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
