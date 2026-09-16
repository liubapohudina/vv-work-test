import { useEffect } from 'react';

import type { PageMetaProps } from './PageMeta.types';

export const PageMeta = ({
  title,
  description,
  canonical,
  lang,
  noIndex = false,
}: PageMetaProps) => {
  useEffect(() => {
    document.title = title;

    // Description
    let descriptionMeta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );

    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.name = 'description';
      document.head.appendChild(descriptionMeta);
    }

    descriptionMeta.content = description;

    // Robots
    let robotsMeta = document.querySelector<HTMLMetaElement>(
      'meta[name="robots"]',
    );

    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.name = 'robots';
      document.head.appendChild(robotsMeta);
    }

    robotsMeta.content = noIndex ? 'noindex, follow' : 'index, follow';

    // Language
    if (lang) {
      document.documentElement.lang = lang;
    }

    // Canonical
    const existingCanonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );

    if (canonical) {
      const canonicalLink = existingCanonical ?? document.createElement('link');

      canonicalLink.rel = 'canonical';
      canonicalLink.href = new URL(canonical, window.location.origin).href;

      if (!existingCanonical) {
        document.head.appendChild(canonicalLink);
      }
    } else {
      existingCanonical?.remove();
    }
  }, [title, description, canonical, lang, noIndex]);

  return null;
};
