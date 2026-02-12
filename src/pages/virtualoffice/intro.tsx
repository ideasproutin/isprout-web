import { useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	MdPerson,
	MdPhone,
	MdEmail,
	MdBusiness,
	MdLocationOn,
} from "react-icons/md";
import { useMetaTags } from "../../hooks/useMetaTags";
import virtualOfficeHero from "../../assets/virtualoffice/resize-hero-vo.png";
import formImage from "../../assets/virtualoffice/Call Handling.png";
import WhyVirtualOffice from "./whyvirtualoffice";
import VirtualOfficeMap from "./map";
import Locations from "../home/components/locations";
import VirtualOfficeProcess from "./virtualoffice_process";
// import FutureOfWork from "../home/components/futureofwork";
import YouTubeVideo from "../home/components/youtubevideo";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import V3Recaptcha from "../../components/Recaptcha/V3Recaptcha";
import { useFormSubmit, buildFormPayload } from "../../hooks/useFormSubmit";
import { useCallback } from "react";

const VirtualOfficeIntro = () => {
	useMetaTags({
		title: "iSprout: Premium Virtual Office Solutions",
		description: "Start your business with iSprout virtual offices offering legal address, GST support, and flexible workspace access."
	});
	const formRef = useRef<HTMLDivElement | null>(null);
	const [formHeight, setFormHeight] = useState<number | undefined>(undefined);

	// Form state
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		phoneNumber: "",
		city: "",
		companyName: "",
	});

	// Submission state
	const [submitting, setSubmitting] = useState(false);
	const [submissionResult, setSubmissionResult] = useState<string | null>(
		null,
	);

	// reCAPTCHA state
	const [captchaToken, setCaptchaToken] = useState<string>("");
	const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

	const navigate = useNavigate();

	// Form submission hook
	const { submit: submitFormData, isSubmitting: isApiSubmitting } =
		useFormSubmit({
			successMessage:
				"Your virtual office inquiry has been submitted successfully! We'll contact you soon.",
			onSuccess: () => {
				setFormData({
					fullName: "",
					email: "",
					phoneNumber: "",
					city: "",
					companyName: "",
				});
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

	// Handle captcha verification
	const handleCaptchaVerify = useCallback(
		(token: string, isVerified: boolean) => {
			console.log("📝 Virtual Office form received captcha:", {
				token,
				isVerified,
			});
			setCaptchaToken(token);
			setIsCaptchaVerified(isVerified);
		},
		[],
	);

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!isCaptchaVerified || !captchaToken) {
			console.error("Captcha not verified");
			return;
		}

		setSubmissionResult(null);
		setSubmitting(true);
		console.log(
			"🚀 Submitting virtual office form with captcha token:",
			captchaToken,
		);

		const payload = buildFormPayload("VIRTUAL_OFFICE", formData);

		try {
			await submitFormData(payload, captchaToken);
		} catch (error) {
			console.error("Form submission error:", error);
			setSubmissionResult(null);
		} finally {
			setSubmitting(false);
		}
	};

	// --- Measure form height and set image container height ---
	useLayoutEffect(() => {
		if (!formRef.current) return;
		const handleResize = () => {
			if (formRef.current) {
				setFormHeight(formRef.current.offsetHeight);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className='min-h-screen bg-white'>
			
			{/* HERO SECTION */}
			<section
				className='relative w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-cover bg-center flex items-end mt-20 sm:mt-16 md:mt-20 lg:mt-24'
				style={{ backgroundImage: `url(${virtualOfficeHero})` }}
			>
				<div className='absolute bottom-0 left-0 right-0 z-10 bg-black/20 py-4 md:py-5 lg:py-6 px-8 md:px-16 lg:px-24'>
					<h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold font-['Inter',sans-serif] tracking-tight leading-none">
						Virtual Office
					</h1>
				</div>
			</section>
			{/* FORM SECTION */}
			<section className='py-10 sm:py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-16 bg-white'>
				<div className='max-w-7xl mx-auto'>
					{/* HEADING AND SUBTEXT */}
					<div className='mb-8 sm:mb-10'>
						<h2
							className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4'
							style={{
								fontFamily: "Outfit, sans-serif",
								color: "#00275c",
							}}
						>
							<span>Set Up Your </span>
							<span style={{ color: "#FFDE00" }}>
								Virtual Office
							</span>
							<span> Today</span>
						</h2>

						<p
							className='text-base sm:text-lg md:text-xl'
							style={{ fontFamily: "Outfit, sans-serif" }}
						>
							Share your details, choose your city, and our team
							will help you set up a premium business address with
							professional support services.
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
									alt='Virtual Office Space'
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

								{/* PHONE NUMBER */}
								<div className='mb-3'>
									<div className='relative'>
										<input
											type='tel'
											id='phoneNumber'
											value={formData.phoneNumber}
											onChange={(e) => {
												const value = e.target.value;
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
											id='email'
											value={formData.email}
											onChange={(e) =>
												setFormData({
													...formData,
													email: e.target.value,
												})
											}
											onFocus={() =>
												setFocusedField("email")
											}
											onBlur={() => setFocusedField(null)}
										placeholder='EMAIL '
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

								{/* PREFERRED CITY */}
								<div className='mb-3'>
									<div className='relative'>
										<select
											id='city'
											value={formData.city}
											onChange={(e) =>
												setFormData({
													...formData,
													city: e.target.value,
												})
											}

											className='w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-gray-900 focus:outline-none transition-colors text-sm appearance-none'
											style={{
												fontFamily:
													"Outfit, sans-serif",
												borderColor: "#00275c",
												color: formData.city
													? "#111827"
													: "#4B5563",
											}}
										>
											<option value='' disabled>
											PREFERRED CITY
											</option>
											<option value='Hyderabad'>
												Hyderabad
											</option>
											<option value='Bengaluru'>
												Bengaluru
											</option>
											<option value='Pune'>Pune</option>
											<option value='Chennai'>
												Chennai
											</option>
											<option value='Vijayawada'>
												Vijayawada
											</option>
											<option value='Vizag'>Vizag</option>
											<option value='Gurugram'>
												Gurugram
											</option>
											<option value='Kolkata'>
												Kolkata
											</option>
											<option value='Ahmedabad'>
												Ahmedabad
											</option>
										</select>
										<MdLocationOn
											className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none'
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
											onFocus={() =>
												setFocusedField("companyName")
											}
											onBlur={() => setFocusedField(null)}
										placeholder='COMPANY NAME'
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

								{/* V3Recaptcha */}
								<div className='mb-3 mt-6'>
									<V3Recaptcha
										action='virtual_office_form'
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
			</section>
			<WhyVirtualOffice />
			<VirtualOfficeMap />
			<Locations />
			<VirtualOfficeProcess />
			{/* <FutureOfWork /> */}
			<YouTubeVideo />
			<Footer />
			<ScrollToTop />
		</div>
	);
};

export default VirtualOfficeIntro;
