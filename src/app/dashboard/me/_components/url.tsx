"use client"

import { Button } from "@/components/ui/button"
import { createUsername } from "../_actions/create-username"
import { useState } from "react"

export const UrlPreview = () => {
  const [error, setError] = useState<null | string>(null)

  const userURL = `${process.env.NEXT_PUBLIC_URL_HOST}/creator/`

  const submitAction = async (formData: FormData) => {
    const username = formData.get("username") as string

    if (username === "") {
      return
    }

    const response = await createUsername({ username })

    if (response.error) {
      setError(response.error)
      return
    }
  }
  
  return (
    <div className="flex flex-col w-full flex-1 gap-4 p-2 text-gray-100">
      <form 
        action={submitAction}
        className="flex flex-1 flex-col gap-4 items-start md:items-center md:flex-row"
      >
        <div className="flex items-center justify-center w-full">
          <p className="max-w-[180px] truncate md:max-w-full" title={userURL}>
            {userURL}
          </p>
          <input 
            type="text" 
            className="flex-1 outline-none border h-9 border-gray-300 bg-gray-50 text-black rounded-md px-1"
            placeholder="Digite seu username"
            name="username"
          />
        </div>

        <Button type="submit" className="cursor-pointer bg-blue-500 h-9 w-full md:w-fit text-white px-4 rounded-md hover:bg-blue-600 transition-colors">
          Salvar
        </Button>
      </form>
      <p className="text-sm text-destructive">* {error && error}</p>
    </div>
  )
}