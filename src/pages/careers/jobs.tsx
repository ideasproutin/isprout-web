import { useState } from "react";
import { COLORS } from "../../helpers/constants/Colors";
import ApplicationForm, { type JobData } from "./application";
import { useCareers } from "../../hooks/useCareers";

const Jobs = () => {
	const [selectedJob, setSelectedJob] = useState<JobData | null>(null);
	const [selectedLocation, setSelectedLocation] = useState("All");
	const [selectedDepartment, setSelectedDepartment] = useState("All");
	const [visibleJobs, setVisibleJobs] = useState(6);

	// Fetch careers data from API
	const { data: careersData, isLoading, isError } = useCareers();

	// Convert careersData structure to jobListings format
	const jobListings: { category: string; jobs: JobData[] }[] =
		(careersData?.careersData?.jobListingsByStep || []).map(
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

	if (isError || !careersData) {
		return (
			<div className='w-full' style={{ backgroundColor: "#f9fafb" }}>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='flex justify-center items-center h-64'>
						<p
							className='text-xl'
							style={{ color: COLORS.textGray }}
						>
							Failed to load careers data.
						</p>
					</div>
				</div>
			</div>
		);
	}

	// Get all unique locations and departments
	const apiLocations =
		careersData.careersData?.filterOptions?.locations?.filter(
			(location) => !/^select\s+/i.test(location),
		) || [];

	const allLocations = [
		"All",
		...apiLocations,
	];

	const apiDepartments =
		careersData.careersData?.filterOptions?.departments?.filter(
			(department) => !/^select\s+/i.test(department),
		) || [];

	const allDepartments = [
		"All",
		...(apiDepartments.length > 0
			? apiDepartments
			: jobListings.map((cat) => cat.category)),
	];

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
					Posted: <span>{job.postedDate}</span>
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
	void onSuccess;

	const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		window.location.href = "mailto:talent@isprout.in";
	};

	return (
		<section
			className='mb-0 mt-16'
			style={{ backgroundColor: "#e8f3fa", padding: "2rem 1rem" }}
		>
			<div className='max-w-7xl mx-auto flex items-center justify-center'>
				<p
					className='text-center text-xl md:text-2xl font-semibold'
					style={{
						fontFamily: "Outfit, sans-serif",
						color: COLORS.brandBlue,
					}}
				>
					No Open Roles? We Still Want to Hear From You! Send your resume at {" "}
					<a
						href='mailto:talent@isprout.in'
						className='underline hover:opacity-80'
						style={{ color: COLORS.brandBlue }}
						onClick={handleEmailClick}
					>
						talent@isprout.in
					</a>
				</p>
			</div>
		</section>
	);
};

// Icons
const LocationIcon = () => (
	<svg className='w-3 h-5' viewBox='0 0 12 20'>
		<path
			d='M6 0C2.68594 0 0 2.68594 0 6C0 10.5 6 19.5 6 19.5C6 19.5 12 10.5 12 6C12 2.68594 9.31406 0 6 0ZM6 8.25C4.76719 8.25 3.75 7.23281 3.75 6C3.75 4.76719 4.76719 3.75 6 3.75C7.23281 3.75 8.25 4.76719 8.25 6C8.25 7.23281 7.23281 8.25 6 8.25Z'
			fill='black'
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
