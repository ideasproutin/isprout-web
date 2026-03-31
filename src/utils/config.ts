const appConfig = {
	apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "",
	apiVersionPath: "/api/v2",
};

const public_endpoints = {
	// About Us
	aboutUs: "/core/static/website/about-us/index.json",

	// Blogs
	blogs: "/core/site/blogs/get-all",
	blogById: "/core/site/blogs/get",

	// Careers
	careers: "/core/site/career/get-jobs",

	// Cities & Centers
	cityCenters: "/core/static/website/cities-centers/index.json",

	// FAQs
	faqs: "/core/static/website/faqs/index.json",

	// News
	news: "/core/site/news/get-all",

	// Site popup
	sitePopup: "/core/site/popup/get-popup",

	// Privacy Policy
	privacyPolicy: "/core/static/website/privacy/index.json",

	// Terms and Conditions
	termsAndConditions: "/core/static/website/terms-condition/index.json",

	// Refund Policy
	refundPolicy: "/core/static/website/refund-policy/index.json",
	// Cancellation Policy
	cancellationPolicy: "/core/static/website/cancellation-policy/index.json",

	// form
	getForms: "/core/site/forms/get-forms",
	formSubmit: "/core/site/forms/submit-form",

	//centre-seo
	getCentreSEO: "/core/static/website/seo-centre",

	// meeting room
	getMeetingRooms: "/core/site/meeting-rooms/get-meeting-room-calendar-view",
	getMeetingRoomsByDateAndCenter:
		"/core/site/meeting-rooms/get-meeting-room-calendar-view",
};

const dashboardendpoints = {
	// Auth
	authenticateUser: "/auth/site/authenticate-user",
	verifyUser: "/auth/site/verify-user",

	// User Profile
	getUser: "/core/site/users/get-user",
	updateUser: "/core/site/users/update-user",
	uploadProfilePicture: "/core/site/users/upload-profile-picture",

	// Meeting Room Booking Data
	getMeetingRoomBookingData: "/bookings/site/meeting-rooms/get-booking-data",

	// Virtual Office Data
	getVirtualOfficeData: "/core/site/forms/get-virtual-office-data",

	// Booking Management
	cancelBooking: "/bookings/site/meeting-rooms/cancel-booking",
};

export { public_endpoints, dashboardendpoints };

export { appConfig };

export default public_endpoints;
