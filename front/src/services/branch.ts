import { IBranch } from '../models/Branch'
import { Axios } from './Axios'

export async function getBranches(repo: string): Promise<IBranch[]> {
  const { data } = await Axios.get<IBranch[]>(`/api/repo/${repo}/branches`)
  return data
}

export async function deleteBranch(repo: string, name: string): Promise<void> {
  await Axios.delete(`/api/repo/${repo}/branches/${name}`)
}
