'use server'

import { auth } from '@/lib/auth'
import { stripe } from '@/lib/stripe'

export async function getStripeDashboardUrl() {
  const session = await auth()

  if (!session?.user) {
    return null
  }

  try {
    const accountId = session.user.connectedStripeAccountId

    if (!accountId) {
      return null
    }

    const loginLink = await stripe.accounts.createLoginLink(accountId)

    return loginLink.url
  } catch (err) {
    return null
  }
}
