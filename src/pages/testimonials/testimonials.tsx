import { useEffect } from "react";
import { Helmet } from "react-helmet";
import TestimonialHero from "./testimonial-hero";
import TestimonialCards from "./testimonial-cards";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const Testimonials = () => {
	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "auto" });
	}, []);

	return (
		<div className='min-h-screen'>
			<Helmet>
				<title>Client Success Stories | iSprout Workspace Testimonials</title>
				<meta
					name='description'
					content="Hear from businesses thriving in iSprout's coworking and managed office spaces. Real stories of how our workspaces are empowering success across India."
				/>
			</Helmet>
			<TestimonialHero />
			<TestimonialCards />
			<Footer />
			<ScrollToTop />
		</div>
	);
};

export default Testimonials;
