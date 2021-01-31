import exec from 'async-exec'
import { formatDistance, fromUnixTime } from 'date-fns'
import { promises as fse } from 'fs'
import { ICommitsProps } from '../views/Commits/Commits'

export const LOG_FORMAT = '%H::%an::%at::%s' // Hash::Author::Date::Message
export const EMPTY_TREE_HASH = '4b825dc642cb6eb9a060e54bf8d69288fbee4904'

export const GitService = {
  async log(repoPath: string, filePath: string, branch = '', params = '-1'): Promise<ICommitsProps['commits']> {
    const lines = await exec(`git -C ${repoPath} log ${params} --format=${LOG_FORMAT} ${branch} -- ${filePath}`)
    return lines
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const [hash, author, timestamp, message] = line.split('::')
        const date = formatDistance(fromUnixTime(Number(timestamp)), Date.now(), { addSuffix: true })
        return { hash, author, date, message }
      })
  },

  async countCommits(repoPath: string, filePath: string, branch: string): Promise<number> {
    const result = await exec(`git -C ${repoPath} rev-list --count ${branch} -- ${filePath}`)
    return Number(result)
  },

  async listFiles(
    repoPath: string,
    filePath: string,
    branch = ''
  ): Promise<{ type: 'file' | 'folder'; path: string }[]> {
    const result = await exec(`git -C ${repoPath} ls-tree ${branch} ${filePath}`)
    return result
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const [, type, , path] = line.split(/\s+/)
        return { type: type === 'blob' ? 'file' : 'folder', path }
      })
  },

  async listBranches(repoPath: string): Promise<string[]> {
    const result = await exec(`git -C ${repoPath} branch`)
    return result
      .split('\n')
      .filter(Boolean)
      .map((name) => name.replace(/\*?\s+/, ''))
  },

  async isGitRepo(repoPath: string): Promise<boolean> {
    const stat = await fse.stat(repoPath)
    if (!stat.isDirectory()) {
      return false
    }
    try {
      await exec(`git -C ${repoPath} rev-parse`)
      return true
    } catch (error) {
      if (error.message.includes('fatal: not a git repository')) {
        return false
      }
      throw error
    }
  },

  async getContent(repoPath: string, filePath: string, branch: string): Promise<string> {
    return exec(`git -C ${repoPath} show ${branch}:${filePath}`)
  },

  async getSize(repoPath: string, filePath: string, branch: string): Promise<string> {
    return exec(`git -C ${repoPath} cat-file -s ${branch}:${filePath}`)
  },

  async isBinary(repoPath: string, filePath: string, branch: string): Promise<boolean> {
    const result = await exec(`git -C ${repoPath} diff-tree -p ${EMPTY_TREE_HASH} ${branch} -- ${filePath}`)
    return result.includes(`Binary files /dev/null and b/${filePath} differ`)
  },

  async getDiffs(repoPath: string, filePath: string, branch: string): Promise<string> {
    const log = await exec(`git -C ${repoPath} log --pretty=%P -1 ${branch}`)
    const [parent] = log.split('\n')
    return exec(`git -C ${repoPath} diff-tree -w -p ${parent || EMPTY_TREE_HASH} ${branch} -- ${filePath}`)
  },
}
