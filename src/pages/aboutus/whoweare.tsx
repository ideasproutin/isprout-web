import { Users, ThumbsUp, HeartHandshake, TrendingUp } from "lucide-react";
import { COLORS } from "../../helpers/constants/Colors";
import aboutUsData from "../../content/aboutus.json";
import { useAboutUs } from "../../hooks/useAboutUs";

const iconMap = {
	Users,
	ThumbsUp,
	HeartHandshake,
	TrendingUp,
};

type IconName = keyof typeof iconMap;

interface WhoWeAreCard {
	title: string;
	description: string;
	icon: IconName;
}

const WhoWeAre = () => {
	const { data: aboutUsApiData } = useAboutUs();
	const cards =
		(aboutUsApiData?.whoWeAre as WhoWeAreCard[]) ||
		(aboutUsData.whoWeAre as WhoWeAreCard[]);
	return (
		<section id='who-we-are' className='w-full py-6 sm:py-10 lg:py-12'>
			{/* ✅ SAME CONTAINER AS INTRO SECTION */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6'>
				{/* Arrow */}
				<div></div>
				{cards.map((card) => {
					const Icon = iconMap[card.icon as IconName] || Users;
					return (
						<div
							key={card.title}
							className='rounded-2xl p-4 sm:p-6 shadow-lg'
							style={{ backgroundColor: "#eaf4fb" }}
						>
							<div className='flex items-start justify-between gap-3'>
								<h2
									className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold'
									style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
								>
									{card.title}
								</h2>
								<Icon
									className='w-10 h-10 sm:w-12 sm:h-12'
									style={{ color: COLORS.brandBlue }}
								/>
							</div>
							<p
								className='mt-3 text-sm sm:text-base md:text-lg lg:text-xl'
								style={{
									fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
									color: COLORS.brandBlue,
								}}
							>
								{card.description}
							</p>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default WhoWeAre;
