import { cookies } from 'next/headers'

export async function isAuthenticated() {
  return !!cookies().get('token')?.value
}
