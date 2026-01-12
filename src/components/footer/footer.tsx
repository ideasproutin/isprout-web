
import logo from "../../assets/footer/isprout_logo.png";
import instagram from "../../assets/footer/Instagram.png";
import facebook from "../../assets/footer/Facebook.png";
import twitter from "../../assets/footer/Twitter.png";
import youtube from "../../assets/footer/Youtube.png";
import linkedin from "../../assets/footer/Linkedin.png";
import { COLORS } from "../../helpers/constants/Colors";

const Footer = () => {
	return (
		<footer className='w-full bg-[#c4c4c4] font-tertiary'>
			{/* Main Footer Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8'>
				{/* Top Section - Logo and Get In Touch */}
				<div className='flex flex-col md:flex-row items-center justify-between gap-6 mb-6 sm:mb-8'>
					{/* Logo */}
					<div>
						<img
							src={logo}
							alt='iSprout'
							className='h-12 sm:h-14 md:h-16 w-auto'
						/>
					</div>

					{/* Ready to get started + Button */}
					<div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-6'>
						<p className='text-lg sm:text-xl md:text-2xl font-semibold' style={{ color: COLORS.textBlack }}>
							Ready to get started?
						</p>
						<button
							style={{ backgroundColor: "#00275c" }}
							className='px-8 py-3 sm:py-4 text-white font-semibold transition-colors text-base sm:text-lg'
						>
							Get In Touch
						</button>
					</div>
				</div>

				{/* Links Grid */}
				<div className='grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6'>
					{/* Company Column */}
					<div>
						<h3 className='font-bold text-base sm:text-lg mb-4 text-black'>
							COMPANY
						</h3>
						<ul className='space-y-2 sm:space-y-3'>
							<li>
								<a
									href='/about'
									className='text-sm sm:text-base text-gray-700 transition-colors'
									onMouseEnter={(e) => e.currentTarget.style.color = COLORS.textBlack}
									onMouseLeave={(e) => e.currentTarget.style.color = ''}
								>
									About iSprout
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-sm sm:text-base text-gray-700 transition-colors'
									onMouseEnter={(e) => e.currentTarget.style.color = COLORS.textBlack}
									onMouseLeave={(e) => e.currentTarget.style.color = ''}
								>
									Our Teams
								</a>
							</li>
							<li>
								<a
									href='/careers'
									className='text-sm sm:text-base text-gray-700 transition-colors'
									onMouseEnter={(e) => e.currentTarget.style.color = COLORS.textBlack}
									onMouseLeave={(e) => e.currentTarget.style.color = ''}
								>
									Career
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-sm sm:text-base text-gray-700 transition-colors'
									onMouseEnter={(e) => e.currentTarget.style.color = COLORS.textBlack}
									onMouseLeave={(e) => e.currentTarget.style.color = ''}
								>
									Contact Us
								</a>
							</li>
							<li>
								<a
									href='/managed'
									className='text-sm sm:text-base text-gray-700 transition-colors'
									onMouseEnter={(e) => e.currentTarget.style.color = COLORS.textBlack}
									onMouseLeave={(e) => e.currentTarget.style.color = ''}
								>
									Managed Office
								</a>
							</li>
							<li>
								<a
									href='/virtual-office'
									className='text-sm sm:text-base text-gray-700 transition-colors'
									onMouseEnter={(e) => e.currentTarget.style.color = COLORS.textBlack}
									onMouseLeave={(e) => e.currentTarget.style.color = ''}
								>
									Virtual Office
								</a>
							</li>
							<li>
								<a
									href='/meeting-rooms'
									className='text-sm sm:text-base text-gray-700 transition-colors'
									onMouseEnter={(e) => e.currentTarget.style.color = COLORS.textBlack}
									onMouseLeave={(e) => e.currentTarget.style.color = ''}
								>
									Meeting Rooms
								</a>
							</li>
						</ul>
					</div>

					{/* Locations Column */}
					<div>
						<h3 className='font-bold text-base sm:text-lg mb-4' style={{ color: COLORS.textBlack }}>
							LOCATIONS
						</h3>
						<ul className='space-y-2 sm:space-y-3'>
							<li>
								<a
									href='/city/hyderabad'
									className='text-sm sm:text-base text-gray-700 transition-colors'
									onMouseEnter={(e) => e.currentTarget.style.color = COLORS.textBlack}
									onMouseLeave={(e) => e.currentTarget.style.color = ''}
								>
									Hyderabad
								</a>
							</li>
							<li>
								<a
									href='/city/bengaluru'
									className='text-sm sm:text-base text-gray-700 transition-colors'
									onMouseEnter={(e) => e.currentTarget.style.color = COLORS.textBlack}
									onMouseLeave={(e) => e.currentTarget.style.color = ''}
								>
									Bangalore
								</a>
							</li>
							<li>
								<a
									href='/city/pune'
									className='text-sm sm:text-base text-gray-700 transition-colors'
									onMouseEnter={(e) => e.currentTarget.style.color = COLORS.textBlack}
									onMouseLeave={(e) => e.currentTarget.style.color = ''}
								>
									Pune
								</a>
							</li>
							<li>
								<a
									href='/city/chennai'
									className='text-sm sm:text-base text-gray-700 transition-colors'
									onMouseEnter={(e) => e.currentTarget.style.color = COLORS.textBlack}
									onMouseLeave={(e) => e.currentTarget.style.color = ''}
								>
									Chennai
								</a>
							</li>
							<li>
								<a
									href='/city/vijayawada'
									className='text-sm sm:text-base text-gray-700 transition-colors'
									onMouseEnter={(e) => e.currentTarget.style.color = COLORS.textBlack}
									onMouseLeave={(e) => e.currentTarget.style.color = ''}
								>
									Vijayawada
								</a>
							</li>
							<li>
								<a
									href='/city/gurugram'
									className='text-sm sm:text-base text-gray-700 transition-colors'
									onMouseEnter={(e) => e.currentTarget.style.color = COLORS.textBlack}
									onMouseLeave={(e) => e.currentTarget.style.color = ''}
								>
									Gurugram
								</a>
							</li>
							<li>
								<a
									href='/city/ahmedabad'
									className='text-sm sm:text-base text-gray-700 transition-colors'
									onMouseEnter={(e) => e.currentTarget.style.color = COLORS.textBlack}
									onMouseLeave={(e) => e.currentTarget.style.color = ''}
								>
									Ahmedabad
								</a>
							</li>
							<li>
								<a
									href='/city/kolkata'
									className='text-sm sm:text-base text-gray-700 transition-colors'
									onMouseEnter={(e) => e.currentTarget.style.color = COLORS.textBlack}
									onMouseLeave={(e) => e.currentTarget.style.color = ''}
								>
									Kolkata
								</a>
							</li>
						</ul>
					</div>

					{/* Resources Column */}
					<div>
						<h3 className='font-bold text-base sm:text-lg mb-4' style={{ color: COLORS.textBlack }}>
							RESOURCES
						</h3>
						<ul className='space-y-2 sm:space-y-3'>
							<li>
								<a
									href='/blogs'
									className='text-sm sm:text-base text-gray-700 transition-colors'
									onMouseEnter={(e) => e.currentTarget.style.color = COLORS.textBlack}
									onMouseLeave={(e) => e.currentTarget.style.color = ''}
								>
									Blogs
								</a>
							</li>
							<li>
								<a
									href='/testimonials'
									className='text-sm sm:text-base text-gray-700 transition-colors'
									onMouseEnter={(e) => e.currentTarget.style.color = COLORS.textBlack}
									onMouseLeave={(e) => e.currentTarget.style.color = ''}
								>
									Testimonials
								</a>
							</li>
							<li>
								<a
									href='/spotlight'
									className='text-sm sm:text-base text-gray-700 transition-colors'
									onMouseEnter={(e) => e.currentTarget.style.color = COLORS.textBlack}
									onMouseLeave={(e) => e.currentTarget.style.color = ''}
								>
									Spotlight
								</a>
							</li>
							<li>
								<a
									href='/news'
									className='text-sm sm:text-base text-gray-700 transition-colors'
									onMouseEnter={(e) => e.currentTarget.style.color = COLORS.textBlack}
									onMouseLeave={(e) => e.currentTarget.style.color = ''}
								>
									News
								</a>
							</li>
							<li>
								<a
									href='/awards'
									className='text-sm sm:text-base text-gray-700 transition-colors'
									onMouseEnter={(e) => e.currentTarget.style.color = COLORS.textBlack}
									onMouseLeave={(e) => e.currentTarget.style.color = ''}
								>
									Awards
								</a>
							</li>
							<li>
								<a
									href='/faq'
									className='text-sm sm:text-base text-gray-700 transition-colors'
									onMouseEnter={(e) => e.currentTarget.style.color = COLORS.textBlack}
									onMouseLeave={(e) => e.currentTarget.style.color = ''}
								>
									FAQs
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-sm sm:text-base text-gray-700 transition-colors'
									onMouseEnter={(e) => e.currentTarget.style.color = COLORS.textBlack}
									onMouseLeave={(e) => e.currentTarget.style.color = ''}
								>
									Terms and conditions
								</a>
							</li>
						</ul>
					</div>

					{/* Quick Contact Column */}
					<div>
						<h3 className='font-bold text-base sm:text-lg mb-4 text-black'>
							QUICK CONTACT
						</h3>

						{/* Social Media Icons */}
						<div className='flex gap-2 sm:gap-3 mb-4'>
							<a
							href='https://www.instagram.com/isproutcoworkingspace/'
							target='_blank'
							rel='noopener noreferrer'
							className='hover:opacity-70 transition-opacity'
						>
							<img
								src={instagram}
								alt='Instagram'
								className='w-7 h-7 sm:w-8 sm:h-8'
							/>
						</a>
						<a
							href='https://www.facebook.com/isprout'
							target='_blank'
							rel='noopener noreferrer'
							className='hover:opacity-70 transition-opacity'
						>
							<img
								src={facebook}
								alt='Facebook'
								className='w-8 h-8 sm:w-10 sm:h-10'
							/>
						</a>
						<a
							href='https://x.com/isproutbc'
							target='_blank'
							rel='noopener noreferrer'
							className='hover:opacity-70 transition-opacity'
						>
							<img
								src={twitter}
								alt='Twitter'
								className='w-8 h-8 sm:w-10 sm:h-10'
							/>
						</a>
						<a
							href='https://www.youtube.com/@isproutbusinesscentre236'
							target='_blank'
							rel='noopener noreferrer'
							className='hover:opacity-70 transition-opacity'
						>
							<img
								src={youtube}
								alt='YouTube'
								className='w-8 h-8 sm:w-10 sm:h-10'
							/>
						</a>
						<a
							href='https://in.linkedin.com/company/isprout'
							target='_blank'
							rel='noopener noreferrer'
							className='hover:opacity-70 transition-opacity'
						>
							<img
								src={linkedin}
								alt='LinkedIn'
								className='w-8 h-8 sm:w-10 sm:h-10'
							/>
						</a>
					</div>

					{/* Phone Button */}
					<button
						style={{ backgroundColor: "#00275c" }}
						className='px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-full transition-colors text-sm sm:text-base'
					>
						+91 987654321
					</button>
				</div>
			</div>
		</div>

		{/* Bottom Black Bar */}
		<div className='w-full bg-black h-6 sm:h-8'></div>
	</footer>
	);
};

export default Footer;
