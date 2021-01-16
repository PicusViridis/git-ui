import React from 'react'
import { IRepositoryMeta } from '../../models/interfaces'
import Layout from '../Layout/RepoLayout'

interface IDiffProps {
  diff: string
  repo: IRepositoryMeta
}

export default function Commit({ diff, repo }: IDiffProps): JSX.Element {
  return (
    <Layout repo={repo} active="commits">
      <div dangerouslySetInnerHTML={{ __html: diff }} />
    </Layout>
  )
}
