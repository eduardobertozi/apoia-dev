export const TableSkeleton = ({ length = 4 }: { length?: number }) => {
  return (
    <div className="flex flex-col gap-1">
      {Array.from({ length }).map((_, index) => (
        <div
          className="animate-pulse bg-gradient-to-tr from-slate-100 to-slate-200 h-10"
          key={index}
        />
      ))}
    </div>
  )
}
