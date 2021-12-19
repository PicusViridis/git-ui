import { Button, ButtonGroup } from '@blueprintjs/core'
import React from 'react'
import { LoadContainer } from '../../components/LoadContainer/LoadContainer'
import { Commit } from './Commit'
import { useCommits } from './useCommits'

export function Commits(): JSX.Element {
  const { commits, loading, repo, branch, path, ...pagination } = useCommits(10)
  const { page, maxPage, first, previous, next, last, canPrevious, canNext } = pagination

  return (
    <LoadContainer loading={loading}>
      {commits.map((commit) => (
        <Commit key={commit.hash} commit={commit} repo={repo} branch={branch} path={path} />
      ))}
      <div className="center">
        <ButtonGroup minimal>
          <Button icon="chevron-backward" disabled={!canPrevious} onClick={first} title="First" />
          <Button icon="chevron-left" disabled={!canPrevious} onClick={previous} title="Previous" />
          <Button disabled>
            Page {page} of {maxPage}
          </Button>
          <Button icon="chevron-right" disabled={!canNext} onClick={next} title="Next" />
          <Button icon="chevron-forward" disabled={!canNext} onClick={last} title="Last" />
        </ButtonGroup>
      </div>
    </LoadContainer>
  )
}
