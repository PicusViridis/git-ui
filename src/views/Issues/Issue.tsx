import React from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { Issue } from '../../models/Issue'
import { noop } from '../utils'

interface IIssueProps {
  issue?: Issue
  repo: string
}

export default function AddIssue({ issue, repo }: IIssueProps): JSX.Element {
  return (
    <Form action={`/repo/${repo}/issues/add`} method="POST">
      <FormGroup>
        <Label for="title">Title</Label>
        <Input id="title" name="title" type="text" value={issue?.title} onChange={noop} />
      </FormGroup>
      <FormGroup>
        <Label for="type">Type</Label>
        <Input id="type" name="type" type="select" value={issue?.type || 'feature'} onChange={noop}>
          <option value="bug">Bug</option>
          <option value="feature">Feature</option>
        </Input>
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
        />
      </FormGroup>
      <FormGroup>
        <Button color="primary">Create issue</Button>
      </FormGroup>
    </Form>
  )
}
