import React from 'react'
import { Save } from 'react-feather'
import { Button, ButtonGroup, Form, FormGroup, Input } from 'reactstrap'

export interface ICommentFormProps {
  repo: string
  issueId: number
}

export function CommentForm({ repo, issueId }: ICommentFormProps): JSX.Element {
  return (
    <>
      <Form action={`/repo/${repo}/comments/edit?issueId=${issueId}`} method="POST">
        <FormGroup>
          <Input name="content" type="textarea" rows={3} placeholder="Add a comment" required />
        </FormGroup>
        <FormGroup>
          <ButtonGroup>
            <Button color="primary">
              <Save size="1rem" className="mb-1" /> Add comment
            </Button>
          </ButtonGroup>
        </FormGroup>
      </Form>
    </>
  )
}
