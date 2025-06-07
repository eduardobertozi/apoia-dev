import { StatsSkeleton } from '@/components/skeletons/stats-skeleton'
import { TableSkeleton } from '@/components/skeletons/table-skeleton'

export default function Loading() {
  return (
    <div className="p-4">
      <section className="flex items-center justify-between mb-4">
        <div className="w-full flex items-center gap-2 justify-between">
          <div className="w-32 h-10 bg-zinc-100 animate-pulse rounded-md" />

          <div className="w-32 bg-zinc-100 px-4 py-1 rounded-md text-white" />
        </div>
      </section>

      <div className="w-32 h-10 bg-zinc-100 animate-pulse rounded-md mb-2" />
      <StatsSkeleton />

      <TableSkeleton />
    </div>
  )
}
