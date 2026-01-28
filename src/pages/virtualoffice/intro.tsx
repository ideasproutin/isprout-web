import { useLayoutEffect, useRef, useState } from "react";
import { User, Mail, Phone, MapPin, Building2 } from "lucide-react";
import virtualOfficeHero from "../../assets/virtualoffice/virtualoffice-hero-upscalled.jpg";
import formImage from "../../assets/virtualoffice/Call Handling (2).jpg";
import WhyVirtualOffice from "./whyvirtualoffice";
import Locations from "../home/components/locations";
import VirtualOfficeProcess from "./virtualoffice_process";
import FutureOfWork from "../home/components/futureofwork";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { FloatingInput } from "../contactus/FloatingLabelInput";

const VirtualOfficeIntro = () => {
	const formRef = useRef<HTMLDivElement | null>(null);
	const [formHeight, setFormHeight] = useState<number | undefined>(undefined);

	// --- Measure form height and set image container height ---
	useLayoutEffect(() => {
		if (!formRef.current) return;
		const handleResize = () => {
			if (formRef.current) {
				setFormHeight(formRef.current.offsetHeight);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className='min-h-screen bg-white'>
			{/* HERO SECTION */}
			<section
				className='relative w-full min-h-[400px] md:min-h-[480px] lg:min-h-[540px] bg-cover bg-center flex items-end'
				style={{ backgroundImage: `url(${virtualOfficeHero})` }}
			>
				<div className='absolute bottom-0 left-0 right-0 z-10 bg-black/20 py-4 md:py-5 lg:py-6 px-8 md:px-16 lg:px-24'>
					<h1 className="text-white text-[48px] md:text-[64px] lg:text-[80px] xl:text-[96px] font-bold font-['Inter',sans-serif] tracking-tight leading-none">
						Virtual Office
					</h1>
				</div>
			</section>

			{/* FORM SECTION */}
			<section className='py-10 sm:py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-16 bg-[#eaf4fb]'>
				<div className='max-w-7xl mx-auto'>
					{/* HEADING AND SUBTEXT */}
					<div className='mb-8 sm:mb-10'>
						<h2
							className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4'
							style={{
								fontFamily: "Outfit, sans-serif",
								color: "#00275c",
							}}
						>
							<span>Set Up Your </span>
							<span style={{ color: "#FFDE00" }}>
								Virtual Office
							</span>
							<span> Today</span>
						</h2>

						<p
							className='text-base sm:text-lg md:text-xl'
							style={{ fontFamily: "Outfit, sans-serif" }}
						>
							Share your details, choose your city, and our team will help you set up a premium business address with professional support services. 
						</p>
					</div>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-start'>
						{/* LEFT CONTENT - IMAGE */}
						<div className='flex items-center justify-center w-full h-full'>
							<div className='rounded-2xl overflow-hidden w-full' style={formHeight ? { height: formHeight } : { minHeight: '500px' }}>
								<img
									alt='Virtual Office Space'
									className='w-full h-full object-cover'
									src={formImage}
								/>
							</div>
						</div>

						{/* FORM */}
						<div ref={formRef} className='bg-white p-5 sm:p-6 md:p-8 rounded-xl w-full flex flex-col'>
							<form className='space-y-5'>
								<FloatingInput
									label="Full Name"
									value=""
									onChange={() => {}}
									icon={<User size={18} />}
									required
								/>

								<FloatingInput
									label="Your Email"
									type="email"
									value=""
									onChange={() => {}}
									icon={<Mail size={18} />}
									required
								/>

								<FloatingInput
									label="Phone Number"
									type="tel"
									value=""
									onChange={() => {}}
									icon={<Phone size={18} />}
									required
								/>

								<FloatingInput
									label="Preferred City"
									value=""
									onChange={() => {}}
									icon={<MapPin size={18} />}
									required
								/>

								<FloatingInput
									label="Company Name"
									value=""
									onChange={() => {}}
									icon={<Building2 size={18} />}
									required
								/>

								<div className='flex items-start gap-3'>
									<input
										type='checkbox'
										id='terms'
										className='mt-1 w-5 h-5'
										required
									/>
									<label
										htmlFor='terms'
										className='text-sm italic'
										style={{
											fontFamily: "Outfit, sans-serif",
										}}
									>
										I agree to the{" "}
										<span className='underline'>
											terms & policy
										</span>
									</label>
								</div>

								<div className='flex justify-center'>
									<button
										type='submit'
										className='px-10 sm:px-12 py-3 rounded-xl transition-colors text-base font-medium'
										style={{
											backgroundColor: "#FFDE00",
											color: "#00275c",
											fontFamily: "Outfit, sans-serif",
										}}
										onMouseEnter={(e) =>
											(e.currentTarget.style.backgroundColor =
												"#e6c900")
										}
										onMouseLeave={(e) =>
											(e.currentTarget.style.backgroundColor =
												"#FFDE00")
										}
									>
										Submit
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
			<WhyVirtualOffice />
			<Locations />
			<VirtualOfficeProcess />
			<FutureOfWork />
			<Footer />
			<ScrollToTop />{" "}
		</div>
	);
};

export default VirtualOfficeIntro;
