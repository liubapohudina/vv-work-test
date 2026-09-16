import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToHash = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      return;
    }

    const id = decodeURIComponent(hash.slice(1));

    const scrollToElement = () => {
      const element = document.getElementById(id);

      if (!element) {
        return false;
      }

      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      return true;
    };

    if (scrollToElement()) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      scrollToElement();
    }, 100);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [hash]);

  return null;
};
