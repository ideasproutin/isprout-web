import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../helpers/constants/Colors";
import ApplicationForm, { type JobData } from "./application";
import careersData from "../../content/careersData.json";
import V3Recaptcha from "../../components/Recaptcha/V3Recaptcha";
import { useFormSubmit, buildFormPayload } from "../../hooks/useFormSubmit";
import { useCareers } from "../../hooks/useCareers";
import { uploadDocument } from "../../services/api";
import toast from "react-hot-toast";

type JobsProps = {
	onTabChange?: (tab: "overview" | "why" | "jobs") => void;
};

const Jobs = ({}: JobsProps = {}) => {
	const [selectedJob, setSelectedJob] = useState<JobData | null>(null);
	const [selectedDepartment, setSelectedDepartment] = useState("");
	const [selectedLocation, setSelectedLocation] = useState("");
	const [selectedJobType, setSelectedJobType] = useState("");

	// Fetch careers data from API
	const { data: apiCareersData, isLoading, isError } = useCareers();

	// Use API data if available, otherwise fall back to local JSON
	const careersDataSource = apiCareersData || careersData;

	// Convert careersData structure to jobListings format
	const jobListings: { category: string; jobs: JobData[] }[] =
		careersDataSource.careersData.jobListingsByStep.map(
			(step: { category: string; jobs: JobData[] }) => ({
				category: step.category,
				jobs: step.jobs,
			}),
		);

	if (isLoading) {
		return (
			<div
				id='jobs'
				className='w-full'
				style={{ backgroundColor: COLORS.white }}
			>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='flex justify-center items-center h-64'>
						<p
							className='text-xl'
							style={{ color: COLORS.textGray }}
						>
							Loading careers...
						</p>
					</div>
				</div>
			</div>
		);
	}

	if (isError) {
		console.error("Failed to fetch careers, using local data");
	}

	return (
		<>
			<div className='w-full' style={{ backgroundColor: COLORS.white }}>
				{/* Filters */}
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 md:mb-12'>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4'>
						<FilterSelect
							icon={<DepartmentIcon />}
							label='Select Department'
							options={[
								"Tech",
								"Digital Marketing",
								"Sales",
								"HR",
								"Operations",
							]}
							value={selectedDepartment}
							onChange={setSelectedDepartment}
						/>
						<FilterSelect
							icon={<LocationIcon />}
							label='Location'
							options={["Hyderabad", "Kolkata", "Bengaluru"]}
							value={selectedLocation}
							onChange={setSelectedLocation}
						/>
						<FilterSelect
							icon={<JobTypeIcon />}
							label='Job Type'
							options={["Full-time", "Part-time", "Contract"]}
							value={selectedJobType}
							onChange={setSelectedJobType}
						/>
						<div className='flex items-end'>
							<button
								onClick={() => {
									setSelectedDepartment("");
									setSelectedLocation("");
									setSelectedJobType("");
								}}
								className='w-full border border-black rounded px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 flex items-center justify-center gap-2 transition-colors text-sm sm:text-base'
								style={{
									backgroundColor: COLORS.brandBlue,
									boxShadow:
										"0px 4px 4px 0px rgba(0,0,0,0.25)",
								}}
							>
								<span
									className='text-white'
									style={{ fontFamily: "Outfit, sans-serif" }}
								>
									{selectedDepartment ||
									selectedLocation ||
									selectedJobType
										? "Clear Filter"
										: "Apply"}
								</span>
							</button>
						</div>
					</div>
				</div>

				{/* Job Listings with Timeline */}
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex gap-8'>
						{/* Left Side - Job Listings */}
						<div className='flex-1'>
							<>
								{jobListings.map((category, idx) => {
									// Filter jobs based on selected filters
									const filteredJobs = category.jobs.filter(
										(job) => {
											const departmentMatch =
												!selectedDepartment ||
												category.category ===
													selectedDepartment;
											const locationMatch =
												!selectedLocation ||
												job.location ===
													selectedLocation;
											const typeMatch =
												!selectedJobType ||
												job.type === selectedJobType;
											return (
												departmentMatch &&
												locationMatch &&
												typeMatch
											);
										},
									);

									// Show category only if it has filtered jobs
									if (filteredJobs.length === 0) return null;

									return (
										<section key={idx} className='mb-12'>
											<h2
												className='mb-6 text-lg font-semibold'
												style={{
													fontFamily:
														"Outfit, sans-serif",
												}}
											>
												{category.category}
											</h2>
											<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6'>
												{filteredJobs.map(
													(job, jobIdx) => (
														<JobCard
															key={jobIdx}
															job={job}
															onClick={() =>
																setSelectedJob(
																	job,
																)
															}
														/>
													),
												)}
											</div>
										</section>
									);
								})}
							</>
						</div>
					</div>
				</div>

				{/* Application Modal */}
				{selectedJob && (
					<ApplicationForm
						jobData={selectedJob}
						onClose={() => setSelectedJob(null)}
					/>
				)}
			</div>

			{/* Application Form - Full Width Blue Background */}
			<ApplicationFormFallback onSuccess={() => {}} />
		</>
	);
};

