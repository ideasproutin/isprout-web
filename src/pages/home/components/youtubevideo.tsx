import React from "react";
import { COLORS } from "../../../helpers/constants/Colors";

export default function YouTubeVideo() {
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
							fontFamily: "Otomanopee One, sans-serif",
							color: "#FFDE00",
						}}
					>
						iSprout
					</span>{" "}
					building the future for you!
				</h2>

				{/* Video Container */}
				<div className='relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-200'>
					<iframe
						width='100%'
						height='100%'
						src='https://www.youtube.com/embed/-h69lk_kOkc'
						title='iSprout Video'
						frameBorder='0'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
						allowFullScreen
						className='absolute inset-0'
					></iframe>
				</div>
			</div>
		</section>
	);
}
