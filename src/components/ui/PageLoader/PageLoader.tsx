import { LoaderCircle } from 'lucide-react';

export const PageLoader = () => {
  return (
    <div
      className="
        flex
        min-h-[100svh]
        items-center
        justify-center
        bg-[var(--color-bg)]
      "
      role="status"
      aria-label="Loading"
    >
      <LoaderCircle
        size={28}
        className="
          animate-spin
          text-[var(--color-primary)]
        "
        aria-hidden="true"
      />
    </div>
  );
};
