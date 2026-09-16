import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import { InstagramIcon, LinkedInIcon, TelegramIcon, XIcon } from './icons';

import logo from '@/assets/images/logo.webp';

const socialLinks = [
  {
    id: 'linkedin',
    href: '#',
    label: 'LinkedIn',
    icon: LinkedInIcon,
  },
  {
    id: 'instagram',
    href: '#',
    label: 'Instagram',
    icon: InstagramIcon,
  },
  {
    id: 'x',
    href: '#',
    label: 'X',
    icon: XIcon,
  },
  {
    id: 'telegram',
    href: '#',
    label: 'Telegram',
    icon: TelegramIcon,
  },
] as const;

export const Footer = () => {
  const { t } = useTranslation();
  const { lang = 'uk' } = useParams();

  const navItems = [
    {
      to: `/${lang}`,
      label: t('common.findJob'),
    },
    {
      to: `/${lang}#employees`,
      label: t('common.findEmployee'),
    },
    {
      to: `/${lang}#about`,
      label: t('common.about'),
    },
    {
      to: `/${lang}#partners`,
      label: t('common.partners'),
    },
    {
      to: `/${lang}/contacts`,
      label: t('common.contacts'),
    },
  ];

  return (
    <footer
      className="
        border-t border-white/[0.08]
        bg-[#07110d]
        text-white
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1440px]
          px-4
          py-8

          sm:px-6
          sm:py-10

          lg:px-12
          lg:py-8
        "
      >
        <div
          className="
            grid
            grid-cols-1
            gap-8

            md:grid-cols-2
            md:items-center

            lg:grid-cols-[auto_1fr_auto]
            lg:gap-12
          "
        >
          {/* Brand */}
          <div
            className="
              flex
              items-center
              gap-5

              md:col-span-2

              lg:col-span-1
              lg:min-w-[280px]
            "
          >
            <Link
              to={`/${lang}`}
              aria-label="VV Work"
              className="
                shrink-0
                rounded-sm
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[var(--color-primary)]
              "
            >
              <img
                src={logo}
                alt="VV Work"
                width={140}
                height={48}
                className="
                  h-auto
                  w-[120px]
                  object-contain

                  sm:w-[135px]
                "
              />
            </Link>

            <div
              className="
                hidden
                h-10
                w-px
                bg-white/15

                sm:block
              "
              aria-hidden="true"
            />

            <p
              className="
                hidden
                max-w-[160px]
                text-[12px]
                font-medium
                leading-[1.5]
                text-white/50

                sm:block
              "
            >
              {t('footer.tagline')}
            </p>
          </div>

          <nav
            aria-label={t('footer.navigation')}
            className="
              flex
              flex-wrap
              items-center
              gap-x-5
              gap-y-3

              md:justify-start

              lg:justify-center
              lg:gap-x-7
            "
          >
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="
                  text-[12px]
                  font-semibold
                  text-white/70
                  transition-colors
                  duration-200

                  hover:text-[var(--color-primary)]

                  focus-visible:rounded-sm
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[var(--color-primary)]
                "
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div
            className="
              flex
              items-center
              gap-2

              md:justify-end
            "
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.id}
                  href={social.href}
                  aria-label={social.label}
                  onClick={(event) => event.preventDefault()}
                  className="
                    grid
                    h-9
                    w-9
                    place-items-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.03]
                    text-white/75
                    transition-all
                    duration-200

                    hover:-translate-y-0.5
                    hover:border-[rgba(34,204,86,0.35)]
                    hover:bg-[rgba(34,204,86,0.08)]
                    hover:text-[var(--color-primary)]

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[var(--color-primary)]
                  "
                >
                  <Icon size={17} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
        <p
          className="
            mt-6
            max-w-[260px]
            text-[12px]
            font-medium
            leading-[1.55]
            text-white/45

            sm:hidden
          "
        >
          {t('footer.tagline')}
        </p>
        <div
          className="
            mt-8
            flex
            flex-col
            gap-4
            border-t
            border-white/[0.07]
            pt-5

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p
            className="
              text-[11px]
              font-medium
              text-white/50
            "
          >
            © 2026 VV Work. {t('footer.rights')}
          </p>

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-x-5
              gap-y-2
            "
          >
            <Link
              to={`/${lang}/privacy-policy`}
              className="
                text-[11px]
                font-medium
                text-white/45
                underline
                decoration-white/20
                underline-offset-4
                transition-colors

                hover:text-white
              "
            >
              {t('footer.privacy')}
            </Link>

            <Link
              to={`/${lang}/terms`}
              className="
                text-[11px]
                font-medium
                text-white/45
                underline
                decoration-white/20
                underline-offset-4
                transition-colors

                hover:text-white
              "
            >
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
