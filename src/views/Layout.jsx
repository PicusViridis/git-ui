import React from 'react'
import Header from './Header'

export default function Layout({ children, user }) {
    return (
        <html>
            <head>
                <title>Git UI</title>
                <link rel="stylesheet" type="text/css" href="/styles/diff2html.min.css" />
                <link rel="stylesheet" type="text/css" href="/styles/bulma.min.css" />
                <link rel="stylesheet" type="text/css" href="/styles/highlight.min.css" />
                <link rel="stylesheet" type="text/css" href="/styles/fontawesome.min.css" />
                <link rel="stylesheet" type="text/css" href="/styles/base.css" />
                <link rel="icon" type="image/png" href="/favicon.svg" />

                <script type="text/javascript" src="/scripts/copy.js" defer></script>
            </head>
            <body>
                <Header user={user} />
                <section className="section">
                    <div className="container">{children}</div>
                </section>
            </body>
        </html>
    )
}
