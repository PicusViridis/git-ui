import React, { ReactNode } from 'react'
import { User } from '../../models/User'
import Header from '../Header/Header'

interface ILayoutProps {
  user?: User
  children: ReactNode
}

export default function Layout({ user, children }: ILayoutProps): JSX.Element {
  return (
    <html>
      <head>
        <title>Git UI</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="/styles/diff2html.min.css" />
        <link rel="stylesheet" type="text/css" href="/styles/highlight.min.css" />
        <link rel="stylesheet" type="text/css" href="/styles/fontawesome.min.css" />
        <link rel="stylesheet" type="text/css" href="/styles/base.css" />
        <link rel="icon" type="image/png" href="/favicon.svg" />
        <script type="text/javascript" src="/scripts/copy.js" defer></script>
      </head>
      <body>
        <Header user={user} />
        {children}
      </body>
    </html>
  )
}
