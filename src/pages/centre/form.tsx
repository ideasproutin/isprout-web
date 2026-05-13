import { COLORS } from "../../helpers/constants/Colors";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { MdPerson, MdPhone, MdEmail, MdBusiness } from "react-icons/md";
import cityPageData from "../../content/city&CenterObject.json";
import { useCityCenters } from "../../hooks/useCityCentre";
import V2Recaptcha from "../../components/Recaptcha/V2Recaptcha";
import { useFormSubmit, buildFormPayload } from "../../hooks/useFormSubmit";
import {
	fetchWebsiteForms,
	getWebsiteFormConfig,
	type WebsiteFormConfig,
	type WebsiteFormField,
} from "../../services/formServiceApi";

interface FormProps {
	centerName?: string;
	location?: string;
}

const normalizeFieldToken = (value: string | undefined) =>
	(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");

const getCenterFieldRole = (
	field: WebsiteFormField,
): "fullName" | "phoneNumber" | "workEmail" | "companyName" | "requiredSeats" | "unknown" => {
	const icon = normalizeFieldToken(field.icon);
	const id = normalizeFieldToken(field.id);
	const name = normalizeFieldToken(field.name);
	const label = normalizeFieldToken(field.label);
	const merged = `${icon} ${id} ${name} ${label}`;
	const tokens = [icon, id, name, label].filter(Boolean);

	if (
		merged.includes("mdperson") ||
		merged.includes("fullname") ||
		tokens.includes("name")
	) return "fullName";
	if (merged.includes("mdphone") || merged.includes("mobile") || merged.includes("phonenumber")) return "phoneNumber";
	if (merged.includes("mdemail") || merged.includes("email")) return "workEmail";
	if (merged.includes("mdbusiness") || merged.includes("company")) return "companyName";
	if (merged.includes("requiredseats") || merged.includes("seats")) return "requiredSeats";
	return "unknown";
};

const getCenterFieldIcon = (
	field: WebsiteFormField,
	role: ReturnType<typeof getCenterFieldRole>,
) => {
	const iconToken = normalizeFieldToken(field.icon);

	if (iconToken.includes("mdperson")) return MdPerson;
	if (iconToken.includes("mdphone")) return MdPhone;
	if (iconToken.includes("mdemail")) return MdEmail;
	if (iconToken.includes("mdbusiness")) return MdBusiness;

	if (role === "fullName") return MdPerson;
	if (role === "phoneNumber") return MdPhone;
	if (role === "workEmail") return MdEmail;
	if (role === "companyName") return MdBusiness;

	return MdBusiness;
};

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
	const [websiteForms, setWebsiteForms] = useState<WebsiteFormConfig[]>([]);
	const [isFormSchemaLoading, setIsFormSchemaLoading] = useState(true);

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

	// Auto-fill form with user data when logged in
	useEffect(() => {
		const accessToken = localStorage.getItem("accessToken");
		if (!accessToken) return;
		try {
			const raw = localStorage.getItem("authUser");
			if (!raw) return;
			const authUser = JSON.parse(raw);
			setFormData((prev) => ({
				...prev,
				fullName: prev.fullName || authUser.fullName || "",
				workEmail: prev.workEmail || authUser.email || "",
				phoneNumber: prev.phoneNumber || authUser.mobile || "",
			}));
		} catch {
			// ignore
		}
	}, []);

	useEffect(() => {
		let isMounted = true;
		fetchWebsiteForms("center")
			.then((configs) => {
				if (!isMounted) return;
				setWebsiteForms(configs);
			})
			.finally(() => {
				if (isMounted) setIsFormSchemaLoading(false);
			});

		return () => {
			isMounted = false;
		};
	}, []);

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
		const payload = buildFormPayload("center", {
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

	const centerFormConfig = getWebsiteFormConfig(websiteForms, "center");
	const centerFormFields = centerFormConfig?.fields || [];

	const fieldsToRender = centerFormFields;

	const renderCenterField = (field: WebsiteFormField) => {
		const role = getCenterFieldRole(field);
		const Icon = getCenterFieldIcon(field, role);
		const normalizedDynamicKey = normalizeFieldToken(field.id || field.name);
		const fallbackRoleMap: Record<string, string> = {
			name: "fullName",
			fullname: "fullName",
			mobilenumber: "phoneNumber",
			phone: "phoneNumber",
			phonenumber: "phoneNumber",
			email: "workEmail",
			companyname: "companyName",
			requiredseats: "requiredSeats",
		};
		const fieldName =
			role === "unknown"
				? (fallbackRoleMap[normalizedDynamicKey] || normalizedDynamicKey)
				: role;
		const placeholder = field.placeholder || `${(field.label || field.name).toUpperCase()}${field.required ? " *" : ""}`;
		const commonClass = 'w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-gray-900 placeholder-gray-600 focus:outline-none transition-colors text-sm';

		if (role === "fullName") {
			return (
				<div className='mb-3' key={fieldName}>
					<div className='relative'>
						<input
							id='fullName'
							type='text'
							name='fullName'
							value={formData.fullName}
							maxLength={50}
							onChange={(e) => {
								const value = e.target.value;
								if (value.startsWith(' ') && formData.fullName === '') return;
								if (/^[a-zA-Z\s]*$/.test(value) && value.length <= 50) {
									setFormData({ ...formData, fullName: value });
									if (touched.fullName) setErrors((prev) => ({ ...prev, fullName: validateName(value) }));
								}
							}}
							onBlur={() => handleBlur("fullName")}
							placeholder={placeholder}
							className={commonClass}
							style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", borderColor: touched.fullName && errors.fullName ? "#ef4444" : "#00275c" }}
						/>
						<Icon className='absolute right-3 top-1/2 -translate-y-1/2' size={18} style={{ color: touched.fullName && errors.fullName ? "#ef4444" : "#00275c" }} />
					</div>
					{touched.fullName && errors.fullName && <p className='text-red-500 text-xs mt-1' style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>{errors.fullName}</p>}
				</div>
			);
		}

		if (role === "phoneNumber") {
			return (
				<div className='mb-3' key={fieldName}>
					<div className='relative'>
						<input
							id='phoneNumber'
							type='tel'
							value={formData.phoneNumber}
							inputMode='numeric'
							onChange={(e) => {
								const value = e.target.value.replace(/\D/g, "");
								setFormData({ ...formData, phoneNumber: value });
								if (touched.phoneNumber) setErrors((prev) => ({ ...prev, phoneNumber: validatePhone(value) }));
							}}
							onBlur={() => handleBlur("phoneNumber")}
							placeholder={placeholder}
							className={commonClass}
							style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", borderColor: touched.phoneNumber && errors.phoneNumber ? "#ef4444" : "#00275c" }}
						/>
						<Icon className='absolute right-3 top-1/2 -translate-y-1/2' size={18} style={{ color: touched.phoneNumber && errors.phoneNumber ? "#ef4444" : "#00275c" }} />
					</div>
					{touched.phoneNumber && errors.phoneNumber && <p className='text-red-500 text-xs mt-1' style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>{errors.phoneNumber}</p>}
				</div>
			);
		}

		if (role === "requiredSeats") {
			return (
				<div className='mb-3 group' key={fieldName}>
					<div className='relative'>
						<input
							id='requiredSeats'
							type='number'
							value={formData.requiredSeats}
							onChange={(e) => {
								const value = e.target.value === '' ? '' : parseInt(e.target.value, 10);
								setFormData((prev) => ({ ...prev, requiredSeats: Number.isNaN(value) ? '' : (value as number) }));
							}}
							onBlur={(e) => {
								const value = Math.max(1, parseInt(e.target.value, 10) || 1);
								setFormData((prev) => ({ ...prev, requiredSeats: value }));
							}}
							placeholder={placeholder}
							className='w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-gray-900 placeholder-gray-600 focus:outline-none transition-colors text-left text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
							style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", borderColor: "#00275c" }}
							min='1'
						/>
						<div className='absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity'>
							<button type='button' onClick={handleIncrementSeats} className='text-gray-900 hover:opacity-70 transition-opacity p-0 leading-none' style={{ background: "none", border: "none" }}>
								<svg width='8' height='5' viewBox='0 0 10 6' fill='#00275c'><path d='M5 0L10 6H0L5 0Z' /></svg>
							</button>
							<button type='button' onClick={handleDecrementSeats} className='text-gray-900 hover:opacity-70 transition-opacity p-0 leading-none' style={{ background: "none", border: "none" }}>
								<svg width='8' height='5' viewBox='0 0 10 6' fill='#00275c'><path d='M5 6L0 0H10L5 6Z' /></svg>
							</button>
						</div>
					</div>
				</div>
			);
		}

		if (field.type === "select") {
			const options = field.options || [];
			return (
				<div className='mb-3' key={field.name}>
					<div className='relative'>
						<select
							id={field.id || field.name}
							value={String((formData as Record<string, string | number | boolean>)[fieldName] || "")}
							onChange={(e) => setFormData((prev) => ({ ...prev, [fieldName]: e.target.value }))}
							className='w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-gray-900 focus:outline-none transition-colors text-sm appearance-none'
							style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", borderColor: "#00275c", color: (formData as Record<string, string | number | boolean>)[fieldName] ? "#111827" : "#4B5563" }}
						>
							<option value='' disabled>{placeholder}</option>
							{options.map((option) => {
								const optionValue = typeof option === "string" ? option : option.value;
								const optionLabel = typeof option === "string" ? option : option.label;
								return <option key={optionValue} value={optionValue}>{optionLabel}</option>;
							})}
						</select>
						<Icon className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none' size={18} style={{ color: "#00275c" }} />
					</div>
				</div>
			);
		}

		return (
			<div className='mb-3' key={field.name}>
				<div className='relative'>
					<input
						id={field.id || field.name}
						type={role === "workEmail" ? "email" : field.type === "tel" ? "tel" : "text"}
						value={String((formData as Record<string, string | number | boolean>)[fieldName] || "")}
						onChange={(e) => {
							const value = e.target.value;
							if (role === "workEmail") {
								const nextEmail = value.replace(/\s/g, "").slice(0, 100);
								setFormData((prev) => ({ ...prev, workEmail: nextEmail }));
								return;
							}
							setFormData((prev) => ({ ...prev, [fieldName]: value }));
						}}
						placeholder={placeholder}
						className={commonClass}
						style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", borderColor: "#00275c" }}
					/>
					<Icon className='absolute right-3 top-1/2 -translate-y-1/2' size={18} style={{ color: "#00275c" }} />
				</div>
			</div>
		);
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

					<div className='flex flex-col justify-center'>
						<div className='rounded-2xl p-5 lg:p-6 w-full max-w-md mx-auto flex flex-col bg-white'>
							<form onSubmit={handleSubmit}>
								{isFormSchemaLoading ? (
									<div className='h-64 animate-pulse rounded-xl bg-gray-100' />
								) : (
									fieldsToRender.map(renderCenterField)
								)}
								<div className='mb-3 mt-4 flex justify-center'>
									<V2Recaptcha onVerify={handleCaptchaVerify} />
								</div>
								{submissionResult && <div className='text-green-400 text-sm text-center mb-2 font-semibold'>{submissionResult}</div>}
								<button type='submit' className='w-full py-3 rounded-xl font-semibold text-base transition-all' style={{ backgroundColor: "#FFDE00", color: COLORS.brandBlue, fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", opacity: isFormValid ? 1 : 0.6, cursor: isFormValid ? "pointer" : "not-allowed" }} disabled={!isFormValid || isFormSchemaLoading}>
									{submitting || isApiSubmitting ? "Submitting..." : "SUBMIT"}
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
