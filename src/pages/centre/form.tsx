import { COLORS } from "../../helpers/constants/Colors";
import { useState } from "react";
import { User, Mail, Phone, Building2 } from "lucide-react";

interface FormProps {
	centerName?: string;
	location?: string;
}

// Custom Floating Input with background color
function CustomFloatingInput({
	label,
	value,
	onChange,
	type = "text",
	required,
	icon
}: {
	label: string;
	value: string;
	onChange: (v: string) => void;
	type?: string;
	required?: boolean;
	icon?: React.ReactNode;
}) {
	const [focus, setFocus] = useState(false);
	const float = focus || value;
	const id = `input-${label.replace(/\s+/g, '-').toLowerCase()}`;

	return (
		<div className="relative">
			<input
				id={id}
				type={type}
				value={value}
				required={required}
				onChange={(e) => onChange(e.target.value)}
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
				className="w-full border border-[#204758] rounded-full px-5 py-3 focus:ring-2 focus:ring-[#204758] outline-none"
				style={{ backgroundColor: "#d2e6f5" }}
			/>
			<label
				htmlFor={id}
				className={`absolute left-5 px-1 text-gray-600 transition-all cursor-pointer ${
					float ? "-top-2 text-xs" : "top-1/2 -translate-y-1/2"
				}`}
				style={{ backgroundColor: "#d2e6f5" }}
			>
				{label}
			</label>
			{icon && (
				<span className="absolute right-5 top-1/2 -translate-y-1/2 text-[#204758]">
					{icon}
				</span>
			)}
		</div>
	);
}

export default function Form({ 
	centerName = "One Golden Mile", 
	location = "Mia, Spanning 36,000 sq. ft., in Hyderabad offers a dynamic workspace tailored for balanced life and growth." 
}: FormProps) {
	const [formData, setFormData] = useState({
		fullName: "",
		workEmail: "",
		phoneNumber: "",
		companyName: "",
		requiredSeats: "",
		acceptTerms: false,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form submitted:", formData);
		// Add your form submission logic here
	};

	return (
		<div className="w-full py-12 lg:py-16 px-4" style={{ backgroundColor: "#d2e6f5" }}>
			<div className="max-w-7xl mx-auto">
				<div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
					{/* Left Side - Description */}
					<div className="flex flex-col justify-center">
						<h2 className="text-xl lg:text-2xl font-bold mb-3" style={{ color: COLORS.brandBlueDark }}>
							Welcome to {centerName}
						</h2>
					<p className="text-sm lg:text-base leading-snug mb-3" style={{ color: "#4B5563" }}>
						{location}
					</p>
					<p className="text-sm lg:text-base leading-snug mb-4" style={{ color: "#6B7280" }}>
							From collaborative zones that spark ideas to private offices for focused work, every space is designed to cultivate productivity. Equipped with meeting rooms, cozy lounge areas, and modern amenities, we support diverse work styles. Whether you're a start-up or an established company, {centerName} provides more than just a workspace—it's a platform for success. Experience convenience, community, and inspiration in your daily work routine, all within a prime coworking destination.
						</p>
						<div className="mt-3 flex items-start text-gray-600">
							<svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: COLORS.brandBlue }} fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
							</svg>
						<p className="text-sm">
								iSprout {centerName}, 5th Floor, Survey no 113, Golden Mile Rd, Kokapet, Hyderabad, Telangana 500075
							</p>
						</div>
					</div>

					{/* Right Side - Form */}
					<div className="flex flex-col justify-center">
						<div className="mb-4">
							<h3 className="text-lg font-bold mb-1" style={{ color: COLORS.brandBlueDark }}>
								Interested in this location?
							</h3>
						<p className="text-sm text-gray-600">
								Complete the form to book a tour or connect with one of our team members to find out more
							</p>
						</div>

						<form onSubmit={handleSubmit} className="space-y-4">
							{/* Full Name */}
							<CustomFloatingInput
								label="Full Name"
								value={formData.fullName}
								onChange={(v) => setFormData({ ...formData, fullName: v })}
								icon={<User size={18} />}
								required
							/>

							{/* Work Email and Phone Number - Same Row */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<CustomFloatingInput
									label="Work Email"
									type="email"
									value={formData.workEmail}
									onChange={(v) => setFormData({ ...formData, workEmail: v })}
									icon={<Mail size={18} />}
									required
								/>
								<CustomFloatingInput
									label="Phone Number"
									type="tel"
									value={formData.phoneNumber}
									onChange={(v) => setFormData({ ...formData, phoneNumber: v })}
									icon={<Phone size={18} />}
									required
								/>
							</div>

							{/* Company Name */}
							<CustomFloatingInput
								label="Company Name"
								value={formData.companyName}
								onChange={(v) => setFormData({ ...formData, companyName: v })}
								icon={<Building2 size={18} />}
								required
							/>

							{/* Required Seats */}
							<CustomFloatingInput
								label="Required Seats"
								type="number"
								value={formData.requiredSeats}
								onChange={(v) => setFormData({ ...formData, requiredSeats: v })}
								required
							/>

							{/* Terms Checkbox */}
							<label className="flex gap-3 text-sm">
								<input
									type="checkbox"
									checked={formData.acceptTerms}
									onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
									required
								/>
								I accept all of iSprout's terms & conditions
							</label>

							{/* Submit Button - Centered */}
							<div className="flex justify-center pt-2">
								<button
									type="submit"
									className="px-8 py-2.5 rounded-full font-semibold text-white text-sm transition-all hover:opacity-90"
									style={{ backgroundColor: COLORS.brandBlueDark }}
								>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
