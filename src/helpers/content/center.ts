const centerData = {
    city: "Hyderabad",
    country: "India",
    images : [
        "/images/hyderabad1.jpg",
    ],
    cityDescription: "Hey there, Hyderabad folks! Looking for a workspace that's as dynamic and exciting as your business ideas? Well, you're in luck! iSprout's flexible managed office spaces in the city are designed to get your creative juices flowing and your productivity soaring. From solo entrepreneurs cooking up the next big thing to growing startups making waves, these spaces are buzzing with opportunity and collaboration. Whether you choose the sleek vibes of Orbit, My Home Twitza, One Golden Mile, Sohini Tech Park, Jayabheri Trendset Connect, Divyasree Trinity, Purva Summit, Modern Profound, Minaas, Pranava One, and Sreshta Marvel, you'll find state-of-the-art facilities, comfy work areas, and a community of like-minded go-getters. So why settle for a boring office when you can be part of Hyderabad's most inspiring workspace revolution at iSprout ?",
    coordinates : [
        {center_name: "Orbit", lat: 17.385044, lng: 78.486671},
        {center_name: "Twitza", lat: 17.385044, lng: 78.486671},
        {center_name: "One Golden Mile", lat: 17.385044, lng: 78.486671},
        {center_name: "Sohini Tech Park", lat: 17.385044, lng: 78.486671},
        {center_name: "Jayabheri Trendset Connect", lat: 17.385044, lng: 78.486671},
    ],
    formDetails: {
        title: "Book a Tour",
        subtitle: "Fill out the form below and we'll get back to you shortly",
        fields: [
            {
                name: "fullName",
                label: "Full Name:",
                type: "text",
                placeholder: "",
                required: true,
                icon: "user"
            },
            {
                name: "workEmail",
                label: "Work Email:",
                type: "email",
                placeholder: "",
                required: true,
                icon: "email"
            },
            {
                name: "phoneNumber",
                label: "Phone Number:",
                type: "tel",
                placeholder: "",
                required: true,
                icon: "phone"
            },
            {
                name: "companyName",
                label: "Company Name:",
                type: "text",
                placeholder: "",
                required: true,
                icon: "building"
            },
            {
                name: "requirements",
                label: "Select Your Requirements:",
                type: "select",
                placeholder: "Select...",
                required: true,
                options: []
            },
            {
                name: "city",
                label: "City:",
                type: "select",
                placeholder: "Hyderabad",
                required: true,
                options: ["Hyderabad", "Bengaluru", "Pune", "Chennai", "Vijayawada", "Kolkata", "Ahmedabad", "Gurugram"]
            },
            {
                name: "office",
                label: "Office:",
                type: "select",
                placeholder: "One Gold Mile",
                required: true,
                options: ["One Gold Mile", "Orbit", "Twitza", "Sohini Tech Park", "Jayabheri Trendset Connect", "Divyasree Trinity"]
            },
            {
                name: "managerCabin",
                label: "Manager Cabin",
                type: "checkbox",
                required: false
            },
            {
                name: "conferenceRoom",
                label: "Conference Room",
                type: "checkbox",
                required: false
            },
            {
                name: "requiredSeats",
                label: "Required Seats:",
                type: "number",
                placeholder: "1",
                required: true,
                min: 1,
                max: 100
            },
            {
                name: "termsAccepted",
                label: "I accept all of iSprout's terms & conditions",
                type: "checkbox",
                required: true
            }
        ],
        submitButtonText: "Submit"
    }
};