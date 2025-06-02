'use client'

import { ChangeEvent, useState, useRef } from 'react'
import { debounce } from 'lodash'
import { changeDescription } from '../_actions/change-description'
import { toast } from 'sonner'

type DescriptionProps = {
  initialDescription: string
}

export const Description = ({ initialDescription }: DescriptionProps) => {
  const [description, setDescription] = useState(initialDescription)
  const [originalDescription, setOriginalDescription] =
    useState(initialDescription)

  const debouncedSaveDescription = useRef(
    debounce(async (currentDescription: string) => {
      if (currentDescription.trim() === '') {
        setDescription(originalDescription)
        return
      }

      if (currentDescription !== description) {
        try {
          const response = await changeDescription({
            description: currentDescription
          })

          if (response.error) {
            console.log(response.error)
            toast.error(response.error)
            setDescription(originalDescription)
            return
          }

          setOriginalDescription(currentDescription)
          toast.success('Bio alterada com sucesso!')
        } catch (err) {
          toast.error('Erro ao salvar bio')
          setDescription(originalDescription)
        }
      }
    }, 1000)
  ).current

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value

    setDescription(value)
    debouncedSaveDescription(value)
  }

  return (
    <textarea
      className="bg-gray-50 border border-gray-100 rounded-md outline-none p-2 w-full h-40 max-w-2xl my-3 resize-none text-center"
      value={description}
      onChange={handleChange}
    />
  )
}
