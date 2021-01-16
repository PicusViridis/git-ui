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
import Layout from '../Layout/RepoLayout'
import { getQueryString } from '../utils'

const buttonStyle = {
  borderColor: '#ced4da',
}

interface ICommitProps {
  commit: ICommit
  meta: IRepositoryMeta
}

function Commit({ commit, meta }: ICommitProps): JSX.Element {
  const query = getQueryString(meta)
  return (
    <Media className="mb-3">
      <Media body>
        <Media heading tag="div">
          <a href={`/commit/${commit.fullHash}?${query}`}>
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
            <Button style={buttonStyle} className="copy-button" color="light" data-hash={commit.fullHash}>
              <i className="far fa-clipboard"></i>
            </Button>
          </InputGroupAddon>
          <Input defaultValue={commit.hash} size={4} style={{ width: 'unset' }} />
        </InputGroup>
      </Media>
    </Media>
  )
}

interface ICommitsProps {
  commits: ICommit[]
  meta: IRepositoryMeta
  pagination: {
    page: number
    maxPage: number
    first?: string
    previous?: string
    next?: string
    last?: string
  }
}

export default function Commits({ commits, meta, pagination }: ICommitsProps): JSX.Element {
  const { page, maxPage, first, previous, next, last } = pagination

  return (
    <Layout meta={meta} active="commits">
      {commits.map((commit) => (
        <Commit key={commit.hash} commit={commit} meta={meta} />
      ))}
      <Pagination>
        <PaginationItem disabled={!first}>
          <PaginationLink first href={first} />
        </PaginationItem>
        <PaginationItem disabled={!previous}>
          <PaginationLink previous href={previous} />
        </PaginationItem>
        <PaginationItem disabled>
          <PaginationLink tag="span">
            Page {page} of {maxPage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={!next}>
          <PaginationLink next href={next} />
        </PaginationItem>
        <PaginationItem disabled={!last}>
          <PaginationLink last href={last} />
        </PaginationItem>
      </Pagination>
    </Layout>
  )
}
