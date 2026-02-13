import { useEffect } from "react";
import { useMetaTags } from "../../hooks/useMetaTags";
import TestimonialHero from "./testimonial-hero";
import TestimonialCards from "./testimonial-cards";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const Testimonials = () => {
	useMetaTags({
		title: "Client Success Stories | iSprout Workspace Testimonials",
		description: "Hear from businesses thriving in iSprout's coworking and managed office spaces. Real stories of how our workspaces are empowering success across India."
	});

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "auto" });
	}, []);

	return (
		<div className='min-h-screen'>
			<TestimonialHero />
			<TestimonialCards />
			<Footer />
			<ScrollToTop />
		</div>
	);
};

export default Testimonials;
