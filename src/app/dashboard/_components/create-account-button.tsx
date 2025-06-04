'use client'

import { Button } from '@/components/ui/button'
import { env } from '@/env/public-env'
import { useTransition } from 'react'
import { toast } from 'sonner'

export const CreateAccountButton = () => {
  const [loading, startTransition] = useTransition()

  function handleCreateStripeAccount() {
    startTransition(async () => {
      try {
        const res = await fetch(
          `${env.NEXT_PUBLIC_URL_HOST}/api/stripe/create-account`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        if (!res.ok) {
          toast.error('Falha ao criar conta de pagamento')
          return
        }

        const data = await res.json()

        window.location.href = data.url
      } catch (err) {
        console.error(err)
      }
    })
  }

  return (
    <div className="mb-5">
      <Button
        onClick={handleCreateStripeAccount}
        disabled={loading}
        className="cursor-pointer"
      >
        {loading ? 'Ativando conta...' : 'Ativar Conta de Pagamento'}
      </Button>
    </div>
  )
}
