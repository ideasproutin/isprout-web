import { useRef, useState, useCallback, useEffect, type FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
	MdPerson,
	MdPhone,
	MdEmail,
	MdBusiness,
	MdLocationOn,
} from "react-icons/md";
import { MetaTags } from "../../hooks/useMetaTags";
import virtualOfficeHero from "../../assets/virtualoffice/virtualoffice-hero.webp";
import formImage from "../../assets/virtualoffice/call-handling.png";
import WhyVirtualOffice from "./whyvirtualoffice";
import VirtualOfficeMap from "./map";
import Locations from "../home/components/locations";
import VirtualOfficeProcess from "./virtualoffice_process";
import YouTubeVideo from "../home/components/youtubevideo";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import V2Recaptcha from "../../components/Recaptcha/V2Recaptcha";
import { useFormSubmit, buildFormPayload } from "../../hooks/useFormSubmit";
import {
	fetchWebsiteForms,
	getWebsiteFormConfig,
	type WebsiteFormConfig,
	type WebsiteFormField,
} from "../../services/formServiceApi";

const normalizeFieldToken = (value: string | undefined) =>
	(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");

const getVirtualOfficeFieldRole = (
	field: WebsiteFormField,
): "fullName" | "phoneNumber" | "email" | "companyName" | "city" | "unknown" => {
	const icon = normalizeFieldToken(field.icon);
	const id = normalizeFieldToken(field.id);
	const name = normalizeFieldToken(field.name);
	const label = normalizeFieldToken(field.label);
	const merged = `${icon} ${id} ${name} ${label}`;
	const tokens = [icon, id, name, label].filter(Boolean);

	if (merged.includes("mdperson") || merged.includes("fullname") || tokens.includes("name")) return "fullName";
	if (merged.includes("mdphone") || merged.includes("mobile") || merged.includes("phonenumber")) return "phoneNumber";
	if (merged.includes("mdemail") || merged.includes("email")) return "email";
	if (merged.includes("mdbusiness") || merged.includes("company")) return "companyName";
	if (merged.includes("mdlocationon") || merged.includes("city")) return "city";
	return "unknown";
};

const VirtualOfficeIntro = () => {
	const formRef = useRef<HTMLDivElement | null>(null);
	const [formHeight, setFormHeight] = useState<number | undefined>(undefined);
	const [formConfigList, setFormConfigList] = useState<WebsiteFormConfig[]>([]);
	const [isFormSchemaLoading, setIsFormSchemaLoading] = useState(true);
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		phoneNumber: "",
		city: "",
		companyName: "",
	});
	const [submitting, setSubmitting] = useState(false);
	const [submissionResult, setSubmissionResult] = useState<string | null>(null);
	const [errors, setErrors] = useState({ fullName: "", phoneNumber: "" });
	const [touched, setTouched] = useState({ fullName: false, phoneNumber: false });
	const [captchaToken, setCaptchaToken] = useState<string>("");
	const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const validateName = (value: string) => {
		if (!value.trim()) return "Name is required.";
		if (value.trim().length > 50) return "Name cannot exceed 50 characters.";
		return "";
	};

	const validatePhone = (value: string) => {
		if (!value) return "Mobile number is required.";
		if (!/^\d+$/.test(value)) return "Mobile number can only contain digits.";
		const phoneWithoutLeadingZero = value.replace(/^0+/, "");
		if (phoneWithoutLeadingZero.length !== 10) return "Invalid phone number";
		return "";
	};

	const handleBlur = (field: "fullName" | "phoneNumber") => {
		setTouched((prev) => ({ ...prev, [field]: true }));
		if (field === "fullName") setErrors((prev) => ({ ...prev, fullName: validateName(formData.fullName) }));
		if (field === "phoneNumber") setErrors((prev) => ({ ...prev, phoneNumber: validatePhone(formData.phoneNumber) }));
	};

	useEffect(() => {
		let isMounted = true;
		fetchWebsiteForms("virtual_office")
			.then((configs) => {
				if (!isMounted) return;
				setFormConfigList(configs);
			})
			.finally(() => {
				if (isMounted) setIsFormSchemaLoading(false);
			});
		return () => {
			isMounted = false;
		};
	}, []);

	const virtualOfficeFormConfig = getWebsiteFormConfig(formConfigList, "virtual_office");
	const virtualOfficeFields = virtualOfficeFormConfig?.fields || [];

	const voFieldsToRender = virtualOfficeFields;

	const { submit: submitFormData, isSubmitting: isApiSubmitting } = useFormSubmit({
		successMessage:
			virtualOfficeFormConfig?.successMessage ||
			"Your virtual office inquiry has been submitted successfully! We'll contact you soon.",
		onSuccess: () => {
			setFormData({ fullName: "", email: "", phoneNumber: "", city: "", companyName: "" });
			const path = location.pathname.replace(/\/$/, "");
			navigate(`${path}/thankyou`);
		},
	});

	const isFormValid =
		formData.fullName &&
		!validateName(formData.fullName) &&
		formData.phoneNumber &&
		!validatePhone(formData.phoneNumber) &&
		isCaptchaVerified &&
		captchaToken &&
		!submitting &&
		!isApiSubmitting;

	const handleCaptchaVerify = useCallback((token: string, isVerified: boolean) => {
		setCaptchaToken(token);
		setIsCaptchaVerified(isVerified);
	}, []);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const nameErr = validateName(formData.fullName);
		const phoneErr = validatePhone(formData.phoneNumber);
		setTouched({ fullName: true, phoneNumber: true });
		setErrors({ fullName: nameErr, phoneNumber: phoneErr });
		if (nameErr || phoneErr) return;
		if (!isCaptchaVerified || !captchaToken) return;
		setSubmissionResult(null);
		setSubmitting(true);
		const payload = buildFormPayload("virtual_office", formData);
		try {
			await submitFormData(payload, captchaToken);
		} finally {
			setSubmitting(false);
		}
	};

	const getFieldValue = (fieldName: string) => {
		return String((formData as Record<string, string | number | boolean>)[fieldName] || "");
	};

	const renderField = (field: WebsiteFormField) => {
		const role = getVirtualOfficeFieldRole(field);
		const normalizedDynamicKey = normalizeFieldToken(field.id || field.name);
		const fallbackRoleMap: Record<string, string> = {
			name: "fullName",
			fullname: "fullName",
			mobilenumber: "phoneNumber",
			phonenumber: "phoneNumber",
			email: "email",
			companyname: "companyName",
			city: "city",
		};
		const fieldName =
			role === "unknown"
				? (fallbackRoleMap[normalizedDynamicKey] || normalizedDynamicKey)
				: role;
		const placeholder = field.placeholder || `${(field.label || field.name).toUpperCase()}${field.required ? " *" : ""}`;
		const commonClass = "w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-gray-900 placeholder-gray-600 focus:outline-none transition-colors text-sm";

		if (role === "fullName" || fieldName === "fullName") {
			return (
				<div className='mb-3' key={fieldName}>
					<div className='relative'>
						<input
							id='fullName'
							type='text'
							value={formData.fullName}
							onChange={(e) => {
								const value = e.target.value;
								if (value.startsWith(" ") && formData.fullName === "") return;
								if (/^[a-zA-Z\s]*$/.test(value) && value.length <= 50) {
									setFormData((prev) => ({ ...prev, fullName: value }));
									if (touched.fullName) setErrors((prev) => ({ ...prev, fullName: validateName(value) }));
								}
							}}
							onBlur={() => handleBlur("fullName")}
							placeholder={placeholder}
							className={commonClass}
							style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", borderColor: touched.fullName && errors.fullName ? "#ef4444" : "#00275c" }}
						/>
						<MdPerson className='absolute right-3 top-1/2 -translate-y-1/2' size={18} style={{ color: touched.fullName && errors.fullName ? "#ef4444" : "#00275c" }} />
					</div>
					{touched.fullName && errors.fullName && <p className='text-red-500 text-xs mt-1' style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>{errors.fullName}</p>}
				</div>
			);
		}

		if (role === "phoneNumber" || fieldName === "phoneNumber") {
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
								setFormData((prev) => ({ ...prev, phoneNumber: value }));
								if (touched.phoneNumber) setErrors((prev) => ({ ...prev, phoneNumber: validatePhone(value) }));
							}}
							onBlur={() => handleBlur("phoneNumber")}
							placeholder={placeholder}
							className={commonClass}
							style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", borderColor: touched.phoneNumber && errors.phoneNumber ? "#ef4444" : "#00275c" }}
						/>
						<MdPhone className='absolute right-3 top-1/2 -translate-y-1/2' size={18} style={{ color: touched.phoneNumber && errors.phoneNumber ? "#ef4444" : "#00275c" }} />
					</div>
					{touched.phoneNumber && errors.phoneNumber && <p className='text-red-500 text-xs mt-1' style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>{errors.phoneNumber}</p>}
				</div>
			);
		}

		if (role === "city" || fieldName === "city") {
			return (
				<div className='mb-3' key={fieldName}>
					<div className='relative'>
						<select
							id='city'
							value={formData.city}
							onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
							className='w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-gray-900 focus:outline-none transition-colors text-sm appearance-none'
							style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", borderColor: "#00275c", color: formData.city ? "#111827" : "#4B5563" }}
						>
							<option value='' disabled>{placeholder}</option>
							{(field.options || []).map((option) => {
								const optionValue = typeof option === "string" ? option : option.value;
								const optionLabel = typeof option === "string" ? option : option.label;
								return <option key={optionValue} value={optionValue}>{optionLabel}</option>;
							})}
						</select>
						<MdLocationOn className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none' size={18} style={{ color: "#00275c" }} />
					</div>
				</div>
			);
		}

		if (role === "companyName" || fieldName === "companyName") {
			return (
				<div className='mb-3' key={fieldName}>
					<div className='relative'>
						<input
							id='companyName'
							type='text'
							value={formData.companyName}
							onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
							placeholder={placeholder}
							className={commonClass}
							style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", borderColor: "#00275c" }}
						/>
						<MdBusiness className='absolute right-3 top-1/2 -translate-y-1/2' size={18} style={{ color: "#00275c" }} />
					</div>
				</div>
			);
		}

		if (role === "email" || fieldName === "email" || fieldName === "workEmail") {
			return (
				<div className='mb-3' key={fieldName}>
					<div className='relative'>
						<input
							id={fieldName}
							type='email'
							value={fieldName === "email" ? formData.email : formData.email}
							onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value.replace(/\s/g, "").slice(0, 100) }))}
							placeholder={placeholder}
							className={commonClass}
							style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", borderColor: "#00275c" }}
						/>
						<MdEmail className='absolute right-3 top-1/2 -translate-y-1/2' size={18} style={{ color: "#00275c" }} />
					</div>
				</div>
			);
		}

		return (
			<div className='mb-3' key={fieldName}>
				<div className='relative'>
					<input
						id={field.id || field.name}
						type={field.type === "number" ? "number" : field.type === "tel" ? "tel" : field.type === "email" ? "email" : "text"}
						value={getFieldValue(fieldName)}
						onChange={(e) => setFormData((prev) => ({ ...prev, [fieldName]: e.target.value }))}
						placeholder={placeholder}
						className={commonClass}
						style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", borderColor: "#00275c" }}
					/>
					<MdBusiness className='absolute right-3 top-1/2 -translate-y-1/2' size={18} style={{ color: "#00275c" }} />
				</div>
			</div>
		);
	};

	useEffect(() => {
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
			<MetaTags
				title='iSprout: Premium Virtual Office Solutions'
				description='Start your business with iSprout virtual offices offering legal address, GST support, and flexible workspace access.'
			/>
			<section
				className='relative w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-cover bg-center flex items-end mt-20 sm:mt-16 md:mt-20 lg:mt-24'
				style={{ backgroundImage: `url(${virtualOfficeHero})` }}
			>
				<div className='absolute bottom-0 left-0 right-0 z-10 bg-black/20 py-4 md:py-5 lg:py-6 px-8 md:px-16 lg:px-24'>
					<h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold font-sans tracking-tight leading-none">
						Virtual Office
					</h1>
				</div>
			</section>

			<section className='py-10 sm:py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-16 bg-white'>
				<div className='max-w-7xl mx-auto'>
					<div className='mb-8 sm:mb-10'>
						<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4' style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: "#00275c" }}>
							<span>Set Up Your </span>
							<span style={{ color: "#FFDE00" }}>Virtual Office</span>
							<span> Today</span>
						</h2>
						<p className='text-base sm:text-lg md:text-xl' style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
							Share your details, choose your city, and our team will help you set up a premium business address with professional support services.
						</p>
					</div>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-start'>
						<div className='hidden lg:flex items-center justify-center w-full h-full'>
							<div className='rounded-2xl overflow-hidden w-full' style={formHeight ? { height: formHeight } : { minHeight: "500px" }}>
								<img alt='Virtual Office Space' className='w-full h-full object-contain' src={formImage} />
							</div>
						</div>

						<div ref={formRef} className='bg-white p-5 sm:p-6 md:p-8 rounded-xl w-full max-w-md mx-auto flex flex-col'>
							<form onSubmit={handleSubmit}>
								{isFormSchemaLoading ? (
									<div className='h-72 animate-pulse rounded-xl bg-gray-100' />
								) : (
									voFieldsToRender.map(renderField)
								)}

								<div className='mb-3 mt-4 flex justify-center'>
									<V2Recaptcha onVerify={handleCaptchaVerify} />
								</div>

								{submissionResult && (
									<div className='text-green-400 text-sm text-center mb-2 font-semibold'>
										{submissionResult}
									</div>
								)}

								<button
									type='submit'
									className='w-full py-3 rounded-xl font-semibold text-base transition-all'
									style={{
										backgroundColor: "#FFDE00",
										color: "#00275c",
										fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
										opacity: isFormValid ? 1 : 0.6,
										cursor: isFormValid ? "pointer" : "not-allowed",
									}}
									disabled={!isFormValid || isFormSchemaLoading}
								>
										{submitting || isApiSubmitting ? "Submitting..." : "SUBMIT"}
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
			<YouTubeVideo />
			<Footer />
			<ScrollToTop />
		</div>
	);
};

export default VirtualOfficeIntro;
