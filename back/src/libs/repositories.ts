import exec from 'async-exec'
import { fromUnixTime } from 'date-fns'
import fs from 'fs'
import { join, parse } from 'path'
import { types } from 'util'
import { getIcon } from '../libs/icons'
import { IBranch } from '../models/Branch'
import { ICommit, ICommitDiff } from '../models/Commit'
import { IFileMeta } from '../models/File'
import { IRepository } from '../models/Repo'
import { settings } from '../settings'
import { parseDiff } from '../utils/parseDiff'
import { GitService } from './git'

const { repoDir } = settings

export const repositoryService = {
  async getRepositories(): Promise<IRepository[]> {
    const repos = await fs.promises.readdir(repoDir)
    const result: IRepository[] = []
    for (const repoName of repos) {
      const repo = await this.getRepository(repoName)
      if (repo) result.push(repo)
    }
    return result.sort((repo1, repo2) => repo2.updatedAt.localeCompare(repo1.updatedAt))
  },

  async getRepository(repoName: string) {
    const repoPath = join(repoDir, repoName)
    const stat = await fs.promises.stat(repoPath)
    if (!stat.isDirectory()) return null
    try {
      await GitService.revParse(repoPath)
      return { name: repoName, updatedAt: stat.mtime.toISOString() }
    } catch (error) {
      if (types.isNativeError(error) && error.message.includes('fatal: not a git repository')) return null
      throw error
    }
  },

  async getFileType(repoName: string, currentPath: string, branch: string): Promise<'file' | 'folder'> {
    if (currentPath === '.') return 'folder'
    const repoPath = join(repoDir, repoName)
    const stdout = await GitService.catFile(repoPath, currentPath, branch, '-t')
    return stdout === 'blob' ? 'file' : 'folder'
  },

  async getFiles(repoName: string, currentPath: string, branch: string): Promise<IFileMeta[]> {
    const repoPath = join(repoDir, repoName)
    const stdout = await GitService.lsTree(repoPath, currentPath + '/', branch, '--name-only')
    const lines = stdout.split('\n').filter(Boolean)
    const mapped = await Promise.all(lines.map((path) => this.getFile(repoName, path, branch)))
    return mapped.sort((file1, file2) => file2.type.localeCompare(file1.type) || file1.name.localeCompare(file2.name))
  },

  async getFile(repoName: string, currentPath: string, branch: string): Promise<IFileMeta> {
    const type = await this.getFileType(repoName, currentPath, branch)
    const name = parse(currentPath).base
    const icon = getIcon(type, name)
    const [lastCommit] = await this.getCommits(repoName, currentPath, branch, 1, 1)
    return { type, icon, name, path: currentPath, lastCommit }
  },

  async getBranches(repoName: string): Promise<IBranch[]> {
    const repoPath = join(repoDir, repoName)
    const stdout = await GitService.branch(repoPath)
    const names = stdout
      .replace('* ', '')
      .split('\n')
      .map((name) => name.trim())
      .filter(Boolean)
    const branches: IBranch[] = []
    for (const name of names) {
      const [lastCommit] = await this.getCommits(repoName, '.', name, 1, 1)
      branches.push({ name, lastCommit })
    }
    return branches
  },

  async deleteBranch(repoName: string, branch: string): Promise<void> {
    const repoPath = join(repoDir, repoName)
    await GitService.branch(repoPath, `-D ${branch}`)
  },

  getContent(repoName: string, currentPath: string, branch: string): Promise<string> {
    const repoPath = join(repoDir, repoName)
    return GitService.catFile(repoPath, currentPath, branch, 'blob')
  },

  async getSize(repoName: string, currentPath: string, branch: string): Promise<number> {
    const repoPath = join(repoDir, repoName)
    const stdout = await GitService.catFile(repoPath, currentPath, branch, '-s')
    return Number(stdout)
  },

  async getCommits(repoName: string, currentPath: string, branch: string, page = 1, limit = 10): Promise<ICommit[]> {
    const repoPath = join(repoDir, repoName)
    const skip = (page - 1) * limit
    const stdout = await GitService.log(repoPath, currentPath, branch, `-${limit} --skip=${skip}`)
    const lines = stdout.split('\n').filter(Boolean)
    return lines.map((line) => {
      const [hash, author, date, message, parent] = line.split('::')
      return { hash, author, date: fromUnixTime(Number(date)).toISOString(), message, parent }
    })
  },

  async countCommits(repoName: string, currentPath: string, branch: string): Promise<number> {
    const repoPath = join(repoDir, repoName)
    const stdout = await GitService.revList(repoPath, currentPath, branch)
    return Number(stdout)
  },

  async getCommitDiff(
    repoName: string,
    currentPath: string,
    hash: string,
    parent?: string
  ): Promise<ICommitDiff['files']> {
    const repoPath = join(repoDir, repoName)
    const diff = await GitService.diffTree(repoPath, currentPath, hash, parent)
    return parseDiff(diff)
  },

  async createRepository(repoName: string): Promise<void> {
    const repoPath = join(repoDir, repoName)
    await exec(`mkdir -p ${repoPath}`)
    await exec(`cd ${repoPath}; git init --bare`)
    await exec(`cd ${repoPath}; touch git-daemon-export-ok`)
    await exec(`cd ${repoPath}; cp hooks/post-update.sample hooks/post-update`)
    await exec(`cd ${repoPath}; git config http.receivepack true`)
    await exec(`cd ${repoPath}; git update-server-info`)
  },
}
