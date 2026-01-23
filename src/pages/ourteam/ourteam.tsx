import OurTeamHero from "./ourteam-hero";
import AboutTeam from "./about-team";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import leaderImage from "../../assets/careers/sundari patibandla.png";
import lifeImage1 from "../../assets/lifeatisprout/lifeatisprout1.jpg";
import lifeImage2 from "../../assets/lifeatisprout/lifeatisprout2.jpg";
import lifeImage3 from "../../assets/lifeatisprout/lifeatisprout3.jpg";
import lifeImage4 from "../../assets/lifeatisprout/lifeatisprout4.jpg";
import lifeImage5 from "../../assets/lifeatisprout/lifeatisprout5.jpg";
import lifeImage6 from "../../assets/lifeatisprout/lifeatisprout6.png";
import lifeImage7 from "../../assets/lifeatisprout/lifeatisprout7.png";
import lifeImage8 from "../../assets/lifeatisprout/lifeatisprout8.jpg";
import { useState } from "react";
import { COLORS } from "../../helpers/constants/Colors";

const OurTeam = () => {
	return (
		<div className='w-full'>
			<OurTeamHero />
			<AboutTeam />
			<OurTeamExtras />
			<Footer />
			<ScrollToTop />
		</div>
	);
};

const OurTeamExtras = () => {
	const [lifeImagesPage, setLifeImagesPage] = useState(0);
	const lifeImages = [
		lifeImage1,
		lifeImage2,
		lifeImage3,
		lifeImage4,
		lifeImage5,
		lifeImage6,
		lifeImage7,
		lifeImage8,
	];
	const currentLifeImages = lifeImages.slice(
		lifeImagesPage * 4,
		(lifeImagesPage + 1) * 4,
	);
	const toggleLifeImagesPage = () =>
		setLifeImagesPage(lifeImagesPage === 0 ? 1 : 0);

<<<<<<< HEAD
  return (
    <div className="w-full flex flex-col items-center">
      {/* Message By Leader Section */}
      <div className="mb-16 w-full max-w-3xl flex flex-col items-center">
        <h3
          className="text-4xl mb-8 font-bold text-center"
          style={{ color: COLORS.textBlack, fontFamily: 'Outfit, sans-serif' }}
        >
          Message By{' '}
          <span
            className="text-[#FFDE00]"
            style={{ fontFamily: "'Otomanopee One', sans-serif" }}
          >
            Leader
          </span>
        </h3>
        <div className="flex flex-col md:flex-row gap-8 items-start relative w-full justify-center">
          {/* Leader Image */}
          <div className="shrink-0 rounded-xl shadow-[5px_5px_4px_0px_rgba(0,0,0,0.25)]">
            <img
              src={leaderImage}
              alt="Leader"
              className="w-48 h-48 object-cover rounded-xl"
            />
          </div>
          {/* Decorative Quote Mark */}
          {/* <div className="absolute left-[180px] -top-2.5 w-[69px] h-[60px] opacity-50 hidden md:block">
            <svg viewBox="0 0 69 60" fill="none" className="w-full h-full">
              <path d="M0 60V30Q0 10 15 5Q10 15 15 25H30V60H0ZM39 60V30Q39 10 54 5Q49 15 54 25H69V60H39Z" fill="black" fillOpacity="0.5" />
            </svg>
          </div> */}
          {/* Message Text */}
          <div className="flex-1 pt-8">
            <p
              className="text-gray-800 text-xl leading-relaxed"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              We are team iSprout. We're a bunch of dreamers and doers who believe that workspaces should be anything but boring. We're on a mission to create offices that people actually look forward to coming to every day.
            </p>
          </div>
        </div>
      </div>
=======
	return (
		<div className='w-full flex flex-col items-center'>
			{/* Message By Leader Section */}
			<div className='mb-16 w-full max-w-3xl flex flex-col items-center'>
				<h3
					className='text-4xl mb-8 font-bold text-center'
					style={{
						color: COLORS.textBlack,
						fontFamily: "Outfit, sans-serif",
					}}
				>
					Message By{" "}
					<span
						className='text-[#FFDE00]'
						style={{ fontFamily: "'Otomanopee One', sans-serif" }}
					>
						Leader
					</span>
				</h3>
				<div className='flex flex-col md:flex-row gap-8 items-start relative w-full justify-center'>
					{/* Leader Image */}
					<div className='shrink-0 rounded-xl shadow-[5px_5px_4px_0px_rgba(0,0,0,0.25)]'>
						<img
							src={leaderImage}
							alt='Leader'
							className='w-48 h-48 object-cover rounded-xl'
						/>
					</div>
					{/* Decorative Quote Mark */}
					<div className='absolute left-[180px] -top-2.5 w-[69px] h-[60px] opacity-50 hidden md:block'>
						<svg
							viewBox='0 0 69 60'
							fill='none'
							className='w-full h-full'
						>
							<path
								d='M0 60V30Q0 10 15 5Q10 15 15 25H30V60H0ZM39 60V30Q39 10 54 5Q49 15 54 25H69V60H39Z'
								fill='black'
								fillOpacity='0.5'
							/>
						</svg>
					</div>
					{/* Message Text */}
					<div className='flex-1 pt-8'>
						<p
							className='text-gray-800 text-xl leading-relaxed'
							style={{ fontFamily: "Outfit, sans-serif" }}
						>
							We are team iSprout. We're a bunch of dreamers and
							doers who believe that workspaces should be anything
							but boring. We're on a mission to create offices
							that people actually look forward to coming to every
							day.
						</p>
					</div>
				</div>
			</div>
>>>>>>> 5e3ba3573a78b786413861bcd3bb980e2ae67dbb

			{/* Life At iSprout Section */}
			<div className='mb-16 w-full max-w-4xl flex flex-col items-center relative'>
				<h3
					className='text-4xl mb-12 font-bold text-center'
					style={{
						color: COLORS.textBlack,
						fontFamily: "Outfit, sans-serif",
					}}
				>
					Life At{" "}
					<span
						className='text-[#FFDE00]'
						style={{ fontFamily: "'Otomanopee One', sans-serif" }}
					>
						iSprout
					</span>
				</h3>
				{/* Image Grid with pagination */}
				<div className='relative pr-0 md:pr-16 w-full flex flex-col items-center'>
					<div className='overflow-hidden w-full'>
						<div
							className='grid grid-cols-2 gap-6 transition-transform duration-500 ease-in-out'
							key={lifeImagesPage}
						>
							{currentLifeImages.map((img, index) => (
								<div
									key={`${lifeImagesPage}-${index}`}
									className={`rounded-xl shadow-[3px_-7px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden ${
										index === 0 || index === 3
											? "h-[199px]"
											: index === 1 || index === 2
												? "h-48"
												: "h-[199px]"
									}`}
									style={{
										animation: "slideIn 0.5s ease-in-out",
									}}
								>
									<img
										src={img}
										alt={`Life at iSprout ${index + 1}`}
										className='w-full h-full object-cover'
									/>
								</div>
							))}
						</div>
					</div>
					{/* Arrow Navigation on Teal Circle */}
					<button
						onClick={toggleLifeImagesPage}
						className='absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#00275c] rounded-full flex items-center justify-center hover:bg-[#163542] transition-colors shadow-lg'
					>
						<svg
							width='20'
							height='20'
							viewBox='0 0 24 24'
							fill='none'
							stroke='#FFDE00'
							strokeWidth='3'
							strokeLinecap='round'
							strokeLinejoin='round'
							className={`transition-transform duration-300 ${lifeImagesPage === 1 ? "rotate-180" : ""}`}
						>
							<polyline points='9 18 15 12 9 6'></polyline>
						</svg>
					</button>
				</div>
			</div>
			{/* CSS for slide-in animation */}
			<style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
		</div>
	);
};
export default OurTeam;
