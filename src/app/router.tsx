import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';

import { PageLayout } from '@/components/layout/PageLayout';

const HomePage = lazy(() =>
  import('@/pages/HomePage').then((m) => ({
    default: m.HomePage,
  })),
);

const PartnerPage = lazy(() =>
  import('@/pages/PartnerPage').then((m) => ({
    default: m.PartnerPage,
  })),
);

const ContactsPage = lazy(() =>
  import('@/pages/ContactsPage').then((m) => ({
    default: m.ContactsPage,
  })),
);

const PrivacyPolicyPage = lazy(() =>
  import('@/pages/PrivacyPolicyPage').then((m) => ({
    default: m.PrivacyPolicyPage,
  })),
);

const CookiePolicyPage = lazy(() =>
  import('@/pages/CookiePolicyPage').then((m) => ({
    default: m.CookiePolicyPage,
  })),
);

const TermsPage = lazy(() =>
  import('@/pages/TermsPage').then((m) => ({
    default: m.TermsPage,
  })),
);

const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({
    default: m.NotFoundPage,
  })),
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/uk" replace />,
  },

  {
    path: '/:lang',
    element: <PageLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'partners/:slug',
        element: <PartnerPage />,
      },
      {
        path: 'contacts',
        element: <ContactsPage />,
      },
      {
        path: 'privacy-policy',
        element: <PrivacyPolicyPage />,
      },
      {
        path: 'cookie-policy',
        element: <CookiePolicyPage />,
      },
      {
        path: 'terms',
        element: <TermsPage />,
      },
    ],
  },

  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
