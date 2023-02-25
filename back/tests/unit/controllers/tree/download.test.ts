import { getMockRes } from '@jest-mock/express'
import { download, Req } from '../../../../src/controllers/tree/download'
import { repositoryService } from '../../../../src/libs/repositories'
import { mock, mockReq } from '../../../mocks'

jest.mock('../../../../src/libs/repositories')

describe('downloadFile', () => {
  it('should get file', async () => {
    const req = mockReq<Req>()
    const { res } = getMockRes()
    await download(req, res)
    expect(repositoryService.getContent).toHaveBeenCalledWith('repo', 'path', 'branch')
  })

  it('should get file content with default path', async () => {
    const req = mockReq<Req>({ query: { path: undefined } })
    const { res } = getMockRes()
    await download(req, res)
    expect(repositoryService.getContent).toHaveBeenCalledWith('repo', '.', 'branch')
  })

  it('should set content disposition header', async () => {
    mock(repositoryService.getContent).mockResolvedValue('content')
    const req = mockReq<Req>({ query: { path: 'path/to/filename.ext' } })
    const { res } = getMockRes()
    await download(req, res)
    expect(res.set).toHaveBeenCalledWith('Content-Disposition', `attachment; filename=filename.ext`)
  })

  it('should return file content', async () => {
    mock(repositoryService.getContent).mockResolvedValue('content')
    const req = mockReq<Req>()
    const { res } = getMockRes()
    await download(req, res)
    expect(res.send).toHaveBeenCalledWith('content')
  })

  it('should return 500 status when failure', async () => {
    mock(repositoryService.getContent).mockRejectedValue(new Error())
    const req = mockReq<Req>()
    const { res } = getMockRes()
    await download(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(500)
  })
})
