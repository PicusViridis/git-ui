import { getMockRes as _getMockRes } from '@jest-mock/express'
import { MockResponse } from '@jest-mock/express/dist/src/response'
import { NextFunction, Response } from 'express'

export function getMockRes<T extends Response = Response>(
  values?: MockResponse
): {
  res: T
  next: NextFunction
  mockClear: () => void
  clearMockRes: () => void
} {
  const { res: _res, ...rest } = _getMockRes(values)
  const res = _res as T
  return { res, ...rest }
}

export { getMockReq } from '@jest-mock/express'
