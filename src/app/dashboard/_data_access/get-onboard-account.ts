'use server'

import { env } from '@/env/env'
import { stripe } from '@/lib/stripe'
import { z } from 'zod'

const getOnboardAccountSchema = z.object({
  accountId: z.string().nullable().optional()
})

type GetOnboardAccountSchema = z.infer<typeof getOnboardAccountSchema>

export async function getLoginOnboardAccount({
  accountId
}: GetOnboardAccountSchema) {
  if (!accountId) {
    return null
  }

  try {
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${env.HOST_URL}/dashboard`,
      return_url: `${env.HOST_URL}/dashboard`,
      type: 'account_onboarding'
    })

    return accountLink.url
  } catch (err) {
    console.log('## ERRO ACCOUNT ID', err)
    return null
  }
}
