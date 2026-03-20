import { COLORS } from "../../helpers/constants/Colors";
import { useState, useMemo, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { MdPerson, MdPhone, MdEmail, MdBusiness } from "react-icons/md";
import cityPageData from "../../content/city&CenterObject.json";
import { useCityCenters } from "../../hooks/useCityCentre";
import V2Recaptcha from "../../components/Recaptcha/V2Recaptcha";
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

	// Validation errors
	const [errors, setErrors] = useState({ fullName: "", phoneNumber: "" });
	const [touched, setTouched] = useState({ fullName: false, phoneNumber: false });

	const validateName = (value: string) => {
		if (!value.trim()) return "Name is required.";
		if (value.trim().length > 50) return "Name cannot exceed 50 characters.";
		return "";
	};

	const validatePhone = (value: string) => {
		if (!value) return "Mobile number is required.";
		if (!/^\d+$/.test(value)) return "Mobile number can only contain digits.";
		// Remove leading 0 if present
		const phoneWithoutLeadingZero = value.replace(/^0+/, '');
		// Check if exactly 10 digits after removing leading 0
		if (phoneWithoutLeadingZero.length !== 10) return "Invalid phone number";
		return "";
	};

	const handleBlur = (field: "fullName" | "phoneNumber") => {
		setTouched((prev) => ({ ...prev, [field]: true }));
		if (field === "fullName") setErrors((prev) => ({ ...prev, fullName: validateName(formData.fullName) }));
		if (field === "phoneNumber") setErrors((prev) => ({ ...prev, phoneNumber: validatePhone(formData.phoneNumber) }));
	};

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
				return city.name;
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
	const routerLocation = useLocation();

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
				const path = routerLocation.pathname.replace(/\/$/, '');
				navigate(`${path}/thankyou`);
			},
		});

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

		setSubmissionResult(null);
		setSubmitting(true);

		// Build payload for CENTER_FORM form type
		const payload = buildFormPayload("CENTER_FORM", {
			...formData,
			email: formData.workEmail,
			center: effectiveCenterName,
			city: cityName,
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
		<div className='w-full py-12 lg:py-16 px-4 lg:px-8 bg-white'>
			<div className='max-w-7xl mx-auto'>
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
											maxLength={50}
											onChange={(e) => {
											const value = e.target.value;
											// Prevent leading spaces
											if (value.startsWith(' ') && formData.fullName === '') {
												return;
											}
											// Only allow letters and spaces, limit to 50 characters
											if (/^[a-zA-Z\s]*$/.test(value) && value.length <= 50) {
												setFormData({ ...formData, fullName: value });
												if (touched.fullName) setErrors((prev) => ({ ...prev, fullName: validateName(value) }));
											}
											}}
											onBlur={() => handleBlur("fullName")}
											placeholder='NAME *'
											className='w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-gray-900 placeholder-gray-600 focus:outline-none transition-colors text-sm'
											style={{
												fontFamily: "Outfit, sans-serif",
												borderColor: touched.fullName && errors.fullName ? "#ef4444" : "#00275c",
											}}
										/>
										<MdPerson
											className='absolute right-3 top-1/2 -translate-y-1/2'
											size={18}
											style={{ color: touched.fullName && errors.fullName ? "#ef4444" : "#00275c" }}
										/>
									</div>
									{touched.fullName && errors.fullName && (
										<p className='text-red-500 text-xs mt-1' style={{ fontFamily: "Outfit, sans-serif" }}>{errors.fullName}</p>
									)}
								</div>

								{/* MOBILE NUMBER */}
								<div className='mb-3'>
									<div className='relative'>
										<input
											type='tel'
											id='phoneNumber'
											value={formData.phoneNumber}
											inputMode='numeric'
											onChange={(e) => {
												const value = e.target.value.replace(/\D/g, "");
												setFormData({ ...formData, phoneNumber: value });
												if (touched.phoneNumber) setErrors((prev) => ({ ...prev, phoneNumber: validatePhone(value) }));
											}}
											onBlur={() => handleBlur("phoneNumber")}
											placeholder='MOBILE NUMBER *'
											className='w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-gray-900 placeholder-gray-600 focus:outline-none transition-colors text-sm'
											style={{
												fontFamily: "Outfit, sans-serif",
												borderColor: touched.phoneNumber && errors.phoneNumber ? "#ef4444" : "#00275c",
											}}
										/>
										<MdPhone
											className='absolute right-3 top-1/2 -translate-y-1/2'
											size={18}
											style={{ color: touched.phoneNumber && errors.phoneNumber ? "#ef4444" : "#00275c" }}
										/>
									</div>
									{touched.phoneNumber && errors.phoneNumber && (
										<p className='text-red-500 text-xs mt-1' style={{ fontFamily: "Outfit, sans-serif" }}>{errors.phoneNumber}</p>
									)}
								</div>

								{/* EMAIL */}
								<div className='mb-3'>
									<div className='relative'>
										<input
											type='email'
											id='workEmail'
											value={formData.workEmail}
											onChange={(e) => {
												// Strip all whitespace and limit to 100 chars
												const v = e.target.value.replace(/\s/g, "").slice(0, 100);
												setFormData({ ...formData, workEmail: v });
											}}
											maxLength={100}
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
											onChange={(e) => {
												const value = e.target.value;
												// Prevent leading spaces when empty
												if (value.startsWith(' ') && formData.companyName === '') {
													return;
												}
												// Collapse multiple spaces, keep leading trimmed, limit to 100 chars
												const v = value.replace(/\s+/g, ' ').trimStart().slice(0, 50);
												setFormData({ ...formData, companyName: v });
											}}
											maxLength={50}
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

								{/* reCAPTCHA v2 */}
								<div className='mb-3 mt-4 flex justify-center'>
									<V2Recaptcha
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
