import React, { useState } from "react";
import ContactUsHero from "./contactus-hero";
import ContactForm from "./contact-form";
import LocationContact from "./location-contact";
import FutureOfWork from "../home/components/futureofwork";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

interface FormData {
	fullName: string;
	workEmail: string;
	phoneNumber: string;
	companyName: string;
	city: string;
	office: string;
	requirements: string;
	seats: number;
	source: string;
	message: string;
	acceptTerms: boolean;
}

const ContactUs: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		fullName: "",
		workEmail: "",
		phoneNumber: "",
		companyName: "",
		city: "",
		office: "",
		requirements: "",
		seats: 1,
		source: "",
		message: "",
		acceptTerms: false,
	});

	// Sample cities data - replace with your actual data
	const cities = [
		"Bangalore",
		"Hyderabad",
		"Chennai",
		"Mumbai",
		"Delhi",
		"Pune",
	];

	// Sample offices by city - replace with your actual data
	const officesByCity: { [key: string]: string[] } = {
		Bangalore: ["Koramangala", "Indiranagar", "Whitefield", "HSR Layout"],
		Hyderabad: ["Gachibowli", "Hitech City", "Madhapur", "Kondapur"],
		Chennai: ["Anna Nagar", "T Nagar", "Velachery", "OMR"],
		Mumbai: ["Andheri", "BKC", "Lower Parel", "Powai"],
		Delhi: ["Connaught Place", "Nehru Place", "Saket", "Dwarka"],
		Pune: ["Hinjewadi", "Koregaon Park", "Viman Nagar", "Kharadi"],
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Validate form
		if (!formData.acceptTerms) {
			alert("Please accept the terms and conditions");
			return;
		}

		// Handle form submission
		console.log("Form submitted:", formData);

		// You can add your API call here
		alert("Thank you for contacting us! We will get back to you shortly.");

		// Reset form
		setFormData({
			fullName: "",
			workEmail: "",
			phoneNumber: "",
			companyName: "",
			city: "",
			office: "",
			requirements: "",
			seats: 1,
			source: "",
			message: "",
			acceptTerms: false,
		});
	};

	return (
		<div className='w-full'>
			{/* Hero Section */}
			<ContactUsHero />

			{/* Contact Form Section */}
			<ContactForm
				formData={formData}
				setFormData={setFormData}
				cities={cities}
				officesByCity={officesByCity}
				onSubmit={handleSubmit}
			/>

			{/* Location Contact Section */}
			<LocationContact />

			{/* Future of Work Carousel */}
			<FutureOfWork />

			{/* Footer */}
			<Footer />
			<ScrollToTop />
		</div>
	);
};

export default ContactUs;
