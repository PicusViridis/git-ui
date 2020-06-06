function hasSession() {
    return async function (ctx, next) {
        if (ctx.isAuthenticated()) {
            await next()
        } else {
            ctx.redirect('/login')
        }
    }
}

exports.hasSession = hasSession
