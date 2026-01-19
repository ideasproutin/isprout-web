import React, { useRef } from "react";

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
}

interface ApplicationFormProps {
	jobData: JobData;
	onClose: () => void;
}

// Helper Components
const FormInput = ({ label, type = "text", required = true, icon }: any) => (
	<div>
		<label
			className='block mb-2 text-sm'
			style={{ fontFamily: "Outfit, sans-serif" }}
		>
			{label}
			{required && <span className='text-red-500'>*</span>}
		</label>
		<div className='relative'>
			<input
				type={type}
				required={required}
				className='w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 text-sm'
				style={{
					borderColor: "#d4d4d4",
					fontFamily: "Outfit, sans-serif",
				}}
				onFocus={(e) => (e.currentTarget.style.borderColor = "#204758")}
				onBlur={(e) => (e.currentTarget.style.borderColor = "#d4d4d4")}
			/>
			{icon && (
				<div className='absolute right-4 top-1/2 -translate-y-1/2'>
					{icon}
				</div>
			)}
		</div>
	</div>
);

const InfoItem = ({ icon, title, value }: any) => (
	<div>
		<div className='flex items-center gap-2 mb-2'>
			{icon}
			<span
				className='text-sm font-medium'
				style={{ fontFamily: "Outfit, sans-serif" }}
			>
				{title}
			</span>
		</div>
		<p
			className='text-sm'
			style={{ fontFamily: "Outfit, sans-serif", color: "#666" }}
		>
			{value}
		</p>
	</div>
);

