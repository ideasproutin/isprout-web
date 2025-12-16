import orbit from '../assets/ourlocations/orbit.png';
import ogm from '../assets/ourlocations/ogm.png';
import myhometwitza from '../assets/ourlocations/myhometwitza.png';
import jayabheri from '../assets/ourlocations/jayabheri.png';
import sohini from '../assets/ourlocations/sohini.png';
import divyasree from '../assets/ourlocations/divyasree.png';

const ourLocations = [
    {
        city: "Hyderabad",
        cityRedirect: "/city/hyderabad",
        centersCount: 6,
        centers: [
            { center_name: "Orbit", centreRedirect: "/centre/orbit", location: "Orbit Knowledge City, Hyderabad", image: orbit },
            { center_name: "One Golden Mile", centreRedirect: "/centre/one-golden-mile", location: "One Golden Mile, Kokapet, Hyderabad", image: ogm },
            { center_name: "My Home Twitza", centreRedirect: "/centre/my-home-twitza", location: "My Home Twitza, Hitec City, Hyderabad", image: myhometwitza },
            { center_name: "Jayabheri Trendset", centreRedirect: "/centre/jayabheri-trendset", location: "Jayabheri Trendset Connect, Gachibowli, Hyderabad", image: jayabheri },
            { center_name: "Sohini Tech Park", centreRedirect: "/centre/sohini-tech-park", location: "Sohini Tech Park, Gachibowli, Hyderabad", image: sohini },
            { center_name: "Divyasree Trinity", centreRedirect: "/centre/divyasree-trinity", location: "Divyasree Trinity, Hitec City, Hyderabad", image: divyasree },
        ]
    },
    {
        city: "Bangalore",
        cityRedirect: "/city/bangalore",
        centersCount: 4,
        centers: [
            { center_name: "Manyata Tech Park", centreRedirect: "/centre/manyata-tech-park", location: "Manyata Tech Park, Bangalore", image: orbit },
            { center_name: "Whitefield Center", centreRedirect: "/centre/whitefield-center", location: "Whitefield, Bangalore", image: ogm },
            { center_name: "Koramangala Hub", centreRedirect: "/centre/koramangala-hub", location: "Koramangala, Bangalore", image: myhometwitza },
            { center_name: "Electronic City", centreRedirect: "/centre/electronic-city", location: "Electronic City, Bangalore", image: jayabheri },
        ]
    },
    {
        city: "Chennai",
        cityRedirect: "/city/chennai",
        centersCount: 3,
        centers: [
            { center_name: "OMR Center", centreRedirect: "/centre/omr-center", location: "Old Mahabalipuram Road, Chennai", image: sohini },
            { center_name: "Guindy Business Park", centreRedirect: "/centre/guindy-business-park", location: "Guindy, Chennai", image: divyasree },
            { center_name: "Thoraipakkam Hub", centreRedirect: "/centre/thoraipakkam-hub", location: "Thoraipakkam, Chennai", image: orbit },
        ]
    },
    {
        city: "Mumbai",
        cityRedirect: "/city/mumbai",
        centersCount: 5,
        centers: [
            { center_name: "BKC Center", centreRedirect: "/centre/bkc-center", location: "Bandra Kurla Complex, Mumbai", image: ogm },
            { center_name: "Andheri West", centreRedirect: "/centre/andheri-west", location: "Andheri West, Mumbai", image: myhometwitza },
            { center_name: "Lower Parel Hub", centreRedirect: "/centre/lower-parel-hub", location: "Lower Parel, Mumbai", image: jayabheri },
            { center_name: "Powai Business Center", centreRedirect: "/centre/powai-business-center", location: "Powai, Mumbai", image: sohini },
            { center_name: "Navi Mumbai", centreRedirect: "/centre/navi-mumbai", location: "Navi Mumbai, Mumbai", image: divyasree },
        ]
    },
    {
        city: "Pune",
        cityRedirect: "/city/pune",
        centersCount: 3,
        centers: [
            { center_name: "Hinjewadi IT Park", centreRedirect: "/centre/hinjewadi-it-park", location: "Hinjewadi Phase 1, Pune", image: orbit },
            { center_name: "Baner Center", centreRedirect: "/centre/baner-center", location: "Baner, Pune", image: ogm },
            { center_name: "Kharadi Hub", centreRedirect: "/centre/kharadi-hub", location: "Kharadi, Pune", image: myhometwitza },
        ]
    }
];

export default ourLocations;