import type { ReactNode } from 'react';

type LegalPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  children: ReactNode;
};

export const LegalPage = ({
  eyebrow,
  title,
  description,
  updated,
  children,
}: LegalPageProps) => {
  return (
    <div
      className="
        min-h-screen
        bg-[var(--color-bg)]
        pb-20
        pt-28
        lg:pt-32
      "
    >
      <main
        className="
          mx-auto
          max-w-[900px]
          px-4
          sm:px-6
        "
      >
        <header
          className="
            border-b
            border-[var(--color-border)]
            pb-8
          "
        >
          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.18em]
              text-[var(--color-primary)]
            "
          >
            {eyebrow}
          </p>

          <h1
            className="
              mt-4
              text-3xl
              font-extrabold
              tracking-[-0.04em]
              text-[var(--color-text-primary)]
              sm:text-4xl
              lg:text-5xl
            "
          >
            {title}
          </h1>

          <p
            className="
              mt-5
              max-w-[720px]
              text-sm
              leading-7
              text-[var(--color-text-secondary)]
              sm:text-base
            "
          >
            {description}
          </p>

          <p
            className="
              mt-5
              text-xs
              text-[var(--color-text-muted)]
            "
          >
            {updated}
          </p>
        </header>

        <div className="mt-10 space-y-10">{children}</div>
      </main>
    </div>
  );
};
