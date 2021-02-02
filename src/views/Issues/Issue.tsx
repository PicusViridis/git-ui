import { format } from 'date-fns'
import React from 'react'
import { Save, Trash } from 'react-feather'
import { Button, ButtonGroup, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { Issue } from '../../models/Issue'
import { Release } from '../../models/Release'
import { noop } from '../utils'

export interface IIssueProps {
  issue?: Issue
  releases?: Release[]
  repo: string
}

export default function AddIssue({ issue, repo, releases }: IIssueProps): JSX.Element {
  const action = `/repo/${repo}/issues/edit` + (issue ? `/${issue.id}` : '')
  return (
    <Form action={action} method="POST">
      <Row>
        <Col sm={5}>
          <FormGroup>
            <Label for="type">Type</Label>
            <Input id="type" name="type" type="select" value={issue?.type || 'feature'} onChange={noop} required>
              <option value="bug">Bug</option>
              <option value="feature">Feature</option>
            </Input>
          </FormGroup>
        </Col>
        <Col sm={5}>
          <FormGroup>
            <Label for="release">Release</Label>
            <Input id="release" name="release" type="select" value={issue?.release?.id} onChange={noop} required>
              <option></option>
              {releases?.map((release) => (
                <option key={release.id} value={release.id}>
                  {release.name} ({format(release.dueDate, 'PPP')})
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
        <Col sm={2}>
          <FormGroup>
            <Label for="points">Points</Label>
            <Input id="points" name="points" type="number" value={issue?.points || 0} onChange={noop} required />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input id="title" name="title" type="text" value={issue?.title} onChange={noop} required />
      </FormGroup>
      <FormGroup>
        <Label for="description">Summary</Label>
        <Input
          id="description"
          name="description"
          type="textarea"
          rows={7}
          value={issue?.description}
          onChange={noop}
          required
        />
      </FormGroup>
      <FormGroup>
        <ButtonGroup>
          <Button color="primary">
            <Save size="1rem" className="mb-1" /> Save
          </Button>
          {issue && (
            <Button tag="a" color="danger" outline type="button" href={`/repo/${repo}/issues/delete/${issue.id}`}>
              <Trash size="1rem" className="mb-1" /> Delete
            </Button>
          )}
        </ButtonGroup>
      </FormGroup>
    </Form>
  )
}
