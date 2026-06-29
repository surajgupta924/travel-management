export const Skeleton = ({ width, height, className = '', style = {} }) => (
  <div className={`skeleton ${className}`} style={{ width, height, ...style }} />
);

export const PackageCardSkeleton = () => (
  <div className="card skeleton-card">
    <Skeleton height={220} className="skeleton-img" />
    <div style={{ padding: 20 }}>
      <Skeleton height={20} width="80%" style={{ marginBottom: 12 }} />
      <Skeleton height={14} width="60%" style={{ marginBottom: 8 }} />
      <Skeleton height={14} width="40%" />
    </div>
  </div>
);

export const GridSkeleton = ({ count = 6 }) => (
  <div className="grid-3">
    {Array.from({ length: count }).map((_, i) => <PackageCardSkeleton key={i} />)}
  </div>
);

export default Skeleton;
