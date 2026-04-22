import { useRef, useState, useEffect, useCallback } from "react";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect";
import { useNavigate } from "react-router-dom";
import {MdPerson,MdPhone,
	MdEmail,
	MdBusiness,
	MdLocationOn,
} from "react-icons/md";
import { MetaTags } from "../../hooks/useMetaTags";
import formImage from "../../assets/virtualoffice/call-handling.png";
import WhyVirtualOffice from "./whyvirtualoffice";
import VirtualOfficeMap from "./map";
import InteractiveMap from "./interactivemap";
import Locations from "../home/components/locations";
import VirtualOfficeProcess from "./virtualoffice_process";
// import FutureOfWork from "../home/components/futureofwork";
import YouTubeVideo from "../home/components/youtubevideo";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import V2Recaptcha from "../../components/Recaptcha/V2Recaptcha";
import { useFormSubmit, buildFormPayload } from "../../hooks/useFormSubmit";
import AuthModal from "../auth/auth";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import { getUser } from "../../services/profileApi";

const VirtualOfficeIntro = () => {
	const formRef = useRef<HTMLDivElement | null>(null);
	const [formHeight, setFormHeight] = useState<number | undefined>(undefined);

	// Auth modal — shown when not logged in, or after submit to go to dashboard
	const [showAuthModal, setShowAuthModal] = useState(false);
	// Store pending submission data for post-login auto-submit
	const [pendingSubmission, setPendingSubmission] = useState<{
		payload: ReturnType<typeof buildFormPayload>;
		captcha: string;
	} | null>(null);

	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { user } = useAuth();

	// Form state
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		phoneNumber: "",
		city: "",
		companyName: "",
	});

	// Auto-fill form with user data when logged in
	useEffect(() => {
		// Try to get user data from auth hook first
		let userData = user;

		// Fallback: check localStorage directly if user is not available from hook
		if (!userData && typeof window !== "undefined") {
			try {
				const storedUser = localStorage.getItem("userData");
				if (storedUser) {
					userData = JSON.parse(storedUser);
				}
			} catch (error) {
				console.error("Failed to parse stored user data:", error);
			}
		}

		// Only autofill if user data is available
		if (userData) {
			setFormData((prev) => ({
				...prev,
				// Only fill if current field is empty (preserves manual edits)
				fullName: prev.fullName || userData.fullName || "",
				email: prev.email || userData.email || "",
				phoneNumber: prev.phoneNumber || userData.mobile || "",
			}));
		}
	}, [user]);

	// Submission state
	const [submitting, setSubmitting] = useState(false);
	const [submissionResult, setSubmissionResult] = useState<string | null>(
		null,
	);

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
		if (!/^\d+$/.test(value))
			return "Mobile number can only contain digits.";
		// Remove leading 0 if present
		const phoneWithoutLeadingZero = value.replace(/^0+/, "");
		// Check if exactly 10 digits after removing leading 0
		if (phoneWithoutLeadingZero.length !== 10)
			return "Invalid phone number";
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

	// reCAPTCHA state
	const [captchaToken, setCaptchaToken] = useState<string>("");
	const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

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
				// Invalidate cache so dashboard shows the new submission immediately
				queryClient.invalidateQueries({
					queryKey: ["bookingData", "VIRTUAL_OFFICE"],
				});
				navigate("/dashboard?tab=virtual-office");
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

	// Handle captcha verification
	const handleCaptchaVerify = useCallback(
		(token: string, isVerified: boolean) => {
			setCaptchaToken(token);
			setIsCaptchaVerified(isVerified);
		},
		[],
	);

	// Core submit logic — reused for direct submit and post-login submit
	const doSubmit = useCallback(
		async (
			payload: ReturnType<typeof buildFormPayload>,
			captcha: string,
		) => {
			setSubmissionResult(null);
			setSubmitting(true);
			try {
				await submitFormData(payload, captcha);
			} catch (error) {
				console.error("Form submission error:", error);
				setSubmissionResult(null);
			} finally {
				setSubmitting(false);
			}
		},
		[submitFormData],
	);

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Mark both fields as touched and validate
		const nameErr = validateName(formData.fullName);
		const phoneErr = validatePhone(formData.phoneNumber);
		setTouched({ fullName: true, phoneNumber: true });
		setErrors({ fullName: nameErr, phoneNumber: phoneErr });

		if (nameErr || phoneErr) return;

		if (!isCaptchaVerified || !captchaToken) {
			console.error("Captcha not verified");
			return;
		}

		const token =
			typeof window !== "undefined"
				? localStorage.getItem("accessToken")
				: null;

		const payload = buildFormPayload("VIRTUAL_OFFICE", formData);

		if (!token) {
			// Not logged in — store pending submission and ask user to log in
			setPendingSubmission({ payload, captcha: captchaToken });
			setShowAuthModal(true);
			return;
		}

		await doSubmit(payload, captchaToken);
	};

	// --- Measure form height and set image container height ---
	useIsomorphicLayoutEffect(() => {
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
		<div className='min-h-screen bg-white pt-24 sm:pt-28 md:pt-32'>
			<MetaTags
				title='iSprout: Premium Virtual Office Solutions'
				description='Start your business with iSprout virtual offices offering legal address, GST support, and flexible workspace access.'
			/>
			<section className='pb-10 pt-4 sm:pb-12 sm:pt-6 md:pb-20 md:pt-8 px-4 sm:px-6 md:px-8 lg:px-16 bg-white'>
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
									className='w-full h-full object-contain'
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
													/^[a-zA-Z\s]*$/.test(
														value,
													) &&
													value.length <= 50
												) {
													setFormData({
														...formData,
														fullName: value,
													});
													if (touched.fullName)
														setErrors((prev) => ({
															...prev,
															fullName:
																validateName(
																	value,
																),
														}));
												}
											}}
											onBlur={() =>
												handleBlur("fullName")
											}
											placeholder='NAME *'
											maxLength={50}
											className='w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-gray-900 placeholder-gray-600 focus:outline-none transition-colors text-sm'
											style={{
												fontFamily:
													"Outfit, sans-serif",
												borderColor:
													touched.fullName &&
													errors.fullName
														? "#ef4444"
														: "#00275c",
											}}
										/>
										<MdPerson
											className='absolute right-3 top-1/2 -translate-y-1/2'
											size={18}
											style={{
												color:
													touched.fullName &&
													errors.fullName
														? "#ef4444"
														: "#00275c",
											}}
										/>
									</div>
									{touched.fullName && errors.fullName && (
										<p
											className='text-red-500 text-xs mt-1'
											style={{
												fontFamily:
													"Outfit, sans-serif",
											}}
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
												const value =
													e.target.value.replace(
														/\D/g,
														"",
													);
												setFormData({
													...formData,
													phoneNumber: value,
												});
												if (touched.phoneNumber)
													setErrors((prev) => ({
														...prev,
														phoneNumber:
															validatePhone(
																value,
															),
													}));
											}}
											onBlur={() =>
												handleBlur("phoneNumber")
											}
											placeholder='MOBILE NUMBER *'
											className='w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-gray-900 placeholder-gray-600 focus:outline-none transition-colors text-sm'
											style={{
												fontFamily:
													"Outfit, sans-serif",
												borderColor:
													touched.phoneNumber &&
													errors.phoneNumber
														? "#ef4444"
														: "#00275c",
											}}
											inputMode='numeric'
										/>
										<MdPhone
											className='absolute right-3 top-1/2 -translate-y-1/2'
											size={18}
											style={{
												color:
													touched.phoneNumber &&
													errors.phoneNumber
														? "#ef4444"
														: "#00275c",
											}}
										/>
									</div>
									{touched.phoneNumber &&
										errors.phoneNumber && (
											<p
												className='text-red-500 text-xs mt-1'
												style={{
													fontFamily:
														"Outfit, sans-serif",
												}}
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
											id='email'
											value={formData.email}
											onChange={(e) => {
												// Prevent leading spaces and any whitespace inside email
												const v = e.target.value
													.replace(/\s/g, "")
													.slice(0, 100);
												setFormData({
													...formData,
													email: v,
												});
											}}
											maxLength={100}
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
											onChange={(e) => {
												const value = e.target.value;
												// Prevent leading spaces when field is empty
												if (
													value.startsWith(" ") &&
													formData.companyName === ""
												) {
													return;
												}
												const v = value.slice(0, 100);
												setFormData({
													...formData,
													companyName: v,
												});
											}}
											maxLength={100}
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
			</section>
			<WhyVirtualOffice />
			<VirtualOfficeMap />
			<InteractiveMap />
			<Locations />
			<VirtualOfficeProcess />
			{/* <FutureOfWork /> */}
			<YouTubeVideo />
			<Footer />
			<ScrollToTop />
			<AuthModal
				isOpen={showAuthModal}
				onClose={() => {
					setShowAuthModal(false);
					setPendingSubmission(null);
				}}
				prefillEmail={formData.email}
				onLoginSuccess={async () => {
					setShowAuthModal(false);
					// Fetch full user profile to ensure name and phone are available
					try {
						const userProfile = await getUser();
						if (userProfile.data?.item) {
							const profileData = userProfile.data.item;
							// Store complete profile in localStorage
							localStorage.setItem(
								"userData",
								JSON.stringify(profileData),
							);
							// Immediately update form with all user data
							setFormData((prev) => ({
								...prev,
								fullName: profileData.fullName || prev.fullName,
								email: profileData.email || prev.email,
								phoneNumber:
									profileData.mobile || prev.phoneNumber,
							}));
						}
					} catch (error) {
						console.error("Failed to fetch user profile:", error);
					}

					// Auto-submit if there's pending submission
					if (pendingSubmission) {
						await doSubmit(
							pendingSubmission.payload,
							pendingSubmission.captcha,
						);
						setPendingSubmission(null);
					}
				}}
			/>
		</div>
	);
};

export default VirtualOfficeIntro;
