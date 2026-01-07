import { COLORS } from "../../helpers/constants/Colors";


interface JobsProps {
	onTabChange?: (tab: string) => void;
}

const Jobs = ({ onTabChange }: JobsProps) => {
	const jobListings = [
		{
			category: "Tech",
			jobs: [
				{
					title: "Back-end Developer",
					location: "Hyderabad",
					experience: "2-3 Years",
					type: "Full-time",
				},
			],
		},
		{
			category: "Digital Marketing",
			jobs: [
				{
					title: "Graphic Designer",
					location: "Hyderabad",
					experience: "2-3 Years",
					type: "Full-time",
				},
				{
					title: "Content Writer",
					location: "Hyderabad",
					experience: "1-3 Years",
					type: "Full-time",
				},
			],
		},
		{
			category: "Sales",
			jobs: [
				{
					title: "Real Estate Manager",
					location: "Hyderabad",
					experience: "5-8 Years",
					type: "Full-time",
				},
				{
					title: "Sales Manager",
					location: "Kolkata",
					experience: "5+ Years",
					type: "Full-time",
				},
			],
		},
		{
			category: "Operations",
			jobs: [
				{
					title: "Cluster Head",
					location: "Bengaluru",
					experience: "3 Years",
					type: "Full-time",
				},
				{
					title: "Site Engineer",
					location: "Kolkata",
					experience: "2-3 Years",
					type: "Full-time",
				},
			],
		},
	];

	return (
		<div className='w-full' style={{ backgroundColor: COLORS.white }}>
			{/* Filters Section */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12'>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
					{/* Select Department */}
					<div className='relative'>
						<div className='flex items-center gap-2 mb-2'>
							<svg
								className='w-5 h-3.5'
								fill='none'
								viewBox='0 0 22 14'
							>
								<path
									d='M1.1875 13.6562C0.84375 13.6562 0.5625 13.5469 0.34375 13.3281C0.125 13.1094 0.015625 12.8281 0.015625 12.4844V1.39062C0.015625 1.04688 0.125 0.765625 0.34375 0.546875C0.5625 0.328125 0.84375 0.21875 1.1875 0.21875H20.8125C21.1562 0.21875 21.4375 0.328125 21.6562 0.546875C21.875 0.765625 21.9844 1.04688 21.9844 1.39062V12.4844C21.9844 12.8281 21.875 13.1094 21.6562 13.3281C21.4375 13.5469 21.1562 13.6562 20.8125 13.6562H1.1875ZM1.1875 12.4844H20.8125V1.39062H1.1875V12.4844ZM2.35938 11.3125H4.70312V7.21875H6.28125V11.3125H8.625V5.64062H10.2031V11.3125H12.5469V4.46875H14.125V11.3125H16.4688V6.4375H18.0469V11.3125H19.6406V3.29688H2.35938V11.3125Z'
									fill='black'
								/>
							</svg>
							<span
								className='text-sm'
								style={{ fontFamily: "Outfit, sans-serif" }}
							>
								Select Department
							</span>
						</div>
						<select
						className='w-full px-3 py-3 border rounded text-sm opacity-40 appearance-none cursor-pointer'
						style={{
							backgroundColor: COLORS.white,
								borderColor: "#ababab",
								fontFamily: "Outfit, sans-serif",
							}}
						>
							<option>Select Department</option>
							<option>Tech</option>
							<option>Digital Marketing</option>
							<option>Sales</option>
							<option>Operations</option>
						</select>
					</div>

					{/* Location */}
					<div className='relative'>
						<div className='flex items-center gap-2 mb-2'>
							<svg
								className='w-3 h-5'
								fill='none'
								viewBox='0 0 12 20'
							>
								<path
									d='M6 0C2.68594 0 0 2.68594 0 6C0 10.5 6 19.5 6 19.5C6 19.5 12 10.5 12 6C12 2.68594 9.31406 0 6 0ZM6 8.25C4.76719 8.25 3.75 7.23281 3.75 6C3.75 4.76719 4.76719 3.75 6 3.75C7.23281 3.75 8.25 4.76719 8.25 6C8.25 7.23281 7.23281 8.25 6 8.25Z'
									fill='black'
								/>
							</svg>
							<span
								className='text-sm'
								style={{ fontFamily: "Outfit, sans-serif" }}
							>
								Location
							</span>
						</div>
						<select
						className='w-full px-3 py-3 border rounded text-sm opacity-40 appearance-none cursor-pointer'
						style={{
							backgroundColor: COLORS.white,
								borderColor: "#ababab",
								fontFamily: "Outfit, sans-serif",
							}}
						>
							<option>Location</option>
							<option>Hyderabad</option>
							<option>Kolkata</option>
							<option>Bengaluru</option>
						</select>
					</div>

					{/* Job Type */}
					<div className='relative'>
						<div className='flex items-center gap-2 mb-2'>
							<svg
								className='w-5 h-5'
								fill='none'
								viewBox='0 0 19 21'
							>
								<path
									d='M17.375 4.75H13.5625V2.5625C13.5625 1.85937 13.2812 1.25 12.7188 0.734375C12.2031 0.21875 11.5938 0 10.8906 0H8.10938C7.40625 0 6.79688 0.21875 6.28125 0.734375C5.71875 1.25 5.4375 1.85937 5.4375 2.5625V4.75H1.625C1.17188 4.75 0.796875 4.90625 0.5 5.21875C0.15625 5.53125 0 5.90625 0 6.34375V18.875C0 19.3594 0.15625 19.7344 0.5 20C0.796875 20.3125 1.17188 20.5 1.625 20.5H17.375C17.8281 20.5 18.2031 20.3125 18.5 20C18.7969 19.7344 19 19.3594 19 18.875V6.34375C19 5.90625 18.7969 5.53125 18.5 5.21875C18.2031 4.90625 17.8281 4.75 17.375 4.75ZM6.84375 2.5625C6.84375 2.23438 6.9375 1.95312 7.125 1.71875C7.35938 1.53125 7.64062 1.40625 8.10938 1.40625H10.8906C11.3125 1.40625 11.5938 1.53125 11.875 1.71875C12.0625 1.95312 12.1562 2.23438 12.1562 2.5625V4.75H6.84375V2.5625ZM17.5938 18.875C17.5938 18.9688 17.5469 19.0625 17.4688 19.1406C17.3906 19.2188 17.2969 19.25 17.1562 19.25H1.84375C1.70312 19.25 1.60938 19.2188 1.53125 19.1406C1.45312 19.0625 1.40625 18.9688 1.40625 18.875V6.5625C1.40625 6.42188 1.45312 6.32812 1.53125 6.25C1.60938 6.17188 1.70312 6.15625 1.84375 6.15625H17.1562C17.2969 6.15625 17.3906 6.17188 17.4688 6.25C17.5469 6.32812 17.5938 6.42188 17.5938 6.5625V18.875Z'
									fill='black'
								/>
							</svg>
							<span
								className='text-sm'
								style={{ fontFamily: "Outfit, sans-serif" }}
							>
								Job Type
							</span>
						</div>
						<select
						className='w-full px-3 py-3 border rounded text-sm opacity-40 appearance-none cursor-pointer'
						style={{
							backgroundColor: COLORS.white,
							}}
						>
							<option>Job Type</option>
							<option>Full-time</option>
							<option>Part-time</option>
							<option>Contract</option>
						</select>
					</div>

					{/* Clear Filter Button */}
					<div className='flex items-end'>
						<button
							className='w-full border border-black rounded px-3 py-3 flex items-center justify-center gap-2 transition-colors text-sm'
							style={{
								backgroundColor: "#204758",
								boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.25)",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor =
									"#2a5a6e";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor =
									"#204758";
							}}
						>
							<svg
								className='w-6 h-4'
								fill='none'
								viewBox='0 0 26 17'
							>
								<path
									d='M12.1719 16.1406C11.9375 16.375 11.6562 16.5 11.3281 16.5C11 16.5 10.7188 16.375 10.4844 16.1406L0.359375 6.01562C0.125 5.78125 0 5.5 0 5.17188C0 4.84375 0.125 4.5625 0.359375 4.32812L1.64062 3.04688C1.875 2.8125 2.15625 2.6875 2.48438 2.6875C2.8125 2.6875 3.09375 2.8125 3.32812 3.04688L11.3281 11.0469L23.1719 0.859375C23.4062 0.625 23.6875 0.5 24.0156 0.5C24.3438 0.5 24.625 0.625 24.8594 0.859375L26.1406 2.14062C26.375 2.375 26.5 2.65625 26.5 2.98438C26.5 3.3125 26.375 3.59375 26.1406 3.82812L12.1719 16.1406Z'
									fill='white'
								/>
							</svg>
							<span
								className='text-white'
								style={{ fontFamily: "Outfit, sans-serif" }}
							>
								Clear Filter
							</span>
						</button>
					</div>
				</div>
			</div>

			{/* Job Listings */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{jobListings.map((category, idx) => (
					<section key={idx} className='mb-12'>
						<h2
							className='mb-6 text-lg font-semibold'
							style={{ fontFamily: "Outfit, sans-serif" }}
						>
							{category.category}
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
							{category.jobs.map((job, jobIdx) => (
								<div
									key={jobIdx}
									className='group relative rounded-lg p-5 border cursor-pointer transition-all duration-300'
									style={{
										backgroundColor: "rgba(255,222,0,0.21)",
										borderColor: "#d4d4d4",
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.boxShadow =
											"0 4px 12px rgba(0,0,0,0.08)";
										e.currentTarget.style.borderColor =
											"#204758";
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.boxShadow =
											"none";
										e.currentTarget.style.borderColor =
											"#d4d4d4";
									}}
								>
									<h3
										className='mb-6 font-semibold text-base group-hover:underline transition-all'
										style={{
											fontFamily: "Outfit, sans-serif",
											color: "#000",
										}}
									>
										{job.title}
									</h3>
									<p
										className='text-sm mb-2'
										style={{
											fontFamily: "Outfit, sans-serif",
											color: "#666",
										}}
									>
										{job.location} . {job.experience}.{" "}
										{job.type}
									</p>

									{/* External Link Icon */}
									<div className='absolute bottom-5 right-5'>
										<svg
											className='w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity'
											fill='none'
											viewBox='0 0 16 16'
										>
											<path
												d='M5 3L10 8L5 13'
												stroke='#000'
												strokeWidth='2'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
										</svg>
									</div>
								</div>
							))}
						</div>
					</section>
				))}
				{/* Application Form Section */}
				<section className='mb-16 mt-16'>
					<h3
						className='mb-8 text-lg font-normal'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: "#204758",
						}}
					>
						No Open Roles? We Still Want to Hear From You!
					</h3>

					<div className='max-w-2xl'>
						<form className='space-y-6'>
							{/* Full Name */}
							<div>
								<label
									className='block mb-2 text-sm'
									style={{ fontFamily: "Outfit, sans-serif" }}
								>
									Full Name:
								</label>
								<div className='relative'>
									<input
										type='text'
										className='w-full px-4 py-2.5 border rounded-full focus:outline-none focus:ring-1 text-sm'
										style={{
											borderColor: "#d4d4d4",
											fontFamily: "Outfit, sans-serif",
										}}
										onFocus={(e) => {
											e.currentTarget.style.borderColor =
												"#204758";
											e.currentTarget.style.outline =
												"none";
										}}
										onBlur={(e) => {
											e.currentTarget.style.borderColor =
												"#d4d4d4";
										}}
									/>
									<div className='absolute right-4 top-1/2 -translate-y-1/2'>
										<svg
											className='w-4 h-4'
											fill='none'
											viewBox='0 0 16 16'
										>
											<circle
												cx='8'
												cy='5'
												r='3'
												stroke='#666'
												strokeWidth='1.5'
											/>
											<path
												d='M2 14C2 11.2386 4.68629 9 8 9C11.3137 9 14 11.2386 14 14'
												stroke='#666'
												strokeWidth='1.5'
												strokeLinecap='round'
											/>
										</svg>
									</div>
								</div>
							</div>

							{/* Email and Phone Number */}
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
								<div>
									<label
										className='block mb-2 text-sm'
										style={{
											fontFamily: "Outfit, sans-serif",
										}}
									>
										Email:
									</label>
									<input
										type='email'
										className='w-full px-4 py-2.5 border rounded-full focus:outline-none focus:ring-1 text-sm'
										style={{
											borderColor: "#d4d4d4",
											fontFamily: "Outfit, sans-serif",
										}}
										onFocus={(e) => {
											e.currentTarget.style.borderColor =
												"#204758";
										}}
										onBlur={(e) => {
											e.currentTarget.style.borderColor =
												"#d4d4d4";
										}}
									/>
								</div>
								<div>
									<label
										className='block mb-2 text-sm'
										style={{
											fontFamily: "Outfit, sans-serif",
										}}
									>
										Phone Number:
									</label>
									<div className='relative'>
										<input
											type='tel'
											className='w-full px-4 py-2.5 border rounded-full focus:outline-none focus:ring-1 text-sm'
											style={{
												borderColor: "#d4d4d4",
												fontFamily:
													"Outfit, sans-serif",
											}}
											onFocus={(e) => {
												e.currentTarget.style.borderColor =
													"#204758";
											}}
											onBlur={(e) => {
												e.currentTarget.style.borderColor =
													"#d4d4d4";
											}}
										/>
										<div className='absolute right-4 top-1/2 -translate-y-1/2'>
											<svg
												className='w-4 h-4'
												fill='none'
												viewBox='0 0 16 16'
											>
												<path
													d='M14.5 11V13.5C14.5 14.3284 13.8284 15 13 15C6.92487 15 2 10.0751 2 4C2 3.17157 2.67157 2.5 3.5 2.5H6C6.55228 2.5 7 2.94772 7 3.5C7 4.5 7.2 5.4 7.5 6.2C7.6 6.4 7.6 6.7 7.5 6.9L6 8.5C7 10 8.5 11.5 10 12.5L11.6 11C11.8 10.9 12.1 10.9 12.3 11C13.1 11.3 14 11.5 15 11.5C15.5523 11.5 16 11.9477 16 12.5Z'
													stroke='#666'
													strokeWidth='1.5'
													strokeLinecap='round'
													strokeLinejoin='round'
												/>
											</svg>
										</div>
									</div>
								</div>
							</div>

							{/* Upload Resume */}
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
										id='resume'
										className='hidden'
									/>
									<label
										htmlFor='resume'
										className='flex items-center w-full px-4 py-2.5 border rounded-full cursor-pointer transition-colors text-sm'
										style={{
											borderColor: "#d4d4d4",
											fontFamily: "Outfit, sans-serif",
											color: "#999",
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.backgroundColor =
												"rgba(0,0,0,0.02)";
											e.currentTarget.style.borderColor =
												"#204758";
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.backgroundColor =
												"transparent";
											e.currentTarget.style.borderColor =
												"#d4d4d4";
										}}
									>
										<span>Choose a file</span>
									</label>
								</div>
							</div>

							{/* Role */}
							<div>
								<label
									className='block mb-2 text-sm'
									style={{ fontFamily: "Outfit, sans-serif" }}
								>
									Role :
								</label>
								<textarea
									rows={3}
									placeholder="Tell us about the role you're interested in"
									className='w-full px-4 py-3 border rounded focus:outline-none focus:ring-1 resize-none text-sm'
									style={{
										borderColor: "#d4d4d4",
										color: "#666",
										fontFamily: "Outfit, sans-serif",
									}}
									onFocus={(e) => {
										e.currentTarget.style.borderColor =
											"#204758";
									}}
									onBlur={(e) => {
										e.currentTarget.style.borderColor =
											"#d4d4d4";
									}}
								/>
							</div>

							{/* Submit Button */}
							<div className='flex justify-center pt-2'>
								<button
									type='submit'
									className='text-white px-16 py-2 rounded-lg transition-colors text-sm font-medium'
									style={{
										backgroundColor: "#204758",
										fontFamily: "Outfit, sans-serif",
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.backgroundColor =
											"#2a5a6e";
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.backgroundColor =
											"#204758";
									}}
								>
									Submit
								</button>
							</div>
						</form>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Jobs;
