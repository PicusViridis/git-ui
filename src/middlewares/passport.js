const sha256 = require('crypto-js/sha256')
const passport = require('koa-passport')
const { Strategy: LocalStrategy } = require('passport-local')
const { User } = require('../db')

exports.passport = function (app) {
    passport.serializeUser(function (user, done) {
        done(null, user.username)
    })

    passport.deserializeUser(async function (username, done) {
        User.findByPk(username)
            .then((user) => {
                done(null, user)
            })
            .catch(done)
    })

    passport.use(
        new LocalStrategy(function (username, password, done) {
            User.findOne({ where: { username, password: sha256(password).toString() } })
                .then((user) => {
                    if (user) {
                        done(null, user)
                    } else {
                        done(null, false)
                    }
                })
                .catch(done)
        })
    )

    app.use(passport.initialize())
    app.use(passport.session())
}
