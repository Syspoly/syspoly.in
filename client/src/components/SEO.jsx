import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { getSeoByPage } from '../services/api';

const SEO = ({
  page,
  defaultTitle = 'Syspoly | System Polygon Pvt. Ltd. - IT Services & Software Development',
  defaultDescription = 'System Polygon Pvt. Ltd. delivers high-performance website development, mobile apps, AI engineering, digital marketing, and enterprise software solutions.',
  defaultKeywords = 'IT services, software development company, web development, mobile apps, digital marketing, System Polygon',
  canonicalUrl = ''
}) => {
  const [seo, setSeo] = useState(null);

  useEffect(() => {
    let isMounted = true;

    if (!page) return;

    const fetchSeo = async () => {
      try {
        const res = await getSeoByPage(page);
        if (isMounted && res.data?.success && res.data?.data) {
          setSeo(res.data.data);
        }
      } catch (err) {
        // Silently use defaults if offline or not configured yet
      }
    };

    fetchSeo();

    return () => {
      isMounted = false;
    };
  }, [page]);

  const title = seo?.title || defaultTitle;
  const description = seo?.description || defaultDescription;
  const keywords = seo?.keywords || defaultKeywords;
  const ogTitle = seo?.ogTitle || title;
  const ogDescription = seo?.ogDescription || description;
  const ogImage = seo?.ogImage || 'https://syspoly.in/og-image.jpg';
  const canonical = seo?.canonicalUrl || canonicalUrl || (typeof window !== 'undefined' ? window.location.href : '');
  const robots = seo?.robots || 'index, follow';

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />

      {/* Canonical Link */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {canonical && <meta property="og:url" content={canonical} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </Helmet>
  );
};

export default SEO;