// Helper Components
const FilterSelect = ({
	icon,
	label,
	options,
	value,
	onChange,
}: {
	icon: React.ReactNode;
	label: string;
	options: string[];
	value: string;
	onChange: (value: string) => void;
}) => (
	<div className='relative'>
		{icon && (
			<span className='absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none'>
				{icon}
			</span>
		)}
		<select
			value={value}
			onChange={(e) => onChange(e.target.value)}
			className='w-full px-3 py-3 border rounded text-sm'
			style={{
				fontFamily: "Outfit, sans-serif",
				borderColor: "#d4d4d4",
				paddingLeft: icon ? "2.5rem" : "0.75rem",
			}}
		>
			<option value=''>{label}</option>
			{options.map((opt, i) => (
				<option key={i} value={opt}>
					{opt}
				</option>
			))}
		</select>
	</div>
);

const JobCard = ({ job, onClick }: { job: JobData; onClick: () => void }) => (
	<div
		className='group relative rounded-lg p-5 border cursor-pointer transition-all hover:shadow-lg'
		style={{ backgroundColor: COLORS.brandYellowAlpha }}
		onClick={onClick}
	>
		<h3
			className='mb-6 font-semibold text-base group-hover:underline'
			style={{ fontFamily: "Outfit, sans-serif" }}
		>
			{job.title}
		</h3>
		<p
			className='text-sm mb-2'
			style={{
				fontFamily: "Outfit, sans-serif",
				color: COLORS.mediumGray,
			}}
		>
			{job.location} · {job.experience} · {job.type}
		</p>
		<div className='absolute bottom-5 right-5'>
			<ArrowIcon />
		</div>
	</div>
);

