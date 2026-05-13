import React, { useRef, useState, useCallback, useEffect } from "react";
import V2Recaptcha from "../../components/Recaptcha/V2Recaptcha";
import { useFormSubmit, buildFormPayload } from "../../hooks/useFormSubmit";
import toast from "react-hot-toast";
import {
	MdLocationOn,
	MdPhone,
	MdEmail,
	MdPerson,
	MdFileUpload,
} from "react-icons/md";
import ThankYouModal from "../../components/ThankYouModal/ThankYouModal";
import { useCityCenters } from "../../hooks/useCityCentre";
import { useCareers } from "../../hooks/useCareers";
import type { CareersFormField } from "../../services/careersApi";

export interface JobData {
	title: string;
	location: string;
	experience: string;
	type: string;
	postedDate: string;
	industry: string;
	qualification: string;
	description: string;
	keyResponsibilities: string[];
	jobImageUrl?: string;
}

interface ApplicationFormProps {
	jobData: JobData;
	onClose: () => void;
}

interface FormInputProps {
	label: string;
	type?: string;
	required?: boolean;
	icon?: React.ReactNode;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}

// Helper Components
interface FormInputPropsExtended extends FormInputProps {
	error?: string;
	onBlur?: () => void;
}

const FormInput = ({
	label,
	type = "text",
	required = true,
	icon,
	value,
	onChange,
	placeholder,
	error,
	onBlur,
}: FormInputPropsExtended) => (
	<div className='mb-3'>
		<div className='relative'>
			<input
				type={type}
				required={required}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				onBlur={onBlur}
				placeholder={
					placeholder
						? `${placeholder}${required ? " *" : ""}`
						: `${label.toUpperCase()}${required ? " *" : ""}`
				}
				className={`w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-gray-900 placeholder-gray-600 focus:outline-none transition-colors text-sm ${
					error ? "border-red-500" : ""
				}`}
				style={{
					borderColor: error ? "#ef4444" : "#00275c",
					fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
				}}
			/>
			{icon && (
				<div className='absolute right-0 top-1/2 -translate-y-1/2'>
					{icon}
				</div>
			)}
		</div>
		{error && (
			<p
				className='text-red-500 text-xs mt-1'
				style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
			>
				{error}
			</p>
		)}
	</div>
);

const InfoItem = ({
	icon,
	title,
	value,
}: {
	icon: React.ReactNode;
	title: string;
	value: string;
}) => (
	<div className='flex gap-2'>
		<div className='shrink-0'>{icon}</div>
		<div>
			<div className='mb-2'>
				<span
					className='text-sm font-medium'
					style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
				>
					{title}
				</span>
			</div>
			<p
				className='text-sm'
				style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: "#666" }}
			>
				{value}
			</p>
		</div>
	</div>
);

// Icons

const YellowStarIcon = () => (
	<svg className='w-5 h-5' fill='#FFDE00' viewBox='0 0 24 24'>
		<path d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z' />
	</svg>
);

const YellowCheckIcon = () => (
	<svg className='w-5 h-5' fill='#FFDE00' viewBox='0 0 24 24'>
		<path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
	</svg>
);

const YellowBriefcaseIcon = () => (
	<svg className='w-5 h-5' fill='#FFDE00' viewBox='0 0 24 24'>
		<path d='M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z' />
	</svg>
);

const YellowGraduationIcon = () => (
	<svg className='w-5 h-5' fill='#FFDE00' viewBox='0 0 24 24'>
		<path d='M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z' />
	</svg>
);

