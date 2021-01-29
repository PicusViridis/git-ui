import { Request, Response } from 'express'
import mockdate from 'mockdate'
import { getCommit } from '../../../src/controllers/commits/getCommit'
import { RepositoryService } from '../../../src/libs/repositories'
import { Locals } from '../../../src/middlewares/repo'
import { getMockReq, getMockRes } from '../../__mocks__/express'

mockdate.set('2020-01-01T00:00:00.000Z')

jest.mock('../../../src/libs/repositories')

const getCommitDiffMock = RepositoryService.getCommitDiff as jest.Mock

describe('getCommit', () => {
  const req = getMockReq<Request<{ hash: string }>>({ params: { hash: 'hash' } })
  const { res, clearMockRes } = getMockRes<Response<string, Locals>>()

  beforeEach(() => {
    clearMockRes()

    getCommitDiffMock.mockResolvedValue('diff')
  })

  it('should get commit diff', async () => {
    await getCommit(req, res)
    expect(getCommitDiffMock).toHaveBeenCalledWith('repo', 'path', 'hash')
  })

  it('should render commit page with commit diff', async () => {
    await getCommit(req, res)
    expect(res.render).toHaveBeenCalledWith('Commits/Commit', { commit: 'diff' })
  })
})
