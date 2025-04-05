// src/services/seoAnalyzer.js
import { fetchHtml } from '../utils/fetchHtml.js';
import { JSDOM } from 'jsdom';

export async function analyzeSeo(url) {
  const html = await fetchHtml(url);
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // Collect meta and link tags
  const getMeta = (name, attr = 'name') =>
    doc.querySelector(`meta[${attr}="${name}"]`)?.content || '';

  const title = doc.querySelector('title')?.textContent || '';
  const description = getMeta('description');
  const canonical = doc.querySelector('link[rel="canonical"]')?.href || '';
  const robots = getMeta('robots');

  // Open Graph
  const ogTitle = getMeta('og:title', 'property');
  const ogDesc = getMeta('og:description', 'property');
  const ogImage = getMeta('og:image', 'property');
  const ogUrl = getMeta('og:url', 'property');

  // Twitter
  const twitterCard = getMeta('twitter:card');
  const twitterTitle = getMeta('twitter:title');
  const twitterDesc = getMeta('twitter:description');
  const twitterImage = getMeta('twitter:image');

  // Structured Data
  const hasStructuredData = !!doc.querySelector('script[type="application/ld+json"]');

  // All tags presence
  const tagChecklist = {
    'title': title,
    'meta:description': description,
    'meta:robots': robots,
    'link:canonical': canonical,
    'og:title': ogTitle,
    'og:description': ogDesc,
    'og:image': ogImage,
    'og:url': ogUrl,
    'twitter:card': twitterCard,
    'twitter:title': twitterTitle,
    'twitter:description': twitterDesc,
    'twitter:image': twitterImage,
    'structuredData': hasStructuredData
  };

  const missingTags = Object.entries(tagChecklist)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  const totalTags = Object.keys(tagChecklist).length;
  const foundTags = totalTags - missingTags.length;
  const score = Math.round((foundTags / totalTags) * 100);

  const warnings = missingTags.map(tag => `Missing ${tag} tag`);
  const suggestions = [
    'Make your title tag more descriptive (50-60 characters)',
    'Expand your meta description (150-160 characters)',
    'Use Open Graph and Twitter tags for better sharing',
    'Consider adding structured data with schema.org'
  ];

  return {
    url,
    title,
    metaTags: tagChecklist,
    missingTags,
    score,
    seoCoverage: Math.round((foundTags / totalTags) * 100),
    essentialTags: { found: [title, description, canonical, robots].filter(Boolean).length, total: 4 },
    socialTags: { found: [ogTitle, ogDesc, ogImage, ogUrl, twitterCard, twitterTitle, twitterDesc, twitterImage].filter(Boolean).length, total: 8 },
    technicalTags: { found: hasStructuredData ? 1 : 0, total: 1 },
    issues: {
      critical: [],
      warnings,
      suggestions
    },
    metrics: {
      seo: foundTags * 5,
      social: [ogTitle, twitterTitle].filter(Boolean).length * 10,
      performance: 75 // Placeholder for now
    },
    analysis: {
      title,
      description,
      canonical,
      structuredData: hasStructuredData
    }
  };
}

