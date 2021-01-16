import React from 'react'
import { Container, Table } from 'reactstrap'
import { IRepositoryMeta } from '../../models/interfaces'
import { Issue } from '../../models/Issue'
import Layout from '../Layout/RepoLayout'

interface IIssuesProps {
  issues: Issue[]
  meta: IRepositoryMeta
}

export default function Issues({ issues, meta }: IIssuesProps): JSX.Element {
  return (
    <Layout meta={meta} active="issues">
      <Container>
        <Table striped>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id}>
                <td>{issue.title}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Layout>
  )
}
