import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

// Import location images - Hyderabad
import orbit from "../../assets/contactus/orbit.png";
import onegoldenmile from "../../assets/contactus/onegoldenmile.png";
import myhometwitza from "../../assets/contactus/myhometwitza.png";
import jayabheritrendsetconnect from "../../assets/contactus/jayabheritrendsetconnect.jpg";
import sohinitechpark from "../../assets/contactus/sohinitechpark.png";
import divyasreetrinity from "../../assets/contactus/divyasreetrinity.png";
import purvasummit from "../../assets/contactus/purvasummit.png";
import srestamarvel from "../../assets/contactus/srestamarvel.png";
import modernprofound from "../../assets/contactus/modernprofound.jpg";

// Bengaluru
import nrenclave from "../../assets/contactus/NREnclave.webp";
import shilpithatechpark from "../../assets/contactus/shilpitha-tech-park.webp";
import prestigesalehahmed from "../../assets/contactus/prestigesalehahme.webp";

// Pune
import punehinjewadi from "../../assets/contactus/pune-hinjewadi.jpg";
import puneyerwada from "../../assets/contactus/Pune-yerwada.jpg";
import greystone from "../../assets/contactus/greystone.jpg";

// Chennai
import smtower from "../../assets/contactus/sm-tower.png";
import sigapiachi from "../../assets/contactus/Sigapi_Achi.png";
import kocharjade from "../../assets/contactus/Kochar-Jade.jpg";

// Vijayawada
import benzcircle from "../../assets/contactus/benz-circle.jpg";
import medhatowers from "../../assets/contactus/Medha_tower.jpg";

// Kolkata
import godrejwaterside from "../../assets/contactus/Godrej-Waterside.jpg";

// Ahmedabad
import aurelien from "../../assets/contactus/Aurelien.jpg";

// Gurugram
import hq27 from "../../assets/contactus/HQ27.jpg";

interface Location {
	name: string;
	address: string;
	image: string;
	email: string;
	phone: string;
	mapLink: string;
}

