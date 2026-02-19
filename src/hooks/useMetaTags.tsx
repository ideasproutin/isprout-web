interface MetaTagsProps {
	title: string;
	description: string;
	ogTitle?: string;
	ogDescription?: string;
	keywords?: string;
	ogImage?: string;
	ogUrl?: string;
}

export const MetaTags = ({
	title,
	description,
	ogTitle,
	ogDescription,
	keywords,
	ogImage,
	ogUrl,
}: MetaTagsProps) => {
	return (
		<>
			<title>{title}</title>
			<meta name='description' content={description} />
			{keywords && <meta name='keywords' content={keywords} />}
			{ogTitle && <meta property='og:title' content={ogTitle} />}
			{ogDescription && (
				<meta property='og:description' content={ogDescription} />
			)}
			{ogImage && <meta property='og:image' content={ogImage} />}
			{ogUrl && <meta property='og:url' content={ogUrl} />}
		</>
	);
};
