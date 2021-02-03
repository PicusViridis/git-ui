import React from 'react'
import { Comment } from '../../models/Comment'
import { CommentCard } from './Comment'
import { CommentForm } from './CommentForm'

export interface ICommentsProps {
  repo: string
  issueId: number
  comments?: Comment[]
}

export function Comments({ repo, issueId, comments }: ICommentsProps): JSX.Element {
  return (
    <div>
      <hr className="my-4" />
      <h3>Comments</h3>
      {comments?.map((comment) => (
        <CommentCard key={comment.id} comment={comment} repo={repo} issueId={issueId} />
      ))}
      <CommentForm repo={repo} issueId={issueId} />
    </div>
  )
}
