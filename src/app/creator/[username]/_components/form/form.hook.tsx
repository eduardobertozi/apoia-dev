import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormData, formSchema } from './form.schema'
import { createPayment } from '../../_actions/create-payment'
import { FormDonateProps } from './form'

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

    console.log(checkout)
  }

  return {
    form,
    onSubmit
  }
}
