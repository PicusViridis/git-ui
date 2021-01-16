import React, { PropsWithChildren } from 'react'
import { Container } from 'reactstrap'
import { IRepositoryMeta } from '../../models/interfaces'
import Header from '../Header/RepoHeader'
import Nav from '../Nav/Nav'

interface ILayoutProps {
  active: 'files' | 'commits' | 'issues'
  meta: IRepositoryMeta
}

export default function Layout({ active, meta, children }: PropsWithChildren<ILayoutProps>): JSX.Element {
  return (
    <>
      <Header meta={meta} active={active} />
      <Container>
        <Nav meta={meta} />
        <hr />
        {children}
      </Container>
    </>
  )
}
