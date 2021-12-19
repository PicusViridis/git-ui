import axios from 'axios'
import { IUser } from '../../../models/User'
import { request } from './wrapper'

export async function getSession(): Promise<IUser | null> {
  return axios
    .get<IUser>(`/api/session`, { withCredentials: true })
    .then((res) => res.data)
    .catch(() => null)
}

export async function login(username: string, password: string): Promise<void> {
  return request({ url: `/api/login`, data: { username, password } }, undefined)
}

export async function logout(): Promise<void> {
  return request({ url: `/api/logout` }, undefined).then(() => {
    window.location.reload()
  })
}
