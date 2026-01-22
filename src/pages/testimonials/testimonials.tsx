import { useEffect } from "react";
import TestimonialHero from "./testimonial-hero";
import TestimonialCards from "./testimonial-cards";
import Footer from "../../components/footer/footer";

const Testimonials = () => {
	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "auto" });
	}, []);

	return (
		<div className='min-h-screen'>
			<TestimonialHero />
			<TestimonialCards />
			<Footer />
		</div>
	);
};

export default Testimonials;
