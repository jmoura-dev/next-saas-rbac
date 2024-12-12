import { Header } from '@/components/header'

import { ProjectForm } from './project-form'

export default function CreateProject() {
  return (
    <div className="mx-auto w-full max-w-[1200] space-y-4 py-4">
      <Header />
      <h1 className="text-2xl font-bold">Create Project</h1>

      <ProjectForm />
    </div>
  )
}
