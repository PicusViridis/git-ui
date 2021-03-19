import React, { PropsWithChildren } from 'react'
import { Alert, Container } from 'reactstrap'

function Code({ children }: PropsWithChildren<unknown>) {
  return (
    <Alert color="secondary" fade={false} style={{ fontFamily: 'monospace' }}>
      {children}
    </Alert>
  )
}

interface IEmptyProps {
  repo: string
  url: string
}

export default function Empty({ url, repo }: IEmptyProps): JSX.Element {
  return (
    <Container>
      <h4>Clone this repository</h4>
      <Code>
        git clone {url}/{repo}
      </Code>
      <hr />
      <h4>Create a new repository on the command line</h4>
      <Code>
        <div>touch README.md</div>
        <div>git init</div>
        <div>git add README.md</div>
        <div>git commit -m &quot;Initial commit&quot;</div>
        <div>
          git remote add origin {url}/{repo}
        </div>
        <div>git push -u origin master</div>
      </Code>
      <hr />
      <h4>Push an existing repository from the command line</h4>
      <Code>
        <div>
          git remote add origin {url}/{repo}
        </div>
        <div>git push -u origin master</div>
      </Code>
    </Container>
  )
}