const ApplicationFormFallback = ({ onSuccess }: { onSuccess?: () => void }) => {
	// Form state
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		phoneNumber: "",
		resume: null as File | null,
		role: "",
	});

	// Captcha state
	const [captchaToken, setCaptchaToken] = useState<string>("");
	const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

	// Submission state
	const [submissionResult, setSubmissionResult] = useState<string | null>(
		null,
	);

	// Upload state
	const [isUploading, setIsUploading] = useState(false);
	const [uploadedFileData, setUploadedFileData] = useState<any>(null);

	const navigate = useNavigate();

	// Handle resume upload
	const handleResumeUpload = async (file: File) => {
		setIsUploading(true);
		try {
			console.log("📤 Uploading resume:", file.name);
			const response = await uploadDocument(file, "apply_now");
			console.log("✅ Upload response:", response.data);

			if (response.status?.type === "success" || response.data) {
				const uploadedUrl = response.data.item?.attachmentUrls[0];
				setUploadedFileData(uploadedUrl);
				console.log(
					"🎉 Resume uploaded successfully, URL:",
					uploadedUrl,
				);
				toast.success("Resume uploaded successfully!");
			} else {
				toast.error("Failed to upload resume. Please try again.");
				setFormData({ ...formData, resume: null });
			}
		} catch (error: any) {
			console.error("❌ Upload error:", error);
			toast.error(
				error.response?.data?.status?.message ||
					"Failed to upload resume",
			);
			setFormData({ ...formData, resume: null });
		} finally {
			setIsUploading(false);
		}
	};

	// Form submission hook
	const { submit: submitFormData, isSubmitting } = useFormSubmit({
		successMessage:
			"Your application has been submitted successfully! We'll contact you soon.",
		onSuccess: () => {
			// Reset form on success
			setFormData({
				fullName: "",
				email: "",
				phoneNumber: "",
				resume: null,
				role: "",
			});
			setUploadedFileData(null);
			setSubmissionResult("Application submitted successfully!");
			if (onSuccess) onSuccess();
			navigate("/thankyou");
		},
	});

	// Captcha verification callback
	const handleCaptchaVerify = useCallback(
		(token: string, isVerified: boolean) => {
			console.log("📝 Fallback form received captcha:", {
				token,
				isVerified,
			});
			setCaptchaToken(token);
			setIsCaptchaVerified(isVerified);
		},
		[],
	);

	// Form validation
	const isFormValid =
		formData.fullName &&
		formData.email &&
		formData.phoneNumber &&
		formData.resume &&
		uploadedFileData &&
		formData.role &&
		isCaptchaVerified &&
		captchaToken &&
		!isSubmitting &&
		!isUploading;

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!isCaptchaVerified || !captchaToken) {
			console.error("Captcha not verified");
			return;
		}

		setSubmissionResult(null);
		console.log(
			"🚀 Submitting fallback form with captcha token:",
			captchaToken,
		);

		// Build payload for APPLY_NOW form type
		const payload = buildFormPayload("APPLY_NOW", {
			fullName: formData.fullName,
			email: formData.email,
			phoneNumber: formData.phoneNumber,
			role: formData.role,
			resumeUrl: uploadedFileData,
		});

		try {
			await submitFormData(payload, captchaToken);
		} catch (error) {
			console.error("Form submission error:", error);
			setSubmissionResult(null);
		}
	};

	return (
		<section
			className='mb-16 mt-16'
			style={{ backgroundColor: "#e8f3fa", padding: "3rem 2rem" }}
		>
			<div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-center'>
				{/* Left Side - Form */}
				<div
					className='lg:col-span-2'
					style={{
						backgroundColor: "#ffffff",
						padding: "1.5rem",
						borderRadius: "0.5rem",
					}}
				>
					<h3
						className='mb-6 text-base'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: COLORS.brandBlue,
						}}
					>
						No Open Roles? We Still Want to Hear From You!
					</h3>
					<form onSubmit={handleSubmit} className='space-y-4'>
						<FormInput
							label='Full Name: *'
							value={formData.fullName}
							onChange={(v: string) =>
								setFormData({ ...formData, fullName: v })
							}
							icon={<UserIcon />}
						/>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							<FormInput
								label='Email:'
								type='email'
								value={formData.email}
								onChange={(v: string) =>
									setFormData({ ...formData, email: v })
								}
							/>
							<FormInput
							label='Phone Number: *'
								value={formData.phoneNumber}
								onChange={(v: string) =>
									setFormData({ ...formData, phoneNumber: v })
								}
								icon={<PhoneIcon />}
							/>
						</div>
						<div>
							<label
								className='block mb-2 text-sm'
								style={{ fontFamily: "Outfit, sans-serif" }}
							>
								Upload Resume:
							</label>
							<div className='relative'>
								<input
									type='file'
									id='fallback-resume-upload'
									accept='.pdf,.doc,.docx'
									className='hidden'
									disabled={isUploading}
									onChange={async (e) => {
										const file =
											e.target.files?.[0] || null;
										if (file) {
											setFormData({
												...formData,
												resume: file,
											});
											await handleResumeUpload(file);
										}
									}}
								/>
								<label
									htmlFor='fallback-resume-upload'
									className='flex items-center justify-between w-full px-4 py-2.5 border rounded-full cursor-pointer transition-colors text-sm'
									style={{
										borderColor: uploadedFileData
											? "#4ade80"
											: "#d4d4d4",
										fontFamily: "Outfit, sans-serif",
										opacity: isUploading ? 0.6 : 1,
										cursor: isUploading
											? "not-allowed"
											: "pointer",
									}}
								>
									<span
										style={{
											color: formData.resume
												? "#000"
												: "#999",
										}}
									>
										{isUploading
											? "Uploading..."
											: formData.resume
												? formData.resume.name
												: "Browse & Attach File"}
										{uploadedFileData && " ✓"}
									</span>
									<span
										className='px-3 py-1 rounded text-white text-xs'
										style={{
											backgroundColor: isUploading
												? "#999"
												: "#204758",
										}}
									>
										{isUploading
											? "Uploading..."
											: "Choose File"}
									</span>
								</label>
							</div>
						</div>
						<FormTextarea
							label='Role :'
							placeholder="Tell us about the role you're interested in"
							value={formData.role}
							onChange={(v: string) =>
								setFormData({ ...formData, role: v })
							}
						/>

						{/* V3Recaptcha - User clicks to verify before submitting */}
						<V3Recaptcha
							action='career_fallback_form'
							onVerify={handleCaptchaVerify}
						/>

						{/* Success message */}
						{submissionResult && (
							<div className='text-green-600 text-sm text-center mb-2 font-semibold'>
								{submissionResult}
							</div>
						)}

						<div className='flex justify-center pt-2'>
							<button
								type='submit'
								className='text-white px-16 py-2 rounded-lg text-sm'
								style={{
									backgroundColor: isFormValid
										? COLORS.brandBlue
										: "#a0b4c0",
									fontFamily: "Outfit, sans-serif",
									cursor: isFormValid
										? "pointer"
										: "not-allowed",
									opacity: isFormValid ? 1 : 0.6,
								}}
								disabled={!isFormValid}
							>
								{isSubmitting ? "Submitting..." : "Submit"}
							</button>
						</div>
					</form>
				</div>

				{/* Right Side - Text */}
				<div className='lg:col-span-3 flex items-center justify-center'>
					<h2
						className='text-4xl md:text-5xl lg:text-6xl font-bold text-center'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: COLORS.brandBlue,
						}}
					>
						Looking for jobs?
					</h2>
				</div>
			</div>
		</section>
	);
};

