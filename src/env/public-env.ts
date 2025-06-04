import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_URL_HOST: z.string(),
  NEXT_PUBLIC_STRIPE_PUBLIC_KEY: z.string()
})

const _env = envSchema.safeParse(process.env)

export const env = _env.data
