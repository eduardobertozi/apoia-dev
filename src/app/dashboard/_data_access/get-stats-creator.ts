'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'

export async function getStatsCreator() {
  const session = await auth()

  if (!session?.user) {
    return {
      error: 'Usuário não autenticado'
    }
  }

  try {
    const [totalDonations, totalAmountDonated, balance] = await Promise.all([
      prisma.donation.count({
        where: {
          userId: session.user.id,
          status: 'PAID'
        }
      }),

      prisma.donation.aggregate({
        where: {
          userId: session.user.id,
          status: 'PAID'
        },
        _sum: {
          amount: true
        }
      }),

      stripe.balance.retrieve({
        stripeAccount: session.user.connectedStripeAccountId!
      })
    ])

    return {
      totalDonations: totalDonations,
      totalAmountDonated: totalAmountDonated._sum.amount ?? 0,
      balance: balance?.pending[0]?.amount ?? 0
    }
  } catch (err) {
    return {
      error: 'Falha ao buscar estatísticas'
    }
  }
}
