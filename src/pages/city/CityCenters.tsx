import React, { useState } from "react";
import Center from "./Centerdata";
import { COLORS } from "../../helpers/constants/Colors";
import FutureOfWork from "../home/components/futureofwork";
// Hyderabad images
import ogm from "../../assets/ourlocations/ogmlobby.jpg";
import orbit from "../../assets/ourlocations/orbitlobby.jpg";
import myhometwitza from "../../assets/ourlocations/twitzalobby.jpg";
import jayabheri from "../../assets/ourlocations/jayabherilobby.jpg";
import sohini from "../../assets/ourlocations/stplobby.jpg";
import divyasree from "../../assets/ourlocations/divyasreelobby.jpg";
import purva from "../../assets/ourlocations/purvalobby.jpg";
import sreshta from "../../assets/ourlocations/shreshtalobby.jpg";
import profound from "../../assets/ourlocations/profoundlobby.jpg";
import pranavaone from "../../assets/ourlocations/pranavaonelobby.jpg";
// Bengaluru images
import nrenclave from "../../assets/ourlocations/nrenclavelobby.jpg";
import psa from "../../assets/ourlocations/psalobby.jpg";
import shilpitha from "../../assets/ourlocations/shilpithalobby.jpg";
// Chennai images
import jade from "../../assets/ourlocations/jadelobby.jpg";
import smt from "../../assets/ourlocations/smtlobby.jpg";
import sigapiachi from "../../assets/ourlocations/sigapiachilobby.jpg";
// Pune images
import grey from "../../assets/ourlocations/greylobby.jpg";
import panchasila from "../../assets/ourlocations/panchasillobby.jpg";
import panchasila1 from "../../assets/ourlocations/panchasil1lobby.jpg";
// Vijayawada images
import benz from "../../assets/ourlocations/benzlobby.jpg";
import medha from "../../assets/ourlocations/medhalobby.jpg";
// Kolkata images
import godrej from "../../assets/ourlocations/godrejlobby.jpg";
// Ahmedabad images
import aurelian from "../../assets/ourlocations/aurelianlobby.jpg";
// Gurugram images
import hq27 from "../../assets/ourlocations/hq27lobby.jpg";

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
			"One Golden Mile",
			"ORBIT",
			"My Home Twitza",
			"Jayabheri Trendset connect",
			"Flyers Club",
			"Sohini Tech Park",
			"Divyasree Trinity",
			"Purva Summit",
			"Sreshta Marvel",
			"Modern Profound",
			"Pranava One",
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
				center: "one golden mile",
				name: "One Golden Mile",
				image: ogm,
				address:
					"One Golden Mile, 9th Floor, Survey no 113, Golden Mile Rd, Kokapet, Hyderabad, Telangana 500075",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 17.3827,
				lng: 78.3471,
			},
			{
				center: "orbit",
				name: "ORBIT",
				image: orbit,
				address:
					"Orbit, Plot No 30/C, Sy No 83/1, Hyderabad Knowledge City Raidurg Panmaktha, Serilingampally Mandal, Hyderabad, Telangana 500019",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 17.4312,
				lng: 78.3777,
			},
			{
				center: "my home twitza",
				name: "My Home Twitza",
				image: myhometwitza,
				address:
					"My Home Twitza, Survey No 83/1, APIIC- Hyderabad Knowledge Center, 5th & 6th Floor, Plot No 30/A, Rai Durg, Hyderabad, Telangana 500081",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 17.4342,
				lng: 78.3823,
			},
			{
				center: "jayabheri trendset connect",
				name: "Jayabheri Trendset connect",
				image: jayabheri,
				address:
					"Jayabheri Trendset Connect, SY No 5 Kondapur village, Madhapur Hyderabad Telangana India 500084",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 17.4581,
				lng: 78.3565,
			},
			{
				center: "flyers club",
				name: "Flyers Club",
				address:
					"Level C, Rajiv Gandhi International Airport, Unit No-C, Car Parking Level, SA-003, Arrival Dr, Shamshabad, Hyderabad, Telangana 500108",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 17.2386,
				lng: 78.4294,
			},
			{
				center: "sohini tech park",
				name: "Sohini Tech Park",
				image: sohini,
				address:
					"Sohini Tech Park, 8th & 9th Floor, Survey No. 142, Nanakramguda Village, Serilingampally Mandal, RR District, Hyderabad 500032",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 17.4274,
				lng: 78.3476,
			},
			{
				center: "divyasree trinity",
				name: "Divyasree Trinity",
				image: divyasree,
				address:
					"Divyasree Trinity, 7th & 8th Floor, Plot No. 5, at HITEC City Layout, survey number 64 (part), Madhapur Village, Serilingampally Mandal, R R District, Hyderabad 500081",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 17.4504,
				lng: 78.38,
			},
			{
				center: "purva summit",
				name: "Purva Summit",
				image: purva,
				address:
					"Purva Summit, 2nd Floor, Survey No 8, Whitefields Road, White Fields, Hitech City, Hyderabad, Telangana 500081",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 17.4566,
				lng: 78.3765,
			},
			{
				center: "sreshta marvel",
				name: "Sreshta Marvel",
				image: sreshta,
				address:
					"Sreshta Marvel, 2nd floor, Sy.No.136, Kondapur Main Road, P Janardhan Reddy Nagar, Gachibowli, Hyderabad, Telangana 500032",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 17.467,
				lng: 78.3578,
			},
			{
				center: "modern profound",
				name: "Modern Profound",
				image: profound,
				address:
					"Modern Profound Techpark, 2nd Floor, Survey No. 12, Office No. 201, Kondapur, Hyderabad, Telangana 500032",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 17.4691,
				lng: 78.357,
			},
			{
				center: "pranava one",
				name: "Pranava One",
				image: pranavaone,
				address:
					"Pranava One, 6-5-654, Punjagutta Rd, Raj Bhavan Quarters Colony, Somajiguda, Hyderabad, Telangana 500082",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 17.426,
				lng: 78.4556,
			},
		],
		bengaluru: [
			{
				center: "nr enclave",
				name: "NR Enclave",
				image: nrenclave,
				address:
					"DivyaSree N R Enclave, 1st Main Rd, KIADB Export Promotion Industrial Area, Whitefield, Bengaluru, Karnataka 560066",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 13.1939,
				lng: 77.7064,
			},
			{
				center: "prestige saleh ahmed",
				name: "Prestige Saleh Ahmed",
				image: psa,
				address:
					"Prestige Saleh Ahmed 132, Lady Curzon Rd, Tasker Town, Infantry Road, Bangalore, 560001",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 13.0055,
				lng: 77.5932,
			},
			{
				center: "shilpitha tech park",
				name: "Shilpitha Tech Park",
				image: shilpitha,
				address:
					"Shilpitha Tech Park, Sakra World Hospital, 55/3 55/4, Shilpitha Tech Park - Maithri Developers, Devarabisanahalli Road Bellandur, Kariyammana Agrahara, Bengaluru Karnataka 560103",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 12.9356,
				lng: 77.6245,
			},
		],
		chennai: [
			{
				center: "kochar jade",
				name: "Kochar Jade",
				image: jade,
				address:
					"Kochar Jade - 5th Floor, Kochar Jade, Ambedkar Nagar, SIDCO Industrial Estate, Guindy, Chennai, Tamil Nadu 600032",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 13.0028,
				lng: 80.2156,
			},
			{
				center: "saravana matrix tower",
				name: "Saravana Matrix Tower",
				image: smt,
				address:
					"SM Towers, 5th & 6th Floors of Saravana Matrix Tower, No.2 / 88, Seevaram Village. OMR. Perungudi, Chennai 600096",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 12.9714,
				lng: 80.2506,
			},
			{
				center: "sigapi achi",
				name: "Sigapi Achi",
				image: sigapiachi,
				address:
					"No.18/3, Rukmani Lakshmipathi Road, Egmore, Chennai 600008",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 13.0122,
				lng: 80.2727,
			},
		],
		pune: [
			{
				center: "greystone baner",
				name: "Greystone Baner",
				image: grey,
				address:
					"iSprout GreyStone Tremont HQ7F+WFP, Near Kargar Facility Management Services, Veerbhadra Nagar, Baner, Pune, Maharashtra 411045",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 18.5614,
				lng: 73.7997,
			},
			{
				center: "panchshil techpark",
				name: "Panchshil Techpark",
				image: panchasila,
				address:
					"Panchshil Techpark, 4th Floor, Survey No 19, 20, Hinjawadi Village, Hinjawadi, Pune, Pimpri-Chinchwad, Maharashtra 411057",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 18.5921,
				lng: 73.7605,
			},
			{
				center: "panchshil techpark one",
				name: "Panchshil Techpark One",
				image: panchasila1,
				address:
					"Panchsil Tech Park One, Tower E, 191 IBM TECH PARK, Shastrinagar, Yerawada, Pune, Maharashtra 411006",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 18.5445,
				lng: 73.9117,
			},
		],
		vijayawada: [
			{
				center: "benz circle - amaravathi",
				name: "Benz Circle - Amaravathi",
				image: benz,
				address:
					"Door No: 40-14-8/2, near jyothi convention hall, Benz Circle, Vijayawada, Andhra Pradesh 520010",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 16.5062,
				lng: 80.648,
			},
			{
				center: "medha towers",
				name: "Medha Towers",
				image: medha,
				address:
					"Medha Towers, Sy. No. 53, Kesarapalli, IT Park Rd, Gannavaram, Vijayawada, Andhra Pradesh 521102",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 16.5083,
				lng: 80.5583,
			},
		],
		kolkata: [
			{
				center: "godrej waterside",
				name: "Godrej Waterside",
				image: godrej,
				address:
					"Godrej Waterside, Street No. 13, DP Block, Sector V, Bidhannagar, Kolkata, West Bengal 700091",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 22.5765,
				lng: 88.3994,
			},
		],
		ahmedabad: [
			{
				center: "aurelien",
				name: "Aurelien",
				image: aurelian,
				address:
					"XFRQ+R4P, Makarba, Ahmedabad, Sarkhej-Okaf, Gujarat 380054",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 23.0225,
				lng: 72.5714,
			},
		],
		gurugram: [
			{
				center: "hq27 the headquarters",
				name: "HQ27 The Headquarters",
				image: hq27,
				address:
					"B-660, 5th floor, Sushant Lok Phase I, Sector 27, Gurugram, Haryana 122009",
				phone: "(+91) 8464999920",
				email: "marketing@isprout.in",
				lat: 28.4595,
				lng: 77.0266,
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
			<div className='max-w-[1280px] mx-auto'>
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
									(item) => item.center === selectedCenter
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
