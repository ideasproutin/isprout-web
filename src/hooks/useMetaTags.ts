import { useEffect } from 'react';

interface MetaTagsProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  keywords?: string;
}

export const useMetaTags = ({
  title,
  description,
  ogTitle,
  ogDescription,
  keywords,
}: MetaTagsProps) => {
  useEffect(() => {
    // Update page title
    document.title = title;

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update or create meta title
    let metaTitle = document.querySelector('meta[name="title"]');
    if (!metaTitle) {
      metaTitle = document.createElement('meta');
      metaTitle.setAttribute('name', 'title');
      document.head.appendChild(metaTitle);
    }
    metaTitle.setAttribute('content', title);

    // Update or create keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // Update or create OG title
    let ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (!ogTitleMeta) {
      ogTitleMeta = document.createElement('meta');
      ogTitleMeta.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitleMeta);
    }
    ogTitleMeta.setAttribute('content', ogTitle || title);

    // Update or create OG description
    let ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
    if (!ogDescriptionMeta) {
      ogDescriptionMeta = document.createElement('meta');
      ogDescriptionMeta.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescriptionMeta);
    }
    ogDescriptionMeta.setAttribute('content', ogDescription || description);

    // Update Twitter title
    let twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta');
      twitterTitle.setAttribute('property', 'twitter:title');
      document.head.appendChild(twitterTitle);
    }
    twitterTitle.setAttribute('content', ogTitle || title);

    // Update Twitter description
    let twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (!twitterDescription) {
      twitterDescription = document.createElement('meta');
      twitterDescription.setAttribute('property', 'twitter:description');
      document.head.appendChild(twitterDescription);
    }
    twitterDescription.setAttribute('content', ogDescription || description);
  }, [title, description, ogTitle, ogDescription, keywords]);
};
