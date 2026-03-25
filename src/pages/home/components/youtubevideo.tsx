import { useState } from "react";
import { COLORS } from "../../../helpers/constants/Colors";

export default function YouTubeVideo() {
	const [isVideoPlaying, setIsVideoPlaying] = useState(false);
	const videoId = "tFlcjWfYSC0";
	const videoTitle = "iSprout Video";
	const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
	const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;

	return (
		<section
			className='w-full py-8 lg:py-12 px-4 lg:px-0'
			style={{
				backgroundColor: COLORS.white,
			}}
		>
			<div className='max-w-4xl mx-auto relative z-10 lg:px-8 flex flex-col gap-8 items-center'>
				{/* Heading */}
				<h2
					className='text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 text-center max-w-4xl'
					style={{ fontFamily: "Outfit, sans-serif" }}
				>
					<span
						style={{
							fontFamily: "Outfit, sans-serif",
							
						}}
					>
						iSprout
					</span>{" "}
					building the future for you!
				</h2>

				{/* Video Container */}
				<div className='relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-200'>
					{isVideoPlaying ? (
						<iframe
							width='100%'
							height='100%'
							src={embedUrl}
							title={videoTitle}
							aria-label={videoTitle}
							frameBorder='0'
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
							allowFullScreen
							className='absolute inset-0'
						></iframe>
					) : (
						<button
							type='button'
							onClick={() => setIsVideoPlaying(true)}
							className='absolute inset-0 w-full h-full group'
							aria-label={`Play ${videoTitle}`}
						>
							<img
								src={thumbnailUrl}
								alt={videoTitle}
								className='w-full h-full object-cover'
							/>
							<div className='absolute inset-0' />
							<div className='absolute inset-0 flex items-center justify-center'>
								<div className='w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg'>
									<svg width='24' height='24' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
										<path d='M8 5V19L19 12L8 5Z' fill='#00275c' />
									</svg>
								</div>
							</div>
						</button>
					)}
				</div>
			</div>
		</section>
	);
}
