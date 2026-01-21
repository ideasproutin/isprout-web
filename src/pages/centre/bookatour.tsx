import { COLORS } from "../../helpers/constants/Colors";
import { useState, useEffect } from "react";
import formImage from "../../assets/centers/formimage.png";

interface BookATourProps {
	city?: string;
	officeName?: string;
}

export default function BookATour({
	city = "",
	officeName = "",
}: BookATourProps) {
	const [formData, setFormData] = useState({
		fullName: "",
		workEmail: "",
		phoneNumber: "",
		companyName: "",
		requirements: "",
		city: city,
		office: officeName,
		requiredSeats: 1,
		managerCabin: false,
		conferenceRoom: false,
		acceptTerms: false,
	});

	// Update form when props change
	useEffect(() => {
		setFormData((prev) => ({
			...prev,
			city: city,
			office: officeName,
		}));
	}, [city, officeName]);

	const cities = [
		"Hyderabad",
		"Bengaluru",
		"Chennai",
		"Pune",
		"Vijayawada",
		"Gurugram",
		"Kolkata",
		"Ahmedabad",
	];

	const officesByCity: { [key: string]: string[] } = {
		Hyderabad: [
			"One Golden Mile",
			"Kokapet",
			"Hitec City",
			"Orbit",
			"My Home Twitza",
			"Jayabheri Trendset Connect",
			"Sohini Tech Park",
			"Divyasree Trinity",
			"Purva Summit",
			"Modern Profound",
		],
		Bengaluru: [
			"Indiranagar",
			"Whitefield",
			"Koramangala",
			"HSR Layout",
			"MG Road",
		],
		Chennai: ["OMR", "Guindy", "Nungambakkam", "T Nagar", "Anna Nagar"],
		Pune: ["Baner", "Hinjewadi", "Viman Nagar", "Kalyani Nagar", "Kharadi"],
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
			...(name === "city" && { office: "" }),
		}));
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: checked,
		}));
	};

	const incrementSeats = () => {
		setFormData((prev) => ({
			...prev,
			requiredSeats: prev.requiredSeats + 1,
		}));
	};

	const decrementSeats = () => {
		setFormData((prev) => ({
			...prev,
			requiredSeats: Math.max(1, prev.requiredSeats - 1),
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form submitted:", formData);
	};

	return (
		<div
			className='w-full flex items-start justify-center overflow-x-hidden'
			style={{ backgroundColor: COLORS.white }}
		>
			{/* Main Container */}
			<div className='relative w-full max-w-[1440px] h-[800px]'>
				{/* Beige Background Section - Full height */}
				<div
					className='absolute top-0 left-0 w-full h-full overflow-hidden'
					style={{ backgroundColor: COLORS.backgroundCream }}
				>
					{/* Decorative ellipse top right */}
					<div className='absolute left-[484px] top-[-122px]'>
						<div className='absolute flex h-[324.553px] items-center justify-center left-0 top-0 w-[329.625px]'>
							<div className='flex-none rotate-[316.942deg] skew-x-[356.121deg]'>
								<div
									className='h-[89.408px] opacity-[0.47] rounded-[105.53px] w-[373.843px]'
									style={{
										backgroundColor: COLORS.brandBlue,
									}}
								/>
							</div>
						</div>
						<div className='absolute flex h-[301.17px] items-center justify-center left-[91.12px] top-[87.83px] w-[305.877px]'>
							<div className='flex-none rotate-[316.942deg] skew-x-[356.121deg]'>
								<div
									className='h-[82.966px] opacity-[0.47] rounded-[105.53px] w-[346.909px]'
									style={{
										backgroundColor: COLORS.brandBlue,
									}}
								/>
							</div>
						</div>
					</div>

					{/* Decorative ellipse middle right */}
					<div className='absolute left-[398px] top-[299px]'>
						<div className='absolute flex h-[278.441px] items-center justify-center left-0 top-0 w-[296.878px]'>
							<div className='flex-none rotate-[317.857deg] skew-x-[357.931deg]'>
								<div
									className='h-[75.621px] opacity-[0.47] rounded-[105.53px] w-[343.555px]'
									style={{
										backgroundColor: COLORS.brandBlue,
									}}
								/>
							</div>
						</div>
						<div className='absolute flex h-[251.176px] items-center justify-center left-[79.72px] top-[72.41px] w-[268.285px]'>
							<div className='flex-none rotate-[317.857deg] skew-x-[357.931deg]'>
								<div
									className='h-[68.011px] opacity-[0.47] rounded-[105.53px] w-[311.598px]'
									style={{
										backgroundColor: COLORS.brandBlue,
									}}
								/>
							</div>
						</div>
					</div>

					{/* Header text */}
					<p
						className="absolute left-[90px] top-[50px] text-[14px] font-['Inter',sans-serif] font-bold"
						style={{ color: COLORS.brandBlue }}
					>
						Interested in this location?
					</p>

					{/* Large decorative ellipse */}
					<div className='absolute left-[320px] top-[290px] w-[400px] h-[380px]'>
						<svg
							className='block size-full'
							fill='none'
							preserveAspectRatio='none'
							viewBox='0 0 541 518'
						>
							<ellipse
								cx='270.5'
								cy='259'
								fill='#00275c'
								rx='270.5'
								ry='259'
							/>
						</svg>
					</div>

					{/* Book a Tour text */}
					<div className='absolute left-[50px] top-[100px] w-[400px] z-10'>
						<p className="text-[36px] font-['Inter',sans-serif]">
							<span>Book a </span>
							<span className='font-bold text-[#00275c]'>
								Tour!
							</span>
						</p>
						<p className="text-[#1a1a1a] text-[14px] w-[300px] mt-2 font-['Inter',sans-serif]">
							Complete the form to book a tour or connect with one
							of our team members to find out more.
						</p>
					</div>

					{/* Girl with binoculars image */}
					<div className='absolute left-80 top-[180px] w-[330px] h-[395px] flex items-center justify-center z-10'>
						<div
							className='flex-none'
							style={{ transform: "scaleX(-1)" }}
						>
							<div className='h-[395px] relative w-[330px]'>
								<img
									alt='Girl watching through binoculars'
									className='absolute inset-0 max-w-none object-cover pointer-events-none size-full'
									src={formImage}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Teal Background Section - Reduced height, 41% opacity, does not overlap button */}
				<div className='absolute left-0 bottom-0 w-full h-[180px] bg-[rgba(32,71,88,0.41)] z-0'>
					{/* Contact Information - Left aligned */}
					<div className='absolute left-[740px] top-5'>
						<p className="text-[#00275c] text-[24px] font-['Inter',sans-serif] font-semibold mb-[15px]">
							Office Space:
						</p>

						{/* Phone */}
						<div className='flex items-center gap-2.5 mb-2'>
							<div className='w-5 h-5 shrink-0'>
								<svg
									className='block size-full'
									fill='none'
									preserveAspectRatio='none'
									viewBox='0 0 25 25'
								>
									<path
										d='M22.5 17.2V20.45C22.5008 20.7259 22.4413 20.9985 22.3255 21.2486C22.2098 21.4988 22.0405 21.7205 21.8294 21.8981C21.6183 22.0758 21.3702 22.2052 21.1025 22.2775C20.8349 22.3499 20.5541 22.3635 20.28 22.3175C16.9327 21.8302 13.7434 20.6052 10.95 18.7325C8.36749 17.0303 6.19028 14.8531 4.48753 12.2706C2.60003 9.46505 1.37503 6.26177 0.899982 2.90067C0.854071 2.62773 0.867542 2.34823 0.939334 2.08172C1.01113 1.81522 1.13965 1.56808 1.31609 1.35775C1.49253 1.14742 1.71289 0.978638 1.96165 0.862838C2.21041 0.747039 2.48176 0.687287 2.75626 0.687744H6.00626C6.51876 0.682744 7.01626 0.871244 7.40003 1.21624C7.78379 1.56124 8.02503 2.03374 8.08128 2.54374C8.18504 3.56375 8.39754 4.56875 8.71379 5.54375C8.85879 5.96125 8.87629 6.41375 8.76254 6.84125C8.64879 7.26875 8.40879 7.65125 8.07003 7.94125L6.60003 9.41125C8.21128 12.1287 10.5213 14.4387 13.2388 16.05L14.7088 14.58C14.9988 14.2412 15.3813 14.0012 15.8088 13.8875C16.2363 13.7737 16.6888 13.7912 17.1063 13.9362C18.0813 14.2525 19.0863 14.465 20.1063 14.5687C20.6238 14.625 21.1013 14.8712 21.4488 15.2625C21.7963 15.6537 21.9838 16.16 21.975 16.68V19.93'
										fill='#00275c'
									/>
								</svg>
							</div>
							<p className="text-[#00275c] text-[13px] font-['Inter',sans-serif] font-medium tracking-[1.5px]">
								(+91) 8464999920
							</p>
						</div>

						{/* Email */}
						<div className='flex items-center gap-2.5 mb-2'>
							<div className='w-[20px] h-[20px] flex-shrink-0'>
								<svg
									className='block size-full'
									fill='none'
									preserveAspectRatio='none'
									viewBox='0 0 25 25'
								>
									<path
										d='M3.125 4.6875H21.875C22.9062 4.6875 23.75 5.53125 23.75 6.5625V18.4375C23.75 19.4688 22.9062 20.3125 21.875 20.3125H3.125C2.09375 20.3125 1.25 19.4688 1.25 18.4375V6.5625C1.25 5.53125 2.09375 4.6875 3.125 4.6875Z'
										stroke='#00275c'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
									<path
										d='M23.75 6.5625L12.5 13.4375L1.25 6.5625'
										stroke='#00275c'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</div>
							<p className="text-[#00275c] text-[13px] font-['Inter',sans-serif] font-medium">
								marketing@isprout.in
							</p>
						</div>

						{/* Address */}
						<div className='flex items-start gap-[10px]'>
							<div className='w-[20px] h-[20px] flex-shrink-0'>
								<svg
									className='block size-full'
									fill='none'
									preserveAspectRatio='none'
									viewBox='0 0 25 25'
								>
									<path
										d='M21.875 10.4167C21.875 17.7083 12.5 24.4792 12.5 24.4792C12.5 24.4792 3.125 17.7083 3.125 10.4167C3.125 7.92555 4.11272 5.53622 5.87087 3.77807C7.62902 2.01992 10.0183 1.03219 12.5 1.03219C14.9817 1.03219 17.371 2.01992 19.1291 3.77807C20.8873 5.53622 21.875 7.92555 21.875 10.4167Z'
										stroke='#00275c'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
									<path
										d='M12.5 13.5417C14.2259 13.5417 15.625 12.1426 15.625 10.4167C15.625 8.69078 14.2259 7.29169 12.5 7.29169C10.7741 7.29169 9.375 8.69078 9.375 10.4167C9.375 12.1426 10.7741 13.5417 12.5 13.5417Z'
										stroke='#00275c'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</div>
							<p className="text-[#00275c] text-[13px] font-['Inter',sans-serif] font-medium w-[500px] leading-relaxed">
								iSprout One Golden Mile, 9th Floor, Survey no
								113, Golden Mile Rd, Kokapet, Hyderabad,
								Telangana 500075
							</p>
						</div>
					</div>
				</div>

				{/* Form Section - Right aligned, compact premium feel */}
				<form
					onSubmit={handleSubmit}
					className='absolute right-20 top-[60px] z-20 w-[420px]'
				>
					{/* Full Name */}
					<div className='mb-3.5'>
						<div className='relative'>
							<input
								type='text'
								name='fullName'
								value={formData.fullName}
								onChange={handleInputChange}
								className='w-full h-[42px] border-2 border-[#00275c] rounded-[50px] px-5 pr-[45px] bg-[#FEFFDE] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00275c] transition-colors text-[#00275c] peer'
								placeholder=' '
							/>
							<label className='absolute left-5 top-1/2 -translate-y-1/2 text-[#00275c] text-[14px] transition-all duration-200 pointer-events-none peer-focus:top-0 peer-focus:left-4 peer-focus:text-[11px] peer-focus:bg-[#FEFFDE] peer-focus:px-1 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-[#FEFFDE] peer-[:not(:placeholder-shown)]:px-1'>
								Full Name
							</label>
							<div className='absolute right-[18px] top-1/2 -translate-y-1/2 w-[13px] h-[21px]'>
								<svg
									className='block size-full'
									fill='none'
									preserveAspectRatio='none'
									viewBox='0 0 15 25'
								>
									<path
										d='M7.5 12.5C9.98528 12.5 12 10.4853 12 8C12 5.51472 9.98528 3.5 7.5 3.5C5.01472 3.5 3 5.51472 3 8C3 10.4853 5.01472 12.5 7.5 12.5Z'
										fill='#00275c'
									/>
									<path
										d='M14 21.5C14 17.634 11.0899 14.5 7.5 14.5C3.91015 14.5 1 17.634 1 21.5'
										stroke='#00275c'
										strokeWidth='2'
										strokeLinecap='round'
									/>
								</svg>
							</div>
						</div>
					</div>

					{/* Work Email and Phone Number */}
					<div className='flex gap-4 mb-3.5'>
						<div className='flex-1'>
							<div className='relative'>
								<input
									type='email'
									name='workEmail'
									value={formData.workEmail}
									onChange={handleInputChange}
									className='w-full h-[42px] border-2 border-[#00275c] rounded-[50px] px-5 pr-[45px] bg-[#FEFFDE] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00275c] transition-colors text-[#00275c] peer'
									placeholder=' '
								/>
								<label className='absolute left-5 top-1/2 -translate-y-1/2 text-[#00275c] text-[14px] transition-all duration-200 pointer-events-none peer-focus:top-0 peer-focus:left-4 peer-focus:text-[11px] peer-focus:bg-[#FEFFDE] peer-focus:px-1 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-[#FEFFDE] peer-[:not(:placeholder-shown)]:px-1'>
									Work Email
								</label>
								<div className='absolute right-[18px] top-1/2 -translate-y-1/2 w-[18px] h-[14px]'>
									<svg
										className='block size-full'
										fill='none'
										preserveAspectRatio='none'
										viewBox='0 0 20.8333 16.6667'
									>
										<path
											d='M3.125 4.16667H17.7083C18.5417 4.16667 19.2083 4.83333 19.2083 5.66667V15C19.2083 15.8333 18.5417 16.5 17.7083 16.5H3.125C2.29167 16.5 1.625 15.8333 1.625 15V5.66667C1.625 4.83333 2.29167 4.16667 3.125 4.16667Z'
											stroke='#00275c'
											strokeWidth='1.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
										<path
											d='M19.2083 5.66667L10.4167 11L1.625 5.66667'
											stroke='#00275c'
											strokeWidth='1.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</div>
							</div>
						</div>

						<div className='flex-1'>
							<div className='relative'>
								<input
									type='tel'
									name='phoneNumber'
									value={formData.phoneNumber}
									onChange={handleInputChange}
									className='w-full h-[42px] border-2 border-[#00275c] rounded-[50px] px-5 pr-[45px] bg-[#FEFFDE] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00275c] transition-colors text-[#00275c] peer'
									placeholder=' '
								/>
								<label className='absolute left-5 top-1/2 -translate-y-1/2 text-[#00275c] text-[14px] transition-all duration-200 pointer-events-none peer-focus:top-0 peer-focus:left-4 peer-focus:text-[11px] peer-focus:bg-[#FEFFDE] peer-focus:px-1 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-[#FEFFDE] peer-[:not(:placeholder-shown)]:px-1'>
									Phone Number
								</label>
								<div className='absolute right-[18px] top-1/2 -translate-y-1/2 w-4 h-4'>
									<svg
										className='block size-full'
										fill='none'
										preserveAspectRatio='none'
										viewBox='0 0 18.75 18.75'
									>
										<path
											d='M17.5781 13.7812V16.4062C17.5781 17.2344 16.9062 17.9062 16.0781 17.9062C7.26562 17.5781 0.421875 10.7344 0.09375 1.92187C0.09375 1.09375 0.765625 0.421875 1.59375 0.421875H4.21875C5.04688 0.421875 5.71875 1.09375 5.71875 1.92187C5.71875 3.57812 6.04688 5.18438 6.65625 6.65625C6.84375 7.09375 6.75 7.625 6.375 7.95312L4.64062 9.6875C6.23438 12.8281 8.76562 15.3594 11.9062 16.9531L13.6406 15.2187C14.0625 14.7969 14.6094 14.7031 15.0469 14.8906C16.5188 15.5 18.125 15.8281 19.7812 15.8281C20.6094 15.875 21.2812 16.5469 21.2812 17.375Z'
											fill='#00275c'
										/>
									</svg>
								</div>
							</div>
						</div>
					</div>

					{/* Company Name */}
					<div className='mb-3.5'>
						<div className='relative'>
							<input
								type='text'
								name='companyName'
								value={formData.companyName}
								onChange={handleInputChange}
								className='w-full h-[42px] border-2 border-[#00275c] rounded-[50px] px-5 pr-[45px] bg-[#FEFFDE] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00275c] transition-colors text-[#00275c] peer'
								placeholder=' '
							/>
							<label className='absolute left-5 top-1/2 -translate-y-1/2 text-[#00275c] text-[14px] transition-all duration-200 pointer-events-none peer-focus:top-0 peer-focus:left-4 peer-focus:text-[11px] peer-focus:bg-[#FEFFDE] peer-focus:px-1 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-[#FEFFDE] peer-[:not(:placeholder-shown)]:px-1'>
								Company Name
							</label>
							<div className='absolute right-[18px] top-1/2 -translate-y-1/2 w-[17px] h-[25px]'>
								<svg
									className='block size-full'
									fill='none'
									preserveAspectRatio='none'
									viewBox='0 0 20 30'
								>
									<path
										d='M2 2h16v26H2V2z'
										stroke='#00275c'
										strokeWidth='2'
									/>
									<path
										d='M6 6h3v3H6V6zM11 6h3v3h-3V6zM6 11h3v3H6v-3zM11 11h3v3h-3v-3zM6 16h3v3H6v-3zM11 16h3v3h-3v-3z'
										fill='#00275c'
									/>
								</svg>
							</div>
						</div>
					</div>

					{/* Select Your Requirements */}
					<div className='mb-3.5'>
						<div className='relative'>
							<select
								name='requirements'
								value={formData.requirements}
								onChange={handleInputChange}
								className='w-full h-[42px] border-2 border-[#00275c] rounded-[50px] px-5 pr-[45px] bg-[#FEFFDE] focus:bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#00275c] transition-colors text-[#00275c]'
							>
								<option value=''>
									Select Your Requirements
								</option>
								<option value='Managed office'>
									Managed office
								</option>
								<option value='Virtual office'>
									Virtual office
								</option>
								<option value='Meeting rooms'>
									Meeting rooms
								</option>
							</select>
							<div className='absolute right-5 top-1/2 -translate-y-1/2 w-3 h-1.5 pointer-events-none'>
								<svg
									className='block size-full'
									fill='none'
									preserveAspectRatio='none'
									viewBox='0 0 14 7'
								>
									<path
										d='M1 1L7 6L13 1'
										stroke='#00275c'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</div>
						</div>
					</div>

					{/* City and Office */}
					<div className='flex gap-4 mb-3.5'>
						<div className='flex-1'>
							<div className='relative'>
								<select
									name='city'
									value={formData.city}
									onChange={handleInputChange}
									className='w-full h-[42px] border-2 border-[#00275c] rounded-[50px] px-5 pr-10 bg-[#FEFFDE] focus:bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#00275c] transition-colors text-[#00275c]'
								>
									<option value=''>City</option>
									{cities.map((city) => (
										<option key={city} value={city}>
											{city}
										</option>
									))}
								</select>
								<div className='absolute right-[15px] top-1/2 -translate-y-1/2 w-3 h-1.5 pointer-events-none'>
									<svg
										className='block size-full'
										fill='none'
										preserveAspectRatio='none'
										viewBox='0 0 14 7'
									>
										<path
											d='M1 1L7 6L13 1'
											stroke='#00275c'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</div>
							</div>
						</div>

						<div className='flex-1'>
							<div className='relative'>
								<select
									name='office'
									value={formData.office}
									onChange={handleInputChange}
									disabled={
										!formData.city ||
										!officesByCity[formData.city]
									}
									className='w-full h-[42px] border-2 border-[#00275c] rounded-[50px] px-5 pr-10 bg-[#FEFFDE] focus:bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#00275c] disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-[#00275c]'
								>
									<option value=''>Office</option>
									{formData.city &&
										officesByCity[formData.city]?.map(
											(office) => (
												<option
													key={office}
													value={office}
												>
													{office}
												</option>
											),
										)}
								</select>
								<div className='absolute right-[15px] top-1/2 -translate-y-1/2 w-3 h-1.5 pointer-events-none'>
									<svg
										className='block size-full'
										fill='none'
										preserveAspectRatio='none'
										viewBox='0 0 14 7'
									>
										<path
											d='M1 1L7 6L13 1'
											stroke='#00275c'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</div>
							</div>
						</div>
					</div>

					{/* Checkboxes for Manager Cabin and Conference Room */}
					<div className='flex gap-[30px] mb-3.5'>
						<div className='flex items-center'>
							<div className='relative'>
								<input
									type='checkbox'
									name='managerCabin'
									checked={formData.managerCabin}
									onChange={handleCheckboxChange}
									className='appearance-none w-[18px] h-[18px] border-2 border-[#00275c] rounded-sm cursor-pointer checked:bg-[#00275c] transition-colors'
									id='managerCabin'
								/>
								{formData.managerCabin && (
									<div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-2.5 pointer-events-none'>
										<svg
											className='block size-full'
											fill='none'
											viewBox='0 0 12 10'
										>
											<path
												d='M1 5L4.5 8.5L11 1.5'
												stroke='white'
												strokeWidth='2'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
										</svg>
									</div>
								)}
							</div>
							<label
								htmlFor='managerCabin'
								className="ml-2.5 text-[13px] font-['Inter',sans-serif] text-[#1a1a1a] cursor-pointer"
							>
								Manager Cabin
							</label>
						</div>

						<div className='flex items-center'>
							<div className='relative'>
								<input
									type='checkbox'
									name='conferenceRoom'
									checked={formData.conferenceRoom}
									onChange={handleCheckboxChange}
									className='appearance-none w-[18px] h-[18px] border-2 border-[#00275c] rounded-sm cursor-pointer checked:bg-[#00275c] transition-colors'
									id='conferenceRoom'
								/>
								{formData.conferenceRoom && (
									<div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-2.5 pointer-events-none'>
										<svg
											className='block size-full'
											fill='none'
											viewBox='0 0 12 10'
										>
											<path
												d='M1 5L4.5 8.5L11 1.5'
												stroke='white'
												strokeWidth='2'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
										</svg>
									</div>
								)}
							</div>
							<label
								htmlFor='conferenceRoom'
								className="ml-2.5 text-[13px] font-['Inter',sans-serif] text-[#1a1a1a] cursor-pointer"
							>
								Conference Room
							</label>
						</div>
					</div>

					{/* Required Seats */}
					<div className='mb-3.5'>
						<div className='relative'>
							<input
								type='text'
								value={`Required Seats`}
								readOnly
								className='w-full h-[42px] border-2 border-[#00275c] rounded-[50px] px-5 bg-[#FEFFDE] focus:outline-none text-[#00275c] cursor-default'
							/>
							<div className='absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2'>
								<button
									type='button'
									onClick={decrementSeats}
									className="text-[16px] font-['Inter',sans-serif] font-bold text-[#00275c] hover:text-[#2d5f75] transition-colors bg-transparent shadow-none outline-none border-none focus:ring-0 focus:outline-none"
									style={{
										background: "none",
										boxShadow: "none",
										border: "none",
									}}
								>
									-
								</button>
								<span className="text-[16px] font-['Inter',sans-serif] font-bold text-[#00275c]">
									|
								</span>
								<span className="text-[16px] font-['Inter',sans-serif] font-bold text-[#00275c] min-w-[20px] text-center">
									{formData.requiredSeats}
								</span>
								<span className="text-[16px] font-['Inter',sans-serif] font-bold text-[#00275c]">
									|
								</span>
								<button
									type='button'
									onClick={incrementSeats}
									className="text-[16px] font-['Inter',sans-serif] font-bold text-[#00275c] hover:text-[#2d5f75] transition-colors bg-transparent shadow-none outline-none border-none focus:ring-0 focus:outline-none"
									style={{
										background: "none",
										boxShadow: "none",
										border: "none",
									}}
								>
									+
								</button>
							</div>
						</div>
					</div>

					{/* Terms Checkbox */}
					<div className='flex items-center mb-[22px]'>
						<div className='relative shrink-0'>
							<input
								type='checkbox'
								name='acceptTerms'
								checked={formData.acceptTerms}
								onChange={handleCheckboxChange}
								className='appearance-none w-[18px] h-[18px] border-2 border-[#00275c] rounded-sm cursor-pointer checked:bg-[#00275c] transition-colors'
								id='acceptTerms'
							/>
							{formData.acceptTerms && (
								<div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-2.5 pointer-events-none'>
									<svg
										className='block size-full'
										fill='none'
										viewBox='0 0 12 10'
									>
										<path
											d='M1 5L4.5 8.5L11 1.5'
											stroke='white'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</div>
							)}
						</div>
						<label
							htmlFor='acceptTerms'
							className="ml-2.5 text-[13px] font-['Inter',sans-serif] text-[#1a1a1a] cursor-pointer"
						>
							I accept all of iSprout's terms & conditions
						</label>
					</div>

					{/* Submit Button - Centered, only on beige background */}
					<div className='flex justify-center'>
						<button
							type='submit'
							className="bg-[#00275c]! h-11 w-40 rounded-xl flex items-center justify-center text-white text-[15px] font-['Inter',sans-serif] font-semibold hover:bg-[#2d5f75] transition-colors cursor-pointer shadow-md mt-[-10px]"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
