'use server'

import { z } from 'zod'

const createPaymentSchema = z.object({
  slug: z.string().min(1, 'Slug do criador é obrigatório'),
  name: z.string().min(1, 'Nome é obrigatório'),
  message: z.string().min(1, 'Mensagem é obrigatória'),
  price: z.number().min(1500, 'Selecione um valor a partir de R$ 15'),
  creatorId: z.string()
})

type CreatePaymentSchema = z.infer<typeof createPaymentSchema>

export async function createPayment(data: CreatePaymentSchema) {
  const schema = createPaymentSchema.safeParse(data)

  if (!schema.success) {
    return {
      data: null,
      error: schema.error.issues[0].message
    }
  }

  try {
    console.log(data)
    return data
  } catch (err) {
    return {
      data: null,
      error: 'Erro ao criar pagamento, tente novamente mais tarde'
    }
  }
}
