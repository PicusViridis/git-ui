import { html, parse } from 'diff2html'
import React from 'react'

export interface ICommitProps {
  commit: {
    message: string
    diff: string
  }
}

export default function Commit({ commit }: ICommitProps): JSX.Element {
  const diffHtml = html(parse(commit.diff), { outputFormat: 'side-by-side', drawFileList: false })
  return (
    <>
      <h1>{commit.message}</h1>
      <div dangerouslySetInnerHTML={{ __html: diffHtml }} />
    </>
  )
}
