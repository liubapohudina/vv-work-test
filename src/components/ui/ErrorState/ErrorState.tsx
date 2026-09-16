import { RefreshCw, TriangleAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/Button';

type ErrorStateProps = {
  message?: string;
  onRetry: () => void;
  isRetrying?: boolean;
};

export const ErrorState = ({
  message,
  onRetry,
  isRetrying = false,
}: ErrorStateProps) => {
  const { t } = useTranslation();

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="
        flex
        items-center
        justify-between
        gap-4
        rounded-[16px]
        border
        border-[color-mix(in_srgb,var(--color-error)_25%,transparent)]
        bg-[color-mix(in_srgb,var(--color-error)_7%,var(--color-surface))]
        px-4
        py-3.5

        max-sm:flex-col
        max-sm:items-stretch

        sm:px-5
        sm:py-4
      "
    >
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="
            grid
            h-10
            w-10
            shrink-0
            place-items-center
            rounded-full
            bg-[color-mix(in_srgb,var(--color-error)_12%,transparent)]
            text-[var(--color-error)]
          "
        >
          <TriangleAlert size={19} strokeWidth={2} aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <p
            className="
              text-[13px]
              font-bold
              leading-[1.35]
              text-[var(--color-text-primary)]
            "
          >
            {t('common.loadError')}
          </p>

          {message && (
            <p
              className="
                mt-1
                text-[11px]
                font-medium
                leading-[1.5]
                text-[var(--color-text-secondary)]
                sm:text-[12px]
              "
            >
              {message}
            </p>
          )}
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        loading={isRetrying}
        onClick={onRetry}
        leftIcon={
          !isRetrying ? (
            <RefreshCw size={15} strokeWidth={2} aria-hidden="true" />
          ) : undefined
        }
        className="shrink-0 max-sm:w-full"
      >
        {t('common.retry')}
      </Button>
    </div>
  );
};
