import { getFile, Res } from '../../../src/controllers/files/getFile'
import { RepositoryService } from '../../../src/libs/repositories'
import { getMockReq, getMockRes } from '../../__mocks__/express'

jest.mock('../../../src/libs/repositories')

const getFileTypeMock = RepositoryService.getFileType as jest.Mock
const getContentMock = RepositoryService.getContent as jest.Mock
const getSizeMock = RepositoryService.getSize as jest.Mock
const getFilesMock = RepositoryService.getFiles as jest.Mock

describe('getFile', () => {
  const req = getMockReq()
  const { res, clearMockRes } = getMockRes<Res>({ locals: { repo: 'repo', branch: 'branch', path: 'path' } })

  beforeEach(() => {
    clearMockRes()

    getFileTypeMock.mockResolvedValue('file')
    getContentMock.mockResolvedValue('content')
    getSizeMock.mockResolvedValue('size')
    getFilesMock.mockResolvedValue('files')
  })

  it('should get file content and file size when type is file', async () => {
    await getFile(req, res)
    expect(getContentMock).toHaveBeenCalledWith('repo', 'path', 'branch')
    expect(getSizeMock).toHaveBeenCalledWith('repo', 'path', 'branch')
  })

  it('should render file page with content and size when type is file', async () => {
    await getFile(req, res)
    expect(res.render).toHaveBeenCalledWith('Files/File', { content: 'content', size: 'size' })
  })

  it('should get files when type is folder', async () => {
    getFileTypeMock.mockResolvedValue('folder')
    await getFile(req, res)
    expect(getFilesMock).toHaveBeenCalledWith('repo', 'path', 'branch')
  })

  it('should render files page with files when type is folder', async () => {
    getFileTypeMock.mockResolvedValue('folder')
    await getFile(req, res)
    expect(res.render).toHaveBeenCalledWith('Files/Files', { files: 'files' })
  })
})
