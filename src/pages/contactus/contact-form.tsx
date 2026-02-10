import React, { useState, useCallback, useRef, useLayoutEffect } from "react";
import {
	MdPerson,
	MdPhone,
	MdEmail,
	MdBusiness,
	MdMessage,
} from "react-icons/md";
import V3Recaptcha from "../../components/Recaptcha/V3Recaptcha";
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

	// Called when captcha verification status changes
	const handleCaptchaVerify = useCallback(
		(token: string, isVerified: boolean) => {
			console.log("📝 Contact form received captcha:", {
				token,
				isVerified,
			});
			setCaptchaToken(token);
			setIsCaptchaVerified(isVerified);
		},
		[],
	);

	// Update form height to match image
	useLayoutEffect(() => {
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

	// Form validation
	const isFormValid =
		formData.fullName &&
		formData.workEmail &&
		formData.phoneNumber &&
		isCaptchaVerified &&
		captchaToken;

	// Wrap onSubmit to validate captcha
	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!isCaptchaVerified || !captchaToken) {
			console.error("Captcha not verified");
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
					<div className='flex items-center justify-center w-full h-full'>
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
										onChange={(e) =>
											setFormData({
												...formData,
												fullName: e.target.value,
											})
										}
										placeholder='NAME *'
										className='w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-gray-900 placeholder-gray-600 focus:outline-none transition-colors text-sm'
										style={{
											fontFamily: "Outfit, sans-serif",
											borderColor: "#00275c",
										}}
									/>
									<MdPerson
										className='absolute right-3 top-1/2 -translate-y-1/2'
										size={18}
										style={{ color: "#00275c" }}
									/>
								</div>
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
											}
										}}
										placeholder='MOBILE NUMBER *'
										className='w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-gray-900 placeholder-gray-600 focus:outline-none transition-colors text-sm'
										style={{
											fontFamily: "Outfit, sans-serif",
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
											fontFamily: "Outfit, sans-serif",
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

							{/* MESSAGE / COMMENTS */}
							<div className='mb-3'>
								<div className='relative'>
									<textarea
										id='message'
										value={formData.message}
										onChange={(e) =>
											setFormData({
												...formData,
												message: e.target.value,
											})
										}
										placeholder='ENQUIRY / COMMENTS'
										className='w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-gray-900 placeholder-gray-600 focus:outline-none transition-colors text-sm resize-none'
										style={{
											fontFamily: "Outfit, sans-serif",
											borderColor: "#00275c",
											minHeight: "60px",
										}}
										rows={2}
									/>
									<MdMessage
										className='absolute right-3 top-3'
										size={18}
										style={{ color: "#00275c" }}
									/>
								</div>
							</div>

							{/* V3Recaptcha */}
							<div className='mb-3 mt-6'>
								<V3Recaptcha
									action='contact_us_form'
									onVerify={handleCaptchaVerify}
								/>
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
