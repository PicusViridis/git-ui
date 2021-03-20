import { format, parse } from 'date-fns'
import React from 'react'
import { Plus } from 'react-feather'
import { Container } from 'reactstrap'

const FORMAT = 'yyyy-MM-dd HH:mm:ss'

interface IRepositoryCardProps {
  repo: {
    name: string
    updatedAt: string
  }
}

function RepositoryCard({ repo }: IRepositoryCardProps) {
  const date = parse(repo.updatedAt, FORMAT, new Date())
  return (
    <>
      <div>
        <a href={`/repo/${repo.name}/master/files`}>
          <strong>{repo.name}</strong>
        </a>
        <br />
        <small title={format(date, 'Pp')}>Updated {format(date, 'PP')}</small>
      </div>
      <hr />
    </>
  )
}

export interface IHomeProps {
  repositories: {
    name: string
    updatedAt: string
  }[]
}

export default function Home({ repositories }: IHomeProps): JSX.Element {
  return (
    <>
      <Container>
        <a href="/repos/add" className="text-right d-block">
          <Plus size="1rem" className="mb-1" /> Create repository
        </a>
        {repositories.map((repo) => (
          <RepositoryCard key={repo.name} repo={repo} />
        ))}
      </Container>
    </>
  )
}
