import { Axios } from './Axios'

export async function getServerUrl(): Promise<string> {
  const { data } = await Axios.get<string>('/api/serverurl')
  return data
}
