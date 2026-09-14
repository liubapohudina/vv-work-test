import { Info, X } from 'lucide-react';
import { useEffect } from 'react';

type ToastProps = {
  isOpen: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  duration?: number;
};

export const Toast = ({
  isOpen,
  title,
  description,
  onClose,
  duration = 3500,
}: ToastProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const timer = window.setTimeout(onClose, duration);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="
        fixed
        right-6
        top-24
        z-[100]

        w-[300px]

        rounded-[18px]

        border
        border-white/[0.10]

        bg-[rgba(10,24,17,0.92)]

        p-4

        text-white

        shadow-[0_20px_60px_rgba(0,0,0,0.35)]

        backdrop-blur-xl

        animate-[toast-in_250ms_ease-out]

        max-[480px]:
          left-4
          right-4
          top-20
          w-auto
      "
    >
      <div className="flex items-start gap-3">
        <div
          className="
            grid
            h-10
            w-10
            shrink-0
            place-items-center

            rounded-full

            border
            border-[rgba(34,204,86,0.25)]

            bg-[rgba(34,204,86,0.08)]

            text-[var(--color-primary)]
          "
        >
          <Info size={19} strokeWidth={2} aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <strong
            className="
              block
              text-[14px]
              font-semibold
              text-white
            "
          >
            {title}
          </strong>

          {description && (
            <p
              className="
                mt-1
                text-[13px]
                leading-[1.45]
                text-white/60
              "
            >
              {description}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          className="
            grid
            h-8
            w-8
            shrink-0
            place-items-center

            rounded-full

            text-white/50

            transition-colors

            hover:
              bg-white/[0.06]
              text-white
          "
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
