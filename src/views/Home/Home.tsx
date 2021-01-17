import React from 'react'
import { Container } from 'reactstrap'

export interface IHomeProps {
  repositories: {
    name: string
    lastUpdateDate: string
  }[]
}

export default function Home({ repositories }: IHomeProps): JSX.Element {
  return (
    <>
      <Container>
        {repositories.map((repo) => (
          <>
            <div key={repo.name}>
              <a href={`/files?repo=${repo.name}`}>
                <strong>{repo.name}</strong>
              </a>
              <br />
              <small>Updated {repo.lastUpdateDate}</small>
            </div>
            <hr key={`hr${repo.name}`} />
          </>
        ))}
      </Container>
    </>
  )
}
