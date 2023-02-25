import { IRepository } from '../../../models/Repo'
import { request } from './wrapper'

export async function getRepositories(): Promise<IRepository[]> {
  return request<IRepository[]>({ url: '/api/repositories' }, [])
}
