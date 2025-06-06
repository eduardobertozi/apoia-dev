import { NextResponse, NextRequest } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { env } from '@/env/env'

export const POST = async (request: NextRequest) => {
  const sig = request.headers.get('stripe-signature')!
  const endpointSecret = env.STRIPE_WEBHOOK_SECRET

  let event: Stripe.Event

  try {
    const payload = await request.text()
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
  } catch (err) {
    console.log('Falha ao autenticar assinatura', err)
    return NextResponse.json(
      { error: `Webhook error: ${err}` },
      { status: 400 }
    )
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session
      const paymentIntentId = session.payment_intent as string

      // pegar as informações do pagamento
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId
      )
      console.log('## PAYMENT INTENT', paymentIntent)

      const donationId = paymentIntent.metadata.donationId

      try {
        const updateDonation = await prisma.donation.update({
          where: {
            id: donationId
          },
          data: {
            status: 'PAID'
          }
        })

        console.log('## UPDATE DONATION', updateDonation)
      } catch (err) {
        console.log('## ERRO', err)
      }

      break
    default:
      console.log('## EVENTO NÃO TRATADO')
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
