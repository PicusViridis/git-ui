import exec from 'async-exec'
import { start } from './logger'

export const LOG_FORMAT = '%H::%an::%at::%s::%P' // Hash::Author::Date::Message
export const EMPTY_TREE_HASH = '4b825dc642cb6eb9a060e54bf8d69288fbee4904'

export const GitService = {
  async execGitCommand(command: string): Promise<string> {
    const { success, failure } = start('git-command', { command })
    try {
      const stdout = (await exec(command)).trim()
      if (stdout.startsWith('fatal:')) throw new Error(stdout)
      success()
      return stdout
    } catch (error) {
      failure(error)
      return ''
    }
  },

  async log(repoPath: string, filePath: string, branch = '', params = '-1'): Promise<string> {
    return this.execGitCommand(`git -C ${repoPath} log ${params} --format=${LOG_FORMAT} ${branch} -- "${filePath}"`)
  },

  async branch(repoPath: string): Promise<string> {
    return this.execGitCommand(`git -C ${repoPath} branch`)
  },

  async revList(repoPath: string, filePath: string, branch: string): Promise<string> {
    return this.execGitCommand(`git -C ${repoPath} rev-list --count ${branch} -- "${filePath}"`)
  },

  async revParse(repoPath: string): Promise<string | null> {
    return this.execGitCommand(`git -C ${repoPath} rev-parse`)
  },

  async catFile(repoPath: string, filePath: string, branch: string, params = ''): Promise<string> {
    return this.execGitCommand(`git -C ${repoPath} cat-file ${params} "${branch}:${filePath}"`)
  },

  async lsTree(repoPath: string, filePath: string, branch = '', params = ''): Promise<string> {
    return this.execGitCommand(`git -C ${repoPath} -c core.quotePath=off ls-tree ${params} ${branch} "${filePath}"`)
  },

  async diffTree(repoPath: string, filePath: string, branch: string, parent = EMPTY_TREE_HASH): Promise<string> {
    return this.execGitCommand(`git -C ${repoPath} diff-tree -p ${parent} ${branch} -- "${filePath}"`)
  },
}
