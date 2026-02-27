import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { COLORS } from "../../helpers/constants/Colors";
import ApplicationForm, { type JobData } from "./application";
import careersData from "../../content/careersData.json";
import V2Recaptcha from "../../components/Recaptcha/V2Recaptcha";
import { useFormSubmit, buildFormPayload } from "../../hooks/useFormSubmit";
import { useCareers } from "../../hooks/useCareers";
import { uploadDocument } from "../../services/api";
import toast from "react-hot-toast";

const Jobs = () => {
	const [selectedJob, setSelectedJob] = useState<JobData | null>(null);
	const [selectedLocation, setSelectedLocation] = useState("All");
	const [selectedDepartment, setSelectedDepartment] = useState("All");
	const [visibleJobs, setVisibleJobs] = useState(6);

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

	// Helper function to extract city name from location
	const getCityName = (location: string) => {
		if (!location) return location;
		// Extract city name before comma if present
		const cityMatch = location.split(",")[0].trim();
		return cityMatch;
	};

	// Filter jobs
	let filteredJobs = jobListings.flatMap((cat) =>
		cat.jobs.map((job) => ({ ...job, category: cat.category })),
	);

	// Apply filters
	if (selectedLocation !== "All") {
		filteredJobs = filteredJobs.filter((job) => {
			const cityName = getCityName(job.location);
			return cityName === selectedLocation;
		});
	}
	if (selectedDepartment !== "All") {
		filteredJobs = filteredJobs.filter(
			(job) => job.category === selectedDepartment,
		);
	}

	// Visible jobs for pagination
	const displayedJobs = filteredJobs.slice(0, visibleJobs);
	const hasMore = visibleJobs < filteredJobs.length;

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

	// Get all unique locations and departments
	const allLocations = [
		"All",
		"Hyderabad",
		"Bengaluru",
		"Chennai",
		"Gurugram",
		"Pune",
		"Vijayawada",
		"Kolkata",
		"Ahmedabad",
		"Vizag",
	];
	const allDepartments = ["All", ...jobListings.map((cat) => cat.category)];

	return (
		<>
			<div className='w-full' style={{ backgroundColor: "#f9fafb" }}>
				{/* Main Content: Filters + Jobs */}
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
					<div className='flex flex-col lg:flex-row gap-8'>
						{/* Left Sidebar - Filters */}
						<div
							className='lg:w-64 shrink-0 h-fit sticky top-24'
							style={{ backgroundColor: "white" }}
						>
							<div className='p-6 rounded-lg border border-gray-200'>
								<div className='flex items-center justify-between mb-6'>
									<h3
										className='font-bold text-lg'
										style={{
											fontFamily: "Outfit, sans-serif",
											color: COLORS.textBlack,
										}}
									>
										Filters
									</h3>
									<button
										onClick={() => {
											setSelectedLocation("All");
											setSelectedDepartment("All");
											setVisibleJobs(6);
										}}
										className='text-sm hover:underline'
										style={{
											fontFamily: "Outfit, sans-serif",
											color: COLORS.brandBlue,
										}}
									>
										Reset
									</button>
								</div>

								{/* Location Filter */}
								<div className='mb-6'>
									<button
										className='flex items-center justify-between w-full mb-3'
										style={{
											fontFamily: "Outfit, sans-serif",
										}}
									>
										<span className='font-semibold text-base'>
											Location
										</span>
									</button>
									<div className='space-y-2'>
										{allLocations.map((location) => (
											<label
												key={location}
												className='flex items-center gap-2 cursor-pointer'
											>
												<input
													type='radio'
													name='location'
													checked={
														selectedLocation ===
														location
													}
													onChange={() =>
														setSelectedLocation(
															location,
														)
													}
													className='w-4 h-4'
													style={{
														accentColor:
															COLORS.brandBlue,
													}}
												/>
												<span
													className='text-sm'
													style={{
														fontFamily:
															"Outfit, sans-serif",
														color: COLORS.textGray,
													}}
												>
													{location}
												</span>
											</label>
										))}
									</div>
								</div>

								{/* Department Filter */}
								<div className='mb-6'>
									<button
										className='flex items-center justify-between w-full mb-3'
										style={{
											fontFamily: "Outfit, sans-serif",
										}}
									>
										<span className='font-semibold text-base'>
											Department
										</span>
									</button>
									<div className='space-y-2'>
										{allDepartments.map((department) => (
											<label
												key={department}
												className='flex items-center gap-2 cursor-pointer'
											>
												<input
													type='radio'
													name='department'
													checked={
														selectedDepartment ===
														department
													}
													onChange={() =>
														setSelectedDepartment(
															department,
														)
													}
													className='w-4 h-4'
													style={{
														accentColor:
															COLORS.brandBlue,
													}}
												/>
												<span
													className='text-sm'
													style={{
														fontFamily:
															"Outfit, sans-serif",
														color: COLORS.textGray,
													}}
												>
													{department}
												</span>
											</label>
										))}
									</div>
								</div>
							</div>
						</div>

						{/* Right Side - Job Listings or Form */}
						<div className='flex-1'>
							{filteredJobs.length === 0 &&
							selectedLocation !== "All" ? (
								<ApplicationFormFallback onSuccess={() => {}} />
							) : (
								<>
									{/* Results count */}
									<div className='mb-6 flex items-center justify-between'>
										<div className='flex items-center gap-2'>
											<h2
												className='font-bold text-xl'
												style={{
													fontFamily:
														"Outfit, sans-serif",
													color: COLORS.brandBlue,
												}}
											>
												iSprout jobs
											</h2>
											<div className='flex items-center gap-1'>
												<span
													className='text-sm'
													style={{
														fontFamily:
															"Outfit, sans-serif",
														color: COLORS.textGray,
													}}
												>
													Found {filteredJobs.length}{" "}
													jobs
												</span>
												<button className='text-gray-400 hover:text-gray-600'>
													<InfoIcon />
												</button>
											</div>
										</div>
									</div>

									{/* Job Cards */}
									<div className='space-y-4'>
										{displayedJobs.map((job, idx) => (
											<JobCardNew
												key={idx}
												job={job}
												onClick={() =>
													setSelectedJob(
														job as JobData,
													)
												}
											/>
										))}

										{filteredJobs.length === 0 && (
											<div
												className='text-center py-16 bg-white rounded-lg border border-gray-200'
												style={{
													fontFamily:
														"Outfit, sans-serif",
												}}
											>
												<p
													className='text-xl mb-2'
													style={{
														color: COLORS.textGray,
													}}
												>
													No jobs found
												</p>
												<p
													className='text-sm'
													style={{
														color: COLORS.textGray,
													}}
												>
													Try adjusting your filters
													or search criteria
												</p>
											</div>
										)}

										{/* Load More Button */}
										{hasMore && (
											<div className='flex justify-center mt-8'>
												<button
													onClick={() =>
														setVisibleJobs(
															(prev) => prev + 6,
														)
													}
													className='px-8 py-3 rounded-lg font-semibold transition-all hover:opacity-90'
													style={{
														backgroundColor:
															COLORS.brandBlue,
														color: "white",
														fontFamily:
															"Outfit, sans-serif",
													}}
												>
													Load More
												</button>
											</div>
										)}
									</div>
								</>
							)}
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

			{/* Application Form - Full Width Blue Background (only when All is selected) */}
			{selectedLocation === "All" && (
				<ApplicationFormFallback onSuccess={() => {}} />
			)}
		</>
	);
};

