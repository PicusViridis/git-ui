const sha256 = require('crypto-js/sha256')
const { User } = require('../db')

exports.serializeUser = function (user, done) {
    done(null, user.username)
}

exports.deserializeUser = function (username, done) {
    return User.findByPk(username)
        .then((user) => {
            done(null, user)
        })
        .catch(done)
}

exports.localStrategy = function (username, password, done) {
    return User.findOne({ where: { username, password: sha256(password).toString() } })
        .then((user) => {
            if (user) {
                done(null, user)
            } else {
                done(null, false)
            }
        })
        .catch(done)
}
