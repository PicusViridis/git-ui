import exec from 'async-exec'
import { promises as fse } from 'fs'
import mockdate from 'mockdate'
import { EMPTY_TREE_HASH, GitService, LOG_FORMAT } from '../../src/libs/git'

mockdate.set('2020-01-01T00:00:00.000Z')

jest.mock('async-exec')

const execMock = exec as jest.Mock

describe('log', () => {
  beforeEach(() => {
    execMock.mockResolvedValue('fullhash1::author1::1577836600::message1\nfullhash2::author2::1577836400::message2\n')
  })

  it('should execute log command with parameters', async () => {
    await GitService.log('repoPath', 'filePath', 'branch', 'params')
    expect(execMock).toHaveBeenCalledWith(`git -C repoPath log params --format=${LOG_FORMAT} branch -- filePath`)
  })

  it('should execute log command with default parameters', async () => {
    await GitService.log('repoPath', 'filePath')
    expect(execMock).toHaveBeenCalledWith(`git -C repoPath log -1 --format=${LOG_FORMAT}  -- filePath`)
  })

  it('should return log informations', async () => {
    const result = await GitService.log('repoPath', 'filePath')
    expect(result).toEqual([
      { author: 'author1', date: '3 minutes ago', hash: 'fullhash1', message: 'message1' },
      { author: 'author2', date: '7 minutes ago', hash: 'fullhash2', message: 'message2' },
    ])
  })
})

describe('countCommits', () => {
  beforeEach(() => {
    execMock.mockResolvedValue('10\n')
  })

  it('should execute rev-list command with parameters', async () => {
    await GitService.countCommits('repoPath', 'filePath', 'branch')
    expect(execMock).toHaveBeenCalledWith('git -C repoPath rev-list --count branch -- filePath')
  })

  it('should return number of commits', async () => {
    const result = await GitService.countCommits('repoPath', 'filePath', 'branch')
    expect(result).toBe(10)
  })
})

describe('listFiles', () => {
  beforeEach(() => {
    execMock.mockResolvedValue('size tree hex    file1\nsize blob hex    file1\n')
  })

  it('should execute ls-tree command with parameters', async () => {
    await GitService.listFiles('repoPath', 'filePath', 'branch')
    expect(execMock).toHaveBeenCalledWith('git -C repoPath ls-tree branch filePath')
  })

  it('should return list of files', async () => {
    const result = await GitService.listFiles('repoPath', 'filePath', 'branch')
    expect(result).toEqual([
      { type: 'folder', path: 'file1' },
      { type: 'file', path: 'file1' },
    ])
  })
})

describe('listBranches', () => {
  beforeEach(() => {
    execMock.mockResolvedValue('* master\ndevelop\n')
  })

  it('should execute branch command with parameters', async () => {
    await GitService.listBranches('repoPath')
    expect(execMock).toHaveBeenCalledWith('git -C repoPath branch')
  })

  it('should return list of files', async () => {
    const result = await GitService.listBranches('repoPath')
    expect(result).toEqual(['master', 'develop'])
  })
})

describe('isGitRepo', () => {
  let statSpy: jest.SpyInstance

  beforeEach(() => {
    execMock.mockResolvedValue('* master\ndevelop\n')
    statSpy = jest.spyOn(fse, 'stat')
    statSpy.mockResolvedValue({ isDirectory: jest.fn().mockReturnValue(true) })
  })

  it('should return false if path is not a directory', async () => {
    statSpy.mockResolvedValue({ isDirectory: jest.fn().mockReturnValue(false) })
    const result = await GitService.isGitRepo('repoPath')
    expect(result).toBe(false)
  })

  it('should execute rev-parse command with parameters', async () => {
    await GitService.isGitRepo('repoPath')
    expect(execMock).toHaveBeenCalledWith('git -C repoPath rev-parse')
  })

  it('should return false if rev-parse command fails with "fatal: not a git repository" error', async () => {
    execMock.mockRejectedValue({ message: 'fatal: not a git repository' })
    const result = await GitService.isGitRepo('repoPath')
    expect(result).toBe(false)
  })

  it('should throw if rev-parse fails', async () => {
    execMock.mockRejectedValue(new Error('500'))
    await expect(GitService.isGitRepo('repoPath')).rejects.toThrow(new Error('500'))
  })

  it('should return true if path is a git repository', async () => {
    const result = await GitService.isGitRepo('repoPath')
    expect(result).toBe(true)
  })
})

describe('getContent', () => {
  beforeEach(() => {
    execMock.mockResolvedValue('{\n"toto": "tutu"\n}\n')
  })

  it('should execute show command with parameters', async () => {
    await GitService.getContent('repoPath', 'filePath', 'branch')
    expect(execMock).toHaveBeenCalledWith('git -C repoPath show branch:filePath')
  })

  it('should return content', async () => {
    const result = await GitService.getContent('repoPath', 'filePath', 'branch')
    expect(result).toBe('{\n"toto": "tutu"\n}\n')
  })
})

describe('getSize', () => {
  beforeEach(() => {
    execMock.mockResolvedValue('140\n')
  })

  it('should execute cat-file command with parameters', async () => {
    await GitService.getSize('repoPath', 'filePath', 'branch')
    expect(execMock).toHaveBeenCalledWith('git -C repoPath cat-file -s branch:filePath')
  })

  it('should return size', async () => {
    const result = await GitService.getSize('repoPath', 'filePath', 'branch')
    expect(result).toBe('140\n')
  })
})

describe('isBinary', () => {
  beforeEach(() => {
    execMock.mockResolvedValue('diff --git a/filePath b/filePath\n')
  })

  it('should execute diff-tree command with parameters', async () => {
    await GitService.isBinary('repoPath', 'filePath', 'branch')
    expect(execMock).toHaveBeenCalledWith(`git -C repoPath diff-tree -p ${EMPTY_TREE_HASH} branch -- filePath`)
  })

  it('should return true if file is binary', async () => {
    execMock.mockResolvedValue('Binary files /dev/null and b/filePath differ\n')
    const result = await GitService.isBinary('repoPath', 'filePath', 'branch')
    expect(result).toBe(true)
  })

  it('should return false if file is not binary', async () => {
    const result = await GitService.isBinary('repoPath', 'filePath', 'branch')
    expect(result).toBe(false)
  })
})

describe('getDiffs', () => {
  it('should execute log command with parameters', async () => {
    execMock.mockResolvedValueOnce('\n')
    await GitService.getDiffs('repoPath', 'filePath', 'branch')
    expect(execMock).toHaveBeenCalledWith(`git -C repoPath log --pretty=%P -1 branch`)
  })

  it('should execute diff-tree command with parameters', async () => {
    execMock.mockResolvedValueOnce('parentHash\n')
    await GitService.getDiffs('repoPath', 'filePath', 'branch')
    expect(execMock).toHaveBeenCalledWith(`git -C repoPath diff-tree -w -p parentHash branch -- filePath`)
  })

  it('should execute diff-tree command with default hash if no parent', async () => {
    execMock.mockResolvedValueOnce('\n')
    await GitService.getDiffs('repoPath', 'filePath', 'branch')
    expect(execMock).toHaveBeenCalledWith(`git -C repoPath diff-tree -w -p ${EMPTY_TREE_HASH} branch -- filePath`)
  })

  it('should return diff', async () => {
    execMock.mockResolvedValueOnce('\n')
    execMock.mockResolvedValueOnce('diffs\n')
    const result = await GitService.getDiffs('repoPath', 'filePath', 'branch')
    expect(result).toBe('diffs\n')
  })
})