const locationsData: { [key: string]: Location[] } = {
	Hyderabad: [
		{
			name: "ORBIT",
			address:
				"iSprout Orbit, Plot No 30/C, Sy No 83/1, Hyderabad Knowledge City Raidurg Panmaktha, Serilingampally Mandal, Hyderabad, Telangana 500019.",
			image: orbit,
			email: "marketing@isprout.in",
			phone: "8464999920",
			mapLink: "https://maps.app.goo.gl/Wh2U5irceHDVC9XA8",
		},
		{
			name: "One Gold Mile",
			address:
				"iSprout One Golden Mile, 9th Floor, Survey no 113, Golden Mile Rd, Kokapet, Hyderabad, Telangana 500075",
			image: onegoldenmile,
			email: "marketing@isprout.in",
			phone: "8464999920",
			mapLink: "https://maps.app.goo.gl/ixmm1eNsN1cvXZ2w5",
		},
		{
			name: "My home Twitza",
			address:
				"Survey No 83/1, APIIC- Hyderabad Knowledge Center, 5th & 6th Floor, Plot No 30/A, Rai Durg, Hyderabad, Telangana 500081",
			image: myhometwitza,
			email: "marketing@isprout.in",
			phone: "8464999920",
			mapLink: "https://maps.app.goo.gl/JWSrpQMhQHr7D2CBA",
		},
		{
			name: "Jayabheri Trendset Connect",
			address:
				"SY No 5 Kondapur village, Madhapur Hyderabad Telangana India 500084",
			image: jayabheritrendsetconnect,
			email: "booking@isprout.in",
			phone: "8464999920",
			mapLink: "https://maps.app.goo.gl/qD1r9XYgKdFaYZHr9",
		},
		{
			name: "Sohini Tech Park",
			address:
				"iSprout - Sohini Tech Park, 8th & 9th Floor, Survey No. 142, Nanakramguda Village, Serilingampally Mandal, RR District, Hyderabad – 500 032",
			image: sohinitechpark,
			email: "marketing@isprout.in",
			phone: "8464999920",
			mapLink: "https://maps.app.goo.gl/JWSrpQMhQHr7D2CBA",
		},
		{
			name: "Divyasree Trinity",
			address:
				"iSprout - Divyasree Trinity, 7th & 8th Floor, Plot No. 5, at HITEC City Layout, survey number 64 (part), Madhapur Village, Serilingampally Mandal, R R District, Hyderabad",
			image: divyasreetrinity,
			email: "marketing@isprout.in",
			phone: "8464999920",
			mapLink: "https://maps.app.goo.gl/b3Sxfi8YWTi54TR86",
		},
		{
			name: "Purva Summit",
			address:
				"iSprout - Purva Summit, 2nd Floor, Survey No 8, Whitefields Road, White Fields, Hitech City, Hyderabad, Telangana, 500081",
			image: purvasummit,
			email: "marketing@isprout.in",
			phone: "8464999920",
			mapLink: "https://maps.app.goo.gl/Sk7LGu31AivnDaSQ7",
		},
		{
			name: "Sreshta Marvel",
			address:
				"2nd floor, Sreshta Marvel, Sy.No.136, Kondapur Main Road, P Janardhan Reddy Nagar, Gachibowli, Hyderabad, Telangana 500032",
			image: srestamarvel,
			email: "marketing@isprout.in",
			phone: "8464999920",
			mapLink: "https://maps.app.goo.gl/VRmZmZXFykKPYCWg6",
		},
		{
			name: "Modern Profound",
			address:
				"iSprout - Modern Profound Techpark, 2nd Floor, Survey No. 12, Office No. 201, Kondapur, Hyderabad, Telangana, 500032",
			image: modernprofound,
			email: "marketing@isprout.in",
			phone: "8464999920",
			mapLink: "https://maps.app.goo.gl/HnKWaeCQvpj7bYoE8",
		},
	],
	Bengaluru: [
		{
			name: "N R Enclave",
			address:
				"DivyaSree N R Enclave, 1st Main Rd, KIADB Export Promotion Industrial Area, Whitefield, Bengaluru, Karnataka 560066",
			image: nrenclave,
			email: "marketing@isprout.in",
			phone: "8464999920",
			mapLink: "https://maps.app.goo.gl/ymX6R3suf9hmpkmk7",
		},
		{
			name: "Shilpitha Tech Park",
			address:
				"iSprout - Shilpitha Tech Park, Sakra World Hospital, 55/3 55/4, Shilpitha Tech Park - Maithri Developers, Devarabisanahalli Road Bellandur, Kariyammana Agrahara, Bengaluru Karnataka 560103",
			image: shilpithatechpark,
			email: "marketing@isprout.in",
			phone: "8464999920",
			mapLink: "https://maps.app.goo.gl/MSaxH6RdPrJ1XBTU6",
		},
		{
			name: "Prestige Saleh Ahmed",
			address:
				"132, Lady Curzon Rd, Tasker Town, Infantry Road, Bangalore, 560001",
			image: prestigesalehahmed,
			email: "marketing@isprout.in",
			phone: "8464999920",
			mapLink: "https://maps.app.goo.gl/5RyVHstY57vQWiYQ6",
		},
	],
	Pune: [
		{
			name: "Pune - Hinjewadi",
			address:
				"iSprout - Panchshil Techpark, 4th Floor, Survey No 19, 20, Hinjawadi Village, Hinjawadi, Pune, Pimpri-Chinchwad, Maharashtra 411057",
			image: punehinjewadi,
			email: "marketing@isprout.in",
			phone: "8464999920",
			mapLink: "https://maps.app.goo.gl/LF3PrJw9UEtuYttL6",
		},
		{
			name: "Pune - Yerwada",
			address:
				'iSprout Panchsil Tech Park One, Tower "E", 191 IBM TECH PARK, Shastrinagar, Yerawada, Pune, Maharashtra 411006',
			image: puneyerwada,
			email: "marketing@isprout.in",
			phone: "8464999920",
			mapLink: "https://maps.app.goo.gl/DRQjZigBhhfDcHps9",
		},
		{
			name: "Grey Stone",
			address:
				"iSprout GreyStone Tremont HQ7F+WFP, Near Kargar Facility Management Services, Veerbhadra Nagar, Baner, Pune, Maharashtra 411045",
			image: greystone,
			email: "marketing@isprout.in",
			phone: "8464999920",
			mapLink: "https://maps.app.goo.gl/M4PfTuwwZdzE6N3x5",
		},
	],
	Chennai: [
		{
			name: "S M Tower",
			address:
				"iSprout - SM Towers, 5th & 6th Floors of Saravana Matrix Tower,No.2 / 88, Seevaram Village. OMR. Perungudi, Chennai – 600 096",
			image: smtower,
			email: "marketing@isprout.in",
			phone: "8464999920",
			mapLink: "https://maps.app.goo.gl/wrukPr5ays6NqNFt7",
		},
		{
			name: "Sigapi Achi Building",
			address:
				"Sigapi Achi Building, Marshalls Rd, Egmore, Chennai, Tamil Nadu 600008",
			image: sigapiachi,
			email: "marketing@isprout.in",
			phone: "8464999920",
			mapLink: "https://maps.app.goo.gl/RopYTmVqgLzHUjMo8",
		},
		{
			name: "Jade",
			address:
				"iSprout Kochar Jade - 5th Floor, Kochar Jade, Ambedkar Nagar, SIDCO Industrial Estate, Guindy, Chennai, Tamil Nadu – 600 032",
			image: kocharjade,
			email: "marketing@isprout.in",
			phone: "8464999920",
			mapLink: "https://maps.app.goo.gl/SF3ZQ6iWyPVh7TJr8",
		},
	],
	Vijayawada: [
		{
			name: "Benz Circle",
			address:
				"iSprout Business Centre Vijayawada | Inspiring Co-working spaces. #41-14-8/2, Opp Mouli Towers, Near Jyothi Convention Hall, Benz circle, Vijayawada – 520 010",
			image: benzcircle,
			email: "marketing@isprout.in",
			phone: "8464999920",
			mapLink: "https://maps.app.goo.gl/wc7dEiyCqtVgph6SA",
		},
		{
			name: "Medha Towers",
			address:
				"Sy. No. 53, Kesarapalli, IT Park Rd, Gannavaram, Vijayawada, Andhra Pradesh 521102",
			image: medhatowers,
			email: "marketing@isprout.in",
			phone: "8464999920",
			mapLink: "https://maps.app.goo.gl/kAimhm46jLwsrWmx6",
		},
	],
	Kolkata: [
		{
			name: "Godrej Waterside",
			address:
				"Street No. 13, DP Block, Sector V, Bidhannagar, Kolkata, West Bengal 700091",
			image: godrejwaterside,
			email: "marketing@isprout.in",
			phone: "8464999920",
			mapLink: "https://maps.app.goo.gl/kCmwCcqd78mzR6K68",
		},
	],
	Ahmedabad: [
		{
			name: "Aurelien",
			address:
				"XFRQ+R4P, Makarba, Ahmedabad, Sarkhej-Okaf, Gujarat 380054",
			image: aurelien,
			email: "marketing@isprout.in",
			phone: "8464999920",
			mapLink: "https://maps.app.goo.gl/v8sXHeGUxhfSfA2n9",
		},
	],
	Gurugram: [
		{
			name: "HQ27",
			address:
				"B-660, 5th floor, Sushant Lok Phase I, Sector 27, Gurugram, Haryana 122009",
			image: hq27,
			email: "marketing@isprout.in",
			phone: "8464999920",
			mapLink: "https://maps.app.goo.gl/5XKGfBbupH6DgWpV9",
		},
	],
};

