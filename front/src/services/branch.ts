import { request } from './wrapper'

export async function getBranches(repo: string): Promise<string[]> {
  return request<string[]>({ url: `/api/repo/${repo}/branches` }, [])
}
