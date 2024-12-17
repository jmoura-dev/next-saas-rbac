import { api } from './api-client'

interface RemoveMemberRequest {
  org: string
  memberId: string
}

type RemoveMemberResponse = void

export async function removeMember({ org, memberId }: RemoveMemberRequest) {
  await api
    .delete(`organizations/${org}/members/${memberId}`)
    .json<RemoveMemberResponse>()
}