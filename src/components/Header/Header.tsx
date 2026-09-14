import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';

import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';

export const Header = () => {
  const { t } = useTranslation();
  const { lang = 'uk' } = useParams();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginNoticeOpen, setIsLoginNoticeOpen] = useState(false);

  const navItems = [
    { to: `/${lang}`, label: t('common.findJob') },
    { to: `/${lang}#employees`, label: t('common.findEmployee') },
    { to: `/${lang}#about`, label: t('common.about') },
    { to: `/${lang}#partners`, label: t('common.partners') },
    { to: `/${lang}/contacts`, label: t('common.contacts') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

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

  return (
    <>
      <header
        className={`
          fixed inset-x-0 top-0 z-50
          border-b
          transition-all duration-300
          ${
            isScrolled
              ? `
                border-white/5
                bg-[rgba(7,17,13,0.72)]
                shadow-[0_10px_30px_rgba(0,0,0,0.14)]
                backdrop-blur-xl
              `
              : `
                border-transparent
                bg-transparent
              `
          }
        `}
      >
        <div
          className="
            mx-auto
            flex h-[72px]
            w-[calc(100%-48px)]
            max-w-[1440px]
            items-center
            gap-10
            max-[900px]:h-[68px]
            max-[900px]:w-[calc(100%-32px)]
            max-[480px]:w-[calc(100%-24px)]
          "
        >
          <Link
            to="/"
            aria-label="VV Work"
            onClick={closeMenu}
            className="flex shrink-0 items-center gap-2 font-bold text-white"
          >
            <span className="text-xl font-extrabold tracking-[-0.12em] text-[var(--color-primary)]">
              VV
            </span>
            <span className="text-[17px]">Work</span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="mr-auto flex items-center gap-7 max-[1100px]:gap-5 max-[900px]:hidden"
          >
            {navItems.map((item) => (
              <NavLink
                key={`${item.to}-${item.label}`}
                to={item.to}
                className="text-[15px] font-medium tracking-[-0.03em] text-white/80 transition-colors duration-200 hover:text-white max-[1100px]:text-xs"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />

            {/* ДЕСКТОПНА КНОПКА (ВИПРАВЛЕНО) */}
            <div className="max-[900px]:hidden">
              <Button variant="outline" size="sm" onClick={handleLoginClick}>
                {t('common.login')}
              </Button>
            </div>

            {/* МОБІЛЬНИЙ ГАМБУРГЕР */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={
                isMenuOpen ? t('common.closeMenu') : t('common.openMenu')
              }
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              className="hidden h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-border)] bg-white/[0.03] text-white transition-colors duration-200 hover:bg-white/[0.07] max-[900px]:inline-flex"
            >
              {isMenuOpen ? (
                <X size={22} aria-hidden="true" />
              ) : (
                <Menu size={22} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* МОБІЛЬНЕ МЕНЮ */}
        <div
          id="mobile-navigation"
          className={`
            fixed inset-x-0 top-[68px]
            overflow-hidden
            border-b border-white/10
            bg-[rgba(7,17,13,0.96)]
            backdrop-blur-xl
            transition-all duration-300
            ${
              isMenuOpen
                ? 'visible max-h-[520px] opacity-100'
                : 'invisible max-h-0 opacity-0'
            }
          `}
        >
          <div className="mx-auto w-[calc(100%-32px)] max-w-[768px] py-6">
            <nav aria-label="Mobile navigation" className="flex flex-col mb-4">
              {navItems.map((item) => (
                <NavLink
                  key={`mobile-${item.to}-${item.label}`}
                  to={item.to}
                  onClick={closeMenu}
                  className="border-b border-[var(--color-border)] py-4 text-[17px] font-semibold text-white transition-colors duration-200 hover:text-[var(--color-primary)]"
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* МОБІЛЬНА КНОПКА */}
            <Button
              variant="outline"
              size="sm"
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
