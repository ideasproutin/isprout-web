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
			description: "Awarded for delivering innovative, scalable, and people-centric workspace solutions across multiple cities.",
			year: "2024",
			mainImage: "/src/assets/awards_achievements/managedofficebrand.png",
			thumbnailImage: "/src/assets/awards_achievements/managedofficebrand-img.jpg",
		},
		{
			id: 2,
			title: "Excellence in Customer Service",
			description: "Recognized for outstanding customer support and service excellence.",
			year: "2023",
			mainImage: "/src/assets/awards_achievements/outlookbusinessspotlight.png",
			thumbnailImage: "/src/assets/awards_achievements/outlookbusinessspotlight-img.jpg",
		},
		{
			id: 3,
			title: "Innovative Company of the Year",
			description: "Honored for groundbreaking innovation and industry leadership.",
			year: "2022",
			mainImage: "/src/assets/awards_achievements/SIBA.png",
			thumbnailImage: "/src/assets/awards_achievements/SIBA-img.jpg",
		},
		{
			id: 4,
			title: "Times Business Awards",
			description: "Recognized by Times Business Awards for transformative impact in the flexible workspace sector and commitment to excellence.",
			year: "2023",
			mainImage: "/src/assets/awards_achievements/timesbusiness.png",
			thumbnailImage: "/src/assets/awards_achievements/timesbusinessaward-img.jpg",
		},
		{
			id: 5,
			title: "Women Leader Award",
			description: "Celebrating women leadership in business and empowering women in the workplace.",
			year: "2024",
			mainImage: "/src/assets/awards_achievements/womenleader.png",
			thumbnailImage: "/src/assets/awards_achievements/womenleader-img.jpg",
		},
	],
};

export const sibaAwardsContent: AwardSectionContent = {
	title: "SIBA AWARDS",
	paragraphs: [
		"#dummy-text At iSprout, excellence isn't an act — it's our identity. Our commitment to innovation, service quality, and workspace experience has earned us multiple recognitions across the country.",
		"These awards reflect our journey of transforming offices into dynamic, future-ready work environments. At iSprout, excellence isn't an act — it's our identity.",
		"Our commitment to innovation, service quality, and workspace experience has earned us multiple recognizations across the country.",
		"These awards reflect our journey of transforming offices into dynamic, future-ready work environments.",
	],
};

export const spotlightAwardContent: AwardSectionContent = {
	title: "Outlook Business Spotlight Award",
	paragraphs: [
		"#dummy-text At iSprout, excellence isn't an act — it's our identity.",
		"Our commitment to innovation, service quality, and workspace experience has earned us multiple recognitions across the country.",
		"These awards reflect our journey of transforming offices into dynamic, future-ready work environments. At iSprout, excellence isn't an act — it's our identity.",
		"Our commitment to innovation, service quality, and workspace experience has earned us multiple recognitions across the country.",
		"These awards reflect our journey of transforming offices into dynamic, future-ready work environments.",
	],
};

export const managedOfficeBrandContent: AwardSectionContent = {
	title: "Managed Office Brand Of The Year",
	paragraphs: [
		"#dummy-text At iSprout, excellence isn't an act — it's our identity.",
		"Our commitment to innovation, service quality, and workspace experience has earned us multiple recognitions across the country.",
		"These awards reflect our journey of transforming offices into dynamic, future-ready work environments. At iSprout, excellence isn't an act — it's our identity.",
		"Our commitment to innovation, service quality, and workspace experience has earned us multiple recognitions across the country.",
		"These awards reflect our journey of transforming offices into dynamic, future-ready work environments.",
	],
};

export const timesBusinessContent: AwardSectionContent = {
	title: "Times Business Awards 2019",
	paragraphs: [
		"#dummy-text At iSprout, excellence isn't an act — it's our identity.",
		"Our commitment to innovation, service quality, and workspace experience has earned us multiple recognitions across the country.",
		"These awards reflect our journey of transforming offices into dynamic, future-ready work environments. At iSprout, excellence isn't an act — it's our identity.",
		"Our commitment to innovation, service quality, and workspace experience has earned us multiple recognitions across the country.",
		"These awards reflect our journey of transforming offices into dynamic, future-ready work environments.",
	],
};

export const womenLeaderContent: AwardSectionContent = {
	title: "Women Leader Award",
	paragraphs: [
		"#dummy-text At iSprout, excellence isn't an act — it's our identity.",
		"Our commitment to innovation, service quality, and workspace experience has earned us multiple recognitions across the country.",
		"These awards reflect our journey of transforming offices into dynamic, future-ready work environments. At iSprout, excellence isn't an act — it's our identity.",
		"Our commitment to innovation, service quality, and workspace experience has earned us multiple recognitions across the country.",
		"These awards reflect our journey of transforming offices into dynamic, future-ready work environments.",
	],
};
