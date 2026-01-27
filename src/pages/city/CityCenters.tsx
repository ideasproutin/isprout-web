import { useState } from "react";
import Center from "./Centerdata";
import { COLORS } from "../../helpers/constants/Colors";
import FutureOfWork from "../home/components/futureofwork";

// Hyderabad images
import pranava_b1 from "../../assets/city/pranava_Building1.jpg";
import pranava_l2 from "../../assets/city/pranava_Lobby2.jpg";
import pranava_w3 from "../../assets/city/pranava_Workspace3.jpg";

import jayabheri_b1 from "../../assets/city/jayabheri_Building1.jpg";
import jayabheri_l2 from "../../assets/city/jayabheri_Lobby2.jpg";
import jayabheri_w3 from "../../assets/city/jayabheri_Workspace3.jpg";

import sohini_b1 from "../../assets/city/sohini_Building1.jpg";
import sohini_l2 from "../../assets/city/sohini_Lobby2.jpg";
import sohini_w3 from "../../assets/city/sohini_Workspace3.jpg";

import twitza_b1 from "../../assets/city/twitza_Building1.jpg";
import twitza_l2 from "../../assets/city/twitza_Lobby2.jpg";
import twitza_w3 from "../../assets/city/twitza_Workspace3.jpg";

import divyasree_b1 from "../../assets/city/divyasree_Building1.jpg";
import divyasree_l2 from "../../assets/city/divyasree_Lobby2.jpg";
import divyasree_w3 from "../../assets/city/divyasree_Workspace3.jpg";

import modernprofound_b1 from "../../assets/city/modernprofound_Building1.jpg";
import modernprofound_l2 from "../../assets/city/modernprofound_Lobby2.jpg";
import modernprofound_w3 from "../../assets/city/modernprofound_Workspace3.jpg";

import orbit_b1 from "../../assets/city/orbit_Building1.jpg";
import orbit_l2 from "../../assets/city/orbit_Lobby3.jpg";
import orbit_w3 from "../../assets/city/orbit_Workspace3.jpg";

import golden_b1 from "../../assets/city/golden_Building1.jpg";
import golden_l2 from "../../assets/city/golden_Lobby2.jpg";
import golden_w3 from "../../assets/city/golden_Workspace3.jpg";

import purva_b1 from "../../assets/city/purva_Building1.jpg";
import purva_l2 from "../../assets/city/purva_Lobby2.jpg";
import purva_w3 from "../../assets/city/purva_Workspace3.jpg";

import minass_b1 from "../../assets/city/minass_Building1.jpg";
import minass_l2 from "../../assets/city/minass_Lobby2.jpg";
import minass_w3 from "../../assets/city/minass_Workspace3.jpg";

import sreshta_b1 from "../../assets/city/sreshta_Building1.jpg";
import sreshta_l2 from "../../assets/city/sreshta_Lobby3.jpg";
import sreshta_w3 from "../../assets/city/sreshta_Workspace3.jpg";

import sas_b1 from "../../assets/city/sas_Building1.jpg";
import sas_l2 from "../../assets/city/sas_Lobby2.jpg";
import sas_w3 from "../../assets/city/sas_Workspace3.jpg";

// Bengaluru images
import NR_b1 from "../../assets/city/NR_Building1.jpg";
import NR_l2 from "../../assets/city/NR_Lobby2.jpg";
import NR_w3 from "../../assets/city/NR_Workspace3.jpg";

import prestige_b1 from "../../assets/city/prestige_Building1.jpg";
import prestige_l2 from "../../assets/city/prestige_Lobby2.jpg";
import prestige_w3 from "../../assets/city/prestige_Workspace3.jpg";

import shilpitha_b1 from "../../assets/city/shilpitha_Building1.jpg";
import shilpitha_l2 from "../../assets/city/shilpitha_Lobby2.jpg";
import shilpitha_w3 from "../../assets/city/shilpitha_Workspace3.jpg";

