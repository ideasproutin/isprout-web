import React, { useState, useCallback, useRef } from "react";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect";
import { MdPerson, MdPhone, MdEmail, MdMessage } from "react-icons/md";
import V2Recaptcha from "../../components/Recaptcha/V2Recaptcha";
import formImage from "../../assets/contactus/contact-form.png";

interface FormData {
	fullName: string;
	workEmail: string;
	phoneNumber: string;
	message: string;
}

interface Props {
	formData: FormData;
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
	onSubmit: (e: React.FormEvent, captchaToken: string) => void;
}

export default function ContactForm({
	formData,
	setFormData,
	onSubmit,
}: Props) {
	const formRef = useRef<HTMLDivElement | null>(null);
	const [formHeight, setFormHeight] = useState<number | undefined>(undefined);

	// reCAPTCHA state
	const [captchaToken, setCaptchaToken] = useState<string>("");
	const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

	// Validation error states
	const [errors, setErrors] = useState({
		fullName: "",
		phoneNumber: "",
		workEmail: "",
		message: "",
	});

	// Email validation regex - standard RFC 5322 simplified
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	// Validation functions
	const validateName = (value: string): string => {
		const trimmedValue = value.trim();
		if (!trimmedValue) {
			return "Name is required";
		}
		if (trimmedValue.length < 2) {
			return "Name must be at least 2 characters";
		}
		// Check for leading/trailing spaces in original value
		if (value !== value.trim()) {
			return "Name cannot start or end with spaces";
		}
		if (!/^[a-zA-Z\s]+$/.test(trimmedValue)) {
			return "Name can only contain letters and spaces";
		}
		if (trimmedValue.length > 50) {
			return "Name must not exceed 50 characters";
		}
		return "";
	};

	const validatePhone = (value: string): string => {
		const trimmedValue = value.trim();
		if (!trimmedValue) {
			return "Mobile number is required";
		}
		if (!/^\d+$/.test(trimmedValue)) {
			return "Mobile number can only contain digits";
		}
		if (trimmedValue.length !== 10) {
			return "Mobile number must be exactly 10 digits";
		}
		return "";
	};

	const validateEmail = (value: string): string => {
		const trimmedValue = value.trim();
		// If email field has content, validate it
		if (trimmedValue) {
			// Check if original value contains any spaces
			if (/\s/.test(value)) {
				return "Email address cannot contain spaces";
			}
			if (!emailRegex.test(trimmedValue)) {
				return "Please enter a valid email address (e.g., user@example.com)";
			}
		}
		if (value.length > 100) {
			return "Email must not exceed 100 characters";
		}
		return "";
	};

	const validateMessage = (value: string): string => {
		if (value.length > 500) {
			return "Enquiry/Comments must not exceed 500 characters";
		}
		// Message is optional, but if provided it shouldn't be only whitespace
		if (value && !value.trim()) {
			return "Please enter valid content (not just spaces)";
		}
		return "";
	};

	// Called when captcha verification status changes
	const handleCaptchaVerify = useCallback(
		(token: string, isVerified: boolean) => {
			setCaptchaToken(token);
			setIsCaptchaVerified(isVerified);
		},
		[],
	);

	// Update form height to match image
	useIsomorphicLayoutEffect(() => {
		if (formRef.current) {
			const updateHeight = () => {
				if (formRef.current) {
					setFormHeight(formRef.current.offsetHeight);
				}
			};
			updateHeight();
			window.addEventListener("resize", updateHeight);
			return () => window.removeEventListener("resize", updateHeight);
		}
	}, [formData, isCaptchaVerified]);

	// Form validation - check all fields are valid
	const isFormValid =
		formData.fullName.trim().length >= 2 &&
		/^[a-zA-Z\s]+$/.test(formData.fullName.trim()) &&
		formData.phoneNumber.length === 10 &&
		(!formData.workEmail.trim() || emailRegex.test(formData.workEmail.trim())) &&
		formData.message.length <= 500 &&
		!errors.fullName &&
		!errors.phoneNumber &&
		!errors.workEmail &&
		!errors.message &&
		isCaptchaVerified &&
		captchaToken;

	// Wrap onSubmit to validate captcha
	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!isCaptchaVerified || !captchaToken) {
			return;
		}

		// Call parent's onSubmit with captcha token
		onSubmit(e, captchaToken);
	};

	return (
		<section className='w-full py-12 lg:py-16 px-4 bg-white'>
			<div className='max-w-7xl mx-auto'>
				{/* HEADING */}
				<div className='mb-8 sm:mb-10'>
					<h2
						className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: "#00275c",
						}}
					>
						Get In Touch
					</h2>
					<p
						className='text-base sm:text-lg md:text-xl'
						style={{ fontFamily: "Outfit, sans-serif" }}
					>
						Discover the perfect workspace solution for your
						business. Whether you need a managed office, meeting
						room, or virtual office, our team is here to help you
						find the ideal space.
					</p>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-start'>
					{/* LEFT CONTENT - IMAGE */}
					<div className='hidden lg:flex items-center justify-center w-full h-full'>
						<div
							className='rounded-2xl overflow-hidden w-full'
							style={
								formHeight
									? { height: formHeight }
									: { minHeight: "500px" }
							}
						>
							<img
								alt='Contact Us'
								className='w-full h-full object-cover'
								src={formImage}
							/>
						</div>
					</div>

					{/* FORM */}
					<div
						ref={formRef}
						className='bg-white p-5 sm:p-6 md:p-8 rounded-xl w-full max-w-md mx-auto flex flex-col'
					>
						<form onSubmit={handleFormSubmit} className='w-full'>
							{/* NAME */}
							<div className='mb-3'>
								<div className='relative'>
									<input
										type='text'
										id='fullName'
										value={formData.fullName}
										onChange={(e) => {
										const value = e.target.value;
											// Prevent leading spaces
											if (value.startsWith(' ') && formData.fullName === '') {
												return;
											}
											// Allow only letters, spaces, and limit to 50 characters
											if (
												/^[a-zA-Z\s]*$/.test(value) &&
												value.length <= 50
											) {
												setFormData({
													...formData,
													fullName: value,
												});
												// Clear error when user types valid input
												if (errors.fullName) {
													setErrors({ ...errors, fullName: "" });
												}
											}
										}}
										onBlur={(e) => {
											const error = validateName(e.target.value);
											setErrors({ ...errors, fullName: error });
										}}
										placeholder='NAME *'
										className={`w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-gray-900 placeholder-gray-600 focus:outline-none transition-colors text-sm ${
											errors.fullName ? "border-red-500" : ""
										}`}
										style={{
											fontFamily: "Outfit, sans-serif",
											borderColor: errors.fullName ? "#ef4444" : "#00275c",
										}}
										maxLength={50}
										pattern='[a-zA-Z\s]+'
										title='Please enter a valid name (letters and spaces only, max 50 characters)'
										required
									/>
									<MdPerson
										className='absolute right-3 top-1/2 -translate-y-1/2'
										size={18}
										style={{ color: errors.fullName ? "#ef4444" : "#00275c" }}
									/>
								</div>
								{errors.fullName && (
									<p
										className='text-red-500 text-xs mt-1'
										style={{ fontFamily: "Outfit, sans-serif" }}
									>
										{errors.fullName}
									</p>
								)}
							</div>

							{/* PHONE NUMBER */}
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
												// Clear error when user types valid input
												if (errors.phoneNumber) {
													setErrors({ ...errors, phoneNumber: "" });
												}
											}
										}}
										onBlur={(e) => {
											const error = validatePhone(e.target.value);
											setErrors({ ...errors, phoneNumber: error });
										}}
										placeholder='MOBILE NUMBER *'
										className={`w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-gray-900 placeholder-gray-600 focus:outline-none transition-colors text-sm ${
											errors.phoneNumber ? "border-red-500" : ""
										}`}
										style={{
											fontFamily: "Outfit, sans-serif",
											borderColor: errors.phoneNumber ? "#ef4444" : "#00275c",
										}}
										pattern='[0-9]{10}'
										title='Please enter a 10-digit mobile number'
										required
									/>
									<MdPhone
										className='absolute right-3 top-1/2 -translate-y-1/2'
										size={18}
										style={{ color: errors.phoneNumber ? "#ef4444" : "#00275c" }}
									/>
								</div>
								{errors.phoneNumber && (
									<p
										className='text-red-500 text-xs mt-1'
										style={{ fontFamily: "Outfit, sans-serif" }}
									>
										{errors.phoneNumber}
									</p>
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
											const value = e.target.value;										// Reject spaces entirely in email field
										if (/\s/.test(value)) {
											return;
										}											// Limit email to 100 characters
											if (value.length <= 100) {
												setFormData({
													...formData,
													workEmail: value,
												});
												// Clear error when user types
												if (errors.workEmail) {
													setErrors({ ...errors, workEmail: "" });
												}
											}
										}}
										onBlur={(e) => {
											const error = validateEmail(e.target.value);
											setErrors({ ...errors, workEmail: error });
										}}
										placeholder='EMAIL '
										className={`w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-gray-900 placeholder-gray-600 focus:outline-none transition-colors text-sm ${
											errors.workEmail ? "border-red-500" : ""
										}`}
										style={{
											fontFamily: "Outfit, sans-serif",
											borderColor: errors.workEmail ? "#ef4444" : "#00275c",
										}}
										maxLength={100}
									/>
									<MdEmail
										className='absolute right-3 top-1/2 -translate-y-1/2'
										size={18}
										style={{ color: errors.workEmail ? "#ef4444" : "#00275c" }}
									/>
								</div>
								{errors.workEmail && (
									<p
										className='text-red-500 text-xs mt-1'
										style={{ fontFamily: "Outfit, sans-serif" }}
									>
										{errors.workEmail}
									</p>
								)}
							</div>

							{/* MESSAGE / COMMENTS */}
							<div className='mb-3'>
								<div className='relative'>
									<textarea
										id='message'
										value={formData.message}
										onChange={(e) => {
											const value = e.target.value;
											// Limit message to 500 characters
											if (value.length <= 500) {
												setFormData({
													...formData,
													message: value,
												});
												// Clear error when user types
												if (errors.message) {
													setErrors({ ...errors, message: "" });
												}
											}
										}}
										onBlur={(e) => {
											const error = validateMessage(e.target.value);
											setErrors({ ...errors, message: error });
										}}
										placeholder='ENQUIRY / COMMENTS '
										className={`w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-gray-900 placeholder-gray-600 focus:outline-none transition-colors text-sm resize-none ${
											errors.message ? "border-red-500" : ""
										}`}
										style={{
											fontFamily: "Outfit, sans-serif",
											borderColor: errors.message ? "#ef4444" : "#00275c",
											minHeight: "60px",
										}}
										rows={2}
										maxLength={500}
									/>
									<MdMessage
										className='absolute right-3 top-3'
										size={18}
										style={{ color: errors.message ? "#ef4444" : "#00275c" }}
									/>
								</div>
								{errors.message && (
									<p
										className='text-red-500 text-xs mt-1'
										style={{ fontFamily: "Outfit, sans-serif" }}
									>
										{errors.message}
									</p>
								)}
								<p
									className='text-gray-500 text-xs mt-1 text-right'
									style={{ fontFamily: "Outfit, sans-serif" }}
								>
									{formData.message.length}/500 characters
								</p>
							</div>

							{/* reCAPTCHA v2 */}
							<div className='mb-3 mt-2 flex justify-center'>
								<V2Recaptcha onVerify={handleCaptchaVerify} />
							</div>

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
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
