import { useMetaTags } from "../../hooks/useMetaTags";
import IntroSection from "./intro";
import ManagedOfficeTypes from "./managedofficetypes";
import WhyManagedOffice from "./whymanagedoffice";
import Glimpse from "./glimpse";
import HowManagedOffice from "./howmanagedoffice";
import Locations from "../home/components/locations";
import Amenities from "../home/components/amenities";
import SpiceThings from "./spicethings";
// import FutureOfWork from "../home/components/futureofwork";
import YouTubeVideo from "../home/components/youtubevideo";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const ManagedOffice = () => {
	useMetaTags({
		title: "iSprout: A Premium Managed Office Spaces Across India",
		description: "Experience hassle-free, fully-equipped managed office spaces tailored to your business needs. iSprout offers flexible spaces for teams of all sizes."
	});

	return (
		<div className='w-full'>
			<IntroSection />
			<ManagedOfficeTypes />
			<WhyManagedOffice />
			<Glimpse />
			<HowManagedOffice />
			<Locations />
			<Amenities />
			<SpiceThings />
			{/* <FutureOfWork /> */}
			<YouTubeVideo />
			<Footer />
			<ScrollToTop />
		</div>
	);
};

export default ManagedOffice;
