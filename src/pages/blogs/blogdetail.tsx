import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { MetaTags } from "../../hooks/useMetaTags";
import { COLORS } from "../../helpers/constants/Colors";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import BlogsShare from "./blogsshare";
import RecentPosts from "./recentposts";
import { useBlogs, useBlog } from "../../hooks/useBlogs";

interface BlogDetail {
	heading: string;
	date: string;
	tags?: string[];
	image_url: string;
	image?: string | string[];
	meta_description?: string;
	meta_descritpion?: unknown[];
	points_description?: unknown[];
	points?: unknown[];
	conclusion?: unknown[];
	links?: { [key: string]: string };
	sources?: Array<{
		name: string;
		url: string;
	}>;
	client_name_1?: string;
	disignation_1?: string;
	company_1?: string;
	client_name_2?: string;
	disignation_2?: string;
	company_2?: string;
	[key: string]: unknown; // Allow any additional fields from API
}
const BlogDetail = () => {
	const { blogId } = useParams();

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	}, [blogId]);

	const { data: blogs = [] } = useBlogs();
	const { data: currentBlog, isLoading, isError } = useBlog(blogId);

	if (isLoading) {
		return (
			<div
				className='min-h-screen flex items-center justify-center'
				style={{ backgroundColor: COLORS.white }}
			>
				<MetaTags
					title='iSprout Blog'
					description='Read the latest insights from iSprout on coworking and managed office spaces.'
				/>
				<p
					style={{
						fontFamily: "Outfit, sans-serif",
						color: COLORS.brandBlue,
					}}
				>
					Loading blog...
				</p>
			</div>
		);
	}

	if (isError || !currentBlog) {
		return (
			<div
				className='min-h-screen flex items-center justify-center'
				style={{ backgroundColor: COLORS.white }}
			>
				<MetaTags
					title='iSprout Blog'
					description='Read the latest insights from iSprout on coworking and managed office spaces.'
				/>
				<p
					style={{
						fontFamily: "Outfit, sans-serif",
						color: COLORS.brandBlue,
					}}
				>
					{isError ? "Failed to load blog" : "Blog not found"}
				</p>
			</div>
		);
	}

	// Helper function to fix encoding issues (mojibake)
	const fixEncodingIssues = (text: string): string => {
		let result = text;

		// Method 1: Fix UTF-8 mojibake by matching byte patterns
		// These are UTF-8 bytes misread as Windows-1252/Latin-1
		const mojibakeMap: [RegExp, string][] = [
			// Double quotes
			[/\xE2\x80\x9C/g, '"'], // "
			[/\xE2\x80\x9D/g, '"'], // "
			[/â€œ/g, '"'],
			[/â€[^\w\s]?/g, '"'], // Catch-all for closing quote mojibake

			// Single quotes / apostrophe
			[/\xE2\x80\x99/g, "'"], // '
			[/\xE2\x80\x98/g, "'"], // '
			[/â€™/g, "'"],
			[/â€˜/g, "'"],

			// Dashes
			[/\xE2\x80\x94/g, "—"], // em dash
			[/\xE2\x80\x93/g, "–"], // en dash
			[/â€"/g, "—"],
			[/â€"/g, "–"],

			// Ellipsis
			[/\xE2\x80\xA6/g, "..."],
			[/â€¦/g, "..."],

			// Non-breaking space and other
			[/\xC2\xA0/g, " "],
			[/Â /g, " "],
			[/Â/g, ""],

			// Unicode smart quotes (if they come through correctly)
			[/[\u201C\u201D\u201E]/g, '"'],
			[/[\u2018\u2019\u201A]/g, "'"],
			[/\u2014/g, "—"],
			[/\u2013/g, "–"],
			[/\u2026/g, "..."],
		];

		for (const [pattern, replacement] of mojibakeMap) {
			result = result.replace(pattern, replacement);
		}

		return result;
	};

	// Helper function to process text with links
	const processTextWithLinks = (text: unknown): string => {
		// Ensure text is a string
		if (typeof text !== "string") {
			console.warn(
				"processTextWithLinks received non-string value:",
				text,
			);
			return String(text || "");
		}

		// Fix encoding issues first
		let processedText = fixEncodingIssues(text);

		// Handle {word:'...', link:'...'} syntax in text
		const linkObjectRegex =
			/\{\s*word\s*:\s*['"]([^'"]+)['"]\s*,\s*link\s*:\s*['"]([^'"]+)['"]\s*\}/gi;
		processedText = processedText.replace(
			linkObjectRegex,
			(_match, word, link) => {
				return `<strong><a href="${link}" target="_blank" rel="noopener noreferrer" style="color: #0066cc; text-decoration: underline;">${word}</a></strong>`;
			},
		);

		// Handle client information with bold italics
		if (
			currentBlog.client_name_1 &&
			typeof currentBlog.client_name_1 === "string"
		) {
			const escapedName = currentBlog.client_name_1.replace(
				/[.*+?^${}()|[\]\\]/g,
				"\\$&",
			);
			const clientRegex = new RegExp(escapedName, "gi");
			processedText = processedText.replace(
				clientRegex,
				`<strong><em>${currentBlog.client_name_1}</em></strong>`,
			);
		}
		if (
			currentBlog.disignation_1 &&
			typeof currentBlog.disignation_1 === "string"
		) {
			const escapedDesignation = currentBlog.disignation_1.replace(
				/[.*+?^${}()|[\]\\]/g,
				"\\$&",
			);
			const designationRegex = new RegExp(escapedDesignation, "gi");
			processedText = processedText.replace(
				designationRegex,
				`<strong><em>${currentBlog.disignation_1}</em></strong>`,
			);
		}
		if (
			currentBlog.company_1 &&
			typeof currentBlog.company_1 === "string"
		) {
			const escapedCompany = currentBlog.company_1.replace(
				/[.*+?^${}()|[\]\\]/g,
				"\\$&",
			);
			const companyRegex = new RegExp(escapedCompany, "gi");
			processedText = processedText.replace(
				companyRegex,
				`<strong><em>${currentBlog.company_1}</em></strong>`,
			);
		}
		if (
			currentBlog.client_name_2 &&
			typeof currentBlog.client_name_2 === "string"
		) {
			const escapedName = currentBlog.client_name_2.replace(
				/[.*+?^${}()|[\]\\]/g,
				"\\$&",
			);
			const clientRegex = new RegExp(escapedName, "gi");
			processedText = processedText.replace(
				clientRegex,
				`<strong><em>${currentBlog.client_name_2}</em></strong>`,
			);
		}
		if (
			currentBlog.disignation_2 &&
			typeof currentBlog.disignation_2 === "string"
		) {
			const escapedDesignation = currentBlog.disignation_2.replace(
				/[.*+?^${}()|[\]\\]/g,
				"\\$&",
			);
			const designationRegex = new RegExp(escapedDesignation, "gi");
			processedText = processedText.replace(
				designationRegex,
				`<strong><em>${currentBlog.disignation_2}</em></strong>`,
			);
		}
		if (
			currentBlog.company_2 &&
			typeof currentBlog.company_2 === "string"
		) {
			const escapedCompany = currentBlog.company_2.replace(
				/[.*+?^${}()|[\]\\]/g,
				"\\$&",
			);
			const companyRegex = new RegExp(escapedCompany, "gi");
			processedText = processedText.replace(
				companyRegex,
				`<strong><em>${currentBlog.company_2}</em></strong>`,
			);
		}

		// Handle links object from API
		if (currentBlog.links) {
			Object.keys(currentBlog.links).forEach((keyword) => {
				const link = currentBlog.links![keyword];
				const regex = new RegExp(`\\b(${keyword})\\b`, "gi");
				processedText = processedText.replace(
					regex,
					`<strong><a href="${link}" target="_blank" rel="noopener noreferrer" style="color: #0066cc; text-decoration: underline;">$1</a></strong>`,
				);
			});
		}

		return processedText;
	};

	// Build HTML content from API structure
	const buildBlogContent = () => {
		let htmlContent = "";

		// Add meta description paragraphs
		if (
			currentBlog.meta_descritpion &&
			Array.isArray(currentBlog.meta_descritpion)
		) {
			currentBlog.meta_descritpion.forEach((para: unknown) => {
				if (typeof para === "string" && para.trim()) {
					const processedPara = processTextWithLinks(para);
					htmlContent += `<p>${processedPara}</p>`;
				}
			});
		}

		// Add points with titles and descriptions
		if (
			currentBlog.points_description &&
			Array.isArray(currentBlog.points_description)
		) {
			currentBlog.points_description.forEach((point: unknown) => {
				const pointObj = point as Record<string, unknown>;

				// Handle inline images
				if (pointObj.image && typeof pointObj.image === "string") {
					htmlContent += `<div style="margin: 2rem 0; text-align: center;"><img src="${pointObj.image}" alt="Blog image" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" /></div>`;
					return; // Skip to next item if it's just an image
				}

				if (pointObj.title && typeof pointObj.title === "string") {
					htmlContent += `<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 0rem; margin-bottom: 1rem;">${pointObj.title}</h2>`;
				}

				// Add description paragraphs (before points)
				if (pointObj.description) {
					if (Array.isArray(pointObj.description)) {
						pointObj.description.forEach((desc: unknown) => {
							if (typeof desc === "string" && desc.trim()) {
								const processedDesc =
									processTextWithLinks(desc);
								htmlContent += `<p>${processedDesc}</p>`;
							}
						});
					} else if (
						typeof pointObj.description === "string" &&
						pointObj.description.trim()
					) {
						const processedDesc = processTextWithLinks(
							pointObj.description,
						);
						htmlContent += `<p>${processedDesc}</p>`;
					}
				}

				// Add bullet points if they exist in this section
				if (
					pointObj.points &&
					Array.isArray(pointObj.points) &&
					pointObj.points.length > 0
				) {
					htmlContent += `<ul style="list-style-type: disc; margin-left: 1.5rem; margin-top: 1rem; margin-bottom: 1rem;">`;
					pointObj.points.forEach((bulletPoint: unknown) => {
						if (
							typeof bulletPoint === "string" &&
							bulletPoint.trim()
						) {
							const processedPoint =
								processTextWithLinks(bulletPoint);
							htmlContent += `<li style="margin-bottom: 0.5rem;">${processedPoint}</li>`;
						}
					});
					htmlContent += `</ul>`;
				}

				// Add client information after description (client 1)
				if (
					pointObj.client_name_1 ||
					pointObj.disignation_1 ||
					pointObj.company_1
				) {
					let clientInfo =
						'<div style="margin-top: 1rem; text-align: left; font-style: italic;">';
					if (
						pointObj.client_name_1 &&
						typeof pointObj.client_name_1 === "string"
					) {
						clientInfo += `<p style="margin: 0;"><strong><em>— ${pointObj.client_name_1}</em></strong></p>`;
					}
					if (
						pointObj.disignation_1 &&
						typeof pointObj.disignation_1 === "string"
					) {
						clientInfo += `<p style="margin: 0;"><strong><em>${pointObj.disignation_1}</em></strong></p>`;
					}
					if (
						pointObj.company_1 &&
						typeof pointObj.company_1 === "string"
					) {
						clientInfo += `<p style="margin: 0;"><strong><em>${pointObj.company_1}</em></strong></p>`;
					}
					clientInfo += "</div>";
					htmlContent += clientInfo;
				}

				// Add description paragraphs (after points)
				if (pointObj.description_after) {
					if (Array.isArray(pointObj.description_after)) {
						pointObj.description_after.forEach((desc: unknown) => {
							if (typeof desc === "string" && desc.trim()) {
								const processedDesc =
									processTextWithLinks(desc);
								htmlContent += `<p>${processedDesc}</p>`;
							}
						});
					} else if (
						typeof pointObj.description_after === "string" &&
						pointObj.description_after.trim()
					) {
						const processedDesc = processTextWithLinks(
							pointObj.description_after,
						);
						htmlContent += `<p>${processedDesc}</p>`;
					}
				}

				// Add client information after description_after (client 2)
				if (
					pointObj.client_name_2 ||
					pointObj.disignation_2 ||
					pointObj.company_2
				) {
					let clientInfo =
						'<div style="margin-top: 1rem; text-align: left; font-style: italic;">';
					if (
						pointObj.client_name_2 &&
						typeof pointObj.client_name_2 === "string"
					) {
						clientInfo += `<p style="margin: 0;"><strong><em>— ${pointObj.client_name_2}</em></strong></p>`;
					}
					if (
						pointObj.disignation_2 &&
						typeof pointObj.disignation_2 === "string"
					) {
						clientInfo += `<p style="margin: 0;"><strong><em>${pointObj.disignation_2}</em></strong></p>`;
					}
					if (
						pointObj.company_2 &&
						typeof pointObj.company_2 === "string"
					) {
						clientInfo += `<p style="margin: 0;"><strong><em>${pointObj.company_2}</em></strong></p>`;
					}
					clientInfo += "</div>";
					htmlContent += clientInfo;
				}
			});
		}

		// Add bullet points if available
		if (
			currentBlog.points &&
			Array.isArray(currentBlog.points) &&
			currentBlog.points.length > 0
		) {
			htmlContent += `<ul style="list-style-type: disc; margin-left: 1.5rem; margin-top: 1rem; margin-bottom: 1rem;">`;
			currentBlog.points.forEach((point: unknown) => {
				if (typeof point === "string" && point.trim()) {
					const processedPoint = processTextWithLinks(point);
					htmlContent += `<li style="margin-bottom: 0.5rem;">${processedPoint}</li>`;
				}
			});
			htmlContent += `</ul>`;
		}

		// Add conclusion section - handle both string arrays and nested object structures
		if (
			currentBlog.conclusion &&
			Array.isArray(currentBlog.conclusion) &&
			currentBlog.conclusion.length > 0
		) {
			currentBlog.conclusion.forEach((conclusionItem: unknown) => {
				// Handle nested conclusion structure with title, description, points, description_after
				if (
					typeof conclusionItem === "object" &&
					conclusionItem !== null
				) {
					const itemObj = conclusionItem as Record<string, unknown>;

					// Handle inline images in conclusion
					if (itemObj.image && typeof itemObj.image === "string") {
						htmlContent += `<div style="margin: 2rem 0; text-align: center;"><img src="${itemObj.image}" alt="Blog image" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" /></div>`;
						return; // Skip to next item if it's just an image
					}

					// Add conclusion title
					if (itemObj.title && typeof itemObj.title === "string") {
						htmlContent += `<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 1rem;">${itemObj.title}</h2>`;
					}

					// Add description (can be string or array)
					if (itemObj.description) {
						if (
							typeof itemObj.description === "string" &&
							itemObj.description.trim()
						) {
							const processedDesc = processTextWithLinks(
								itemObj.description,
							);
							htmlContent += `<p>${processedDesc}</p>`;
						} else if (Array.isArray(itemObj.description)) {
							itemObj.description.forEach((desc: unknown) => {
								if (typeof desc === "string" && desc.trim()) {
									const processedDesc =
										processTextWithLinks(desc);
									htmlContent += `<p>${processedDesc}</p>`;
								}
							});
						}
					}

					// Add points if available
					if (
						itemObj.points &&
						Array.isArray(itemObj.points) &&
						itemObj.points.length > 0
					) {
						htmlContent += `<ul style="list-style-type: disc; margin-left: 1.5rem; margin-top: 1rem; margin-bottom: 1rem;">`;
						itemObj.points.forEach((point: unknown) => {
							if (typeof point === "string" && point.trim()) {
								const processedPoint =
									processTextWithLinks(point);
								htmlContent += `<li style="margin-bottom: 0.5rem;">${processedPoint}</li>`;
							}
						});
						htmlContent += `</ul>`;
					}

					// Add description_after
					if (itemObj.description_after) {
						if (
							typeof itemObj.description_after === "string" &&
							itemObj.description_after.trim()
						) {
							const processedDesc = processTextWithLinks(
								itemObj.description_after,
							);
							htmlContent += `<p>${processedDesc}</p>`;
						} else if (Array.isArray(itemObj.description_after)) {
							itemObj.description_after.forEach(
								(desc: unknown) => {
									if (
										typeof desc === "string" &&
										desc.trim()
									) {
										const processedDesc =
											processTextWithLinks(desc);
										htmlContent += `<p>${processedDesc}</p>`;
									}
								},
							);
						}
					}
				} else if (
					typeof conclusionItem === "string" &&
					conclusionItem.trim()
				) {
					// Handle simple string conclusion
					if (currentBlog.conclusion.indexOf(conclusionItem) === 0) {
						htmlContent += `<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 1rem;">Final Thought</h2>`;
					}
					const processedPara = processTextWithLinks(conclusionItem);
					htmlContent += `<p>${processedPara}</p>`;
				}
			});
		}

		return htmlContent;
	};

	const currentBlogUrl =
		typeof window !== "undefined"
			? `${window.location.origin}/blogs/${blogId}`
			: `https://isprout.in/blogs/${blogId}`;

	return (
		<div className='min-h-screen' style={{ backgroundColor: COLORS.white }}>
			<MetaTags
				title={currentBlog?.meta_title || ""}
				description={currentBlog?.meta_description || ""}
				ogTitle={currentBlog?.meta_title}
				ogDescription={currentBlog?.meta_description}
				ogImage={currentBlog?.image_url}
				keywords={currentBlog?.tags?.join(", ")}
			/>
			{/* Hero Section with Date, Title, and Image */}
			<section className='pt-24 pb-2 sm:pt-6 md:pt-8 px-4 sm:px-6 md:px-8 lg:px-auto mt-4 sm:mt-20'>
				<div className='max-w-7xl mx-auto'>
					{/* Date */}
					<p
						className='text-sm sm:text-base mb-3 sm:mb-4 text-center'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: COLORS.textGray,
						}}
					>
						{currentBlog.date}
					</p>

					{/* Title */}
					<h1
						className='text-xl sm:text-2xl md:text-2xl font-bold mb-4 sm:mb-6 text-center'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: COLORS.brandBlue,
							fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
							lineHeight: "1.3",
						}}
					>
						{fixEncodingIssues(currentBlog.heading || "")}
					</h1>

					{/* Featured Image - Centered */}
					<div className='mb-4 sm:mb-6'>
						<img
							src={currentBlog.image_url}
							alt={fixEncodingIssues(currentBlog.heading || "")}
							className='w-full rounded-2xl shadow-lg object-cover'
							style={{ maxHeight: "500px" }}
						/>
					</div>
					<div
						className='pt-5'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: COLORS.textGray,
							fontWeight: 400,
							fontSize: "18px",
							lineHeight: "32px",
						}}
					>
						{currentBlog?.content}
					</div>
				</div>
			</section>
			<section className='py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8'>
				<div className='max-w-7xl mx-auto'>
					<div
						className='prose prose-sm sm:prose-base lg:prose-lg max-w-none blog-content'
						style={{
							fontFamily: "Outfit, sans-serif",
							color: COLORS.textGray,
						}}
						dangerouslySetInnerHTML={{
							__html: buildBlogContent(),
						}}
					/>
				</div>
			</section>

			{/* Additional Images Section */}
			{currentBlog.image && (
				<section className='py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8 bg-gray-50'>
					<div className='max-w-7xl mx-auto'>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
							{Array.isArray(currentBlog.image) ? (
								currentBlog.image.map(
									(img: string, index: number) => (
										<div
											key={index}
											className='rounded-lg overflow-hidden shadow-md'
										>
											<img
												src={img}
												alt={`Blog image ${index + 1}`}
												className='w-full h-64 object-cover'
											/>
										</div>
									),
								)
							) : (
								<div className='rounded-lg overflow-hidden shadow-md'>
									<img
										src={currentBlog.image as string}
										alt='Blog image'
										className='w-full h-64 object-cover'
									/>
								</div>
							)}
						</div>
					</div>
				</section>
			)}

			{/* Sources Section */}
			{currentBlog.sources && currentBlog.sources.length > 0 && (
				<section className='py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8'>
					<div className='max-w-7xl mx-auto'>
						<h2
							style={{
								fontFamily: "Outfit, sans-serif",
								fontSize: "1.5rem",
								fontWeight: "600",
								marginBottom: "1.5rem",
								color: COLORS.textBlack,
							}}
						>
							Sources
						</h2>
						<div className='space-y-3'>
							{currentBlog.sources.map(
								(
									source: { name: string; url: string },
									index: number,
								) => (
									<div
										key={index}
										className='flex items-start gap-2'
									>
										<span
											style={{
												color: COLORS.brandBlue,
												marginTop: "4px",
												minWidth: "6px",
											}}
										>
											•
										</span>
										<a
											href={source.url}
											target='_blank'
											rel='noopener noreferrer'
											className='text-blue-600 hover:text-blue-800 underline transition-colors break-all'
											style={{
												color: "#0066cc",
												fontFamily:
													"Outfit, sans-serif",
												fontSize: "0.95rem",
											}}
											onMouseEnter={(e) => {
												e.currentTarget.style.color =
													"#0052a3";
											}}
											onMouseLeave={(e) => {
												e.currentTarget.style.color =
													"#0066cc";
											}}
										>
											{source.name}
										</a>
									</div>
								),
							)}
						</div>
					</div>
				</section>
			)}

			{/* Blog Share Section */}
			<BlogsShare
				keywords={currentBlog.tags?.slice(0, 2) || []}
				blogTitle={fixEncodingIssues(currentBlog.heading || "")}
				blogUrl={currentBlogUrl}
			/>

			{/* Recent Posts Section */}
			<RecentPosts
				blogs={blogs}
				currentBlogId={blogId}
				maxPosts={3}
				sortByDate={true}
			/>

			{/* Footer */}
			<Footer />
			<ScrollToTop />
		</div>
	);
};

export default BlogDetail;
