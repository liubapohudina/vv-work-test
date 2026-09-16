import { Mail, MapPin, Phone, Send, type LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type ContactItem = {
  id: string;
  icon: LucideIcon;
  labelKey: string;
  value: string;
  href?: string;
};

const contactItems: ContactItem[] = [
  {
    id: 'email',
    icon: Mail,
    labelKey: 'contacts.info.email',
    value: 'info@vvwork.eu',
    href: 'mailto:info@vvwork.eu',
  },
  {
    id: 'phone',
    icon: Phone,
    labelKey: 'contacts.info.phone',
    value: '+48 123 456 789',
    href: 'tel:+48123456789',
  },
  {
    id: 'address',
    icon: MapPin,
    labelKey: 'contacts.info.address',
    value: 'al. Marszałkowska 123, Warsaw, Poland',
  },
  {
    id: 'telegram',
    icon: Send,
    labelKey: 'contacts.info.telegram',
    value: 't.me/vvwork',
    href: 'https://t.me/vvwork',
  },
];

export const ContactInfo = () => {
  const { t } = useTranslation();

  return (
    <div>
      <span
        className="
          inline-flex rounded-full
          border border-[rgba(34,204,86,0.18)]
          bg-[rgba(34,204,86,0.06)]
          px-3 py-1.5
          text-[11px] font-bold uppercase
          tracking-[0.08em]
          text-[var(--color-primary)]
        "
      >
        {t('contacts.eyebrow')}
      </span>

      <h1
        className="
          mt-4 text-3xl font-extrabold
          tracking-[-0.04em]
          text-[var(--color-text-primary)]
          sm:text-4xl
        "
      >
        {t('contacts.title')}
      </h1>

      <p
        className="
          mt-3 max-w-[500px]
          text-sm leading-6
          text-[var(--color-text-secondary)]
          sm:text-[15px]
        "
      >
        {t('contacts.description')}
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {contactItems.map((item) => {
          const Icon = item.icon;

          const content = (
            <>
              <div
                className="
                  grid h-9 w-9 place-items-center
                  rounded-[10px]
                  bg-[rgba(34,204,86,0.08)]
                  text-[var(--color-primary)]
                "
              >
                <Icon size={17} />
              </div>

              <div className="mt-4">
                <p
                  className="
                    text-[11px] font-semibold
                    text-[var(--color-text-muted)]
                  "
                >
                  {t(item.labelKey)}
                </p>

                <p
                  className="
                    mt-1 text-[13px] font-semibold
                    leading-5
                    text-[var(--color-text-primary)]
                  "
                >
                  {item.value}
                </p>
              </div>
            </>
          );

          const classes = `
            block min-h-[125px]
            rounded-2xl
            border border-[var(--color-border)]
            bg-[var(--color-card)]
            p-4
            transition
            hover:border-[var(--color-border-strong)]
            hover:bg-[var(--color-card-hover)]
          `;

          return item.href ? (
            <a key={item.id} href={item.href} className={classes}>
              {content}
            </a>
          ) : (
            <div key={item.id} className={classes}>
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
};
