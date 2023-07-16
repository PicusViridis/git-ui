import { useLocation } from 'react-router-dom'
import { Page, pages } from '../models/Pages'

export function usePage() {
  const { pathname } = useLocation()
  const page = pathname.split('/').at(-1)
  if (isPage(page)) return page
  throw new Error('Cannot use "usePage" hook in this page')
}

function isPage(page?: string): page is Page {
  return page !== undefined && pages.map(String).includes(page)
}
