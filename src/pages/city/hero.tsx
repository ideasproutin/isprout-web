import { useParams, useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { MdPerson, MdPhone, MdEmail, MdBusiness } from "react-icons/md";
import { useCityCenters } from "../../hooks/useCityCentre";
import V3Recaptcha from "../../components/Recaptcha/V3Recaptcha";
import { useFormSubmit, buildFormPayload } from "../../hooks/useFormSubmit";
import Description from "./Description";
import CityCenters from "./CityCenters";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { COLORS } from "../../helpers/constants/Colors";

const Hero = () => {
	const { data: cityCentersData } = useCityCenters();
	const { cityName } = useParams<{ cityName: string }>();
	const navigate = useNavigate();
	const [, setFocusedField] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		fullName: "",
		phoneNumber: "",
		workEmail: "",
		companyName: "",
		requiredSeats: "" as number | "",
	});

	// Captcha state
	const [captchaToken, setCaptchaToken] = useState<string>("");
	const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

	// Submission state
	const [submitting, setSubmitting] = useState(false);

	// Form submission hook
	const { submit: submitFormData, isSubmitting: isApiSubmitting } =
		useFormSubmit({
			successMessage:
				"Your inquiry has been submitted successfully! We'll contact you soon.",
			onSuccess: () => {
				setFormData({
					fullName: "",
					phoneNumber: "",
					workEmail: "",
					companyName: "",
					requiredSeats: "",
				});
				setCaptchaToken("");
				setIsCaptchaVerified(false);
				navigate("/thankyou");
			},
		});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Captcha verification callback
	const handleCaptchaVerify = useCallback(
		(token: string, isVerified: boolean) => {
			console.log("📝 Form received captcha:", { token, isVerified });
			setCaptchaToken(token);
			setIsCaptchaVerified(isVerified);
		},
		[],
	);

	// Form validation
	const isFormValid =
		formData.fullName &&
		formData.workEmail &&
		formData.phoneNumber &&
		formData.companyName &&
		formData.requiredSeats &&
		isCaptchaVerified &&
		captchaToken &&
		!submitting &&
		!isApiSubmitting;

	const handleIncrementSeats = () => {
		setFormData((prev) => ({
			...prev,
			requiredSeats:
				(typeof prev.requiredSeats === "number"
					? prev.requiredSeats
					: 0) + 1,
		}));
	};

	const handleDecrementSeats = () => {
		setFormData((prev) => ({
			...prev,
			requiredSeats: Math.max(
				1,
				(typeof prev.requiredSeats === "number"
					? prev.requiredSeats
					: 1) - 1,
			),
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Double-check captcha is verified
		if (!isCaptchaVerified || !captchaToken) {
			console.error("Captcha not verified");
			return;
		}

		setSubmitting(true);
		console.log("🚀 Submitting form with captcha token:", captchaToken);

		// Build payload
		const payload = buildFormPayload("CITY_FORM", {
			...formData,
			email: formData.workEmail,
		});

		try {
			await submitFormData(payload, captchaToken);
		} catch (error) {
			console.error("Form submission error:", error);
		} finally {
			setSubmitting(false);
		}
	};

	// Get hero image from city data (API only)
	const city =
		cityCentersData?.find(
			(c: any) => c.id === (cityName?.toLowerCase() || "hyderabad"),
		) || cityCentersData?.[0];

	const selectedHeroImage = city?.heroImage;

	return (
		<div className='min-h-screen bg-white'>
			{/* Hero Section */}
			<section className='relative lg:h-[600px] overflow-hidden mt-20 sm:mt-16 md:mt-20 lg:mt-24'>
				{/* Background Image */}
				<div className='relative lg:absolute lg:inset-0 h-[400px] lg:h-full'>
					<img
						src={selectedHeroImage}
						alt={`${cityName} workspace`}
						className='w-full h-full object-cover'
					/>
					{/* Dark Overlay */}
					<div className='absolute inset-0 bg-black/30'></div>

					{/* Bottom Left - Hero Text (Mobile: Inside Image, Desktop: Bottom) */}
					<div className='absolute bottom-0 left-0 right-0 z-10 px-4 lg:px-16 pb-8'>
						<div className='max-w-7xl mx-auto w-full'>
							<h1
								className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight'
								style={{ fontFamily: "Outfit, sans-serif" }}
							>
								<span className='text-white'>
									Managed Office Space{" "}
								</span>
								<span
									className='font-bold'
									style={{
										fontFamily: "Outfit, sans-serif",
										color: COLORS.brandYellow,
									}}
								>
									{(cityName?.charAt(0).toUpperCase() ?? "") +
										(cityName?.slice(1) ?? "")}
								</span>
							</h1>
						</div>
					</div>
				</div>

				{/* Right Side - Form (Desktop: Absolute, Mobile: Below Image) */}
				<div className='relative lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-16 z-20 w-full max-w-sm mx-auto px-4 lg:px-0 py-6 lg:py-0'>
					<form
						onSubmit={handleSubmit}
						className='rounded-2xl p-5 lg:p-6'
						style={{ backgroundColor: "#000000CC" }}
					>
						{/* Full Name */}
						<div className='mb-3'>
							<div className='relative'>
								<input
									id='fullName'
									type='text'
									name='fullName'
									value={formData.fullName}
									onChange={handleInputChange}
									onFocus={() => setFocusedField("fullName")}
									onBlur={() => setFocusedField(null)}
									placeholder='NAME *'
									className='w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-white placeholder-white/70 focus:outline-none transition-colors text-sm'
									style={{
										fontFamily: "Outfit, sans-serif",
										borderColor: "white",
									}}
									required
								/>
								<MdPerson
									className='absolute right-3 top-1/2 -translate-y-1/2'
									size={18}
									style={{ color: "white" }}
								/>
							</div>
						</div>

						{/* Phone Number */}
						<div className='mb-3'>
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
									placeholder='MOBILE NUMBER *'
									className='w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-white placeholder-white/70 focus:outline-none transition-colors text-sm'
									style={{
										fontFamily: "Outfit, sans-serif",
										borderColor: "white",
									}}
									required
								/>
								<MdPhone
									className='absolute right-3 top-1/2 -translate-y-1/2'
									size={18}
									style={{ color: "white" }}
								/>
							</div>
						</div>

						{/* Work Email */}
						<div className='mb-3'>
							<div className='relative'>
								<input
									id='workEmail'
									type='email'
									name='workEmail'
									value={formData.workEmail}
									onChange={handleInputChange}
									onFocus={() => setFocusedField("workEmail")}
									onBlur={() => setFocusedField(null)}
									placeholder='EMAIL'
									className='w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-white placeholder-white/70 focus:outline-none transition-colors text-sm'
									style={{
										fontFamily: "Outfit, sans-serif",
										borderColor: "white",
									}}
									required
								/>
								<MdEmail
									className='absolute right-3 top-1/2 -translate-y-1/2'
									size={18}
									style={{ color: "white" }}
								/>
							</div>
						</div>

						{/* Company Name */}
						<div className='mb-3'>
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
									placeholder='COMPANY NAME'
									className='w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-white placeholder-white/70 focus:outline-none transition-colors text-sm'
									style={{
										fontFamily: "Outfit, sans-serif",
										borderColor: "white",
									}}

								/>
								<MdBusiness
									className='absolute right-3 top-1/2 -translate-y-1/2'
									size={18}
									style={{ color: "white" }}
								/>
							</div>
						</div>

						{/* Required Seats */}
						<div className='mb-3 group'>
							<div className='relative'>
								<input
									id='requiredSeats'
									type='number'
									name='requiredSeats'
									value={formData.requiredSeats}
									onChange={(e) => {
										const value =
											e.target.value === ""
												? ""
												: parseInt(e.target.value);
										setFormData((prev) => ({
											...prev,
											requiredSeats: value as number,
										}));
									}}
									onBlur={(e) => {
										const value = Math.max(
											1,
											parseInt(e.target.value) || 1,
										);
										setFormData((prev) => ({
											...prev,
											requiredSeats: value,
										}));
										setFocusedField(null);
									}}
									onFocus={() =>
										setFocusedField("requiredSeats")
									}
									placeholder='REQUIRED SEATS'
									className='w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-white placeholder-white/70 focus:outline-none transition-colors text-left text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
									style={{
										fontFamily: "Outfit, sans-serif",
										borderColor: "white",
									}}
									min='1'
									required
								/>
								<div className='absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity'>
									<button
										type='button'
										onClick={handleIncrementSeats}
										className='text-white hover:opacity-70 transition-opacity p-0 leading-none'
										style={{
											background: "none",
											border: "none",
										}}
									>
										<svg
											width='8'
											height='5'
											viewBox='0 0 10 6'
											fill='white'
										>
											<path d='M5 0L10 6H0L5 0Z' />
										</svg>
									</button>
									<button
										type='button'
										onClick={handleDecrementSeats}
										className='text-white hover:opacity-70 transition-opacity p-0 leading-none'
										style={{
											background: "none",
											border: "none",
										}}
									>
										<svg
											width='8'
											height='5'
											viewBox='0 0 10 6'
											fill='white'
										>
											<path d='M5 6L0 0H10L5 6Z' />
										</svg>
									</button>
								</div>
							</div>
						</div>

						{/* ReCAPTCHA */}
						<div className='mb-3 mt-6'>
							<V3Recaptcha
								action='hero_form_submit'
								onVerify={handleCaptchaVerify}
							/>
						</div>
						{/* Submit Button */}
						<button
							type='submit'
							disabled={!isFormValid}
							className='w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-300'
							style={{
								backgroundColor: "#FFDE00",
								color: COLORS.brandBlue,
								fontFamily: "Outfit, sans-serif",
								cursor: isFormValid ? "pointer" : "not-allowed",
								opacity: isFormValid ? 1 : 0.6,
							}}
						>
							{submitting || isApiSubmitting
								? "Submitting..."
								: "SUBMIT"}
						</button>
					</form>
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
