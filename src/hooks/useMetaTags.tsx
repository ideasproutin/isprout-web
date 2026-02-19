/**
 * MetaTags component — renders <title> and <meta> tags as JSX.
 * React 19 automatically hoists these into <head> during both
 * SSR (renderToString) and client-side rendering.
 */

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
  return (
    <>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogUrl && <meta property="og:url" content={ogUrl} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </>
  );
}

export type { MetaTagsProps };
