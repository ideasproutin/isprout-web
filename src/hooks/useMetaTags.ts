import { useEffect } from 'react';

interface MetaTagsProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
}

export const useMetaTags = ({
  title,
  description,
  ogTitle,
  ogDescription,
  keywords,
  ogImage,
  ogUrl,
}: MetaTagsProps) => {
  useEffect(() => {
    // Store previous title for cleanup
    const previousTitle = document.title;

    // Helper function to update or create meta tags
    const updateMetaTag = (
      selector: string,
      attributeType: 'name' | 'property',
      attributeValue: string,
      content: string
    ): HTMLMetaElement => {
      let element = document.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeType, attributeValue);
        document.head.appendChild(element);
      }
      
      // Only update if content changed to avoid unnecessary DOM operations
      if (element.getAttribute('content') !== content) {
        element.setAttribute('content', content);
      }
      
      return element;
    };

    // Update page title
    document.title = title;

    // Update standard meta tags
    updateMetaTag('meta[name="description"]', 'name', 'description', description);
    updateMetaTag('meta[name="title"]', 'name', 'title', title);

    // Update keywords if provided
    if (keywords) {
      updateMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);
    }

    // Update Open Graph meta tags
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', ogTitle || title);
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', ogDescription || description);
    updateMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');
    
    if (ogImage) {
      updateMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
    }
    
    if (ogUrl) {
      updateMetaTag('meta[property="og:url"]', 'property', 'og:url', ogUrl);
    }

    // Update Twitter Card meta tags (Twitter uses 'name' not 'property')
    updateMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', ogTitle || title);
    updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', ogDescription || description);
    
    if (ogImage) {
      updateMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);
    }

    // Cleanup function - restore previous title on unmount
    return () => {
      document.title = previousTitle;
    };
  }, [title, description, ogTitle, ogDescription, keywords, ogImage, ogUrl]);
};
