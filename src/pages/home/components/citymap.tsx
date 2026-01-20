import React from "react";
import { useNavigate } from "react-router-dom";
import { homePageImages } from "../../../assets";
import indiaMapSvg from "../../../assets/homepage/india_map.svg";
import pinIcon from "../../../assets/homepage/pin_icon.svg";

const CityMap: React.FC = () => {
	const navigate = useNavigate();

	const cities = [
		{
			name: "Hyderabad",
			state: "HYDERABAD",
			top: "62%",
			left: "36%",
			path: "/city/hyderabad",
		},
		{
			name: "Bengaluru",
			state: "BENGALURU",
			top: "78%",
			left: "30%",
			path: "/city/bengaluru",
		},
		{
			name: "Chennai",
			state: "CHENNAI",
			top: "82%",
			left: "39%",
			path: "/city/chennai",
		},
		{
			name: "Pune",
			state: "PUNE",
			top: "61%",
			left: "20%",
			path: "/city/pune",
		},
		{
			name: "Vijayawada",
			state: "VIJAYAWADA",
			top: "68%",
			left: "44%",
			path: "/city/vijayawada",
		},
		{
			name: "Kolkata",
			state: "KOLKATA",
			top: "45%",
			left: "68%",
			path: "/city/kolkata",
		},
		{
			name: "Ahmedabad",
			state: "AHMEDABAD",
			top: "45%",
			left: "15%",
			path: "/city/ahmedabad",
		},
		{
			name: "Gurugram",
			state: "GURUGRAM",
			top: "27%",
			left: "30%",
			path: "/city/gurugram",
		},
	];

	const handleCityClick = (path: string) => {
		navigate(path);
		window.scrollTo(0, 0);
	};

	return (
		<section className='relative w-full min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-[#00275c] overflow-visible'>
			{/* Decorative Circles */}
			<div
				className='absolute -top-8 right-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full '
				style={{ backgroundColor: "#FFDE00" }}
			/>
			<div
				className='absolute -bottom-8 left-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full'
				style={{ backgroundColor: "#FFDE00" }}
			/>

			{/* Arrow Decorations */}
			<div className='absolute top-8 left-8'>
				<div className='relative w-16 sm:w-20 md:w-24'>
					<img
						src={homePageImages.citymapReversearrow}
						alt='Arrow'
						className='w-full'
					/>
					{/* <img 
        src={arrowPointer} 
        alt="" 
        className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 sm:w-5 md:w-6"
        /> */}
				</div>
			</div>
			<div className='absolute bottom-8 right-8'>
				<div className='relative w-16 sm:w-20 md:w-24'>
					<img
						src={homePageImages.citymapYellowarrow}
						alt='Arrow'
						className='w-full'
					/>
					{/* <img 
        src={arrowPointer} 
        alt="" 
        className="absolute -right-2 top-10 -translate-y-1/2 w-4 sm:w-5 md:w-6"
        /> */}
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12'>
				{/* Left Side - India Map */}
				<div className='flex-1 flex justify-center items-center'>
					<div className='relative inline-block'>
						<img
							src={indiaMapSvg}
							alt='India Map'
							className='w-full max-w-2xl'
							style={{ display: "block" }}
						/>

						{/* State Markers with Pin Icons */}
						{cities.map((city) => (
							<div
								key={city.name}
								className='absolute flex flex-col items-center cursor-pointer transition-transform hover:scale-110'
								style={{
									top: city.top,
									left: city.left,
									transform: "translate(-50%, -50%)",
								}}
								onClick={() => handleCityClick(city.path)}
							>
								{/* State Label */}
								<div className='px-2 py-1 rounded-xl text-white text-xs font-semibold whitespace-nowrap bg-slate-600'>
									{city.state}
								</div>

								{/* Pin Icon */}
								<img
									src={pinIcon}
									alt='Pin'
									className='w-6 h-6 -mt-1'
								/>
							</div>
						))}
					</div>
				</div>

				{/* Right Side - Content */}
				<div
					className='flex-1 text-white'
					style={{ fontFamily: "Outfit, sans-serif" }}
				>
					<h2 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-6'>
						Your city.
						<br />
						Your workspace.
						<br />
						Your{" "}
						<span
							style={{
								fontFamily: "Otomanopee One, sans-serif",
								color: "#FFDE00",
							}}
						>
							iSprout
						</span>{" "}
						;
					</h2>

					<p className='text-base sm:text-lg md:text-xl mb-8 max-w-xl'>
						iSprout provides office spaces in various key locations
						within major cities. Find the perfect and convenient
						workspace situated in your preferred area.
					</p>

					{/* Stats */}
					<div className='flex gap-8 sm:gap-12 md:gap-16'>
						<div className='text-center'>
							<p className='text-3xl sm:text-4xl md:text-5xl font-bold mb-2'>
								8
							</p>
							<p className='text-sm sm:text-base md:text-lg'>
								Cities
							</p>
						</div>
						<div className='text-center'>
							<p className='text-3xl sm:text-4xl md:text-5xl font-bold mb-2'>
								28
							</p>
							<p className='text-sm sm:text-base md:text-lg'>
								Centers
							</p>
						</div>
						<div className='text-center'>
							<p className='text-3xl sm:text-4xl md:text-5xl font-bold mb-2'>
								39k+
							</p>
							<p className='text-sm sm:text-base md:text-lg'>
								Workstations
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CityMap;
