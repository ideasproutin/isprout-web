const public_endpoints = {
	// About Us
	aboutUs: "/core/static/website/about-us/index.json",

	// Blogs
	blogs: "/core/static/website/blogs/index.json",

	// Careers
	careers: "/core/static/website/careers/index.json",

	// Cities & Centers
	cityCenters: "/core/static/website/cities-centers/index.json",

	// FAQs
	faqs: "/core/static/website/faqs/index.json",

	// News
	news: "/core/static/website/news/index.json",

	// Privacy Policy
	privacyPolicy: "/core/static/website/privacy/index.json",

	// Terms and Conditions
	termsAndConditions: "/core/static/website/terms-condition/index.json",

	// Refund Policy
	refundPolicy: "/core/static/website/refund-policy/index.json",
	// Cancellation Policy
	cancellationPolicy: "/core/static/website/cancellation-policy/index.json",

	// form
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

	// User Form Submissions
	getUserForms: "/core/site/users/get-user-form",

	// User Transactions
	getUserTransactions: "/core/site/users/get-user-transaction",

	// Booking Management
	cancelBooking: "/bookings/orders/cancel-booking",
}

export { public_endpoints, dashboardendpoints };

export default public_endpoints;
