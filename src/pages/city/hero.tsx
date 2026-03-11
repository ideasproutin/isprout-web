import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useCallback, useEffect, Suspense } from "react";
import { MdPerson, MdPhone, MdEmail, MdBusiness } from "react-icons/md";
import { useCityCenters } from "../../hooks/useCityCentre";
import V2Recaptcha from "../../components/Recaptcha/V2Recaptcha";
import { useFormSubmit, buildFormPayload } from "../../hooks/useFormSubmit";
import { MetaTags } from "../../hooks/useMetaTags";
import { lazyWithRetry } from "../../utils/lazyWithRetry";
const Description = lazyWithRetry(() => import("./Description"), "description");
import CityCenters from "./CityCenters";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { COLORS } from "../../helpers/constants/Colors";

// Format city name for display
const formatCityName = (name: string | undefined): string => {
	if (!name) return "Hyderabad";
	if (
		name.toLowerCase() === "delhi-ncr" ||
		name.toLowerCase() === "gurugram"
	) {
		return "Gurugram";
	}
	if (
		name.toLowerCase() === "bengaluru" ||
		name.toLowerCase() === "bangalore"
	) {
		return "Bengaluru";
	}
	return name.charAt(0).toUpperCase() + name.slice(1);
};

// City-specific meta tags
const getCityMetaTags = (city: string | undefined) => {
	const formattedCity = formatCityName(city);
	const metaData: {
		[key: string]: { title: string; description: string; keywords: string };
	} = {
		Hyderabad: {
			title: "Top Managed Office Spaces in Hyderabad near IT HUB",
			description:
				"Enhance your work environment with fully serviced offices close to Hyderabads tech hub, offering seamless operations, scalability, and modern infrastructure.",
			keywords:
				"managed office Hyderabad, coworking Hyderabad, office space Hyderabad, Gachibowli office, Madhapur workspace",
		},
		Bengaluru: {
			title: "Innovative Managed Office Space in Bangalore",
			description:
				"Creative, collaborative managed workspaces in Bangalore, A perfect space for startups & growing teams. Flexible plans with full-service support for businesses.",
			keywords:
				"managed office Bangalore, Bengaluru coworking, Whitefield office space, Bellandur workspace, startup office Bangalore",
		},
		Chennai: {
			title: "Work Smarter with Fully-Serviced Office space @Chennai",
			description:
				"Experience fully-managed office space in Chennais top tech hubs with flexible plans, premium amenities, and a business-ready environment.",
			keywords:
				"managed office Chennai, coworking Chennai, OMR office space, Guindy workspace, Chennai business center",
		},
		Gurugram: {
			title: "Managed Office Space in Gurugram Prime Business Hub",
			description:
				"Boost your business presence with iSprout, a fully serviced offices in Gurugram. Enjoy flexible layouts, on-site support, top-tier amenities in prime location.",
			keywords:
				"managed office Gurugram, Gurgaon coworking, Delhi NCR office space, Cyber City workspace, Gurugram business center",
		},
		Pune: {
			title: "Are you looking for Managed Office Space in Pune?",
			description:
				"Set up your business with iSprout in iHub. A fully managed space designed for productivity with flexible pricing. Call @+91 84649 99920",
			keywords:
				"managed office Pune, Hinjewadi coworking, Baner office space, Yerwada workspace, Pune business center",
		},
		Vijayawada: {
			title: "Premium Managed Office Space in Vijayawada",
			description:
				"Experience business-ready office spaces with iSprout. Offering modern amenities, flexible leasing, and a hassle-free professional work environment.",
			keywords:
				"managed office Vijayawada, VJA coworking, office space Vijayawada, Benz Circle workspace",
		},
		Kolkata: {
			title: "Premium Managed Office Space in Kolkata",
			description:
				"Establish your business presence in Kolkata with flexible managed offices featuring modern infrastructure, prime locations, and comprehensive support.",
			keywords:
				"managed office Kolkata, coworking Kolkata, Salt Lake office space, Bidhannagar workspace",
		},
		Ahmedabad: {
			title: "Get your Managed Office Space in Ahmedabad",
			description:
				"Set up your business in the heart of Ahmedabad with iSprout dynamic office spaces. Offering flexible plans with modern amenities",
			keywords:
				"managed office Ahmedabad, coworking Ahmedabad, office space Ahmedabad, Makarba workspace",
		},
		Visakhapatnam: {
			title: "Premium Managed Office Spaces in Visakhapatnam",
			description:
				"Upgrade your work experience with iSprouts managed offices in Vizag. Fully furnished, tech-enabled, and ready for global enterprises.",
			keywords:
				"managed office Visakhapatnam, Vizag coworking, office space Vizag, Maddilapalem workspace",
		},
	};

	return (
		metaData[formattedCity] || {
			title: `Managed Office Space in ${formattedCity} | iSprout`,
			description: `Discover premium managed office spaces in ${formattedCity} with iSprout. Flexible, fully-serviced workspaces for growing businesses.`,
			keywords: `managed office ${formattedCity}, coworking ${formattedCity}, office space ${formattedCity}, iSprout`,
		}
	);
};

