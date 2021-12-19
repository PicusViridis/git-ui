import { Classes, Colors } from '@blueprintjs/core'
import { Global } from '@emotion/react'
import { useTheme } from '@saramorillon/hooks'
import c from 'classnames'
import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SessionProvider } from '../contexts/SessionContext'
import { PrivateOutlet, PublicOutlet, RepoOutlet } from './components/Outlet/Outlet'
import { Commit } from './pages/Commit/Commit'
import { Commits } from './pages/Commits/Commits'
import { Repos } from './pages/Repos/Repos'
import { Tree } from './pages/Tree/Tree'
import { User } from './pages/User/User'
import { Users } from './pages/Users/Users'

export function App(): JSX.Element | null {
  const theme = useTheme()

  return (
    <div className={c({ [Classes.DARK]: theme === 'dark' })}>
      <Global styles={{ body: { backgroundColor: theme === 'dark' ? Colors.DARK_GRAY1 : undefined } }} />
      <SessionProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<PublicOutlet />} />
            <Route path="/" element={<PrivateOutlet />}>
              <Route path="/" element={<Repos />} />
              <Route path="/repo/:repo/:branch" element={<RepoOutlet />}>
                <Route path="tree" element={<Tree />} />
                <Route path="commits" element={<Commits />} />
                <Route path="commit/:hash" element={<Commit />} />
              </Route>
              <Route path="users" element={<Users />} />
              <Route path="user" element={<User />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </SessionProvider>
    </div>
  )
}
