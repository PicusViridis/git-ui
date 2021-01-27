import React, { ReactNode } from 'react'
import { Container } from 'reactstrap'
import { User } from '../../models/User'
import { Header } from '../Header/Header'
import { Nav } from '../Nav/Nav'

interface ILayoutProps {
  title: string
  user?: User
  repo: string
  branch: string
  path: string
  branches: string[]
  active: 'files' | 'commits' | 'issues'
  children: ReactNode
}

export default function Layout({
  title,
  user,
  repo,
  branch,
  path,
  branches,
  active,
  children,
}: ILayoutProps): JSX.Element {
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
        <script type="text/javascript" src="/scripts/tickets.js" defer></script>
      </head>
      <body className="pb-5">
        <Header title={title} user={user} repo={repo} branch={branch} path={path} active={active} />
        <Container>
          <Nav repo={repo} branch={branch} path={path} branches={branches} active={active} />
          {children}
        </Container>
      </body>
    </html>
  )
}
