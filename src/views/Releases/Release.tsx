import { format } from 'date-fns'
import React from 'react'
import { Save, Trash } from 'react-feather'
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
        <Label for="due-date">Due date</Label>
        <Input
          id="due-date"
          name="dueDate"
          type="date"
          value={release && format(release.dueDate, 'yyyy-MM-dd')}
          onChange={noop}
          required
        />
      </FormGroup>
      <FormGroup>
        <ButtonGroup>
          <Button color="primary">
            <Save size="1rem" className="mb-1" /> Save
          </Button>
          {release && (
            <Button
              tag="a"
              color="danger"
              outline
              type="button"
              href={`/repo/${repo}/releases/delete/${release.id}`}
              disabled={release.issues.length > 0}
            >
              <Trash size="1rem" className="mb-1" /> Delete
            </Button>
          )}
        </ButtonGroup>
      </FormGroup>
    </Form>
  )
}
