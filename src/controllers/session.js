const passport = require('koa-passport')

exports.getLogin = function (ctx) {
    const [error] = ctx.flash('error')
    return ctx.render('Login', { error })
}

exports.postLogin = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: 'Invalid credentials',
})

exports.getLogout = function (ctx) {
    ctx.logout()
    ctx.redirect('/')
}
