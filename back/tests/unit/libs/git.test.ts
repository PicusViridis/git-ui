import exec from 'async-exec'
import mockdate from 'mockdate'
import { describe, expect, it, vi } from 'vitest'
import { GitService } from '../../../src/libs/git'

mockdate.set('2020-01-01T00:00:00.000Z')

vi.mock('async-exec')

describe('execGitCommand', () => {
  it('should execute git command', async () => {
    await GitService.execGitCommand('command')
    expect(exec).toHaveBeenCalledWith('command')
  })

  it('should return empty string if git fatal error', async () => {
    vi.mocked(exec).mockResolvedValue('fatal:')
    const result = await GitService.execGitCommand('command')
    expect(result).toBe('')
  })

  it('should return empty string if error', async () => {
    vi.mocked(exec).mockRejectedValue(new Error())
    const result = await GitService.execGitCommand('command')
    expect(result).toBe('')
  })

  it('should return command trimmed result', async () => {
    vi.mocked(exec).mockResolvedValue('result\n')
    const result = await GitService.execGitCommand('command')
    expect(result).toBe('result')
  })
})

describe('log', () => {
  it('should execute log command', async () => {
    await GitService.log('repoPath', 'filePath', 'branch', 'params')
    expect(exec).toHaveBeenCalledWith('git -C repoPath log params --format=%H::%an::%at::%s::%P branch -- "filePath"')
  })

  it('should execute log command with default params', async () => {
    await GitService.log('repoPath', 'filePath', 'branch')
    expect(exec).toHaveBeenCalledWith('git -C repoPath log -1 --format=%H::%an::%at::%s::%P branch -- "filePath"')
  })

  it('should execute log command with default branch', async () => {
    await GitService.log('repoPath', 'filePath')
    expect(exec).toHaveBeenCalledWith('git -C repoPath log -1 --format=%H::%an::%at::%s::%P  -- "filePath"')
  })

  it('should return command result', async () => {
    vi.spyOn(GitService, 'execGitCommand').mockResolvedValue('result')
    const result = await GitService.log('repoPath', 'filePath', 'branch')
    expect(result).toBe('result')
  })
})

describe('branch', () => {
  it('should execute branch command', async () => {
    await GitService.branch('repoPath')
    expect(exec).toHaveBeenCalledWith('git -C repoPath branch ')
  })

  it('should execute branch command with params', async () => {
    await GitService.branch('repoPath', 'params')
    expect(exec).toHaveBeenCalledWith('git -C repoPath branch params')
  })

  it('should return command result', async () => {
    vi.spyOn(GitService, 'execGitCommand').mockResolvedValue('result')
    const result = await GitService.branch('repoPath')
    expect(result).toBe('result')
  })
})

describe('revList', () => {
  it('should execute rev-list command', async () => {
    await GitService.revList('repoPath', 'filePath', 'branch')
    expect(exec).toHaveBeenCalledWith('git -C repoPath rev-list --count branch -- "filePath"')
  })

  it('should return command result', async () => {
    vi.spyOn(GitService, 'execGitCommand').mockResolvedValue('result')
    const result = await GitService.revList('repoPath', 'filePath', 'branch')
    expect(result).toBe('result')
  })
})

describe('revParse', () => {
  it('should execute revParse command', async () => {
    await GitService.revParse('repoPath')
    expect(exec).toHaveBeenCalledWith('git -C repoPath rev-parse')
  })

  it('should return command result', async () => {
    vi.spyOn(GitService, 'execGitCommand').mockResolvedValue('result')
    const result = await GitService.revParse('repoPath')
    expect(result).toBe('result')
  })
})

describe('catFile', () => {
  it('should execute catFile command', async () => {
    await GitService.catFile('repoPath', 'filePath', 'branch', 'params')
    expect(exec).toHaveBeenCalledWith('git -C repoPath cat-file params "branch:filePath"')
  })

  it('should execute catFile command with default params', async () => {
    await GitService.catFile('repoPath', 'filePath', 'branch')
    expect(exec).toHaveBeenCalledWith('git -C repoPath cat-file  "branch:filePath"')
  })

  it('should return command result', async () => {
    vi.spyOn(GitService, 'execGitCommand').mockResolvedValue('result')
    const result = await GitService.catFile('repoPath', 'filePath', 'branch')
    expect(result).toBe('result')
  })
})

describe('lsTree', () => {
  it('should execute lsTree command', async () => {
    await GitService.lsTree('repoPath', 'filePath', 'branch', 'params')
    expect(exec).toHaveBeenCalledWith('git -C repoPath -c core.quotePath=off ls-tree params branch "filePath"')
  })

  it('should execute lsTree command with default params', async () => {
    await GitService.lsTree('repoPath', 'filePath', 'branch')
    expect(exec).toHaveBeenCalledWith('git -C repoPath -c core.quotePath=off ls-tree  branch "filePath"')
  })

  it('should execute lsTree command with default branch', async () => {
    await GitService.lsTree('repoPath', 'filePath')
    expect(exec).toHaveBeenCalledWith('git -C repoPath -c core.quotePath=off ls-tree   "filePath"')
  })

  it('should return command result', async () => {
    vi.spyOn(GitService, 'execGitCommand').mockResolvedValue('result')
    const result = await GitService.lsTree('repoPath', 'filePath', 'branch')
    expect(result).toBe('result')
  })
})

describe('diffTree', () => {
  it('should execute diffTree command', async () => {
    await GitService.diffTree('repoPath', 'filePath', 'branch', 'parent')
    expect(exec).toHaveBeenCalledWith('git -C repoPath diff-tree -p parent branch -- "filePath"')
  })

  it('should execute diffTree command with default parent', async () => {
    await GitService.diffTree('repoPath', 'filePath', 'branch')
    expect(exec).toHaveBeenCalledWith(
      'git -C repoPath diff-tree -p 4b825dc642cb6eb9a060e54bf8d69288fbee4904 branch -- "filePath"'
    )
  })

  it('should return command result', async () => {
    vi.spyOn(GitService, 'execGitCommand').mockResolvedValue('result')
    const result = await GitService.diffTree('repoPath', 'filePath', 'branch', 'parent')
    expect(result).toBe('result')
  })
})
