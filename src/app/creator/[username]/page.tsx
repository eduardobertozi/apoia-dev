import Image from 'next/image'
import { getInfoUser } from './_data-access/get-info-user'
import { notFound } from 'next/navigation'
import { fakeAvatar } from '@/constants/fake-avatar'
import { FormDonate } from './_components/form/form'
import { CoverSection } from './_components/cover-section'
import { AboutSection } from './_components/about-section'

export default async function Apoia({
  params
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  const user = await getInfoUser({ username })

  if (!user) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <CoverSection
        coverImage={user?.image ?? ''}
        profileImage={user?.image ?? ''}
        name={user?.name ?? 'Sem Nome'}
      />
      <main className="container mx-auto max-w-6xl p-4 sm:p-6">
        <div className="relative grid grid-cols-1 gap-6 -mt-8 z-10 lg:grid-cols-2 lg:gap-8 md:-mt-12">
          <div>
            <AboutSection name={user?.name ?? ''} bio={user?.bio ?? ''} />
          </div>

          <div>
            <FormDonate
              slug={user.username!}
              creatorId={user.connectedStripeAccountId ?? ''}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
