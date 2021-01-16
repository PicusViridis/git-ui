import React from 'react'
import { Container, Jumbotron } from 'reactstrap'
import { IRepository } from '../../models/interfaces'

function Repository({ repo }: { repo: IRepository }) {
  return (
    <>
      <div>
        <a href={`/files?repo=${repo.name}`}>
          <strong>{repo.name}</strong>
        </a>
        <br />
        <small>Updated {repo.lastCommit.date}</small>
      </div>
      <hr />
    </>
  )
}

export default function Home({ repositories }: { repositories: IRepository[] }): JSX.Element {
  return (
    <>
      <Jumbotron>
        <h1>Repositories</h1>
      </Jumbotron>
      <Container>
        {repositories.map((repo) => (
          <Repository key={repo.name} repo={repo} />
        ))}
      </Container>
    </>
  )
}
