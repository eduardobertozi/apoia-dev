'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function getAllDonates() {
  const session = await auth()

  if (!session?.user) {
    return {
      error: 'Usuário não autenticado'
    }
  }

  try {
    const donates = await prisma.donation.findMany({
      where: {
        userId: session.user.id,
        status: 'PAID'
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        amount: true,
        donorName: true,
        donorMessage: true,
        createdAt: true
      }
    })

    return {
      data: donates
    }
  } catch (err) {
    return {
      error: 'Erro ao buscar doacoes'
    }
  }
}
