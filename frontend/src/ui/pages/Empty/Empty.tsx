import { Card, Divider, H4 } from '@blueprintjs/core'
import { useFetch } from '@saramorillon/hooks'
import React from 'react'
import { getServerUrl } from '../../../services/server'
import { LoadContainer } from '../../components/LoadContainer/LoadContainer'

interface IEmptyProps {
  repo: string
}

export function Empty({ repo }: IEmptyProps): JSX.Element {
  const [url, { loading }] = useFetch(getServerUrl, '')

  return (
    <LoadContainer loading={loading}>
      <H4>Clone this repository</H4>
      <Card>
        <code>
          git clone {url}/{repo}
        </code>
      </Card>
      <Divider />
      <H4>Create a new repository on the command line</H4>
      <Card>
        <code>touch README.md</code>
        <br />
        <code>git init</code>
        <br />
        <code>git add README.md</code>
        <br />
        <code>git commit -m &quot;Initial commit&quot;</code>
        <br />
        <code>
          git remote add origin {url}/{repo}
        </code>
        <br />
        <code>git push -u origin master</code>
      </Card>
      <Divider />
      <H4>Push an existing repository from the command line</H4>
      <Card>
        <code>
          git remote add origin {url}/{repo}
        </code>
        <br />
        <code>git push -u origin master</code>
      </Card>
    </LoadContainer>
  )
}
