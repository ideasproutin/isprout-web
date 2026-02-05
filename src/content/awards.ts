export interface AwardsHeroContent {
	title: string;
	description: string;
}

export interface AwardSectionContent {
	title: string;
	paragraphs: string[];
}

export interface AwardCard {
	id: number;
	title: string;
	description: string;
	year: string;
	mainImage: string;
	thumbnailImage: string;
}

export interface AwardsPageContent {
	heading: string;
	subheading: string;
	awards: AwardCard[];
}

export const awardsHeroContent: AwardsHeroContent = {
	title: "Awards and Achievements",
	description:
		"At iSprout, excellence isn't an act — it's our identity. Our commitment to innovation, service quality, and workspace experience has earned us multiple recognitions across the country. These awards reflect our journey of transforming offices into dynamic, future-ready work environments.",
};

export const awardsPageContent: AwardsPageContent = {
	heading: "Our Awards & Recognition",
	subheading: "Celebrating milestones, excellence, and trust earned over the years.",
	awards: [
		{
			id: 1,
			title: "Best Managed Workspace Provider",
			description: "iSprout has been honored with the Managed Offices Brand of the Year award, recognizing its commitment to redefining workspaces and enabling business growth. This achievement reflects the trust of clients and partners and the dedication of the iSprout team in delivering innovative managed office solutions.",
			year: "2024",
			mainImage: "/src/assets/awards_achievements/managedofficebrand.png",
			thumbnailImage: "/src/assets/awards_achievements/managedofficebrand-img.jpg",
		},
		{
			id: 2,
			title: "Outlook Business Spotlight Award",
			description: "iSprout Coworking Spaces, led by CEO & Co-founder Sundari Patibandla, was honored at the Outlook Business Spotlight Awards. This recognition highlights iSprout’s leadership-driven approach to coworking innovation and its continued contribution to advancing flexible workspace solutions.",
			year: "2021",
			mainImage: "/src/assets/awards_achievements/outlookbusinessspotlight.png",
			thumbnailImage: "/src/assets/awards_achievements/outlookbusinessspotlight-img.jpg",
		},
		{
			id: 3,
			title: "SIBA Award",
			description: "Under the leadership of CEO Sundari Patibandla, iSprout has emerged as a flexible workspace leader. Her forward-thinking vision and commitment to collaborative work environments have been recognized with the Woman Entrepreneur Award.",
			year: "2024",
			mainImage: "/src/assets/awards_achievements/SIBA.png",
			thumbnailImage: "/src/assets/awards_achievements/SIBA-img.jpg",
		},
		{
			id: 4,
			title: "Times Business Awards",
			description: "Sundari Patibandla of iSprout Business Centre received the Best Co-working & Enterprise Office Space award, recognizing iSprout’s leadership in delivering premium workspaces, high-end amenities, and professional business environments designed for modern enterprises.",
			year: "2019",
			mainImage: "/src/assets/awards_achievements/timesbusiness.png",
			thumbnailImage: "/src/assets/awards_achievements/timesbusinessaward-img.jpg",
		},
		{
			id: 5,
			title: "Women Leader Award",
			description: "Sundari Patibandla of iSprout was honored with the Woman Leader Award by The CEO Club India, recognizing her leadership, resilience, and contribution to building a strong and future-ready workspace brand. The award reflects her commitment to innovation, growth, and empowering teams and communities.",
			year: "2025",
			mainImage: "/src/assets/awards_achievements/womenleader.png",
			thumbnailImage: "/src/assets/awards_achievements/womenleader-img.jpg",
		},
	],
};

