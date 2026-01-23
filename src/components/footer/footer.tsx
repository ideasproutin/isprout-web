import logo from "../../assets/footer/isprout_logo.png";
import { COLORS } from "../../helpers/constants/Colors";

const Footer = () => {
	return (
		<footer className='w-full bg-[#c4c4c4]'>
			{/* MAIN FOOTER */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10'>
				{/* TOP BAR */}
				<div className='flex flex-col md:flex-row items-center justify-between gap-6 mb-8'>
					{/* Logo */}
					<img
						src={logo}
						alt='iSprout'
						className='h-12 sm:h-14 md:h-16 w-auto'
					/>

					{/* CTA */}
					<div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-6'>
						<p
							className='text-lg sm:text-xl md:text-2xl font-semibold text-center sm:text-left'
							style={{ color: COLORS.textBlack }}
						>
							Ready to get started?
						</p>

						<button
							className='px-8 py-3 sm:py-4 text-white font-semibold text-base sm:text-lg transition hover:opacity-90'
							style={{ backgroundColor: "#00275c" }}
						>
							Get In Touch
						</button>
					</div>
				</div>

				{/* LINKS GRID */}
				<div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8'>
					{/* COMPANY */}
					<div>
						<h3 className='font-bold text-base sm:text-lg mb-4 text-black'>
							COMPANY
						</h3>
						<ul className='space-y-2 sm:space-y-3'>
							{[
								{ label: "About iSprout", link: "/about" },
								{ label: "Our Team", link: "/ourteam" },
								{ label: "Career", link: "/careers" },
								{ label: "Contact Us", link: "/contactus" },
								{ label: "Managed Office", link: "/managed" },
								{
									label: "Virtual Office",
									link: "/virtual-office",
								},
								{
									label: "Meeting Rooms",
									link: "/meeting-rooms",
								},
							].map((item, i) => (
								<li key={i}>
									<a
										href={item.link}
										className='text-sm sm:text-base text-gray-700 hover:text-black transition'
									>
										{item.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* LOCATIONS */}
					<div>
						<h3 className='font-bold text-base sm:text-lg mb-4 text-black'>
							LOCATIONS
						</h3>
						<ul className='space-y-2 sm:space-y-3'>
							{[
								"Hyderabad",
								"Bangalore",
								"Pune",
								"Chennai",
								"Vijayawada",
								"Gurugram",
								"Ahmedabad",
								"Kolkata",
							].map((city, i) => (
								<li key={i}>
									<a
										href={`/city/${city.toLowerCase()}`}
										className='text-sm sm:text-base text-gray-700 hover:text-black transition'
									>
										{city}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* RESOURCES */}
					<div>
						<h3 className='font-bold text-base sm:text-lg mb-4 text-black'>
							RESOURCES
						</h3>
						<ul className='space-y-2 sm:space-y-3'>
							{[
								{ label: "Blogs", link: "/blogs" },
								{
									label: "Testimonials",
									link: "/testimonials",
								},
								{ label: "Spotlight", link: "/spotlight" },
								{ label: "News", link: "/news" },
								{ label: "Awards", link: "/awards" },
								{ label: "FAQs", link: "/faq" },
								{ label: "Terms and conditions", link: "#" },
							].map((item, i) => (
								<li key={i}>
									<a
										href={item.link}
										className='text-sm sm:text-base text-gray-700 hover:text-black transition'
									>
										{item.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* QUICK CONTACT */}
					<div>
						<h3 className='font-bold text-base sm:text-lg mb-4 text-black'>
							QUICK CONTACT
						</h3>

						{/* SOCIAL ICONS */}
						<div className='flex gap-4 mb-4'>
							{/* LinkedIn */}
							<a
								href='https://in.linkedin.com/company/isprout'
								target='_blank'
								rel='noopener noreferrer'
								className='hover:opacity-70 transition'
							>
								<svg
									className='w-8 h-8 sm:w-10 sm:h-10'
									viewBox='0 0 24 24'
									fill='#00275c'
								>
									<path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
								</svg>
							</a>

							{/* Instagram */}
							<a
								href='https://www.instagram.com/isproutcoworkingspace/'
								target='_blank'
								rel='noopener noreferrer'
								className='hover:opacity-70 transition'
							>
								<svg
									className='w-8 h-8 sm:w-10 sm:h-10'
									viewBox='0 0 24 24'
									fill='#00275c'
								>
									<path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
								</svg>
							</a>

							{/* X (Twitter) */}
							<a
								href='https://x.com/isproutbc'
								target='_blank'
								rel='noopener noreferrer'
								className='hover:opacity-70 transition'
							>
								<svg
									className='w-8 h-8 sm:w-10 sm:h-10'
									viewBox='0 0 24 24'
									fill='#00275c'
								>
									<path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
								</svg>
							</a>

							{/* Facebook */}
							<a
								href='https://www.facebook.com/isprout'
								target='_blank'
								rel='noopener noreferrer'
								className='hover:opacity-70 transition'
							>
								<svg
									className='w-8 h-8 sm:w-10 sm:h-10'
									viewBox='0 0 24 24'
									fill='#00275c'
								>
									<path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
								</svg>
							</a>

							{/* YouTube */}
							<a
								href='https://www.youtube.com/@isproutbusinesscentre236'
								target='_blank'
								rel='noopener noreferrer'
								className='hover:opacity-70 transition'
							>
								<svg
									className='w-8 h-8 sm:w-10 sm:h-10'
									viewBox='0 0 24 24'
									fill='#00275c'
								>
									<path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
								</svg>
							</a>
						</div>

						{/* PHONE */}
						<button
							className='px-6 py-3 rounded-full text-white font-semibold text-sm sm:text-base hover:opacity-90 transition'
							style={{ backgroundColor: "#00275c" }}
						>
							+91 84649 99920
						</button>
					</div>
				</div>
			</div>

			{/* BOTTOM BAR */}
			<div className='w-full bg-black h-6 sm:h-8' />
		</footer>
	);
};

export default Footer;
