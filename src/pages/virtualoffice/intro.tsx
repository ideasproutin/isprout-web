import { useLayoutEffect, useRef, useState } from "react";
import { User, Mail, Phone, MapPin, Building2 } from "lucide-react";
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
import { FloatingInput } from "../contactus/FloatingLabelInput";
import V3Recaptcha from "../../components/Recaptcha/V3Recaptcha";
import { useFormSubmit, buildFormPayload } from "../../hooks/useFormSubmit";
import { useCallback } from "react";

const VirtualOfficeIntro = () => {
	const formRef = useRef<HTMLDivElement | null>(null);
	const [formHeight, setFormHeight] = useState<number | undefined>(undefined);

	// Form state
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		phoneNumber: "",
		city: "",
		companyName: "",
		acceptTerms: false,
	});

	// Submission state
	const [submitting, setSubmitting] = useState(false);
	const [submissionResult, setSubmissionResult] = useState<string | null>(null);

	// reCAPTCHA state
	const [captchaToken, setCaptchaToken] = useState<string>('');
	const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

	// Form submission hook
	const { submit: submitFormData, isSubmitting: isApiSubmitting } = useFormSubmit({
		successMessage: "Your virtual office inquiry has been submitted successfully! We'll contact you soon.",
		onSuccess: () => {
			setFormData({
				fullName: "",
				email: "",
				phoneNumber: "",
				city: "",
				companyName: "",
				acceptTerms: false,
			});
			setSubmissionResult("Form submitted successfully!");
		},
	});

	// Form validation
	const isFormValid =
		formData.fullName &&
		formData.email &&
		formData.phoneNumber &&
		formData.city &&
		formData.companyName &&
		formData.acceptTerms &&
		isCaptchaVerified &&
		captchaToken &&
		!submitting &&
		!isApiSubmitting;

	// Handle captcha verification
	const handleCaptchaVerify = useCallback((token: string, isVerified: boolean) => {
		console.log('📝 Virtual Office form received captcha:', { token, isVerified });
		setCaptchaToken(token);
		setIsCaptchaVerified(isVerified);
	}, []);

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!isCaptchaVerified || !captchaToken) {
			console.error("Captcha not verified");
			return;
		}

		setSubmissionResult(null);
		setSubmitting(true);
		console.log('🚀 Submitting virtual office form with captcha token:', captchaToken);

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
				className='relative w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-cover bg-center flex items-end'
				style={{ backgroundImage: `url(${virtualOfficeHero})` }}
			>
				<div className='absolute bottom-0 left-0 right-0 z-10 bg-black/20 py-4 md:py-5 lg:py-6 px-8 md:px-16 lg:px-24'>
					<h1 className="text-white text-[48px] md:text-[64px] lg:text-[80px] xl:text-[96px] font-bold font-['Inter',sans-serif] tracking-tight leading-none">
						Virtual Office
					</h1>
				</div>
			</section>
			{/* FORM SECTION */}
			<section className='py-10 sm:py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-16 bg-[#eaf4fb]'>
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
									alt='Virtual Office Space'
									className='w-full h-full object-cover'
									src={formImage}
								/>
							</div>
						</div>

						{/* FORM */}
						<div
							ref={formRef}
							className='bg-white p-5 sm:p-6 md:p-8 rounded-xl w-full flex flex-col'
						>
							<form onSubmit={handleSubmit} className='space-y-5'>
								<FloatingInput
									label='Full Name'
									value={formData.fullName}
									onChange={(v) => setFormData({ ...formData, fullName: v })}
									icon={<User size={18} />}
									required
								/>

								<FloatingInput
									label='Your Email'
									type='email'
									value={formData.email}
									onChange={(v) => setFormData({ ...formData, email: v })}
									icon={<Mail size={18} />}
									required
								/>

								<FloatingInput
									label='Phone Number'
									type='tel'
									value={formData.phoneNumber}
									onChange={(v) => setFormData({ ...formData, phoneNumber: v })}
									icon={<Phone size={18} />}
									required
								/>

								<div className='relative'>
									<select
										className='w-full border border-[#204758] rounded-full px-5 py-3 pr-12 bg-white focus:ring-2 focus:ring-[#204758] outline-none appearance-none'
										style={{
											fontFamily: "Outfit, sans-serif",
											color: "#6b7280",
										}}
										required
									>
										<option value='' disabled selected>
											Preferred City
										</option>
										<option value='Hyderabad'>
											Hyderabad
										</option>
										<option value='Bengaluru'>
											Bengaluru
										</option>
										<option value='Pune'>Pune</option>
										<option value='Chennai'>Chennai</option>
										<option value='Vijayawada'>
											Vijayawada
										</option>
										<option value='Vizag'>Vizag</option>
										<option value='Gurugram'>
											Gurugram
										</option>
										<option value='Kolkata'>Kolkata</option>
										<option value='Ahmedabad'>
											Ahmedabad
										</option>
									</select>
									<MapPin
										size={18}
										className='absolute right-5 top-1/2 -translate-y-1/2 text-[#204758] pointer-events-none'
									/>
								</div>

								<FloatingInput
									label='Company Name'
									value={formData.companyName}
									onChange={(v) => setFormData({ ...formData, companyName: v })}
									icon={<Building2 size={18} />}
									required
								/>

								<div className='flex items-start gap-3'>
									<input
										type='checkbox'
										id='terms'
										className='mt-1 w-5 h-5'
										checked={formData.acceptTerms}
										onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
										required
									/>
									<label
										htmlFor='terms'
										className='text-sm italic'
										style={{
											fontFamily: "Outfit, sans-serif",
										}}
									>
										I agree to the{" "}
										<span className='underline'>
											terms & policy
										</span>
									</label>
								</div>

							{/* V3Recaptcha - User clicks to verify before submitting */}
							<V3Recaptcha
								action="virtual_office_form"
								onVerify={handleCaptchaVerify}
							/>

							{/* Success message */}
							{submissionResult && (
								<div className="text-green-600 text-sm text-center font-semibold">{submissionResult}</div>
							)}

								<div className='flex justify-center'>
									<button
										type='submit'
										className='px-10 sm:px-12 py-3 rounded-xl transition-all text-base font-medium'
										style={{
											backgroundColor: isFormValid ? "#FFDE00" : "#f3e9b7",
											color: "#00275c",
											fontFamily: "Outfit, sans-serif",
											cursor: isFormValid ? "pointer" : "not-allowed",
											opacity: isFormValid ? 1 : 0.6,
										}}
										disabled={!isFormValid}
									>
										{submitting ? "Submitting..." : "Submit"}
									</button>
								</div>
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
			<ScrollToTop />{" "}
		</div>
	);
};

export default VirtualOfficeIntro;
