import type { ReactNode } from 'react';

type PartnerStatProps = {
  value: string;
  label: string;
  icon?: ReactNode;
};

export const PartnerStat = ({ value, label, icon }: PartnerStatProps) => {
  return (
    <div className="text-center">
      <div
        className="
          flex
          items-center
          justify-center
          gap-1.5
          text-xl
          font-extrabold
          text-white
          sm:text-2xl
        "
      >
        {value}

        {icon && <span className="text-[var(--color-primary)]">{icon}</span>}
      </div>

      <p
        className="
          mt-1
          text-[10px]
          font-medium
          text-white/45
          sm:text-xs
        "
      >
        {label}
      </p>
    </div>
  );
};
