import { COLORS } from "../../helpers/constants/Colors";
import mapImage from "../../assets/city/map.png";

interface DescriptionProps {
	cityName?: string;
}

const Description = ({ cityName = "Hyderabad" }: DescriptionProps) => {
	const cityDescriptions: {
		[key: string]: { title: string; highlight: string; text: string };
	} = {
		hyderabad: {
			title: "Hyderabad's Hotspots for",
			highlight: "Hustlers",
			text: "Hyderabad has become one of India's leading business hubs, known for its thriving IT sector and entrepreneurial spirit. Our strategically located coworking spaces across the city provide the perfect environment for your business to flourish. From Hitec City to Gachibowli, we're positioned at the heart of innovation.",
		},
		bengaluru: {
			title: "Bengaluru's Best Spaces for",
			highlight: "Innovation",
			text: "Bengaluru, India's Silicon Valley, is home to countless startups and tech giants. Our premium coworking spaces are strategically located across key business districts, offering you the perfect environment to collaborate, innovate, and grow. Experience world-class amenities in the heart of India's startup capital.",
		},
		chennai: {
			title: "Chennai's Premier Hubs for",
			highlight: "Growth",
			text: "Chennai, the cultural and economic capital of South India, is a thriving hub for manufacturing, IT, and business services. Our strategically positioned coworking spaces across Chennai offer modern facilities and a vibrant community. From Guindy to OMR, we provide the perfect environment for your business to succeed in this dynamic city.",
		},
		pune: {
			title: "Pune's Dynamic Spaces for",
			highlight: "Entrepreneurs",
			text: "Pune, known as the Oxford of the East, has emerged as a major IT and manufacturing hub in India. Our premium coworking spaces across Hinjawadi, Baner, and Yerawada provide the perfect blend of modern infrastructure and collaborative environment. Experience flexible workspaces designed for startups, SMEs, and enterprise teams in one of India's most liveable cities.",
		},
		vijayawada: {
			title: "Vijayawada's Prime Locations for",
			highlight: "Success",
			text: "Vijayawada, the business capital of Andhra Pradesh, is rapidly emerging as a key commercial and IT hub in South India. Our modern coworking spaces at Benz Circle and IT Park Road offer state-of-the-art facilities and a professional environment. Join a growing community of businesses and entrepreneurs in this strategic location connecting major cities of South India.",
		},
		kolkata: {
			title: "Kolkata's Modern Workspace for",
			highlight: "Visionaries",
			text: "Kolkata, the cultural capital of India, is witnessing a surge in startups and IT companies. Our premium coworking space in Sector V, Salt Lake provides world-class infrastructure and a collaborative ecosystem. Experience the perfect blend of tradition and innovation in the heart of Eastern India's IT corridor, where your business can thrive alongside industry leaders.",
		},
		ahmedabad: {
			title: "Ahmedabad's Strategic Space for",
			highlight: "Achievers",
			text: "Ahmedabad, Gujarat's commercial hub, is a vibrant ecosystem for manufacturing, textiles, and emerging technology sectors. Our modern coworking space in Makarba offers premium facilities and a collaborative environment for businesses of all sizes. Be part of one of India's fastest-growing cities where tradition meets innovation and entrepreneurship thrives.",
		},
		gurugram: {
			title: "Gurugram's Premium Workspace for",
			highlight: "Leaders",
			text: "Gurugram, part of the National Capital Region, is India's leading corporate and financial hub. Our coworking space in Sushant Lok provides sophisticated infrastructure and a professional atmosphere in the heart of the city's business district. Join Fortune 500 companies and dynamic startups in this thriving metropolitan center that drives India's economic growth.",
		},
	};

	const cityNameLower = cityName.toLowerCase();
	const cityInfo =
		cityDescriptions[cityNameLower] || cityDescriptions.hyderabad;
	return (
		<section
			className='relative py-16 lg:py-24 px-4 lg:px-0 overflow-hidden'
			style={{
				backgroundColor: COLORS.brandBlue,
			}}
		>
			{/* Upper Yellow Ellipse - responsive positioning */}
			<div
				style={{
					position: "absolute",
					top: "50%",
					right: "-15%",
					width: "807px",
					height: "689px",
					backgroundColor: COLORS.brandYellow,
					borderRadius: "50%",
					opacity: 0.85,
					zIndex: 0,
					border: `8px solid ${COLORS.brandBlue}`,
					transform: "translateY(-50%)",
				}}
			></div>
			{/* Inner Yellow Ellipse - responsive positioning */}
			<div
				style={{
					position: "absolute",
					top: "55%",
					right: "-10%",
					width: "792px",
					height: "551px",
					backgroundColor: COLORS.brandYellow,
					borderRadius: "50%",
					opacity: 0.9,
					zIndex: 0,
					border: `6px solid ${COLORS.brandBlue}`,
					transform: "translateY(-50%)",
				}}
			></div>

			<div className='max-w-[1280px] mx-auto relative z-10 lg:px-8'>
				{/* Main Heading */}
				<div className='mb-12'>
					<h2
						className='text-4xl lg:text-5xl font-bold'
						style={{
							color: "#FFFFFF",
							fontFamily: "Outfit, sans-serif",
							marginBottom: "2rem",
						}}
					>
						{cityInfo.title}{" "}
						<span
							style={{
								color: COLORS.brandYellow,
								fontFamily: "Otomanopee One, sans-serif",
							}}
						>
							{cityInfo.highlight}
						</span>
					</h2>
				</div>

				{/* Two Column Layout */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start'>
					{/* Left Column - Description */}
					<div
						className='p-6 lg:p-8 rounded-2xl backdrop-blur-sm max-w-xl'
						style={{
							backgroundColor: "#D9D9D94A",
							border: "1px solid rgba(255, 255, 255, 0.1)",
						}}
					>
						<p
							className='text-sm lg:text-base leading-relaxed'
							style={{
								color: "#E8F4F8",
								fontFamily: "Outfit, sans-serif",
								lineHeight: "1.7",
							}}
						>
							{cityInfo.text}
						</p>
					</div>

					{/* Right Column - Map Image */}
					<div className='relative w-full h-[350px] lg:h-[420px] rounded-2xl overflow-hidden shadow-xl max-w-2xl'>
						<img
							src={mapImage}
							alt='Hyderabad Centers Map'
							className='w-full h-full object-cover'
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Description;
