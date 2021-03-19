import { getCommit, Req, Res } from '@/controllers/commits/getCommit'
import { RepositoryService } from '@/libs/repositories'
import { getMockReq, getMockRes } from '@jest-mock/express'

jest.mock('@/libs/repositories')

const getCommitDiffMock = RepositoryService.getCommitDiff as jest.Mock

describe('getCommit', () => {
  const req = getMockReq<Req>({ params: { hash: 'hash' } })
  const { res, clearMockRes } = getMockRes<Res>({ locals: { repo: 'repo', branch: 'branch', path: 'path' } })

  beforeEach(() => {
    clearMockRes()

    getCommitDiffMock.mockResolvedValue({ message: 'message', diff: 'diff' })
  })

  it('should get commit diff', async () => {
    await getCommit(req, res)
    expect(getCommitDiffMock).toHaveBeenCalledWith('repo', 'path', 'hash')
  })

  it('should render commit page with commit diff', async () => {
    await getCommit(req, res)
    expect(res.render).toHaveBeenCalledWith('Commits/Commit', {
      message: 'message',
      diff: '<div class="d2h-wrapper">\n    \n</div>',
    })
  })
})
