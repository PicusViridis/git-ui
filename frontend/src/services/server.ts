import { request } from './wrapper'

export async function getServerUrl(): Promise<string> {
  return request<string>({ url: '/api/serverurl' }, '')
}
