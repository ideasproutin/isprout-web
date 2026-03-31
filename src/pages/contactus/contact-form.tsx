import React, { useEffect, useMemo, useRef, useState } from "react";
import { MdBusiness, MdEmail, MdMessage, MdPerson, MdPhone } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect";
import V2Recaptcha from "../../components/Recaptcha/V2Recaptcha";
import formImage from "../../assets/contactus/contact-form.png";
import { fetchWebsiteForms, getWebsiteFormConfig, type WebsiteFormConfig, type WebsiteFormField } from "../../services/formServiceApi";
import { useFormSubmit, buildFormPayload } from "../../hooks/useFormSubmit";

interface FormData {
	fullName: string;
	workEmail: string;
	phoneNumber: string;
	message: string;
}

const normalizeFieldToken = (value: string | undefined) =>
	(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");

const getFieldRole = (field: WebsiteFormField): "fullName" | "phoneNumber" | "workEmail" | "message" | "unknown" => {
	const icon = normalizeFieldToken(field.icon);
	const id = normalizeFieldToken(field.id);
	const name = normalizeFieldToken(field.name);
	const label = normalizeFieldToken(field.label);
	const merged = `${icon} ${id} ${name} ${label}`;

	if (merged.includes("mdperson") || merged.includes("person") || id === "name" || name === "name") return "fullName";
	if (merged.includes("mdphone") || merged.includes("phone") || merged.includes("mobile")) return "phoneNumber";
	if (merged.includes("mdemail") || merged.includes("email")) return "workEmail";
	if (merged.includes("mdmessage") || merged.includes("message") || merged.includes("comment") || merged.includes("enquiry")) return "message";
	return "unknown";
};

const getFieldIcon = (field: WebsiteFormField, role: ReturnType<typeof getFieldRole>) => {
	const iconToken = normalizeFieldToken(field.icon);

	if (iconToken.includes("mdperson")) return MdPerson;
	if (iconToken.includes("mdphone")) return MdPhone;
	if (iconToken.includes("mdemail")) return MdEmail;
	if (iconToken.includes("mdbusiness")) return MdBusiness;
	if (iconToken.includes("mdmessage")) return MdMessage;

	if (role === "fullName") return MdPerson;
	if (role === "phoneNumber") return MdPhone;
	if (role === "workEmail") return MdEmail;
	if (role === "message") return MdMessage;

	return null;
};

export default function ContactForm() {
	const formRef = useRef<HTMLDivElement | null>(null);
	const navigate = useNavigate();
	const location = useLocation();
	const [formHeight, setFormHeight] = useState<number | undefined>(undefined);
	const [websiteForms, setWebsiteForms] = useState<WebsiteFormConfig[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const [formData, setFormData] = useState<FormData>({
		fullName: "",
		workEmail: "",
		phoneNumber: "",
		message: "",
	});

	const [captchaToken, setCaptchaToken] = useState<string>("");
	const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
	const [errors, setErrors] = useState({
		fullName: "",
		phoneNumber: "",
		workEmail: "",
		message: "",
	});

	const contactFormConfig = useMemo(
		() => getWebsiteFormConfig(websiteForms, "contact_us"),
		[websiteForms],
	);
	const contactFormFields = contactFormConfig?.fields || [];

	const contactFieldsToRender = contactFormFields;

	const { submit: submitFormData, isSubmitting } = useFormSubmit({
		successMessage: contactFormConfig?.successMessage,
		onSuccess: () => {
			const path = location.pathname.replace(/\/$/, "");
			navigate(`${path}/thankyou`);
		},
	});

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const validateName = (value: string): string => {
		const trimmedValue = value.trim();
		if (!trimmedValue) return "Name is required";
		if (trimmedValue.length < 2) return "Name must be at least 2 characters";
		if (value !== value.trim()) return "Name cannot start or end with spaces";
		if (!/^[a-zA-Z\s]+$/.test(trimmedValue)) return "Name can only contain letters and spaces";
		if (trimmedValue.length > 50) return "Name must not exceed 50 characters";
		return "";
	};

	const validatePhone = (value: string): string => {
		const trimmedValue = value.trim();
		if (!trimmedValue) return "Mobile number is required";
		if (!/^\d+$/.test(trimmedValue)) return "Mobile number can only contain digits";
		const phoneWithoutLeadingZero = trimmedValue.replace(/^0+/, "");
		if (phoneWithoutLeadingZero.length !== 10) return "Invalid phone number";
		return "";
	};

	const validateEmail = (value: string): string => {
		const trimmedValue = value.trim();
		if (trimmedValue) {
			if (/\s/.test(value)) return "Email address cannot contain spaces";
			if (!emailRegex.test(trimmedValue)) return "Please enter a valid email address (e.g., user@example.com)";
		}
		if (value.length > 100) return "Email must not exceed 100 characters";
		return "";
	};

	const validateMessage = (value: string): string => {
		if (value.length > 500) return "Enquiry/Comments must not exceed 500 characters";
		if (value && !value.trim()) return "Please enter valid content (not just spaces)";
		return "";
	};

	useEffect(() => {
		let isMounted = true;
		fetchWebsiteForms("contact_us")
			.then((configs) => {
				if (!isMounted) return;
				setWebsiteForms(configs);
			})
			.finally(() => {
				if (isMounted) setIsLoading(false);
			});

		return () => {
			isMounted = false;
		};
	}, []);

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

	const handleCaptchaVerify = (token: string, isVerified: boolean) => {
		setCaptchaToken(token);
		setIsCaptchaVerified(isVerified);
	};

	const isFormValid =
		formData.fullName.trim().length >= 2 &&
		/^[a-zA-Z\s]+$/.test(formData.fullName.trim()) &&
		!validatePhone(formData.phoneNumber) &&
		(!formData.workEmail.trim() || emailRegex.test(formData.workEmail.trim())) &&
		formData.message.length <= 500 &&
		!errors.fullName &&
		!errors.phoneNumber &&
		!errors.workEmail &&
		!errors.message &&
		isCaptchaVerified &&
		captchaToken &&
		!isSubmitting;

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!isCaptchaVerified || !captchaToken) return;

		const payload = buildFormPayload("contact_us", {
			fullName: formData.fullName,
			phoneNumber: formData.phoneNumber,
			email: formData.workEmail,
			comments: formData.message,
		});

		await submitFormData(payload, captchaToken);
	};

	const renderField = (field: WebsiteFormField | undefined) => {
		if (!field) return null;
		const role = getFieldRole(field);
		const Icon = getFieldIcon(field, role);
		const label = field.label || field.name;
		const placeholder = field.placeholder || (field.required ? `${label} *` : label);
		const commonClass = "w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-gray-900 placeholder-gray-600 focus:outline-none transition-colors text-sm";
		const isMessageField = role === "message" || field.type === "textarea";

		if (isMessageField) {
			return (
				<div className='mb-3' key={field.id || field.name}>
					<div className='relative'>
						<textarea
							id={field.id || field.name}
							value={formData.message}
							onChange={(e) => {
								const value = e.target.value.slice(0, 500);
								setFormData({ ...formData, message: value });
								setErrors({ ...errors, message: validateMessage(value) });
							}}
							onBlur={(e) => setErrors({ ...errors, message: validateMessage(e.target.value) })}
							placeholder={placeholder}
							className={`${commonClass} resize-none`}
							style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", borderColor: errors.message ? "#ef4444" : "#00275c", minHeight: "60px" }}
							rows={field.rows || 2}
							maxLength={500}
						/>
						{Icon && (
							<Icon
								className='absolute right-2 top-3 text-gray-400 pointer-events-none'
								size={20}
							/>
						)}
					</div>
					{errors.message && <p className='text-red-500 text-xs mt-1' style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>{errors.message}</p>}
					<p className='text-gray-500 text-xs mt-1 text-right' style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>{formData.message.length}/500 characters</p>
				</div>
			);
		}

		const value = role === "workEmail" ? formData.workEmail : role === "phoneNumber" ? formData.phoneNumber : formData.fullName;
		const borderColor = role === "fullName"
			? errors.fullName
				? "#ef4444"
				: "#00275c"
			: role === "phoneNumber"
				? errors.phoneNumber
					? "#ef4444"
					: "#00275c"
				: role === "workEmail"
					? errors.workEmail
						? "#ef4444"
						: "#00275c"
					: "#00275c";

		const inputType = role === "workEmail" ? "email" : role === "phoneNumber" ? "tel" : (field.type === "number" ? "number" : "text");

		return (
			<div className='mb-3' key={field.id || field.name}>
				<div className='relative'>
					<input
						id={field.id || field.name}
						type={inputType}
						value={value}
						onChange={(e) => {
							const nextValue = e.target.value;
							if (role === "fullName") {
								if (nextValue.startsWith(" ") && formData.fullName === "") return;
								if (/^[a-zA-Z\s]*$/.test(nextValue) && nextValue.length <= 50) {
									setFormData({ ...formData, fullName: nextValue });
									setErrors({ ...errors, fullName: validateName(nextValue) });
								}
							}
							if (role === "phoneNumber") {
								const digits = nextValue.replace(/\D/g, "");
								setFormData({ ...formData, phoneNumber: digits });
								setErrors({ ...errors, phoneNumber: validatePhone(digits) });
							}
							if (role === "workEmail") {
								const emailValue = nextValue.replace(/\s/g, "").slice(0, 100);
								setFormData({ ...formData, workEmail: emailValue });
								setErrors({ ...errors, workEmail: validateEmail(emailValue) });
							}
						}}
						onBlur={(e) => {
							if (role === "fullName") setErrors({ ...errors, fullName: validateName(e.target.value) });
							if (role === "phoneNumber") setErrors({ ...errors, phoneNumber: validatePhone(e.target.value) });
							if (role === "workEmail") setErrors({ ...errors, workEmail: validateEmail(e.target.value) });
						}}
						placeholder={placeholder}
						maxLength={field.max || (role === "phoneNumber" ? 10 : 100)}
						className={commonClass}
						style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", borderColor }}
					/>
					{Icon && (
						<Icon
							className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
							size={20}
						/>
					)}
				</div>
				{role === "fullName" && errors.fullName && <p className='text-red-500 text-xs mt-1' style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>{errors.fullName}</p>}
				{role === "phoneNumber" && errors.phoneNumber && <p className='text-red-500 text-xs mt-1' style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>{errors.phoneNumber}</p>}
				{role === "workEmail" && errors.workEmail && <p className='text-red-500 text-xs mt-1' style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>{errors.workEmail}</p>}
			</div>
		);
	};

	return (
		<section className='w-full py-12 lg:py-16 px-4 bg-white'>
			<div className='max-w-7xl mx-auto'>
				<div className='mb-8 sm:mb-10'>
					<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4' style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: "#00275c" }}>
						{contactFormConfig?.formTitle || ""}
					</h2>
					<p className='text-base sm:text-lg md:text-xl' style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
						{contactFormConfig?.subtitle || ""}
					</p>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-start'>
					<div className='hidden lg:flex items-center justify-center w-full h-full'>
						<div className='rounded-2xl overflow-hidden w-full' style={formHeight ? { height: formHeight } : { minHeight: "500px" }}>
							<img alt='Contact Us' className='w-full h-full object-cover' src={formImage} />
						</div>
					</div>

					<div ref={formRef} className='bg-white p-5 sm:p-6 md:p-8 rounded-xl w-full max-w-md mx-auto flex flex-col'>
						<form onSubmit={handleFormSubmit} className='w-full'>
							{isLoading ? (
								<div className='h-64 animate-pulse rounded-xl bg-gray-100' />
							) : (
								contactFieldsToRender.map((field) => renderField(field))
							)}

							<div className='mb-3 mt-2 flex justify-center'>
								<V2Recaptcha onVerify={handleCaptchaVerify} />
							</div>

							<button type='submit' className='w-full py-3 rounded-xl font-semibold text-base transition-all' style={{ backgroundColor: "#FFDE00", color: "#00275c", fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", opacity: isFormValid ? 1 : 0.6, cursor: isFormValid ? "pointer" : "not-allowed" }} disabled={!isFormValid || isLoading || isSubmitting}>
								{isSubmitting ? "Submitting..." : contactFormConfig?.submitButtonText || "SUBMIT"}
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
