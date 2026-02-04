import { COLORS } from "../../helpers/constants/Colors";
import { useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { User, Mail, Phone, Building2 } from "lucide-react";
import cityPageData from "../../content/city&CenterObject.json";
import { useCityCenters } from "../../hooks/useCityCentre";
import V3Recaptcha from "../../components/Recaptcha/V3Recaptcha";
import { useFormSubmit, buildFormPayload } from "../../hooks/useFormSubmit";

interface FormProps {
	centerName?: string;
	location?: string;
}

// Custom Floating Input with background color
function CustomFloatingInput({
	label,
	value,
	onChange,
	type = "text",
	required,
	icon,
}: {
	label: string;
	value: string;
	onChange: (v: string) => void;
	type?: string;
	required?: boolean;
	icon?: React.ReactNode;
}) {
	
	const [focus, setFocus] = useState(false);
	const float = focus || value;
	const id = `input-${label.replace(/\s+/g, "-").toLowerCase()}`;

	return (
		<div className='relative'>
			<input
				id={id}
				type={type}
				value={value}
				required={required}
				onChange={(e) => onChange(e.target.value)}
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
				className='w-full border border-[#204758] rounded-full px-5 py-3 focus:ring-2 focus:ring-[#204758] outline-none'
				style={{ backgroundColor: "#ffffff" }}
			/>
			<label
				htmlFor={id}
				className={`absolute left-5 px-1 text-gray-600 transition-all cursor-pointer ${
					float ? "-top-2 text-xs" : "top-1/2 -translate-y-1/2"
				}`}
				style={{ backgroundColor: "#ffffff" }}
			>
				{label}
			</label>
			{icon && (
				<span className='absolute right-5 top-1/2 -translate-y-1/2 text-[#204758]'>
					{icon}
				</span>
			)}
		</div>
	);
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
		requiredSeats: "",
		acceptTerms: false,
	});

	// Submission state
	const [submitting, setSubmitting] = useState(false);
	const [submissionResult, setSubmissionResult] = useState<string | null>(null);

	// reCAPTCHA state - stores token and verification status
	const [captchaToken, setCaptchaToken] = useState<string>('');
	const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

	// Data from API
	const { data: cityCentersData } = useCityCenters();
	
	// Extract city name from center data
	const cityName = useMemo(() => {
		for (const city of cityCentersData || cityPageData) {
			const center = city.centers.find(
				(c: any) =>
					c.name.toLowerCase() === effectiveCenterName?.toLowerCase() ||
					c.centerKey.toLowerCase() === effectiveCenterName?.toLowerCase()
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
				(c: any) =>
					c.name.toLowerCase() === effectiveCenterName?.toLowerCase() ||
					c.centerKey.toLowerCase() === effectiveCenterName?.toLowerCase() ||
					c.centerKey.toLowerCase().includes(effectiveCenterName?.toLowerCase() || '') ||
					c.name.toLowerCase().includes(effectiveCenterName?.toLowerCase() || '')
			);
			if (center && center.description) {
				return center.description;
			}
		}
		return undefined;
	}, [effectiveCenterName, cityCentersData]);

	// Form submission hook
	const { submit: submitFormData, isSubmitting: isApiSubmitting } = useFormSubmit({
		successMessage: "Your inquiry has been submitted successfully! We'll contact you soon.",
		onSuccess: () => {
			// Reset form on success
			setFormData({
				fullName: "",
				workEmail: "",
				phoneNumber: "",
				companyName: "",
				requiredSeats: "",
				acceptTerms: false,
			});
			// Reset captcha state
			setCaptchaToken('');
			setIsCaptchaVerified(false);
			setSubmissionResult("Form submitted successfully!");
		},
	});

	// Extract center address from center data
	const centerAddress = useMemo(() => {
		for (const city of cityCentersData || cityPageData) {
			const center = city.centers.find(
				(c: any) =>
					c.name.toLowerCase() === effectiveCenterName?.toLowerCase() ||
					c.centerKey.toLowerCase() === effectiveCenterName?.toLowerCase()
			);
			if (center && center.address) {
				return center.address;
			}
		}
		return null;
	}, [effectiveCenterName, cityCentersData]);

	// Form validation - only enable submit if all fields are filled, terms accepted, captcha verified, and not currently submitting
	const isFormValid =
		formData.fullName &&
		formData.workEmail &&
		formData.phoneNumber &&
		formData.companyName &&
		formData.requiredSeats &&
		formData.acceptTerms &&
		isCaptchaVerified &&
		captchaToken &&
		!submitting &&
		!isApiSubmitting;

	// Called when captcha verification status changes
	const handleCaptchaVerify = useCallback((token: string, isVerified: boolean) => {		console.log('📝 Form received captcha:', { token, isVerified });		setCaptchaToken(token);
		setIsCaptchaVerified(isVerified);
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
		console.log('🚀 Submitting form with captcha token:', captchaToken);
		console.log('🏙️ City name computed:', cityName);
		console.log('🏢 Effective center name:', effectiveCenterName);
		
		// Build payload for CONTACT_US form type with city and centre keys
		const payload = buildFormPayload("CONTACT_US", {
			...formData,
			email: formData.workEmail,
			centerName: effectiveCenterName,
			city: cityName,
			centre: effectiveCenterName, // Add centre key
		});

		console.log('📦 Full payload being sent:', payload);
	
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
		<div
			className='w-full py-12 lg:py-16 px-4'
			style={{ backgroundColor: "#eaf4fb" }}
		>
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
							className='text-sm lg:text-base leading-snug mb-3'
							style={{ color: "#4B5563" }}
						>
							{location}
						</p>
						<p
							className='text-sm lg:text-base leading-snug mb-4'
							style={{ color: "#6B7280" }}
						>
							{centerDescription}
						</p>
						<div className='mt-3 flex items-start text-gray-600'>
							<svg
							className='w-4 h-4 mr-2 mt-0.5 shrink-0'
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
							<p className='text-sm'>
								{centerAddress
								? `iSprout ${effectiveCenterName}, ${centerAddress}`
								: `iSprout ${effectiveCenterName}`}
							</p>
						</div>
					</div>

					{/* Right Side - Form */}
					<div className='flex flex-col justify-center'>
						<div className='bg-white p-5 sm:p-6 md:p-8 rounded-xl w-full flex flex-col'>
							<div className='mb-4'>
								<h3
									className='text-lg font-bold mb-1'
									style={{ color: COLORS.brandBlueDark }}
								>
									Interested in this location?
								</h3>
								<p className='text-sm text-gray-600'>
									Complete the form to book a tour or connect
									with one of our team members to find out
									more
								</p>
							</div>

							<form onSubmit={handleSubmit} className='space-y-5'>
								{/* Full Name */}
								<CustomFloatingInput
									label='Full Name'
									value={formData.fullName}
									onChange={(v) =>
										setFormData({
											...formData,
											fullName: v,
										})
									}
									icon={<User size={18} />}
									required
								/>

								{/* Work Email and Phone Number - Same Row */}
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
									<CustomFloatingInput
										label='Work Email'
										type='email'
										value={formData.workEmail}
										onChange={(v) =>
											setFormData({
												...formData,
												workEmail: v,
											})
										}
										icon={<Mail size={18} />}
										required
									/>
									<CustomFloatingInput
										label='Phone Number'
										type='tel'
										value={formData.phoneNumber}
										onChange={(v) =>
											setFormData({
												...formData,
												phoneNumber: v,
											})
										}
										icon={<Phone size={18} />}
										required
									/>
								</div>

								{/* Company Name */}
								<CustomFloatingInput
									label='Company Name'
									value={formData.companyName}
									onChange={(v) =>
										setFormData({
											...formData,
											companyName: v,
										})
									}
									icon={<Building2 size={18} />}
									required
								/>

								{/* Required Seats */}
								<CustomFloatingInput
									label='Required Seats'
									type='number'
									value={formData.requiredSeats}
									onChange={(v) =>
										setFormData({
											...formData,
											requiredSeats: v,
										})
									}
									required
								/>

								{/* Terms Checkbox */}
								<label className='flex gap-3 text-sm'>
									<input
										type='checkbox'
										checked={formData.acceptTerms}
										onChange={(e) =>
											setFormData({
												...formData,
												acceptTerms: e.target.checked,
											})
										}
										required
									/>
									I accept all of iSprout's terms & conditions
								</label>

				{/* V3Recaptcha - User clicks to verify before submitting */}
				<V3Recaptcha
					action="lead_form_submit"
					onVerify={handleCaptchaVerify}
				/>

				{/* Success message */}
				{submissionResult && (
					<div className="text-green-600 text-sm text-center mb-2 font-semibold">{submissionResult}</div>
				)}

				{/* Submit Button - Centered */}
				<div className='flex justify-center pt-2'>
					<button
						type='submit'
						className='px-10 sm:px-12 py-3 rounded-xl font-semibold text-base transition-all hover:opacity-90'
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
			</div>
		</div>
	);
}
