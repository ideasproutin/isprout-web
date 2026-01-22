import { COLORS } from "../../helpers/constants/Colors";
import customBuildSpaces from "../../assets/centers/custom_build_spaces.svg";
import frontDeskServices from "../../assets/centers/front_desk_services.svg";
import greatAmbience from "../../assets/centers/great_ambience.svg";
import dailyCleaning from "../../assets/centers/daily_cleaning.svg";
import security24 from "../../assets/centers/24_security.svg";
import phoneBooth from "../../assets/centers/phone_booth.svg";
import printersScanners from "../../assets/centers/printers_scanners.svg";
import cafeteria from "../../assets/centers/cafeteria.svg";
import internetAccess from "../../assets/centers/internet_access.svg";

const amenitiesData = [
	{ image: customBuildSpaces, label: "Custom Build Spaces" },
	{ image: frontDeskServices, label: "Front Desk Services" },
	{ image: greatAmbience, label: "Great Ambience" },
	{ image: dailyCleaning, label: "Daily Cleaning" },
	{ image: security24, label: "24/7 Security" },
	{ image: phoneBooth, label: "Phone Booth" },
	{ image: printersScanners, label: "Printers & Scanners" },
	{ image: cafeteria, label: "Cafeteria" },
	{ image: internetAccess, label: "Internet Access" },
];

export default function Amenities() {
	return (
		<section className="w-full py-12 lg:py-16 px-4" style={{ backgroundColor: COLORS.white }}>
			<div className="max-w-7xl mx-auto">
				{/* Title */}
				<h2 className="text-3xl lg:text-5xl font-bold text-center mb-8 lg:mb-12">
					<span style={{ color: COLORS.brandYellow }}>iSprout</span>{" "}
					<span style={{ color: COLORS.brandBlueDark }}>Amenities</span>
				</h2>

				{/* Amenities Grid */}
				<div className="p-8 lg:p-16">
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
						{amenitiesData.map((amenity, index) => (
							<div 
								key={index} 
								className="flex flex-col items-center justify-center text-center gap-4"
							>
								{/* Icon Image */}
								<div className="w-20 h-20 lg:w-24 lg:h-24 flex items-center justify-center">
									<img 
										src={amenity.image} 
										alt={amenity.label}
										className="w-full h-full object-contain"
									/>
								</div>
								
								{/* Label */}
								<p 
									className="text-sm lg:text-base font-semibold leading-tight"
									style={{ color: COLORS.brandBlueDark }}
								>
									{amenity.label}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
