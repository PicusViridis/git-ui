import exec from 'async-exec'
import { promises as fse } from 'fs'
import { highlightAuto } from 'highlight.js'
import { join } from 'path'
import byteSize from 'pretty-bytes'
import { config } from '../config'
import { getIcon } from '../libs/icons'
import { ICommitProps } from '../views/Commits/Commit'
import { ICommitsProps } from '../views/Commits/Commits'
import { IFilesProps } from '../views/Files/Files'
import { IHomeProps } from '../views/Home/Home'
import { GitService } from './git'

const { repoDir } = config

export const MAX_COMMIT_PER_PAGE = 10

export const RepositoryService = {
  async isEmpty(repoName: string): Promise<boolean> {
    const repoPath = join(repoDir, repoName)
    try {
      await GitService.log(repoPath, '.', 'master')
      return false
    } catch (error) {
      return true
    }
  },

  async listRepositories(): Promise<IHomeProps['repositories']> {
    const repos = await fse.readdir(repoDir)
    const result = []
    for (const repo of repos) {
      const repoPath = join(repoDir, repo)
      const isGitRepo = await GitService.isGitRepo(repoPath)
      if (isGitRepo) {
        const updatedAt = await exec(`date -r ${repoPath} "+%Y-%m-%d %H:%M:%S"`)
        result.push({ name: repo, updatedAt: updatedAt.trim() })
      }
    }
    return result.sort((repo1, repo2) => repo2.updatedAt.localeCompare(repo1.updatedAt))
  },

  async getFileType(repoName: string, currentPath: string, branch: string): Promise<'file' | 'folder'> {
    if (currentPath === '.') {
      return 'folder'
    }
    const repoPath = join(repoDir, repoName)
    const [result] = await GitService.listFiles(repoPath, currentPath, branch)
    return result.type
  },

  async getFiles(repoName: string, currentPath: string, branch: string): Promise<IFilesProps['files']> {
    const repoPath = join(repoDir, repoName)
    const files = await GitService.listFiles(repoPath, currentPath + '/', branch)
    const mapped = await Promise.all(
      files.map(async (file) => {
        const { type } = file
        const path = file.path + (type === 'folder' ? '/' : '')
        const name = file.path.split('/').pop() || ''
        const icon = getIcon(type, name)
        const [lastCommit] = await GitService.log(repoPath, path, branch)
        return { type, icon, name, path, lastCommit }
      })
    )
    return mapped.sort((file1, file2) => {
      const type1 = file1.type === 'folder' ? 0 : 1
      const type2 = file1.type === 'folder' ? 0 : 1
      let result = type1 - type2
      if (result === 0) {
        result = file1.name > file2.name ? 1 : file1.name < file2.name ? -1 : 0
      }
      return result
    })
  },

  async listBranches(repoName: string): Promise<string[]> {
    const repoPath = join(repoDir, repoName)
    return GitService.listBranches(repoPath)
  },

  async getContent(repoName: string, currentPath: string, branch: string): Promise<string> {
    const repoPath = join(repoDir, repoName)
    if (await GitService.isBinary(repoPath, currentPath, branch)) {
      return 'Cannot preview binary file'
    } else {
      const rawContent = await GitService.getContent(repoPath, currentPath, branch)
      return highlightAuto(rawContent).value
    }
  },

  async getSize(repoName: string, currentPath: string, branch: string): Promise<string> {
    const repoPath = join(repoDir, repoName)
    const size = await GitService.getSize(repoPath, currentPath, branch)
    return byteSize(Number(size), { binary: true })
  },

  async getStream(repoName: string, currentPath: string, branch: string): Promise<string> {
    const repoPath = join(repoDir, repoName)
    return GitService.getContent(repoPath, currentPath, branch)
  },

  async getCommits(
    repoName: string,
    currentPath: string,
    branch: string,
    page: number
  ): Promise<[ICommitsProps['commits'], number]> {
    const repoPath = join(repoDir, repoName)
    const skip = (page - 1) * MAX_COMMIT_PER_PAGE
    const commits = await GitService.log(repoPath, currentPath, branch, `-${MAX_COMMIT_PER_PAGE} --skip=${skip}`)
    const count = await GitService.countCommits(repoPath, currentPath, branch)
    return [commits, count]
  },

  async getCommitDiff(repoName: string, currentPath: string, hash: string): Promise<ICommitProps> {
    const repoPath = join(repoDir, repoName)
    const [commit] = await GitService.log(repoPath, currentPath, hash, `-1`)
    const diff = await GitService.getDiffs(repoPath, currentPath, hash)
    return { message: commit.message, diff }
  },

  async createRepository(repoName: string): Promise<void> {
    const repoPath = join(repoDir, repoName)
    await GitService.createRepository(repoPath)
  },
}
