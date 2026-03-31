import React from "react";
import { MetaTags } from "../../hooks/useMetaTags";
import ContactUsHero from "./contactus-hero";
import ContactForm from "./contact-form";
import LocationContact from "./location-contact";
// import FutureOfWork from "../home/components/futureofwork";
import YouTubeVideo from "../home/components/youtubevideo";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const ContactUs: React.FC = () => {
	return (
		<div className='w-full'>
			<MetaTags
				title='Get in Touch with iSprout | Contact Our Workspace Experts'
				description="Need help finding your perfect workspace? Contact iSprout for tailored coworking and managed office spaces. We're here to answer all your questions."
			/>

			{/* Hero Section */}
			<ContactUsHero />

			{/* Contact Form Section */}
			<ContactForm />

			{/* Location Contact Section */}
			<LocationContact />

			{/* YouTube Video Section */}
			{/* <FutureOfWork /> */}
			<YouTubeVideo />

			{/* Footer */}
			<Footer />
			<ScrollToTop />
		</div>
	);
};

export default ContactUs;
