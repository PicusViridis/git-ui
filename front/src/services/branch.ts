import { Axios } from './Axios'

export async function getBranches(repo: string): Promise<string[]> {
  const { data } = await Axios.get<string[]>(`/api/repo/${repo}/branches`)
  return data
}
