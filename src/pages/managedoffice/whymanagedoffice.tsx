import {
	Settings,
	Users,
	TrendingUp,
	Wifi,
	DollarSign,
	MapPin,
} from "lucide-react";
import { COLORS } from "../../helpers/constants/Colors";

interface Benefit {
	title: string;
	description: string;
	icon: React.ReactNode;
}

const WhyManagedOffice = () => {
	const benefits: Benefit[] = [
		{
			title: "End-to-End Management",
			description:
				"No hassle design, setup, daily operations, and maintenance—zero operational stress for you.",
			icon: <Settings className='w-8 h-8' />,
		},
		{
			title: "Designed for Your Team",
			description:
				"Layouts, branding, furniture, meeting rooms, and collaboration spaces tailored to your needs.",
			icon: <Users className='w-8 h-8' />,
		},
		{
			title: "Scalable & Flexible",
			description:
				"Easily expand or optimize your space as your team grows or changes.",
			icon: <TrendingUp className='w-8 h-8' />,
		},
		{
			title: "Premium Infrastructure",
			description:
				"High-speed internet, power backups, security, meeting rooms, and modern amenities.",
			icon: <Wifi className='w-8 h-8' />,
		},
		{
			title: "Cost & Time Savings",
			description:
				"No upfront capex, predictable costs, and faster move-in timelines.",
			icon: <DollarSign className='w-8 h-8' />,
		},
		{
			title: "Prime Locations",
			description:
				"Strategically located offices with excellent connectivity and accessibility.",
			icon: <MapPin className='w-8 h-8' />,
		},
	];

	return (
		<section
			id='why-managed-office'
			className='w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-16'
			style={{ backgroundColor: "#f8fafc" }}
		>
			<div className='max-w-7xl mx-auto'>
				{/* Heading */}
				<h2
					className='text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 text-center'
					style={{
						color: COLORS.brandBlueDark,
						fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
					}}
				>
					Why Choose Managed Office at iSprout?
				</h2>

				{/* Benefits Cards Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
					{benefits.map((benefit, index) => (
						<div
							key={index}
							className='bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100'
						>
							{/* Icon with yellow circle background */}
							<div className='mb-6'>
								<div
									className='w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center'
									style={{ backgroundColor: "#FFDE00" }}
								>
									<div
										style={{ color: COLORS.brandBlueDark }}
									>
										{benefit.icon}
									</div>
								</div>
							</div>

							{/* Title */}
							<h3
								className='text-xl sm:text-2xl font-bold mb-3 sm:mb-4'
								style={{
									color: COLORS.brandBlueDark,
									fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
								}}
							>
								{benefit.title}
							</h3>

							{/* Description */}
							<p
								className='text-base sm:text-lg text-gray-600 leading-relaxed'
								style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
							>
								{benefit.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default WhyManagedOffice;
