"use server"

import { z } from "zod"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { createSlugUsername } from '@/utils/create-slug-username'

const createUsernameSchema = z.object({
  username: z.string({
    message: "O username é obrigatório",
  }).min(4, {
    message: "O username precisa ter no mínimo 4 caracteres",
  }).transform((val) => createSlugUsername(val))
})

type CreateUsernameFormData = z.infer<typeof createUsernameSchema>

export async function createUsername(data: CreateUsernameFormData) {
  const session = await auth()

  if (!session?.user) {
    return {
      data: null,
      error: "Usuário não autenticado",
    }
  }
  
  const schema = createUsernameSchema.safeParse(data)

  if (!schema.success) {
    return {
      data: null,
      error: schema.error.issues[0].message,
    }
  }

  try {
    const userId = session.user.id
    
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username: schema.data.username,
      }
    })

    return {
      data: "Username criado!",
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: "Falha ao atualizar username",
    }
  }
}