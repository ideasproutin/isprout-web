import { useParams } from "react-router-dom";
import { useState } from "react";
import { MdPerson, MdPhone, MdEmail, MdBusiness } from "react-icons/md";
import hyderabadHero from "../../assets/city/Hyderabad.jpg";
import bangaloreHero from "../../assets/city/Bangalore.jpg";
import chennaiHero from "../../assets/city/Chennai.jpg";
import puneHero from "../../assets/city/Pune.jpg";
import vijayawadaHero from "../../assets/city/Vijayawada.jpg";
import kolkataHero from "../../assets/city/Kolkata.jpg";
import ahmedabadHero from "../../assets/city/Amhedabad.jpg";
import delhiHero from "../../assets/city/Delhi NCR.jpg";
import vizagHero from "../../assets/city/Vizag.jpg";
import Description from "./Description";
import CityCenters from "./CityCenters";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { COLORS } from "../../helpers/constants/Colors";

const Hero = () => {
	const { cityName } = useParams<{ cityName: string }>();
	const [_focusedField, setFocusedField] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		fullName: "",
		phoneNumber: "",
		workEmail: "",
		companyName: "",
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form submitted:", formData);
		// Add your form submission logic here
	};

	// Map city names to hero images
	const cityHeroImages: Record<string, string> = {
		hyderabad: hyderabadHero,
		bangalore: bangaloreHero,
		bengaluru: bangaloreHero,
		chennai: chennaiHero,
		pune: puneHero,
		vijayawada: vijayawadaHero,
		kolkata: kolkataHero,
		ahmedabad: ahmedabadHero,
		delhi: delhiHero,
		"delhi-ncr": delhiHero,
		gurugram: delhiHero,
		vizag: vizagHero,
	};

	const selectedHeroImage =
		cityHeroImages[cityName?.toLowerCase() || ""] || hyderabadHero;

	return (
		<div className='min-h-screen bg-white'>
			{/* Hero Section */}
			<section className='relative h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden'>
				{/* Background Image */}
				<div className='absolute inset-0'>
					<img
						src={selectedHeroImage}
						alt={`${cityName} workspace`}
						className='w-full h-full object-cover'
					/>
					{/* Dark Overlay */}
					<div className='absolute inset-0 bg-black/30'></div>
				</div>

				{/* Right Side - Form */}
				<div className='absolute top-1/2 -translate-y-1/2 right-4 lg:right-16 z-20 w-full max-w-md'>
					<form
						onSubmit={handleSubmit}
						className='rounded-2xl p-6 lg:p-8'
						style={{ backgroundColor: "#00000066" }}
					>
						{/* Full Name */}
						<div className='mb-4'>
							<div className='relative'>
								<input
									id='fullName'
									type='text'
									name='fullName'
									value={formData.fullName}
									onChange={handleInputChange}
									onFocus={() => setFocusedField("fullName")}
									onBlur={() => setFocusedField(null)}
									placeholder='Full Name:'
									className='w-full px-4 py-3 pr-12 rounded-lg border-2 bg-transparent text-white placeholder-white/70 focus:outline-none transition-colors'
									style={{
										fontFamily: "Outfit, sans-serif",
										borderColor: "white",
									}}
									required
								/>
								<MdPerson
									className='absolute right-4 top-1/2 -translate-y-1/2'
									size={20}
									style={{ color: "white" }}
								/>
							</div>
						</div>

						{/* Phone Number */}
						<div className='mb-4'>
							<div className='relative'>
								<input
									id='phoneNumber'
									type='tel'
									name='phoneNumber'
									value={formData.phoneNumber}
									onChange={handleInputChange}
									onFocus={() =>
										setFocusedField("phoneNumber")
									}
									onBlur={() => setFocusedField(null)}
									placeholder='Phone Number:'
									className='w-full px-4 py-3 pr-12 rounded-lg border-2 bg-transparent text-white placeholder-white/70 focus:outline-none transition-colors'
									style={{
										fontFamily: "Outfit, sans-serif",
										borderColor: "white",
									}}
									required
								/>
								<MdPhone
									className='absolute right-4 top-1/2 -translate-y-1/2'
									size={20}
									style={{ color: "white" }}
								/>
							</div>
						</div>

						{/* Work Email */}
						<div className='mb-4'>
							<div className='relative'>
								<input
									id='workEmail'
									type='email'
									name='workEmail'
									value={formData.workEmail}
									onChange={handleInputChange}
									onFocus={() => setFocusedField("workEmail")}
									onBlur={() => setFocusedField(null)}
									placeholder='Work Email:'
									className='w-full px-4 py-3 pr-12 rounded-lg border-2 bg-transparent text-white placeholder-white/70 focus:outline-none transition-colors'
									style={{
										fontFamily: "Outfit, sans-serif",
										borderColor: "white",
									}}
									required
								/>
								<MdEmail
									className='absolute right-4 top-1/2 -translate-y-1/2'
									size={20}
									style={{ color: "white" }}
								/>
							</div>
						</div>

						{/* Company Name */}
						<div className='mb-6'>
							<div className='relative'>
								<input
									id='companyName'
									type='text'
									name='companyName'
									value={formData.companyName}
									onChange={handleInputChange}
									onFocus={() =>
										setFocusedField("companyName")
									}
									onBlur={() => setFocusedField(null)}
									placeholder='Company Name:'
									className='w-full px-4 py-3 pr-12 rounded-lg border-2 bg-transparent text-white placeholder-white/70 focus:outline-none transition-colors'
									style={{
										fontFamily: "Outfit, sans-serif",
										borderColor: "white",
									}}
									required
								/>
								<MdBusiness
									className='absolute right-4 top-1/2 -translate-y-1/2'
									size={20}
									style={{ color: "white" }}
								/>
							</div>
						</div>

						{/* Submit Button */}
						<button
							type='submit'
							className='w-full py-3 rounded-lg font-semibold text-base transition-all duration-300 hover:opacity-90'
							style={{
								backgroundColor: "white",
								color: COLORS.brandBlue,
								fontFamily: "Outfit, sans-serif",
							}}
						>
							Request Call Back
						</button>
					</form>
				</div>

				{/* Bottom Left - Hero Text and Button */}
				<div className='absolute bottom-0 left-0 right-0 z-10 px-4 lg:px-16 pb-8'>
					<div className='max-w-7xl mx-auto w-full'>
						<h1
							className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight'
							style={{ fontFamily: "Outfit, sans-serif" }}
						>
							<span className='text-white'>
								Managed Offices{" "}
							</span>
							<span
								className='font-bold'
								style={{
									fontFamily: "Otomanopee One, sans-serif",
									color: COLORS.brandYellow,
								}}
							>
								{(cityName?.charAt(0).toUpperCase() ?? "") +
									(cityName?.slice(1) ?? "")}
							</span>
						</h1>
					</div>
				</div>
			</section>

			{/* Description Section with Map */}
			<div className='mt-4 lg:mt-6'>
				<Description cityName={cityName} />
			</div>

			{/* City Centers Section */}
			<CityCenters cityName={cityName} />

			{/* Footer */}
			<Footer />
			<ScrollToTop />
		</div>
	);
};

export default Hero;
