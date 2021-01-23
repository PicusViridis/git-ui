import { format } from 'date-fns'
import React, { CSSProperties } from 'react'
import { Alert, Table } from 'reactstrap'
import { Issue } from '../../models/Issue'
import { Release } from '../../models/Release'
import { Ticket } from './Ticket'

const oddStyle: CSSProperties = {
  backgroundColor: '#fafafa',
}

interface IBoardProps {
  release?: Release
  issues: Issue[]
  repo: string
}

export default function Board({ release, issues, repo }: IBoardProps): JSX.Element {
  if (!release) {
    return (
      <Alert color="info" fade={false}>
        No suitable release found
      </Alert>
    )
  }

  return (
    <Table style={{ tableLayout: 'fixed' }}>
      <caption style={{ captionSide: 'top' }}>
        <strong>{release.name}</strong> ({format(release.dueDate, 'PPP')})
      </caption>
      <thead>
        <tr>
          <th>To do</th>
          <th style={oddStyle}>Doing</th>
          <th>Done</th>
        </tr>
      </thead>
      <tbody>
        {issues.map((issue) => (
          <tr key={issue.id}>
            <td>
              <Ticket issue={issue} status="to do" repo={repo} />
            </td>
            <td style={oddStyle}>
              <Ticket issue={issue} status="doing" repo={repo} />
            </td>
            <td>
              <Ticket issue={issue} status="done" repo={repo} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
