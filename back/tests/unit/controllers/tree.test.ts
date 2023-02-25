import { getMockRes } from '@jest-mock/express'
import { download, getTree, Req1, Req2 } from '../../../src/controllers/tree'
import { repositoryService } from '../../../src/libs/repositories'
import { FileType } from '../../../src/models/File'
import { mock, mockReq } from '../../mocks'

jest.mock('../../../src/libs/repositories')

describe('getTree', () => {
  it('should get file type', async () => {
    const req = mockReq<Req1>()
    const { res } = getMockRes()
    await getTree(req, res)
    expect(repositoryService.getFileType).toHaveBeenCalledWith('repo', 'path', 'branch')
  })

  it('should get file type with default path', async () => {
    const req = mockReq<Req1>({ query: { path: undefined } })
    const { res } = getMockRes()
    await getTree(req, res)
    expect(repositoryService.getFileType).toHaveBeenCalledWith('repo', '.', 'branch')
  })

  it('should get content and size when type is file', async () => {
    mock(repositoryService.getFileType).mockResolvedValue(FileType.FILE)
    mock(repositoryService.getContent).mockResolvedValue({})
    const req = mockReq<Req1>()
    const { res } = getMockRes()
    await getTree(req, res)
    expect(repositoryService.getContent).toHaveBeenCalledWith('repo', 'path', 'branch')
    expect(repositoryService.getSize).toHaveBeenCalledWith('repo', 'path', 'branch')
  })

  it('should return content and size when type is file', async () => {
    mock(repositoryService.getFileType).mockResolvedValue(FileType.FILE)
    mock(repositoryService.getContent).mockResolvedValue('content')
    mock(repositoryService.getSize).mockResolvedValue('size')
    const req = mockReq<Req1>()
    const { res } = getMockRes()
    await getTree(req, res)
    expect(res.json).toHaveBeenCalledWith({ content: 'content', size: 'size' })
  })

  it('should get files when type is folder', async () => {
    mock(repositoryService.getFileType).mockResolvedValue(FileType.FOLDER)
    const req = mockReq<Req1>()
    const { res } = getMockRes()
    await getTree(req, res)
    expect(repositoryService.getFiles).toHaveBeenCalledWith('repo', 'path', 'branch')
  })

  it('should return files when type is folder', async () => {
    mock(repositoryService.getFileType).mockResolvedValue(FileType.FOLDER)
    mock(repositoryService.getFiles).mockResolvedValue('files')
    const req = mockReq<Req1>()
    const { res } = getMockRes()
    await getTree(req, res)
    expect(res.json).toHaveBeenCalledWith('files')
  })

  it('should return 500 status when failure', async () => {
    mock(repositoryService.getFileType).mockRejectedValue(new Error())
    const req = mockReq<Req1>()
    const { res } = getMockRes()
    await getTree(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(500)
  })
})

describe('downloadFile', () => {
  it('should get file', async () => {
    const req = mockReq<Req2>()
    const { res } = getMockRes()
    await download(req, res)
    expect(repositoryService.getContent).toHaveBeenCalledWith('repo', 'path', 'branch')
  })

  it('should get file content with default path', async () => {
    const req = mockReq<Req2>({ query: { path: undefined } })
    const { res } = getMockRes()
    await download(req, res)
    expect(repositoryService.getContent).toHaveBeenCalledWith('repo', '.', 'branch')
  })

  it('should set content disposition header', async () => {
    mock(repositoryService.getContent).mockResolvedValue('content')
    const req = mockReq<Req2>({ query: { path: 'path/to/filename.ext' } })
    const { res } = getMockRes()
    await download(req, res)
    expect(res.set).toHaveBeenCalledWith('Content-Disposition', `attachment; filename=filename.ext`)
  })

  it('should return file content', async () => {
    mock(repositoryService.getContent).mockResolvedValue('content')
    const req = mockReq<Req2>()
    const { res } = getMockRes()
    await download(req, res)
    expect(res.send).toHaveBeenCalledWith('content')
  })

  it('should return 500 status when failure', async () => {
    mock(repositoryService.getContent).mockRejectedValue(new Error())
    const req = mockReq<Req2>()
    const { res } = getMockRes()
    await download(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(500)
  })
})