const LocationContact: React.FC = () => {
	const [selectedCity, setSelectedCity] = useState("Hyderabad");
	const cities = Object.keys(locationsData);

	return (
		<div className='w-full'>
			{/* Cities Tabs */}
			<div className='border-b border-gray-200 bg-white shadow-sm'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex overflow-x-auto gap-4 md:gap-8 py-4 scrollbar-hide'>
						{cities.map((city) => (
							<button
								key={city}
								onClick={() => setSelectedCity(city)}
								className={`text-lg md:text-xl whitespace-nowrap pb-2 transition-colors ${
									selectedCity === city
										? "text-black border-b-2 border-black font-semibold"
										: "text-[#a4a4a4] hover:text-black"
								}`}
							>
								{city}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Locations Grid */}
			<div className='py-6 md:py-8 bg-white'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					{locationsData[selectedCity]?.length > 0 ? (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
							{locationsData[selectedCity].map(
								(location, index) => (
									<div
										key={index}
										className='group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow'
									>
										<div className='relative h-96'>
											<img
												src={location.image}
												alt={location.name}
												className='w-full h-full object-cover'
											/>
											<div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent'></div>

											<div className='absolute top-4 left-4'>
												<h3
													className='text-xl md:text-2xl font-bold bg-linear-to-b from-black to-[#666] bg-clip-text text-transparent drop-shadow-lg'
													style={{
														WebkitTextFillColor:
															"transparent",
													}}
												>
													{location.name}
												</h3>
											</div>

											<div className='absolute bottom-0 left-0 right-0 p-4 bg-black/30 '>
												<p className='text-white text-sm mb-4 line-clamp-3'>
													{location.address}
												</p>

												<div className='space-y-2'>
													<div className='flex items-center gap-2'>
														<Mail className='w-4 h-4 text-white shrink-0' />
														<a
															href={`mailto:${location.email}`}
															className='text-white! text-xs underline hover:text-yellow-400! transition-colors truncate'
														>
															{location.email}
														</a>
													</div>

													<div className='flex items-center gap-2'>
														<Phone className='w-4 h-4 text-white shrink-0' />
														<a
															href={`tel:+91${location.phone}`}
															className='text-white! text-xs hover:text-yellow-400! transition-colors'
														>
															{location.phone}
														</a>
													</div>

													<div className='flex items-center gap-2'>
														<MapPin className='w-4 h-4 text-white shrink-0' />
														<a
															href={
																location.mapLink
															}
															target='_blank'
															rel='noopener noreferrer'
															className='text-white! text-sm hover:text-yellow-400! transition-colors underline'
														>
															View on maps
														</a>
													</div>
												</div>
											</div>
										</div>
									</div>
								),
							)}
						</div>
					) : (
						<div className='text-center py-16'>
							<p className='text-gray-500 text-lg'>
								No locations available in {selectedCity}
							</p>
						</div>
					)}
				</div>

				{/* Social Media Section */}
				<div className='mt-16 text-center'>
					<h2 className='text-2xl md:text-3xl font-semibold mb-6'>
						Connect with us on{" "}
						<span className='font-bold'>Social Media</span>
					</h2>
					<div className='flex justify-center gap-4 md:gap-6'>
						{/* LinkedIn */}
						<a
							href='https://in.linkedin.com/company/isprout'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='LinkedIn'
							className='hover:opacity-70 transition'
						>
							<svg
								className='w-10 h-10 md:w-12 md:h-12'
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
							aria-label='Instagram'
							className='hover:opacity-70 transition'
						>
							<svg
								className='w-10 h-10 md:w-12 md:h-12'
								viewBox='0 0 24 24'
								fill='#00275c'
							>
								<path d='M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z' />
							</svg>
						</a>

						{/* Twitter/X */}
						<a
							href='https://x.com/isproutbc'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Twitter'
							className='hover:opacity-70 transition'
						>
							<svg
								className='w-10 h-10 md:w-12 md:h-12'
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
							aria-label='Facebook'
							className='hover:opacity-70 transition'
						>
							<svg
								className='w-10 h-10 md:w-12 md:h-12'
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
							aria-label='YouTube'
							className='hover:opacity-70 transition'
						>
							<svg
								className='w-10 h-10 md:w-12 md:h-12'
								viewBox='0 0 24 24'
								fill='#00275c'
							>
								<path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
							</svg>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LocationContact;
