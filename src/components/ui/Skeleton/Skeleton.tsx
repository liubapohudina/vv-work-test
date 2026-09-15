type SkeletonProps = {
  className?: string;
};

export const Skeleton = ({ className = '' }: SkeletonProps) => {
  return (
    <div
      aria-hidden="true"
      className={`
        animate-pulse
        rounded-lg
        bg-white/[0.08]
        ${className}
      `}
    />
  );
};
