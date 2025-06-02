import Image from 'next/image'
import { Name } from './name'
import { Description } from './description'

type CardProfileProps = {
  user: {
    id: string
    name: string | null
    username: string | null
    bio: string | null
    image: string | null
  }
}

export const CardProfile = ({ user }: CardProfileProps) => {
  return (
    <section className="w-full flex flex-col items-center mx-auto px-4">
      <div className="">
        <Image
          src={
            user.image ||
            'https://avatars.dicebear.com/api/initials/:initials.svg'
          }
          width={104}
          height={104}
          alt={user.name || 'User Avatar'}
          className="rounded-xl bg-gray-50 object-cover border-4 border-white hover:shadow-xl duration-300"
          priority
          quality={100}
        />
      </div>

      <div className="">
        <Name initialName={user.name || 'Digite seu nome'} />
        <Description initialDescription={user.bio || 'Digite sua descrição'} />
      </div>
    </section>
  )
}
