const { listRepositories } = require('../libs/repositories')

exports.getHome = async function (ctx) {
    const repositories = await listRepositories()
    await ctx.render('Home', { repositories })
}
