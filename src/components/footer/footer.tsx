import logo from "../../assets/footer/isprout_logo.png";
import instagram from "../../assets/footer/Instagram.png";
import facebook from "../../assets/footer/Facebook.png";
import twitter from "../../assets/footer/Twitter.png";
import youtube from "../../assets/footer/Youtube.png";
import linkedin from "../../assets/footer/Linkedin.png";
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
						<div className='flex flex-wrap gap-3 mb-4'>
							{[
								{
									icon: linkedin,
									link: "https://in.linkedin.com/company/isprout",
								},
								{
									icon: instagram,
									link: "https://www.instagram.com/isproutcoworkingspace/",
								},
								{
									icon: twitter,
									link: "https://x.com/isproutbc",
								},
								{
									icon: facebook,
									link: "https://www.facebook.com/isprout",
								},
								{
									icon: youtube,
									link: "https://www.youtube.com/@isproutbusinesscentre236",
								},
							].map((social, i) => (
								<a
									key={i}
									href={social.link}
									target='_blank'
									rel='noopener noreferrer'
									className='hover:opacity-70 transition'
								>
									<img
										src={social.icon}
										alt='Social'
										className='w-8 h-8 sm:w-10 sm:h-10'
									/>
								</a>
							))}
						</div>

						{/* PHONE */}
						<button
							className='px-6 py-3 rounded-full text-white font-semibold text-sm sm:text-base hover:opacity-90 transition'
							style={{ backgroundColor: "#00275c" }}
						>
							+91 987654321
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
