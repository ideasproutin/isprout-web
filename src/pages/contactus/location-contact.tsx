import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

// Import social media icons
import instagram from "../../assets/footer/Instagram.png";
import facebook from "../../assets/footer/Facebook.png";
import twitter from "../../assets/footer/Twitter.png";
import youtube from "../../assets/footer/Youtube.png";
import linkedin from "../../assets/footer/Linkedin.png";

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
  'Hyderabad': [
    {
      name: 'ORBIT',
      address: 'iSprout Orbit, Plot No 30/C, Sy No 83/1, Hyderabad Knowledge City Raidurg Panmaktha, Serilingampally Mandal, Hyderabad, Telangana 500019.',
      image: orbit,
      email: 'marketing@isprout.in',
      phone: '8464999920',
      mapLink: 'https://maps.app.goo.gl/VnTWE8v4hE2mTqSn7'
    },
    {
      name: 'One Gold Mile',
      address: 'iSprout One Golden Mile, 9th Floor, Survey no 113, Golden Mile Rd, Kokapet, Hyderabad, Telangana 500075',
      image: onegoldenmile,
      email: 'marketing@isprout.in',
      phone: '8464999920',
      mapLink: 'https://maps.app.goo.gl/UkbGBTMPbxRcs6be7'
    },
    {
      name: 'My home Twitza',
      address: 'Survey No 83/1, APIIC- Hyderabad Knowledge Center, 5th & 6th Floor, Plot No 30/A, Rai Durg, Hyderabad, Telangana 500081',
      image: myhometwitza,
      email: 'marketing@isprout.in',
      phone: '8464999920',
      mapLink: 'https://maps.app.goo.gl/HYopwC7QbyDnf4uy5'
    },
    {
      name: 'Jayabheri Trendset Connect',
      address: 'SY No 5 Kondapur village, Madhapur Hyderabad Telangana India 500084',
      image: jayabheritrendsetconnect,
      email: 'booking@isprout.in',
      phone: '8464999920',
      mapLink: 'https://maps.app.goo.gl/48NBxzGafDEkSpUL8'
    },
    {
      name: 'Sohini Tech Park',
      address: 'iSprout - Sohini Tech Park, 8th & 9th Floor, Survey No. 142, Nanakramguda Village, Serilingampally Mandal, RR District, Hyderabad – 500 032',
      image: sohinitechpark,
      email: 'marketing@isprout.in',
      phone: '8464999920',
      mapLink: 'https://maps.app.goo.gl/AJWirPFUJoiHnNRt8'
    },
    {
      name: 'Divyasree Trinity',
      address: 'iSprout - Divyasree Trinity, 7th & 8th Floor, Plot No. 5, at HITEC City Layout, survey number 64 (part), Madhapur Village, Serilingampally Mandal, R R District, Hyderabad',
      image: divyasreetrinity,
      email: 'marketing@isprout.in',
      phone: '8464999920',
      mapLink: 'https://maps.app.goo.gl/4EzLyELkMnz35P796'
    },
    {
      name: 'Purva Summit',
      address: 'iSprout - Purva Summit, 2nd Floor, Survey No 8, Whitefields Road, White Fields, Hitech City, Hyderabad, Telangana, 500081',
      image: purvasummit,
      email: 'marketing@isprout.in',
      phone: '8464999920',
      mapLink: 'https://maps.app.goo.gl/9SzyT2ySM6Cfbbpv9'
    },
    {
      name: 'Sreshta Marvel',
      address: '2nd floor, Sreshta Marvel, Sy.No.136, Kondapur Main Road, P Janardhan Reddy Nagar, Gachibowli, Hyderabad, Telangana 500032',
      image: srestamarvel,
      email: 'marketing@isprout.in',
      phone: '8464999920',
      mapLink: 'https://maps.app.goo.gl/dRTsBERB7BwS5w3cA'
    },
    {
      name: 'Modern Profound',
      address: 'iSprout - Modern Profound, 2nd Floor, Survey No. 12, Office No. 201, Kondapur, Hyderabad, Telangana, 500032',
      image: modernprofound,
      email: 'marketing@isprout.in',
      phone: '8464999920',
      mapLink: 'https://maps.app.goo.gl/sJL7KNnaDXhMA1HS9'
    }
  ],
  'Bengaluru': [
    {
      name: 'N R Enclave',
      address: 'DivyaSree N R Enclave, 1st Main Rd, KIADB Export Promotion Industrial Area, Whitefield, Bengaluru, Karnataka 560066',
      image: nrenclave,
      email: 'marketing@isprout.in',
      phone: '8464999920',
      mapLink: 'https://maps.app.goo.gl/VnTWE8v4hE2mTqSn7'
    },
    {
      name: 'Shilpitha Tech Park',
      address: 'iSprout - Shilpitha Tech Park, Sakra World Hospital, 55/3 55/4, Shilpitha Tech Park - Maithri Developers, Devarabisanahalli Road Bellandur, Kariyammana Agrahara, Bengaluru Karnataka 560103',
      image: shilpithatechpark,
      email: 'marketing@isprout.in',
      phone: '8464999920',
      mapLink: 'https://maps.app.goo.gl/VnTWE8v4hE2mTqSn7'
    },
    {
      name: 'Prestige Saleh Ahmed',
      address: '132, Lady Curzon Rd, Tasker Town, Infantry Road, Bangalore, 560001',
      image: prestigesalehahmed,
      email: 'marketing@isprout.in',
      phone: '8464999920',
      mapLink: 'https://maps.app.goo.gl/VnTWE8v4hE2mTqSn7'
    }
  ],
  'Pune': [
    {
      name: 'Pune - Hinjewadi',
      address: 'iSprout - Panchshil Techpark, 4th Floor, Survey No 19, 20, Hinjawadi Village, Hinjawadi, Pune, Pimpri-Chinchwad, Maharashtra 411057',
      image: punehinjewadi,
      email: 'marketing@isprout.in',
      phone: '8464999920',
      mapLink: 'https://maps.app.goo.gl/VnTWE8v4hE2mTqSn7'
    },
    {
      name: 'Pune - Yerwada',
      address: 'iSprout Panchsil Tech Park One, Tower "E", 191 IBM TECH PARK, Shastrinagar, Yerawada, Pune, Maharashtra 411006',
      image: puneyerwada,
      email: 'marketing@isprout.in',
      phone: '8464999920',
      mapLink: 'https://maps.app.goo.gl/VnTWE8v4hE2mTqSn7'
    },
    {
      name: 'Grey Stone',
      address: 'iSprout GreyStone Tremont HQ7F+WFP, Near Kargar Facility Management Services, Veerbhadra Nagar, Baner, Pune, Maharashtra 411045',
      image: greystone,
      email: 'marketing@isprout.in',
      phone: '8464999920',
      mapLink: 'https://maps.app.goo.gl/VnTWE8v4hE2mTqSn7'
    }
  ],
  'Chennai': [
    {
      name: 'S M Tower',
      address: 'iSprout - SM Towers, 5th & 6th Floors of Saravana Matrix Tower,No.2 / 88, Seevaram Village. OMR. Perungudi, Chennai – 600 096',
      image: smtower,
      email: 'marketing@isprout.in',
      phone: '8464999920',
      mapLink: 'https://maps.app.goo.gl/VnTWE8v4hE2mTqSn7'
    },
    {
      name: 'Sigapi Achi Building',
      address: 'Sigapi Achi Building, Marshalls Rd, Egmore, Chennai, Tamil Nadu 600008',
      image: sigapiachi,
      email: 'marketing@isprout.in',
      phone: '8464999920',
      mapLink: 'https://maps.app.goo.gl/VnTWE8v4hE2mTqSn7'
    },
    {
      name: 'Jade',
      address: 'iSprout Kochar Jade - 5th Floor, Kochar Jade, Ambedkar Nagar, SIDCO Industrial Estate, Guindy, Chennai, Tamil Nadu – 600 032',
      image: kocharjade,
      email: 'marketing@isprout.in',
      phone: '8464999920',
      mapLink: 'https://maps.app.goo.gl/VnTWE8v4hE2mTqSn7'
    }
  ],
  'Vijayawada': [
    {
      name: 'Benz Circle',
      address: 'iSprout Business Centre Vijayawada | Inspiring Co-working spaces. #41-14-8/2, Opp Mouli Towers, Near Jyothi Convention Hall, Benz circle, Vijayawada – 520 010',
      image: benzcircle,
      email: 'marketing@isprout.in',
      phone: '8464999920',
      mapLink: 'https://maps.app.goo.gl/VnTWE8v4hE2mTqSn7'
    },
    {
      name: 'Medha Towers',
      address: 'Sy. No. 53, Kesarapalli, IT Park Rd, Gannavaram, Vijayawada, Andhra Pradesh 521102',
      image: medhatowers,
      email: 'marketing@isprout.in',
      phone: '8464999920',
      mapLink: 'https://maps.app.goo.gl/VnTWE8v4hE2mTqSn7'
    }
  ],
  'Kolkata': [
    {
      name: 'Godrej Waterside',
      address: 'Street No. 13, DP Block, Sector V, Bidhannagar, Kolkata, West Bengal 700091',
      image: godrejwaterside,
      email: 'marketing@isprout.in',
      phone: '8464999920',
      mapLink: 'https://maps.app.goo.gl/VnTWE8v4hE2mTqSn7'
    }
  ],
  'Ahmedabad': [
    {
      name: 'Aurelien',
      address: 'XFRQ+R4P, Makarba, Ahmedabad, Sarkhej-Okaf, Gujarat 380054',
      image: aurelien,
      email: 'marketing@isprout.in',
      phone: '8464999920',
      mapLink: 'https://maps.app.goo.gl/VnTWE8v4hE2mTqSn7'
    }
  ],
  'Gurugram': [
    {
      name: 'HQ27',
      address: 'B-660, 5th floor, Sushant Lok Phase I, Sector 27, Gurugram, Haryana 122009',
      image: hq27,
      email: 'marketing@isprout.in',
      phone: '8464999920',
      mapLink: 'https://maps.app.goo.gl/VnTWE8v4hE2mTqSn7'
    }
  ]
};

