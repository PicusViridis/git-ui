import { IRepository } from '../models/Repo'
import { Axios } from './Axios'

export async function getRepositories(): Promise<IRepository[]> {
  const { data } = await Axios.get<IRepository[]>('/api/repositories')
  return data
}
