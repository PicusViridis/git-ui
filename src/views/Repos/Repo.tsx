import React from 'react'
import {
  Button,
  Form,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
} from 'reactstrap'

export default function AddRepo(): JSX.Element {
  return (
    <Form action="/repos/add" method="POST">
      <FormGroup>
        <Label for="name">Name</Label>
        <InputGroup>
          <Input id="name" name="name" type="text" pattern="[a-zA-Z]+[0-9a-zA-Z-_]+" />
          <InputGroupAddon addonType="append">
            <InputGroupText>.git</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <FormText color="muted">
          Repository name must start with a letter and contain only letters, digits, hyphens and underscores.
        </FormText>
      </FormGroup>
      <FormGroup>
        <Button color="primary">Create repository</Button>
      </FormGroup>
    </Form>
  )
}
