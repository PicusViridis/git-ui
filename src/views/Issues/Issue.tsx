import { format } from 'date-fns'
import React from 'react'
import { Button, ButtonGroup, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { Issue } from '../../models/Issue'
import { Release } from '../../models/Release'
import { noop } from '../utils'

interface IIssueProps {
  issue?: Issue
  releases?: Release[]
  repo: string
}

export default function AddIssue({ issue, repo, releases }: IIssueProps): JSX.Element {
  return (
    <Form action={`/repo/${repo}/issues/edit/${issue?.id || ''}`} method="POST">
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
            <i className="fas fa-save"></i> Save
          </Button>
          {issue && (
            <Button tag="a" color="danger" outline type="button" href={`/repo/${repo}/issues/delete/${issue.id}`}>
              <i className="fas fa-trash"></i> Delete
            </Button>
          )}
        </ButtonGroup>
      </FormGroup>
    </Form>
  )
}
