const sha256 = require('crypto-js/sha256')
const { User } = require('../db')

exports.getListUsers = async function (ctx) {
    const users = await User.findAll({ order: [['username', 'DESC']] })
    return ctx.render('admin/ListUsers', { users })
}

exports.getAddUser = async function (ctx) {
    return ctx.render('admin/AddUser')
}

exports.postAddUser = async function (ctx) {
    const { username, password } = ctx.request.body
    await User.create({ username, password: sha256(password).toString() })
    ctx.redirect('/admin')
}

exports.getDeleteUser = async function (ctx) {
    const { username } = ctx.params
    await User.destroy({ where: { username } })
    ctx.redirect('/admin')
}