// Helper Components
const JobCardNew = ({
	job,
	onClick,
}: {
	job: JobData & { category: string };
	onClick: () => void;
}) => {
	const getDaysAgo = () => {
		// Simple calculation - in real scenario, you'd parse the date
		return "4 days ago";
	};

	return (
		<div
			className='bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer'
			onClick={onClick}
		>
			{/* Top row: Title */}
			<div className='mb-3'>
				<h3
					className='text-xl font-semibold'
					style={{
						fontFamily: "Outfit, sans-serif",
						color: COLORS.brandBlue,
					}}
				>
					{job.title}
				</h3>
			</div>

			{/* Job Meta Info */}
			<div className='flex items-center gap-3 mb-3 flex-wrap'>
				<div className='flex items-center gap-1'>
					<LocationIcon />
					<span
						className='text-sm'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: COLORS.textGray,
						}}
					>
						{job.location.split(",")[0].trim()}
					</span>
				</div>
				<span
					className='text-sm'
					style={{
						fontFamily: "Outfit, sans-serif",
						color: COLORS.textGray,
					}}
				>
					• {job.experience || "2-5 years"}
				</span>
				<span
					className='px-3 py-1 rounded-full text-xs font-medium'
					style={{
						backgroundColor: "#e3f2fd",
						color: COLORS.brandBlue,
						fontFamily: "Outfit, sans-serif",
					}}
				>
					Full-time
				</span>
			</div>

			{/* Description */}
			<p
				className='text-sm mb-4 line-clamp-2'
				style={{
					fontFamily: "Outfit, sans-serif",
					color: COLORS.textGray,
				}}
			>
				{job.description ||
					`Join our ${job.category} team and contribute to shaping the future of workspaces. We're looking for talented individuals who are passionate about innovation and excellence.`}
			</p>

			{/* Bottom row: Date and Button */}
			<div className='flex items-center justify-between'>
				<span
					className='text-xs'
					style={{
						fontFamily: "Outfit, sans-serif",
						color: COLORS.textGray,
					}}
				>
					Posted: {getDaysAgo()}
				</span>
				<button
					className='px-6 py-2 rounded-lg font-semibold transition-all hover:opacity-90'
					style={{
						backgroundColor: COLORS.brandYellow,
						color: COLORS.brandBlue,
						fontFamily: "Outfit, sans-serif",
						fontSize: "14px",
					}}
				>
					Apply
				</button>
			</div>
		</div>
	);
};

