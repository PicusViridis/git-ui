import React from 'react'
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap'
import { ICommit, IRepositoryMeta } from '../../models/interfaces'
import Layout from './Layout'

const buttonStyle = {
  background: 'none',
  borderColor: '#ced4da',
}

interface ICommitProps {
  commit: ICommit
  repo: IRepositoryMeta
}

function Commit({ commit, repo }: ICommitProps): JSX.Element {
  return (
    <Media className="mb-3">
      <Media body>
        <Media heading tag="div">
          <a href={`/repo/${repo.name}/commit/${commit.fullHash}`}>
            <strong>{commit.message}</strong>
          </a>
        </Media>
        <small>
          Commited {commit.date} by <b>{commit.author}</b>
        </small>
      </Media>
      <Media right>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <Button style={buttonStyle} className="copy-button" data-hash={commit.fullHash}>
              <img src="/clipboard.svg" height="16" />
            </Button>
          </InputGroupAddon>
          <Input defaultValue={commit.hash} style={{ width: 'unset' }} />
        </InputGroup>
      </Media>
    </Media>
  )
}

interface ICommitsProps {
  commits: ICommit[]
  repo: IRepositoryMeta
  next?: string
  previous?: string
}

export default function Commits({ commits, repo, previous, next }: ICommitsProps): JSX.Element {
  return (
    <Layout repo={repo} active="commits">
      {commits.map((commit) => (
        <Commit key={commit.hash} commit={commit} repo={repo} />
      ))}
      <Pagination>
        <PaginationItem disabled={!previous}>
          <PaginationLink previous href={previous} />
        </PaginationItem>
        <PaginationItem disabled={!next}>
          <PaginationLink next href={next} />
        </PaginationItem>
      </Pagination>
    </Layout>
  )
}
