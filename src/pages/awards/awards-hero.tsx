import { awardsHeroContent } from "../../content/awards";
import awardsHeroImage from "../../assets/awards_achievements/awards-hero.png";

const AwardsHero = () => {
	return (
		<section
			className='relative w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[600px] bg-cover bg-center flex items-end'
			style={{ backgroundImage: `url(${awardsHeroImage})` }}
		>
			<div className='absolute bottom-0 left-0 right-0 z-10 bg-black/20 py-3 sm:py-4 md:py-5 lg:py-6 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-24'>
				<h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold font-['Inter',sans-serif] tracking-tight leading-tight">
					{awardsHeroContent.title}
				</h1>
			</div>
		</section>
	);
};

export default AwardsHero;
