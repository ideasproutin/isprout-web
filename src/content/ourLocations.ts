import orbit from "../assets/ourlocations/orbitlobby.jpg";
import ogm from "../assets/ourlocations/ogmlobby.png";
import myhometwitza from "../assets/ourlocations/twitzalobby.jpg";
import jayabheri from "../assets/ourlocations/jayabherilobby.png";
import sohini from "../assets/ourlocations/stplobby.png";
import divyasree from "../assets/ourlocations/divyasreelobby.png";
import minaas from "../assets/ourlocations/minaaslobby.png";
import profound from "../assets/ourlocations/profoundlobby.png";
import pranavaone from "../assets/ourlocations/pranavaonelobby.jpg";
import purva from "../assets/ourlocations/purvalobby.jpg";
import sas from "../assets/ourlocations/saslobby.jpg";
import sreshta from "../assets/ourlocations/shreshtalobby.png";
import nrenclave from "../assets/ourlocations/nrenclavelobby.png";
import psa from "../assets/ourlocations/psalobby.jpg";
import shilpitha from "../assets/ourlocations/shilpithalobby.png";
import jade from "../assets/ourlocations/jadelobby.png";
import sigapiachi from "../assets/ourlocations/sigapiachilobby1.png";
import smt from "../assets/ourlocations/smtlobby.jpg";
import hq27 from "../assets/ourlocations/hq27lobby.png";
import godrej from "../assets/ourlocations/godrejlobby.jpg";
import medha from "../assets/ourlocations/medhalobby.jpg";
import benz from "../assets/ourlocations/benzlobby.png";
import panchasila from "../assets/ourlocations/panchasillobby.png";
import panchasila1 from "../assets/ourlocations/panchasil1lobby.png";
import grey from "../assets/ourlocations/greylobby.png";
import aurelian from "../assets/ourlocations/aurelienlobby.png";
import vizag from "../assets/ourlocations/vizag_lobby.jpg";
const ourLocations = [
	{
		city: "Hyderabad",
		cityRedirect: "/city/hyderabad",
		centersCount: 12,
		centers: [
			{
				center_name: "Orbit",
				centreRedirect: "/office/orbit",
				location: "Knowledge City, Hyderabad",
				image: orbit,
			},
			{
				center_name: "One Golden Mile",
				centreRedirect: "/office/one-golden-mile",
				location: "Kokapet, Hyderabad",
				image: ogm,
			},
			{
				center_name: "My Home Twitza",
				centreRedirect: "/office/my-home-twitza",
				location: "Hitec City, Hyderabad",
				image: myhometwitza,
			},
			{
				center_name: "Jayabheri Trendset",
				centreRedirect: "/office/jayabheri-trendset",
				location: "Kondapur, Hyderabad",
				image: jayabheri,
			},
			{
				center_name: "Sohini Tech Park",
				centreRedirect: "/office/sohini-tech-park",
				location: "Financial District, Hyderabad",
				image: sohini,
			},
			{
				center_name: "Divyasree Trinity",
				centreRedirect: "/office/divyasree-trinity",
				location: "Madhapur, Hyderabad",
				image: divyasree,
			},
			{
				center_name: "Minaas Center",
				centreRedirect: "/office/minaas-center",
				location: "Minaas Center, Hyderabad",
				image: minaas,
			},
			{
				center_name: "Profound Tech Park",
				centreRedirect: "/office/modern-profound",
				location: "Profound Tech Park, Hyderabad",
				image: profound,
			},
			{
				center_name: "Pranava One",
				centreRedirect: "/office/pranava-one",
				location: "Punjagutta, Hyderabad",
				image: pranavaone,
			},
			{
				center_name: "Purva summit",
				centreRedirect: "/office/purva-summit",
				location: "Purva Summit, Hyderabad",
				image: purva,
			},
			{
				center_name: "SAS Tower",
				centreRedirect: "/office/sas-tower",
				location: "SAS Tower, Hyderabad",
				image: sas,
			},
			{
				center_name: "Sreshta Marvel",
				centreRedirect: "/office/sreshta-marvel",
				location: "Sreshta Marvel, Hyderabad",
				image: sreshta,
			},
		],
	},
	{
		city: "Bengaluru",
		cityRedirect: "/city/bengaluru",
		centersCount: 3,
		centers: [
			{
				center_name: "NR Enclave",
				centreRedirect: "/office/nr-enclave",
				location: "Whitefield, Bengaluru",
				image: nrenclave,
			},
			{
				center_name: "Prestige Saleh Ahmed",
				centreRedirect: "/office/prestige-saleh-ahmed",
				location: "Infantry Road, Bengaluru",
				image: psa,
			},
			{
				center_name: "Shilpitha Tech Park",
				centreRedirect: "/office/shilpitha-tech-park",
				location: "Bellandur, Bengaluru",
				image: shilpitha,
			},
		],
	},
	{
		city: "Chennai",
		cityRedirect: "/city/chennai",
		centersCount: 3,
		centers: [
			{
				center_name: "Kochar Jade",
				centreRedirect: "/office/kochar-jade",
				location: "Guindy, Chennai",
				image: jade,
			},
			{
				center_name: "Sigapiachi",
				centreRedirect: "/office/sigapi-achi",
				location: "Egmore, Chennai",
				image: sigapiachi,
			},
			{
				center_name: "SM Towers",
				centreRedirect: "/office/saravana-matrix",
				location: "OMR, Perungudi, Chennai",
				image: smt,
			},
		],
	},
	{
		city: "Gurugram",
		cityRedirect: "/city/gurugram",
		centersCount: 1,
		centers: [
			{
				center_name: "HQ27",
				centreRedirect: "/office/hq27",
				location: "Gurugram, Haryana",
				image: hq27,
			},
		],
	},
	{
		city: "Pune",
		cityRedirect: "/city/pune",
		centersCount: 3,
		centers: [
			{
				center_name: "Grey Stone",
				centreRedirect: "/office/greystone-baner",
				location: "Baner, Pune",
				image: grey,
			},
			{
				center_name: "Panchasilal Tech Park",
				centreRedirect: "/office/panchshil-techpark",
				location: "Hinjewadi, Pune",
				image: panchasila,
			},
			{
				center_name: "Panchasilal Tech Park 1",
				centreRedirect: "/office/panchshil-techpark-one",
				location: "Yerwada, Pune",
				image: panchasila1,
			},
		],
	},
	{
		city: "Vijayawada",
		cityRedirect: "/city/vijayawada",
		centersCount: 2,
		centers: [
			{
				center_name: "BenZ Circle",
				centreRedirect: "/office/benz-circle",
				location: "Mouli Towers, Vijayawada",
				image: benz,
			},
			{
				center_name: "Medha Towers",
				centreRedirect: "/office/medha-towers",
				location: "Gannavaram, Vijayawada",
				image: medha,
			},
		],
	},
	{
		city: "Kolkata",
		cityRedirect: "/city/kolkata",
		centersCount: 1,
		centers: [
			{
				center_name: "Godrej Waterside",
				centreRedirect: "/office/godrej-waterside",
				location: "Salt Lake, Kolkata",
				image: godrej,
			},
		],
	},
	{
		city: "Ahmedabad",
		cityRedirect: "/city/ahmedabad",
		centersCount: 3,
		centers: [
			{
				center_name: "Aurelien",
				centreRedirect: "/office/aurelien",
				location: "Makarba, Ahmedabad",
				image: aurelian,
			},
		],
	},
	{
		city: "Visakhapatnam",
		cityRedirect: "/city/vizag",
		centersCount: 1,
		centers: [
			{
				center_name: "Lansum Square",
				centreRedirect: "/centre/lansum-square",
				location: "Vizag",
				image: vizag,
			},
		],
	},
];

export default ourLocations;
