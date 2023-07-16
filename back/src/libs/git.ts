import { Logger } from '@saramorillon/logger'
import exec from 'async-exec'
import { settings } from '../settings'

export const LOG_FORMAT = '%H::%an::%at::%s::%P' // Hash::Author::Date::Message
export const EMPTY_TREE_HASH = '4b825dc642cb6eb9a060e54bf8d69288fbee4904'

export const GitService = {
  logger: new Logger(settings.logs, { app: settings.app }),

  async execGitCommand(command: string): Promise<string> {
    const { success, failure } = this.logger.start('git-command', { command })
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

  log(repoPath: string, filePath: string, branch = '', params = '-1'): Promise<string> {
    return this.execGitCommand(`git -C ${repoPath} log ${params} --format=${LOG_FORMAT} ${branch} -- "${filePath}"`)
  },

  branch(repoPath: string, params = ''): Promise<string> {
    return this.execGitCommand(`git -C ${repoPath} branch ${params}`)
  },

  revList(repoPath: string, filePath: string, branch: string): Promise<string> {
    return this.execGitCommand(`git -C ${repoPath} rev-list --count ${branch} -- "${filePath}"`)
  },

  revParse(repoPath: string): Promise<string | null> {
    return this.execGitCommand(`git -C ${repoPath} rev-parse`)
  },

  catFile(repoPath: string, filePath: string, branch: string, params = ''): Promise<string> {
    return this.execGitCommand(`git -C ${repoPath} cat-file ${params} "${branch}:${filePath}"`)
  },

  lsTree(repoPath: string, filePath: string, branch = '', params = ''): Promise<string> {
    return this.execGitCommand(`git -C ${repoPath} -c core.quotePath=off ls-tree ${params} ${branch} "${filePath}"`)
  },

  diffTree(repoPath: string, filePath: string, branch: string, parent = EMPTY_TREE_HASH): Promise<string> {
    return this.execGitCommand(`git -C ${repoPath} diff-tree -p ${parent} ${branch} -- "${filePath}"`)
  },
}
