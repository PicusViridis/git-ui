import { html, parse } from 'diff2html'
import { promises as fse } from 'fs'
import { highlightAuto } from 'highlight.js'
import { join } from 'path'
import { config } from '../config'
import { getIcon } from '../libs/icons'
import { IFile } from '../models/File'
import { IBreadcrumb, ICommit } from '../models/interfaces'
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

  async getFiles(repoName: string, currentPath: string, branch: string): Promise<IFile[]> {
    const repoPath = join(repoDir, repoName)
    const files = await GitService.listFiles(repoPath, currentPath + '/', branch)
    const mapped = await Promise.all(
      files.map(async ({ type, path }) => {
        const name = path.split('/').pop()
        console.log(getIcon)
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

  async listBranches(repoName: string, branch: string): Promise<string[]> {
    const repoPath = join(repoDir, repoName)
    const branches = await GitService.listBranches(repoPath)
    return branches.filter((name) => name !== branch)
  },

  async getContent(repoName: string, currentPath: string, branch: string): Promise<string> {
    const repoPath = join(repoDir, repoName)
    if (await GitService.isBinary(repoPath, currentPath)) {
      return ''
    } else {
      const rawContent = await GitService.getContent(repoPath, currentPath, branch)
      return highlightAuto(rawContent).value
    }
  },

  async getSize(repoName: string, currentPath: string, branch: string): Promise<string> {
    const repoPath = join(repoDir, repoName)
    const size = await GitService.getSize(repoPath, currentPath, branch)
    return convertBytes(Number(size))
  },

  getStream(repoName: string, currentPath: string, branch: string): Promise<string> {
    const repoPath = join(repoDir, repoName)
    return GitService.getContent(repoPath, currentPath, branch)
  },

  getBreadcrumb(repoName: string, currentPath: string): IBreadcrumb[] {
    const atRoot = currentPath === '.'
    const result = [{ name: repoName, path: '', isActive: atRoot }]
    if (atRoot) {
      return result
    }
    const parts = currentPath.split('/')
    let path = ''
    for (const [index, name] of parts.entries()) {
      path = join(path, name)
      result.push({
        name,
        path,
        isActive: index === parts.length - 1,
      })
    }
    return result
  },

  async getCommits(repoName: string, branch: string, page: number): Promise<[ICommit[], number]> {
    const repoPath = join(repoDir, repoName)
    const skip = (page - 1) * MAX_COMMIT_PER_PAGE
    const commits = await GitService.log(repoPath, '.', branch, `-${MAX_COMMIT_PER_PAGE} --skip=${skip}`)
    const count = await GitService.countCommits(repoPath, '.', branch)
    return [commits, count]
  },

  async getDiffs(repoName: string, currentPath: string, branch: string): Promise<string> {
    const repoPath = join(repoDir, repoName)
    const diff = await GitService.getDiffs(repoPath, currentPath, branch)
    return html(parse(diff), { outputFormat: 'side-by-side', drawFileList: false })
  },
}
