import { COLORS } from "../../helpers/constants/Colors";
import { useState, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdPerson, MdPhone, MdEmail, MdBusiness } from "react-icons/md";
import cityPageData from "../../content/city&CenterObject.json";
import { useCityCenters } from "../../hooks/useCityCentre";
import V3Recaptcha from "../../components/Recaptcha/V3Recaptcha";
import { useFormSubmit, buildFormPayload } from "../../hooks/useFormSubmit";

interface FormProps {
	centerName?: string;
	location?: string;
}

export default function Form({
	centerName = "One Golden Mile",
	location = "Mia, Spanning 36,000 sq. ft., in Hyderabad offers a dynamic workspace tailored for balanced life and growth.",
}: FormProps) {
	// Get centre from URL params
	const params = useParams<{ centre?: string }>();
	const centreFromUrl = params.centre;

	// Use centre from URL if available, otherwise use prop
	const effectiveCenterName = centreFromUrl || centerName;

	// Form state
	const [formData, setFormData] = useState({
		fullName: "",
		workEmail: "",
		phoneNumber: "",
		companyName: "",
		requiredSeats: "" as number | "",
	});

	// Submission state
	const [submitting, setSubmitting] = useState(false);
	const [submissionResult, setSubmissionResult] = useState<string | null>(
		null,
	);

	// reCAPTCHA state - stores token and verification status
	const [captchaToken, setCaptchaToken] = useState<string>("");
	const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

	// Data from API
	const { data: cityCentersData } = useCityCenters();

	// Extract city name from center data
	const cityName = useMemo(() => {
		for (const city of cityCentersData || cityPageData) {
			const center = city.centers.find(
				(c: { name: string; centerKey: string }) =>
					c.name.toLowerCase() ===
						effectiveCenterName?.toLowerCase() ||
					c.centerKey.toLowerCase() ===
						effectiveCenterName?.toLowerCase(),
			);
			if (center) {
				return city.cityName;
			}
		}
		return undefined;
	}, [effectiveCenterName, cityCentersData]);

	// Extract center description from center data
	const centerDescription = useMemo(() => {
		for (const city of cityCentersData || cityPageData) {
			const center = city.centers.find(
				(c: { name: string; centerKey: string }) =>
					c.name.toLowerCase() ===
						effectiveCenterName?.toLowerCase() ||
					c.centerKey.toLowerCase() ===
						effectiveCenterName?.toLowerCase() ||
					c.centerKey
						.toLowerCase()
						.includes(effectiveCenterName?.toLowerCase() || "") ||
					c.name
						.toLowerCase()
						.includes(effectiveCenterName?.toLowerCase() || ""),
			);
			if (center && center.description) {
				return center.description;
			}
		}
		return undefined;
	}, [effectiveCenterName, cityCentersData]);

	const navigate = useNavigate();

	// Form submission hook
	const { submit: submitFormData, isSubmitting: isApiSubmitting } =
		useFormSubmit({
			successMessage:
				"Your inquiry has been submitted successfully! We'll contact you soon.",
			onSuccess: () => {
				// Reset form on success
				setFormData({
					fullName: "",
					workEmail: "",
					phoneNumber: "",
					companyName: "",
					requiredSeats: "",
				});
				// Reset captcha state
				setCaptchaToken("");
				setIsCaptchaVerified(false);
				setSubmissionResult("Form submitted successfully!");
				navigate("/thankyou");
			},
		});

	// Form validation - only require name and phone
	const isFormValid =
		formData.fullName &&
		formData.phoneNumber &&
		isCaptchaVerified &&
		captchaToken &&
		!submitting &&
		!isApiSubmitting;

	// Called when captcha verification status changes
	const handleCaptchaVerify = useCallback(
		(token: string, isVerified: boolean) => {
			setCaptchaToken(token);
			setIsCaptchaVerified(isVerified);
		},
		[],
	);

	// Handle increment seats
	const handleIncrementSeats = useCallback(() => {
		setFormData((prev) => {
			const currentSeats =
				typeof prev.requiredSeats === "number" ? prev.requiredSeats : 1;
			return { ...prev, requiredSeats: currentSeats + 1 };
		});
	}, []);

	// Handle decrement seats
	const handleDecrementSeats = useCallback(() => {
		setFormData((prev) => {
			const currentSeats =
				typeof prev.requiredSeats === "number" ? prev.requiredSeats : 1;
			return {
				...prev,
				requiredSeats: Math.max(1, currentSeats - 1),
			};
		});
	}, []);

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Double-check captcha is verified
		if (!isCaptchaVerified || !captchaToken) {
			console.error("Captcha not verified");
			return;
		}

		setSubmissionResult(null);
		setSubmitting(true);

		// Build payload for CONTACT_US form type with city and centre keys
		const payload = buildFormPayload("CONTACT_US", {
			...formData,
			email: formData.workEmail,
			centerName: effectiveCenterName,
			city: cityName,
			centre: effectiveCenterName, // Add centre key
		});

		try {
			await submitFormData(payload, captchaToken);
		} catch (error) {
			console.error("Form submission error:", error);
			setSubmissionResult(null);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className='w-full py-12 lg:py-16 px-4 bg-white'>
			<div className='max-w-300 mx-auto'>
				<div className='grid lg:grid-cols-2 gap-8 lg:gap-10'>
					{/* Left Side - Description */}
					<div className='flex flex-col justify-center'>
						<h2
							className='text-xl lg:text-2xl font-bold mb-3'
							style={{ color: COLORS.brandBlueDark }}
						>
							Welcome to {effectiveCenterName}
						</h2>
						<p
							className='text-sm lg:text-base leading-snug mb-3 flex items-center'
							style={{ color: "#4B5563" }}
						>
							<svg
								className='w-4 h-4 mr-2 shrink-0'
								style={{ color: COLORS.brandBlue }}
								fill='currentColor'
								viewBox='0 0 20 20'
							>
								<path
									fillRule='evenodd'
									d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
									clipRule='evenodd'
								/>
							</svg>
							{location}
						</p>
						<p
							className='text-sm lg:text-base leading-snug mb-4'
							style={{ color: "#6B7280" }}
						>
							{centerDescription}
						</p>
						{/* <div className='mt-3 flex items-start text-gray-600'>
							
							<p className='text-sm'>
								{centerAddress
									? `iSprout ${effectiveCenterName}, ${centerAddress}`
									: `iSprout ${effectiveCenterName}`}
							</p>
						</div> */}
					</div>

					{/* Right Side - Form */}
					<div className='flex flex-col justify-center'>
						<div className='rounded-2xl p-5 lg:p-6 w-full max-w-md mx-auto flex flex-col bg-white'>
							<form onSubmit={handleSubmit}>
								{/* NAME */}
								<div className='mb-3'>
									<div className='relative'>
										<input
											type='text'
											id='fullName'
											value={formData.fullName}
											onChange={(e) =>
												setFormData({
													...formData,
													fullName: e.target.value,
												})
											}
											placeholder='NAME *'
											className='w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-gray-900 placeholder-gray-600 focus:outline-none transition-colors text-sm'
											style={{
												fontFamily:
													"Outfit, sans-serif",
												borderColor: "#00275c",
											}}
											required
										/>
										<MdPerson
											className='absolute right-3 top-1/2 -translate-y-1/2'
											size={18}
											style={{ color: "#00275c" }}
										/>
									</div>
								</div>

								{/* MOBILE NUMBER */}
								<div className='mb-3'>
									<div className='relative'>
										<input
											type='tel'
											id='phoneNumber'
											value={formData.phoneNumber}
											onChange={(e) => {
												const value = e.target.value;
												// Allow only digits and limit to 10 characters
												if (
													/^\d*$/.test(value) &&
													value.length <= 10
												) {
													setFormData({
														...formData,
														phoneNumber: value,
													});
												}
											}}
											placeholder='MOBILE NUMBER *'
											className='w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-gray-900 placeholder-gray-600 focus:outline-none transition-colors text-sm'
											style={{
												fontFamily:
													"Outfit, sans-serif",
												borderColor: "#00275c",
											}}
											pattern='[0-9]{10}'
											title='Please enter a 10-digit mobile number'
											required
										/>
										<MdPhone
											className='absolute right-3 top-1/2 -translate-y-1/2'
											size={18}
											style={{ color: "#00275c" }}
										/>
									</div>
								</div>

								{/* EMAIL */}
								<div className='mb-3'>
									<div className='relative'>
										<input
											type='email'
											id='workEmail'
											value={formData.workEmail}
											onChange={(e) =>
												setFormData({
													...formData,
													workEmail: e.target.value,
												})
											}
											placeholder='EMAIL'
											className='w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-gray-900 placeholder-gray-600 focus:outline-none transition-colors text-sm'
											style={{
												fontFamily:
													"Outfit, sans-serif",
												borderColor: "#00275c",
											}}
										/>
										<MdEmail
											className='absolute right-3 top-1/2 -translate-y-1/2'
											size={18}
											style={{ color: "#00275c" }}
										/>
									</div>
								</div>

								{/* COMPANY NAME */}
								<div className='mb-3'>
									<div className='relative'>
										<input
											type='text'
											id='companyName'
											value={formData.companyName}
											onChange={(e) =>
												setFormData({
													...formData,
													companyName: e.target.value,
												})
											}
											placeholder='COMPANY NAME '
											className='w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-gray-900 placeholder-gray-600 focus:outline-none transition-colors text-sm'
											style={{
												fontFamily:
													"Outfit, sans-serif",
												borderColor: "#00275c",
											}}
										/>
										<MdBusiness
											className='absolute right-3 top-1/2 -translate-y-1/2'
											size={18}
											style={{ color: "#00275c" }}
										/>
									</div>
								</div>

								{/* REQUIRED SEATS */}
								<div className='mb-3'>
									<div className='relative group'>
										<input
											type='number'
											id='requiredSeats'
											value={
												formData.requiredSeats === ""
													? ""
													: formData.requiredSeats
											}
											onChange={(e) => {
												const value =
													e.target.value === ""
														? ""
														: parseInt(
																e.target.value,
															);
												setFormData((prev) => ({
													...prev,
													requiredSeats:
														value as number,
												}));
											}}
											onBlur={(e) => {
												const value = Math.max(
													1,
													parseInt(e.target.value) ||
														1,
												);
												setFormData((prev) => ({
													...prev,
													requiredSeats: value,
												}));
											}}
											placeholder='REQUIRED SEATS'
											className='w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-gray-900 placeholder-gray-600 focus:outline-none transition-colors text-left text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
											style={{
												fontFamily:
													"Outfit, sans-serif",
												borderColor: "#00275c",
											}}
											min='1'
										/>
										<div className='absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity'>
											<button
												type='button'
												onClick={handleIncrementSeats}
												className='text-gray-900 hover:opacity-70 transition-opacity p-0 leading-none'
												style={{
													background: "none",
													border: "none",
												}}
											>
												<svg
													width='8'
													height='5'
													viewBox='0 0 10 6'
													fill='#00275c'
												>
													<path d='M5 0L10 6H0L5 0Z' />
												</svg>
											</button>
											<button
												type='button'
												onClick={handleDecrementSeats}
												className='text-gray-900 hover:opacity-70 transition-opacity p-0 leading-none'
												style={{
													background: "none",
													border: "none",
												}}
											>
												<svg
													width='8'
													height='5'
													viewBox='0 0 10 6'
													fill='#00275c'
												>
													<path d='M5 6L0 0H10L5 6Z' />
												</svg>
											</button>
										</div>
									</div>
								</div>

								{/* V3Recaptcha */}
								<div className='mb-3 mt-6'>
									<V3Recaptcha
										action='lead_form_submit'
										onVerify={handleCaptchaVerify}
									/>
								</div>

								{/* Success message */}
								{submissionResult && (
									<div className='text-green-400 text-sm text-center mb-2 font-semibold'>
										{submissionResult}
									</div>
								)}

								{/* Submit Button */}
								<button
									type='submit'
									className='w-full py-3 rounded-xl font-semibold text-base transition-all'
									style={{
										backgroundColor: "#FFDE00",
										color: "#00275c",
										fontFamily: "Outfit, sans-serif",
										opacity: isFormValid ? 1 : 0.6,
										cursor: isFormValid
											? "pointer"
											: "not-allowed",
									}}
									disabled={!isFormValid}
								>
									{submitting ? "Submitting..." : "Submit"}
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
