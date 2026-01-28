import React from "react";
import heroImage from "../../assets/meetingroom/meetingroom_glimpse1.jpg";
import MeetingRooms from "./meetingrooms";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const IntroSection: React.FC = () => {
	return (
		<section
			className='relative w-full min-h-[450px] md:min-h-[520px] lg:min-h-[600px] bg-cover bg-center flex items-end'
			style={{ backgroundImage: `url(${heroImage})` }}
		>
			<div className='absolute bottom-0 left-0 right-0 z-10 bg-black/20 py-4 md:py-5 lg:py-6 px-8 md:px-16 lg:px-24'>
				<h1 className="text-white text-[48px] md:text-[64px] lg:text-[80px] xl:text-[96px] font-bold font-['Inter',sans-serif] tracking-tight leading-none">
					Meeting Rooms
				</h1>
			</div>
		</section>
	);
};

const MeetingRoomsIntro = () => {
	return (
		<div>
			<IntroSection />
			<MeetingRooms />
			<Footer />
			<ScrollToTop />
		</div>
	);
};

export default MeetingRoomsIntro;
