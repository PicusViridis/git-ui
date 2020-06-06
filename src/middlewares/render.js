const path = require('path')
const ReactDOMServer = require('react-dom/server')
const React = require('react')

function _render(path, options, children = []) {
    const component = require(path).default
    return React.createElement(component, options, children)
}

function render({ root, ext, cache, layout }) {
    return function (ctx, next) {
        if (ctx.render) return next()
        ctx.render = function renderReact(filename, options) {
            if (cache === false) {
                Object.keys(require.cache).forEach(function (key) {
                    delete require.cache[key]
                })
            }
            const allOptions = { ...this.state, ...options }
            const component = _render(path.join(root, `${filename}.${ext}`), allOptions)
            const layoutComponent = _render(path.join(root, `${layout}.${ext}`), allOptions, component)
            this.type = 'html'
            this.body = ReactDOMServer.renderToStaticMarkup(layoutComponent)
        }
        return next()
    }
}

exports.render = render