const FormInput = ({
	label,
	type = "text",
	icon,
	value,
	onChange,
}: {
	label: string;
	type?: string;
	icon?: React.ReactNode;
	value: string;
	onChange: (value: any) => void;
}) => {
	const [focus, setFocus] = useState(false);
	const float = focus || value;
	const id = `input-${label.replace(/\s+/g, "-").toLowerCase()}`;

	return (
		<div className='relative'>
			<input
				id={id}
				type={type}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
				className='w-full border rounded-full px-5 py-3 focus:ring-2 outline-none'
				style={{
					backgroundColor: "#ffffff",
					borderColor: "#d4d4d4",
					fontFamily: "Outfit, sans-serif",
				}}
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
				<span className='absolute right-5 top-1/2 -translate-y-1/2'>
					{icon}
				</span>
			)}
		</div>
	);
};

const FormTextarea = ({
	label,
	placeholder,
	value,
	onChange,
}: {
	label: string;
	placeholder: string;
	value: string;
	onChange: (value: string) => void;
}) => {
	const [focus, setFocus] = useState(false);
	const float = focus || value;
	const id = `textarea-${label.replace(/\s+/g, "-").toLowerCase()}`;

	return (
		<div className='relative'>
			<textarea
				id={id}
				rows={3}
				placeholder={float ? placeholder : ""}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
				className='w-full border rounded px-5 py-3 focus:ring-2 outline-none resize-none text-sm'
				style={{
					backgroundColor: "#ffffff",
					borderColor: "#d4d4d4",
					fontFamily: "Outfit, sans-serif",
				}}
			/>
			<label
				htmlFor={id}
				className={`absolute left-5 px-1 text-gray-600 transition-all cursor-pointer ${
					float ? "-top-2 text-xs" : "top-3"
				}`}
				style={{ backgroundColor: "#ffffff" }}
			>
				{label}
			</label>
		</div>
	);
};

