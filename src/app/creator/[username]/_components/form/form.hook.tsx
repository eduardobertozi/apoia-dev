import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormData, formSchema } from './form.schema'
import { createPayment } from '../../_actions/create-payment'
import { FormDonateProps } from './form'
import { toast } from 'sonner'
import { getStripeJs } from '@/lib/stripe-js'

export const useFormUsername = ({ slug, creatorId }: FormDonateProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      message: '',
      price: '15'
    }
  })

  const onSubmit = async (data: FormData) => {
    const priceInCents = Number(data.price) * 100

    const checkout = await createPayment({
      name: data.name,
      message: data.message,
      price: priceInCents,
      creatorId,
      slug
    })

    if (checkout.error) {
      toast.error(checkout.error)
      return
    }

    if (checkout.data) {
      const data = JSON.parse(checkout.data)
      const stripe = await getStripeJs()

      await stripe?.redirectToCheckout({
        sessionId: data.id
      })

      window.location.href = data.url
    }
  }

  return {
    form,
    onSubmit
  }
}
