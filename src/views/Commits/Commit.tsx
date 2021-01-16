import React from 'react'
import { IRepositoryMeta } from '../../models/interfaces'
import Layout from '../Layout/RepoLayout'

interface IDiffProps {
  diff: string
  meta: IRepositoryMeta
}

export default function Commit({ diff, meta }: IDiffProps): JSX.Element {
  return (
    <Layout meta={meta} active="commits">
      <div dangerouslySetInnerHTML={{ __html: diff }} />
    </Layout>
  )
}
