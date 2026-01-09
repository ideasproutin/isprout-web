import React from "react";
import { Link, useLocation } from "react-router-dom";
import profileIcon from "../../assets/navbar/profileicon.png";
import search from "../../assets/navbar/search.png";

const Navbar: React.FC = () => {
	const location = useLocation();

	const isActive = (path: string) => location.pathname.startsWith(path);

	return (
		<nav
			className='relative w-full h-11 sm:h-12 md:h-14 mb-0 rounded-md overflow-x-auto z-50'
			style={{ backgroundColor: "#00275c" }}
		>
			<div className='relative w-full h-full flex items-center justify-end px-2 sm:px-4 md:px-6 min-w-max'>
				{/* Navigation links */}
				<div
					className='flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 mr-1 sm:mr-4 lg:mr-22'
					style={{ fontFamily: "Outfit, sans-serif" }}
				>
					<Link
						to='/blogs'
						className={`text-xs sm:text-sm lg:text-base font-medium text-white! hover:text-gray-200 whitespace-nowrap ${
							isActive("/blogs") ? "border-b-2 border-white" : ""
						}`}
					>
						Blogs
					</Link>
					<Link
						to='/awards'
						className={`text-xs sm:text-sm lg:text-base font-medium text-white! hover:text-gray-200 whitespace-nowrap ${
							isActive("/awards") ? "border-b-2 border-white" : ""
						}`}
					>
						Awards
					</Link>
					<Link
						to='/spotlight'
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
						className={`text-xs sm:text-sm lg:text-base font-medium text-white! hover:text-gray-200 whitespace-nowrap ${
							isActive("/careers")
								? "border-b-2 border-white"
								: ""
						}`}
					>
						Careers
					</Link>
				</div>

				{/* Right side icons */}
				<div className='flex items-center gap-2 sm:gap-4 mr-3 sm:mr-4'>
					<img
						src={search}
						alt='Search'
						className='cursor-pointer w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 mr-2'
					/>
					<img
						src={profileIcon}
						alt='Profile'
						className='cursor-pointer w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8'
					/>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