// Icons
const DepartmentIcon = () => (
	<svg className='w-5 h-3.5' viewBox='0 0 22 14'>
		<path
			d='M1.1875 13.6562C0.84375 13.6562 0.5625 13.5469 0.34375 13.3281C0.125 13.1094 0.015625 12.8281 0.015625 12.4844V1.39062C0.015625 1.04688 0.125 0.765625 0.34375 0.546875C0.5625 0.328125 0.84375 0.21875 1.1875 0.21875H20.8125C21.1562 0.21875 21.4375 0.328125 21.6562 0.546875C21.875 0.765625 21.9844 1.04688 21.9844 1.39062V12.4844C21.9844 12.8281 21.875 13.1094 21.6562 13.3281C21.4375 13.5469 21.1562 13.6562 20.8125 13.6562H1.1875ZM1.1875 12.4844H20.8125V1.39062H1.1875V12.4844ZM2.35938 11.3125H4.70312V7.21875H6.28125V11.3125H8.625V5.64062H10.2031V11.3125H12.5469V4.46875H14.125V11.3125H16.4688V6.4375H18.0469V11.3125H19.6406V3.29688H2.35938V11.3125Z'
			fill='black'
		/>
	</svg>
);
const LocationIcon = () => (
	<svg className='w-3 h-5' viewBox='0 0 12 20'>
		<path
			d='M6 0C2.68594 0 0 2.68594 0 6C0 10.5 6 19.5 6 19.5C6 19.5 12 10.5 12 6C12 2.68594 9.31406 0 6 0ZM6 8.25C4.76719 8.25 3.75 7.23281 3.75 6C3.75 4.76719 4.76719 3.75 6 3.75C7.23281 3.75 8.25 4.76719 8.25 6C8.25 7.23281 7.23281 8.25 6 8.25Z'
			fill='black'
		/>
	</svg>
);
const JobTypeIcon = () => (
	<svg className='w-5 h-5' viewBox='0 0 19 21'>
		<path
			d='M17.375 4.75H13.5625V2.5625C13.5625 1.85937 13.2812 1.25 12.7188 0.734375C12.2031 0.21875 11.5938 0 10.8906 0H8.10938C7.40625 0 6.79688 0.21875 6.28125 0.734375C5.71875 1.25 5.4375 1.85937 5.4375 2.5625V4.75H1.625C1.17188 4.75 0.796875 4.90625 0.5 5.21875C0.15625 5.53125 0 5.90625 0 6.34375V18.875C0 19.3594 0.15625 19.7344 0.5 20C0.796875 20.3125 1.17188 20.5 1.625 20.5H17.375C17.8281 20.5 18.2031 20.3125 18.5 20C18.7969 19.7344 19 19.3594 19 18.875V6.34375C19 5.90625 18.7969 5.53125 18.5 5.21875C18.2031 4.90625 17.8281 4.75 17.375 4.75ZM6.84375 2.5625C6.84375 2.23438 6.9375 1.95312 7.125 1.71875C7.35938 1.53125 7.64062 1.40625 8.10938 1.40625H10.8906C11.3125 1.40625 11.5938 1.53125 11.875 1.71875C12.0625 1.95312 12.1562 2.23438 12.1562 2.5625V4.75H6.84375V2.5625ZM17.5938 18.875C17.5938 18.9688 17.5469 19.0625 17.4688 19.1406C17.3906 19.2188 17.2969 19.25 17.1562 19.25H1.84375C1.70312 19.25 1.60938 19.2188 1.53125 19.1406C1.45312 19.0625 1.40625 18.9688 1.40625 18.875V6.5625C1.40625 6.42188 1.45312 6.32812 1.53125 6.25C1.60938 6.17188 1.70312 6.15625 1.84375 6.15625H17.1562C17.2969 6.15625 17.3906 6.17188 17.4688 6.25C17.5469 6.32812 17.5938 6.42188 17.5938 6.5625V18.875Z'
			fill='black'
		/>
	</svg>
);

const ArrowIcon = () => (
	<svg className='w-4 h-4 opacity-50' viewBox='0 0 16 16'>
		<path
			d='M5 3L10 8L5 13'
			stroke='black'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
			fill='none'
		/>
	</svg>
);
const UserIcon = () => (
	<svg className='w-4 h-4' viewBox='0 0 16 16'>
		<circle
			cx='8'
			cy='5'
			r='3'
			stroke='#666'
			strokeWidth='1.5'
			fill='none'
		/>
		<path
			d='M2 14C2 11.2386 4.68629 9 8 9C11.3137 9 14 11.2386 14 14'
			stroke='#666'
			strokeWidth='1.5'
			strokeLinecap='round'
			fill='none'
		/>
	</svg>
);
const PhoneIcon = () => (
	<svg className='w-4 h-4' viewBox='0 0 16 16'>
		<path
			d='M14.5 11V13.5C14.5 14.3284 13.8284 15 13 15C6.92487 15 2 10.0751 2 4C2 3.17157 2.67157 2.5 3.5 2.5H6C6.55228 2.5 7 2.94772 7 3.5C7 4.5 7.2 5.4 7.5 6.2C7.6 6.4 7.6 6.7 7.5 6.9L6 8.5C7 10 8.5 11.5 10 12.5L11.6 11C11.8 10.9 12.1 10.9 12.3 11C13.1 11.3 14 11.5 15 11.5C15.5523 11.5 16 11.9477 16 12.5Z'
			stroke='#666'
			strokeWidth='1.5'
			fill='none'
		/>
	</svg>
);

export default Jobs;
