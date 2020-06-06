const { getFiles, getContent, getSize, getStream, getCommits, getDiffs } = require('../libs/repositories')

async function getCommonInfo(ctx) {
    const { repo } = ctx.params
    const branch = ctx.params.branch || 'master'
    const path = ctx.query.path || '.'
    return { repo, path, branch }
}

exports.getFiles = async function (ctx) {
    const { repo, path, branch } = await getCommonInfo(ctx)
    const files = await getFiles(repo, path, branch)
    await ctx.render('repo/Files', { files })
}

exports.getFile = async function (ctx) {
    const { repo, path, branch } = await getCommonInfo(ctx)
    const content = await getContent(repo, path, branch)
    const size = await getSize(repo, path, branch)
    await ctx.render('repo/File', { content, size })
}

exports.downloadFile = async function (ctx) {
    const { repo, path, branch } = await getCommonInfo(ctx)
    const filename = path.split('/').pop()
    const stream = await getStream(repo, path, branch)
    ctx.set('Content-Disposition', `attachment; filename=${filename}`)
    ctx.body = stream
}

exports.getCommits = async function (ctx) {
    const { repo, branch } = await getCommonInfo(ctx)
    const page = ctx.query.page || 1
    const commits = await getCommits(repo, branch, page)
    await ctx.render('repo/Commits', { commits })
}

exports.getCommit = async function (ctx) {
    const { repo, path, branch, branches } = await getCommonInfo(ctx)
    const { hash } = ctx.params
    const diff = await getDiffs(repo, path, hash)
    await ctx.render('repo/diff', { repo, path, branch, branches, diff })
}