const ApplicationFormFallback = ({ onSuccess }: { onSuccess?: () => void }) => {
	// Form state
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		phoneNumber: "",
		resume: null as File | null,
		role: "",
	});

	// Validation error states
	const [errors, setErrors] = useState({
		fullName: "",
		email: "",
		phoneNumber: "",
		role: "",
	});

	// Email validation regex
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	// Validation functions
	const validateName = (value: string): string => {
		const trimmedValue = value.trim();
		if (!trimmedValue) {
			return "Name is required";
		}
		if (trimmedValue.length < 2) {
			return "Name must be at least 2 characters";
		}
		if (/\s/.test(value)) {
			return "Name cannot contain spaces";
		}
		if (!/^[a-zA-Z]+$/.test(trimmedValue)) {
			return "Name can only contain letters";
		}
		if (trimmedValue.length > 50) {
			return "Name must not exceed 50 characters";
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
		if (trimmedValue.length !== 10) {
			return "Phone number must be exactly 10 digits";
		}
		return "";
	};

	const validateRole = (value: string): string => {
		if (!value || !value.trim()) {
			return "Please select a role";
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
	const [uploadedFileData, setUploadedFileData] = useState<string | null>(
		null,
	);

	const navigate = useNavigate();
	const location = useLocation();

	// Handle resume upload
	const handleResumeUpload = async (file: File) => {
		setIsUploading(true);
		try {
			const response = await uploadDocument(file, "apply_now");

			if (response.status?.type === "success" || response.data) {
				const uploadedUrl = response.data.item?.attachmentUrls[0];
				setUploadedFileData(uploadedUrl);

				toast.success("Resume uploaded successfully!");
			} else {
				toast.error("Failed to upload resume. Please try again.");
				setFormData({ ...formData, resume: null });
			}
		} catch (error: unknown) {
			const errorMessage =
				error && typeof error === "object" && "response" in error
					? (
							error as {
								response?: {
									data?: { status?: { message?: string } };
								};
							}
						).response?.data?.status?.message
					: "Failed to upload resume";
			toast.error(errorMessage || "Failed to upload resume");
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
			const path = location.pathname.replace(/\/$/, '');
			navigate(`${path}/thankyou`);
		},
	});

	// Captcha verification callback
	const handleCaptchaVerify = useCallback(
		(token: string, isVerified: boolean) => {
			setCaptchaToken(token);
			setIsCaptchaVerified(isVerified);
		},
		[],
	);

	// Form validation
	const isFormValid =
		formData.fullName.trim().length >= 2 &&
		formData.email.trim().length > 0 &&
		emailRegex.test(formData.email.trim()) &&
		formData.phoneNumber.length === 10 &&
		formData.resume &&
		uploadedFileData &&
		formData.role.trim().length > 0 &&
		!errors.fullName &&
		!errors.email &&
		!errors.phoneNumber &&
		!errors.role &&
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
			fullName: formData.fullName,
			email: formData.email,
			phoneNumber: formData.phoneNumber,
			jobRole: formData.role,
			resumeUrl: uploadedFileData,
		});

		try {
			await submitFormData(payload, captchaToken);
		} catch {
			setSubmissionResult(null);
		}
	};

	return (
		<section
			className='mb-16 mt-16'
			style={{ backgroundColor: "#e8f3fa", padding: "2rem 1rem" }}
		>
			<div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-6 items-center'>
				{/* Left Side - Form */}
				<div
					className='lg:col-span-3 order-2 lg:order-1'
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
					<form onSubmit={handleSubmit} className='w-full'>
						{/* Row 1: Full Name and Email */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<FormInput
								label='Full Name *'
								value={formData.fullName}
								onChange={(v: string) => {
									// Prevent leading spaces
									if (v.startsWith(' ') && formData.fullName === '') {
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
									setFormData({ ...formData, fullName: v });
									if (errors.fullName) {
										setErrors({ ...errors, fullName: "" });
									}
								}}
								onBlur={() => {
									const error = validateName(formData.fullName);
									setErrors({ ...errors, fullName: error });
								}}
								error={errors.fullName}
								icon={<UserIcon />}
							/>
							<FormInput
								label='Email *'
								type='email'
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
									setFormData({ ...formData, email: v });
									if (errors.email) {
										setErrors({ ...errors, email: "" });
									}
								}}
								onBlur={() => {
									const error = validateEmail(formData.email);
									setErrors({ ...errors, email: error });
								}}
								error={errors.email}
								icon={<EmailIcon />}
							/>
						</div>

						{/* Row 2: Phone Number and Upload Resume */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<FormInput
								label='Phone Number *'
								type='tel'
								value={formData.phoneNumber}
								onChange={(v: string) => {
									// Only allow digits and limit to 10
									if (/^\d*$/.test(v) && v.length <= 10) {
										setFormData({ ...formData, phoneNumber: v });
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
								icon={<PhoneIcon />}
							/>
							<div className='mb-3'>
								<div className='relative'>
									<input
										type='file'
										id='fallback-resume-upload'
										required
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
										className='flex items-center justify-between w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent cursor-pointer transition-colors text-sm'
										style={{
											borderColor: "#00275c",
											fontFamily: "Outfit, sans-serif",
											opacity: isUploading ? 0.6 : 1,
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
													: "UPLOAD RESUME *"}
											{uploadedFileData && " ✓"}
										</span>
										<div className='absolute right-0 top-1/2 -translate-y-1/2'>
											<svg
												className='w-4 h-4'
												fill='#00275c'
												viewBox='0 0 24 24'
											>
												<path d='M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z' />
											</svg>
										</div>
									</label>
								</div>
							</div>
						</div>

						{/* Row 3: Role Dropdown */}
						<div className='mb-3'>
							<div className='relative'>
								<select
									required
									value={formData.role}
									onChange={(e) => {
										setFormData({ ...formData, role: e.target.value });
										if (errors.role) {
											setErrors({ ...errors, role: "" });
										}
									}}
									onBlur={(e) => {
										const error = validateRole(e.currentTarget.value);
										setErrors({ ...errors, role: error });
									}}
									className={`w-full px-0 py-2.5 pr-8 border-b-2 bg-transparent text-sm focus:outline-none transition-colors appearance-none ${
										errors.role ? "border-red-500" : ""
									}`}
									style={{
										borderColor: errors.role ? "#ef4444" : "#00275c",
										fontFamily: "Outfit, sans-serif",
										color: formData.role ? "#111827" : "#4b5563",
									}}
								>
									<option value='' disabled hidden>
										SELECT A ROLE *
									</option>
									{careersData.careersData.jobListingsByStep.flatMap(
										(step: { jobs: { title: string }[] }) =>
											step.jobs.map((job) => job.title),
									).map((title: string) => (
										<option key={title} value={title}>
											{title}
										</option>
									))}
								</select>
								<div className='absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none'>
									<svg className='w-4 h-4' fill='#00275c' viewBox='0 0 20 20'>
										<path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule='evenodd' />
									</svg>
								</div>
							</div>
							{errors.role && (
								<p
									className='text-red-500 text-xs mt-1'
									style={{ fontFamily: "Outfit, sans-serif" }}
								>
									{errors.role}
								</p>
							)}
						</div>

						{/* reCAPTCHA v2 */}
						<div className='flex justify-center'>
							<V2Recaptcha onVerify={handleCaptchaVerify} />
						</div>

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
				<div className='lg:col-span-3 order-1 lg:order-2 flex items-center justify-center'>
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
	error,
	onBlur,
}: {
	label: string;
	type?: string;
	icon?: React.ReactNode;
	value: string;
	onChange: (value: string) => void;
	error?: string;
	onBlur?: () => void;
}) => (
	<div className='mb-3'>
		<div className='relative'>
			<input
				type={type}
				required
				value={value}
				onChange={(e) => onChange(e.target.value)}
				onBlur={onBlur}
				placeholder={label.toUpperCase()}
				className={`w-full px-0 py-2.5 pr-10 border-b-2 bg-transparent text-gray-900 placeholder-gray-600 focus:outline-none transition-colors text-sm ${
					error ? "border-red-500" : ""
				}`}
				style={{
					borderColor: error ? "#ef4444" : "#00275c",
					fontFamily: "Outfit, sans-serif",
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
				style={{ fontFamily: "Outfit, sans-serif" }}
			>
				{error}
			</p>
		)}
	</div>
);

// Icons
const LocationIcon = () => (
	<svg className='w-3 h-5' viewBox='0 0 12 20'>
		<path
			d='M6 0C2.68594 0 0 2.68594 0 6C0 10.5 6 19.5 6 19.5C6 19.5 12 10.5 12 6C12 2.68594 9.31406 0 6 0ZM6 8.25C4.76719 8.25 3.75 7.23281 3.75 6C3.75 4.76719 4.76719 3.75 6 3.75C7.23281 3.75 8.25 4.76719 8.25 6C8.25 7.23281 7.23281 8.25 6 8.25Z'
			fill='black'
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
const EmailIcon = () => (
	<svg className='w-4 h-4' fill='none' viewBox='0 0 16 16'>
		<path
			d='M2 3h12c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1H2c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1z'
			stroke='#666'
			strokeWidth='1.5'
		/>
		<path
			d='M1 4l7 5 7-5'
			stroke='#666'
			strokeWidth='1.5'
			strokeLinecap='round'
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

const InfoIcon = () => (
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
			d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
		/>
	</svg>
);

export default Jobs;
