import { GitService } from '@/libs/git'
import { RepositoryService } from '@/libs/repositories'
import exec from 'async-exec'
import { promises as fse } from 'fs'

jest.mock('@/libs/logger')
jest.mock('@/libs/git')
jest.mock('async-exec')

describe('isEmpty', () => {
  const logMock = GitService.log as jest.Mock

  it('should call log command', async () => {
    logMock.mockResolvedValue('')
    await RepositoryService.isEmpty('repoName')
    expect(logMock).toHaveBeenCalledWith('repos/repoName', '.', 'master')
  })

  it('should return false if log command succeeds', async () => {
    logMock.mockResolvedValue('')
    const isEmpty = await RepositoryService.isEmpty('repoName')
    expect(isEmpty).toBe(false)
  })

  it('should return true if log command fails', async () => {
    logMock.mockRejectedValue(new Error())
    const isEmpty = await RepositoryService.isEmpty('repoName')
    expect(isEmpty).toBe(true)
  })
})

describe('listRepositories', () => {
  let readdirSpy: jest.SpyInstance

  const isGitRepoMock = GitService.isGitRepo as jest.Mock
  const execMock = exec as jest.Mock

  beforeEach(() => {
    readdirSpy = jest.spyOn(fse, 'readdir')
    readdirSpy.mockResolvedValue(['repoName'])
    isGitRepoMock.mockResolvedValue(false)
    execMock.mockResolvedValue('updated at')
  })

  it('should check if path is git repo', async () => {
    await RepositoryService.listRepositories()
    expect(isGitRepoMock).toHaveBeenCalledWith('repos/repoName')
  })

  it('should not get update date if path is not a git repository', async () => {
    await RepositoryService.listRepositories()
    expect(execMock).not.toHaveBeenCalled()
  })

  it('should not add path to result if path is not a git repository', async () => {
    const result = await RepositoryService.listRepositories()
    expect(result).toEqual([])
  })

  it('should get update date if path is a git repository', async () => {
    isGitRepoMock.mockResolvedValue(true)
    await RepositoryService.listRepositories()
    expect(execMock).toHaveBeenCalledWith('date -r repos/repoName "+%Y-%m-%d %H:%M:%S"')
  })

  it('should add path to result', async () => {
    isGitRepoMock.mockResolvedValue(true)
    const result = await RepositoryService.listRepositories()
    expect(result).toEqual([{ name: 'repoName', updatedAt: 'updated at' }])
  })

  it('should sort repositories by update date', async () => {
    readdirSpy.mockResolvedValue(['repo1', 'repo2'])
    isGitRepoMock.mockResolvedValue(true)
    execMock.mockResolvedValueOnce('2020-01-01')
    execMock.mockResolvedValueOnce('2021-01-01')
    const result = await RepositoryService.listRepositories()
    expect(result).toEqual([
      { updatedAt: '2021-01-01', name: 'repo2' },
      { updatedAt: '2020-01-01', name: 'repo1' },
    ])
  })
})

describe('getFileType', () => {
  const listFilesMock = GitService.listFiles as jest.Mock

  beforeEach(() => {
    listFilesMock.mockResolvedValue([{ type: 'file', path: 'currentPath' }])
  })

  it('should return "folder" if path is "."', async () => {
    const result = await RepositoryService.getFileType('repoName', '.', 'branch')
    expect(result).toBe('folder')
  })

  it('should list git files', async () => {
    await RepositoryService.getFileType('repoName', 'currentPath', 'branch')
    expect(listFilesMock).toHaveBeenCalledWith('repos/repoName', 'currentPath', 'branch')
  })

  it('should return file type', async () => {
    const result = await RepositoryService.getFileType('repoName', 'currentPath', 'branch')
    expect(result).toBe('file')
  })
})

describe('getFiles', () => {
  const listFilesMock = GitService.listFiles as jest.Mock
  const logMock = GitService.log as jest.Mock

  beforeEach(() => {
    listFilesMock.mockResolvedValue([
      { type: 'file', path: 'path2' },
      { type: 'folder', path: 'path2' },
      { type: 'file', path: 'path1' },
    ])
    logMock.mockResolvedValue([{ hash: 'hash', message: 'message', date: 'date', author: 'author' }])
  })

  it('should list files', async () => {
    await RepositoryService.getFiles('repoName', 'currentPath', 'branch')
    expect(listFilesMock).toHaveBeenCalledWith('repos/repoName', 'currentPath/', 'branch')
  })

  it('should get last commit for each file', async () => {
    await RepositoryService.getFiles('repoName', 'currentPath', 'branch')
    expect(logMock).toHaveBeenCalledWith('repos/repoName', 'path2', 'branch')
    expect(logMock).toHaveBeenCalledWith('repos/repoName', 'path2', 'branch')
    expect(logMock).toHaveBeenCalledWith('repos/repoName', 'path1', 'branch')
  })

  it('should return sorted files', async () => {
    const result = await RepositoryService.getFiles('repoName', 'currentPath', 'branch')
    expect(result).toEqual([
      {
        icon: 'default_file.svg',
        lastCommit: { author: 'author', date: 'date', hash: 'hash', message: 'message' },
        name: 'path1',
        path: 'path1',
        type: 'file',
      },
      {
        icon: 'default_file.svg',
        lastCommit: { author: 'author', date: 'date', hash: 'hash', message: 'message' },
        name: 'path2',
        path: 'path2',
        type: 'file',
      },
      {
        icon: 'default_folder.svg',
        lastCommit: { author: 'author', date: 'date', hash: 'hash', message: 'message' },
        name: 'path2',
        path: 'path2',
        type: 'folder',
      },
    ])
  })
})

