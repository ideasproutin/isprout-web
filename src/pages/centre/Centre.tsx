import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ourLocations from "../../content/ourLocations";
import ogmCenterImage from "../../assets/centers/ogmcenterpage.png";
import SubNavbar from "../../components/SubNavbar/subnavbar";
import Amenities from "../home/components/amenities";
import NearbySpaces from "./nearbyspaces";
import SuccessStories from "./successstories";
import FutureOfWork from "../home/components/futureofwork";
import Footer from "../../components/footer/footer";
import BookATour from "./bookatour";
import { COLORS } from "../../helpers/constants/Colors";

const Centre = () => {
	const { centreId } = useParams();

	// Scroll to top when component mounts
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [centreId]);

	// Find the center details
	let centerDetails: any = null;

	for (const cityData of ourLocations) {
		const center = cityData.centers.find(
			(c) => c.centreRedirect === `/centre/${centreId}`,
		);
		if (center) {
			centerDetails = center;
			break;
		}
	}

	console.log("Center Details:", centerDetails);
	if (!centerDetails) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				Center not found
			</div>
		);
	}

	return (
		<div className='min-h-screen' style={{ backgroundColor: COLORS.white }}>
			{/* Hero Section with Navbar Overlay */}
			<div className='relative h-[520px] w-full'>
				<img
					src={ogmCenterImage}
					alt={centerDetails.center_name}
					className='w-full h-full object-cover'
				/>
				<div className='absolute inset-0 bg-black/20'>
					{/* Navbar on top of image */}
					<div className='absolute top-0 left-0 right-0 z-50'>
						<SubNavbar />
					</div>
					{/* Title at bottom */}
					<div className='absolute bottom-9 left-0 right-0 flex items-center justify-center'>
						<h1
							className='text-white text-4xl md:text-5xl font-bold text-center px-4'
							style={{ fontFamily: "Outfit, sans-serif" }}
						>
							Managed Office Space{" "}
							<span style={{ color: "#FFDE00" }}>
								{centerDetails.center_name}
							</span>
						</h1>
					</div>
				</div>
			</div>

			{/* Form Section */}

			{/* Book A Tour Section */}
			<BookATour />

			{/* Amenities Section */}
			<Amenities />

			{/* Nearby Spaces Section */}
			<NearbySpaces />

			{/* Success Stories Section */}
			<SuccessStories />

			{/* Future of Work Section */}
			<FutureOfWork />

			{/* Footer */}
			<Footer />
		</div>
	);
};

export default Centre;
