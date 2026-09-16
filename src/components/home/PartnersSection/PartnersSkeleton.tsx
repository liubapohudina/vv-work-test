import { Skeleton } from '@/components/ui/Skeleton';

type PartnersSkeletonProps = {
  count?: number;
};

export const PartnersSkeleton = ({ count = 4 }: PartnersSkeletonProps) => {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-2
        xl:grid-cols-4
      "
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="
            min-h-[270px]
            rounded-[22px]
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            p-5
            sm:p-6
          "
        >
          <div className="flex items-start justify-between gap-4">
            <Skeleton className="h-14 w-14 rounded-[16px]" />
            <Skeleton className="h-7 w-[90px] rounded-full" />
          </div>

          <Skeleton className="mt-5 h-6 w-[65%]" />
          <Skeleton className="mt-3 h-4 w-[45%]" />

          <div className="mt-5 space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-[82%]" />
          </div>

          <div
            className="
              mt-8
              flex
              items-center
              justify-between
              border-t
              border-[var(--color-border)]
              pt-5
            "
          >
            <Skeleton className="h-4 w-[90px]" />
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};
