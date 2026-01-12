import React from "react";
import { Link, useLocation } from "react-router-dom";
import profileIcon from "../../assets/navbar/profileicon.png";
import search from "../../assets/navbar/search.png";

const Navbar: React.FC = () => {
	const location = useLocation();

	const isActive = (path: string) => location.pathname.startsWith(path);

	return (
		<nav
			className='relative w-full h-10 sm:h-10 md:h-10 mb-0 overflow-x-auto z-50'
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
