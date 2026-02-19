import { useState, useEffect, useRef } from "react";
import logo from "../../assets/homepage/isprout_logo.png";

const LineDivider = () => {
	const [logoPosition, setLogoPosition] = useState(0);
	const dividerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleScroll = () => {
			if (dividerRef.current) {
				const rect = dividerRef.current.getBoundingClientRect();
				const viewportHeight = window.innerHeight;

				// Calculate when the divider is in view
				if (rect.top < viewportHeight && rect.bottom > 0) {
					// Calculate scroll progress - animation completes when element reaches middle of viewport
					const scrollProgress = Math.max(
						0,
						Math.min(
							1,
							(viewportHeight - rect.top) /
								(viewportHeight * 0.7),
						),
					);
					setLogoPosition(scrollProgress * 100);
				} else if (rect.bottom <= 0) {
					// Keep logo at left end after section scrolls past
					setLogoPosition(100);
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll(); // Initial call

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div ref={dividerRef} className='w-full py-8 sm:py-12 bg-white'>
			<div className='w-full relative h-1'>
				<div
					className='absolute h-1 bg-black transition-all duration-100 ease-out hidden sm:block'
					style={{
						left: `calc(${100 - logoPosition}% + 80px)`,
						right: 0,
					}}
				></div>
				<div
					className='absolute h-1 bg-black transition-all duration-100 ease-out block sm:hidden'
					style={{
						left: `calc(${100 - logoPosition}% + 70px)`,
						right: 0,
					}}
				></div>
				<div
					className='absolute top-1/2 -translate-y-1/2 w-[70px] h-[70px] sm:w-20 sm:h-20 transition-all duration-100 ease-out'
					style={{
						left: `${100 - logoPosition}%`,
					}}
				>
					<img
						src={logo}
						alt='iSprout logo'
						className='w-full h-full object-contain'
					/>
				</div>
			</div>
		</div>
	);
};

export default LineDivider;