describe('listBranches', () => {
  const listBranchesMock = GitService.listBranches as jest.Mock

  beforeEach(() => {
    listBranchesMock.mockResolvedValue(['master', 'develop'])
  })

  it('should list branches', async () => {
    await RepositoryService.listBranches('repoName')
    expect(listBranchesMock).toHaveBeenCalledWith('repos/repoName')
  })

  it('should return branches', async () => {
    const result = await RepositoryService.listBranches('repoName')
    expect(result).toEqual(['master', 'develop'])
  })
})

describe('getContent', () => {
  const isBinaryMock = GitService.isBinary as jest.Mock
  const getContentMock = GitService.getContent as jest.Mock

  beforeEach(() => {
    isBinaryMock.mockResolvedValue(false)
    getContentMock.mockResolvedValue('{ "toto": "tutu" }')
  })

  it('should check if file is binary', async () => {
    await RepositoryService.getContent('repoName', 'currentPath', 'branch')
    expect(isBinaryMock).toHaveBeenCalledWith('repos/repoName', 'currentPath', 'branch')
  })

  it('should return "Cannot preview binary file" if file is binary', async () => {
    isBinaryMock.mockResolvedValue(true)
    const result = await RepositoryService.getContent('repoName', 'currentPath', 'branch')
    expect(result).toBe('Cannot preview binary file')
  })

  it('should get raw content if file is not binary', async () => {
    await RepositoryService.getContent('repoName', 'currentPath', 'branch')
    expect(getContentMock).toHaveBeenCalledWith('repos/repoName', 'currentPath', 'branch')
  })

  it('should return highlighted content', async () => {
    const result = await RepositoryService.getContent('repoName', 'currentPath', 'branch')
    expect(result).toBe(
      '{ <span class="hljs-attr">&quot;toto&quot;</span>: <span class="hljs-string">&quot;tutu&quot;</span> }'
    )
  })
})

describe('getSize', () => {
  const getSizeMock = GitService.getSize as jest.Mock

  beforeEach(() => {
    getSizeMock.mockResolvedValue('15000\n')
  })

  it('should get size', async () => {
    await RepositoryService.getSize('repoName', 'currentPath', 'branch')
    expect(getSizeMock).toHaveBeenCalledWith('repos/repoName', 'currentPath', 'branch')
  })

  it('should return human readable size', async () => {
    const result = await RepositoryService.getSize('repoName', 'currentPath', 'branch')
    expect(result).toBe('14.6 kiB')
  })
})

describe('getStream', () => {
  const getContentMock = GitService.getContent as jest.Mock

  beforeEach(() => {
    getContentMock.mockResolvedValue('{ "toto": "tutu" }')
  })

  it('should get file content', async () => {
    await RepositoryService.getStream('repoName', 'currentPath', 'branch')
    expect(getContentMock).toHaveBeenCalledWith('repos/repoName', 'currentPath', 'branch')
  })

  it('should return file content', async () => {
    const result = await RepositoryService.getStream('repoName', 'currentPath', 'branch')
    expect(result).toBe('{ "toto": "tutu" }')
  })
})

describe('getCommits', () => {
  const logMock = GitService.log as jest.Mock
  const countCommitsMock = GitService.countCommits as jest.Mock

  beforeEach(() => {
    logMock.mockResolvedValue([{ hash: 'hash', message: 'message', date: 'date', author: 'author' }])
    countCommitsMock.mockResolvedValue(1)
  })

  it('should list commits', async () => {
    await RepositoryService.getCommits('repoName', 'currentPath', 'branch', 2)
    expect(logMock).toHaveBeenCalledWith('repos/repoName', 'currentPath', 'branch', '-10 --skip=10')
  })

  it('should count commits', async () => {
    await RepositoryService.getCommits('repoName', 'currentPath', 'branch', 2)
    expect(countCommitsMock).toHaveBeenCalledWith('repos/repoName', 'currentPath', 'branch')
  })

  it('should return commits and count', async () => {
    const result = await RepositoryService.getCommits('repoName', 'currentPath', 'branch', 2)
    expect(result).toEqual([[{ hash: 'hash', message: 'message', date: 'date', author: 'author' }], 1])
  })
})

describe('getCommitDiff', () => {
  const logMock = GitService.log as jest.Mock
  const getDiffsMock = GitService.getDiffs as jest.Mock

  beforeEach(() => {
    logMock.mockResolvedValue([{ hash: 'hash', message: 'message', date: 'date', author: 'author' }])
    getDiffsMock.mockResolvedValue('diff')
  })

  it('should get commit', async () => {
    await RepositoryService.getCommitDiff('repoName', 'currentPath', 'hash')
    expect(logMock).toHaveBeenCalledWith('repos/repoName', 'currentPath', 'hash', '-1')
  })

  it('should get commit diff', async () => {
    await RepositoryService.getCommitDiff('repoName', 'currentPath', 'hash')
    expect(getDiffsMock).toHaveBeenCalledWith('repos/repoName', 'currentPath', 'hash')
  })

  it('should return commit message and diff', async () => {
    const result = await RepositoryService.getCommitDiff('repoName', 'currentPath', 'hash')
    expect(result).toEqual({ message: 'message', diff: 'diff' })
  })
})

describe('createRepository', () => {
  it('should create repository', async () => {
    await RepositoryService.createRepository('repoName')
    expect(GitService.createRepository).toHaveBeenCalledWith('repos/repoName')
  })
})