const LocationContact: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('Hyderabad');
  const cities = Object.keys(locationsData);

  return (
    <div className="w-full">
      {/* Cities Tabs */}
      <div className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-4 md:gap-8 py-4 scrollbar-hide">
            {cities.map(city => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`text-lg md:text-xl whitespace-nowrap pb-2 transition-colors ${
                  selectedCity === city
                    ? 'text-black border-b-2 border-black font-semibold'
                    : 'text-[#a4a4a4] hover:text-black'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="py-6 md:py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {locationsData[selectedCity]?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {locationsData[selectedCity].map((location, index) => (
                <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                  <div className="relative h-96">
                    <img 
                      src={location.image} 
                      alt={location.name} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
                    
                    <div className="absolute top-4 left-4">
                      <h3 className="text-xl md:text-2xl font-bold bg-linear-to-b from-black to-[#666] bg-clip-text text-transparent drop-shadow-lg" style={{ WebkitTextFillColor: 'transparent' }}>
                        {location.name}
                      </h3>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/30 ">
                      <p className="text-white text-sm mb-4 line-clamp-3">{location.address}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-white shrink-0" />
                          <a 
                            href={`mailto:${location.email}`} 
                            className="text-white! text-xs underline hover:text-yellow-400! transition-colors truncate"
                          >
                            {location.email}
                          </a>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-white shrink-0" />
                          <a 
                            href={`tel:+91${location.phone}`}
                            className="text-white! text-xs hover:text-yellow-400! transition-colors"
                          >
                            {location.phone}
                          </a>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-white shrink-0" />
                          <a
                            href={location.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white! text-sm hover:text-yellow-400! transition-colors underline"
                          >
                            View on maps
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No locations available in {selectedCity}</p>
            </div>
          )}
        </div>

        {/* Social Media Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            Connect with us on <span className="font-bold">Social Media</span>
          </h2>
          <div className="flex justify-center gap-4 md:gap-6">
            <a
              href='https://www.facebook.com/isprout'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:opacity-70 transition-opacity'
            >
              <img
                src={facebook}
                alt='Facebook'
                className='w-10 h-10 md:w-12 md:h-12'
              />
            </a>
            <a
              href='https://www.instagram.com/isproutcoworkingspace/'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:opacity-70 transition-opacity'
            >
              <img
                src={instagram}
                alt='Instagram'
                className='w-10 h-10 md:w-12 md:h-12'
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
                className='w-10 h-10 md:w-12 md:h-12'
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
                className='w-10 h-10 md:w-12 md:h-12'
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
                className='w-10 h-10 md:w-12 md:h-12'
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationContact;
