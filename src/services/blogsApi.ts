import apiClient from "./api";

export interface Blog {
	id: string;
	image: string;
	date: string;
	title: string;
	category: string;
	keywords?: string[];
	content: string;
}

interface ApiBlogIndex {
	id: string;
	image_url: string;
	heading: string;
	tags: string[];
	date: string;
	meta_data: string;
}

interface ApiBlogDetail {
	heading: string;
	date: string;
	tags: string[];
	image_url: string;
	meta_descritpion: string[];
	points_description: {
		title: string;
		description: string[];
	}[];
	conclusion: string[];
}

const transformApiBlogIndexToBlog = (apiBlog: ApiBlogIndex): Blog => {
	return {
		id: apiBlog.id,
		image: apiBlog.image_url,
		date: apiBlog.date,
		title: apiBlog.heading,
		category: apiBlog.tags[0] || "General",
		keywords: apiBlog.tags,
		content: apiBlog.meta_data,
	};
};

const transformApiBlogDetailToBlog = (apiBlog: ApiBlogDetail, blogId: string): Blog => {
	// Build HTML content from API structure
	let htmlContent = "";

	// Add meta description paragraphs
	if (apiBlog.meta_descritpion && apiBlog.meta_descritpion.length > 0) {
		apiBlog.meta_descritpion.forEach((para) => {
			htmlContent += `<p>${para}</p>`;
		});
	}

	// Add points with titles and descriptions
	if (apiBlog.points_description && apiBlog.points_description.length > 0) {
		apiBlog.points_description.forEach((point) => {
			htmlContent += `<h2>${point.title}</h2>`;
			if (point.description && point.description.length > 0) {
				point.description.forEach((desc) => {
					htmlContent += `<p>${desc}</p>`;
				});
			}
		});
	}

	// Add conclusion section
	if (apiBlog.conclusion && apiBlog.conclusion.length > 0) {
		htmlContent += `<h2>Final Thought</h2>`;
		apiBlog.conclusion.forEach((para) => {
			htmlContent += `<p>${para}</p>`;
		});
	}

	return {
		id: blogId,
		image: apiBlog.image_url,
		date: apiBlog.date,
		title: apiBlog.heading,
		category: apiBlog.tags[0] || "General",
		keywords: apiBlog.tags,
		content: htmlContent,
	};
};

export const getBlogsIndex = async (): Promise<Blog[]> => {
	try {
		const response = await apiClient.get<ApiBlogIndex[]>("/core/static/website/blogs/index.json");
		return response.data.map(transformApiBlogIndexToBlog);
	} catch (error) {
		console.error("Error fetching blogs index:", error);
		throw error;
	}
};

export const getBlogById = async (blogId: string): Promise<Blog> => {
	try {
		const response = await apiClient.get<ApiBlogDetail>(`/core/static/website/blogs/${blogId}/index.json`);
		return transformApiBlogDetailToBlog(response.data, blogId);
	} catch (error) {
		console.error(`Error fetching blog ${blogId}:`, error);
		throw error;
	}
};
