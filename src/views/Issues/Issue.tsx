import React from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { Issue } from '../../models/Issue'

interface IIssueProps {
  issue?: Issue
  query: string
}

export default function AddIssue({ issue, query }: IIssueProps): JSX.Element {
  return (
    <Form action={`/issues/add?${query}`} method="POST">
      <FormGroup>
        <Label for="title" value={issue?.title}>
          Title
        </Label>
        <Input id="title" name="title" type="text" />
      </FormGroup>
      <FormGroup>
        <Label for="description">Summary</Label>
        <Input id="description" name="description" type="textarea" rows={7} value={issue?.description} />
      </FormGroup>
      <FormGroup>
        <Button color="primary">Create issue</Button>
      </FormGroup>
    </Form>
  )
}
