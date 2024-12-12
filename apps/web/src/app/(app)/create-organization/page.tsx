import { Header } from '@/components/header'

import { OrganizationForm } from './organization-form'

export default function CreateOrganization() {
  return (
    <div className="mx-auto w-full max-w-[1200] space-y-4 py-4">
      <Header />
      <h1 className="text-2xl font-bold">Create Organization</h1>

      <OrganizationForm />
    </div>
  )
}
