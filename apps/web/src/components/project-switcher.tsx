'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useQuery } from '@tanstack/react-query'
import { ChevronsUpDown, Loader2, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { getProjects } from '@/http/get-projects'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

export function ProjectSwitcher() {
  const { slug: orgSlug, project: projectSlug } = useParams<{
    slug: string
    project: string
  }>()

  const { data, isLoading } = useQuery({
    queryKey: [orgSlug, 'projects'],
    queryFn: () => getProjects(orgSlug),
    enabled: !!orgSlug,
  })

  const currentProject =
    data && projectSlug
      ? data.projects.find((project) => project.slug === projectSlug)
      : null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible: flex w-[168px] items-center gap-2 rounded p-2 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
        {isLoading ? (
          <>
            <Skeleton className="size-4 shrink-0 rounded-full" />
            <Skeleton className="h-4 w-full" />
          </>
        ) : (
          <>
            {currentProject ? (
              <>
                <Avatar className="size-4">
                  {currentProject.avatarUrl && (
                    <AvatarImage src="https://github.com/rocketseat.png" />
                  )}
                  <AvatarFallback />
                </Avatar>
                <span className="truncate text-left">
                  {currentProject.name}
                </span>
              </>
            ) : (
              <span className="text-muted-foreground">Select project</span>
            )}
          </>
        )}

        {isLoading ? (
          <Loader2 className="ml-auto size-4 shrink-0 animate-spin text-muted-foreground" />
        ) : (
          <ChevronsUpDown className="ml-auto size-4 shrink-0 text-muted-foreground" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        className="w-[200px]"
        sideOffset={12}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Projects</DropdownMenuLabel>
          {data &&
            data.projects.map((project) => {
              return (
                <DropdownMenuItem key={project.id} asChild>
                  <Link href={`/org/${orgSlug}/project/${project.slug}`}>
                    <Avatar className="mr-2 size-4">
                      {project.avatarUrl && (
                        <AvatarImage src="https://github.com/rocketseat.png" />
                      )}
                      <AvatarFallback />
                    </Avatar>
                    <span className="line-clamp-1">{project.name}</span>
                  </Link>
                </DropdownMenuItem>
              )
            })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/org/${orgSlug}/create-project`}>
            <PlusCircle className="mr-2 size-4" />
            Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
