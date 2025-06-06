'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { useFormUsername } from './form.hook'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export type FormDonateProps = {
  slug: string
  creatorId: string
}

export const FormDonate = ({ slug, creatorId }: FormDonateProps) => {
  const { form, onSubmit } = useFormUsername({ slug, creatorId })

  return (
    <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2  text-xl font-bold text-gray-900 sm:text-2xl">
          <div className="h-6 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
          Apoiar
        </CardTitle>
        <CardDescription>
          Sua contribuição ajuda a manter o conteúdo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Sua mensagem..."
                      className="resize-none max-h-20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor da Doação</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center gap-4"
                      {...field}
                    >
                      {['15', '25', '35'].map((value) => (
                        <div key={value} className="flex items-center gap-2">
                          <RadioGroupItem
                            className="size-5 bg-gray-50"
                            value={value}
                            id={value}
                          />
                          <Label className="text-lg" htmlFor={value}>
                            R$ {value}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="w-full"
            >
              {form.formState.isSubmitting ? 'Carregando...' : 'Fazer doação'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
