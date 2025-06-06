import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type AboutSectionProps = {
  name: string
  bio: string
}

export const AboutSection = ({ name, bio }: AboutSectionProps) => {
  return (
    <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2  text-xl font-bold text-gray-900 sm:text-2xl">
          <div className="h-6 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
          Sobre {name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="">
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">{bio}</p>
        </div>
      </CardContent>
    </Card>
  )
}
