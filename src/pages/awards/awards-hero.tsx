import { awardsHeroContent } from "../../content/awards";
import awardsHeroImage from "../../assets/awards_achievements/awards-hero.png";

const AwardsHero = () => {
	return (
		<section
				className='relative w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[600px] bg-cover  aspect-[4:16] bg-center flex items-end mt-20 sm:mt-16 md:mt-20 lg:mt-24'
				style={{ backgroundImage: `url(${awardsHeroImage})` }}
			>
				<div className='absolute bottom-0 left-0 right-0 z-10 bg-black/40 py-3 sm:py-4 md:py-5 lg:py-6 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-24'>
					<h1 className="text-white text-2xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold font-sans" style={{ fontSize: "clamp(1.5rem, 5vw, 3.75rem)" }}>
						{awardsHeroContent.title}

					</h1>
				</div>
		</section>
	);
};

export default AwardsHero;
