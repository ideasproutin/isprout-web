import newsImage from "../../assets/news/news_herosection.png";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const News = () => {
	return (
		<div className='min-h-screen bg-white'>
			{/* Hero Section with NEWS Badge - Full Width, extends behind navbar */}
			<section className='relative -mt-20 px-0'>
				<div className='w-full'>
					{/* Main News Image - Full Width Hero */}
					<div className='relative w-full'>
						<img
							src={newsImage}
							alt='iSprout GCC Market Event'
							className='w-full h-auto object-cover'
						/>

						{/* NEWS Badge Overlay - Bottom Left */}
						<div className='absolute bottom-8 left-4 md:left-8 lg:left-16 z-10'>
							<h2
								className='text-4xl md:text-5xl lg:text-6xl font-bold text-white'
								style={{
									fontFamily: "Outfit, sans-serif",
									textShadow:
										"2px 2px 4px rgba(0, 0, 0, 0.5)",
								}}
							>
								NEWS
							</h2>
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
						iSprout Strengthens GCC Market Presence With Rollout Of
						Signature Workspaces And GCCone Offering
					</h1>

					{/* News Content */}
					<div
						className='space-y-6 text-base md:text-lg leading-relaxed'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: "#333333",
						}}
					>
						<p>
							On June 9, key stakeholders from across the Global
							Capability Centers (GCC) value chain came together
							for the GCC Ecosystem Leaders Conclave. iSprout, one
							of India's fastest-growing workplace solution
							providers, hosted the event. Senior government
							officials, business veterans, GCC leadership teams,
							and service enablers from the legal, talent, real
							estate, and finance verticals attended the event. It
							acted as a forum for strategic knowledge-sharing and
							collaboration.
						</p>

						<p>
							Kartik Ramakrishnan, a partner at KPMG, gave a
							powerful presentation to kick off the summit,
							detailing the dynamic development and future course
							of the GCC scene in India. Following his
							observations, Telangana's Special Chief Secretary
							Jayesh Ranjan delivered a powerful speech. He
							highlighted the state's strong infrastructure and
							digital preparedness to meet the expanding needs of
							international businesses establishing offices in
							India.
						</p>

						<p>
							A powerful panel discussion was led by industry
							titans Kris Gopalakrishnan and Shakti Sagar. They
							examined the strategic changes in the GCC operating
							model and the emergence of India as a major global
							innovation and delivery hub. Operating heads of GCCs
							and ecosystem partners convened for a second panel
							to discuss issues and new approaches in fields like
							compliance, real estate, and talent acquisition.
						</p>

						<p>
							At the heart of the event were two significant
							announcements from iSprout that demonstrate its
							strong commitment to the GCC industry. The first was
							the introduction of iSprout Signature, a high-end,
							move-in-ready workspace series designed to meet GCC
							standards. For mid-to-large GCC companies seeking
							plug-and-play flexibility and long-term value,
							iSprout Signature offers a luxurious design and
							carefully chosen fixtures. Its strong emphasis on
							enterprise-grade experience is intended to raise
							overall workplace standards.
						</p>

						<p>
							The second major reveal was GCCXprss, GCCXprss, a
							unified platform designed to streamline and expedite
							the setup and scaling of GCCs in India. GCCXprss
							provides integrated access to operational
							infrastructure, talent acquisition services,
							workplace solutions, and compliance assistance. All
							of this is offered under one roof for greater
							convenience and efficiency. With this platform,
							iSprout hopes to close a significant market gap by
							providing mid-market GCC companies with a smooth,
							comprehensive starting point for their India
							adventure.
						</p>

						<p>
							Commenting on the twin launches, the iSprout
							leadership stated that GCCs are now innovation
							engines rather than merely cost centres. iSprout is
							establishing itself as an ecosystem and
							infrastructure partner that can meet its rapidly
							changing needs with Signature and GCCXprss. The
							conclave reiterated iSprout's strategic focus on
							co-creating success models with the larger GCC
							ecosystem in addition to offering scalable workspace
							infrastructure. The event saw strong cross-sector
							representation and intense participation. This
							confirmed iSprout's rising prominence as a preferred
							partner in India's thriving GCC market.
						</p>
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
