import orbit from '../assets/ourlocations/orbit.png';
import ogm from '../assets/ourlocations/ogm.png';
import myhometwitza from '../assets/ourlocations/myhometwitza.png';
import jayabheri from '../assets/ourlocations/jayabheri.png';
import sohini from '../assets/ourlocations/sohini.png';
import divyasree from '../assets/ourlocations/divyasree.png';

const ourLocations = [
    {
        city: "Hyderabad",
        centersCount: 6,
        centers: [
            { center_name: "Orbit", location: "Orbit Knowledge City, Hyderabad", image: orbit },
            { center_name: "One Golden Mile", location: "One Golden Mile, Kokapet, Hyderabad", image: ogm },
            { center_name: "My Home Twitza", location: "My Home Twitza, Hitec City, Hyderabad", image: myhometwitza },
            { center_name: "Jayabheri Trendset", location: "Jayabheri Trendset Connect, Gachibowli, Hyderabad", image: jayabheri },
            { center_name: "Sohini Tech Park", location: "Sohini Tech Park, Gachibowli, Hyderabad", image: sohini },
            { center_name: "Divyasree Trinity", location: "Divyasree Trinity, Hitec City, Hyderabad", image: divyasree },
        ]
    },
    {
        city: "Bangalore",
        centersCount: 4,
        centers: [
            { center_name: "Manyata Tech Park", location: "Manyata Tech Park, Bangalore", image: orbit },
            { center_name: "Whitefield Center", location: "Whitefield, Bangalore", image: ogm },
            { center_name: "Koramangala Hub", location: "Koramangala, Bangalore", image: myhometwitza },
            { center_name: "Electronic City", location: "Electronic City, Bangalore", image: jayabheri },
        ]
    },
    {
        city: "Chennai",
        centersCount: 3,
        centers: [
            { center_name: "OMR Center", location: "Old Mahabalipuram Road, Chennai", image: sohini },
            { center_name: "Guindy Business Park", location: "Guindy, Chennai", image: divyasree },
            { center_name: "Thoraipakkam Hub", location: "Thoraipakkam, Chennai", image: orbit },
        ]
    },
    {
        city: "Mumbai",
        centersCount: 5,
        centers: [
            { center_name: "BKC Center", location: "Bandra Kurla Complex, Mumbai", image: ogm },
            { center_name: "Andheri West", location: "Andheri West, Mumbai", image: myhometwitza },
            { center_name: "Lower Parel Hub", location: "Lower Parel, Mumbai", image: jayabheri },
            { center_name: "Powai Business Center", location: "Powai, Mumbai", image: sohini },
            { center_name: "Navi Mumbai", location: "Navi Mumbai, Mumbai", image: divyasree },
        ]
    },
    {
        city: "Pune",
        centersCount: 3,
        centers: [
            { center_name: "Hinjewadi IT Park", location: "Hinjewadi Phase 1, Pune", image: orbit },
            { center_name: "Baner Center", location: "Baner, Pune", image: ogm },
            { center_name: "Kharadi Hub", location: "Kharadi, Pune", image: myhometwitza },
        ]
    }
];

export default ourLocations;