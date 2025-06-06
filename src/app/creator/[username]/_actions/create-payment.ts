'use server'

import { env } from '@/env/env'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
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

  if (!data.creatorId) {
    return {
      data: null,
      error: 'Criador não encontrado.'
    }
  }

  try {
    const creator = await prisma.user.findFirst({
      where: {
        connectedStripeAccountId: data.creatorId
      }
    })

    if (!creator) {
      return {
        data: null,
        error: 'Criador não encontrado.'
      }
    }

    // Calcular taxa que o ApoiaDev recebe
    const applicationFeeAmount = Math.floor(data.price * 0.1)

    const donation = await prisma.donation.create({
      data: {
        donorName: data.name,
        donorMessage: data.message,
        userId: creator.id,
        status: 'PENDING',
        amount: data.price - applicationFeeAmount
      }
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${env.HOST_URL}/creator/${data.slug}`,
      cancel_url: `${env.HOST_URL}/creator/${data.slug}`,
      line_items: [
        // Os produtos
        {
          price_data: {
            currency: 'BRL',
            product_data: {
              name: `Apoiar ${creator.name ?? 'Criador de conteúdo'}`
            },
            unit_amount: data.price
          },
          quantity: 1
        }
      ],
      payment_intent_data: {
        application_fee_amount: applicationFeeAmount, // Esse valor precisa estar em centavos
        transfer_data: {
          destination: creator.connectedStripeAccountId! // Quem vai receber o pagamento
        },
        metadata: {
          donorName: data.name,
          donorMessage: data.message,
          donationId: donation.id
        }
      }
    })

    return {
      data: JSON.stringify(session),
      error: null
    }
  } catch (err) {
    console.log(err)

    return {
      data: null,
      error: 'Erro ao criar pagamento, tente novamente mais tarde'
    }
  }
}
