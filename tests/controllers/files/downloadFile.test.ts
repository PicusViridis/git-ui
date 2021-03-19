import { downloadFile, Res } from '@/controllers/files/downloadFile'
import { RepositoryService } from '@/libs/repositories'
import { getMockReq, getMockRes } from '@jest-mock/express'

jest.mock('@/libs/repositories')

const getStreamMock = RepositoryService.getStream as jest.Mock

describe('downloadFile', () => {
  const req = getMockReq()
  const { res, clearMockRes } = getMockRes<Res>({ locals: { repo: 'repo', branch: 'branch', path: 'path' } })

  beforeEach(() => {
    clearMockRes()

    getStreamMock.mockResolvedValue('stream')
  })

  it('should get commit diff', async () => {
    await downloadFile(req, res)
    expect(getStreamMock).toHaveBeenCalledWith('repo', 'path', 'branch')
  })

  it('should render commit page with commit diff', async () => {
    await downloadFile(req, res)
    expect(res.set).toHaveBeenCalledWith('Content-Disposition', `attachment; filename=path`)
    expect(res.send).toHaveBeenCalledWith('stream')
  })
})
