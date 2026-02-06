import newsImage from "../../assets/news/news_herosection.png";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { useNews } from "../../hooks/useNews";
import { useParams } from "react-router-dom";
import { COLORS } from "../../helpers/constants/Colors";

const News = () => {
	const { id } = useParams();
	const { data: newsData, isLoading, isError } = useNews();

	const articleIndex = id ? parseInt(id) : 0;
	const article = newsData?.[articleIndex] || {};

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
			<section className='relative px-0 mt-20'>
				<div className='w-full'>
					{/* Main News Image - Full Width Hero */}
					<div className='relative w-full'>
						<img
							src={article.head_image || newsImage}
							alt='iSprout News'
							className='w-full object-absolute'
						/>

						{/* NEWS Badge Overlay - Bottom Left */}
						<div className='absolute bottom-8 left-4 md:left-8 lg:left-16 z-10'>
							<h2
								className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2'
								style={{
									fontFamily: "Outfit, sans-serif",
									textShadow:
										"2px 2px 4px rgba(0, 0, 0, 0.5)",
								}}
							>
								NEWS
							</h2>
							<div className='h-1 md:h-1.5 w-20 md:w-24 bg-black'></div>
						</div>
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
						{article.paragraph?.map(
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
