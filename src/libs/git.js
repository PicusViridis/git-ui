const { exec } = require('child_process')
const { formatDistance, fromUnixTime } = require('date-fns')
const { appLogger } = require('../middlewares/logger')
const { convertBytes } = require('./convert')

function asyncExec(command) {
    return new Promise((resolve, reject) => {
        appLogger.debug('command_execution', { command })
        exec(command, (err, stdout) => {
            if (err) {
                reject(err)
            } else {
                resolve(stdout)
            }
        })
    })
}

const format = '%H::%h::%an::%at::%s' // Hash::Abbreviated hash::Author::Date::Message
exports.log = async function (repoPath, filePath, branch = '', params = '-1') {
    const result = await asyncExec(`git -C ${repoPath} log ${params} --format=${format} ${branch} -- ${filePath}`)
    const lines = result.split(/\n+/).filter(Boolean)
    return lines.map((line) => {
        const [fullHash, hash, author, timestamp, message] = line.split('::')
        const date = formatDistance(fromUnixTime(+timestamp), Date.now(), { addSuffix: true })
        return { fullHash, hash, author, date, timestamp: +timestamp, message }
    })
}

exports.listFiles = async function (repoPath, filePath, branch = '') {
    const result = await asyncExec(`git -C ${repoPath} ls-tree ${branch} ${filePath}`)
    return result
        .split('\n')
        .filter(Boolean)
        .map((line) => {
            const [, type, , path] = line.split(/\s+/)
            return { type: type === 'blob' ? 'file' : 'folder', path }
        })
}

exports.listBranches = async function (repoPath) {
    const result = await asyncExec(`git -C ${repoPath} branch`)
    return result
        .split('\n')
        .filter(Boolean)
        .map((name) => name.replace(/\*?\s+/, ''))
}

exports.isGitRepo = async function (repoPath) {
    try {
        await asyncExec(`git -C ${repoPath} rev-parse`)
        return true
    } catch (error) {
        if (error.message.includes('fatal: not a git repository')) {
            return false
        }
        throw error
    }
}

exports.getContent = function (repoPath, filePath, branch) {
    return asyncExec(`git -C ${repoPath} show ${branch}:${filePath}`)
}

exports.getSize = async function (repoPath, filePath, branch) {
    const size = await asyncExec(`git -C ${repoPath} cat-file -s ${branch}:${filePath}`)
    return convertBytes(size)
}

const emptyTreeHash = '4b825dc642cb6eb9a060e54bf8d69288fbee4904'
exports.isBinary = async function (repoPath, filePath) {
    const result = await asyncExec(`git -C ${repoPath} diff-tree -p ${emptyTreeHash} HEAD -- ${filePath}`)
    return result.includes(`Binary files /dev/null and b/${filePath} differ`)
}

async function getParent(repoPath, branch) {
    const parent = await asyncExec(`git -C ${repoPath} log --pretty=%P -1 ${branch}`)
    return parent.replace(/\n+/, '')
}

exports.getDiffs = async function (repoPath, filePath, branch) {
    const parent = await getParent(repoPath, branch)
    return asyncExec(`git -C ${repoPath} diff-tree -w -p ${parent} ${branch} -- ${filePath}`)
}
