import React from 'react'
import { IRepositoryMeta } from '../../models/interfaces'
import Layout from './Layout'

interface IDiffProps {
  diff: string
  repo: IRepositoryMeta
}

export default function Diff({ diff, repo }: IDiffProps): JSX.Element {
  return (
    <Layout repo={repo} active="commits">
      <div dangerouslySetInnerHTML={{ __html: diff }} />
    </Layout>
  )
}
