import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Fragment } from 'react'
import { Stats } from './_components/analytics'
import { CreateAccountButton } from './_components/create-account-button'
import { DonationTable } from './_components/donates'
import { getStripeDashboardUrl } from './_data_access/get-stripe-dashboard'

export default async function Dashboard() {
  const session = await auth()

  if (!session?.user) {
    return redirect('/')
  }

  const urlStripeDashboard = await getStripeDashboardUrl()

  return (
    <div className="p-4">
      <section className="flex items-center justify-between mb-4">
        <div className="w-full flex items-center gap-2 justify-between">
          <h1 className="text-2xl font-semibold">Minha conta</h1>

          {urlStripeDashboard && (
            <a
              href={urlStripeDashboard}
              className="bg-zinc-900 px-4 py-1 rounded-md text-white cursor-pointer"
            >
              Ajustar Conta
            </a>
          )}
        </div>
      </section>

      {!session.user.connectedStripeAccountId && <CreateAccountButton />}

      {session.user.connectedStripeAccountId && (
        <Fragment>
          <h2 className="text-2xl font-semibold mb-2">Últimas doações</h2>
          <Stats />
          <DonationTable />
        </Fragment>
      )}
    </div>
  )
}
