const { listRepositories } = require('../libs/repositories')

exports.getHome = async function (ctx) {
    const repositories = await listRepositories()
    return ctx.render('Home', { repositories })
}