// Icons
const UserIcon = () => (
	<svg className='w-4 h-4' fill='none' viewBox='0 0 16 16'>
		<circle cx='8' cy='5' r='3' stroke='#666' strokeWidth='1.5' />
		<path
			d='M2 14C2 11.2386 4.68629 9 8 9C11.3137 9 14 11.2386 14 14'
			stroke='#666'
			strokeWidth='1.5'
			strokeLinecap='round'
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
	<svg className='w-4 h-4' fill='none' viewBox='0 0 16 16'>
		<path
			d='M14.5 11V13.5C14.5 14.3284 13.8284 15 13 15C6.92487 15 2 10.0751 2 4C2 3.17157 2.67157 2.5 3.5 2.5H6C6.55228 2.5 7 2.94772 7 3.5C7 4.5 7.2 5.4 7.5 6.2C7.6 6.4 7.6 6.7 7.5 6.9L6 8.5C7 10 8.5 11.5 10 12.5L11.6 11C11.8 10.9 12.1 10.9 12.3 11C13.1 11.3 14 11.5 15 11.5C15.5523 11.5 16 11.9477 16 12.5Z'
			stroke='#666'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

const LocationIcon = () => (
	<svg className='w-4 h-4' fill='currentColor' viewBox='0 0 12 20'>
		<path d='M6 0C2.68594 0 0 2.68594 0 6C0 10.5 6 19.5 6 19.5C6 19.5 12 10.5 12 6C12 2.68594 9.31406 0 6 0ZM6 8.25C4.76719 8.25 3.75 7.23281 3.75 6C3.75 4.76719 4.76719 3.75 6 3.75C7.23281 3.75 8.25 4.76719 8.25 6C8.25 7.23281 7.23281 8.25 6 8.25Z' />
	</svg>
);

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
		<div
			className='fixed inset-0 z-50 overflow-y-auto'
			style={{
				backgroundColor: "rgba(0, 0, 0, 0.5)",
				backdropFilter: "blur(4px)",
			}}
		>
			<div className='min-h-screen py-8 px-4'>
				<div className='max-w-4xl mx-auto bg-white rounded-lg shadow-xl relative'>
					{/* Close Button */}
					<button
						onClick={onClose}
						className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors'
						style={{ fontFamily: "Outfit, sans-serif" }}
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
								fontFamily: "Outfit, sans-serif",
							}}
						>
							{jobData.type}
						</div>

						<h1
							className='text-3xl font-semibold mb-4'
							style={{
								fontFamily: "Outfit, sans-serif",
								color: "#000",
							}}
						>
							{jobData.title}
						</h1>

						<div
							className='flex items-center gap-2 mb-6 text-sm'
							style={{
								fontFamily: "Outfit, sans-serif",
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
								fontFamily: "Outfit, sans-serif",
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
									fontFamily: "Outfit, sans-serif",
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
								Apply Now
							</button>

							<button
								onClick={handleShare}
								className='px-6 py-3 rounded-lg border border-gray-300 font-medium transition-colors text-sm flex items-center gap-2'
								style={{ fontFamily: "Outfit, sans-serif" }}
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
							style={{ fontFamily: "Outfit, sans-serif" }}
						>
							Job Description
						</h2>
						<p
							className='text-sm mb-6 leading-relaxed'
							style={{
								fontFamily: "Outfit, sans-serif",
								color: "#666",
							}}
						>
							{jobData.description}
						</p>

						<h3
							className='text-lg font-semibold mb-3'
							style={{ fontFamily: "Outfit, sans-serif" }}
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
											fontFamily: "Outfit, sans-serif",
											color: "#666",
										}}
									>
										<span className='text-gray-400 mt-1'>
											•
										</span>
										<span>{responsibility}</span>
									</li>
								)
							)}
						</ul>

						{/* Qualifications Section */}
						<div
							className='flex items-center gap-3 p-4 rounded-lg mb-8'
							style={{ backgroundColor: "rgba(255,222,0,0.1)" }}
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
									style={{ fontFamily: "Outfit, sans-serif" }}
								>
									{jobData.qualification}
								</p>
							</div>
						</div>

						{/* Application Form */}
						<div ref={formRef} className='border-t pt-8'>
							<h2
								className='text-2xl font-semibold mb-6'
								style={{ fontFamily: "Outfit, sans-serif" }}
							>
								Apply Now
							</h2>

							<form className='space-y-6'>
								{/* First Name and Last Name */}
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
									<FormInput
										label='First Name'
										icon={<UserIcon />}
									/>
									<FormInput
										label='Last Name'
										icon={<UserIcon />}
									/>
								</div>

								{/* Email Address and Phone Number */}
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
									<FormInput
										label='Email Address'
										type='email'
										icon={<EmailIcon />}
									/>
									<FormInput
										label='Phone Number'
										type='tel'
										icon={<PhoneIcon />}
									/>
								</div>

								{/* Upload Resume and Location */}
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
									<div>
										<label
											className='block mb-2 text-sm'
											style={{
												fontFamily:
													"Outfit, sans-serif",
											}}
										>
											Upload Resume
											<span className='text-red-500'>
												*
											</span>
										</label>
										<div className='relative'>
											<input
												type='file'
												id='resume-upload'
												required
												accept='.pdf,.doc,.docx'
												className='hidden'
											/>
											<label
												htmlFor='resume-upload'
												className='flex items-center justify-between w-full px-4 border rounded cursor-pointer transition-colors text-sm'
												style={{
													borderColor: "#d4d4d4",
													fontFamily:
														"Outfit, sans-serif",
													height: "48px",
												}}
												onMouseEnter={(e) =>
													(e.currentTarget.style.backgroundColor =
														"rgba(0,0,0,0.02)")
												}
												onMouseLeave={(e) =>
													(e.currentTarget.style.backgroundColor =
														"transparent")
												}
											>
												<span style={{ color: "#999" }}>
													Browse & Attach File
												</span>
												<span
													className='px-3 py-1 rounded text-white text-xs'
													style={{
														backgroundColor:
															"#204758",
													}}
												>
													Choose File
												</span>
											</label>
										</div>
									</div>
									<FormInput
										label='Your Location'
										icon={<LocationIcon />}
									/>
								</div>

								{/* Submit Button */}
								<div className='flex justify-center pt-4'>
									<button
										type='submit'
										className='text-white px-20 py-3 rounded-lg transition-colors text-sm font-medium'
										style={{
											backgroundColor: "#FFDE00",
											color: "#000",
											fontFamily: "Outfit, sans-serif",
										}}
										onMouseEnter={(e) =>
											(e.currentTarget.style.backgroundColor =
												"#e6c800")
										}
										onMouseLeave={(e) =>
											(e.currentTarget.style.backgroundColor =
												"#FFDE00")
										}
									>
										Submit
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ApplicationForm;
