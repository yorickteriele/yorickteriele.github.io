import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export function generateMetadata(options: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  path?: string;
} = {}): Metadata {
  const title = options.title 
    ? `${options.title} | ${siteConfig.name}`
    : siteConfig.title;
  
  const description = options.description || siteConfig.description;
  const keywords = options.keywords || siteConfig.keywords;
  const image = options.image || siteConfig.ogImage;
  const url = options.path 
    ? `${siteConfig.url}${options.path}`
    : siteConfig.url;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    
    openGraph: {
      type: 'website',
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'nl_NL',
      alternateLocale: ['en_US'],
    },
    
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteConfig.url}${image}`],
      creator: siteConfig.twitterHandle,
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // TODO
    verification: {
      google: 'your-google-verification-code',
    },
    
    alternates: {
      canonical: url,
      languages: {
        'nl-NL': url,
        'en-US': `${url}/en`,
      },
    },
  };
}

export function generateStructuredData(type: 'person' | 'website' = 'person'): string {
  if (type === 'person') {
    return JSON.stringify(siteConfig.schema);
  }
  
  if (type === 'website') {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": siteConfig.title,
      "description": siteConfig.description,
      "url": siteConfig.url,
      "author": {
        "@type": "Person",
        "name": siteConfig.name
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${siteConfig.url}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    });
  }
  
  return "{}";
}