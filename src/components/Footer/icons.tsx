type SocialIconProps = {
  size?: number;
};

export const LinkedInIcon = ({ size = 18 }: SocialIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M6.5 8.5H3.2V21h3.3V8.5ZM4.85 3A1.92 1.92 0 1 0 4.85 6.84 1.92 1.92 0 0 0 4.85 3ZM21 13.84c0-3.77-2.01-5.52-4.7-5.52-2.16 0-3.13 1.19-3.67 2.03V8.5H9.34V21h3.29v-6.19c0-1.63.31-3.21 2.33-3.21 1.99 0 2.01 1.86 2.01 3.32V21H21v-7.16Z" />
  </svg>
);

export const InstagramIcon = ({ size = 18 }: SocialIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const XIcon = ({ size = 17 }: SocialIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.36l7.26-8.3L2.97 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.84h1.72L8.43 4.05H6.58L17.8 19.84Z" />
  </svg>
);

export const TelegramIcon = ({ size = 18 }: SocialIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M21.6 3.2 18.4 20c-.24 1.19-.87 1.48-1.77.92l-4.87-3.59-2.35 2.26c-.26.26-.48.48-.98.48l.35-4.96 9.03-8.16c.39-.35-.09-.55-.61-.2L6.04 13.78 1.23 12.28c-1.05-.33-1.07-1.05.22-1.55L20.27 3.48c.87-.32 1.63.2 1.33-.28Z" />
  </svg>
);
