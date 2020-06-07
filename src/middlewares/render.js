const { join } = require('path')
const ReactDOMServer = require('react-dom/server')
const React = require('react')

function renderComponent(path, options, children = []) {
    const component = require(path).default
    return React.createElement(component, options, children)
}

function renderReact(root, ext, cache, layout, filename, options) {
    if (cache === false) {
        Object.keys(require.cache).forEach(function (key) {
            delete require.cache[key]
        })
    }
    const allOptions = { ...this.state, ...options }
    const component = renderComponent(join(root, `${filename}.${ext}`), allOptions)
    const layoutComponent = renderComponent(join(root, `${layout}.${ext}`), allOptions, component)
    this.type = 'html'
    this.body = ReactDOMServer.renderToStaticMarkup(layoutComponent)
}

function render({ root, ext, cache, layout }) {
    return function (ctx, next) {
        if (!ctx.render) {
            ctx.render = renderReact.bind(ctx, root, ext, cache, layout)
        }
        return next()
    }
}

exports.render = render
