import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';

import logo from '@/assets/images/logo.webp';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Toast } from '@/components/ui/Toast';

export const Header = () => {
  const { t } = useTranslation();
  const { lang = 'uk' } = useParams();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginNoticeOpen, setIsLoginNoticeOpen] = useState(false);

  const isHomePage = location.pathname === `/${lang}`;

  const navItems = [
    {
      to: `/${lang}`,
      label: t('common.findJob'),
      end: true,
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    setIsLoginNoticeOpen(true);
    closeMenu();
  };

  const getNavLinkClassName = ({ isActive }: { isActive: boolean }) => `
    relative
    whitespace-nowrap
    text-[14px]
    font-medium
    tracking-[-0.02em]
    transition-colors
    duration-200

    ${isActive ? 'text-white' : 'text-white/65 hover:text-white'}

    after:absolute
    after:-bottom-[25px]
    after:left-0
    after:h-[2px]
    after:w-full
    after:origin-center
    after:rounded-full
    after:bg-[var(--color-primary)]
    after:transition-transform
    after:duration-200

    ${isActive ? 'after:scale-x-100' : 'after:scale-x-0'}

    max-[1100px]:text-[12px]
  `;

  return (
    <>
      <header
        className={`
          fixed
          inset-x-0
          top-0
          z-50

          border-b

          transition-[background-color,border-color,box-shadow]
          duration-300

          ${
            isScrolled || !isHomePage
              ? `
                border-white/[0.07]
                bg-[#07110d]/95
                shadow-[0_10px_40px_rgba(0,0,0,0.18)]
                backdrop-blur-xl
              `
              : `
                border-transparent
                bg-gradient-to-b
                from-[#07110d]/75
                to-transparent
              `
          }
        `}
      >
        <div
          className="
            mx-auto
            flex
            h-[72px]
            w-[calc(100%-48px)]
            max-w-[1440px]
            items-center
            gap-10

            max-[1100px]:gap-7

            max-[900px]:
              h-[68px]
              w-[calc(100%-32px)]

            max-[480px]:
              w-[calc(100%-24px)]
          "
        >
          {/* Logo */}
          <Link
            to={`/${lang}`}
            aria-label="VV Work"
            onClick={closeMenu}
            className="
              flex
              shrink-0
              items-center
              transition-opacity
              duration-200
              hover:opacity-85

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--color-primary)]
              focus-visible:ring-offset-4
              focus-visible:ring-offset-[#07110d]
            "
          >
            <img
              src={logo}
              alt="VV Work"
              width={76}
              height={28}
              className="
                h-[28px]
                w-[76px]
                object-contain
              "
            />
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label={t('common.mainNavigation')}
            className="
              mr-auto
              flex
              items-center
              gap-7

              max-[1100px]:gap-5
              max-[900px]:hidden
            "
          >
            {navItems.map((item) => {
              const hasHash = item.to.includes('#');

              if (hasHash) {
                return (
                  <Link
                    key={`${item.to}-${item.label}`}
                    to={item.to}
                    className="
                      whitespace-nowrap
                      text-[14px]
                      font-medium
                      tracking-[-0.02em]
                      text-white/65

                      transition-colors
                      duration-200

                      hover:text-white

                      max-[1100px]:text-[12px]
                    "
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <NavLink
                  key={`${item.to}-${item.label}`}
                  to={item.to}
                  end={item.end}
                  className={getNavLinkClassName}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Actions */}
          <div
            className="
              ml-auto
              flex
              shrink-0
              items-center
              gap-2
            "
          >
            <LanguageSwitcher tone="onDark" />

            <ThemeToggle />

            <div className="max-[900px]:hidden">
              <Button
                variant="outline"
                size="sm"
                tone="onDark"
                onClick={handleLoginClick}
              >
                {t('common.login')}
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen((prev) => !prev);
              }}
              aria-label={
                isMenuOpen ? t('common.closeMenu') : t('common.openMenu')
              }
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              className="
                hidden
                h-10
                w-10
                shrink-0
                items-center
                justify-center

                rounded-xl
                border
                border-white/10

                bg-white/[0.04]
                text-white

                transition-colors
                duration-200

                hover:border-white/20
                hover:bg-white/[0.08]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[var(--color-primary)]

                max-[900px]:inline-flex
              "
            >
              {isMenuOpen ? (
                <X size={21} aria-hidden="true" />
              ) : (
                <Menu size={21} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        <div
          id="mobile-navigation"
          aria-hidden={!isMenuOpen}
          className={`
            fixed
            inset-x-0
            top-[68px]

            overflow-hidden

            border-b
            border-white/[0.08]

            bg-[#07110d]/[0.98]
            backdrop-blur-xl

            shadow-[0_20px_40px_rgba(0,0,0,0.25)]

            transition-[max-height,opacity,visibility]
            duration-300

            min-[901px]:hidden

            ${
              isMenuOpen
                ? `
                  visible
                  max-h-[620px]
                  opacity-100
                `
                : `
                  invisible
                  max-h-0
                  opacity-0
                `
            }
          `}
        >
          <div
            className="
              mx-auto
              w-[calc(100%-32px)]
              max-w-[768px]
              pb-6
              pt-3

              max-[480px]:
                w-[calc(100%-24px)]
            "
          >
            <nav
              aria-label={t('common.mobileNavigation')}
              className="mb-5 flex flex-col"
            >
              {navItems.map((item) => (
                <NavLink
                  key={`mobile-${item.to}-${item.label}`}
                  to={item.to}
                  end={item.end}
                  onClick={closeMenu}
                  className={({ isActive }) => `
                    flex
                    min-h-[54px]
                    items-center

                    border-b
                    border-white/[0.07]

                    text-[15px]
                    font-semibold
                    tracking-[-0.02em]

                    transition-colors
                    duration-200

                    ${
                      isActive && !item.to.includes('#')
                        ? 'text-[var(--color-primary)]'
                        : 'text-white/75 hover:text-white'
                    }
                  `}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <Button
              variant="outline"
              size="sm"
              tone="onDark"
              fullWidth
              onClick={handleLoginClick}
            >
              {t('common.login')}
            </Button>
          </div>
        </div>
      </header>

      <Toast
        isOpen={isLoginNoticeOpen}
        onClose={() => setIsLoginNoticeOpen(false)}
        title={t('common.comingSoon')}
        description={t('common.loginComingSoon')}
      />
    </>
  );
};
