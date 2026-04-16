import MeetingRooms from "./meetingrooms";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const MeetingRoomsIntro = () => {
	return (
		<div className='pt-24 sm:pt-28 md:pt-32'>
			<MeetingRooms />
			<Footer />
			<ScrollToTop />
		</div>
	);
};

export default MeetingRoomsIntro;