// Chennai images
import kochar_b1 from "../../assets/city/kochar_Building1.jpg";
import kochar_l2 from "../../assets/city/kochar_Lobby2.jpg";
import kochar_w3 from "../../assets/city/kochar_Workspace3.jpg";

import sm_b1 from "../../assets/city/sm_Building1.jpg";
import sm_l2 from "../../assets/city/sm_Lobby2.jpg";
import sm_w3 from "../../assets/city/sm_Workspace3.jpg";

import sigapi_b1 from "../../assets/city/sigapi_Building1.jpg";
import sigapi_l2 from "../../assets/city/sigapi_Meeting Room2.jpg";
import sigapi_w3 from "../../assets/city/sigapi_Workspace3.jpg";

// Pune images
import grey_b1 from "../../assets/city/grey_Building1.jpg";
import grey_l2 from "../../assets/city/grey_Lobby2.jpg";
import grey_w3 from "../../assets/city/grey_Workspace13.jpg";

import panchasil_b1 from "../../assets/city/panchasil_Building1.jpg";
import panchasil_l2 from "../../assets/city/panchasil_Lobby2.jpg";
import panchasil_w3 from "../../assets/city/panchasil_Workspace3.jpg";

import panchasilone_b1 from "../../assets/city/panchasilone_Building1.jpg";
import panchasilone_l2 from "../../assets/city/panchasilone_Lobby2.jpg";
import panchasilone_w3 from "../../assets/city/panchasilone_Workspace3.jpg";

// Vijayawada images
import benz_b1 from "../../assets/city/benz_Building1.jpg";
import benz_l2 from "../../assets/city/benz_Lobby2.jpg";
import benz_w3 from "../../assets/city/benz_Workspace3.jpg";

import medha_b1 from "../../assets/city/medha_Building1.jpg";
import medha_l2 from "../../assets/city/medha_Lobby2.jpg";
import medha_w3 from "../../assets/city/medha_Workspace3.jpg";

// Kolkata images
import godrej_b1 from "../../assets/city/godrej_Building1.jpg";
import godrej_l2 from "../../assets/city/godrej_Lobby2.jpg";
import godrej_w3 from "../../assets/city/godrej_Workspace3.jpg";

// Ahmedabad images
import aurelien_b1 from "../../assets/city/aurelien_Building1.jpg";
import aurelien_l2 from "../../assets/city/aurelien_Lobby2.jpg";
import aurelien_w3 from "../../assets/city/aurelien_Workspace3.jpg";

// Gurugram images
import HQ27_b1 from "../../assets/city/HQ27_Building1.jpg";
import HQ27_l2 from "../../assets/city/HQ27_Lobby2.jpg";
import HQ27_w3 from "../../assets/city/HQ27_Workspace3.jpg";

interface CityCentersProps {
	cityName?: string;
}

