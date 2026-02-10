import React, { useState } from "react";
import ContactUsHero from "./contactus-hero";
import ContactForm from "./contact-form";
import LocationContact from "./location-contact";
// import FutureOfWork from "../home/components/futureofwork";
import YouTubeVideo from "../home/components/youtubevideo";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { useFormSubmit, buildFormPayload } from "../../hooks/useFormSubmit";
import { useNavigate } from "react-router-dom";

interface FormData {
	fullName: string;
	workEmail: string;
	phoneNumber: string;
	message: string;
}

const ContactUs: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		fullName: "",
		workEmail: "",
		phoneNumber: "",
		message: "",
	});

	const navigate = useNavigate();

	// Form submission hook
	const { submit: submitFormData } = useFormSubmit({
		successMessage:
			"Thank you for contacting us! We'll get back to you shortly.",
		onSuccess: () => {
			// Reset form on success
			setFormData({
				fullName: "",
				workEmail: "",
				phoneNumber: "",
				message: "",
			});
			navigate("/thankyou");
		},
	});

	const handleSubmit = async (e: React.FormEvent, captchaToken: string) => {
		e.preventDefault();

		if (!captchaToken) {
			console.error("Captcha token missing");
			return;
		}

		console.log("🚀 Submitting contact form with captcha:", captchaToken);

		// Build payload
		const payload = buildFormPayload("CONTACT_US", {
			fullName: formData.fullName,
			email: formData.workEmail,
			phoneNumber: formData.phoneNumber,
			comments: formData.message,
		});

		console.log("📦 Contact form payload:", payload);

		try {
			await submitFormData(payload, captchaToken);
		} catch (error) {
			console.error("Form submission error:", error);
		}
	};

	return (
		<div className='w-full'>
			{/* Hero Section */}
			<ContactUsHero />

			{/* Contact Form Section */}
			<ContactForm
				formData={formData}
				setFormData={setFormData}
				onSubmit={handleSubmit}
			/>

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
