import React from "react";
import { COLORS } from "../../helpers/constants/Colors";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

interface CenterDataProps {
	centerData: {
		center: string;
		name: string;
		image?: string;
		address?: string;
		phone?: string;
		email?: string;
	};
	index?: number;
}

const Center: React.FC<CenterDataProps> = ({ centerData, index = 0 }) => {
	return (
		<div className='relative w-full h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl'>
			{/* Yellow Curved Background */}
			<div
				className='absolute inset-0 z-0'
				style={{
					backgroundColor: COLORS.brandYellow,
					clipPath: "ellipse(80% 100% at 0% 50%)",
				}}
			></div>

			{/* Content Container */}
			<div className='relative z-10 h-full flex'>
				{/* Left Side - Info */}
				<div className='w-[35%] p-6 lg:p-8 flex flex-col justify-between'>
					<div>
						{/* Number */}
						<h3
							className='text-5xl lg:text-6xl font-bold mb-4'
							style={{
								fontFamily: "Otomanopee One, sans-serif",
								color: COLORS.brandBlue,
							}}
						>
							{String(index + 1).padStart(2, "0")}
						</h3>

						{/* Title */}
						<h4
							className='text-xl lg:text-2xl font-bold mb-4'
							style={{
								fontFamily: "Otomanopee One, sans-serif",
								color: COLORS.brandBlue,
							}}
						>
							{centerData.name}
						</h4>

						{/* Address */}
						{centerData.address && (
							<div className='flex items-start gap-2 mb-3'>
								<MdLocationOn
									className='flex-shrink-0 mt-1'
									size={18}
									style={{ color: COLORS.brandBlue }}
								/>
								<p
									className='text-xs lg:text-sm'
									style={{
										fontFamily: "Outfit, sans-serif",
										color: COLORS.brandBlue,
									}}
								>
									{centerData.address}
								</p>
							</div>
						)}

						{/* Phone */}
						{centerData.phone && (
							<div className='flex items-center gap-2 mb-2'>
								<MdPhone
									size={16}
									style={{ color: COLORS.brandBlue }}
								/>
								<p
									className='text-xs lg:text-sm font-medium'
									style={{
										fontFamily: "Outfit, sans-serif",
										color: COLORS.brandBlue,
									}}
								>
									{centerData.phone}
								</p>
							</div>
						)}

						{/* Email */}
						{centerData.email && (
							<div className='flex items-center gap-2 mb-4'>
								<MdEmail
									size={16}
									style={{ color: COLORS.brandBlue }}
								/>
								<p
									className='text-xs lg:text-sm font-medium'
									style={{
										fontFamily: "Outfit, sans-serif",
										color: COLORS.brandBlue,
									}}
								>
									{centerData.email}
								</p>
							</div>
						)}
					</div>

					{/* Buttons */}
					<div className='flex gap-3'>
						<button
							className='px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300'
							style={{
								backgroundColor: COLORS.brandBlue,
								color: "white",
								fontFamily: "Outfit, sans-serif",
							}}
						>
							Explore More
						</button>
						<button
							className='px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300'
							style={{
								backgroundColor: COLORS.brandBlue,
								color: "white",
								fontFamily: "Outfit, sans-serif",
							}}
						>
							Get Direction
						</button>
					</div>
				</div>

				{/* Right Side - Image */}
				<div className='w-[65%] h-full'>
					{centerData.image ? (
						<img
							src={centerData.image}
							alt={centerData.name}
							className='w-full h-full object-cover'
						/>
					) : (
						<div
							className='w-full h-full flex items-center justify-center'
							style={{ backgroundColor: "#f3f4f6" }}
						>
							<p className='text-gray-400'>No Image</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Center;
