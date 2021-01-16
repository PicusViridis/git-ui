import React, { ReactNode } from 'react'
import { Container } from 'reactstrap'
import { User } from '../../models/User'
import { Header } from '../Header/Header'
import { Nav } from '../Nav/Nav'

interface ILayoutProps {
  user?: User
  meta?: {
    repo: string
    path: string
    branch: string
    branches: string[]
  }
  path: string
  query: string
  children: ReactNode
}

export default function Layout({ user, meta, path, query, children }: ILayoutProps): JSX.Element {
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
        <script type="text/javascript" src="/scripts/change-branch.js" defer></script>
      </head>
      <body>
        <Header user={user} repo={meta?.repo} path={path} query={query} />
        <Container>
          <Nav meta={meta} path={path} query={query} />
          {children}
        </Container>
      </body>
    </html>
  )
}