const ApplicationForm: React.FC<ApplicationFormProps> = ({
	jobData,
	onClose,
}) => {
	const formRef = useRef<HTMLDivElement>(null);
	const modalRef = useRef<HTMLDivElement>(null);

	// Fetch cities from API
	const { data: cityCentersData } = useCityCenters();
	const { data: careersData } = useCareers();
	const cities =
		cityCentersData?.map((city: { cityName: string }) => city.cityName) ||
		[];

	const applicationFormConfig = careersData?.applicationFormData;
	const applicationFields = applicationFormConfig?.fields || [];
	const getFieldConfig = (fieldName: string): CareersFormField | undefined =>
		applicationFields.find((field) => field.name === fieldName);

	const firstNameField = getFieldConfig("firstName");
	const lastNameField = getFieldConfig("lastName");
	const emailField = getFieldConfig("emailAddress");
	const phoneField = getFieldConfig("phoneNumber");
	const resumeField = getFieldConfig("uploadResume");
	const locationField = getFieldConfig("yourLocation");

	const formTitle = applicationFormConfig?.formTitle || "Apply Now";
	const submitButtonText = applicationFormConfig?.submitButtonText || "Submit";
	const successMessage =
		applicationFormConfig?.successMessage ||
		"Application submitted successfully!";

	// Form state
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		resume: null as File | null,
		location: jobData.location || "",
	});

	// Validation error states
	const [errors, setErrors] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
	});

	// Email validation regex
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	// Validation functions
	const validateName = (value: string, fieldName: string): string => {
		const trimmedValue = value.trim();
		if (!trimmedValue) {
			return `${fieldName} is required`;
		}
		if (trimmedValue.length < 2) {
			return `${fieldName} must be at least 2 characters`;
		}
		if (/\s/.test(value)) {
			return `${fieldName} cannot contain spaces`;
		}
		if (!/^[a-zA-Z]+$/.test(trimmedValue)) {
			return `${fieldName} can only contain letters`;
		}
		if (trimmedValue.length > 50) {
			return `${fieldName} must not exceed 50 characters`;
		}
		return "";
	};

	const validateEmail = (value: string): string => {
		const trimmedValue = value.trim();
		if (!trimmedValue) {
			return "Email is required";
		}
		if (/\s/.test(value)) {
			return "Email address cannot contain spaces";
		}
		if (!emailRegex.test(trimmedValue)) {
			return "Please enter a valid email address";
		}
		if (value.length > 100) {
			return "Email must not exceed 100 characters";
		}
		return "";
	};

	const validatePhone = (value: string): string => {
		const trimmedValue = value.trim();
		if (!trimmedValue) {
			return "Phone number is required";
		}
		if (!/^\d+$/.test(trimmedValue)) {
			return "Phone number can only contain digits";
		}
		// Remove leading 0 if present
		const phoneWithoutLeadingZero = trimmedValue.replace(/^0+/, '');
		// Check if exactly 10 digits after removing leading 0
		if (phoneWithoutLeadingZero.length !== 10) {
			return "Invalid phone number";
		}
		return "";
	};

	// Captcha state
	const [captchaToken, setCaptchaToken] = useState<string>("");
	const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

	// Submission state
	const [submissionResult, setSubmissionResult] = useState<string | null>(
		null,
	);

	// Upload state
	const [isUploading, setIsUploading] = useState(false);
	const [uploadedFileData, setUploadedFileData] = useState<{
		name: string;
		url?: string;
		data?: string;
	} | null>(null);

	// Thank you modal state
	const [showThankYouModal, setShowThankYouModal] = useState(false);

	// Prevent background scrolling when modal is open
	useEffect(() => {
		// Save current scroll position
		const scrollY = window.scrollY;
		document.body.style.position = "fixed";
		document.body.style.top = `-${scrollY}px`;
		document.body.style.width = "100%";
		document.body.style.overflow = "hidden";

		// Cleanup function to restore scroll position on unmount
		return () => {
			const scrollY = document.body.style.top;
			document.body.style.position = "";
			document.body.style.top = "";
			document.body.style.width = "";
			document.body.style.overflow = "";
			if (scrollY) {
				window.scrollTo(0, parseInt(scrollY || "0") * -1);
			}
		};
	}, []);

	// Form submission hook
	const { submit: submitFormData, isSubmitting } = useFormSubmit({
		onSuccess: () => {
			// Show thank you modal
			setShowThankYouModal(true);

			// Reset form on success
			setFormData({
				firstName: "",
				lastName: "",
				email: "",
				phoneNumber: "",
				resume: null,
				location: jobData.location || "",
			});
			setUploadedFileData(null);
			setSubmissionResult(successMessage);
		},
	});

	// Close modal on outside click
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Element;

			// Ignore clicks on reCAPTCHA iframes/elements rendered outside the modal DOM
			if (
				target.tagName === "IFRAME" &&
				(target.getAttribute("title")
					?.toLowerCase()
					.includes("recaptcha") ||
					(target as HTMLIFrameElement).src
						?.toLowerCase()
						.includes("recaptcha"))
			) {
				return;
			}

			// Also ignore clicks on reCAPTCHA container elements appended to body
			if (
				target.closest(
					'[class*="recaptcha"], [id*="recaptcha"], [class*="rc-anchor"], [id*="rc-anchor"]',
				)
			) {
				return;
			}

			if (
				modalRef.current &&
				!modalRef.current.contains(target as Node)
			) {
				onClose();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [onClose]);

	// Handle thank you modal close
	const handleThankYouClose = () => {
		setShowThankYouModal(false);
		onClose();
	};

	// Captcha verification callback
	const handleCaptchaVerify = useCallback(
		(token: string, isVerified: boolean) => {
			setCaptchaToken(token);
			setIsCaptchaVerified(isVerified);
		},
		[],
	);

	// Handle resume upload - convert to base64
	const handleResumeUpload = async (file: File) => {
		setIsUploading(true);
		try {
			// Validate file size (max 5MB)
			const maxSize = 5 * 1024 * 1024; // 5MB
			if (file.size > maxSize) {
				toast.error("File size must be less than 5MB");
				setFormData({ ...formData, resume: null });
				return;
			}

			// Convert file to base64
			const reader = new FileReader();
			
			reader.onload = () => {
				const base64String = reader.result as string;
				setUploadedFileData({
					name: file.name,
					data: base64String,
				});
				toast.success("Resume uploaded successfully!");
				setIsUploading(false);
			};

			reader.onerror = () => {
				toast.error("Failed to read file. Please try again.");
				setFormData({ ...formData, resume: null });
				setIsUploading(false);
			};

			reader.readAsDataURL(file);
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Failed to process resume";
			toast.error(errorMessage);
			setFormData({ ...formData, resume: null });
			setIsUploading(false);
		}
	};

	// Form validation
	const isFormValid =
		formData.firstName.trim().length >= 2 &&
		formData.lastName.trim().length >= 2 &&
		formData.email.trim().length > 0 &&
		emailRegex.test(formData.email.trim()) &&
		formData.phoneNumber.length === 10 &&
		formData.resume &&
		uploadedFileData &&
		formData.location &&
		!errors.firstName &&
		!errors.lastName &&
		!errors.email &&
		!errors.phoneNumber &&
		isCaptchaVerified &&
		captchaToken &&
		!isSubmitting &&
		!isUploading;

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!isCaptchaVerified || !captchaToken) {
			return;
		}

		setSubmissionResult(null);

		// Build payload for APPLY_NOW form type
		const payload = buildFormPayload("APPLY_NOW", {
			fullName: `${formData.firstName} ${formData.lastName}`,
			email: formData.email,
			phoneNumber: formData.phoneNumber,
			city: formData.location,
			jobRole: jobData.title,
			resumeUrl: uploadedFileData?.url,
			acceptedTerms: true,
		});

		try {
			await submitFormData(payload, captchaToken);
		} catch {
			setSubmissionResult(
				"Failed to submit application. Please try again.",
			);
		}
	};

	const scrollToForm = () => {
		formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	const handleShare = () => {
		if (navigator.share) {
			navigator
				.share({
					title: jobData.title,
					text: `Check out this job opportunity: ${jobData.title}`,
					url: window.location.href,
				})
				.catch(() => {
					navigator.clipboard.writeText(window.location.href);
					alert("Link copied to clipboard!");
				});
		} else {
			navigator.clipboard.writeText(window.location.href);
			alert("Link copied to clipboard!");
		}
	};

	return (
		<>
			<div
				className='fixed inset-0 z-110 overflow-hidden'
				style={{
					backgroundColor: "rgba(0, 0, 0, 0.5)",
					backdropFilter: "blur(4px)",
					zIndex: 99999,
				}}
			>
				<div className='min-h-screen pt-24 pb-8 px-4 overflow-y-auto max-h-screen'>
					<div
						ref={modalRef}
						className='max-w-4xl mx-auto bg-white rounded-lg shadow-xl relative'
					>
						{/* Close Button */}
						<button
							onClick={onClose}
							className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors'
							style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
						>
							<svg
								className='w-6 h-6'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>

						{/* Job Details Section */}
						<div className='p-8 border-b'>
							<div
								className='inline-block px-4 py-1 rounded-full text-sm mb-4'
								style={{
									backgroundColor: "rgba(255,222,0,0.21)",
									fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
								}}
							>
								{jobData.type}
							</div>

							<h1
								className='text-3xl font-semibold mb-4'
								style={{
									fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
									color: "#000",
								}}
							>
								{jobData.title}
							</h1>

							<div
								className='flex items-center gap-2 mb-6 text-sm'
								style={{
									fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
									color: "#666",
								}}
							>
								<svg
									className='w-4 h-4'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
									/>
								</svg>
								<span>Posted {jobData.postedDate}</span>
							</div>

							<div
								className='flex items-center gap-2 mb-6 text-sm'
								style={{
									fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
									color: "#666",
								}}
							>
								<svg
									className='w-4 h-4'
									fill='currentColor'
									viewBox='0 0 12 20'
								>
									<path d='M6 0C2.68594 0 0 2.68594 0 6C0 10.5 6 19.5 6 19.5C6 19.5 12 10.5 12 6C12 2.68594 9.31406 0 6 0ZM6 8.25C4.76719 8.25 3.75 7.23281 3.75 6C3.75 4.76719 4.76719 3.75 6 3.75C7.23281 3.75 8.25 4.76719 8.25 6C8.25 7.23281 7.23281 8.25 6 8.25Z' />
								</svg>
								<span>{jobData.location}</span>
							</div>

							{/* Action Buttons */}
							<div className='flex gap-4 mb-8'>
								<button
									onClick={scrollToForm}
									className='px-8 py-3 rounded-lg text-white font-medium transition-colors text-sm'
									style={{
										backgroundColor: "#FFDE00",
										color: "#000",
										fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.backgroundColor =
											"#e6c800";
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.backgroundColor =
											"#FFDE00";
									}}
								>
									{formTitle}
								</button>

								<button
									onClick={handleShare}
									className='px-6 py-3 rounded-lg border border-gray-300 font-medium transition-colors text-sm flex items-center gap-2'
									style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
									onMouseEnter={(e) => {
										e.currentTarget.style.backgroundColor =
											"#f5f5f5";
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.backgroundColor =
											"transparent";
									}}
								>
									<span>Share Job</span>
									<svg
										className='w-4 h-4'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z'
										/>
									</svg>
								</button>
							</div>

							{/* Job Info Grid */}
							<div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
								<InfoItem
									icon={<YellowStarIcon />}
									title='Experience'
									value={jobData.experience}
								/>
								<InfoItem
									icon={<YellowCheckIcon />}
									title='Gender'
									value='Male'
								/>
								<InfoItem
									icon={<YellowBriefcaseIcon />}
									title='Industry'
									value={jobData.industry}
								/>
							</div>

							<div className='mt-6'>
								<InfoItem
									icon={<YellowGraduationIcon />}
									title='Qualification'
									value={jobData.qualification}
								/>
							</div>
						</div>

						{/* Job Description Section */}
						<div className='p-8'>
							<h2
								className='text-xl font-semibold mb-4'
								style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
							>
								Job Description
							</h2>
							<p
								className='text-sm mb-6 leading-relaxed'
								style={{
									fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
									color: "#666",
								}}
							>
								{jobData.description}
							</p>

							<h3
								className='text-lg font-semibold mb-3'
								style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
							>
								Key Responsibilities:
							</h3>
							<ul className='space-y-2 mb-8'>
								{jobData.keyResponsibilities.map(
									(responsibility, idx) => (
										<li
											key={idx}
											className='flex items-start gap-3 text-sm'
											style={{
												fontFamily:
													"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
												color: "#666",
											}}
										>
											<span className='text-gray-400 mt-1'>
												•
											</span>
											<span>{responsibility}</span>
										</li>
									),
								)}
							</ul>

							{/* Qualifications Section */}
							{/*  <div
								className='flex items-center gap-3 p-4 rounded-lg mb-8'
								style={{
									backgroundColor: "rgba(255,222,0,0.1)",
								}}
							>
								<div
									className='w-10 h-10 rounded-full flex items-center justify-center'
									style={{ backgroundColor: "#FFDE00" }}
								>
									<svg
										className='w-5 h-5'
										fill='#000'
										viewBox='0 0 24 24'
									>
										<path d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z' />
									</svg>
								</div>
								<div>
									<p
										className='font-medium text-sm'
										style={{
											fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
										}}
									>
										{jobData.qualification}
									</p>
								</div>
							</div> */}

							{/* Application Form */}
							<div ref={formRef} className='border-t pt-8'>
								<div className='w-full'>
									<h2
										className='text-2xl font-semibold mb-6'
										style={{
											fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
										}}
									>
										{formTitle}
									</h2>

									<form
										onSubmit={handleSubmit}
										className='w-full'
									>
										{/* Row 1: First Name and Last Name */}
										<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
											{/* First Name */}
											<FormInput
												label={firstNameField?.label || "First Name"}
												placeholder={firstNameField?.placeholder}
												required={firstNameField?.required ?? true}
												value={formData.firstName}
												onChange={(v: string) => {
													// Prevent leading spaces
													if (v.startsWith(' ') && formData.firstName === '') {
														return;
													}
													// Only allow letters and spaces
													if (v && !/^[a-zA-Z\s]*$/.test(v)) {
														return;
													}
													// Limit to 50 characters
													if (v.length > 50) {
														return;
													}
													setFormData({
														...formData,
														firstName: v,
													});
													if (errors.firstName) {
														setErrors({ ...errors, firstName: "" });
													}
												}}
												onBlur={() => {
													const error = validateName(formData.firstName, "First Name");
													setErrors({ ...errors, firstName: error });
												}}
												error={errors.firstName}
												icon={<MdPerson size={16} color='#00275c' />}
											/>

											{/* Last Name */}
											<FormInput
												label={lastNameField?.label || "Last Name"}
												placeholder={lastNameField?.placeholder}
												required={lastNameField?.required ?? true}
												value={formData.lastName}
												onChange={(v: string) => {
													// Prevent leading spaces
													if (v.startsWith(' ') && formData.lastName === '') {
														return;
													}
													// Only allow letters and spaces
													if (v && !/^[a-zA-Z\s]*$/.test(v)) {
														return;
													}
													// Limit to 50 characters
													if (v.length > 50) {
														return;
													}
													setFormData({
														...formData,
														lastName: v,
													});
													if (errors.lastName) {
														setErrors({ ...errors, lastName: "" });
													}
												}}
												onBlur={() => {
													const error = validateName(formData.lastName, "Last Name");
													setErrors({ ...errors, lastName: error });
												}}
												error={errors.lastName}
												icon={<MdPerson size={16} color='#00275c' />}
											/>
										</div>

										{/* Row 2: Email and Phone Number */}
										<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
											{/* Email Address */}
											<FormInput
												label={emailField?.label || "Email Address"}
												type={emailField?.type || "email"}
												placeholder={emailField?.placeholder}
												required={emailField?.required ?? true}
												value={formData.email}
												onChange={(v: string) => {
													// Reject spaces in email
													if (/\s/.test(v)) {
														return;
													}
													// Limit to 100 characters
													if (v.length > 100) {
														return;
													}
													setFormData({
														...formData,
														email: v,
													});
													if (errors.email) {
														setErrors({ ...errors, email: "" });
													}
												}}
												onBlur={() => {
													const error = validateEmail(formData.email);
													setErrors({ ...errors, email: error });
												}}
												error={errors.email}
												icon={<MdEmail size={16} color='#00275c' />}
											/>

											{/* Phone Number */}
											<FormInput
												label={phoneField?.label || "Phone Number"}
												type={phoneField?.type || "tel"}
												placeholder={phoneField?.placeholder}
												required={phoneField?.required ?? true}
												value={formData.phoneNumber}
												onChange={(v: string) => {
													// Only allow digits, no length restriction during typing
													if (/^\d*$/.test(v)) {
														setFormData({
															...formData,
															phoneNumber: v,
														});
														if (errors.phoneNumber) {
															setErrors({ ...errors, phoneNumber: "" });
														}
													}
												}}
												onBlur={() => {
													const error = validatePhone(formData.phoneNumber);
													setErrors({ ...errors, phoneNumber: error });
												}}
												error={errors.phoneNumber}
												icon={<MdPhone size={16} color='#00275c' />}
											/>
										</div>

										{/* Row 3: Upload Resume and Location */}
										<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
											{/* Upload Resume */}
											<div className='mb-3'>
												<div className='relative'>
													<input
														type='file'
														id='resume-upload'
														required={resumeField?.required ?? true}
														accept='.pdf,.doc,.docx'
														className='hidden'
														disabled={isUploading}
														onChange={async (e) => {
															const file =
																e.target
																	.files?.[0] ||
																null;
															if (file) {
																setFormData({
																	...formData,
																	resume: file,
																});
																await handleResumeUpload(
																	file,
																);
															}
														}}
													/>
													<label
														htmlFor='resume-upload'
														className='flex items-center justify-between w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent cursor-pointer transition-colors text-sm'
														style={{
															borderColor:
																"#00275c",
															fontFamily:
																"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
															opacity: isUploading
																? 0.6
																: 1,
															cursor: isUploading
																? "not-allowed"
																: "pointer",
														}}
													>
														<span className='text-gray-600'>
															{isUploading
																? "UPLOADING..."
																: formData.resume
																	? formData.resume.name.toUpperCase()
																	: `${(resumeField?.label || "Upload Resume").toUpperCase()}${resumeField?.required ?? true ? " *" : ""}`}
															{uploadedFileData &&
																" ✓"}
														</span>
														<div className='absolute right-0 top-1/2 -translate-y-1/2'>
																	<MdFileUpload size={16} color='#00275c' />
														</div>
													</label>
													{resumeField?.helperText && (
														<p
															className='text-xs mt-1 text-gray-500'
															style={{
																fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
															}}
														>
															{resumeField.helperText}
														</p>
													)}
												</div>
											</div>

											{/* Location Field */}
											{jobData.location ? (
												<div className='mb-3'>
													<div className='relative'>
														<input
															type='text'
															readOnly
															value={formData.location.toUpperCase()}
															placeholder={`${(locationField?.label || "Location").toUpperCase()}${locationField?.required ?? true ? " *" : ""}`}
															className='w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-gray-600 placeholder-gray-600 focus:outline-none transition-colors text-sm'
															style={{
																borderColor:
																	"#00275c",
																fontFamily:
																	"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
																cursor: "not-allowed",
															}}
														/>
														<div className='absolute right-0 top-1/2 -translate-y-1/2'>
															<MdLocationOn size={16} color='#00275c' />
														</div>
													</div>
												</div>
											) : (
												<div className='mb-3'>
													<div className='relative'>
														<select
															required={locationField?.required ?? true}
															value={
																formData.location
															}
															onChange={(e) =>
																setFormData({
																	...formData,
																	location:
																		e.target
																			.value,
																})
															}
															className='w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-gray-900 placeholder-gray-600 focus:outline-none transition-colors text-sm appearance-none'
															style={{
																borderColor:
																	"#00275c",
																fontFamily:
																	"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
																color: formData.location
																	? "#000"
																	: "#6b7280",
															}}
														>
															<option
																value=''
																disabled
															>
																{`${(locationField?.placeholder || "Select city").toUpperCase()}${locationField?.required ?? true ? " *" : ""}`}
															</option>
															{cities.map(
																(
																	city: string,
																) => (
																	<option
																		key={
																			city
																		}
																		value={
																			city
																		}
																		style={{
																			color: "#000",
																		}}
																	>
																		{city}
																	</option>
																),
															)}
														</select>
														<div className='absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none'>
															<MdLocationOn size={16} color='#00275c' />
														</div>
													</div>
												</div>
											)}
										</div>

										{/* reCAPTCHA v2 */}
										<div className='flex justify-center'>
											<V2Recaptcha
												onVerify={handleCaptchaVerify}
											/>
										</div>

										{/* Success message */}
										{submissionResult && (
											<div className='text-green-600 text-sm text-center mb-2 font-semibold'>
												{submissionResult}
											</div>
										)}

										{/* Submit Button */}
										<div className='flex justify-center pt-4'>
											<button
												type='submit'
												disabled={
													!isFormValid ||
													!captchaToken
												}
												className='text-white px-20 py-3 rounded-lg transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed'
												style={{
													backgroundColor:
														!captchaToken
															? "#ccc"
															: "#FFDE00",
													color: "#000",
													fontFamily:
														"Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
													cursor: isFormValid
														? "pointer"
														: "not-allowed",
													opacity: isFormValid
														? 1
														: 0.6,
												}}
												onMouseEnter={(e) => {
													if (isFormValid) {
														e.currentTarget.style.backgroundColor =
															"#e6c800";
													}
												}}
												onMouseLeave={(e) => {
													if (isFormValid) {
														e.currentTarget.style.backgroundColor =
															"#FFDE00";
													}
												}}
											>
												{isSubmitting
													? "Submitting..."
															: submitButtonText}
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Thank You Modal */}
			<ThankYouModal
				isOpen={showThankYouModal}
				onClose={handleThankYouClose}
				jobTitle={jobData.title}
			/>
		</>
	);
};

export default ApplicationForm;
