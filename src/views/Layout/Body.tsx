import React, { PropsWithChildren } from 'react'
import { Container } from 'reactstrap'
import { User } from '../../models/User'
import { Header } from '../Header/Header'
import { Nav } from '../Nav/Nav'

export interface IBodyProps {
  title: string
  user?: User
  repo: string
  branch: string
  path: string
  branches: string[]
  active: 'files' | 'commits' | 'issues'
}

export function Body({ title, user, branches, children, ...props }: PropsWithChildren<IBodyProps>): JSX.Element {
  return (
    <>
      <Header title={title} user={user} {...props} />
      <Container>
        <Nav branches={branches} {...props} />
        {children}
      </Container>
    </>
  )
}
