const API_ENDPOINTS = {
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

export { API_ENDPOINTS };
export default API_ENDPOINTS;
