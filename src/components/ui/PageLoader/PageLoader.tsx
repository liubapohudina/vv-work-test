export const PageLoader = () => {
  return (
    <div
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-[var(--color-bg)]
      "
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div
            className="
              absolute inset-0
              rounded-full
              bg-[var(--color-primary)]/15
              blur-xl
            "
          />

          <div
            className="
              h-12 w-12
              animate-spin
              rounded-full
              border-2
              border-white/10
              border-t-[var(--color-primary)]
            "
          />

          <span
            className="
              absolute
              text-xs font-extrabold
              tracking-[-0.08em]
              text-[var(--color-primary)]
            "
          >
            VV
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span
            className="
              text-lg font-extrabold
              tracking-[-0.08em]
              text-[var(--color-primary)]
            "
          >
            VV
          </span>

          <span
            className="
              text-lg font-bold
              text-white
            "
          >
            Work
          </span>
        </div>

        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
