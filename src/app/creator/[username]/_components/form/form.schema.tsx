import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  message: z.string().min(1, 'Mensagem é obrigatória'),
  price: z.enum(['15', '25', '35'], {
    required_error: 'Valor é obrigatório',
    message: 'Valor inválido'
  })
})

export type FormData = z.infer<typeof formSchema>
