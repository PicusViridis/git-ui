import { describe, expect, it, vi } from 'vitest'
import { download, getTree } from '../../../src/controllers/tree'
import { repositoryService } from '../../../src/libs/repositories'
import { getMockReq, getMockRes } from '../../mocks'

vi.mock('../../../src/libs/repositories')

describe('getTree', () => {
  it('should get file type', async () => {
    const req = getMockReq({ params: { repo: 'repo', branch: 'branch' }, query: { path: 'path' } })
    const { res } = getMockRes()
    await getTree(req, res)
    expect(repositoryService.getFileType).toHaveBeenCalledWith('repo', 'path', 'branch')
  })

  it('should get file type with default path', async () => {
    const req = getMockReq({ params: { repo: 'repo', branch: 'branch' }, query: { path: undefined } })
    const { res } = getMockRes()
    await getTree(req, res)
    expect(repositoryService.getFileType).toHaveBeenCalledWith('repo', '.', 'branch')
  })

  it('should get content and size when type is file', async () => {
    vi.mocked(repositoryService.getFileType).mockResolvedValue('file')
    vi.mocked(repositoryService.getContent).mockResolvedValue({} as never)
    const req = getMockReq({ params: { repo: 'repo', branch: 'branch' }, query: { path: 'path' } })
    const { res } = getMockRes()
    await getTree(req, res)
    expect(repositoryService.getContent).toHaveBeenCalledWith('repo', 'path', 'branch')
    expect(repositoryService.getSize).toHaveBeenCalledWith('repo', 'path', 'branch')
  })

  it('should return content and size when type is file', async () => {
    vi.mocked(repositoryService.getFileType).mockResolvedValue('file')
    vi.mocked(repositoryService.getContent).mockResolvedValue('content')
    vi.mocked(repositoryService.getSize).mockResolvedValue('size' as never)
    const req = getMockReq({ params: { repo: 'repo', branch: 'branch' }, query: { path: 'path' } })
    const { res } = getMockRes()
    await getTree(req, res)
    expect(res.json).toHaveBeenCalledWith({ content: 'content', size: 'size' })
  })

  it('should get files when type is folder', async () => {
    vi.mocked(repositoryService.getFileType).mockResolvedValue('folder')
    const req = getMockReq({ params: { repo: 'repo', branch: 'branch' }, query: { path: 'path' } })
    const { res } = getMockRes()
    await getTree(req, res)
    expect(repositoryService.getFiles).toHaveBeenCalledWith('repo', 'path', 'branch')
  })

  it('should return files when type is folder', async () => {
    vi.mocked(repositoryService.getFileType).mockResolvedValue('folder')
    vi.mocked(repositoryService.getFiles).mockResolvedValue('files' as never)
    const req = getMockReq({ params: { repo: 'repo', branch: 'branch' }, query: { path: 'path' } })
    const { res } = getMockRes()
    await getTree(req, res)
    expect(res.json).toHaveBeenCalledWith('files')
  })

  it('should return 500 status when failure', async () => {
    vi.mocked(repositoryService.getFileType).mockRejectedValue(new Error())
    const req = getMockReq({ params: { repo: 'repo', branch: 'branch' }, query: { path: 'path' } })
    const { res } = getMockRes()
    await getTree(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(500)
  })
})

describe('downloadFile', () => {
  it('should get file', async () => {
    const req = getMockReq({ params: { repo: 'repo', branch: 'branch' }, query: { path: 'path' } })
    const { res } = getMockRes()
    await download(req, res)
    expect(repositoryService.getContent).toHaveBeenCalledWith('repo', 'path', 'branch')
  })

  it('should get file content with default path', async () => {
    const req = getMockReq({ params: { repo: 'repo', branch: 'branch' }, query: { path: undefined } })
    const { res } = getMockRes()
    await download(req, res)
    expect(repositoryService.getContent).toHaveBeenCalledWith('repo', '.', 'branch')
  })

  it('should set content disposition header', async () => {
    vi.mocked(repositoryService.getContent).mockResolvedValue('content')
    const req = getMockReq({ params: { repo: 'repo', branch: 'branch' }, query: { path: 'path/to/filename.ext' } })
    const { res } = getMockRes()
    await download(req, res)
    expect(res.set).toHaveBeenCalledWith('Content-Disposition', `attachment; filename=filename.ext`)
  })

  it('should return file content', async () => {
    vi.mocked(repositoryService.getContent).mockResolvedValue('content')
    const req = getMockReq({ params: { repo: 'repo', branch: 'branch' }, query: { path: 'path' } })
    const { res } = getMockRes()
    await download(req, res)
    expect(res.send).toHaveBeenCalledWith('content')
  })

  it('should return 500 status when failure', async () => {
    vi.mocked(repositoryService.getContent).mockRejectedValue(new Error())
    const req = getMockReq({ params: { repo: 'repo', branch: 'branch' }, query: { path: 'path' } })
    const { res } = getMockRes()
    await download(req, res)
    expect(res.sendStatus).toHaveBeenCalledWith(500)
  })
})
