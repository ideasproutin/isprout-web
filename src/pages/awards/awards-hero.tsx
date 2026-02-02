import { awardsHeroContent } from "../../content/awards";
import awardsHeroImage from "../../assets/awards_achievements/awards-hero.png";

const AwardsHero = () => {
	return (
		<section
			className='relative w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-cover bg-center flex items-end'
			style={{ backgroundImage: `url(${awardsHeroImage})` }}
		>
			<div className='absolute bottom-0 left-0 right-0 z-10 bg-black/20 py-4 md:py-5 lg:py-6 px-8 md:px-16 lg:px-24'>
				<h1 className="text-white text-[48px] md:text-[64px] lg:text-[80px] xl:text-[96px] font-bold font-['Inter',sans-serif] tracking-tight leading-none">
					{awardsHeroContent.title}
				</h1>
			</div>
		</section>
	);
};

export default AwardsHero;