const Hero = () => {
	const { data: cityCentersData } = useCityCenters();
	const { cityName } = useParams<{ cityName: string }>();
	const navigate = useNavigate();
	const location = useLocation();

	// Apply city-specific meta tags
	const cityMeta = getCityMetaTags(cityName);

	// isMounted prevents typeof-window hydration mismatches for client-only components
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);

	const [, setFocusedField] = useState<string | null>(null);

	// Validation errors
	const [errors, setErrors] = useState({ fullName: "", phoneNumber: "" });
	const [touched, setTouched] = useState({
		fullName: false,
		phoneNumber: false,
	});

	const validateName = (value: string) => {
		if (!value.trim()) return "Name is required.";
		if (value.trim().length > 50)
			return "Name cannot exceed 50 characters.";
		return "";
	};

	const validatePhone = (value: string) => {
		if (!value) return "Mobile number is required.";
		if (!/^\d{10}$/.test(value))
			return "Please enter a valid 10-digit mobile number.";
		return "";
	};

	const handleBlur = (field: "fullName" | "phoneNumber") => {
		setTouched((prev) => ({ ...prev, [field]: true }));
		if (field === "fullName")
			setErrors((prev) => ({
				...prev,
				fullName: validateName(formData.fullName),
			}));
		if (field === "phoneNumber")
			setErrors((prev) => ({
				...prev,
				phoneNumber: validatePhone(formData.phoneNumber),
			}));
	};

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
				const path = location.pathname.replace(/\/$/, "");
				navigate(`${path}/thankyou`);
			},
		});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		let newValue = value;
		// For email fields, disallow any whitespace and limit length
		if (name === "workEmail" || name === "email") {
			newValue = value.replace(/\s/g, "").slice(0, 100);
		}
		setFormData((prev) => ({
			...prev,
			[name]: newValue,
		}));
	};

	// Captcha verification callback
	const handleCaptchaVerify = useCallback(
		(token: string, isVerified: boolean) => {
			setCaptchaToken(token);
			setIsCaptchaVerified(isVerified);
		},
		[],
	);

	// Form validation - only require name and phone
	const isFormValid =
		formData.fullName &&
		!validateName(formData.fullName) &&
		formData.phoneNumber &&
		!validatePhone(formData.phoneNumber) &&
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

		// Validate and mark fields as touched
		const nameErr = validateName(formData.fullName);
		const phoneErr = validatePhone(formData.phoneNumber);
		setTouched({ fullName: true, phoneNumber: true });
		setErrors({ fullName: nameErr, phoneNumber: phoneErr });
		if (nameErr || phoneErr) return;

		// Double-check captcha is verified
		if (!isCaptchaVerified || !captchaToken) {
			console.error("Captcha not verified");
			return;
		}

		setSubmitting(true);

		// Format and get city name
		const formattedCityName = formatCityName(cityName);

		// Build payload with city name
		const payload = buildFormPayload("CITY_FORM", {
			...formData,
			email: formData.workEmail,
			city: formattedCityName,
		});

		try {
			await submitFormData(payload, captchaToken);
		} catch (error) {
			console.error("Form submission error:", error);
		} finally {
			setSubmitting(false);
		}
	};

	// City ID mapping for API compatibility
	const cityIdMap: { [key: string]: string } = {
		visakhapatnam: "vizag",
	};

	// Get hero image from city data (API only)
	const cityNameLower = cityName?.toLowerCase() || "hyderabad";
	const actualCityId = cityIdMap[cityNameLower] || cityNameLower;
	const city = cityCentersData?.find(
		(c: { id?: string; name: string }) =>
			c.id?.toLowerCase() === actualCityId ||
			c.name.toLowerCase() === actualCityId,
	);

	const selectedHeroImage = city?.heroImage;

	return (
		<div className='min-h-screen bg-white'>
			<MetaTags
				title={cityMeta.title}
				description={cityMeta.description}
				keywords={cityMeta.keywords}
				ogTitle={cityMeta.title}
				ogDescription={cityMeta.description}
			/>
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
									{city?.name || cityName}
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
									maxLength={50}
									onChange={(e) => {
										const value = e.target.value;
										// Prevent leading spaces
										if (
											value.startsWith(" ") &&
											formData.fullName === ""
										) {
											return;
										}
										// Only allow letters and spaces, limit to 50 characters
										if (
											/^[a-zA-Z\s]*$/.test(value) &&
											value.length <= 50
										) {
											setFormData((prev) => ({
												...prev,
												fullName: value,
											}));
											if (touched.fullName)
												setErrors((prev) => ({
													...prev,
													fullName:
														validateName(value),
												}));
										}
									}}
									onFocus={() => setFocusedField("fullName")}
									onBlur={() => {
										setFocusedField(null);
										handleBlur("fullName");
									}}
									placeholder='NAME *'
									className='w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-white placeholder-white/70 focus:outline-none transition-colors text-sm'
									style={{
										fontFamily: "Outfit, sans-serif",
										borderColor:
											touched.fullName && errors.fullName
												? "#f87171"
												: "white",
									}}
								/>
								<MdPerson
									className='absolute right-3 top-1/2 -translate-y-1/2'
									size={18}
									style={{
										color:
											touched.fullName && errors.fullName
												? "#f87171"
												: "white",
									}}
								/>
							</div>
							{touched.fullName && errors.fullName && (
								<p
									className='text-red-400 text-xs mt-1'
									style={{ fontFamily: "Outfit, sans-serif" }}
								>
									{errors.fullName}
								</p>
							)}
						</div>

						{/* Phone Number */}
						<div className='mb-3'>
							<div className='relative'>
								<input
									id='phoneNumber'
									type='tel'
									name='phoneNumber'
									value={formData.phoneNumber}
									inputMode='numeric'
									onChange={(e) => {
										const value = e.target.value
											.replace(/\D/g, "")
											.slice(0, 10);
										setFormData((prev) => ({
											...prev,
											phoneNumber: value,
										}));
										if (touched.phoneNumber)
											setErrors((prev) => ({
												...prev,
												phoneNumber:
													validatePhone(value),
											}));
									}}
									onFocus={() =>
										setFocusedField("phoneNumber")
									}
									onBlur={() => {
										setFocusedField(null);
										handleBlur("phoneNumber");
									}}
									placeholder='MOBILE NUMBER *'
									className='w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-white placeholder-white/70 focus:outline-none transition-colors text-sm'
									style={{
										fontFamily: "Outfit, sans-serif",
										borderColor:
											touched.phoneNumber &&
											errors.phoneNumber
												? "#f87171"
												: "white",
									}}
								/>
								<MdPhone
									className='absolute right-3 top-1/2 -translate-y-1/2'
									size={18}
									style={{
										color:
											touched.phoneNumber &&
											errors.phoneNumber
												? "#f87171"
												: "white",
									}}
								/>
							</div>
							{touched.phoneNumber && errors.phoneNumber && (
								<p
									className='text-red-400 text-xs mt-1'
									style={{ fontFamily: "Outfit, sans-serif" }}
								>
									{errors.phoneNumber}
								</p>
							)}
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
									placeholder='COMPANY NAME '
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

						{/* reCAPTCHA v2 */}
						<div className='mb-3 mt-4 flex justify-center'>
							<V2Recaptcha onVerify={handleCaptchaVerify} />
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
				{isMounted && (
					<Suspense
						fallback={
							<div className='h-96 animate-pulse bg-gray-100 rounded-lg' />
						}
					>
						<Description cityName={cityName} />
					</Suspense>
				)}
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
