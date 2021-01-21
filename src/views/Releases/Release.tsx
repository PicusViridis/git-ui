import { format } from 'date-fns'
import React from 'react'
import { Button, ButtonGroup, Form, FormGroup, Input, Label } from 'reactstrap'
import { Release } from '../../models/Release'
import { noop } from '../utils'

interface IReleaseProps {
  release?: Release
  repo: string
}

export default function AddRelease({ release, repo }: IReleaseProps): JSX.Element {
  return (
    <Form action={`/repo/${repo}/releases/edit/${release?.id || ''}`} method="POST">
      <FormGroup>
        <Label for="name">Name</Label>
        <Input id="name" name="name" type="text" value={release?.name} onChange={noop} required />
      </FormGroup>
      <FormGroup>
        <Label for="due-date">Type</Label>
        <Input
          id="due-date"
          name="dueDate"
          type="date"
          value={release && format(release.dueDate, 'yyyy-MM-dd')}
          onChange={noop}
        />
      </FormGroup>
      <FormGroup>
        <ButtonGroup>
          <Button color="primary">
            <i className="fas fa-save"></i> Save
          </Button>
          {release && (
            <Button tag="a" color="danger" outline type="button" href={`/repo/${repo}/releases/delete/${release.id}`}>
              <i className="fas fa-trash"></i> Delete
            </Button>
          )}
        </ButtonGroup>
      </FormGroup>
    </Form>
  )
}
