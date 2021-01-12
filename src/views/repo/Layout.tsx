import React, { PropsWithChildren } from 'react'
import { Container } from 'reactstrap'
import { IRepositoryMeta } from '../../models/interfaces'
import Header from './Header'
import Nav from './Nav'

interface ICommonProps {
  active: string
  repo: IRepositoryMeta
}

export default function Layout({ active, repo, children }: PropsWithChildren<ICommonProps>): JSX.Element {
  return (
    <>
      <Header repo={repo} active={active} />
      <Container>
        <Nav repo={repo} />
        <hr />
        {children}
      </Container>
    </>
  )
}
