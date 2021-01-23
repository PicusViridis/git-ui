import { format } from 'date-fns'
import React, { CSSProperties } from 'react'
import { Alert, Table } from 'reactstrap'
import { Issue, Status } from '../../models/Issue'
import { Release } from '../../models/Release'
import { Ticket } from './Ticket'

const oddStyle: CSSProperties = {
  backgroundColor: '#fafafa',
}

function cellProps(issue: Issue, status: Status, repo: string) {
  return {
    className: 'board-cell',
    'data-priority': issue.priority,
    'data-status': status,
    'data-repo': repo,
  }
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
            <td {...cellProps(issue, 'to do', repo)}>
              <Ticket issue={issue} status="to do" repo={repo} />
            </td>
            <td style={oddStyle} {...cellProps(issue, 'doing', repo)}>
              <Ticket issue={issue} status="doing" repo={repo} />
            </td>
            <td className="board-cell" {...cellProps(issue, 'done', repo)}>
              <Ticket issue={issue} status="done" repo={repo} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
