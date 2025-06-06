import { Users, DollarSign, Wallet } from 'lucide-react'
import { StatCard } from './stats-card'
import { getStatsCreator } from '../_data_access/get-stats-creator'
import { formatCurrency } from '@/utils/format-currency'
export async function Stats() {
  const stats = await getStatsCreator()

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-6">
      <StatCard
        title="Apoiadores"
        description="Total de apoiadores"
        icon={<Users className="w-8 h-8 text-blue-400" />}
        value={stats.totalDonations ?? 0}
      />

      <StatCard
        title="Total recebido"
        description="Quantidade total recebida"
        icon={<DollarSign className="w-8 h-8 text-amber-500" />}
        value={formatCurrency((stats.totalAmountDonated ?? 0) / 100)}
      />

      <StatCard
        title="Saldo em conta"
        description="Saldo pendente"
        icon={<Wallet className="w-8 h-8 text-green-500" />}
        value={formatCurrency((stats.balance ?? 0) / 100)}
      />
    </div>
  )
}
