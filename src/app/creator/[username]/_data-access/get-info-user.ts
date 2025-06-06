'use server'

import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const usernameSchema = z.object({
  username: z.string({ message: 'O username é obrigatório' })
})

type UsernameSchema = z.infer<typeof usernameSchema>

export async function getInfoUser(data: UsernameSchema) {
  const schema = usernameSchema.safeParse(data)

  if (!schema.success) {
    return null
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: data.username
      },
      select: {
        id: true,
        name: true,
        username: true,
        bio: true,
        image: true,
        connectedStripeAccountId: true
      }
    })

    return user
  } catch (err) {
    return null
  }
}
