import React from 'react'
import { Card, CardBody, CardTitle } from 'reactstrap'
import { Issue, Status, Type } from '../../models/Issue'

const colors: { [key in Type]: string } = {
  bug: 'danger',
  feature: 'warning',
}

interface ITicketProps {
  status: Status
  issue: Issue
  repo: string
}

export function Ticket({ status, issue, repo }: ITicketProps): JSX.Element | null {
  if (status !== issue.status) {
    return null
  }
  return (
    <Card color={colors[issue.type]} outline draggable className="board-ticket" data-id={issue.id}>
      <CardBody>
        <CardTitle tag="h5">
          <a href={`/repo/${repo}/issues/edit/${issue.id}`}>{issue.title}</a>
        </CardTitle>
      </CardBody>
    </Card>
  )
}
