/**
 * MetaTags component — renders <title>, <meta>, and <link rel="canonical"> tags as JSX.
 * React 19 automatically hoists these into <head> during both
 * SSR (renderToString) and client-side rendering.
 */

import { useLocation } from "react-router-dom";

const SITE_URL = "https://isprout.in";

interface MetaTagsProps {
	title: string;
	description: string;
	ogTitle?: string;
	ogDescription?: string;
	keywords?: string;
	ogImage?: string;
	ogUrl?: string;
}

export function MetaTags({
	title,
	description,
	ogTitle,
	ogDescription,
	keywords,
	ogImage,
	ogUrl,
}: MetaTagsProps) {
	const { pathname } = useLocation();
	const canonicalUrl = `${SITE_URL}${pathname}`;

	return (
		<>
			<title>{title}</title>
			<link rel='canonical' href={canonicalUrl} />
			<meta name='title' content={title} />
			<meta name='description' content={description} />
			{keywords && <meta name='keywords' content={keywords} />}

			{/* Open Graph */}
			<meta property='og:type' content='website' />
			<meta property='og:title' content={ogTitle || title} />
			<meta
				property='og:description'
				content={ogDescription || description}
			/>
			{ogImage && <meta property='og:image' content={ogImage} />}
			<meta property='og:url' content={ogUrl || canonicalUrl} />

			{/* Twitter Card */}
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:title' content={ogTitle || title} />
			<meta
				name='twitter:description'
				content={ogDescription || description}
			/>
			{ogImage && <meta name='twitter:image' content={ogImage} />}
		</>
	);
}

export type { MetaTagsProps };
