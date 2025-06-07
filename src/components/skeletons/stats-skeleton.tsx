export const StatsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 mb-6 md:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-full h-36 animate-pulse bg-gradient-to-r from-slate-100 to-slate-200 rounded-md"
        />
      ))}
    </div>
  )
}
