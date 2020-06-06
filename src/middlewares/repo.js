const { listBranches, getBreadcrumb } = require('../libs/repositories')

function repo() {
    return async function (ctx, next) {
        const { repo: name } = ctx.params
        const branch = ctx.params.branch || 'master'
        const path = ctx.query.path || '.'
        const branches = await listBranches(name, branch)
        const breadcrumb = getBreadcrumb(name, path)
        ctx.state.repo = { name, path, branch, branches, breadcrumb }
        return next()
    }
}

exports.repo = repo
