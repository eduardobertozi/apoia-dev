'use client'

import { Users, DollarSign, Wallet } from 'lucide-react'
import { StatCard } from './stats-card'
import { getStatsCreator } from '../_data_access/get-stats-creator'
import { formatCurrency } from '@/utils/format'
import { useQuery } from '@tanstack/react-query'
import { StatsSkeleton } from '@/components/skeletons/stats-skeleton'

type StatProp = {
  totalDonations: number
  totalAmountDonated: number
  balance: number
}

export function Stats() {
  const { data, isLoading } = useQuery<StatProp>({
    queryKey: ['get-stats-creator'],
    queryFn: async () => {
      const stats = await getStatsCreator()

      return {
        balance: stats.balance || 0,
        totalAmountDonated: stats.totalAmountDonated || 0,
        totalDonations: stats.totalDonations || 0
      }
    },
    refetchInterval: 30000
  })

  if (isLoading) {
    return <StatsSkeleton />
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-6">
      <StatCard
        title="Apoiadores"
        description="Total de apoiadores"
        icon={<Users className="w-8 h-8 text-blue-400" />}
        value={data?.totalDonations ?? 0}
      />

      <StatCard
        title="Total recebido"
        description="Quantidade total recebida"
        icon={<DollarSign className="w-8 h-8 text-amber-500" />}
        value={formatCurrency((data?.totalAmountDonated ?? 0) / 100)}
      />

      <StatCard
        title="Saldo em conta"
        description="Saldo pendente"
        icon={<Wallet className="w-8 h-8 text-green-500" />}
        value={formatCurrency((data?.balance ?? 0) / 100)}
      />
    </div>
  )
}