const cityCenters = ({ cityName = "hyderabad" }: CityCentersProps) => {
	const [selectedCenter, setSelectedCenter] = useState("all");

	const cityNameLower = cityName.toLowerCase();

	// City-specific center lists
	const centersListByCity: { [key: string]: string[] } = {
		hyderabad: [
			"All",
			"Pranava One",
			"Jayabheri Trendset connect",
			"Sohini Tech Park",
			"My Home Twitza",
			"Divyasree Trinity",
			"Modern Profound",
			"ORBIT",
			"One Golden Mile",
			"Purva Summit",
			"Minaas Center",
			"Sreshta Marvel",
			"SAS Tower",
		],
		bengaluru: [
			"All",
			"NR Enclave",
			"Prestige Saleh Ahmed",
			"Shilpitha Tech Park",
		],
		chennai: ["All", "Kochar Jade", "Saravana Matrix Tower", "Sigapi Achi"],
		pune: [
			"All",
			"Greystone Baner",
			"Panchshil Techpark",
			"Panchshil Techpark One",
		],
		vijayawada: ["All", "Benz Circle - Amaravathi", "Medha Towers"],
		kolkata: ["All", "Godrej Waterside"],
		ahmedabad: ["All", "Aurelien"],
		gurugram: ["All", "HQ27 The Headquarters"],
	};

	const centersList =
		centersListByCity[cityNameLower] || centersListByCity.hyderabad;

	// City-specific data
	const cityDataByCity: { [key: string]: any[] } = {
		hyderabad: [
			{
				center: "pranava one",
				name: "Pranava One",
				image: pranava_b1,
				thumbnails: [pranava_l2, pranava_w3],
				address:
					"Pranava One, 6-5-654, Punjagutta Rd, Raj Bhavan Quarters Colony, Somajiguda, Hyderabad, Telangana 500082",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 17.457306,
				lng: 78.3705,
				mapLink: "https://maps.app.goo.gl/VaKnctW932Gc1aAe8",
			},
			{
				center: "jayabheri trendset connect",
				name: "Jayabheri Trendset connect",
				image: jayabheri_b1,
				thumbnails: [jayabheri_l2, jayabheri_w3],
				address:
					"Jayabheri Trendset Connect, SY No 5 Kondapur village, Madhapur Hyderabad Telangana India 500084",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 17.4535,
				lng: 78.370111,
				mapLink: "https://maps.app.goo.gl/qD1r9XYgKdFaYZHr9",
			},
			{
				center: "sohini tech park",
				name: "Sohini Tech Park",
				image: sohini_b1,
				thumbnails: [sohini_l2, sohini_w3],
				address:
					"Sohini Tech Park, 8th & 9th Floor, Survey No. 142, Nanakramguda Village, Serilingampally Mandal, RR District, Hyderabad 500032",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 17.42275,
				lng: 78.347194,
				mapLink: "https://maps.app.goo.gl/tzyneciLAVYLKu8J9",
			},
			{
				center: "my home twitza",
				name: "My Home Twitza",
				image: twitza_b1,
				thumbnails: [twitza_l2, twitza_w3],
				address:
					"My Home Twitza, Survey No 83/1, APIIC- Hyderabad Knowledge Center, 5th & 6th Floor, Plot No 30/A, Rai Durg, Hyderabad, Telangana 500081",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 17.433972,
				mapLink: "https://maps.app.goo.gl/JWSrpQMhQHr7D2CBA",
				lng: 78.374972,
			},
			{
				center: "divyasree trinity",
				name: "Divyasree Trinity",
				image: divyasree_b1,
				thumbnails: [divyasree_l2, divyasree_w3],
				address:
					"Divyasree Trinity, 7th & 8th Floor, Plot No. 5, at HITEC City Layout, survey number 64 (part), Madhapur Village, Serilingampally Mandal, R R District, Hyderabad 500081",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				mapLink: "https://maps.app.goo.gl/b3Sxfi8YWTi54TR86",
				lat: 17.443556,
				lng: 78.374389,
			},
			{
				center: "modern profound",
				name: "Modern Profound",
				image: modernprofound_b1,
				thumbnails: [modernprofound_l2, modernprofound_w3],
				address:
					"Modern Profound, 2nd Floor, Survey No. 12, Office No. 201, Kondapur, Hyderabad, Telangana 500032",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				mapLink: "https://maps.app.goo.gl/HnKWaeCQvpj7bYoE8",
				lat: 17.446861,
				lng: 78.364083,
			},
			{
				center: "orbit",
				name: "ORBIT",
				image: orbit_b1,
				thumbnails: [orbit_l2, orbit_w3],
				address:
					"Orbit, Plot No 30/C, Sy No 83/1, Hyderabad Knowledge City Raidurg Panmaktha, Serilingampally Mandal, Hyderabad, Telangana 500019",
				phone: "(+91) 8464999920",
				mapLink: "https://maps.app.goo.gl/Wh2U5irceHDVC9XA8",
				email: "marketing@isprout.in",
				lat: 17.434389,
				lng: 78.376778,
			},
			{
				center: "one golden mile",
				name: "One Golden Mile",
				image: golden_b1,
				thumbnails: [golden_l2, golden_w3],
				address:
					"One Golden Mile, 9th Floor, Survey no 113, Golden Mile Rd, Kokapet, Hyderabad, Telangana 500075",
				phone: "(+91) 8464999920",
				mapLink: "https://maps.app.goo.gl/ixmm1eNsN1cvXZ2w5",
				email: "marketing@isprout.in",
				lat: 17.401028,
				lng: 78.338389,
			},
			{
				center: "purva summit",
				name: "Purva Summit",
				image: purva_b1,
				thumbnails: [purva_l2, purva_w3],
				address:
					"Purva Summit, 2nd Floor, Survey No 8, Whitefields Road, White Fields, Hitech City, Hyderabad, Telangana 500081",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 17.419639,
				lng: 78.457306,
				mapLink: "https://maps.app.goo.gl/Sk7LGu31AivnDaSQ7",
			},
			{
				center: "minaas center",
				name: "Minaas Center",
				image: minass_b1,
				thumbnails: [minass_l2, minass_w3],
				address: "Minaas Towers, Hyderabad, Telangana",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 17.442722,
				lng: 78.368361,
				mapLink: "https://maps.app.goo.gl/1rUbi6MujWs2DoHo7",
			},
			{
				center: "sreshta marvel",
				name: "Sreshta Marvel",
				image: sreshta_b1,
				thumbnails: [sreshta_l2, sreshta_w3],
				address:
					"Sreshta Marvel, 2nd floor, Sy.No.136, Kondapur Main Road, P Janardhan Reddy Nagar, Gachibowli, Hyderabad, Telangana 500032",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 17.237167,
				mapLink: "https://maps.app.goo.gl/VRmZmZXFykKPYCWg6",
				lng: 78.428972,
			},
			{
				center: "sas tower",
				name: "SAS Tower",
				image: sas_b1,
				thumbnails: [sas_l2, sas_w3],
				address: "SAS I Tower, Hyderabad, Telangana",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 17.41925,
				mapLink: "https://maps.app.goo.gl/buy6k86xgrx5jChb9",
				lng: 78.360111,
			},
		],
		bengaluru: [
			{
				center: "nr enclave",
				name: "NR Enclave",
				image: NR_b1,
				thumbnails: [NR_l2, NR_w3],
				address:
					"DivyaSree N R Enclave, 1st Main Rd, KIADB Export Promotion Industrial Area, Whitefield, Bengaluru, Karnataka 560066",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				mapLink: "https://maps.app.goo.gl/ymX6R3suf9hmpkmk7",
				lat: 12.986472,
				lng: 77.730528,
			},
			{
				center: "prestige saleh ahmed",
				name: "Prestige Saleh Ahmed",
				image: prestige_b1,
				thumbnails: [prestige_l2, prestige_w3],
				address:
					"Prestige Saleh Ahmed 132, Lady Curzon Rd, Tasker Town, Infantry Road, Bangalore, 560001",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				mapLink: "https://maps.app.goo.gl/5RyVHstY57vQWiYQ6",
				lat: 12.980348,
				lng: 77.603538,
			},
			{
				center: "shilpitha tech park",
				name: "Shilpitha Tech Park",
				image: shilpitha_b1,
				thumbnails: [shilpitha_l2, shilpitha_w3],
				address:
					"Shilpitha Tech Park, Sakra World Hospital, 55/3 55/4, Shilpitha Tech Park - Maithri Developers, Devarabisanahalli Road Bellandur, Kariyammana Agrahara, Bengaluru Karnataka 560103",
				phone: "(+91) 8464999920",
				mapLink: "https://maps.app.goo.gl/MSaxH6RdPrJ1XBTU6",
				email: "marketing@isprout.in",
				lat: 12.931222,
				lng: 77.685583,
			},
		],
		chennai: [
			{
				center: "kochar jade",
				name: "Kochar Jade",
				image: kochar_b1,
				thumbnails: [kochar_l2, kochar_w3],
				address:
					"Kochar Jade - 5th Floor, Kochar Jade, Ambedkar Nagar, SIDCO Industrial Estate, Guindy, Chennai, Tamil Nadu 600032",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 13.012861,
				lng: 80.202167,
				mapLink: "https://maps.app.goo.gl/SF3ZQ6iWyPVh7TJr8",
			},
			{
				center: "saravana matrix tower",
				name: "Saravana Matrix Tower",
				image: sm_b1,
				thumbnails: [sm_l2, sm_w3],
				address:
					"SM Towers, 5th & 6th Floors of Saravana Matrix Tower, No.2 / 88, Seevaram Village. OMR. Perungudi, Chennai 600096",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 12.953833,
				lng: 80.241889,
				mapLink: "https://maps.app.goo.gl/wrukPr5ays6NqNFt7",
			},
			{
				center: "sigapi achi",
				name: "Sigapi Achi",
				image: sigapi_b1,
				thumbnails: [sigapi_l2, sigapi_w3],
				address:
					"No.18/3, Rukmani Lakshmipathi Road, Egmore, Chennai 600008",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 13.065833,
				mapLink: "https://maps.app.goo.gl/RopYTmVqgLzHUjMo8",
				lng: 80.259583,
			},
		],
		pune: [
			{
				center: "greystone baner",
				name: "Greystone Baner",
				image: grey_b1,
				thumbnails: [grey_l2, grey_w3],
				address:
					"iSprout GreyStone Tremont HQ7F+WFP, Near Kargar Facility Management Services, Veerbhadra Nagar, Baner, Pune, Maharashtra 411045",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				mapLink: "https://maps.app.goo.gl/M4PfTuwwZdzE6N3x5",
				lat: 18.564917,
				lng: 73.773861,
			},
			{
				center: "panchshil techpark",
				name: "Panchshil Techpark",
				image: panchasil_b1,
				thumbnails: [panchasil_l2, panchasil_w3],
				address:
					"Panchshil Techpark, 4th Floor, Survey No 19, 20, Hinjawadi Village, Hinjawadi, Pune, Pimpri-Chinchwad, Maharashtra 411057",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				mapLink: "https://maps.app.goo.gl/LF3PrJw9UEtuYttL6",
				lat: 18.592673,
				lng: 73.746958,
			},
			{
				center: "panchshil techpark one",
				name: "Panchshil Techpark One",
				image: panchasilone_b1,
				thumbnails: [panchasilone_l2, panchasilone_w3],
				address:
					"Panchsil Tech Park One, Tower E, 191 IBM TECH PARK, Shastrinagar, Yerawada, Pune, Maharashtra 411006",
				phone: "(+91) 8464999920",
				mapLink: "https://maps.app.goo.gl/DRQjZigBhhfDcHps9",
				email: "marketing@isprout.in",
				lat: 18.552778,
				lng: 73.892546,
			},
		],
		vijayawada: [
			{
				center: "benz circle - amaravathi",
				name: "Benz Circle - Amaravathi",
				image: benz_b1,
				thumbnails: [benz_l2, benz_w3],
				address:
					"Door No: 40-14-8/2, near jyothi convention hall, Benz Circle, Vijayawada, Andhra Pradesh 520010",
				phone: "(+91) 8464999920",
				mapLink: "https://maps.app.goo.gl/wc7dEiyCqtVgph6SA",
				email: "marketing@isprout.in",
				lat: 16.497139,
				lng: 80.651528,
			},
			{
				center: "medha towers",
				name: "Medha Towers",
				image: medha_b1,
				thumbnails: [medha_l2, medha_w3],
				address:
					"Medha Towers, Sy. No. 53, Kesarapalli, IT Park Rd, Gannavaram, Vijayawada, Andhra Pradesh 521102",
				mapLink: "https://maps.app.goo.gl/kAimhm46jLwsrWmx6",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 16.526056,
				lng: 80.779694,
			},
		],
		kolkata: [
			{
				center: "godrej waterside",
				name: "Godrej Waterside",
				image: godrej_b1,
				thumbnails: [godrej_l2, godrej_w3],
				address:
					"Godrej Waterside, Street No. 13, DP Block, Sector V, Bidhannagar, Kolkata, West Bengal 700091",
				mapLink: "https://maps.app.goo.gl/kCmwCcqd78mzR6K68",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 22.573785,
				lng: 88.437549,
			},
		],
		ahmedabad: [
			{
				center: "aurelien",
				name: "Aurelien",
				image: aurelien_b1,
				thumbnails: [aurelien_l2, aurelien_w3],
				address:
					"XFRQ+R4P, Makarba, Ahmedabad, Sarkhej-Okaf, Gujarat 380054",
				mapLink: "https://maps.app.goo.gl/v8sXHeGUxhfSfA2n9",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 22.991388,
				lng: 72.487518,
			},
		],
		gurugram: [
			{
				center: "hq27 the headquarters",
				name: "HQ27 The Headquarters",
				image: HQ27_b1,
				thumbnails: [HQ27_l2, HQ27_w3],
				address:
					"B-660, 5th floor, Sushant Lok Phase I, Sector 27, Gurugram, Haryana 122009",
				mapLink: "https://maps.app.goo.gl/5XKGfBbupH6DgWpV9",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 28.466216,
				lng: 77.074073,
			},
		],
	};

	const cityData = cityDataByCity[cityNameLower] || cityDataByCity.hyderabad;

	const handleCenterClick = (centerName: string) => {
		if (centerName === "All") {
			setSelectedCenter("all");
		} else {
			setSelectedCenter(centerName.toLowerCase());
		}
	};

	return (
		<div
			className='py-12 lg:py-20 px-4 lg:px-8'
			style={{ backgroundColor: "white" }}
		>
			<div className='max-w-7xl mx-auto'>
				{/* Filter Buttons */}
				<div className='flex flex-wrap gap-3 lg:gap-4 justify-center mb-12'>
					{centersList.map((center) => (
						<button
							key={center}
							onClick={() => handleCenterClick(center)}
							className={`px-4 lg:px-6 py-2 lg:py-3 rounded-full font-semibold text-sm lg:text-base transition-all duration-300 border-2 ${
								selectedCenter ===
								(center === "All"
									? "all"
									: center.toLowerCase())
									? "text-white border-2 border-transparent"
									: "text-gray-800 border-2 border-gray-800 bg-white hover:bg-gray-100"
							}`}
							style={{
								backgroundColor:
									selectedCenter ===
									(center === "All"
										? "all"
										: center.toLowerCase())
										? COLORS.brandBlue
										: "white",
								color:
									selectedCenter ===
									(center === "All"
										? "all"
										: center.toLowerCase())
										? "white"
										: "gray",
								borderColor:
									selectedCenter ===
									(center === "All"
										? "all"
										: center.toLowerCase())
										? COLORS.brandBlue
										: "#d1d5db",
							}}
						>
							{center}
						</button>
					))}
				</div>

				{/* Centers Display */}
				<div className='flex flex-col items-center gap-8 lg:gap-12'>
					{selectedCenter === "all"
						? cityData.map((item, index) => (
								<Center
									key={index}
									centerData={item}
									index={index}
								/>
							))
						: cityData
								.filter(
									(item) => item.center === selectedCenter,
								)
								.map((item, index) => (
									<Center
										key={index}
										centerData={item}
										index={cityData.indexOf(item)}
									/>
								))}
				</div>
			</div>
			<FutureOfWork />
		</div>
	);
};

export default cityCenters;
