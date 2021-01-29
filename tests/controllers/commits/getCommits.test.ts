import { getMockReq, getMockRes } from '@jest-mock/express'
import { Request, Response } from 'express'
import mockdate from 'mockdate'
import { getCommits, getPagination } from '../../../src/controllers/commits/getCommits'
import { RepositoryService } from '../../../src/libs/repositories'
import { Locals } from '../../../src/middlewares/repo'

mockdate.set('2020-01-01T00:00:00.000Z')

jest.mock('../../../src/libs/repositories')

const getCommitsMock = RepositoryService.getCommits as jest.Mock

describe('getPagination', () => {
  it('should return page', () => {
    expect(getPagination(1, 10, 'path').page).toBe(1)
  })

  it('should return maxPage according to count', () => {
    expect(getPagination(1, 10, 'path').maxPage).toBe(1)
    expect(getPagination(1, 45, 'path').maxPage).toBe(5)
  })

  it('should return first link according to page', () => {
    expect(getPagination(1, 45, 'path').first).toBeUndefined()
    expect(getPagination(3, 45, 'path').first).toBe('path?page=1')
  })

  it('should return previous link according to page', () => {
    expect(getPagination(1, 45, 'path').previous).toBeUndefined()
    expect(getPagination(3, 45, 'path').previous).toBe('path?page=2')
  })

  it('should return next link according to page', () => {
    expect(getPagination(5, 45, 'path').next).toBeUndefined()
    expect(getPagination(3, 45, 'path').next).toBe('path?page=4')
  })

  it('should return last link according to page', () => {
    expect(getPagination(5, 45, 'path').last).toBeUndefined()
    expect(getPagination(3, 45, 'path').last).toBe('path?page=5')
  })
})

describe('getCommits', () => {
  let req: Request<unknown, unknown, unknown, { page?: number }>
  let res: Response<string, Locals>

  beforeEach(() => {
    req = getMockReq({ params: { hash: 'hash' } })
    res = getMockRes({ locals: { repo: 'repo', branch: 'branch', path: 'path' } }).res as Response<string, Locals>

    getCommitsMock.mockResolvedValue(['commits', 10])
  })

  it('should get commits', async () => {
    await getCommits(req, res)
    expect(getCommitsMock).toHaveBeenCalledWith('repo', 'path', 'branch', 1)
  })

  it('should render commits page with commits and pagination', async () => {
    await getCommits(req, res)
    expect(res.render).toHaveBeenCalledWith('Commits/Commits', {
      commits: 'commits',
      pagination: { page: 1, maxPage: 1 },
    })
  })
})
