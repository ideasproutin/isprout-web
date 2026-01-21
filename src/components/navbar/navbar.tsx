import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import profileIcon from "../../assets/navbar/profileicon.png";
import search from "../../assets/navbar/search.png";

const Navbar: React.FC = () => {
	const location = useLocation();
	
	// Animated underline state
	const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0, opacity: 0 });
	const navItemsRef = useRef<{ [key: string]: HTMLElement | null }>({});

	const isActive = (path: string) => location.pathname.startsWith(path);
	
	// Handler for animated underline
	const handleNavItemHover = (key: string | null) => {
		if (key && navItemsRef.current[key]) {
			const element = navItemsRef.current[key];
			if (element) {
				setUnderlineStyle({
					left: element.offsetLeft,
					width: element.offsetWidth,
					opacity: 1
				});
			}
		} else {
			setUnderlineStyle(prev => ({ ...prev, opacity: 0 }));
		}
	};

	return (
		<nav
			className='sticky top-0 w-full h-10 sm:h-10 md:h-10 mb-0 overflow-x-auto z-[100]'
			style={{ backgroundColor: "#00275c" }}
		>
			<div className='relative w-full h-full flex items-center justify-end px-2 sm:px-4 md:px-6 min-w-max'>
				{/* Navigation links */}
				<div
					className='flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 mr-1 sm:mr-4 lg:mr-22 relative'
					style={{ fontFamily: "Outfit, sans-serif" }}
				>
					<Link
						to='/blogs'
						ref={el => { navItemsRef.current['blogs'] = el; }}
						onMouseEnter={() => handleNavItemHover('blogs')}
						onMouseLeave={() => handleNavItemHover(null)}
						className={`text-xs sm:text-sm lg:text-base font-medium text-white! hover:text-gray-200 whitespace-nowrap ${
							isActive("/blogs") ? "border-b-2 border-white" : ""
						}`}
					>
						Blogs
					</Link>
					<Link
						to='/awards'
						ref={el => { navItemsRef.current['awards'] = el; }}
						onMouseEnter={() => handleNavItemHover('awards')}
						onMouseLeave={() => handleNavItemHover(null)}
						className={`text-xs sm:text-sm lg:text-base font-medium text-white! hover:text-gray-200 whitespace-nowrap ${
							isActive("/awards") ? "border-b-2 border-white" : ""
						}`}
					>
						Awards
					</Link>
					<Link
						to='/spotlight'
						ref={el => { navItemsRef.current['spotlight'] = el; }}
						onMouseEnter={() => handleNavItemHover('spotlight')}
						onMouseLeave={() => handleNavItemHover(null)}
						className={`text-xs sm:text-sm lg:text-base font-medium text-white! hover:text-gray-200 whitespace-nowrap ${
							isActive("/spotlight")
								? "border-b-2 border-white"
								: ""
						}`}
					>
						Spotlight
					</Link>
					<Link
						to='/careers'
						ref={el => { navItemsRef.current['careers'] = el; }}
						onMouseEnter={() => handleNavItemHover('careers')}
						onMouseLeave={() => handleNavItemHover(null)}
						className={`text-xs sm:text-sm lg:text-base font-medium text-white! hover:text-gray-200 whitespace-nowrap ${
							isActive("/careers")
								? "border-b-2 border-white"
								: ""
						}`}
					>
						Careers
					</Link>
					
					{/* Animated underline */}
					<div
						className='absolute bottom-0 h-0.5 transition-all duration-300 ease-out'
						style={{
							left: `${underlineStyle.left}px`,
							width: `${underlineStyle.width}px`,
							opacity: underlineStyle.opacity,
							backgroundColor: '#ffffff'
						}}
					/>
				</div>

				{/* Right side icons */}
				<div className='flex items-center gap-2 sm:gap-4 mr-3 sm:mr-4'>
					<img
						src={search}
						alt='Search'
						className='cursor-pointer w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 mr-2'
					/>
					<img
						src={profileIcon}
						alt='Profile'
						className='cursor-pointer w-5 h-5 sm:w-6 sm:h-6 md:w-5 md:h-5 lg:w-6 lg:h-6'
					/>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
