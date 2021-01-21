import { promises as fse } from 'fs'
import { highlightAuto } from 'highlight.js'
import { join } from 'path'
import { config } from '../config'
import { getIcon } from '../libs/icons'
import { ICommitProps } from '../views/Commits/Commit'
import { ICommitsProps } from '../views/Commits/Commits'
import { IFilesProps } from '../views/Files/Files'
import { IHomeProps } from '../views/Home/Home'
import { convertBytes } from './convert'
import { GitService } from './git'

const { repoDir } = config

export const MAX_COMMIT_PER_PAGE = 10

export const RepositoryService = {
  async listRepositories(): Promise<IHomeProps['repositories']> {
    const repos = await fse.readdir(repoDir)
    const result = []
    for (const repo of repos) {
      const repoPath = join(repoDir, repo)
      const isGitRepo = await GitService.isGitRepo(repoPath)
      if (isGitRepo) {
        const [{ date }] = await GitService.log(repoPath, '.')
        result.push({ name: repo, lastUpdateDate: date })
      }
    }
    return result.sort((repo1, repo2) => {
      return repo2.lastUpdateDate.localeCompare(repo1.lastUpdateDate)
    })
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
      files.map(async ({ type, path }) => {
        const name = path.split('/').pop()
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
    if (await GitService.isBinary(repoPath, currentPath)) {
      return ''
    } else {
      const rawContent = await GitService.getContent(repoPath, currentPath, branch)
      return highlightAuto(rawContent.join('\n')).value
    }
  },

  async getSize(repoName: string, currentPath: string, branch: string): Promise<string> {
    const repoPath = join(repoDir, repoName)
    const size = await GitService.getSize(repoPath, currentPath, branch)
    return convertBytes(Number(size))
  },

  async getStream(repoName: string, currentPath: string, branch: string): Promise<string> {
    const repoPath = join(repoDir, repoName)
    const stream = await GitService.getContent(repoPath, currentPath, branch)
    return stream.join('\n')
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

  async getCommitDiff(repoName: string, currentPath: string, branch: string): Promise<ICommitProps['commit']> {
    const repoPath = join(repoDir, repoName)
    const [commit] = await GitService.log(repoPath, currentPath, branch, `-1`)
    const diff = await GitService.getDiffs(repoPath, currentPath, branch)
    return { message: commit.message, diff: diff.join('\n') }
  },
}
