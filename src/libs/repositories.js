const fse = require('fs-extra')
const hljs = require('highlight.js')
const { join } = require('path')
const { config } = require('../config')
const { getIcon } = require('./icons')
const { log, listFiles, listBranches, isGitRepo, getContent, getSize, isBinary, getDiffs } = require('./git')
const { parse, html } = require('diff2html')

const { repoDir } = config

async function listGitRepositories() {
    const repos = await fse.readdir(repoDir)
    const result = []
    for (const repo of repos) {
        const repoPath = join(repoDir, repo)
        const stat = await fse.stat(repoPath)
        if (stat.isDirectory() && (await isGitRepo(repoPath))) {
            result.push(repo)
        }
    }
    return result
}

exports.listRepositories = async function () {
    const repos = await listGitRepositories()
    const mapped = await Promise.all(
        repos.map(async (name) => {
            const repoPath = join(repoDir, name)
            const [lastCommit] = await log(repoPath, '.')
            return { name, lastCommit }
        })
    )
    return mapped.sort((repo1, repo2) => {
        return repo2.lastCommit.timestamp - repo1.lastCommit.timestamp
    })
}

exports.getFiles = async function (repoName, currentPath, branch) {
    const repoPath = join(repoDir, repoName)
    const files = await listFiles(repoPath, currentPath + '/', branch)
    const mapped = await Promise.all(
        files.map(async ({ type, path }) => {
            const name = path.split('/').pop()
            const icon = getIcon(type, name)
            const [lastCommit] = await log(repoPath, path, branch)
            return { type, icon, name, path, lastCommit }
        })
    )
    return mapped.sort((file1, file2) => {
        let result = file2.type === 'folder' ? 1 : file1.type === 'folder' ? -1 : 0
        if (result === 0) {
            result = file1.name > file2.name ? 1 : file2.name < file1.name ? -1 : 0
        }
        return result
    })
}

exports.listBranches = async function (repoName, branch) {
    const repoPath = join(repoDir, repoName)
    const branches = await listBranches(repoPath)
    return branches.filter((name) => name !== branch)
}

exports.getContent = async function (repoName, currentPath, branch) {
    const repoPath = join(repoDir, repoName)
    if (await isBinary(repoPath, currentPath)) {
        return false
    } else {
        const rawContent = await getContent(repoPath, currentPath, branch)
        return hljs.highlightAuto(rawContent).value
    }
}
exports.getSize = function (repoName, currentPath, branch) {
    const repoPath = join(repoDir, repoName)
    return getSize(repoPath, currentPath, branch)
}

exports.getStream = function (repoName, currentPath, branch) {
    const repoPath = join(repoDir, repoName)
    return getContent(repoPath, currentPath, branch)
}

exports.getBreadcrumb = function (repoName, currentPath) {
    const atRoot = currentPath === '.'
    const result = [{ name: repoName, isActive: atRoot }]
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
}

exports.MAX_COMMIT_PER_PAGE = 20
exports.getCommits = function (repoName, branch, page) {
    const repoPath = join(repoDir, repoName)
    const skip = (page - 1) * exports.MAX_COMMIT_PER_PAGE
    return log(repoPath, '.', branch, `-${exports.MAX_COMMIT_PER_PAGE} --skip=${skip}`)
}

exports.getDiffs = async function (repoName, currentPath, branch) {
    const repoPath = join(repoDir, repoName)
    const diff = await getDiffs(repoPath, currentPath, branch)
    return html(parse(diff), { outputFormat: 'side-by-side', drawFileList: false })
}
