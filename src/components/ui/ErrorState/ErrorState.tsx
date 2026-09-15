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
      className="
        flex items-center justify-between gap-4
        rounded-[14px]
        border border-red-400/20
        bg-red-400/[0.07]
        px-4 py-3
        max-sm:flex-col
        max-sm:items-start
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="
            grid h-9 w-9 shrink-0 place-items-center
            rounded-full
            bg-red-400/10
            text-red-400
          "
        >
          <TriangleAlert size={18} aria-hidden="true" />
        </div>

        <div>
          <p className="text-[13px] font-semibold text-white">
            {t('common.loadError')}
          </p>

          {message && (
            <p className="mt-0.5 text-[11px] text-white/55">{message}</p>
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
          !isRetrying ? <RefreshCw size={15} aria-hidden="true" /> : undefined
        }
        className="shrink-0"
      >
        {t('common.retry')}
      </Button>
    </div>
  );
};
