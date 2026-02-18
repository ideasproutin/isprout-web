import { useState, useRef, useEffect } from "react";
import dedicatedDesks from "../../assets/managedoffice/Dedicated-desks.jpg";
import managerCabin from "../../assets/managedoffice/Manager-Cabin.jpg";
import privateOffices from "../../assets/managedoffice/Private-Offices.jpg";
import dedicatedReception from "../../assets/managedoffice/Dedicated reception.png";
import { COLORS } from "../../helpers/constants/Colors";

interface OfficeType {
	image: string;
	title: string;
	description: string;
}

const ManagedOfficeTypes = () => {
	const [scrollProgress, setScrollProgress] = useState(0);
	const [showProgressBar, setShowProgressBar] = useState(false);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const scrollTimeoutRef = useRef<number | null>(null);

	const handleScroll = () => {
		if (scrollContainerRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } =
				scrollContainerRef.current;
			const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
			setScrollProgress(progress);
			setShowProgressBar(true);

			// Clear existing timeout
			if (scrollTimeoutRef.current) {
				clearTimeout(scrollTimeoutRef.current);
			}

			// Hide progress bar after 1.5 seconds of no scrolling
			scrollTimeoutRef.current = setTimeout(() => {
				setShowProgressBar(false);
			}, 1500);
		}
	};

	useEffect(() => {
		return () => {
			if (scrollTimeoutRef.current) {
				clearTimeout(scrollTimeoutRef.current);
			}
		};
	}, []);
	const officeTypes: OfficeType[] = [
		{
			image: dedicatedDesks,
			title: "Tailor-made layouts ",
			description:
				"Dedicated spaces for teams that value privacy and focus. Fully customizable to match your brand and workflow.",
		},
		{
			image: managerCabin,
			title: "Brand customization",
			description:
				"Collaborative environments designed to foster creativity and teamwork. Flexible seating arrangements for dynamic teams.",
		},
		{
			image: privateOffices,
			title: "Scalable seat expansion ",
			description:
				"Professional meeting spaces equipped with modern technology. Perfect for client meetings and team discussions.",
		},
		{
			image: dedicatedReception,
			title: "Dedicated reception",
			description:
				"Premium office spaces for leadership teams. Enhanced amenities and services for executive-level requirements.",
		},
	];

	return (
		<>
			<style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
			<section
				className='w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8'
				style={{ backgroundColor: COLORS.white }}
			>
				<div className='max-w-7xl mx-auto'>
					{/* Header Section */}
					<div className='mb-8 sm:mb-12'>
						<h2
							className='text-3xl sm:text-4xl font-bold mb-4'
							style={{ color: COLORS.brandBlueDark }}
						>
							Managed Office At iSprout
						</h2>
						<p className='text-base sm:text-lg text-gray-700 max-w-4xl leading-relaxed'>
							iSprout's Managed Office solutions are built for
							teams seeking a ready-to-move, fully furnished
							workspace without the burden of handling daily
							operations. From seamless IT setup and
							infrastructure to facilities management, security,
							and on-ground support, we take complete
							responsibility for running your office smoothly.
							With everything professionally managed under one
							roof, your team can stay focused on productivity,
							collaboration, and scaling the business with
							confidence.
						</p>
					</div>

					{/* Mobile View - Horizontal Scroll */}
					<div className='lg:hidden'>
						<div
							ref={scrollContainerRef}
							onScroll={handleScroll}
							className='flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-6'
						>
							{officeTypes.map((office, index) => (
								<div
									key={index}
									className='snap-start shrink-0 w-[85%] sm:w-[45%]'
								>
									<div className='relative rounded-3xl overflow-hidden shadow-lg'>
										<img
											src={office.image}
											alt={office.title}
											className='w-full aspect-square object-cover'
										/>
										{/* Text Overlay at Bottom */}
										<div className='absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-black/30 shadow-md'>
											<h3 className='text-lg sm:text-xl font-bold text-white text-center drop-shadow-lg'>
												{office.title}
											</h3>
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Progress Bar - Only visible when scrolling */}
						<div
							className={`w-full h-1 bg-gray-300 rounded-full overflow-hidden mb-8 transition-opacity duration-300 ${showProgressBar ? "opacity-100" : "opacity-0"}`}
						>
							<div
								className='h-full bg-gray-600 transition-all duration-300 ease-out'
								style={{ width: `${scrollProgress || 20}%` }}
							/>
						</div>
					</div>

					{/* Desktop View - Grid Layout */}
					<div className='hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
						{officeTypes.map((office, index) => (
							<div
								key={index}
								className='relative rounded-3xl overflow-hidden shadow-lg'
							>
								<img
									src={office.image}
									alt={office.title}
									className='w-full aspect-square object-cover'
								/>
								{/* Text Overlay at Bottom */}
								<div className='absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-black/30 shadow-md'>
									<h3 className='text-lg sm:text-xl font-bold text-white text-center drop-shadow-lg'>
										{office.title}
									</h3>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default ManagedOfficeTypes;
