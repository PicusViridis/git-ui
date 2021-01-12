import { exec } from 'child_process'
import { formatDistance, fromUnixTime } from 'date-fns'
import { logger } from '../libs/logger'
import { ICommit, IFileMeta } from '../models/interfaces'

function asyncExec(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    logger.debug('command_execution', { command })
    exec(command, (err, stdout) => {
      if (err) {
        reject(err)
      } else {
        resolve(stdout)
      }
    })
  })
}

async function getParent(repoPath: string, branch: string) {
  const parent = await asyncExec(`git -C ${repoPath} log --pretty=%P -1 ${branch}`)
  return parent.replace(/\n+/, '')
}

export const GitService = {
  async log(repoPath: string, filePath: string, branch = '', params = '-1'): Promise<ICommit[]> {
    const format = '%H::%h::%an::%at::%s' // Hash::Abbreviated hash::Author::Date::Message
    const result = await asyncExec(`git -C ${repoPath} log ${params} --format=${format} ${branch} -- ${filePath}`)
    const lines = result.split(/\n+/).filter(Boolean)
    return lines.map((line) => {
      const [fullHash, hash, author, timestamp, message] = line.split('::')
      const date = formatDistance(fromUnixTime(+timestamp), Date.now(), { addSuffix: true })
      return { fullHash, hash, author, date, timestamp: +timestamp, message }
    })
  },

  async listFiles(repoPath: string, filePath: string, branch = ''): Promise<IFileMeta[]> {
    const result = await asyncExec(`git -C ${repoPath} ls-tree ${branch} ${filePath}`)
    return result
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const [, type, , path] = line.split(/\s+/)
        return { type: type === 'blob' ? 'file' : 'folder', path }
      })
  },

  async listBranches(repoPath: string): Promise<string[]> {
    const result = await asyncExec(`git -C ${repoPath} branch`)
    return result
      .split('\n')
      .filter(Boolean)
      .map((name) => name.replace(/\*?\s+/, ''))
  },

  async isGitRepo(repoPath: string): Promise<boolean> {
    try {
      await asyncExec(`git -C ${repoPath} rev-parse`)
      return true
    } catch (error) {
      if (error.message.includes('fatal: not a git repository')) {
        return false
      }
      throw error
    }
  },

  async getContent(repoPath: string, filePath: string, branch: string): Promise<string> {
    return asyncExec(`git -C ${repoPath} show ${branch}:${filePath}`)
  },

  async getSize(repoPath: string, filePath: string, branch: string): Promise<string> {
    return asyncExec(`git -C ${repoPath} cat-file -s ${branch}:${filePath}`)
  },

  async isBinary(repoPath: string, filePath: string): Promise<boolean> {
    const emptyTreeHash = '4b825dc642cb6eb9a060e54bf8d69288fbee4904'
    const result = await asyncExec(`git -C ${repoPath} diff-tree -p ${emptyTreeHash} HEAD -- ${filePath}`)
    return result.includes(`Binary files /dev/null and b/${filePath} differ`)
  },

  async getDiffs(repoPath: string, filePath: string, branch: string): Promise<string> {
    const parent = await getParent(repoPath, branch)
    return asyncExec(`git -C ${repoPath} diff-tree -w -p ${parent} ${branch} -- ${filePath}`)
  },
}
