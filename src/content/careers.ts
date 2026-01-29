// careers.ts - Step-by-step organized careers data

export interface JobData {
	title: string;
	location: string;
	experience: string;
	type: string;
	postedDate: string;
	industry: string;
	qualification: string;
	description: string;
	keyResponsibilities: string[];
}

export interface JobCategory {
	step: number;
	category: string;
	jobs: JobData[];
}

export const careersData = {
	// Filter options
	filterOptions: {
		departments: [
			"Select Department",
			"Software Developer",
			"Real Estate Manager",
			"Digital Marketing",
			"Sales",
			"Operations",
		],
		locations: [
			"Select Location",
			"Hyderabad",
			"Bengaluru",
			"Chennai",
			"Kolkata",
		],
		jobTypes: ["Select Job Type", "Full-time", "Part-time", "Contract"],
	},

	// Step-by-step job listings organized by category
	jobListingsByStep: [
		// Step 1: Tech
		{
			step: 1,
			category: "Tech",
			jobs: [
				{
					title: "Back-end Developer",
					location: "Hyderabad, Telangana, India",
					experience: "2-3 Years",
					type: "Full-time",
					postedDate: "24 Dec 2025",
					industry: "Coworking / Real Estate / Commercial Spaces",
					qualification: "BTECH in Computer Science or related field",
					description:
						"We are seeking a skilled Back-end Developer to join our technology team. You will be responsible for server-side web application logic, integration of work front-end developers do, and developing high-performance applications. Your work will directly impact the efficiency and scalability of our coworking space management platform.",
					keyResponsibilities: [
						"Design and develop scalable backend services",
						"Optimize database queries and improve performance",
						"Collaborate with frontend developers and product teams",
						"Implement RESTful APIs and microservices",
						"Write unit tests and maintain code documentation",
					],
				},
			],
		},
		// Step 2: Digital Marketing
		{
			step: 2,
			category: "Digital Marketing",
			jobs: [
				{
					title: "Graphic Designer",
					location: "Hyderabad",
					experience: "2-3 Years",
					type: "Full-time",
					postedDate: "1 week ago",
					industry: "Marketing & Communications",
					qualification:
						"Diploma/Degree in Graphic Design or related field",
					description:
						"Join our creative team as a Graphic Designer. You'll create visually stunning designs for our marketing campaigns, social media, and digital platforms.",
					keyResponsibilities: [
						"Create engaging visual content for marketing campaigns",
						"Design social media graphics and promotional materials",
						"Collaborate with marketing teams on brand consistency",
						"Develop design concepts and mockups",
						"Stay updated with latest design trends",
					],
				},
				{
					title: "Content Writer",
					location: "Hyderabad",
					experience: "1-3 Years",
					type: "Full-time",
					postedDate: "3 days ago",
					industry: "Marketing & Communications",
					qualification:
						"B.A in English, Journalism, or related field",
					description:
						"We seek a talented Content Writer to produce high-quality content for our blog, website, and social media channels. You'll help tell our brand story.",
					keyResponsibilities: [
						"Write SEO-optimized blog posts and articles",
						"Create social media content and captions",
						"Develop email marketing campaigns",
						"Edit and proofread content for quality",
						"Research industry trends and topics",
					],
				},
			],
		},
		// Step 3: Sales
		{
			step: 3,
			category: "Sales",
			jobs: [
				{
					title: "Real Estate Manager",
					location: "Hyderabad",
					experience: "5-8 Years",
					type: "Full-time",
					postedDate: "1 week ago",
					industry: "Real Estate",
					qualification:
						"Bachelor's degree in Business or Real Estate",
					description:
						"Lead our real estate operations in Hyderabad. Manage client relationships, oversee property portfolios, and drive revenue growth.",
					keyResponsibilities: [
						"Manage real estate portfolio and client relationships",
						"Develop sales strategies and market analysis",
						"Lead and motivate sales team members",
						"Negotiate contracts and close deals",
						"Monitor market trends and competition",
					],
				},
				{
					title: "Sales Manager",
					location: "Kolkata",
					experience: "5+ Years",
					type: "Full-time",
					postedDate: "4 days ago",
					industry: "Sales",
					qualification: "B.Com or Business Management degree",
					description:
						"Take charge as Sales Manager for our Kolkata branch. Build and lead a high-performing sales team to achieve ambitious targets.",
					keyResponsibilities: [
						"Manage and train sales team",
						"Develop regional sales strategies",
						"Achieve and exceed sales targets",
						"Build client relationships and partnerships",
						"Conduct performance reviews and coaching",
					],
				},
			],
		},
		// Step 4: Operations
		{
			step: 4,
			category: "Operations",
			jobs: [
				{
					title: "Cluster Head",
					location: "Bengaluru",
					experience: "3 Years",
					type: "Full-time",
					postedDate: "5 days ago",
					industry: "Operations Management",
					qualification: "MBA or B.Tech in Operations/Supply Chain",
					description:
						"Oversee operations for our Bengaluru cluster. Manage facilities, teams, and processes to ensure smooth business operations.",
					keyResponsibilities: [
						"Oversee daily cluster operations",
						"Manage facility maintenance and resources",
						"Lead and develop operations team",
						"Implement efficiency improvements",
						"Ensure compliance with company policies",
					],
				},
				{
					title: "Site Engineer",
					location: "Kolkata",
					experience: "2-3 Years",
					type: "Full-time",
					postedDate: "1 week ago",
					industry: "Engineering & Construction",
					qualification: "B.E/B.Tech in Civil/Mechanical Engineering",
					description:
						"As Site Engineer, you'll oversee construction and site management operations. Ensure projects are completed on time and within budget.",
					keyResponsibilities: [
						"Manage construction site operations",
						"Ensure safety and quality standards",
						"Monitor project timelines and budgets",
						"Coordinate with contractors and vendors",
						"Maintain site documentation and reports",
					],
				},
			],
		},
	],

	// Stats section for info strip
	stats: [
		{ number: "9", label: "Cities" },
		{ number: "28", label: "Centres" },
		{ number: "350+", label: "Clients" },
		{ number: "39k+", label: "Workstations" },
	],

	// Key highlights
	highlights: [
		{
			title: "Company Culture",
			icon: "companyCultureIcon",
		},
		{
			title: "Work Life",
			icon: "workLifeIcon",
		},
		{
			title: "All over India",
			icon: "flightIcon",
		},
	],

	// Awards & Recognition
	awards: [
		{ year: "2025", title: "Women Leader Award" },
		{ year: "2024", title: "SIBA Awards" },
		{ year: "2024", title: "Managed office Brand Of The Year" },
		{ year: "2021", title: "Outlook Business Spotlight Awards" },
		{ year: "2019", title: "Times Business Award" },
	],
};
