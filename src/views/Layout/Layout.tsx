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
        <link rel="icon" type="image/png" href="/favicon.svg" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/diff2html@3.2.0/bundles/css/diff2html.min.css" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.5.0/build/styles/default.min.css"
        />
        <script type="text/javascript" src="/scripts/copy.js" defer></script>
        <script type="text/javascript" src="/scripts/change-branch.js" defer></script>
        <script type="text/javascript" src="/scripts/tickets.js" defer></script>
        <style>.d2h-files-diff &#123; height: unset &#125;</style>
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
