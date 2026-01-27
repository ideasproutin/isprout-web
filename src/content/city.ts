const cityData = [
	{
		city: "Hyderabad",
		country: "India",
		images: [
			"/images/hyderabad1.jpg",
			"/images/hyderabad2.jpg",
			"/images/hyderabad3.jpg",
		],
		cityDescription:
			"Hey there, Hyderabad folks! Looking for a workspace that's as dynamic and exciting as your business ideas? Well, you're in luck! iSprout's flexible managed offices in the city are designed to get your creative juices flowing and your productivity soaring. From solo entrepreneurs cooking up the next big thing to growing startups making waves, these spaces are buzzing with opportunity and collaboration. Whether you choose the sleek vibes of Orbit, My Home Twitza, One Golden Mile, Sohini Tech Park, Jayabheri Trendset Connect, Divyasree Trinity, Purva Summit, Modern Profound, Minaas, Pranava One, and Sreshta Marvel, you'll find state-of-the-art facilities, comfy work areas, and a community of like-minded go-getters. So why settle for a boring office when you can be part of Hyderabad's most inspiring workspace revolution at iSprout ?",
		coordinates: [
			{ center_name: "Orbit", lat: 17.385044, lng: 78.486671 },
			{ center_name: "Twitza", lat: 17.385044, lng: 78.486671 },
			{ center_name: "One Golden Mile", lat: 17.385044, lng: 78.486671 },
			{ center_name: " ", lat: 17.385044, lng: 78.486671 },
			{
				center_name: "Jayabheri Trendset Connect",
				lat: 17.385044,
				lng: 78.486671,
			},
		],
		ceneterMenu: [
			"Orbit",
			"Twitza",
			"One Golden Mile",
			"Sohini Tech Park",
			"Jayabheri Trendset Connect",
		],
		centers: [
			{
				name: "Orbit",
				address: "Gachibowli, Hyderabad",
				contact: "1234567890",
				email: "orbit@example.com",
				redirect: "/centre/orbit",
				exploreMore: "https://maps.app.goo.gl/QSXWWWCVAgqDZ78k7",
				images: [
					"/images/hyderabad1.jpg",
					"/images/hyderabad2.jpg",
					"/images/hyderabad3.jpg",
				],
				centerMenu: ["about", "amenities", "location"],
				menuContent: [
					{
						section: "about",
						content:
							"Orbit is a premier coworking space located in the heart of Gachibowli, Hyderabad. Designed to foster creativity and collaboration, Orbit offers state-of-the-art facilities, flexible workspaces, and a vibrant community of professionals. Whether you're a freelancer, startup, or established business, Orbit provides the perfect environment to grow and succeed.",
					},
					{ aminities: ["logo1", "logo2"] },
					{ location: "map" },
				],
			},
			{
				name: "Twitza",
				address: "Hitech City, Hyderabad",
				contact: "0987654321",
			},
		],
	},
	{
		city: "Bangalore",
		country: "India",
		images: [],
		cityDescription:
			"Welcome to Bangalore, the Silicon Valley of India! If you're on the hunt for a workspace that matches the city's innovative spirit, look no further than iSprout's flexible managed offices. Whether you're a solo entrepreneur or part of a growing startup, our workspaces in Bangalore are designed to fuel your creativity and productivity. With locations in Manyata Tech Park, Whitefield, Koramangala, and Electronic City, you'll have access to state-of-the-art facilities, comfortable work areas, and a vibrant community of like-minded professionals. So why settle for an ordinary office when you can be part of Bangalore's most dynamic workspace revolution at iSprout?",
		coordinates: [],
	},
];

export default cityData;
