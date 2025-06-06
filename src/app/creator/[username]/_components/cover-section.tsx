import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'

type CoverSectionProps = {
  coverImage: string
  profileImage: string
  name: string
}

export const CoverSection = ({
  coverImage,
  profileImage,
  name
}: CoverSectionProps) => {
  return (
    <div className="relative h-48 w-full sm:h-64 md:h-80">
      <Image
        src={coverImage}
        alt="Banner"
        fill
        className="object-cover"
        priority
        quality={100}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      <div className="absolute bottom-2 left-0 right-0 p-4 md:bottom-6 md:p-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-4 sm:items-end sm:flex-row sm:gap-6">
            <div className="relative flex-shrink-0">
              <Avatar className="group size-20 border-2 border-white backdrop-blur-sm shadow-2xl sm:size-24 md:size-32 md:border-4">
                <AvatarImage
                  src={profileImage}
                  className="group-hover:scale-125 duration-300 group-hover:-rotate-6"
                />
                <AvatarFallback className="font-bold text-lg md:text-xl">
                  {name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="pb-0 sm:pb-4 text-center sm:text-start">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-white">
                {name}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
