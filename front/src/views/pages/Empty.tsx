import { useFetch } from '@saramorillon/hooks'
import React from 'react'
import { getServerUrl } from '../../services/server'

interface IEmptyProps {
  repo: string
}

export function Empty({ repo }: IEmptyProps) {
  const [url] = useFetch(getServerUrl, '')

  if (!url) {
    return null
  }

  return (
    <>
      <h4>Clone this repository</h4>
      <article>
        <code>
          git clone {url}/{repo}
        </code>
      </article>
      <hr />
      <h4>Create a new repository on the command line</h4>
      <article>
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
      </article>
      <hr />
      <h4>Push an existing repository from the command line</h4>
      <article>
        <code>
          git remote add origin {url}/{repo}
        </code>
        <br />
        <code>git push -u origin master</code>
      </article>
    </>
  )
}
